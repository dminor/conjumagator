import { Pronoun, randomPronoun } from "./pronoun.js";
import { Tense, randomTense } from "./tense.js";
import { Verb, randomVerb } from "./verb.js";

class State {
    pronoun: Pronoun;
    tense: Tense;
    verb: Verb;
    allowedTenses: Map<Tense, boolean>;

    constructor() {
        this.allowedTenses = new Map();
    }

    randomize() {
        this.pronoun = randomPronoun();
        this.tense = randomTense();
        if (this.allowedTenses.size > 0) {
            while (!this.allowedTenses.get(this.tense)) {
                this.tense = randomTense();
            }
        }
        this.verb = randomVerb();
    }
}

let currentState = new State();

function updatePronoun(pronoun: Pronoun) {
    let pronounElement = document.getElementById("pronoun");

    if (pronoun == "él") {
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                pronounElement.innerText = "él";
                break;
            case 1:
                pronounElement.innerText = "ella";
                break;
            case 2:
                pronounElement.innerText = "usted";
                break;
        }
    } else if (pronoun == "nosotros") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                pronounElement.innerText = "nosotros";
                break;
            case 1:
                pronounElement.innerText = "nosotras";
                break;
        }
    } else if (pronoun == "ellos") {
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                pronounElement.innerText = "ellos";
                break;
            case 1:
                pronounElement.innerText = "ellas";
                break;
            case 2:
                pronounElement.innerText = "ustedes";
                break;
        }
    } else {
        pronounElement.innerText = pronoun;
    }
}

function updateTense(tense: Tense) {
    let table = document.getElementById("table");
    table.className = tense;
    let tenseElement = document.getElementById("tense");
    if (tense == "present") {
        tenseElement.innerText = "presente";
    } else if (tense == "preterite") {
        tenseElement.innerText = "preterito";
    } else if (tense == "imperfect") {
        tenseElement.innerText = "imperfecto";
    } else if (tense == "perfect") {
        tenseElement.innerText = "preterito perfecto";
    } else if (tense == "pluperfect") {
        tenseElement.innerText = "pluscuamperfecto";
    } else if (tense == "future") {
        tenseElement.innerText = "futuro";
    } else if (tense == "conditional") {
        tenseElement.innerText = "condicional";
    }
}

function updateVerb(verb: Verb) {
    let verbElement = document.getElementById("verb");
    verbElement.innerText = verb.infinitive;
}

function checkAnswer(conjugated: string, answer: string) {
    // May want to do some normalization of the answer at some point
    // e.g. remove whitespace or allow incorrect accents.
    return conjugated == answer;
}

function handleAnswer() {
    let input = document.getElementById("input") as HTMLInputElement;
    let result = document.getElementById("result");
    let conjugated = currentState.verb.conjugate(currentState.tense, currentState.pronoun);
    if (checkAnswer(conjugated, input.value)) {
        result.innerText = "Correct!";
    } else {
        result.innerText = "Oops: " + conjugated;
    }

    let form = document.getElementById("answer") as HTMLFormElement;
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        nextQuestion();
    }, { once: true });
}

function nextQuestion() {
    let form = document.getElementById("answer") as HTMLFormElement;
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        handleAnswer();
    }, { once: true });

    let input = document.getElementById("input") as HTMLInputElement;
    input.value = "";

    let result = document.getElementById("result");
    result.innerText = "";
    currentState.randomize();
    updateTense(currentState.tense);
    updatePronoun(currentState.pronoun);
    updateVerb(currentState.verb);
}

export function setup() {
    let input = document.getElementById("input") as HTMLInputElement;
    for (let c of ['á', 'é', 'í', 'ñ', 'ó', 'ú']) {
        let el = document.getElementById(c);
        el.addEventListener('click', _ => {
            input.value += c;
            input.focus();
        });
    }

    let allowedTenses = document.getElementById("allowedTenses") as HTMLElement;
    for (let child of allowedTenses.childNodes) {
        if (child.nodeName === "INPUT") {
            let input = child as HTMLInputElement;
            if (input.checked) {
                currentState.allowedTenses.set(input.id as Tense, true);
            } else {
                currentState.allowedTenses.set(input.id as Tense, false);
            }
            input.addEventListener('click', _ => {
                currentState.allowedTenses.set(input.id as Tense, !currentState.allowedTenses.get(input.id as Tense));
            });
        }
    }

    nextQuestion();
}
