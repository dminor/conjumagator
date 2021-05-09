export type Pronoun =
    "yo"
    | "tú"
    | "él"
    | "nosotros"
    | "ellos";

export function randomPronoun(): Pronoun {
    switch (Math.floor(Math.random() * 5)) {
        case 0:
            return "yo"
            break;
        case 1:
            return "tú";
            break;
        case 2:
            return "él";
            break;
        case 3:
            return "nosotros";
            break;
        case 4:
            return "ellos";
            break;
    }
}
