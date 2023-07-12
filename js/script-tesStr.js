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
      "Seberapa sering Anda merasa terbebani dengan tugas-tugas sehari-hari Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Apakah Anda sering merasa sulit untuk tidur karena pikiran yang terus-menerus menghantui?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa cemas atau gelisah dalam situasi tertentu?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Apakah Anda sering merasa kehilangan minat atau motivasi dalam melakukan aktivitas sehari-hari?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa sulit untuk berkonsentrasi atau memusatkan perhatian Anda?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Apakah Anda sering merasa lelah dan kehabisan energi secara fisik maupun mental?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa tegang atau gugup tanpa alasan yang jelas?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Apakah Anda sering mengalami perubahan nafsu makan yang signifikan, seperti hilangnya nafsu makan atau makan berlebihan?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Seberapa sering Anda merasa sulit untuk mengendalikan emosi atau merasa mudah tersinggung?",
    options: ["Tidak Pernah", "Jarang", "Sering"],
  },
  {
    question:
      "Apakah Anda sering merasa terisolasi atau kesepian dalam kehidupan sehari-hari Anda?",
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
    stressLevel = "Kondisi Anda Baik-Baik Saja";
  } else if (stressCount <= 7) {
    stressLevel = "Anda Mengalami Stress Ringan";
  } else if (stressCount <= 14) {
    stressLevel = "Anda Mengalami Stress Sedang";
  } else if (stressCount >= 14) {
    stressLevel = "Anda Mengalami Stress Berat";
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
