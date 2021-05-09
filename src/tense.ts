export type Tense =
    "present"
    | "preterite"
    | "imperfect";

export function randomTense(): Tense {
    switch (Math.floor(Math.random() * 3)) {
        case 0:
            return "present";
            break;
        case 1:
            return "preterite";
            break;
        case 2:
            return "imperfect";
            break;
    }
}
