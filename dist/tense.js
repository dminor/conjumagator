export function randomTense() {
    switch (Math.floor(Math.random() * 7)) {
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
        case 6:
            return "conditional";
            break;
    }
}
