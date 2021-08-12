export type Tense =
    "present"
    | "preterite"
    | "imperfect"
    | "perfect"
    | "pluperfect"
    | "future"
    | "conditional";

export function randomTense(allowedTenses: Array<Tense>): Tense {
    if (allowedTenses.length === 0) {
        return "present";
    }
    return allowedTenses[Math.floor(Math.random() * allowedTenses.length)];
}
