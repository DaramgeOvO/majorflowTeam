const urlSignup = "http://localhost:8080/user/signup";
const urlCheckId = "http://localhost:8080/user/check-id";

let signupUserId = "";
let signupUserName = "";
let signupPassword = "";
let signupBirthDate = "";
let signupPhoneNumber = "";
let signupAddress = "";
let signupGender = "";
let signupEmail = "";
let signupNickname = "";
let signupGenre = "";

function findAddr() {
  new daum.Postcode({
    oncomplete: function (data) {
      console.log(data);

      var roadAddr = data.roadAddress;
      var jibunAddr = data.jibunAddress;

      document.getElementById("zonecode").value = data.zonecode;
      if (roadAddr !== "") {
        document.getElementById("roadAddress").value = roadAddr;
      } else if (jibunAddr !== "") {
        document.getElementById("roadAddress").value = jibunAddr;
      }
    },
  }).open();
}

function registerAddr() {
  var zonecode = document.getElementById("zonecode").value;
  var roadAddress = document.getElementById("roadAddress").value;
  var roadAddressDetail = document.getElementById("roadAddressDetail").value;

  if (zonecode && roadAddress && roadAddressDetail) {
    alert(
      "주소가 등록되었습니다:\n" +
        "우편번호: " +
        zonecode +
        "\n" +
        "도로명주소: " +
        roadAddress +
        "\n" +
        "상세주소: " +
        roadAddressDetail
    );
  } else {
    alert("모든 주소 정보를 입력해 주세요.");
  }
}

async function checkDuplicateId() {
  const userId = document.getElementById("userId").value;
  const resultElement = document.getElementById("duplicate-check-result");

  // 입력값 유효성 검사
  const idPattern = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/;
  if (!idPattern.test(userId)) {
    resultElement.innerText =
      "사용자 ID는 4~12자 사이의 영문+숫자로 이루어져야 하며 영문으로 시작되어야 합니다.";
    resultElement.style.color = "red";
    return;
  }

  try {
    console.log("Checking ID:", userId);
    const response = await axios.post(urlCheckId, { userId });
    console.log("Response received:", response);
    // 응답 데이터 확인
    console.log("Response data:", response.data);
    // exists 값 확인
    const exists = response.data.exists;
    console.log("Exists:", exists);

    if (exists) {
      resultElement.innerText = "이미 사용 중인 아이디입니다.";
      resultElement.style.color = "red";
    } else {
      resultElement.innerText = "사용 가능한 아이디입니다.";
      resultElement.style.color = "green";
    }
  } catch (error) {
    console.error("Error checking ID:", error);
    resultElement.innerText = "이미 사용 중인 아이디입니다.";
    resultElement.style.color = "red";
  }
}

async function checkDuplicateNickname() {
  const nickname = document.getElementById("nickname").value;
  const resultElement = document.getElementById(
    "nickname-duplicate-check-result"
  );

  // 입력값 유효성 검사
  const nicknamePattern = /^[a-zA-Z0-9가-힣]{1,10}$/;
  if (!nicknamePattern.test(nickname)) {
    resultElement.innerText = "닉네임은 1~10자 이내여야 합니다.";
    resultElement.style.color = "red";
    return;
  }

  try {
    console.log("Checking Nickname:", nickname);
    const response = await axios.post(
      "http://localhost:8080/user/check-nickname",
      { nickname }
    );
    console.log("Response received:", response);
    const exists = response.data.exists;
    if (exists) {
      resultElement.innerText = "이미 사용 중인 닉네임입니다.";
      resultElement.style.color = "red";
    } else {
      resultElement.innerText = "사용 가능한 닉네임입니다.";
      resultElement.style.color = "green";
    }
  } catch (error) {
    resultElement.innerText = "이미 사용 중인 닉네임입니다.";
    console.error("Error checking Nickname:", error);
  }
}

function register() {
  // 필수 항목 체크
  const requiredFields = [
    { id: "userId", message: "아이디는 필수입력 항목입니다." },
    { id: "password", message: "비밀번호는 필수입력 항목입니다." },
    { id: "confirmPassword", message: "비밀번호 확인은 필수입력 항목입니다." },
    { id: "userName", message: "이름은 필수입력 항목입니다." },
    { id: "nickname", message: "닉네임은 필수입력 항목입니다." },
    { id: "email", message: "이메일은 필수입력 항목입니다." },
    { id: "phoneNumber", message: "핸드폰 번호는 필수입력 항목입니다." },
    { id: "zonecode", message: "주소는 필수입력 항목입니다." },
    { id: "roadAddressDetail", message: "상세주소는 필수입력 항목입니다." },
    { id: "birthDate", message: "생년월일은 필수입력 항목입니다." },
  ];

  for (const field of requiredFields) {
    const inputElement = document.getElementById(field.id);
    if (!inputElement || !inputElement.value.trim()) {
      alert(field.message);
      inputElement.focus();
      return;
    }
  }

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // 비밀번호 길이 검사
  if (password.length < 6 || password.length > 20) {
    alert("비밀번호는 6~20자로 되어야 합니다.");
    document.getElementById("password").focus();
    return;
  }

  // 비밀번호와 비밀번호 확인 일치 여부 검사
  if (password !== confirmPassword) {
    alert("비밀번호와 비밀번호 확인 항목이 일치하지 않습니다.");
    document.getElementById("confirmPassword").focus();
    return;
  }

  const genderChecked = document.querySelector('input[name="gender"]:checked');
  if (!genderChecked) {
    alert("성별은 필수입력 항목입니다.");
    return;
  }

  // 필수 항목이 모두 입력되었으면 회원가입 로직 실행
  signupRegister();
}

document.querySelector("#userId").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupUserId = e.target.value;
});
document.querySelector("#userName").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupUserName = e.target.value;
});
document.querySelector("#password").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupPassword = e.target.value;
});
document.querySelector("#birthDate").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupBirthDate = e.target.value;
});
document.querySelector("#phoneNumber").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupPhoneNumber = e.target.value;
});
document.querySelector("#roadAddressDetail").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupAddress = e.target.value;
});
// document.querySelector(inputGender).addEventListener("change", (e) => {
//   console.log(e.target.value);
//   signupGender = e.target.value;
// });
document.querySelector("#email").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupEmail = e.target.value;
});
document.querySelector("#nickname").addEventListener("change", (e) => {
  console.log(e.target.value);
  signupNickname = e.target.value;
});
// document.querySelector(inputGenre).addEventListener("change", (e) => {
//   console.log(e.target.value);
//   signupGenre = e.target.value;
// });

function limitCheckboxSelection() {
  const checkboxes = document.querySelectorAll('input[name="genre"]:checked');
  const errorElement = document.getElementById("genre-error");
  if (checkboxes.length > 3) {
    checkboxes[checkboxes.length - 1].checked = false;
    errorElement.innerText = "최대 3개의 장르만 선택할 수 있습니다.";
    errorElement.style.color = "red";
  } else {
    errorElement.innerText = "";
  }
}

function formatPhoneNumber(input) {
  const value = input.value.replace(/\D/g, "");
  let formattedValue = "";

  if (value.length < 4) {
    formattedValue = value;
  } else if (value.length < 7) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else if (value.length < 11) {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(
      6
    )}`;
  } else {
    formattedValue = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(
      7
    )}`;
  }

  input.value = formattedValue;
}

// 뒤로 가기 함수
function goBack() {
  window.location.href = "login.html"; // 로그인 페이지로 이동
}

// 이벤트 리스너 추가
document
  .getElementById("phoneNumber")
  .addEventListener("input", function (event) {
    formatPhoneNumber(event.target);
  });

function signupRegister() {
  if (confirm("회원가입 하시겠습니까?")) {
    const data = {
      userId: signupUserId,
      userName: signupUserName,
      password: signupPassword,
      birthDate: signupBirthDate,
      phoneNumber: signupPhoneNumber,
      address: signupAddress,
      gender: getRadioBtn("gender"),
      email: signupEmail,
      nickname: signupNickname,
      genre: getRadioBtn("genre"),
    };
    axios
      .post(urlSignup, data, { withCredentials: true })
      .then((response) => {
        console.log("데이터 : ", response);
        if (response.status == 201) {
          alert("회원가입 완료");
          window.location.href = "login.html";
        }
      })
      .catch((error) => {
        console.log("에러 발생 : ", error);
      });
  }
}

function getRadioBtn(name) {
  const elements = document.getElementsByName(name);
  const arrayElements = [...elements];
  console.log(arrayElements);
  let values = arrayElements.filter((e) => e.checked).map((e) => e.value);
  return values;
}
