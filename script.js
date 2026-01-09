/* ------------ CONFIG ------------ */
let difficulty = 1;
const MIN_D = 1;
const MAX_D = 10;
const TARGET_TIME = 10;
const K = 1;
const TOTAL_ROUNDS = 12;

/* ------------ STATE ------------ */
let correctAnswer = 0;
let startTime = 0;
let round = 1;
let correctCount = 0;
let incorrectCount = 0;
let quizActive = true;

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

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ------------ SAFE OPERATION ------------ */
function applyOp(a, b, op) {
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return Math.trunc(a / b);
        case '^': return Math.pow(a, b);
    }
}

/* ------------ OPERAND COUNT (KEY FIX) ------------ */
function operandCountByDifficulty(d) {
    if (d <= 2) return 2;      // Very Easy, Easy
    if (d <= 4) return 2;      // Normal (EXACTLY 2 operands)
    if (d <= 6) return 3;      // Hard
    if (d === 7) return 4;     // Very Hard
    if (d === 8) return 5;     // Super Hard
    return 6;                 // Hell Mode
}

/* ------------ NUMBER RANGE ------------ */
function rangeByDifficulty(d) {
    if (d <= 2) return 10;
    if (d <= 4) return 25;
    if (d <= 6) return 50;
    if (d <= 8) return 100;
    return 250;
}

/* ------------ QUESTION GENERATOR ------------ */
function generateQuestion() {
    quizActive = true;

    const operators = ['+', '-', '*', '/', '^'];
    const operandCount = operandCountByDifficulty(difficulty);
    const range = rangeByDifficulty(difficulty);

    let numbers = [];
    let ops = [];

    for (let i = 0; i < operandCount; i++) {
        numbers.push(rand(1, range));
    }

    for (let i = 0; i < operandCount - 1; i++) {
        let op = operators[rand(0, operators.length - 1)];

        if (op === '^') {
            numbers[i + 1] = rand(2, difficulty >= 8 ? 3 : 2);
        }

        if (op === '/' && numbers[i + 1] === 0) {
            numbers[i + 1] = 1;
        }

        ops.push(op);
    }

    /* Evaluate left-to-right */
    let value = numbers[0];
    let expression = `${numbers[0]}`;

    for (let i = 0; i < ops.length; i++) {
        value = applyOp(value, numbers[i + 1], ops[i]);
        expression += ` ${ops[i]} ${numbers[i + 1]}`;
    }

    correctAnswer = Math.trunc(value);

    document.getElementById("question").innerText = expression + " = ?";
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

    const userAnswer = Number(input.value);
    const actualTime = (Date.now() - startTime) / 1000;
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) correctCount++;
    else incorrectCount++;

    document.getElementById("result").innerHTML =
        isCorrect
            ? "<span class='correct'>Correct ✔</span>"
            : `<span class='wrong'>Wrong ✖</span> (Answer: ${correctAnswer})`;

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
