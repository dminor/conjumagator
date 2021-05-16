export function randomTense() {
    switch (Math.floor(Math.random() * 4)) {
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
    }
}
