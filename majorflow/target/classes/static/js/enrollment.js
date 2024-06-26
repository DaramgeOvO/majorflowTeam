document.addEventListener("DOMContentLoaded", function () {
  let userId;
  sessionCurrent();

  axios
    .get("http://localhost:8080/lectures")
    .then((response) => {
      const lectures = response.data;
      const enrollment = document.querySelector(".enrollment");

      lectures.forEach((lecture, index) => {
        const lectureDiv = document.createElement("div");

        const lectureImgDiv = document.createElement("div");
        lectureImgDiv.classList.add("lectureEnrollimg");

        const lectureImg = document.createElement("img");
        lectureImg.src = lecture.lectureImage;

        const lectureInfoDiv = document.createElement("div");
        lectureInfoDiv.classList.add("lectureEnrollInfo");

        const cartBtnDiv = document.createElement("div");
        cartBtnDiv.classList.add("cartEnrollBtn");
        cartBtnDiv.innerText = "장바구니 담기";
        cartBtnDiv.addEventListener("click", function () {
          if (userId) {
            addToCart(userId, lecture.lectureId);
          } else {
            alert("로그인이 필요합니다.");
          }
        });

        const lectureNameDiv = document.createElement("div");
        lectureNameDiv.classList.add("lectureEnrollname");
        lectureNameDiv.textContent = lecture.lectureName;

        const teacherNameDiv = document.createElement("div");
        teacherNameDiv.classList.add("teacherEnrollname");
        teacherNameDiv.textContent = lecture.teacherId;

        const hobbyPriceDiv = document.createElement("div");
        hobbyPriceDiv.classList.add("enrollPrice");

        lectureInfoDiv.appendChild(cartBtnDiv);
        lectureInfoDiv.appendChild(lectureNameDiv);
        lectureInfoDiv.appendChild(teacherNameDiv);
        lectureInfoDiv.appendChild(hobbyPriceDiv);

        lectureDiv.appendChild(lectureImgDiv);
        lectureDiv.appendChild(lectureInfoDiv);
        enrollment.appendChild(lectureDiv);
      });
    })
    .catch((error) => {
      console.error("Error fetching lectures:", error);
    });

  function sessionCurrent() {
    axios
      .get("http://localhost:8080/user/current", { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        if (
          response.status == 200 &&
          response.data.userId !== "anonymousUser"
        ) {
          console.log("세션 유지");
          userId = response.data.userId;
          document.querySelector(".menuLoginBtn").classList.add("hidden");
          document.querySelector(".menuLogoutBtn").classList.remove("hidden");
        } else {
          document.querySelector(".menuLogoutBtn").classList.add("hidden");
          document.querySelector(".menuLoginBtn").classList.remove("hidden");
        }
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
  }

  document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
    if (confirm("로그아웃하시겠습니까?")) {
      axios
        .post(
          "http://localhost:8080/user/logout",
          {},
          { withCredentials: true }
        )
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

  function addToCart(userId, lectureId) {
    axios
      .post("http://localhost:8080/cart/add/" + userId + "/" + lectureId)
      .then((response) => {
        if (response.status === 201) {
          alert("선택한 항목이 장바구니에 담겼습니다.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("장바구니에 담는 도중 오류가 발생했습니다.");
      });
  }
});
