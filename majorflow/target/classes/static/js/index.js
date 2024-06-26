document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.querySelector(".menuBtn");
  var menu = document.querySelector(".menu");
  var closeBtn = document.querySelector(".closeBtn");

  menuBtn.addEventListener("click", function () {
    menu.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove("active");
    }
  });

  document.querySelector(".closeBtn").addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터:", response);
      document.querySelector(".adminBtn").classList.add("hidden");
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        document.querySelector(".loginBtn").classList.add("hidden");
        if (
          response.status == 200 &&
          (response.data.authority[0].authority == "ROLE_USER" ||
            response.data.authority[0].authority == "ROLE_TEACHER")
        ) {
          console.log("권한이 User or Teacher일 때 데이터 : ", response);
          document.querySelector(".adminBtn").classList.add("hidden");
        } else if (
          response.status == 200 &&
          response.data.authority[0].authority == "ROLE_ADMIN"
        ) {
          console.log("권한이 Admin일 때 데이터 : ", response);
          document.querySelector(".adminBtn").classList.remove("hidden");
        }
      }
    })
    .catch((error) => {
      console.log("에러 발생:", error);
    });
}

sessionCurrent();
