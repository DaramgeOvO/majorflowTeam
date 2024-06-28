document.addEventListener("DOMContentLoaded", function () {
  let userId;
  sessionCurrent();

  axios
    .get("http://localhost:8080/lectures")
    .then((response) => {
      console.log("데이터 : ", response.data);
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
            openModal("로그인이 필요합니다.", () => {
              // 확인 버튼 클릭 시 로그인 페이지로 이동
              window.location.href = "login.html";
            });
          }
        });

        const lectureNameDiv = document.createElement("div");
        lectureNameDiv.classList.add("lectureEnrollname");
        lectureNameDiv.textContent = lecture.lectureName;

        const teacherNameDiv = document.createElement("div");
        teacherNameDiv.classList.add("teacherEnrollname");
        teacherNameDiv.textContent = lecture.teacher.teacherName + " 강사";

        const lectureClassDiv = document.createElement("div");
        lectureClassDiv.classList.add("classEnrollName");
        lectureClassDiv.textContent =
          lecture.lectureClass + " : " + lecture.price + "원";

        // const lecturePriceDiv = document.createElement("div");
        // lecturePriceDiv.classList.add("enrollPrice");
        // lecturePriceDiv.textContent =

        lectureInfoDiv.appendChild(cartBtnDiv);
        lectureInfoDiv.appendChild(lectureNameDiv);
        lectureInfoDiv.appendChild(teacherNameDiv);
        lectureInfoDiv.appendChild(lectureClassDiv);
        //lectureInfoDiv.appendChild(lecturePriceDiv);

        lectureDiv.appendChild(lectureImgDiv);
        lectureDiv.appendChild(lectureInfoDiv);
        lectureImgDiv.appendChild(lectureImg);
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

  function openModal(message, callback) {
    const alertModal = document.getElementById("myAlertModal");
    const alertModalMessage = document.getElementById("alertModalMessage");
    alertModalMessage.textContent = message;
    alertModal.style.display = "block";

    // 확인 버튼 클릭 시 콜백 실행
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
          }
        })
        .catch((error) => {
          console.log("에러 발생: ", error);
        });
    });
  });

  // // 모달 내 취소 버튼 클릭 시 모달 닫기
  // document.querySelector(".alertClose").addEventListener("click", () => {
  //   closeModal(); // 모달 닫기
  // });

  function addToCart(userId, lectureId) {
    axios
      .post("http://localhost:8080/cart/add/" + userId + "/" + lectureId)
      .then((response) => {
        if (response.status === 201) {
          console.log("데이터 : ", response.data);
          openModal("선택한 항목이 장바구니에 담겼습니다.", closeModal); // 확인 버튼 클릭 시 모달 닫기
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        openModal("장바구니에 담는 도중 오류가 발생했습니다.", closeModal);
      });
  }
});
