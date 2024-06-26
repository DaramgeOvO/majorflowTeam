const urlAdmin = "http://localhost:8080/user/user";

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
    adminUserName.textContent = userData.username;

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

    const adminUserAuthority = document.createElement("td");
    adminUserAuthority.classList.add("adminUserAuthority");

    // 권한 설정

    const selectElement = document.createElement("select");
    selectElement.name = `authority-${userData.userId}`;

    const studentOption = document.createElement("option");
    studentOption.value = "ROLE_USER";
    studentOption.textContent = "학생";
    studentOption.selected = userData.authority === "ROLE_USER";

    const teacherOption = document.createElement("option");
    teacherOption.value = "ROLE_TEACHER";
    teacherOption.textContent = "선생님";
    teacherOption.selected = userData.authority === "ROLE_TEACHER";

    selectElement.appendChild(studentOption);
    selectElement.appendChild(teacherOption);

    adminUserAuthority.appendChild(selectElement);

    tr.appendChild(adminUserId);
    tr.appendChild(adminUserName);
    tr.appendChild(adminUserNickname);
    tr.appendChild(adminUserGender);
    tr.appendChild(adminUserAddress);
    tr.appendChild(adminUserBirthdate);
    tr.appendChild(adminUserEmail);
    tr.appendChild(adminUserPhoneNum);
    tr.appendChild(adminUserGenre);
    tr.appendChild(adminUserAuthority);
    tbody.appendChild(tr);
  });
}

function updateAuthority(userId, newAuthority) {
  const updateUrl = `http://localhost:8080/user/update-authority/${userId}`;

  axios
    .put(updateUrl, { authority: newAuthority })
    .then((response) => {
      console.log("권한 업데이트 성공:", response.data);
      // 성공적으로 업데이트된 경우에 대한 처리 (예: 메시지 표시 등)
    })
    .catch((error) => {
      console.error("권한 업데이트 실패:", error);
      // 업데이트 실패에 대한 처리 (예: 오류 메시지 표시 등)
    });
}

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
