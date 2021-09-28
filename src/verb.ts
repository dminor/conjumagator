import { Mood } from "./mood.js";
import { Pronoun } from "./pronoun.js";
import { Tense } from "./tense.js";

export abstract class Verb {
    conjugate(mood: Mood, tense: Tense, pronoun: Pronoun): string {
        if (mood === "indicative") {
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
                case "pluperfect":
                    return this.conjugatePluperfect(pronoun);
                    break;
                case "future":
                    return this.conjugateFuture(pronoun);
                    break;
                case "conditional":
                    return this.conjugateConditional(pronoun);
                    break;
            }
        } else {
            switch (tense) {
                case "present":
                    return this.conjugateSubjunctivePresent(pronoun);
                    break;
            }
        }
    }
    abstract conjugatePresent(pronoun: Pronoun): string;
    abstract conjugatePreterite(pronoun: Pronoun): string;
    abstract conjugateImperfect(pronoun: Pronoun): string;
    abstract conjugatePerfect(pronoun: Pronoun): string;
    abstract conjugatePluperfect(pronoun: Pronoun): string;
    abstract conjugateFuture(pronoun: Pronoun): string;
    abstract conjugateConditional(pronoun: Pronoun): string;
    abstract conjugateSubjunctivePresent(pronoun: Pronoun): string;

    constructor(infinitive: string) {
        this.infinitive = infinitive;
        this.stem = infinitive.substr(0, infinitive.length - 2);
    }

    infinitive: string;
    stem: string;
}

let HaberPresent = new Map([["yo", "he"],
["tú", "has"],
["él", "ha"],
["nosotros", "hemos"],
["ellos", "han"]]);

let HaberImperfect = new Map([["yo", "había"],
["tú", "habías"],
["él", "había"],
["nosotros", "habíamos"],
["ellos", "habían"]]);

class RegularArVerb extends Verb {
    conjugatePresent(pronoun: Pronoun) {
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

    conjugatePreterite(pronoun: Pronoun) {
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

    conjugateImperfect(pronoun: Pronoun) {
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

    conjugatePerfect(pronoun: Pronoun) {
        return HaberPresent.get(pronoun) + " " + this.pastParticiple;
    }

    conjugatePluperfect(pronoun: Pronoun) {
        return HaberImperfect.get(pronoun) + " " + this.pastParticiple;
    }

    conjugateFuture(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.infinitive + "é";
                break;
            case "tú":
                return this.infinitive + "ás";
                break;
            case "él":
                return this.infinitive + "á";
                break;
            case "nosotros":
                return this.infinitive + "emos";
                break;
            case "ellos":
                return this.infinitive + "án";
                break;
        }
    }

    conjugateConditional(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.infinitive + "ía";
                break;
            case "tú":
                return this.infinitive + "ías";
                break;
            case "él":
                return this.infinitive + "ía";
                break;
            case "nosotros":
                return this.infinitive + "íamos";
                break;
            case "ellos":
                return this.infinitive + "ían";
                break;
        }
    }

    conjugateSubjunctivePresent(pronoun: Pronoun) {
        let presentIndicative = this.conjugatePresent("yo");
        let stem = presentIndicative.substr(0, presentIndicative.length - 1);

        console.log(presentIndicative, stem);

        switch (pronoun) {
            case "yo":
                return stem + "e";
                break;
            case "tú":
                return stem + "es";
                break;
            case "él":
                return stem + "e";
                break;
            case "nosotros":
                return stem + "emos";
                break;
            case "ellos":
                return stem + "en";
                break;
        }
    }

    pastParticiple: string;

    constructor(infinitive: string) {
        super(infinitive);
        this.pastParticiple = this.stem + "ado"
    }
}

class RegularErVerb extends Verb {
    conjugatePresent(pronoun: Pronoun) {
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

    conjugatePreterite(pronoun: Pronoun) {
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

    conjugateImperfect(pronoun: Pronoun) {
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

    conjugatePerfect(pronoun: Pronoun) {
        return HaberPresent.get(pronoun) + " " + this.pastParticiple;
    }

    conjugatePluperfect(pronoun: Pronoun) {
        return HaberImperfect.get(pronoun) + " " + this.pastParticiple;
    }

    conjugateFuture(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.infinitive + "é";
                break;
            case "tú":
                return this.infinitive + "ás";
                break;
            case "él":
                return this.infinitive + "á";
                break;
            case "nosotros":
                return this.infinitive + "emos";
                break;
            case "ellos":
                return this.infinitive + "án";
                break;
        }
    }

    conjugateConditional(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.infinitive + "ía";
                break;
            case "tú":
                return this.infinitive + "ías";
                break;
            case "él":
                return this.infinitive + "ía";
                break;
            case "nosotros":
                return this.infinitive + "íamos";
                break;
            case "ellos":
                return this.infinitive + "ían";
                break;
        }
    }

    conjugateSubjunctivePresent(pronoun: Pronoun) {
        let presentIndicative = this.conjugatePresent("yo");
        let stem = presentIndicative.substr(0, presentIndicative.length - 1);

        switch (pronoun) {
            case "yo":
                return stem + "a";
                break;
            case "tú":
                return stem + "as";
                break;
            case "él":
                return stem + "a";
                break;
            case "nosotros":
                return stem + "amos";
                break;
            case "ellos":
                return stem + "an";
                break;
        }
    }

    pastParticiple: string;

    constructor(infinitive: string) {
        super(infinitive);
        if (this.stem.match(/[aeiou]$/)) {
            this.pastParticiple = this.stem + "ído";
        } else {
            this.pastParticiple = this.stem + "ido"
        }
    }
}

class RegularIrVerb extends RegularErVerb {
    conjugatePresent(pronoun: Pronoun) {
        if (pronoun == "nosotros") {
            return this.stem + "imos";
        } else {
            return super.conjugatePresent(pronoun);
        }
    }

    constructor(infinitive: string) {
        super(infinitive);
        this.stem = infinitive.substr(0, infinitive.length - 2);
        if (this.stem.match(/[aeiou]$/)) {
            this.pastParticiple = this.stem + "ído";
        } else {
            this.pastParticiple = this.stem + "ido"
        }
    }
}

class IrregularVerb extends Verb {
    conjugatePresent(pronoun: Pronoun) {
        if (this.present.has(pronoun)) {
            return this.present.get(pronoun);
        } else {
            return this.regular.conjugatePresent(pronoun);
        }
    }

    conjugatePreterite(pronoun: Pronoun) {
        if (this.preterite !== undefined && this.preterite.has(pronoun)) {
            return this.preterite.get(pronoun);
        } else {
            return this.regular.conjugatePreterite(pronoun);
        }
    }

    conjugateImperfect(pronoun: Pronoun) {
        if (this.imperfect !== undefined && this.imperfect.has(pronoun)) {
            return this.imperfect.get(pronoun);
        } else {
            return this.regular.conjugateImperfect(pronoun);
        }
    }

    conjugatePerfect(pronoun: Pronoun) {
        if (this.pastParticiple !== undefined) {
            return HaberPresent.get(pronoun) + " " + this.pastParticiple;
        }
        return this.regular.conjugatePerfect(pronoun);
    }

    conjugatePluperfect(pronoun: Pronoun) {
        if (this.pastParticiple !== undefined) {
            return HaberImperfect.get(pronoun) + " " + this.pastParticiple;
        }
        return this.regular.conjugatePluperfect(pronoun);
    }

    conjugateFuture(pronoun: Pronoun) {
        if (this.future !== undefined && this.future.has(pronoun)) {
            return this.future.get(pronoun);
        } else {
            return this.regular.conjugateFuture(pronoun);
        }
    }

    conjugateConditional(pronoun: Pronoun) {
        if (this.conditional !== undefined && this.conditional.has(pronoun)) {
            return this.conditional.get(pronoun);
        } else {
            return this.regular.conjugateConditional(pronoun);
        }
    }

    conjugateSubjunctivePresent(pronoun: Pronoun) {
        if (this.subjunctivePresent !== undefined && this.subjunctivePresent.has(pronoun)) {
            return this.subjunctivePresent.get(pronoun);
        } else {
            let presentIndicative = this.conjugatePresent("yo");
            let stem = presentIndicative.substr(0, presentIndicative.length - 1);
            if (this.regular.infinitive.endsWith('ar')) {
                switch (pronoun) {
                    case "yo":
                        return stem + "e";
                        break;
                    case "tú":
                        return stem + "es";
                        break;
                    case "él":
                        return stem + "e";
                        break;
                    case "nosotros":
                        return stem + "emos";
                        break;
                    case "ellos":
                        return stem + "en";
                        break;
                }
            } else {
                switch (pronoun) {
                    case "yo":
                        return stem + "a";
                        break;
                    case "tú":
                        return stem + "as";
                        break;
                    case "él":
                        return stem + "a";
                        break;
                    case "nosotros":
                        return stem + "amos";
                        break;
                    case "ellos":
                        return stem + "an";
                        break;
                }
            }
        }
    }

    constructor(regular: Verb,
        present: Map<Pronoun, string>,
        preterite?: Map<Pronoun, string>,
        imperfect?: Map<Pronoun, string>,
        future?: Map<Pronoun, string>,
        conditional?: Map<Pronoun, string>,
        subjunctivePresent?: Map<Pronoun, string>,
        pastParticiple?: string) {

        super(regular.infinitive);
        this.present = present;
        this.preterite = preterite;
        this.imperfect = imperfect;
        this.future = future;
        this.conditional = conditional;
        this.subjunctivePresent = subjunctivePresent;
        this.regular = regular;
        this.pastParticiple = pastParticiple;
    }

    regular: Verb;
    present: Map<Pronoun, string>;
    preterite: Map<Pronoun, string>;
    imperfect: Map<Pronoun, string>;
    future: Map<Pronoun, string>;
    conditional: Map<Pronoun, string>;
    subjunctivePresent: Map<Pronoun, string>;
    pastParticiple: string;
}

const VERBS: Array<Verb> = [
    new IrregularVerb(new RegularErVerb("ser"),
        new Map([["yo", "soy"],
        ["tú", "eres"],
        ["él", "es"],
        ["nosotros", "somos"],
        ["ellos", "son"]]),
        new Map([["yo", "fui"],
        ["tú", "fuiste"],
        ["él", "fue"],
        ["nosotros", "fuimos"],
        ["ellos", "fueron"]]),
        new Map([["yo", "era"],
        ["tú", "eras"],
        ["él", "era"],
        ["nosotros", "éramos"],
        ["ellos", "eran"]]),
        new Map(), new Map(),
        new Map([["yo", "sea"],
        ["tú", "seas"],
        ["él", "sea"],
        ["nosotros", "seamos"],
        ["ellos", "sean"]]),
        "sido"),
    new IrregularVerb(new RegularArVerb("estar"),
        new Map([["yo", "estoy"],
        ["tú", "estás"],
        ["él", "está"],
        ["nosotros", "estamos"],
        ["ellos", "están"]]),
        new Map([["yo", "estuve"],
        ["tú", "estuviste"],
        ["él", "estuvo"],
        ["nosotros", "estuvimos"],
        ["ellos", "estuvieron"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "esté"],
        ["tú", "estés"],
        ["él", "esté"],
        ["nosotros", "estemos"],
        ["ellos", "estén"]])),
    new IrregularVerb(new RegularErVerb("tener"),
        new Map([["yo", "tengo"],
        ["tú", "tienes"],
        ["él", "tiene"],
        ["nosotros", "tenemos"],
        ["ellos", "tienen"]]),
        new Map([["yo", "tuve"],
        ["tú", "tuviste"],
        ["él", "tuvo"],
        ["nosotros", "tuvimos"],
        ["ellos", "tuvieron"]]),
        new Map(),
        new Map([["yo", "tendré"],
        ["tú", "tendrás"],
        ["él", "tendrá"],
        ["nosotros", "tendremos"],
        ["ellos", "tendrán"]]),
        new Map(),
        new Map([["yo", "tenga"],
        ["tú", "tengas"],
        ["él", "tenga"],
        ["nosotros", "tengamos"],
        ["ellos", "tengan"]])),
    new IrregularVerb(new RegularErVerb("hacer"),
        new Map([["yo", "hago"]]),
        new Map([["yo", "hice"],
        ["tú", "hiciste"],
        ["él", "hizo"],
        ["nosotros", "hicimos"],
        ["ellos", "hicieron"]]),
        new Map(),
        new Map([["yo", "haré"],
        ["tú", "harás"],
        ["él", "hará"],
        ["nosotros", "haremos"],
        ["ellos", "harán"]]),
        new Map([["yo", "haría"],
        ["tú", "harías"],
        ["él", "haría"],
        ["nosotros", "haríamos"],
        ["ellos", "harían"]]),
        new Map(),
        "hecho"),
    new IrregularVerb(new RegularErVerb("poder"),
        new Map([["yo", "puedo"],
        ["tú", "puedes"],
        ["él", "puede"],
        ["nosotros", "podemos"],
        ["ellos", "pueden"]]),
        new Map([["yo", "pude"],
        ["tú", "pudiste"],
        ["él", "pudo"],
        ["nosotros", "pudimos"],
        ["ellos", "pudieron"]]),
        new Map(),
        new Map([["yo", "podré"],
        ["tú", "podrás"],
        ["él", "podrá"],
        ["nosotros", "podremos"],
        ["ellos", "podrán"]])),
    new IrregularVerb(new RegularIrVerb("decir"),
        new Map([["yo", "digo"],
        ["tú", "dices"],
        ["él", "dice"],
        ["nosotros", "decimos"],
        ["ellos", "dicen"]]),
        new Map([["yo", "dije"],
        ["tú", "dijiste"],
        ["él", "dijo"],
        ["nosotros", "dijimos"],
        ["ellos", "dijeron"]]),
        new Map(),
        new Map([["yo", "diré"],
        ["tú", "dirás"],
        ["él", "dirá"],
        ["nosotros", "diremos"],
        ["ellos", "dirán"]]),
        new Map([["yo", "diría"],
        ["tú", "dirías"],
        ["él", "diría"],
        ["nosotros", "diríamos"],
        ["ellos", "dirían"]]),
        new Map(),
        "dicho"),
    new IrregularVerb(new RegularIrVerb("ir"),
        new Map([["yo", "voy"],
        ["tú", "vas"],
        ["él", "va"],
        ["nosotros", "vamos"],
        ["ellos", "van"]]),
        new Map([["yo", "fui"],
        ["tú", "fuiste"],
        ["él", "fue"],
        ["nosotros", "fuimos"],
        ["ellos", "fueron"]]),
        new Map([["yo", "iba"],
        ["tú", "ibas"],
        ["él", "iba"],
        ["nosotros", "íbamos"],
        ["ellos", "iban"]]),
        new Map(), new Map(),
        new Map([["yo", "vaya"],
        ["tú", "vayas"],
        ["él", "vaya"],
        ["nosotros", "vayamos"],
        ["ellos", "vayan"]]),
        "ido"),
    new IrregularVerb(new RegularErVerb("ver"),
        new Map([["yo", "veo"],
        ["tú", "ves"],
        ["él", "ve"],
        ["nosotros", "vemos"],
        ["ellos", "ven"]]),
        new Map([["yo", "vi"],
        ["tú", "viste"],
        ["él", "vio"],
        ["nosotros", "vimos"],
        ["ellos", "vieron"]]),
        new Map([["yo", "veía"],
        ["tú", "veías"],
        ["él", "veía"],
        ["nosotros", "veíamos"],
        ["ellos", "veían"]]),
        new Map(), new Map(),
        new Map(),
        "visto"),
    new IrregularVerb(new RegularArVerb("dar"),
        new Map([["yo", "doy"]]),
        new Map([["yo", "di"],
        ["tú", "diste"],
        ["él", "dio"],
        ["nosotros", "dicimos"],
        ["ellos", "dieron"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "dé"],
        ["tú", "des"],
        ["él", "dé"],
        ["nosotros", "demos"],
        ["ellos", "den"]])),
    new IrregularVerb(new RegularErVerb("saber"),
        new Map([["yo", "sé"]]),
        new Map([["yo", "supe"],
        ["tú", "supiste"],
        ["él", "supo"],
        ["nosotros", "supimos"],
        ["ellos", "supieron"]]),
        new Map(),
        new Map([["yo", "sabré"],
        ["tú", "sabrás"],
        ["él", "sabrá"],
        ["nosotros", "sabremos"],
        ["ellos", "sabrán"]]),
        new Map(),
        new Map([["yo", "sepa"],
        ["tú", "sepas"],
        ["él", "sepa"],
        ["nosotros", "sepamos"],
        ["ellos", "sepan"]])),
    new IrregularVerb(new RegularErVerb("querer"),
        new Map([["yo", "quiero"],
        ["tú", "quieres"],
        ["él", "quiere"],
        ["nosotros", "queremos"],
        ["ellos", "quieren"]]),
        new Map([["yo", "quise"],
        ["tú", "quisiste"],
        ["él", "quiso"],
        ["nosotros", "quisimos"],
        ["ellos", "quisieron"]]),
        new Map(),
        new Map([["yo", "querré"],
        ["tú", "querrás"],
        ["él", "querrá"],
        ["nosotros", "querremos"],
        ["ellos", "querrán"]])),
    new IrregularVerb(new RegularArVerb("llegar"),
        new Map(), new Map([["yo", "llegué"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "llegue"],
        ["tú", "llegues"],
        ["él", "llegue"],
        ["nosotros", "lleguemos"],
        ["ellos", "lleguen"]])),
    new RegularArVerb("pasar"),
    new RegularErVerb("deber"),
    new IrregularVerb(new RegularErVerb("poner"),
        new Map([["yo", "pongo"]]),
        new Map([["yo", "puse"],
        ["tú", "pusiste"],
        ["él", "puso"],
        ["nosotros", "pusimos"],
        ["ellos", "pusieron"]]),
        new Map(),
        new Map([["yo", "pondré"],
        ["tú", "pondrás"],
        ["él", "pondrá"],
        ["nosotros", "pondremos"],
        ["ellos", "pondrán"]]),
        new Map([["yo", "pondría"],
        ["tú", "pondrías"],
        ["él", "pondría"],
        ["nosotros", "pondríamos"],
        ["ellos", "pondrían"]]),
        new Map(),
        "puesto"),
    new IrregularVerb(new RegularErVerb("parecer"),
        new Map([["yo", "parezco"]])),
    new RegularArVerb("quedar"),
    new IrregularVerb(new RegularErVerb("creer"),
        new Map(), new Map([["él", "creyó"]]),
        new Map(), new Map(), new Map(), new Map(), "creído"),
    new RegularArVerb("hablar"),
    new RegularArVerb("llevar"),
    new RegularArVerb("dejar"),
    new IrregularVerb(new RegularIrVerb("seguir"),
        new Map([["yo", "sigo"],
        ["tú", "sigues"],
        ["él", "sigue"],
        ["nosotros", "seguimos"],
        ["ellos", "siguen"]]),
        new Map([["él", "siguió"],
        ["ellos", "siguieron"]])),
    new IrregularVerb(new RegularArVerb("encontrar"),
        new Map([["yo", "encuentro"],
        ["tú", "encuentras"],
        ["él", "encuentra"],
        ["nosotros", "encontramos"],
        ["ellos", "encuentran"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "encontremos"]])),
    new RegularArVerb("llamar"),
    new IrregularVerb(new RegularIrVerb("venir"),
        new Map([["yo", "vengo"],
        ["tú", "vienes"],
        ["él", "viene"],
        ["nosotros", "venemos"],
        ["ellos", "vienen"]]),
        new Map([["yo", "vine"],
        ["tú", "viniste"],
        ["él", "vino"],
        ["nosotros", "vinimos"],
        ["ellos", "vinieron"]])),
    new IrregularVerb(new RegularArVerb("pensar"),
        new Map([["yo", "pienso"],
        ["tú", "piensas"],
        ["él", "piensa"],
        ["nosotros", "pensamos"],
        ["ellos", "piensan"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "pensemos"]])),
    new IrregularVerb(new RegularIrVerb("salir"),
        new Map([["yo", "salgo"]])),
    new IrregularVerb(new RegularErVerb("volver"),
        new Map([["yo", "vuelvo"],
        ["tú", "vuelves"],
        ["él", "vuelve"],
        ["nosotros", "volvemos"],
        ["ellos", "vuelven"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "volvamos"]]),
        "vuelto"),
    new RegularArVerb("tomar"),
    new IrregularVerb(new RegularErVerb("conocer"),
        new Map([["yo", "conozco"]])),
    new RegularIrVerb("vivir"),
    new IrregularVerb(new RegularIrVerb("sentir"),
        new Map([["yo", "siento"],
        ["tú", "sientes"],
        ["él", "siente"],
        ["nosotros", "sentimos"],
        ["ellos", "sienten"]]),
        new Map([["él", "sintió"],
        ["ellos", "sintieron"]]),
        new Map(), new Map(), new Map(),
        new Map([["nosotros", "sintamos"]])),
    new RegularArVerb("tratar"),
    new RegularArVerb("mirar"),
    new IrregularVerb(new RegularArVerb("contar"),
        new Map([["yo", "cuento"],
        ["tú", "cuentas"],
        ["él", "cuenta"],
        ["nosotros", "contamos"],
        ["ellos", "cuentan"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "contemos"]])),
    new IrregularVerb(new RegularArVerb("empezar"),
        new Map([["yo", "empiezo"],
        ["tú", "empiezas"],
        ["él", "empieza"],
        ["nosotros", "empezamos"],
        ["ellos", "empiezan"]]),
        new Map([["yo", "empece"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "empiece"],
        ["tú", "empieces"],
        ["él", "empiece"],
        ["nosotros", "empecemos"],
        ["ellos", "empiecen"]])),
    new RegularArVerb("esperar"),
    new IrregularVerb(new RegularArVerb("buscar"),
        new Map(),
        new Map([["yo", "busqué"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "busque"],
        ["tú", "busques"],
        ["él", "busque"],
        ["nosotros", "busquemos"],
        ["ellos", "busquen"]])),
    new RegularIrVerb("existir"),
    new RegularArVerb("entrar"),
    new RegularArVerb("trabajar"),
    new IrregularVerb(new RegularIrVerb("escribir"),
        new Map(), new Map(),
        new Map(), new Map(), new Map(), new Map(), "escrito"),
    new IrregularVerb(new RegularErVerb("perder"),
        new Map([["yo", "pierdo"],
        ["tú", "pierdes"],
        ["él", "pierde"],
        ["nosotros", "perdemos"],
        ["ellos", "pierden"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "perdamos"]])),
    new IrregularVerb(new RegularIrVerb("producir"),
        new Map([["yo", "produzco"]]),
        new Map([["yo", "produje"],
        ["tú", "produjiste"],
        ["él", "produjo"],
        ["nosotros", "produjimos"],
        ["ellos", "produjeron"]])),
    new RegularIrVerb("ocurrir"),
    new IrregularVerb(new RegularErVerb("entender"),
        new Map([["yo", "entiendo"],
        ["tú", "entiendes"],
        ["él", "entiende"],
        ["nosotros", "entendemos"],
        ["ellos", "entienden"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "entendamos"]])),
    new IrregularVerb(new RegularIrVerb("pedir"),
        new Map([["yo", "pido"],
        ["tú", "pides"],
        ["él", "pide"],
        ["nosotros", "pedimos"],
        ["ellos", "piden"]]),
        new Map([["él", "pidió"],
        ["ellos", "pidieron"]])),
    new RegularIrVerb("recibir"),
    new IrregularVerb(new RegularArVerb("recordar"),
        new Map([["yo", "recuerdo"],
        ["tú", "recuerdas"],
        ["él", "recuerda"],
        ["nosotros", "recordamos"],
        ["ellos", "recuerdan"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "recordemos"]])),
    new IrregularVerb(new RegularErVerb("escoger"),
        new Map([["yo", "escojo"]])),
    new IrregularVerb(new RegularErVerb("exigir"),
        new Map([["yo", "exijo"]])),
];

export function randomVerb() {
    return VERBS[Math.floor(Math.random() * VERBS.length)];
}
