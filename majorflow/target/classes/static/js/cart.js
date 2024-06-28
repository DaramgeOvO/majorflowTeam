document.addEventListener("DOMContentLoaded", function () {
  let userId;
  let itemToDelete;
  let cartItems = []; // 전역 변수로 선언

  sessionCurrent();

  function sessionCurrent() {
    axios
      .get("http://localhost:8080/user/current", { withCredentials: true })
      .then((response) => {
        console.log("데이터: ", response);
        if (
          response.status === 200 &&
          response.data.userId !== "anonymousUser"
        ) {
          console.log("세션 유지");
          userId = response.data.userId;
          document.querySelector(".menuLoginBtn").classList.add("hidden");
          document.querySelector(".menuLogoutBtn").classList.remove("hidden");

          displayCartItems(userId);
        } else {
          document.querySelector(".menuLogoutBtn").classList.add("hidden");
          document.querySelector(".menuLoginBtn").classList.remove("hidden");
        }
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
  }

  function displayCartItems(userId) {
    axios
      .get("http://localhost:8080/cart/user/" + userId)
      .then((response) => {
        console.log("데이터: ", response);
        cartItems = response.data;
        const cartItemsContainer = document.querySelector(
          ".cartItemsContainer"
        );

        // 기존의 장바구니 아이템을 삭제
        cartItemsContainer.innerHTML = "";

        // 장바구니 아이템들을 UI에 추가
        cartItems.forEach((item) => {
          console.log(item);
          const cartBox1 = document.createElement("div");
          cartBox1.classList.add("cartBox1");
          cartBox1.setAttribute("data-item-id", item.id);

          const cartBox2 = document.createElement("div");
          cartBox2.classList.add("cartBox2");
          cartBox2.textContent = item.lecture.lectureName;

          const cartBoxLine = document.createElement("div");
          cartBoxLine.classList.add("cartBoxLine");

          const cartBox3 = document.createElement("div");
          cartBox3.classList.add("cartBox3");
          cartBox3.textContent = item.lecture.teacher.teacherName;

          const cartBox4 = document.createElement("div");
          cartBox4.classList.add("cartBox3");
          cartBox4.textContent = item.lecture.lectureClass;

          const cartBox5 = document.createElement("div");
          cartBox5.classList.add("cartBox3");
          cartBox5.textContent = item.lecture.price + "원";

          const cartBoxRemove = document.createElement("div");
          cartBoxRemove.classList.add("cartBoxRemove");
          cartBoxRemove.textContent = "삭제";
          cartBoxRemove.addEventListener("click", () => {
            itemToDelete = item;
            openModal("장바구니에서 삭제하시겠습니까?");
          });

          cartItemsContainer.appendChild(cartBox1);
          cartBox1.appendChild(cartBox2);
          cartBox1.appendChild(cartBoxLine);
          cartBox1.appendChild(cartBox3);
          cartBox1.appendChild(cartBox4);
          cartBox1.appendChild(cartBox5);
          cartBox1.appendChild(cartBoxRemove);
        });

        updateTotalPrice(cartItems);

        document.querySelector(".cartBox6").addEventListener("click", () => {
          openModal("구매하시겠습니까?");
        });

        document
          .getElementById("alertConfirm")
          .addEventListener("click", handleAlertConfirm);
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });

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

    function handleAlertConfirm() {
      const alertModalMessage =
        document.getElementById("alertModalMessage").textContent;

      if (alertModalMessage === "로그아웃하시겠습니까?") {
        axios
          .post(
            "http://localhost:8080/user/logout",
            {},
            { withCredentials: true }
          )
          .then((response) => {
            console.log("데이터: ", response);
            if (response.status === 200) {
              closeModal(); // 모달 닫기
              document
                .querySelector(".menuLoginBtn")
                .classList.remove("hidden");
              document.querySelector(".menuLogoutBtn").classList.add("hidden");
            }
          })
          .catch((error) => {
            console.log("에러 발생: ", error);
          });
      } else if (alertModalMessage === "장바구니에서 삭제하시겠습니까?") {
        axios
          .delete(
            "http://localhost:8080/cart/delete/" +
              userId +
              "/" +
              itemToDelete.id
          )
          .then((response) => {
            console.log("데이터: ", response);
            const cartBox1 = document.querySelector(
              `[data-item-id="${itemToDelete.id}"]`
            );
            if (cartBox1) cartBox1.remove();
            closeModal(); // 모달 닫기
          })
          .catch((error) => {
            console.log("에러 발생:", error);
          });
      } else if (alertModalMessage === "구매하시겠습니까?") {
        saveLecture(userId, cartItems);
        closeModal(); // 모달 닫기
        openModal("구매 완료! 마이페이지에서 확인할 수 있습니다.");
      } else if (
        alertModalMessage === "구매 완료! 마이페이지에서 확인할 수 있습니다."
      ) {
        closeModal();
        window.location.reload();
      }
    }

    document.querySelector(".menuLogoutBtn").addEventListener("click", () => {
      openModal("로그아웃하시겠습니까?");
    });

    document.querySelector(".alertClose").addEventListener("click", closeModal);
  }

  // 총 가격을 업데이트하는 함수
  function updateTotalPrice(cartItems) {
    const totalPriceContainer = document.getElementById("totalPriceContainer");
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.lecture.price,
      0
    );
    totalPriceContainer.textContent = `총 가격: ${totalPrice.toLocaleString()}원`;
  }
});

function saveLecture(userId, cartItem) {
  cartItem.forEach((item) => {
    axios
      .post(
        "http://localhost:8080/edutech/save/" +
          userId +
          "/" +
          item.lecture.lectureId
      )
      .then((response) => {
        console.log("데이터: ", response);
        axios
          .delete("http://localhost:8080/cart/delete/" + userId + "/" + item.id)
          .then((response) => {
            console.log("데이터: ", response);
            const cartBox1 = document.querySelector(
              `[data-item-id="${item.id}"]`
            );
            if (cartBox1) cartBox1.remove();
          })
          .catch((error) => {
            console.log("에러 발생:", error);
          });
      })
      .catch((error) => {
        console.log("에러 발생 : ", error);
      });
  });
}
