export function randomTense(allowedTenses) {
    if (allowedTenses.length === 0) {
        return "present";
    }
    return allowedTenses[Math.floor(Math.random() * allowedTenses.length)];
}
