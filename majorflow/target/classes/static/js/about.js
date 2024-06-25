const urlLogout = "http://localhost:8080/user/logout";
const urlTeacher = "";

//연혁 hidden,
//강사진 unhidden

document.querySelector(".teacherBtn").addEventListener("click", () => {
  document.querySelector(".teacherBox").classList.remove("hidden");
  document.querySelector(".historyBox").classList.add("hidden");
  document.querySelector(".singleTeacherBox").classList.add("hidden");
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
  singleTeacherInfo.textContent = "담당 강의명";
  singleTeacherText2.textContent = "선생님 정보";

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
