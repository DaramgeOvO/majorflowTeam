const urlLogout = "http://localhost:8080/user/logout";
const urlTeacher = "";

//연혁 hidden,
//강사진 unhidden

document.querySelector(".teacherBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.remove("hidden");
  document.querySelector(".historyBox").classList.add("hidden");
  document.querySelector(".singleTeacherBox").classList.add("hidden");
  document.querySelector(".box3").classList.add("hidden");
  axios
    .get("http://localhost:8080/teacher/all")
    .then((response) => {
      console.log("데이터: ", response);
      displayTeachers(response.data);
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});

function displayTeachers(teacherData) {
  console.log(teacherData.length);
  if (teacherData.length > 0) {
    const teacher = document.querySelector(".teacher");
    teacher.innerHTML = "";

    teacherData.forEach((data) => {
      const teacherInfo = document.createElement("div");
      const teacherPicture = document.createElement("div");
      const teacherImg = document.createElement("img");
      const teacherPictureColor = document.createElement("div");
      const teacherName = document.createElement("div");
      const teacherSubject = document.createElement("div");

      teacherInfo.classList.add("teacherInfo");
      teacherPicture.classList.add("teacherPicture");
      teacherPictureColor.classList.add("teacherPictureColor");
      teacherName.classList.add("teacherName");
      teacherSubject.classList.add("teacherSubject");

      teacherImg.src = data.teacherImgPath;
      teacherName.textContent = data.teacherName;

      teacher.appendChild(teacherInfo);
      teacherInfo.appendChild(teacherPicture);
      teacherInfo.appendChild(teacherName);
      teacherInfo.appendChild(teacherSubject);
      teacherPicture.appendChild(teacherImg);
      teacherPicture.appendChild(teacherPictureColor);

      teacherInfo.addEventListener("click", () => {
        document.querySelector(".teacherBox").classList.add("hidden");
        document.querySelector(".singleTeacherBox").classList.remove("hidden");
        axios
          .get("http://localhost:8080/teacher/get/" + data.teacherId)
          .then((response) => {
            console.log("데이터 : ", response.data);
            displayTeacher(response.data);
          })
          .catch((error) => {
            console.log("에러발생 : ", error);
          });
      });
    });
  }
}

function displayTeacher(data) {
  const singleTeacherBox = document.querySelector(".singleTeacherBox");
  singleTeacherBox.innerHTML = "";

  const backBtn = document.createElement("div");
  const backBtnImg = document.createElement("img");
  const singleTeacherTitle = document.createElement("div");
  const singleTeacher = document.createElement("div");
  const singleTeacher1 = document.createElement("div");
  const singleTeacher2 = document.createElement("div");
  const singleTeacherImg = document.createElement("img");
  const singleTeacherInfo = document.createElement("div");
  const singleTeacherText = document.createElement("div");
  const singleTeacherText2 = document.createElement("div");

  backBtn.classList.add("backBtn");
  backBtnImg.classList.add("backBtnImg");
  singleTeacherTitle.classList.add("singleTeacherTitle");
  singleTeacher.classList.add("singleTeacher");
  singleTeacher1.classList.add("singleTeacher1");
  singleTeacher2.classList.add("singleTeacher2");

  backBtnImg.src = "/img/뒤로가기검정.png";
  singleTeacherTitle.textContent = data.teacherName;
  singleTeacherImg.src = data.teacherImgPath;
  singleTeacherInfo.textContent = data.user.email;
  singleTeacherText2.innerHTML =
    "Lorem ipsum dolor sit amet. Sit ratione reiciendis est quidem liberoeos quas quia est obcaecati atque nam illum quia. Aut pariatur omnisut neque deleniti non voluptas accusamus est recusandae vitae eaofficia consectetur. Et dolores ipsam sed laborum consectetur utcupiditate voluptate rem quam magnam At Quis inventore ut veniamaccusantium qui voluptatum voluptas. Ea optio fugit non nesciuntalias nam animi sequi qui doloremque debitis sed voluptatemvoluptate. Ad exercitationem quis aut ipsum atque et odio corruptiqui necessitatibus consequatur id voluptates minus in modi doloremet explicabo mollitia. Et rerum iste aut odio inventore in maioresvelit et dicta inventore sed odio consequatur. Ea rerum beatae inincidunt voluptas et provident voluptas et commodi velit. Quo doloredicta id voluptatem reprehenderit et harum voluptatibus et iureneque ut maiores mollitia et saepe iure! Et sint saepe quo quae iureet quia pariatur et porro fugiat ut ipsum Quis est deseruntvoluptatem aut quos temporibus.";

  singleTeacherBox.appendChild(backBtn);
  backBtn.appendChild(backBtnImg);
  singleTeacherBox.appendChild(singleTeacherTitle);
  singleTeacherBox.appendChild(singleTeacher);
  singleTeacher.appendChild(singleTeacher1);
  singleTeacher1.appendChild(singleTeacherImg);
  singleTeacher1.appendChild(singleTeacherInfo);
  singleTeacher1.appendChild(singleTeacherText);
  singleTeacher.appendChild(singleTeacher2);
  singleTeacher2.appendChild(singleTeacherText2);
  backBtn.addEventListener("click", () => {
    document.querySelector(".teacherBox").classList.remove("hidden");
    document.querySelector(".historyBox").classList.add("hidden");
    document.querySelector(".singleTeacherBox").classList.add("hidden");
  });
}

//강사진 hidden,
//연혁 unhidden

document.querySelector(".historyBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.add("hidden");
  document.querySelector(".historyBox").classList.remove("hidden");
  document.querySelector(".singleTeacherBox").classList.add("hidden");
  document.querySelector(".box3").classList.remove("hidden");
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
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
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
  // 로그아웃 버튼 클릭 시 확인 모달 열기
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
        openModal("로그아웃 되었습니다");
        closeModal();
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
      }
    })
    .catch((error) => {
      console.log("에러 발생: ", error);
    });
});
document.querySelector(".alertClose").addEventListener("click", () => {
  closeModal();
});

sessionCurrent();
