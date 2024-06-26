const btns = document.querySelectorAll(".noticeBox3-2");
const urlLogout = "http://localhost:8080/user/logout";

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const noticeBox2Item = btn.parentNode;
    const isActive = noticeBox2Item.classList.contains("active");

    removeActiveClasses();

    if (!isActive) {
      noticeBox2Item.classList.add("active");
    }
  });
});

function removeActiveClasses() {
  btns.forEach((btn) => {
    btn.parentNode.classList.remove("active");
  });
}

document.querySelectorAll(".subMenu > div").forEach((div) => {
  div.addEventListener("click", () => {
    document
      .querySelectorAll(".subMenu > div")
      .forEach((item) => item.classList.remove("active"));

    // 클릭된 div에 active 클래스 추가
    div.classList.add("active");
  });
});

/*document.querySelector(".noticeBox6").addEventListener("click", () => {
  document.querySelector(".noticeWriteBox").classList.remove("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".customerInquiryBox").classList.add("hidden");
  document.querySelector(".inquiryBox1-1").classList.add("hidden");
});*/

document.querySelector(".noticeBtn").addEventListener("click", () => {
  document.querySelector(".noticeBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".customerInquiryBox").classList.add("hidden");
  document.querySelector(".inquiryBox1-1").classList.add("hidden");
});

document.querySelector(".customerInquiryBtn").addEventListener("click", () => {
  document.querySelector(".customerInquiryBox").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".inquiryBox1-1").classList.add("hidden");
});

document.querySelector(".customerInquiryBox6").addEventListener("click", () => {
  document.querySelector(".inquiryBox1-1").classList.remove("hidden");
  document.querySelector(".noticeWriteBox").classList.add("hidden");
  document.querySelector(".noticeBox").classList.add("hidden");
  document.querySelector(".customerInquiryBox").classList.add("hidden");
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
      console.log("로그인 안됨");
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

// 댓글달기 모달 기능 추가
const commentBtns = document.querySelectorAll(".noticeBox5-1");
const modal = document.getElementById("commentModal");
const closeBtn = document.querySelector(".close-btn");

commentBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("commentInput").value = ""; // 댓글 입력창 초기화
    modal.classList.remove("hidden");
    modal.style.display = "block";
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
});

document.getElementById("commentSubmit").addEventListener("click", () => {
  const comment = document.getElementById("commentInput").value;
  if (comment) {
    alert("댓글이 등록되었습니다: " + comment);
    document.getElementById("commentInput").value = ""; // 댓글 입력창 초기화
    modal.classList.add("hidden");
    modal.style.display = "none";
  } else {
    alert("댓글을 입력하세요.");
  }
});
