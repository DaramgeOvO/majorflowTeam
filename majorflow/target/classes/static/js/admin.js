const urlAdmin = "http://localhost:8080/user/user";
const urlLectures = "http://localhost:8080/lectures";

document.querySelector(".noticeWriteBtn").addEventListener("click", () => {
  document.querySelector(".noticeWriteBox").classList.remove("hidden");
  document.querySelector(".adminPageBox").classList.add("hidden");
});

document.querySelector(".adminPageBtn").addEventListener("click", () => {
  document.querySelector(".adminPageBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
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
    const tr = document.createElement("tr");

    const adminUserId = document.createElement("td");
    adminUserId.classList.add("adminUserId");
    adminUserId.textContent = userData.userId;

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
}

// 강의별 수강중인 학생 목록 가져오기
axios
  .get(urlLectures)
  .then((response) => {
    console.log("강의 데이터: ", response.data);
    displayCourseUsers(response.data);
  })
  .catch((error) => {
    console.log("강의 데이터 가져오기 에러 발생: ", error);
  });

function displayCourseUsers(lectureData) {
  lectureData.forEach((lectureData) => {
    const courseUserList = document.querySelector(
      `.${lectureData.courseName.toLowerCase()}LectureUserName`
    );

    course.students.forEach((student) => {
      const studentElement = document.createElement("div");
      studentElement.classList.add("studentName");
      studentElement.textContent = student.name;
      courseUserList.appendChild(studentElement);
    });
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

/* 유저가 수강중인 강의 보기 모달 */

const tbody = document.querySelector(".tbody");
const modal = document.getElementById("courseModal");
const closeButton = document.querySelector(".courseModalClose");

tbody.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("adminUserId")) {
    modal.style.display = "block";
  }
});

closeButton.addEventListener("click", function () {
  modal.style.display = "none";
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
