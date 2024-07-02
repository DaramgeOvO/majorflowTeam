const urlLogout = "http://localhost:8080/user/logout";
const urlNotice = "http://localhost:8080/board/getAll";
let currentUser = {};
let boardId = -1;
let boardContents = [];

// 공지사항 박스 클릭 이벤트 설정
function setNoticeBoxEventListeners() {
  const btns = document.querySelectorAll(".noticeBox3-2");
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
}

function removeActiveClasses() {
  const btns = document.querySelectorAll(".noticeBox3-2");
  btns.forEach((btn) => {
    btn.parentNode.classList.remove("active");
  });
}

// 서브 메뉴 클릭 이벤트 설정
document.querySelectorAll(".subMenu > div").forEach((div) => {
  div.addEventListener("click", () => {
    document
      .querySelectorAll(".subMenu > div")
      .forEach((item) => item.classList.remove("active"));
    div.classList.add("active");
  });
});

// 페이지 로드 시 공지사항 데이터 가져오기
document.addEventListener("DOMContentLoaded", function () {
  fetchNoticeData();
  sessionCurrent();
});

function fetchNoticeData() {
  axios
    .get(urlNotice)
    .then(function (response) {
      console.log("공지사항 데이터:", response.data);
      response.data.sort(
        (a, b) => new Date(b.freeBoardTime) - new Date(a.freeBoardTime)
      );
      boardContents = response.data;
      updateNoticeBox(response.data);
    })
    .catch(function (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
      document.querySelector(".noticeContentWrapper").innerHTML =
        "데이터를 불러오는 데 실패했습니다.";
    });
}

function updateNoticeBox(data) {
  const noticeContentWrapper = document.querySelector(".noticeContentWrapper");
  noticeContentWrapper.innerHTML = ""; // 기존 내용을 지우기 위해 초기화
  if (data && data.length > 0) {
    data.forEach((notice) => {
      // 날짜 형식 변환
      const date = new Date(notice.freeBoardTime);
      const formattedDate = `${date.getFullYear()}-${padZero(
        date.getMonth() + 1
      )}-${padZero(date.getDate())}`;

      const noticeId = notice.freeBoardId;

      // 공지사항 항목 생성
      const noticeBox2 = document.createElement("div");
      noticeBox2.classList.add("noticeBox2");
      noticeBox2.id = "noticeContent";

      const noticeBox3 = document.createElement("div");
      noticeBox3.classList.add("noticeBox3");

      const noticeTitle = document.createElement("div");
      noticeTitle.classList.add("noticeBox3-1");
      noticeTitle.textContent = notice.title;

      const noticeDate = document.createElement("div");
      noticeDate.classList.add("noticeBox3Date");
      noticeDate.textContent = formattedDate;

      const noticeBoxLine = document.createElement("div");
      noticeBoxLine.classList.add("noticeBoxLine");

      const noticeContent = document.createElement("div");
      noticeContent.classList.add("noticeBox3-4");

      const noticeText = document.createElement("p");
      noticeText.classList.add("noticeBox4");
      noticeText.textContent = notice.text;

      const noticeReply = document.createElement("div");
      noticeReply.classList.add("noticeReply");

      const noticeBox5 = document.createElement("div");
      noticeBox5.classList.add("noticeBox5");

      const commentIcon = document.createElement("img");
      commentIcon.src = "/img/말풍선.png";

      const commentBtn = document.createElement("div");
      commentBtn.classList.add("noticeBox5-1");
      commentBtn.textContent = "댓글달기";

      const toggleBtn = document.createElement("a");
      toggleBtn.classList.add("noticeBox3-2");
      toggleBtn.innerHTML =
        '<span class="noticeBox3-3 open">+</span><span class="noticeBox3-3 close">-</span>';

      noticeBox3.appendChild(noticeTitle);
      noticeBox3.appendChild(noticeDate);
      noticeBox2.appendChild(noticeBox3);
      noticeBox2.appendChild(noticeBoxLine);
      noticeContent.appendChild(noticeText);
      noticeContent.appendChild(noticeReply);
      noticeBox5.appendChild(commentIcon);
      noticeBox5.appendChild(commentBtn);
      noticeContent.appendChild(noticeBox5);
      noticeBox2.appendChild(noticeContent);
      noticeBox2.appendChild(toggleBtn);

      noticeContentWrapper.appendChild(noticeBox2);

      getReply(noticeId);

      function getReply(id) {
        axios
          .get("http://localhost:8080/reply/get", { withCredentials: true })
          .then((response) => {
            console.log("댓글 데이터 : ", response.data);
            const replyData = response.data;
            replyData.forEach((r) => {
              if (id == r.freeBoard.freeBoardId) {
                console.log(r);

                const replyBox1 = document.createElement("div");
                replyBox1.classList.add("replyBox1");
                replyBox1.textContent = r.user.userId;

                const replyBox2 = document.createElement("div");
                replyBox2.classList.add("replyBox2");
                replyBox2.textContent = r.replyText;

                const replyBox3 = document.createElement("div");
                replyBox3.classList.add("replyBox3");
                replyBox3.textContent = r.replyTime;

                noticeReply.appendChild(replyBox1);
                noticeReply.appendChild(replyBox2);
                noticeReply.appendChild(replyBox3);
              }
            });
          });
      }
    });
  } else {
    noticeContentWrapper.innerHTML = "공지사항이 없습니다.";
  }

  // 공지사항 업데이트 후 이벤트 리스너 재설정
  setNoticeBoxEventListeners();
  setCommentModalEventListeners();
}

// 날짜가 한 자리 수일 경우 앞에 0을 붙이는 함수
function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("세션 데이터: ", response.data);
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        currentUser = {
          userId: response.data.userId,
          authority: {
            authorityName: response.data.authority[0].authority,
          },
        };
        document.querySelector(".menuLoginBtn").classList.add("hidden");
        document.querySelector(".menuLogoutBtn").classList.remove("hidden");
      } else {
        document.querySelector(".menuLogoutBtn").classList.add("hidden");
        document.querySelector(".menuLoginBtn").classList.remove("hidden");
      }
    })
    .catch((error) => {
      console.log("로그인 안됨:", error);
    });
}

function openModal(message, callback) {
  const alertModal = document.getElementById("myAlertModal");
  const alertModalMessage = document.getElementById("alertModalMessage");
  alertModalMessage.textContent = message;
  alertModal.style.display = "block";

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
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("에러 발생: ", error);
      });
  });
});

// 모달 내 취소 버튼 클릭 시 모달 닫기
document.querySelector(".alertClose").addEventListener("click", () => {
  closeModal(); // 모달 닫기
});

function setCommentModalEventListeners() {
  const commentBtns = document.querySelectorAll(".noticeBox5-1");
  const modal = document.getElementById("commentModal");
  const closeBtn = document.querySelector(".close-btn");

  commentBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      boardId = index;
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
      // openModal("댓글이 등록되었습니다: " + comment);
      document.getElementById("commentInput").value = ""; // 댓글 입력창 초기화
      modal.classList.add("hidden");
      modal.style.display = "none";
      window.location.reload();
    }
    // else {
    //   alert("댓글을 입력하세요.");
    // }
  });
}

commentSubmit.addEventListener("click", () => {
  // const replyUserId = document.querySelector(".replyUserId");
  const replyContent = document.querySelector(".commentInput");
  const replyUser = "";
  const content = replyContent.value;

  const now = new Date();
  const replyTime = now.toISOString();

  const data = {
    user: currentUser,
    replyText: content,
    replyTime: replyTime,
    freeBoard: {
      freeBoardId: boardContents[boardId].freeBoardId,
    },
  };
  console.log("테스트: ", boardId, boardContents);

  axios
    .post("http://localhost:8080/reply/save", data, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("데이터 저장 성공 : ", response);
      // openModal(`댓글이 등록되었습니다.`, () => {
      //   window.location.reload();
      // });
      replyContent.value = "";
    })
    .catch((error) => {
      console.log("에러 발생 : ", error);
      openModal("댓글 등록에 실패했습니다.");
    });
});

// 초기 모달 이벤트 리스너 설정
setCommentModalEventListeners();
sessionCurrent();
