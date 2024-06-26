const urlLogout = "http://localhost:8080/user/logout";
const urlNotice = "http://localhost:8080/board/getAll";

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
    document.querySelectorAll(".subMenu > div").forEach((item) => item.classList.remove("active"));
    div.classList.add("active");
  });
});

// 페이지 로드 시 공지사항 데이터 가져오기
document.addEventListener('DOMContentLoaded', function() {
  fetchNoticeData();
  sessionCurrent();
});

function fetchNoticeData() {
  axios.get(urlNotice)
    .then(function (response) {
      console.log('공지사항 데이터:', response.data); // 콘솔 로그 추가
      updateNoticeBox(response.data);
    })
    .catch(function (error) {
      console.error('데이터를 가져오는 중 오류 발생:', error);
      document.getElementById('noticeContent').innerHTML = '데이터를 불러오는 데 실패했습니다.';
    });
}


function updateNoticeBox(data) {
  const noticeContent = document.getElementById('noticeContent');
  if (data && data.length > 0) {
    noticeContent.innerHTML = data.map(notice => {
      // 날짜 형식 변환
      const date = new Date(notice.freeBoardTime);
      const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())}`;

      return `
        <div class="noticeBox3">
          <div class="noticeBox3-1">${notice.title}</div>
          <div class="noticeBox3Date">${formattedDate}</div>
        </div>
        <div class="noticeBoxLine"></div>
        <div class="noticeBox3-4">
          <p class="noticeBox4">${notice.text}</p>
          <div class="noticeBox5">
            <img src="/img/말풍선.png" alt="댓글 아이콘" />
            <div class="noticeBox5-1">댓글달기</div>
          </div>
        </div>
        <a class="noticeBox3-2">
          <span class="noticeBox3-3 open">+</span>
          <span class="noticeBox3-3 close">-</span>
        </a>
      `;
    }).join('');
  } else {
    noticeContent.innerHTML = '공지사항이 없습니다.';
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
      console.log("세션 데이터: ", response.data); // 콘솔 로그 추가
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
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
// 모달 내 취소 버튼 클릭 시 모달 닫기
document.querySelector(".alertClose").addEventListener("click", () => {
  closeModal(); // 모달 닫기
});

function setCommentModalEventListeners() {
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
}

// 초기 모달 이벤트 리스너 설정
setCommentModalEventListeners();
