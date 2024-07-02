const urlAdmin = "http://localhost:8080/user/user";
const urlLectures = "http://localhost:8080/edutech/get";
const urlLogout = "http://localhost:8080/user/logout";

document.querySelector(".noticeWriteBtn").addEventListener("click", () => {
  document.querySelector(".noticeWriteBox").classList.remove("hidden");
  document.querySelector(".adminPageBox").classList.add("hidden");
});

document.querySelector(".adminPageBtn").addEventListener("click", () => {
  document.querySelector(".adminPageBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
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
        openModal("로그인이 필요합니다.", () => {
          window.location.href = "login.html";
        });
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
}

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
//document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
//  openModal("로그아웃하시겠습니까?");
//});

document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
  openModal("로그아웃하시겠습니까?", () => {
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
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  });
});

// 모달 내 취소 버튼 클릭 시 모달 닫기
document.querySelector(".alertClose").addEventListener("click", () => {
  closeModal(); // 모달 닫기
});

axios
  .get(urlAdmin)
  .then((response) => {
    console.log("데이터: ", response.data);
    displayAdmin(response.data);
  })
  .catch((error) => {
    console.log("에러 발생: ", error);
  });

function displayAdmin(data) {
  const tbody = document.querySelector(".tbody");

  data.forEach((userData) => {
    const userId = userData.userId;

    const tr = document.createElement("tr");

    const adminUserId = document.createElement("td");
    adminUserId.classList.add("adminUserId");
    adminUserId.textContent = userData.userId;
    adminUserId.dataset.userId = userId; // Store userId in a data attribute

    const adminUserName = document.createElement("td");
    adminUserName.classList.add("adminUserName");
    adminUserName.textContent = userData.name;

    const adminUserNickname = document.createElement("td");
    adminUserNickname.classList.add("adminUserNickname");
    adminUserNickname.textContent = userData.nickname;

    const adminUserGender = document.createElement("td");
    adminUserGender.classList.add("adminUserGender");
    adminUserGender.textContent = userData.gender;

    const adminUserAddress = document.createElement("td");
    adminUserAddress.classList.add("adminUserAddress");
    adminUserAddress.textContent = userData.address;

    const adminUserBirthdate = document.createElement("td");
    adminUserBirthdate.classList.add("adminUserBirthdate");
    adminUserBirthdate.textContent = userData.birthDate;

    const adminUserEmail = document.createElement("td");
    adminUserEmail.classList.add("adminUserEmail");
    adminUserEmail.textContent = userData.email;

    const adminUserPhoneNum = document.createElement("td");
    adminUserPhoneNum.classList.add("adminUserPhoneNum");
    adminUserPhoneNum.textContent = userData.phoneNumber;

    const adminUserGenre = document.createElement("td");
    adminUserGenre.classList.add("adminUserGenre");
    adminUserGenre.textContent = userData.genre;

    tr.appendChild(adminUserId);
    tr.appendChild(adminUserName);
    tr.appendChild(adminUserNickname);
    tr.appendChild(adminUserGender);
    tr.appendChild(adminUserAddress);
    tr.appendChild(adminUserBirthdate);
    tr.appendChild(adminUserEmail);
    tr.appendChild(adminUserPhoneNum);
    tr.appendChild(adminUserGenre);
    tbody.appendChild(tr);
  });

  tbody.addEventListener("click", function (event) {
    const target = event.target;
    if (target.classList.contains("adminUserId")) {
      const userId = target.dataset.userId; // Retrieve userId from data attribute
      modal.style.display = "block";
      axios
        .get("http://localhost:8080/edutech/user/" + userId + "/lectures")
        .then((response) => {
          console.log("데이터 :", response.data);
          const lectureInfo = response.data;
          const userCourse = document.querySelector(".userCourse");

          // Clear previous content
          userCourse.innerHTML = "";

          const userCourseText = document.createElement("div");
          userCourseText.classList.add("userCourseText");
          userCourseText.textContent = userId + "님이 수강중인 강의";

          const userCourseGrid = document.createElement("div");
          userCourseGrid.classList.add("userCourseGrid");

          userCourse.appendChild(userCourseText);
          userCourse.appendChild(userCourseGrid);
          lectureInfo.forEach((info) => {
            const courseTeacherImgDiv = document.createElement("div");
            courseTeacherImgDiv.classList.add("courseTeacherImg");

            const courseTeacherImg = document.createElement("img");
            courseTeacherImg.src = info.lecture.teacher.teacherImgPath;

            const courseTitle = document.createElement("div");
            courseTitle.classList.add("courseTitle");
            courseTitle.textContent =
              info.lecture.lectureName + " " + info.lecture.lectureClass;

            const courseTeacherName = document.createElement("div");
            courseTeacherName.classList.add("courseTeacherName");
            courseTeacherName.textContent = info.lecture.teacher.teacherName;

            const courseLecturePrice = document.createElement("div");
            courseLecturePrice.classList.add("courseLecturePrice");
            courseLecturePrice.textContent = info.lecture.price + "원";

            userCourseGrid.appendChild(courseTeacherImgDiv);
            courseTeacherImgDiv.appendChild(courseTeacherImg);
            userCourseGrid.appendChild(courseTitle);
            userCourseGrid.appendChild(courseTeacherName);
            userCourseGrid.appendChild(courseLecturePrice);
          });
        });
    }
  });
}

/* 유저가 수강중인 강의 보기 모달 */

const tbody = document.querySelector(".tbody");
const modal = document.getElementById("courseModal");
const closeButton = document.querySelector(".courseModalClose");

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// 강의별 수강중인 학생 목록 가져오기
axios
  .get(urlLectures)
  .then((response) => {
    console.log("유저 데이터: ", response.data);
    displayCourseUsers(response.data);
  })
  .catch((error) => {
    console.log("강의 데이터 가져오기 에러 발생: ", error);
  });

function displayCourseUsers(lectureData) {
  lectureData.forEach((purchasedLecture) => {
    const lectureName = purchasedLecture.lecture.lectureName;
    const userId = purchasedLecture.user.userId;
    const lectureUserName = document.createElement("div");
    const celloLectureUserName = document.querySelector(
      ".celloLectureUserName"
    );
    const pianoLectureUserName = document.querySelector(
      ".pianoLectureUserName"
    );
    const guitarLectureUserName = document.querySelector(
      ".guitarLectureUserName"
    );
    const drumLectureUserName = document.querySelector(".drumLectureUserName");
    lectureUserName.textContent = userId;

    if (lectureName == "첼로") {
      celloLectureUserName.appendChild(lectureUserName);
    } else if (lectureName == "피아노") {
      pianoLectureUserName.appendChild(lectureUserName);
    } else if (lectureName == "기타") {
      guitarLectureUserName.appendChild(lectureUserName);
    } else if (lectureName == "드럼") {
      drumLectureUserName.appendChild(lectureUserName);
    }
  });
}

document.querySelectorAll(".courseUserGrid").forEach((courseSection) => {
  courseSection.addEventListener("click", () => {
    courseSection.classList.toggle("active");
    const lectureUserList = courseSection.nextElementSibling;
    lectureUserList.style.display =
      lectureUserList.style.display === "block" ? "none" : "block";
  });
});

/* 공지사항 등록 */

// HTML 요소 선택
const noticeTitle = document.querySelector(".noticeWriteBox1");
const noticeContent = document.querySelector(".noticeWriteBox2");
const submitButton = document.querySelector(".noticeWriteBox3");

// 글쓰기 버튼에 이벤트 리스너 추가
submitButton.addEventListener("click", () => {
  // 입력된 제목과 내용 가져오기
  const title = noticeTitle.value;
  const content = noticeContent.value;

  // 현재 날짜 및 시간 생성
  const now = new Date();
  const freeBoardTime = now.toISOString(); // ISO 형식의 날짜 문자열 생성 (예: "2024-06-26T15:30:00.000Z")

  // 데이터 객체 생성
  const data = {
    title: title,
    text: content, // 수정된 부분
    freeBoardTime: freeBoardTime, // 등록 날짜 추가
  };

  // axios를 사용하여 서버에 데이터 전송
  axios
    .post("http://localhost:8080/board/save", data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("데이터 저장 성공:", response);
      // 성공 시 추가 작업 (예: 알림 표시, 입력 필드 초기화 등)
      openModal(`공지사항이 등록되었습니다.`, () => {
        window.location.href = "customer.html";
      });
      noticeTitle.value = "";
      noticeContent.value = "";
    })
    .catch((error) => {
      console.log("에러 발생:", error);
      // 오류 처리 (예: 오류 메시지 표시)
      alert("공지사항 등록에 실패했습니다. 다시 시도해주세요.");
    });
});

sessionCurrent();
