const quizContent = document.querySelector('.quiz__content');
const quizTitle = document.querySelector('.quiz__title');
const quizList = document.querySelector('.quiz__list');
const quizNextBtn = document.querySelector('.quiz__next-btn');
const quizProgress = document.querySelector('.quiz__progress-inner');
const resultImg = document.querySelector('.result__img img');
const resultTitle = document.querySelector('.result__title');
const resultText = document.querySelector('.result__text');
const resultRestart = document.querySelector('.result__restart');

let currentQuestionIndex = 0;
let correctAnswers = 0;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizTitle.textContent = currentQuestion.question;
    quizList.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = option;
        listItem.addEventListener('click', () => {
            checkAnswer(index);
        });
        quizList.appendChild(listItem);
    });
    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    quizProgress.style.width = `${progress}%`;
}

function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.answer === currentQuestion.options[selectedIndex]) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContent.classList.add('hidden');
    resultImg.src = './img/the-end.png';
    resultTitle.textContent = 'Вы завершили тест!';
    resultText.textContent = `Вы ответили правильно на ${correctAnswers} из ${questions.length} вопросов.`;
    document.querySelector('.result').classList.remove('hidden');
}

function restartQuiz() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    quizContent.classList.remove('hidden');
    document.querySelector('.result').classList.add('hidden');
    showQuestion();
}

quizNextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
});

resultRestart.addEventListener('click', (event) => {
    event.preventDefault(); 
    restartQuiz();
});

showQuestion();

quizNextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

const quizPrevBtn = document.createElement('button');
quizPrevBtn.textContent = 'Предыдущий';
quizPrevBtn.classList.add('quiz__prev-btn');
quizPrevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});
document.querySelector('.quiz__footer').appendChild(quizPrevBtn);

showQuestion();

