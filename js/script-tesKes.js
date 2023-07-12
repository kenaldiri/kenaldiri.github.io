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
      "Seberapa sering Anda merasa terluka atau terpengaruh secara emosional oleh tindakan atau kata-kata orang lain?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa kesulitan membangun dan mempertahankan hubungan yang berarti dengan orang lain?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa sendirian dan tidak ada yang memahami Anda sepenuhnya?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa terabaikan atau tidak dihargai oleh orang lain?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa terbebani dengan harapan sosial yang tinggi atau standar yang sulit dipenuhi?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa tidak memiliki seseorang yang dapat Anda andalkan dalam situasi sulit?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa terpisah dan sulit untuk menemukan orang-orang dengan minat dan nilai yang sama dengan Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa kehilangan hubungan dekat dengan seseorang yang penting dalam hidup Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa kesulitan menemukan seseorang yang benar-benar peduli dengan kehidupan Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa sulit untuk menemukan seseorang yang dapat Anda percayai sepenuhnya?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa kehilangan rasa kedekatan dan keintiman dalam hubungan Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa kesepian bahkan ketika ada orang lain di sekitar Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question: "Seberapa sering Anda merasa tidak dimengerti oleh orang lain?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa tidak memiliki dukungan emosional dari orang-orang terdekat Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa kesepian dan merindukan hubungan yang erat dengan orang lain?",
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
  if (stressCount >= 0 && stressCount <= 10) {
    stressLevel = "Diri Anda Sudah Dalam Kondisi Baik !";
  } else if (stressCount <= 20) {
    stressLevel = "Anda Sedikit Kesepian";
  } else if (stressCount >= 21) {
    stressLevel = "Anda Sangat Kesepian";
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
