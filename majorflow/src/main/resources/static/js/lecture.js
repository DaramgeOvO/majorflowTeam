const urlParams = new URLSearchParams(window.location.search);
const lectureId = urlParams.get("lectureId");
console.log("lecture ID: ", lectureId);

const urlLecture = "http://localhost:8080/lectures/" + lectureId;
const urlLogout = "http://localhost:8080/user/logout";

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
  const detailedBox2Img = document.createElement("div");
  const detailedBox2Text = document.createElement("div");
  const detailedBox2Text2 = document.createElement("div");

  backBtn.classList.add("backBtn");
  backBtnImg.classList.add("backBtnImg");
  detailedBox.classList.add("detailedBox");
  detailedBox2.classList.add("detailedBox2");
  detailedBox2Img.classList.add("detailedBox2Img");
  detailedBox2Text.classList.add("detaildBox2Text");
  detailedBox2Text2.classList.add("detaildBox2Text2");

  //이미지 속성 추가 필요
  backBtnImg.src = "/img/뒤로가기검정.png";
  backBtnImg.alt = "뒤로가기";
  detailedBox.textContent = data.lectureName;
  detailedBox2Text.textContent = data.lectureText;

  backBtn.appendChild(backBtnImg);
  allCourseDetailBox.appendChild(backBtn);
  allCourseDetailBox.appendChild(detailedBox);
  allCourseDetailBox.appendChild(detailedBox2);
  detailedBox2.appendChild(detailedBox2Img);
  detailedBox2.appendChild(detailedBox2Text);
  detailedBox2.appendChild(detailedBox2Text2);
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
