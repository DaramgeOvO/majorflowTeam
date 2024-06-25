document.addEventListener("DOMContentLoaded", function () {
  let userId;
  sessionCurrent();

  // 세션을 통해 현재 사용자를 확인하는 함수
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

          let cartItems = JSON.parse(localStorage.getItem(userId));
          fetchAndRenderCart(cartItems, userId);
        } else {
          document.querySelector(".menuLogoutBtn").classList.add("hidden");
          document.querySelector(".menuLoginBtn").classList.remove("hidden");
        }
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });
  }

  // 장바구니 데이터를 가져와 화면에 출력하는 함수
  function fetchAndRenderCart(item, userId) {
    const cartItemsContainer = document.getElementById("cartItemsContainer");

    // 기존 아이템 제거
    cartItemsContainer.innerHTML = "";

    // 장바구니 아이템들을 UI에 추가
    item.forEach((data, index) => {
      const cartBox1 = document.createElement("div");
      cartBox1.classList.add("cartBox1");

      const cartBox2 = document.createElement("div");
      cartBox2.classList.add("cartBox2");
      cartBox2.textContent = data.lectureName;

      const cartBoxLine = document.createElement("div");
      cartBoxLine.classList.add("cartBoxLine");

      const cartBox3 = document.createElement("div");
      cartBox3.classList.add("cartBox3");
      cartBox3.textContent = data.teacherName;

      const cartBox4 = document.createElement("div");
      cartBox4.classList.add("cartBox3");
      cartBox4.textContent = data.type;

      const cartBox5 = document.createElement("div");
      cartBox5.classList.add("cartBox3");
      cartBox5.textContent = data.price + "원";

      const cartBoxRemove = document.createElement("div");
      cartBoxRemove.classList.add("cartBoxRemove");
      cartBoxRemove.textContent = "삭제";
      cartBoxRemove.addEventListener("click", () => {
        if (confirm("장바구니에서 삭제하시겠습니까?")) {
          item.splice(index, 1);
          fetchAndRenderCart(item, userId);
        }
      });

      cartItemsContainer.appendChild(cartBox1);
      cartBox1.appendChild(cartBox2);
      cartBox1.appendChild(cartBoxLine);
      cartBox1.appendChild(cartBox3);
      cartBox1.appendChild(cartBox4);
      cartBox1.appendChild(cartBox5);
      cartBox1.appendChild(cartBoxRemove);
    });

    updateTotalPrice(item);
  }

  // 총 가격을 업데이트하는 함수
  function updateTotalPrice(cartItems) {
    const totalPriceContainer = document.getElementById("totalPriceContainer");
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
    totalPriceContainer.textContent = `총 가격: ${totalPrice.toLocaleString()}원`;
  }

  document.querySelector(".cartBox6").addEventListener("click", () => {
    if (confirm("구매하시겠습니까?")) {
      let cartItems = JSON.parse(localStorage.getItem(userId));
      localStorage.setItem(userId + "_purchased", JSON.stringify(cartItems));
      localStorage.removeItem(userId);
      window.location.reload();
      alert("구매 완료! 마이페이지에서 확인할 수 있습니다.");
    }
  });

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
          if (response.status === 200) {
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
});
