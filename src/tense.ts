export type Tense =
    "present"
    | "preterite"
    | "imperfect"
    | "perfect"
    | "pluperfect"
    | "future";

export function randomTense(): Tense {
    switch (Math.floor(Math.random() * 6)) {
        case 0:
            return "present";
            break;
        case 1:
            return "preterite";
            break;
        case 2:
            return "imperfect";
            break;
        case 3:
            return "perfect";
            break;
        case 4:
            return "pluperfect";
            break;
        case 5:
            return "future";
            break;
    }
}
