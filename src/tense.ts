export type Tense =
    "present"
    | "preterite"
    | "imperfect"
    | "perfect"
    | "pluperfect";

export function randomTense(): Tense {
    switch (Math.floor(Math.random() * 5)) {
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
    }
}
