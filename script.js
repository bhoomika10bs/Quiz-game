const questions = [
    {
        question: "Which language is used to structure a web page?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "Which language is mainly used to style web pages?",
        options: ["CSS", "Python", "C", "Java"],
        answer: "CSS"
    },
    {
        question: "Which language makes web pages interactive?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Control Processing User"
        ],
        answer: "Central Processing Unit"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!-- -->", "**"],
        answer: "//"
    }
];

let currentQuestion = 0;
let score = 0;
let streak = 0;
let highScore = localStorage.getItem("highScore") || 0;

const questionNumber = document.getElementById("questionNumber");
const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const highScoreDisplay = document.getElementById("highScore");
const streakDisplay = document.getElementById("streak");

highScoreDisplay.textContent = highScore;

function showQuestion() {

    let q = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    question.textContent = q.question;

    options.innerHTML = "";

    q.options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.addEventListener("click", () => {
            checkAnswer(button, option);
        });

        options.appendChild(button);
    });
}

function checkAnswer(button, selectedAnswer) {

    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
    button.classList.add("correct");
    score++;
    streak++;
} else {
    button.classList.add("wrong");
    streak = 0;
}

streakDisplay.textContent = streak;

    document.querySelectorAll(".option").forEach(btn => {
        btn.disabled = true;
    });
}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionNumber.textContent = "Quiz Completed!";
        question.textContent = "";
        options.innerHTML = "";

        result.textContent =
            `🎉 Your Score: ${score} / ${questions.length}`;
            if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
}

highScoreDisplay.textContent = highScore;

        nextBtn.textContent = "Restart Quiz";

        nextBtn.onclick = () => {
            currentQuestion = 0;
            score = 0;
            result.textContent = "";
            nextBtn.textContent = "Next Question →";
            showQuestion();
        };
    }
});

showQuestion();