const urlLogout = "http://localhost:8080/user/logout";
const urlReview = "http://localhost:8080/review/get";

let currentUser = {};

document.querySelector(".reviewBtn").addEventListener("click", () => {
  document.querySelector(".review").classList.remove("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const reviewWriteBtn = document.querySelector(".reviewWriteBtn");
  const reviewModal = document.getElementById("reviewModal");
  const reviewModalCloseBtn = document.querySelector(".reviewModalCloseBtn");
  const reviewWriteBtn2 = document.querySelector(".reviewWriteBtn2");
  const starRating = document.querySelectorAll(".reviewWriteStar");
  let selectedRating = 1;

  reviewWriteBtn.addEventListener("click", () => {
    reviewModal.style.display = "block";
  });

  reviewModalCloseBtn.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === reviewModal) {
      reviewModal.style.display = "none";
    }
  });

  starRating.forEach((star, index) => {
    star.addEventListener("click", () => {
      selectedRating = index + 1;
      starRating.forEach((s, i) => {
        if (i < selectedRating) {
          s.classList.add("on");
        } else {
          s.classList.remove("on");
        }
      });
    });
  });

  reviewWriteBtn2.addEventListener("click", () => {
    const reviewContent = document.querySelector(".star_box").value;
    if (!reviewContent) {
      alert("리뷰 내용을 작성해주세요.");
      return;
    }

    const data = {
      user: {
        userId: currentUser.userId,
        authority: {
          authorityName: currentUser.authority[0].authority,
        },
      },
      lecture: {
        lectureId: 1,
      },
      text: reviewContent,
      rating: selectedRating,
      // reviewTime 필드는 서버에서 자동으로 설정되도록 제거
    };

    axios
      .post("http://localhost:8080/review/save", data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("데이터: ", response);
        fetchReviews(); // 리뷰 작성 후 리뷰 목록 갱신
      })
      .catch((error) => {
        console.log("에러발생: ", error);
      });

    reviewModal.style.display = "none";
    document.querySelector(".star_box").value = "";
    starRating.forEach((s) => s.classList.remove("on"));
    selectedRating = 1;
    starRating[0].classList.add("on");
  });

  fetchReviews(); // 페이지 로드 시 리뷰 가져오기
});

function fetchReviews() {
  axios
    .get(urlReview, { withCredentials: true })
    .then((response) => {
      console.log("리뷰 데이터:", JSON.stringify(response.data, null, 2));
      displayReviews(response.data);
    })
    .catch((error) => {
      console.log("리뷰 가져오기 오류:", error);
    });
}

function displayReviews(reviews) {
  const reviewContainer = document.querySelector(".reviewBox6");
  reviewContainer.innerHTML = ""; // 기존 리뷰 초기화

  reviews.forEach((review) => {
    // reviewTime 필드 사용
    const formattedDate = formatDate(review.reviewTime);

    const newReview = document.createElement("div");
    newReview.classList.add("reviewBox7");
    newReview.innerHTML = `
      <div class="reviewBox7Grid">
        <div>
          <div class="reviewBox7Grid-1">${review.user.userId}</div>
        </div>
        <div>
          <div class="reviewBox7Grid-4">${"★".repeat(
            review.rating
          )}${"☆".repeat(5 - review.rating)}</div>
          <div class="reviewBox7Grid-3">${formattedDate}</div>
        </div>
      </div>
      <div class="reviewBox8">${review.text}</div>
      <div class="reviewBox9Grid">
        <div class="reviewBox9Grid-2">
          <div class="reviewBox9Grid-1">좋아요 <span class="likeCount">0</span>개</div>
        </div>
        <div class="reviewBox9Grid-2">
          <img src="/img/하트.png" width="25" height="25" class="likeBtn"/>
          <div class="reviewBox9Grid-1">좋아요</div>
        </div>
      </div>
    `;

    reviewContainer.appendChild(newReview);

    // 좋아요 버튼 클릭 이벤트 추가
    const likeBtn = newReview.querySelector(".likeBtn");
    const likeCount = newReview.querySelector(".likeCount");
    likeBtn.addEventListener("click", () => {
      let count = parseInt(likeCount.textContent, 10);
      likeCount.textContent = count + 1;
    });
  });
}

// 날짜 형식을 변환하는 함수
function formatDate(dateString) {
  if (!dateString) return "날짜 없음";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // 유효하지 않은 날짜면 원본 문자열 반환

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

function sessionCurrent() {
  axios
    .get("http://localhost:8080/user/current", { withCredentials: true })
    .then((response) => {
      console.log("데이터: ", response);
      if (response.status == 200 && response.data.userId !== "anonymousUser") {
        console.log("세션 유지");
        currentUser = response.data;
        const userId = response.data.userId;
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
