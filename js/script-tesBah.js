// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// Menu diklik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik Luar Sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");
document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

const questions = [
  {
    question:
      "Seberapa sering Anda merasa senang dan bersemangat dalam menjalani aktivitas sehari-hari?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa puas dengan pencapaian dan hasil kerja Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa bergairah dan antusias dalam menjalani hidup?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa dekat dengan orang-orang yang Anda sayangi?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa terhubung dengan diri sendiri dan memiliki waktu untuk introspeksi?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa berterima kasih atas hal-hal kecil dalam hidup?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa damai dan tenteram dalam pikiran dan perasaan Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa diberi pengakuan dan apresiasi oleh orang lain?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa mampu menghadapi tantangan dan mengatasi hambatan?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa memiliki kontrol dan kebebasan dalam keputusan hidup Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa bahagia dengan kondisi kesehatan fisik dan mental Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa optimis dan memiliki harapan baik tentang masa depan?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa ada arti dan tujuan dalam hidup Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa dicintai dan mendapatkan dukungan dari orang-orang di sekitar Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa mampu menikmati momen kecil dan merasa berkecukupan?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
];

let currentQuestionIndex = 0;
const answers = [];

const questionContainer = document.getElementById("questionContainer");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const progressBar = document.getElementById("progressBar");

prevButton.addEventListener("click", function () {
  currentQuestionIndex--;
  renderQuestion();
});

nextButton.addEventListener("click", function () {
  const selectedOption = document.querySelector(".selected");
  if (selectedOption) {
    const stressCount = getStressCount(selectedOption.textContent);
    answers[currentQuestionIndex] = stressCount;
    currentQuestionIndex++;
    renderQuestion();
  } else {
    alert("Silakan pilih satu opsi jawaban");
  }
});

function getStressCount(option) {
  if (option === "Tidak Pernah") {
    return 0;
  } else if (option === "Jarang") {
    return 1;
  } else if (option === "Sering") {
    return 2;
  }
}

function renderQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];

    let optionsHTML = "";
    question.options.forEach((option, index) => {
      const isSelected =
        answers[currentQuestionIndex] === getStressCount(option);
      const selectedClass = isSelected ? "selected" : "";
      optionsHTML += `
            <button type="button" class="option ${selectedClass}" onclick="selectOption(this)">${option}</button>
          `;
    });

    questionContainer.innerHTML = `
          <div class="question">
            <p>${question.question}</p>
            <div class="options">
              ${optionsHTML}
            </div>
          </div>
        `;

    updateButtons();
    updateProgressBar();

    if (currentQuestionIndex === 0) {
      prevButton.style.display = "none";
    } else {
      prevButton.style.display = "block";
    }

    if (currentQuestionIndex === questions.length - 1) {
      nextButton.textContent = "Hitung";
    }
  } else {
    calculateStressLevel();
  }
}

function selectOption(optionButton) {
  const selectedOption = document.querySelector(".selected");
  if (selectedOption) {
    selectedOption.classList.remove("selected");
  }
  optionButton.classList.add("selected");
}

function updateButtons() {
  prevButton.disabled = currentQuestionIndex === 0;
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1 ? "Hitung" : "Selanjutnya";
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

function calculateStressLevel() {
  const stressCount = answers.reduce((total, count) => total + count, 0);

  let stressLevel;
  if (stressCount <= 0) {
    stressLevel = "Anda Perlu Healing Sesekali :)";
  } else if (stressCount <= 10) {
    stressLevel = "Anda Kurang Bahagia";
  } else if (stressCount <= 20) {
    stressLevel = "Anda Sudah Cukup Bahagia";
  } else if (stressCount >= 21) {
    stressLevel = "Anda Sangat Bahagia Pertahankan!";
  }

  displayResult(stressLevel);
}

function displayResult(stressLevel) {
  const resultDiv = document.getElementById("result");
  questionContainer.style.display = "none";
  prevButton.style.display = "none";
  nextButton.style.display = "none";
  resultDiv.textContent = stressLevel;
  resultDiv.style.display = "block";
  restartButton.style.display = "block";
}

renderQuestion();
