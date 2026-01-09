/* ------------ CONFIG ------------ */
let difficulty = 1;
const MIN_D = 1;
const MAX_D = 10;
const TARGET_TIME = 12; 
const K = 1;
const TOTAL_ROUNDS = 10;

/* ------------ STATE ------------ */
let currentQuestionObj = {};
let startTime = 0;
let round = 1;
let correctCount = 0;
let incorrectCount = 0;
let quizActive = true;

/* ------------ QUESTION BANK ------------ */
const gkBank = [
    { q: "What is the capital of France?", a: "Paris", level: 1 },
    { q: "Who wrote Romeo and Juliet?", a: "Shakespeare", level: 2 },
    { q: "Which planet is known as the Red Planet?", a: "Mars", level: 2 },
    { q: "Who painted the Mona Lisa?", a: "Da Vinci", level: 3 },
    { q: "What is the largest ocean on Earth?", a: "Pacific", level: 3 },
    { q: "In which year did World War II end?", a: "1945", level: 4 },
    { q: "What is the chemical symbol for Gold?", a: "Au", level: 4 },
    { q: "Who developed the theory of relativity?", a: "Einstein", level: 5 },
    { q: "What is the smallest prime number?", a: "2", level: 1 },
    { q: "Who was the first person in space?", a: "Yuri Gagarin", level: 5 },
    { q: "Which is the longest river in the world?", a: "Nile", level: 4 },
    { q: "What metal is liquid at room temperature?", a: "Mercury", level: 5 },
    { q: "What is the capital city of Japan?", a: "Tokyo", level: 2 },
    { q: "Which continent is the Sahara Desert in?", a: "Africa", level: 3 },
    { q: "How many continents are there?", a: "7", level: 2 }
];

/* ------------ DIFFICULTY LABELS ------------ */
function difficultyLabel(d) {
    if (d === 1) return "Very Easy";
    if (d === 2) return "Easy";
    if (d <= 4) return "Normal";
    if (d <= 6) return "Hard";
    if (d === 7) return "Very Hard";
    if (d === 8) return "Super Hard";
    return "Hell Mode";
}

/* ------------ UTILS ------------ */
function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

/* ------------ QUESTION GENERATOR ------------ */
function generateQuestion() {
    quizActive = true;

    let pool = gkBank.filter(q => Math.abs(q.level - difficulty) <= 2);
    if (pool.length === 0) pool = gkBank;

    currentQuestionObj = pool[Math.floor(Math.random() * pool.length)];

    document.getElementById("question").innerText = currentQuestionObj.q;
    document.getElementById("difficulty-label").innerText = difficultyLabel(difficulty);
    document.getElementById("round").innerText = round;
    document.getElementById("answer").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("time").innerText = "";
    document.getElementById("hint").innerText = "";

    startTime = Date.now();
}

/* ------------ SUBMIT ------------ */
function submitAnswer() {
    if (!quizActive) return;

    const input = document.getElementById("answer");
    if (input.value.trim() === "") return;

    quizActive = false;

    const userAnswer = input.value.trim().toLowerCase();
    const correctAnswer = currentQuestionObj.a.toLowerCase();

    const actualTime = (Date.now() - startTime) / 1000;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) correctCount++;
    else incorrectCount++;

    document.getElementById("result").innerHTML =
        isCorrect
            ? "<span class='correct'>Correct ✔</span>"
            : `<span class='wrong'>Wrong ✖</span> (Answer: ${currentQuestionObj.a})`;

    document.getElementById("time").innerText =
        `Time Taken: ${actualTime.toFixed(2)} sec`;

    const timeFactor = clamp(1 - (actualTime / TARGET_TIME), -1, 1);
    const delta = K * (isCorrect ? 1 : -1) * timeFactor;
    difficulty = clamp(difficulty + Math.round(delta), MIN_D, MAX_D);

    document.getElementById("hint").innerText =
        isCorrect ? "Difficulty increased" : "Difficulty decreased";

    round++;

    if (round <= TOTAL_ROUNDS) setTimeout(generateQuestion, 1200);
    else setTimeout(showResults, 800);
}

/* ------------ ENTER KEY SUPPORT ------------ */
document.addEventListener("keydown", e => {
    if (e.key === "Enter") submitAnswer();
});

/* ------------ RESULTS ------------ */
function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("results-container").style.display = "block";

    const accuracy = ((correctCount / TOTAL_ROUNDS) * 100).toFixed(2);

    document.getElementById("total-questions").innerText = TOTAL_ROUNDS;
    document.getElementById("correct-count").innerText = correctCount;
    document.getElementById("incorrect-count").innerText = incorrectCount;
    document.getElementById("accuracy-percent").innerText = accuracy;
}

/* ------------ RESTART ------------ */
function restartQuiz() {
    difficulty = 1;
    round = 1;
    correctCount = 0;
    incorrectCount = 0;
    quizActive = true;

    document.getElementById("results-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";

    generateQuestion();
}

/* ------------ START ------------ */
generateQuestion();


