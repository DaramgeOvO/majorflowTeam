const urlLogout = "http://localhost:8080/user/logout";
const urlLectures = "http://localhost:8080/lectures";
const urlMypage = "http://localhost:8080/user";

document.querySelector(".progressBtn").addEventListener("click", () => {
  document.querySelector(".myLectureBox").classList.add("hidden");
  document.querySelector(".progressBox").classList.remove("hidden");
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      if (response.status === 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");

        const userInfo = response.data;
        const userId = response.data.userId;
        console.log(userInfo);

        let purchasedItems = JSON.parse(
          localStorage.getItem(userId + "_purchased")
        );

        if (purchasedItems && purchasedItems.length > 0) {
          StudyMylectures(purchasedItems, userInfo);
        } else {
          document.querySelector(".progress-container").classList.add("noInfo");
          document.querySelector(".progress-container").textContent =
            "구매한 항목이 없습니다.";
        }
      } else {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});

document.querySelector(".myLectureBtn").addEventListener("click", () => {
  document.querySelector(".myLectureBox").classList.remove("hidden");
  document.querySelector(".progressBox").classList.add("hidden");
});

sessionCurrent();

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
      if (response.status === 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");

        const userInfo = response.data;
        const userId = response.data.userId;
        const userNickname = response.data.nickname;
        console.log(userInfo);

        let purchasedItems = JSON.parse(
          localStorage.getItem(userId + "_purchased")
        );

        if (purchasedItems && purchasedItems.length > 0) {
          console.log(purchasedItems);
          displayMylectures(purchasedItems, userInfo);
        } else {
          document.querySelector(".progress-container").classList.add("noInfo");
          document.querySelector(".progress-container").textContent =
            "구매한 항목이 없습니다.";
        }
      } else {
        alert("로그인이 필요합니다.");
        window.location.href = "login.html";
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });

  function displayMylectures(items, user) {
    const myLectureBox = document.querySelector(".myLectureBox");
    myLectureBox.innerHTML = "";

    const myLectureBoxGrid = document.createElement("div");
    const myLectureTitle = document.createElement("div");

    myLectureBoxGrid.classList.add("myLectureBoxGrid");
    myLectureTitle.classList.add("myLectureTitle");
    myLectureTitle.textContent = user.userId + "님의 수강신청 현황";
    myLectureBox.appendChild(myLectureTitle);
    myLectureBox.appendChild(myLectureBoxGrid);

    items.forEach((item) => {
      const myLectureInfoBox = document.createElement("div");
      const myLectureTitleBox = document.createElement("div");
      const myLectureSubjectName = document.createElement("div");
      const myLectureInfo1 = document.createElement("div");
      const myLectureImgBox = document.createElement("div");
      const myLectureImg = document.createElement("img");
      const myLectureType = document.createElement("div");
      const studyLectureBtn = document.createElement("div");
      const studyLectureBtnBox = document.createElement("div");

      myLectureImg.src = items.lectureImage;
      myLectureImgBox.classList.add("myLectureImgBox");
      myLectureInfoBox.classList.add("myLectureInfoBox");
      myLectureTitleBox.classList.add("myLectureTitleBox");
      myLectureSubjectName.classList.add("myLectureSubjectName");
      myLectureInfo1.classList.add("myLectureInfo");
      myLectureType.classList.add("myLectureType");
      studyLectureBtnBox.classList.add("studyLectureBtnBox");
      studyLectureBtn.classList.add("studyLectureBtn");

      myLectureSubjectName.textContent = item.lectureName;
      myLectureType.textContent = item.type;
      studyLectureBtn.textContent = "강의실 입장";

      myLectureBoxGrid.appendChild(myLectureInfoBox);
      myLectureInfoBox.appendChild(myLectureImgBox);
      myLectureImgBox.appendChild(myLectureImg);
      myLectureInfoBox.appendChild(myLectureTitleBox);
      myLectureInfoBox.appendChild(myLectureType);
      myLectureInfoBox.appendChild(studyLectureBtnBox);
      studyLectureBtnBox.appendChild(studyLectureBtn);
      myLectureTitleBox.appendChild(myLectureSubjectName);
    });
  }
}

function StudyMylectures(items, user) {
  const progressBox = document.querySelector(".progressBox");
  progressBox.innerHTML = "";

  const progressTitle = document.createElement("div");
  progressTitle.classList.add("progressTitle");

  progressTitle.textContent = user.userId + "님의 강의실";

  progressBox.appendChild(progressTitle);

  items.forEach((item) => {
    let progressNum = 10;

    const progressImgBox = document.createElement("div");
    const progressImg = document.createElement("img");
    const progressInfoBox = document.createElement("div");
    const progressTitleBox = document.createElement("div");
    const progressSubjectName = document.createElement("div");
    const progressType = document.createElement("div");
    const progressGraph = document.createElement("div");
    const progressStudyBtn = document.createElement("div");
    const progressBtnBox = document.createElement("div");

    const progressInfo1 = document.createElement("div");

    progressInfo1.classList.add("progressInfo");
    progressImgBox.classList.add("progressImgBox");
    progressInfoBox.classList.add("progressInfoBox");
    progressTitleBox.classList.add("progressTitleBox");
    progressSubjectName.classList.add("progressSubjectName");
    progressType.classList.add("progressType");
    progressImg.classList.add("progressImg");
    progressBtnBox.classList.add("progressBtnBox");
    progressGraph.classList.add("progressGraph");
    progressStudyBtn.classList.add("progressStudyBtn");

    progressSubjectName.textContent = item.lectureName;
    progressType.textContent = item.type;
    progressGraph.textContent = "진도율" + progressNum + "%";
    progressStudyBtn.textContent = "학습하기";

    progressInfoBox.appendChild(progressImgBox);
    progressImgBox.appendChild(progressImg);
    progressInfoBox.appendChild(progressTitleBox);
    progressInfoBox.appendChild(progressBtnBox);
    progressBtnBox.appendChild(progressGraph);
    progressBtnBox.appendChild(progressStudyBtn);
    progressBox.appendChild(progressInfoBox);
    progressTitleBox.appendChild(progressSubjectName);
    progressTitleBox.appendChild(progressType);

    progressInfoBox.appendChild(progressInfo1);
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
