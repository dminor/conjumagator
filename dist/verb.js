export class Verb {
    constructor(infinitive) {
        this.infinitive = infinitive;
    }
    conjugate(tense, pronoun) {
        switch (tense) {
            case "present":
                return this.conjugatePresent(pronoun);
                break;
            case "preterite":
                return this.conjugatePreterite(pronoun);
                break;
            case "imperfect":
                return this.conjugateImperfect(pronoun);
                break;
            case "perfect":
                return this.conjugatePerfect(pronoun);
                break;
        }
    }
}
let HaberPresent = new Map([["yo", "he"],
    ["tú", "has"],
    ["él", "ha"],
    ["nosotros", "hemos"],
    ["ellos", "han"]]);
class RegularArVerb extends Verb {
    constructor(infinitive) {
        super(infinitive);
        this.stem = infinitive.replace("ar", "");
        this.pastParticiple = this.stem + "ado";
    }
    conjugatePresent(pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "o";
                break;
            case "tú":
                return this.stem + "as";
                break;
            case "él":
                return this.stem + "a";
                break;
            case "nosotros":
                return this.stem + "amos";
                break;
            case "ellos":
                return this.stem + "an";
                break;
        }
    }
    conjugatePreterite(pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "é";
                break;
            case "tú":
                return this.stem + "aste";
                break;
            case "él":
                return this.stem + "ó";
                break;
            case "nosotros":
                return this.stem + "amos";
                break;
            case "ellos":
                return this.stem + "aron";
                break;
        }
    }
    conjugateImperfect(pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "aba";
                break;
            case "tú":
                return this.stem + "abas";
                break;
            case "él":
                return this.stem + "aba";
                break;
            case "nosotros":
                return this.stem + "abamos";
                break;
            case "ellos":
                return this.stem + "aban";
                break;
        }
    }
    conjugatePerfect(pronoun) {
        return HaberPresent.get(pronoun) + " " + this.pastParticiple;
    }
}
class RegularErVerb extends Verb {
    constructor(infinitive) {
        super(infinitive);
        this.stem = infinitive.replace("er", "");
        if (this.stem.match(/[aeiou]$/)) {
            this.pastParticiple = this.stem + "ído";
        }
        else {
            this.pastParticiple = this.stem + "ido";
        }
    }
    conjugatePresent(pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "o";
                break;
            case "tú":
                return this.stem + "es";
                break;
            case "él":
                return this.stem + "e";
                break;
            case "nosotros":
                return this.stem + "emos";
                break;
            case "ellos":
                return this.stem + "en";
                break;
        }
    }
    conjugatePreterite(pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "í";
                break;
            case "tú":
                return this.stem + "iste";
                break;
            case "él":
                return this.stem + "ió";
                break;
            case "nosotros":
                return this.stem + "imos";
                break;
            case "ellos":
                return this.stem + "ieron";
                break;
        }
    }
    conjugateImperfect(pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "ía";
                break;
            case "tú":
                return this.stem + "ías";
                break;
            case "él":
                return this.stem + "ía";
                break;
            case "nosotros":
                return this.stem + "íamos";
                break;
            case "ellos":
                return this.stem + "ían";
                break;
        }
    }
    conjugatePerfect(pronoun) {
        return HaberPresent.get(pronoun) + " " + this.pastParticiple;
    }
}
class RegularIrVerb extends RegularErVerb {
    conjugatePresent(pronoun) {
        if (pronoun == "nosotros") {
            return this.stem + "imos";
        }
        else {
            return super.conjugatePresent(pronoun);
        }
    }
    constructor(infinitive) {
        super(infinitive);
        this.stem = infinitive.replace("ir", "");
        if (this.stem.match(/[aeiou]$/)) {
            this.pastParticiple = this.stem + "ído";
        }
        else {
            this.pastParticiple = this.stem + "ido";
        }
    }
}
class SlightlyIrregularVerb extends Verb {
    constructor(regular, present, preterite, pastParticiple) {
        super(regular.infinitive);
        this.present = present;
        this.preterite = preterite;
        this.regular = regular;
        this.pastParticiple = pastParticiple;
    }
    conjugatePresent(pronoun) {
        if (this.present.has(pronoun)) {
            return this.present.get(pronoun);
        }
        else {
            return this.regular.conjugatePresent(pronoun);
        }
    }
    conjugatePreterite(pronoun) {
        if (this.preterite.has(pronoun)) {
            return this.preterite.get(pronoun);
        }
        else {
            return this.regular.conjugatePreterite(pronoun);
        }
    }
    conjugateImperfect(pronoun) {
        return this.regular.conjugateImperfect(pronoun);
    }
    conjugatePerfect(pronoun) {
        if (this.pastParticiple !== undefined) {
            return HaberPresent.get(pronoun) + " " + this.pastParticiple;
        }
        return this.regular.conjugatePerfect(pronoun);
    }
}
class IrregularVerb extends Verb {
    constructor(infinitive, present, preterite, imperfect, pastParticiple) {
        super(infinitive);
        this.present = present;
        this.preterite = preterite;
        this.imperfect = imperfect;
        this.pastParticiple = pastParticiple;
    }
    conjugatePresent(pronoun) {
        return this.present.get(pronoun);
    }
    conjugatePreterite(pronoun) {
        return this.preterite.get(pronoun);
    }
    conjugateImperfect(pronoun) {
        return this.imperfect.get(pronoun);
    }
    conjugatePerfect(pronoun) {
        return HaberPresent.get(pronoun) + " " + this.pastParticiple;
    }
}
const VERBS = [
    new RegularArVerb("dejar"),
    new RegularArVerb("hablar"),
    new RegularArVerb("llamar"),
    new RegularArVerb("llevar"),
    new RegularArVerb("pasar"),
    new RegularArVerb("quedar"),
    new RegularArVerb("tomar"),
    new RegularErVerb("aprender"),
    new RegularErVerb("deber"),
    new RegularIrVerb("vivir"),
    new SlightlyIrregularVerb(new RegularErVerb("creer"), new Map(), new Map([["yo", "creí"],
        ["tú", "creíste"],
        ["él", "creyó"],
        ["nosotros", "creímos"],
        ["ellos", "creyeron"]])),
    new SlightlyIrregularVerb(new RegularArVerb("dar"), new Map([["yo", "doy"]]), new Map([["yo", "di"],
        ["tú", "diste"],
        ["él", "dio"],
        ["nosotros", "dicimos"],
        ["ellos", "dieron"]])),
    new SlightlyIrregularVerb(new RegularIrVerb("decir"), new Map([["yo", "digo"],
        ["tú", "dices"],
        ["él", "dice"],
        ["nosotros", "decimos"],
        ["ellos", "dicen"]]), new Map([["yo", "dije"],
        ["tú", "dijiste"],
        ["él", "dijo"],
        ["nosotros", "dijimos"],
        ["ellos", "dijeron"]]), "dicho"),
    new SlightlyIrregularVerb(new RegularArVerb("estar"), new Map([["yo", "estoy"],
        ["tú", "estás"],
        ["él", "está"],
        ["nosotros", "estamos"],
        ["ellos", "están"]]), new Map([["yo", "estuve"],
        ["tú", "estuviste"],
        ["él", "estuvo"],
        ["nosotros", "estuvimos"],
        ["ellos", "estuvieron"]])),
    new SlightlyIrregularVerb(new RegularErVerb("hacer"), new Map([["yo", "hago"]]), new Map([["yo", "hice"],
        ["tú", "hiciste"],
        ["él", "hizo"],
        ["nosotros", "hicimos"],
        ["ellos", "hicieron"]]), "hecho"),
    new IrregularVerb("ir", new Map([["yo", "voy"],
        ["tú", "vas"],
        ["él", "va"],
        ["nosotros", "vamos"],
        ["ellos", "van"]]), new Map([["yo", "fui"],
        ["tú", "fuiste"],
        ["él", "fue"],
        ["nosotros", "fuimos"],
        ["ellos", "fueron"]]), new Map([["yo", "iba"],
        ["tú", "ibas"],
        ["él", "iba"],
        ["nosotros", "íbamos"],
        ["ellos", "iban"]]), "ido"),
    new SlightlyIrregularVerb(new RegularArVerb("llegar"), new Map(), new Map([["yo", "llegué"]])),
    new SlightlyIrregularVerb(new RegularErVerb("poder"), new Map([["yo", "puedo"],
        ["tú", "puedes"],
        ["él", "puede"],
        ["nosotros", "podemos"],
        ["ellos", "pueden"]]), new Map([["yo", "pude"],
        ["tú", "pudiste"],
        ["él", "pudo"],
        ["nosotros", "pudimos"],
        ["ellos", "pudieron"]])),
    new SlightlyIrregularVerb(new RegularErVerb("querer"), new Map([["yo", "quiero"],
        ["tú", "quieres"],
        ["él", "quiere"],
        ["nosotros", "queremos"],
        ["ellos", "quieren"]]), new Map([["yo", "quise"],
        ["tú", "quisiste"],
        ["él", "quiso"],
        ["nosotros", "quisimos"],
        ["ellos", "quisieron"]])),
    new SlightlyIrregularVerb(new RegularErVerb("saber"), new Map([["yo", "sé"]]), new Map([["yo", "supe"],
        ["tú", "supiste"],
        ["él", "supo"],
        ["nosotros", "supimos"],
        ["ellos", "supieron"]])),
    new SlightlyIrregularVerb(new RegularIrVerb("salir"), new Map([["yo", "salgo"]]), new Map()),
    new IrregularVerb("ser", new Map([["yo", "soy"],
        ["tú", "eres"],
        ["él", "es"],
        ["nosotros", "somos"],
        ["ellos", "son"]]), new Map([["yo", "fui"],
        ["tú", "fuiste"],
        ["él", "fue"],
        ["nosotros", "fuimos"],
        ["ellos", "fueron"]]), new Map([["yo", "era"],
        ["tú", "eras"],
        ["él", "era"],
        ["nosotros", "éramos"],
        ["ellos", "eran"]]), "sido"),
    new SlightlyIrregularVerb(new RegularErVerb("tener"), new Map([["yo", "tengo"],
        ["tú", "tienes"],
        ["él", "tiene"],
        ["nosotros", "tenemos"],
        ["ellos", "tienen"]]), new Map([["yo", "tuve"],
        ["tú", "tuviste"],
        ["él", "tuvo"],
        ["nosotros", "tuvimos"],
        ["ellos", "tuvieron"]])),
    new SlightlyIrregularVerb(new RegularIrVerb("venir"), new Map([["yo", "vengo"],
        ["tú", "vienes"],
        ["él", "viene"],
        ["nosotros", "venemos"],
        ["ellos", "vienen"]]), new Map([["yo", "vine"],
        ["tú", "viniste"],
        ["él", "vino"],
        ["nosotros", "vinimos"],
        ["ellos", "vinieron"]])),
    new IrregularVerb("ver", new Map([["yo", "veo"],
        ["tú", "ves"],
        ["él", "ve"],
        ["nosotros", "vemos"],
        ["ellos", "ven"]]), new Map([["yo", "vi"],
        ["tú", "viste"],
        ["él", "vio"],
        ["nosotros", "vimos"],
        ["ellos", "vieron"]]), new Map([["yo", "veía"],
        ["tú", "veías"],
        ["él", "veía"],
        ["nosotros", "veíamos"],
        ["ellos", "veían"]]), "visto"),
    new SlightlyIrregularVerb(new RegularErVerb("poner"), new Map([["yo", "pongo"]]), new Map([["yo", "puse"],
        ["tú", "pusiste"],
        ["él", "puso"],
        ["nosotros", "pusimos"],
        ["ellos", "pusieron"]]), "puesto"),
];
export function randomVerb() {
    return VERBS[Math.floor(Math.random() * VERBS.length)];
}
