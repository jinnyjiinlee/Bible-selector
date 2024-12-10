// 말씀 데이터
const verses = [
  { text: "태초에 하나님이\n천지를 창조하시니라.", reference: "창세기 1:1" },
  { text: "하나님이\n세상을\n이처럼 사랑하사\n독생자를 주셨으니", reference: "요한복음 3:16" },
  { text: "여호와는\n나의 목자시니\n내가 부족함이 없으리로다.", reference: "시편 23:1" },
  { text: "너의 행사를\n여호와께 맡기라\n그리하면\n네가 경영하는 것이\n이루어지리라.", reference: "잠언 16:3" },
  { text: "하나님을\n사랑하는 자에게는\n모든 것이 합력하여\n선을 이루느니라.", reference: "로마서 8:28" }
];

const mainPage = document.getElementById("main-page");
const loadingPage = document.getElementById("loading-page");
const resultPage = document.getElementById("result-page");
const randomButton = document.getElementById("randomButton");
const backButton = document.getElementById("backButton");
const saveButton = document.getElementById("saveButton");
const kakaoButton = document.getElementById("kakaoButton");
const verseText = document.getElementById("verseText");
const fabMenuBtn = document.getElementById("fabMenuBtn");
const fabMenu = document.querySelector(".fab-menu");

let currentVerse = null;

// FAB 메뉴 토글
fabMenuBtn.addEventListener("click", () => {
  fabMenu.classList.toggle("open");
});

function showRandomVerse() {
  const randomIndex = Math.floor(Math.random() * verses.length);
  currentVerse = verses[randomIndex];

  verseText.innerHTML = `
    <div class="tag-card fade-in" id="verseCard">
      <div class="tag-top">
        <div class="tag-hole"></div>
        <p class="tag-title">2 0 2 5   Y E A R</p>
      </div>
      <div class="tag-body">
        <p class="tag-verse">${currentVerse.text}</p>
        <p class="tag-reference">${currentVerse.reference}</p>
      </div>
    </div>
  `;

  // 컨페티 효과
  setTimeout(() => {
    loadingPage.classList.remove("visible");
    loadingPage.classList.add("hidden");
    resultPage.classList.remove("hidden");
    resultPage.classList.add("visible");
    triggerConfetti();
  }, 6000); // 초 대기
}

// 컨페티 애니메이션
function triggerConfetti() {
  const confettiCount = 30;
  for(let i = 0; i < confettiCount; i++){
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + '%';
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 3000);
  }
}

randomButton.addEventListener("click", () => {
  mainPage.classList.remove("visible");
  mainPage.classList.add("hidden");
  loadingPage.classList.remove("hidden");
  loadingPage.classList.add("visible");
  showRandomVerse();
});

backButton.addEventListener("click", () => {
  resultPage.classList.remove("visible");
  resultPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
  mainPage.classList.add("visible");
});

saveButton.addEventListener("click", () => {
  const verseCard = document.getElementById("verseCard");
  html2canvas(verseCard, { 
    scale: 3, 
    backgroundColor: null, 
    useCORS: true,
    foreignObjectRendering: true
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = '말씀.png';
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

kakaoButton.addEventListener("click", () => {
  Kakao.Link.sendDefault({
    objectType: 'text',
    text: `📜 오늘의 말씀\n\n"${currentVerse.text}"\n\n- ${currentVerse.reference}\n`,
    link: {
      mobileWebUrl: 'https://example.com',
      webUrl: 'https://example.com'
    },
    buttons: [
      {
        title: '말씀 서비스 바로가기',
        link: {
          mobileWebUrl: 'https://example.com',
          webUrl: 'https://example.com'
        }
      }
    ]
  });
});
