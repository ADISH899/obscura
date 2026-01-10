# Adaptive Learning Quiz Hub

A simple, web-based **adaptive quiz system** that automatically adjusts question difficulty based on your performance in real time

## What the project does

This project is an **Adaptive Quiz Generator** with three subjects for now:

- **Mathematics** — dynamically generated arithmetic expressions (including +, -, ×, ÷, ^) with increasing number of operands and larger numbers
- **Science** — currently a fixed question bank covering Physics, Chemistry, Biology with increasing difficulty
- **General Knowledge** — currently a fixed question bank covering world facts, history, geography, etc.

The difficulty level changes **automatically** after each answer:
- Correct + fast → difficulty increases
- Wrong / too slow → difficulty decreases

The system uses a simple but effective adjustment algorithm based on correctness and response time.

## Why the project is useful

Traditional quizzes are usually static — everyone gets the same questions regardless of their skill level.

This leads to:
- Beginners feeling overwhelmed
- Advanced learners getting bored

**Adaptive quizzes** solve this problem by:
- Keeping the user in their "zone of proximal development"
- Increasing engagement and motivation
- Making learning more efficient
- Providing a more personalized experience

Great for self-study, classroom warm-ups, or just having fun while learning!

## Features

- Real-time difficulty adjustment (1–10 levels)
- Beautiful, modern UI with smooth animations
- Three subjects: Math (generated), Science & GK (curated banks)
- Time-based performance scoring
- Final results screen with accuracy percentage
- Responsive design (mobile friendly)
- Enter key support for faster answering

## How to Get Started

### Prerequisites

- Any modern web browser (Chrome, Firefox, Edge, Safari)
- Just a web server (or open files directly — most features work with `file://` too)

## Core Technologies:

- HTML5: For structure and semantics (e.g., forms, buttons, containers in MAIN.html and index.html).
- CSS3: For styling and animations (e.g., gradients, shadows, transitions in main.css and style.css).
- Vanilla JavaScript: For all logic, interactivity, and dynamic behavior


## Other Notes:

- No Backend: Fully static—no databases, servers, or APIs. Questions are either generated on-the-fly (Math) or from JS arrays (Science/GK).
- Browser Compatibility: Works in modern browsers (Chrome, Firefox, etc.)
- Deployment: Host on GitHub Pages