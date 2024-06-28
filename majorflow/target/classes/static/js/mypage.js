const urlLogout = "http://localhost:8080/user/logout";
const urlLectures = "http://localhost:8080/lectures";
const urlMypage = "http://localhost:8080/user";

//모달 엘리먼트 가져오기
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const span = document.getElementsByClassName("close")[0];

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

        StudyMylectures(userInfo);
      } else {
        openModal("로그인이 필요합니다.", () => {
          window.location.href = "login.html";
        });
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

        console.log(userInfo);

        displayMylectures(userInfo);
      } else {
        openModal("로그인이 필요합니다.", () => {
          window.location.href = "login.html";
        });
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });

  function displayMylectures(user) {
    const userId = user.userId;
    axios
      .get("http://localhost:8080/edutech/user/" + userId + "/lectures")
      .then((response) => {
        console.log("데이터 : ", response);
        const items = response.data;

        const myLectureBox = document.querySelector(".myLectureBox");
        myLectureBox.innerHTML = "";

        const myLectureBoxGrid = document.createElement("div");
        const myLectureTitle = document.createElement("div");

        myLectureBoxGrid.classList.add("myLectureBoxGrid");
        myLectureTitle.classList.add("myLectureTitle");
        myLectureTitle.textContent = user.userId + "님의 수강신청 현황";
        myLectureBox.appendChild(myLectureTitle);
        myLectureBox.appendChild(myLectureBoxGrid);

        if (items.length > 0) {
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

            myLectureImgBox.classList.add("myLectureImgBox");
            myLectureInfoBox.classList.add("myLectureInfoBox");
            myLectureTitleBox.classList.add("myLectureTitleBox");
            myLectureSubjectName.classList.add("myLectureSubjectName");
            myLectureInfo1.classList.add("myLectureInfo");
            myLectureType.classList.add("myLectureType");
            studyLectureBtnBox.classList.add("studyLectureBtnBox");
            studyLectureBtn.classList.add("studyLectureBtn");
            myLectureImg.classList.add("myLectureImg");

            myLectureImg.src = item.lecture.thumbnailImg;
            myLectureSubjectName.textContent = item.lecture.lectureName;
            myLectureType.textContent = item.type;
            studyLectureBtn.textContent = "강의실 입장";

            // 강의실 입장 버튼 클릭 시 강의실 페이지로 이동

            studyLectureBtn.addEventListener("click", () => {
              document.querySelector(".progressBtn").click();
            });

            myLectureBoxGrid.appendChild(myLectureInfoBox);
            myLectureInfoBox.appendChild(myLectureImgBox);
            myLectureImgBox.appendChild(myLectureImg);
            myLectureInfoBox.appendChild(myLectureTitleBox);
            myLectureInfoBox.appendChild(myLectureType);
            myLectureInfoBox.appendChild(studyLectureBtnBox);
            studyLectureBtnBox.appendChild(studyLectureBtn);
            myLectureTitleBox.appendChild(myLectureSubjectName);
          });
        } else {
          document.querySelector(".progress-container").classList.add("noInfo");
          document.querySelector(".progress-container").textContent =
            "구매한 항목이 없습니다.";
        }
      })
      .catch((error) => {
        console.log("에러 발생 : ", error);
      });
  }
}

function StudyMylectures(user) {
  const userId = user.userId;
  axios
    .get("http://localhost:8080/edutech/user/" + userId + "/lectures")
    .then((response) => {
      console.log("데이터 : ", response);
      const items = response.data;

      const progressBox = document.querySelector(".progressBox");
      progressBox.innerHTML = "";

      const progressTitle = document.createElement("div");
      progressTitle.classList.add("progressTitle");

      progressTitle.textContent = user.userId + "님의 강의실";

      progressBox.appendChild(progressTitle);

      items.forEach((item) => {
        let progressNum = 0; // 초기 진도율을 0으로 설정

        const progressImgBox = document.createElement("div");
        const progressImg = document.createElement("img");
        const progressInfoBox = document.createElement("div");
        const progressTitleBox = document.createElement("div");
        const progressSubjectName = document.createElement("div");
        const progressGraph = document.createElement("div");
        const progressStudyBtn = document.createElement("div");
        const progressBtnBox = document.createElement("div");

        const progressInfo1 = document.createElement("div");

        progressInfo1.classList.add("progressInfo");
        progressImgBox.classList.add("progressImgBox");
        progressInfoBox.classList.add("progressInfoBox");
        progressTitleBox.classList.add("progressTitleBox");
        progressSubjectName.classList.add("progressSubjectName");
        progressImg.classList.add("progressImg");
        progressBtnBox.classList.add("progressBtnBox");
        progressGraph.classList.add("progressGraph");
        progressStudyBtn.classList.add("progressStudyBtn");

        progressImg.src = item.lecture.thumbnailImg;
        progressSubjectName.textContent = item.lecture.lectureName;
        progressGraph.textContent = "진도율" + progressNum + "%";
        progressStudyBtn.textContent = "학습하기";

        progressStudyBtn.addEventListener("click", () => {
          // 모달 열기 및 비디오 재생
          modal.style.display = "block";
          modalVideo.poster = item.lecture.thumbnailImg; // 썸네일 이미지 설정
          modalVideo.src = item.lecture.videoPath;
          modalVideo.load();
          setTimeout(() => {
            modalVideo.play();
          }, 2000); // 2초 후에 비디오 재생

          modalVideo.addEventListener("timeupdate", () => {
            const currentTime = modalVideo.currentTime;
            const duration = modalVideo.duration;
            if (duration > 0) {
              progressNum = Math.min(100, Math.round((currentTime / duration) * 100));
              progressGraph.textContent = `진도율 ${progressNum}%`;
              }
          });
        });

        progressInfoBox.appendChild(progressImgBox);
        progressImgBox.appendChild(progressImg);
        progressInfoBox.appendChild(progressTitleBox);
        progressInfoBox.appendChild(progressBtnBox);
        progressBtnBox.appendChild(progressGraph);
        progressBtnBox.appendChild(progressStudyBtn);
        progressBox.appendChild(progressInfoBox);
        progressTitleBox.appendChild(progressSubjectName);

        progressInfoBox.appendChild(progressInfo1);
      });
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
    });
}

// 모달 닫기
span.onclick = function () {
  modal.style.display = "none";
  modalVideo.pause();
};

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modalVideo.pause();
  }
};

function openModal(message, callback) {
  const alertModal = document.getElementById("myAlertModal");
  const alertModalMessage = document.getElementById("alertModalMessage");
  alertModalMessage.textContent = message;
  alertModal.style.display = "block";

  const confirmButton = document.getElementById("alertConfirm");
  confirmButton.onclick = function () {
    callback && callback(); // 콜백이 있을 경우 실행
    closeModal(); // 모달 닫기
  };
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

document.addEventListener("DOMContentLoaded", () => {
  const imgSrc = "/img/오겸비선생님 썸네일.png";
  const progressImages = document.querySelectorAll(".progressImg");

  progressImages.forEach((img) => {
    img.src = imgSrc;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "inherit";
  });

  const myLectureImages = document.querySelectorAll(".myLectureImgBox img");

  myLectureImages.forEach((img) => {
    img.src = imgSrc;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.borderRadius = "inherit";
  });
});
