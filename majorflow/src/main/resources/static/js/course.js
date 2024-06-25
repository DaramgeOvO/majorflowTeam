const urlLectures = "http://localhost:8080/lectures";
const urlLogout = "http://localhost:8080/user/logout";

axios
  .get(urlLectures)
  .then((response) => {
    console.log("응답 Response: ", response);
    displayLectures(response.data);
  })
  .catch((error) => {
    console.log("에러발생: ", error);
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

function displayLectures(lectureData) {
  console.log(lectureData.length);
  if (lectureData.length > 0) {
    const allCourse = document.querySelector(".allCourse");
    lectureData.forEach((data) => {
      const allCourseClick = document.createElement("div");
      allCourseClick.classList.add("allCourseClick");

      const allCourseClickImg = document.createElement("div");
      allCourseClickImg.classList.add("allCourseClickImg");
      allCourseClickImg.style.backgroundImage = `url('/img/전체강좌_기타.jpg')`; // 이미지 설정

      const textContainer = document.createElement("div");
      textContainer.classList.add("textContainer");

      const mainText = document.createElement("p");
      mainText.classList.add("mainText");
      mainText.textContent = data.lectureName;
      textContainer.appendChild(mainText);

      const subText = document.createElement("p");
      subText.classList.add("subText");
      subText.innerHTML = "초보부터 고수까지<br>1:1 맞춤교육";
      textContainer.appendChild(subText);

      allCourseClickImg.appendChild(textContainer);
      allCourseClick.appendChild(allCourseClickImg);
      allCourse.appendChild(allCourseClick);

      allCourseClickImg.addEventListener("click", () => {
        window.location.href = "lecture.html?lectureId=" + data.lectureId;
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const tasteCourseBtn = document.querySelector(".tasteCourseBtn");
  const allCourseBtn = document.querySelector(".allCourseBtn");
  const coursePriceGuideBtn = document.querySelector(".coursePriceGuideBtn");

  if (tasteCourseBtn) {
    tasteCourseBtn.addEventListener("click", () => {
      document.querySelector(".tasteCourseBox").classList.remove("hidden");
      document.querySelector(".allCourseBox").classList.add("hidden");
      document.querySelector(".coursePriceGuideBox").classList.add("hidden");
      document.querySelector(".allCourseDetailBox").classList.add("hidden");
    });
  } else {
    console.error("tasteCourseBtn not found");
  }

  if (allCourseBtn) {
    allCourseBtn.addEventListener("click", () => {
      document.querySelector(".allCourseBox").classList.remove("hidden");
      document.querySelector(".tasteCourseBox").classList.add("hidden");
      document.querySelector(".coursePriceGuideBox").classList.add("hidden");
    });
  } else {
    console.error("allCourseBtn not found");
  }

  if (coursePriceGuideBtn) {
    coursePriceGuideBtn.addEventListener("click", () => {
      document.querySelector(".coursePriceGuideBox").classList.remove("hidden");
      document.querySelector(".tasteCourseBox").classList.add("hidden");
      document.querySelector(".allCourseBox").classList.add("hidden");
      document.querySelector(".allCourseDetailBox").classList.add("hidden");
    });
  } else {
    console.error("coursePriceGuideBtn not found");
  }

  /* 모달창 */
  const tasteCourseClickImg = document.querySelectorAll(".tasteCourseClickImg");
  const modal = document.getElementById("courseModal");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalVideo = document.getElementById("modalVideo");

  function toggleModal(videoUrl) {
    if (videoUrl) {
      modalVideo.src = videoUrl;
    }
    modal.classList.toggle("show");
  }

  tasteCourseClickImg.forEach((item) => {
    item.addEventListener("click", function () {
      const videoUrl = this.getAttribute("data-video-url");
      toggleModal(videoUrl);
    });
  });

  modalCloseBtn.addEventListener("click", function () {
    toggleModal();
    modalVideo.src = ""; // 모달 닫을 때 비디오 정지
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      toggleModal();
      modalVideo.src = ""; // 모달 닫을 때 비디오 정지
    }
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

document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
  if (confirm("로그아웃하시겠습니까?")) {
    axios
      .post(urlLogout, {}, { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        if (response.status == 200) {
          alert("로그아웃 되었습니다");
          document.querySelector(".menuLoginBtn").classList.remove("hidden");
          document.querySelector(".menuLogoutBtn").classList.add("hidden");
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  }
});

sessionCurrent();
