/**
 * Redirects the user to the quiz interface with a specific subject.
 * @param {string} type - The subject of the quiz (e.g., 'math', 'science')
 */
function startQuiz(type) {
    // We check the type and append it to the URL as a query parameter.
    // This allows index.html to decide which logic file (script.js or science.js) to load.
    switch (type) {
        case "math":
            window.location.href = "index.html?type=math";
            break;

        case "science":
            window.location.href = "index.html?type=science";
            break;

        default:
            // This handles the "Coming Soon" or disabled cards just in case
            console.warn("Quiz type not yet implemented.");
            alert("This learning module is currently under development.");
    }
}