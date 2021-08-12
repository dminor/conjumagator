export function randomMood(allowedMoods) {
    if (allowedMoods.length === 0) {
        return "indicative";
    }
    return allowedMoods[Math.floor(Math.random() * allowedMoods.length)];
}
export function tensesForMood(mood) {
    if (mood === "indicative") {
        return ["present", "preterite", "imperfect", "perfect", "pluperfect", "future", "conditional"];
    }
    else {
        return ["present"];
    }
}
