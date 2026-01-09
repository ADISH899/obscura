/* ------------ CONFIG ------------ */
let difficulty = 1;
const MIN_D = 1;
const MAX_D = 10;
const TARGET_TIME = 15; // science needs more reading time
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
const scienceBank = [
    { q: "What planet is known as the Red Planet?", a: "Mars", level: 1 },
    { q: "What is the chemical symbol for Water?", a: "H2O", level: 2 },
    { q: "What force pulls objects toward the center of the Earth?", a: "Gravity", level: 1 },
    { q: "How many bones are in the adult human body?", a: "206", level: 4 },
    { q: "What is the hardest natural substance on Earth?", a: "Diamond", level: 5 },
    { q: "Which gas do plants absorb from the atmosphere?", a: "Carbon Dioxide", level: 3 },
    { q: "What is the powerhouse of the cell?", a: "Mitochondria", level: 6 },
    { q: "What is the atomic number of Gold?", a: "79", level: 8 },
    { q: "What is the nearest star to Earth?", a: "Sun", level: 2 },
    { q: "What constant represents the speed of light? (Symbol)", a: "c", level: 7 },
    { q: "Which element has the symbol 'Fe'?", a: "Iron", level: 5 },
    { q: "What is the most abundant gas in Earth's atmosphere?", a: "Nitrogen", level: 6 },
    { q: "In what year did man first land on the moon?", a: "1969", level: 7 },
    { q: "What is Earth's gravity in m/s²?", a: "9.8", level: 9 },
    { q: "What is the only metal that is liquid at room temperature?", a: "Mercury", level: 6 }
];

/* ------------ DIFFICULTY LABELS (MATCH SCRIPT) ------------ */
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

    let pool = scienceBank.filter(
        q => Math.abs(q.level - difficulty) <= 2
    );
    if (pool.length === 0) pool = scienceBank;

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

/* ------------ SUBMIT ANSWER ------------ */
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

    if (round <= TOTAL_ROUNDS) {
        setTimeout(generateQuestion, 1200);
    } else {
        setTimeout(showResults, 800);
    }
}

/* ------------ ENTER KEY ------------ */
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
