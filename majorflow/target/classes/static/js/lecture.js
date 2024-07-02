const urlParams = new URLSearchParams(window.location.search);
const lectureId = urlParams.get("lectureId");
console.log("lecture ID: ", lectureId);

const urlLecture = "http://localhost:8080/lectures/" + lectureId;
const urlLogout = "http://localhost:8080/user/logout";

const tasteCourseBtn = document.querySelector(".tasteCourseBtn");
const allCourseBtn = document.querySelector(".allCourseBtn");
const coursePriceGuideBtn = document.querySelector(".coursePriceGuideBtn");

tasteCourseBtn.addEventListener("click", () => {
  window.location.href = "course.html?courseType=taste";
});
allCourseBtn.addEventListener("click", () => {
  window.location.href = "course.html?courseType=all";
});
coursePriceGuideBtn.addEventListener("click", () => {
  window.location.href = "course.html?courseType=priceGuide";
});

document.querySelectorAll(".subMenu > div").forEach((div) => {
  div.addEventListener("click", () => {
    document
      .querySelectorAll(".subMenu > div")
      .forEach((item) => item.classList.remove("active"));

    // 클릭된 div에 active 클래스 추가
    div.classList.add("active");
  });
});

axios
  .get(urlLecture)
  .then((response) => {
    console.log("데이터: ", response.data);
    displayLecture(response.data);
  })
  .catch((error) => {
    console.log("에러 발생: ", error);
  });

function displayLecture(data) {
  const allCourseDetailBox = document.querySelector(".allCourseDetailBox");

  const detailedBox2 = document.querySelector(".detailedBox2");

  const backBtn = document.createElement("div");
  const backBtnImg = document.createElement("img");
  const detailedBox = document.createElement("div");
  const detailedBox2Img = document.createElement("img");
  const detailedBox2Text = document.createElement("img");

  backBtn.classList.add("backBtn");
  backBtnImg.classList.add("backBtnImg");
  detailedBox.classList.add("detailedBox");
  detailedBox2.classList.add("detailedBox2");
  detailedBox2Img.classList.add("detailedBox2Img");
  detailedBox2Text.classList.add("detaildBox2Text");

  //이미지 속성 추가 필요
  backBtnImg.src = "/img/뒤로가기검정.png";
  backBtnImg.alt = "뒤로가기";
  detailedBox.textContent = data.lectureName;
  detailedBox2Img.src = data.lectureImage;
  detailedBox2Text.src = data.lectureCourse;

  backBtn.appendChild(backBtnImg);
  allCourseDetailBox.appendChild(backBtn);
  allCourseDetailBox.appendChild(detailedBox);
  allCourseDetailBox.appendChild(detailedBox2);
  detailedBox2.appendChild(detailedBox2Img);
  detailedBox2.appendChild(detailedBox2Text);

  backBtn.addEventListener("click", () => {
    window.location.href = "course.html";
  });
}

document.querySelectorAll(".subMenu > div").forEach((div) => {
  div.addEventListener("click", () => {
    document
      .querySelectorAll(".subMenu > div")
      .forEach((item) => item.classList.remove("active"));

    // 클릭된 div에 active 클래스 추가
    div.classList.add("active");
  });
});

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        const userId = response.data.userId;
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");
      } else {
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("로그인 안됨");
    });
}

function openModal(message) {
  const alertModal = document.getElementById("myAlertModal");
  const alertModalMessage = document.getElementById("alertModalMessage");
  alertModalMessage.textContent = message;
  alertModal.style.display = "block";
}

function closeModal() {
  const alertModal = document.getElementById("myAlertModal");
  alertModal.style.display = "none";
}

// 로그아웃 버튼 클릭 시 확인 모달 열기
document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
  openModal("로그아웃하시겠습니까?");
});

// 모달 내 확인 버튼 클릭 시 로그아웃 처리
document.getElementById("alertConfirm").addEventListener("click", () => {
  closeModal(); // 모달 닫기
  axios
    .post(urlLogout, {}, { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200) {
        openModal("로그아웃 되었습니다"); // 모달 열기
        closeModal();
        // 여기에 로그아웃 성공 후의 추가 동작을 넣으세요
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});
// 모달 내 취소 버튼 클릭 시 모달 닫기
document.querySelector(".alertClose").addEventListener("click", () => {
  closeModal(); // 모달 닫기
});

sessionCurrent();
