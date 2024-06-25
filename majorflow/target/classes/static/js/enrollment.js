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
            const lectureName =
              lectureInfoDiv.querySelector(".lectureEnrollname").innerText;
            const teacherName =
              lectureInfoDiv.querySelector(".teacherEnrollname").innerText;
            const hobbyCheckbox =
              lectureInfoDiv.querySelector(".hobbyCheckbox");
            const examCheckbox = lectureInfoDiv.querySelector(".examCheckbox");

            if (hobbyCheckbox.checked) {
              addToCart(
                userId,
                lecture.lectureId,
                lectureName,
                teacherName,
                "취미반",
                160000
              );
            }

            if (examCheckbox.checked) {
              addToCart(
                userId,
                lecture.lectureId,
                lectureName,
                teacherName,
                "입시반",
                200000
              );
            }
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

        const hobbyCheckboxDiv = document.createElement("div");
        const hobbyCheckbox = document.createElement("input");
        hobbyCheckbox.type = "checkbox";
        hobbyCheckbox.classList.add("styled-checkbox", "hobbyCheckbox");
        hobbyCheckbox.id = `hobby${index + 1}`;
        hobbyCheckbox.addEventListener("change", function () {
          if (this.checked) {
            document.getElementById(`exam${index + 1}`).checked = false;
          }
        });
        const hobbyLabel = document.createElement("label");
        hobbyLabel.setAttribute("for", `hobby${index + 1}`);
        hobbyLabel.innerText = "취미반";
        hobbyCheckboxDiv.appendChild(hobbyCheckbox);
        hobbyCheckboxDiv.appendChild(hobbyLabel);
        const hobbyPriceText = document.createElement("div");
        hobbyPriceText.innerText = "160,000";

        hobbyPriceDiv.appendChild(hobbyCheckboxDiv);
        hobbyPriceDiv.appendChild(hobbyPriceText);

        const examPriceDiv = document.createElement("div");
        examPriceDiv.classList.add("enrollPrice");

        const examCheckboxDiv = document.createElement("div");
        const examCheckbox = document.createElement("input");
        examCheckbox.type = "checkbox";
        examCheckbox.classList.add("styled-checkbox", "examCheckbox");
        examCheckbox.id = `exam${index + 1}`;
        examCheckbox.addEventListener("change", function () {
          if (this.checked) {
            document.getElementById(`hobby${index + 1}`).checked = false;
          }
        });
        const examLabel = document.createElement("label");
        examLabel.setAttribute("for", `exam${index + 1}`);
        examLabel.innerText = "입시반";
        examCheckboxDiv.appendChild(examCheckbox);
        examCheckboxDiv.appendChild(examLabel);
        const examPriceText = document.createElement("div");
        examPriceText.innerText = "200,000";

        examPriceDiv.appendChild(examCheckboxDiv);
        examPriceDiv.appendChild(examPriceText);

        lectureInfoDiv.appendChild(cartBtnDiv);
        lectureInfoDiv.appendChild(lectureNameDiv);
        lectureInfoDiv.appendChild(teacherNameDiv);
        lectureInfoDiv.appendChild(hobbyPriceDiv);
        lectureInfoDiv.appendChild(examPriceDiv);

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

  function addToCart(userId, lectureId, lectureName, teacherName, type, price) {
    axios
      .post("http://localhost:8080/cart/add/" + userId + "/" + lectureId)
      .then((response) => {
        if (response.status === 201) {
          addToSessionCart(lectureName, teacherName, type, price);
          alert("선택한 항목이 장바구니에 담겼습니다.");
        }
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
        alert("장바구니에 담는 도중 오류가 발생했습니다.");
      });
  }

  function addToSessionCart(lectureName, teacherName, type, price) {
    const cartItems = JSON.parse(localStorage.getItem(userId)) || [];
    cartItems.push({ lectureName, teacherName, type, price });
    localStorage.setItem(userId, JSON.stringify(cartItems));

    // 페이지 새로고침 없이 다른 페이지로 이동해도 데이터 유지
  }
});
