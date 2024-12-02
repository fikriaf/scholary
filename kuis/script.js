const questions = [
    {
        question: 'Jika hari ini adalah hari Kamis, dan 30 hari lagi adalah hari Sabtu. Maka, besok hari?',
        answers: [
            { text: 'Minggu', correct: false },
            { text: 'Selasa', correct: false },
            { text: 'Kamis', correct: false },
            { text: 'Jumat', correct: true }
        ]
    },
    {
        question: 'Jika 3x+5=17, maka 2x+3=?',
        answers: [
            { text: '4', correct: false },
            { text: '6', correct: false },
            { text: '10', correct: false },
            { text: '11', correct: true }
        ]
    },
    {
        question: 'Mana yang bukan bahasa pemrograman?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'HTML', correct: true },
            { text: 'Javascript', correct: false },
            { text: 'C', correct: false }
        ]
    },
    {
        question: 'Jika semua siswa yang lulus ujian memiliki nilai di atas 70, dan nilai Andi adalah 55, Budi adalah 100, maka nilai Andi berapa persen dari nilai Budi?',
        answers: [
            { text: '70%', correct: false },
            { text: '65%', correct: false },
            { text: '55%', correct: true },
            { text: '100%', correct: false }
        ]
    },
    {
        question: 'Kemarin sore hujan disertai petir dan suara gemuruh. Hujan selalu disertai petir?',
        answers: [
            { text: 'Benar', correct: false },
            { text: 'Salah', correct: true }
        ]
    },
    {
        question: '..., 5, 7, 9, 11, 13. Angka yang paling sesuai untuk melengkapi deret tersebut adalah...',
        answers: [
            { text: '4', correct: false },
            { text: '3', correct: true },
            { text: '2', correct: false },
            { text: '1', correct: false }
        ]
    },
    {
        question: 'Jumlah benua di dunia ada...',
        answers: [
            { text: '5', correct: false },
            { text: '6', correct: false },
            { text: '7', correct: true },
            { text: '8', correct: false }
        ]
    },
    {
        question: 'Nilai dari π (pi) adalah...?',
        answers: [
            { text: '90°', correct: false },
            { text: '180°', correct: false },
            { text: '3.14', correct: true },
            { text: '4.31', correct: false }
        ]
    },
    {
        question: 'Ibukota Amerika Serikat adalah New York',
        answers: [
            { text: 'Benar', correct: false },
            { text: 'Salah', correct: true }
        ]
    },
    {
        question: 'Fungsi F(x)=2x²-5x+10 memiliki titik..',
        answers: [
            { text: 'Maksimum', correct: false },
            { text: 'Minimum', correct: true },
            { text: 'Maksimum dan minimum', correct: false }
        ]
    },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
// Di bagian deklarasi variabel
let answerBackgroundColors = [];
let correctAnswerColor = 'green';
let username = localStorage.getItem('user');

const startTimeKey = `startTime_${username}`;
const scoreKey = `score_${username}`;
const quizDurationKey = `quizDuration_${username}`;

const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons');
const timerDisplay = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score-display');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const submitButton = document.getElementById('submit-button'); // Tambahkan definisi tombol "Submit"

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    // Check if the start time is already stored, if not, store it
    if (!localStorage.getItem('startTime')) {
        storeStartTime();
    }
    timeLeft = calculateRemainingTime();
    nextButton.classList.add('hide');
    submitButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    answerBackgroundColors = Array(question.answers.length).fill('');
    questionContainer.innerText = question.question;
    answerButtonsContainer.innerHTML = '';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.style.backgroundColor = answerBackgroundColors[index];
        button.addEventListener('click', () => selectAnswer(index));
        answerButtonsContainer.appendChild(button);
    });

    // Tampilkan tombol Previous jika bukan pertanyaan pertama
    if (currentQuestionIndex == 0) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
}

function prevQuestion() {
    currentQuestionIndex--;
    // Tampilkan pertanyaan sebelumnya
    showQuestion(questions[currentQuestionIndex]);
    nextButton.disabled = false;
}
function selectAnswer(answerIndex) {
    // Hapus kelas 'correct' dari semua tombol jawaban
    answerButtonsContainer.childNodes.forEach((button, index) => {
        button.classList.remove('correct');
        button.classList.remove('incorrect');
    });

    const correct = questions[currentQuestionIndex].answers[answerIndex].correct;
    const selectedButton = answerButtonsContainer.children[answerIndex];

    if (correct) {
        selectedButton.classList.add('correct');
        score+=10;
    }else {
        selectedButton.classList.add('incorrect');
    }

    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion(questions[currentQuestionIndex]);
    if (currentQuestionIndex < questions.length -1 ) {
        nextButton.classList.add('hide');
    } else {
        // Nonaktifkan tombol "Next" jika sudah di ujung pertanyaan
        nextButton.disabled = true;
    }
}
function storeStartTime() {
    const startTime = new Date().getTime();
    localStorage.setItem(startTimeKey, startTime);
}
function calculateRemainingTime() {
    const startTime = localStorage.getItem(startTimeKey);
    if (startTime) {
        const elapsedTime = new Date().getTime() - parseInt(startTime);
        const remainingTime = Math.max(30 - Math.floor(elapsedTime / 1000), 0);
        return remainingTime;
    }
}
function startTimer() {
    timeLeft = calculateRemainingTime();
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerDisplay.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            // If it's the time is end, show the results
            showResults();
            setTimeout(() => {
                window.location.href = "https://scholary-beasiswa.github.io/home";
            }, 2000)
        }
    }, 1000);
}
function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
function showResults() {
    localStorage.setItem(scoreKey, score);
    alert(`Quiz completed!\nUsername: ${username}\nYour Score: ${score}`);
    clearInterval(timerInterval);
    // Tampilkan skor dan tombol Next setelah semua soal dijawab atau timer habis
    scoreDisplay.innerText = `Score: ${score}`;
    scoreDisplay.classList.remove('hide');

    nextButton.classList.remove('hide');
    nextButton.disabled = true; // Atur tombol Next tidak dapat diklik setelah selesai
}

function submitQuiz() {
    const startTime = localStorage.getItem(startTimeKey);
    const endTime = new Date().getTime();
    const durationInSeconds = Math.floor((endTime - parseInt(startTime)) / 1000);

    // Store the duration in localStorage
    localStorage.setItem(quizDurationKey, durationInSeconds);
    // Tampilkan tombol Next setelah semua soal dijawab atau timer habis
    scoreDisplay.innerText = `Score: ${score}, Duration: ${formatDuration(durationInSeconds)}`;
    scoreDisplay.classList.remove('hide');

    nextButton.classList.remove('hide');
    nextButton.disabled = true; // Atur tombol Next tidak dapat diklik setelah selesai

    // Sembunyikan tombol Previous dan Submit setelah submit
    prevButton.classList.add('hide');
    submitButton.classList.add('hide');

    currentQuestionIndex++;
    showResults();
    setTimeout(() => {
        window.location.href = "https://github.com/scholary-beasiswa/home"; // Gantilah dengan nama file atau URL home Anda
    }, 2000);
}

// Tambahkan event listener untuk tombol "Submit"
submitButton.addEventListener('click', submitQuiz);
startQuiz();
