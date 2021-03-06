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
["t??", "has"],
["??l", "ha"],
["nosotros", "hemos"],
["ellos", "han"]]);

let HaberImperfect = new Map([["yo", "hab??a"],
["t??", "hab??as"],
["??l", "hab??a"],
["nosotros", "hab??amos"],
["ellos", "hab??an"]]);

class RegularArVerb extends Verb {
    conjugatePresent(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.stem + "o";
                break;
            case "t??":
                return this.stem + "as";
                break;
            case "??l":
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
                return this.stem + "??";
                break;
            case "t??":
                return this.stem + "aste";
                break;
            case "??l":
                return this.stem + "??";
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
            case "t??":
                return this.stem + "abas";
                break;
            case "??l":
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
                return this.infinitive + "??";
                break;
            case "t??":
                return this.infinitive + "??s";
                break;
            case "??l":
                return this.infinitive + "??";
                break;
            case "nosotros":
                return this.infinitive + "emos";
                break;
            case "ellos":
                return this.infinitive + "??n";
                break;
        }
    }

    conjugateConditional(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.infinitive + "??a";
                break;
            case "t??":
                return this.infinitive + "??as";
                break;
            case "??l":
                return this.infinitive + "??a";
                break;
            case "nosotros":
                return this.infinitive + "??amos";
                break;
            case "ellos":
                return this.infinitive + "??an";
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
            case "t??":
                return stem + "es";
                break;
            case "??l":
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
            case "t??":
                return this.stem + "es";
                break;
            case "??l":
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
                return this.stem + "??";
                break;
            case "t??":
                return this.stem + "iste";
                break;
            case "??l":
                return this.stem + "i??";
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
                return this.stem + "??a";
                break;
            case "t??":
                return this.stem + "??as";
                break;
            case "??l":
                return this.stem + "??a";
                break;
            case "nosotros":
                return this.stem + "??amos";
                break;
            case "ellos":
                return this.stem + "??an";
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
                return this.infinitive + "??";
                break;
            case "t??":
                return this.infinitive + "??s";
                break;
            case "??l":
                return this.infinitive + "??";
                break;
            case "nosotros":
                return this.infinitive + "emos";
                break;
            case "ellos":
                return this.infinitive + "??n";
                break;
        }
    }

    conjugateConditional(pronoun: Pronoun) {
        switch (pronoun) {
            case "yo":
                return this.infinitive + "??a";
                break;
            case "t??":
                return this.infinitive + "??as";
                break;
            case "??l":
                return this.infinitive + "??a";
                break;
            case "nosotros":
                return this.infinitive + "??amos";
                break;
            case "ellos":
                return this.infinitive + "??an";
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
            case "t??":
                return stem + "as";
                break;
            case "??l":
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
            this.pastParticiple = this.stem + "??do";
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
            this.pastParticiple = this.stem + "??do";
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
                    case "t??":
                        return stem + "es";
                        break;
                    case "??l":
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
                    case "t??":
                        return stem + "as";
                        break;
                    case "??l":
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
        ["t??", "eres"],
        ["??l", "es"],
        ["nosotros", "somos"],
        ["ellos", "son"]]),
        new Map([["yo", "fui"],
        ["t??", "fuiste"],
        ["??l", "fue"],
        ["nosotros", "fuimos"],
        ["ellos", "fueron"]]),
        new Map([["yo", "era"],
        ["t??", "eras"],
        ["??l", "era"],
        ["nosotros", "??ramos"],
        ["ellos", "eran"]]),
        new Map(), new Map(),
        new Map([["yo", "sea"],
        ["t??", "seas"],
        ["??l", "sea"],
        ["nosotros", "seamos"],
        ["ellos", "sean"]]),
        "sido"),
    new IrregularVerb(new RegularArVerb("estar"),
        new Map([["yo", "estoy"],
        ["t??", "est??s"],
        ["??l", "est??"],
        ["nosotros", "estamos"],
        ["ellos", "est??n"]]),
        new Map([["yo", "estuve"],
        ["t??", "estuviste"],
        ["??l", "estuvo"],
        ["nosotros", "estuvimos"],
        ["ellos", "estuvieron"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "est??"],
        ["t??", "est??s"],
        ["??l", "est??"],
        ["nosotros", "estemos"],
        ["ellos", "est??n"]])),
    new IrregularVerb(new RegularErVerb("tener"),
        new Map([["yo", "tengo"],
        ["t??", "tienes"],
        ["??l", "tiene"],
        ["nosotros", "tenemos"],
        ["ellos", "tienen"]]),
        new Map([["yo", "tuve"],
        ["t??", "tuviste"],
        ["??l", "tuvo"],
        ["nosotros", "tuvimos"],
        ["ellos", "tuvieron"]]),
        new Map(),
        new Map([["yo", "tendr??"],
        ["t??", "tendr??s"],
        ["??l", "tendr??"],
        ["nosotros", "tendremos"],
        ["ellos", "tendr??n"]]),
        new Map(),
        new Map([["yo", "tenga"],
        ["t??", "tengas"],
        ["??l", "tenga"],
        ["nosotros", "tengamos"],
        ["ellos", "tengan"]])),
    new IrregularVerb(new RegularErVerb("hacer"),
        new Map([["yo", "hago"]]),
        new Map([["yo", "hice"],
        ["t??", "hiciste"],
        ["??l", "hizo"],
        ["nosotros", "hicimos"],
        ["ellos", "hicieron"]]),
        new Map(),
        new Map([["yo", "har??"],
        ["t??", "har??s"],
        ["??l", "har??"],
        ["nosotros", "haremos"],
        ["ellos", "har??n"]]),
        new Map([["yo", "har??a"],
        ["t??", "har??as"],
        ["??l", "har??a"],
        ["nosotros", "har??amos"],
        ["ellos", "har??an"]]),
        new Map(),
        "hecho"),
    new IrregularVerb(new RegularErVerb("poder"),
        new Map([["yo", "puedo"],
        ["t??", "puedes"],
        ["??l", "puede"],
        ["nosotros", "podemos"],
        ["ellos", "pueden"]]),
        new Map([["yo", "pude"],
        ["t??", "pudiste"],
        ["??l", "pudo"],
        ["nosotros", "pudimos"],
        ["ellos", "pudieron"]]),
        new Map(),
        new Map([["yo", "podr??"],
        ["t??", "podr??s"],
        ["??l", "podr??"],
        ["nosotros", "podremos"],
        ["ellos", "podr??n"]])),
    new IrregularVerb(new RegularIrVerb("decir"),
        new Map([["yo", "digo"],
        ["t??", "dices"],
        ["??l", "dice"],
        ["nosotros", "decimos"],
        ["ellos", "dicen"]]),
        new Map([["yo", "dije"],
        ["t??", "dijiste"],
        ["??l", "dijo"],
        ["nosotros", "dijimos"],
        ["ellos", "dijeron"]]),
        new Map(),
        new Map([["yo", "dir??"],
        ["t??", "dir??s"],
        ["??l", "dir??"],
        ["nosotros", "diremos"],
        ["ellos", "dir??n"]]),
        new Map([["yo", "dir??a"],
        ["t??", "dir??as"],
        ["??l", "dir??a"],
        ["nosotros", "dir??amos"],
        ["ellos", "dir??an"]]),
        new Map(),
        "dicho"),
    new IrregularVerb(new RegularIrVerb("ir"),
        new Map([["yo", "voy"],
        ["t??", "vas"],
        ["??l", "va"],
        ["nosotros", "vamos"],
        ["ellos", "van"]]),
        new Map([["yo", "fui"],
        ["t??", "fuiste"],
        ["??l", "fue"],
        ["nosotros", "fuimos"],
        ["ellos", "fueron"]]),
        new Map([["yo", "iba"],
        ["t??", "ibas"],
        ["??l", "iba"],
        ["nosotros", "??bamos"],
        ["ellos", "iban"]]),
        new Map(), new Map(),
        new Map([["yo", "vaya"],
        ["t??", "vayas"],
        ["??l", "vaya"],
        ["nosotros", "vayamos"],
        ["ellos", "vayan"]]),
        "ido"),
    new IrregularVerb(new RegularErVerb("ver"),
        new Map([["yo", "veo"],
        ["t??", "ves"],
        ["??l", "ve"],
        ["nosotros", "vemos"],
        ["ellos", "ven"]]),
        new Map([["yo", "vi"],
        ["t??", "viste"],
        ["??l", "vio"],
        ["nosotros", "vimos"],
        ["ellos", "vieron"]]),
        new Map([["yo", "ve??a"],
        ["t??", "ve??as"],
        ["??l", "ve??a"],
        ["nosotros", "ve??amos"],
        ["ellos", "ve??an"]]),
        new Map(), new Map(),
        new Map(),
        "visto"),
    new IrregularVerb(new RegularArVerb("dar"),
        new Map([["yo", "doy"]]),
        new Map([["yo", "di"],
        ["t??", "diste"],
        ["??l", "dio"],
        ["nosotros", "dicimos"],
        ["ellos", "dieron"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "d??"],
        ["t??", "des"],
        ["??l", "d??"],
        ["nosotros", "demos"],
        ["ellos", "den"]])),
    new IrregularVerb(new RegularErVerb("saber"),
        new Map([["yo", "s??"]]),
        new Map([["yo", "supe"],
        ["t??", "supiste"],
        ["??l", "supo"],
        ["nosotros", "supimos"],
        ["ellos", "supieron"]]),
        new Map(),
        new Map([["yo", "sabr??"],
        ["t??", "sabr??s"],
        ["??l", "sabr??"],
        ["nosotros", "sabremos"],
        ["ellos", "sabr??n"]]),
        new Map(),
        new Map([["yo", "sepa"],
        ["t??", "sepas"],
        ["??l", "sepa"],
        ["nosotros", "sepamos"],
        ["ellos", "sepan"]])),
    new IrregularVerb(new RegularErVerb("querer"),
        new Map([["yo", "quiero"],
        ["t??", "quieres"],
        ["??l", "quiere"],
        ["nosotros", "queremos"],
        ["ellos", "quieren"]]),
        new Map([["yo", "quise"],
        ["t??", "quisiste"],
        ["??l", "quiso"],
        ["nosotros", "quisimos"],
        ["ellos", "quisieron"]]),
        new Map(),
        new Map([["yo", "querr??"],
        ["t??", "querr??s"],
        ["??l", "querr??"],
        ["nosotros", "querremos"],
        ["ellos", "querr??n"]])),
    new IrregularVerb(new RegularArVerb("llegar"),
        new Map(), new Map([["yo", "llegu??"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "llegue"],
        ["t??", "llegues"],
        ["??l", "llegue"],
        ["nosotros", "lleguemos"],
        ["ellos", "lleguen"]])),
    new RegularArVerb("pasar"),
    new RegularErVerb("deber"),
    new IrregularVerb(new RegularErVerb("poner"),
        new Map([["yo", "pongo"]]),
        new Map([["yo", "puse"],
        ["t??", "pusiste"],
        ["??l", "puso"],
        ["nosotros", "pusimos"],
        ["ellos", "pusieron"]]),
        new Map(),
        new Map([["yo", "pondr??"],
        ["t??", "pondr??s"],
        ["??l", "pondr??"],
        ["nosotros", "pondremos"],
        ["ellos", "pondr??n"]]),
        new Map([["yo", "pondr??a"],
        ["t??", "pondr??as"],
        ["??l", "pondr??a"],
        ["nosotros", "pondr??amos"],
        ["ellos", "pondr??an"]]),
        new Map(),
        "puesto"),
    new IrregularVerb(new RegularErVerb("parecer"),
        new Map([["yo", "parezco"]])),
    new RegularArVerb("quedar"),
    new IrregularVerb(new RegularErVerb("creer"),
        new Map(), new Map([["??l", "crey??"]]),
        new Map(), new Map(), new Map(), new Map(), "cre??do"),
    new RegularArVerb("hablar"),
    new RegularArVerb("llevar"),
    new RegularArVerb("dejar"),
    new IrregularVerb(new RegularIrVerb("seguir"),
        new Map([["yo", "sigo"],
        ["t??", "sigues"],
        ["??l", "sigue"],
        ["nosotros", "seguimos"],
        ["ellos", "siguen"]]),
        new Map([["??l", "sigui??"],
        ["ellos", "siguieron"]])),
    new IrregularVerb(new RegularArVerb("encontrar"),
        new Map([["yo", "encuentro"],
        ["t??", "encuentras"],
        ["??l", "encuentra"],
        ["nosotros", "encontramos"],
        ["ellos", "encuentran"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "encontremos"]])),
    new RegularArVerb("llamar"),
    new IrregularVerb(new RegularIrVerb("venir"),
        new Map([["yo", "vengo"],
        ["t??", "vienes"],
        ["??l", "viene"],
        ["nosotros", "venemos"],
        ["ellos", "vienen"]]),
        new Map([["yo", "vine"],
        ["t??", "viniste"],
        ["??l", "vino"],
        ["nosotros", "vinimos"],
        ["ellos", "vinieron"]])),
    new IrregularVerb(new RegularArVerb("pensar"),
        new Map([["yo", "pienso"],
        ["t??", "piensas"],
        ["??l", "piensa"],
        ["nosotros", "pensamos"],
        ["ellos", "piensan"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "pensemos"]])),
    new IrregularVerb(new RegularIrVerb("salir"),
        new Map([["yo", "salgo"]])),
    new IrregularVerb(new RegularErVerb("volver"),
        new Map([["yo", "vuelvo"],
        ["t??", "vuelves"],
        ["??l", "vuelve"],
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
        ["t??", "sientes"],
        ["??l", "siente"],
        ["nosotros", "sentimos"],
        ["ellos", "sienten"]]),
        new Map([["??l", "sinti??"],
        ["ellos", "sintieron"]]),
        new Map(), new Map(), new Map(),
        new Map([["nosotros", "sintamos"]])),
    new RegularArVerb("tratar"),
    new RegularArVerb("mirar"),
    new IrregularVerb(new RegularArVerb("contar"),
        new Map([["yo", "cuento"],
        ["t??", "cuentas"],
        ["??l", "cuenta"],
        ["nosotros", "contamos"],
        ["ellos", "cuentan"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "contemos"]])),
    new IrregularVerb(new RegularArVerb("empezar"),
        new Map([["yo", "empiezo"],
        ["t??", "empiezas"],
        ["??l", "empieza"],
        ["nosotros", "empezamos"],
        ["ellos", "empiezan"]]),
        new Map([["yo", "empece"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "empiece"],
        ["t??", "empieces"],
        ["??l", "empiece"],
        ["nosotros", "empecemos"],
        ["ellos", "empiecen"]])),
    new RegularArVerb("esperar"),
    new IrregularVerb(new RegularArVerb("buscar"),
        new Map(),
        new Map([["yo", "busqu??"]]),
        new Map(), new Map(), new Map(),
        new Map([["yo", "busque"],
        ["t??", "busques"],
        ["??l", "busque"],
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
        ["t??", "pierdes"],
        ["??l", "pierde"],
        ["nosotros", "perdemos"],
        ["ellos", "pierden"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "perdamos"]])),
    new IrregularVerb(new RegularIrVerb("producir"),
        new Map([["yo", "produzco"]]),
        new Map([["yo", "produje"],
        ["t??", "produjiste"],
        ["??l", "produjo"],
        ["nosotros", "produjimos"],
        ["ellos", "produjeron"]])),
    new RegularIrVerb("ocurrir"),
    new IrregularVerb(new RegularErVerb("entender"),
        new Map([["yo", "entiendo"],
        ["t??", "entiendes"],
        ["??l", "entiende"],
        ["nosotros", "entendemos"],
        ["ellos", "entienden"]]),
        new Map(), new Map(), new Map(), new Map(),
        new Map([["nosotros", "entendamos"]])),
    new IrregularVerb(new RegularIrVerb("pedir"),
        new Map([["yo", "pido"],
        ["t??", "pides"],
        ["??l", "pide"],
        ["nosotros", "pedimos"],
        ["ellos", "piden"]]),
        new Map([["??l", "pidi??"],
        ["ellos", "pidieron"]])),
    new RegularIrVerb("recibir"),
    new IrregularVerb(new RegularArVerb("recordar"),
        new Map([["yo", "recuerdo"],
        ["t??", "recuerdas"],
        ["??l", "recuerda"],
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
