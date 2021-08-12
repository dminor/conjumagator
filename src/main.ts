import { Mood, tensesForMood, randomMood } from "./mood.js";
import { Pronoun, randomPronoun } from "./pronoun.js";
import { Tense, randomTense } from "./tense.js";
import { Verb, randomVerb } from "./verb.js";

class State {
    mood: Mood;
    pronoun: Pronoun;
    tense: Tense;
    verb: Verb;
    allowedMoods: Map<Mood, boolean>;
    allowedTenses: Map<Tense, boolean>;

    constructor() {
        this.allowedMoods = new Map();
        this.allowedTenses = new Map();
    }

    randomize() {
        let allowedMoods = new Array<Mood>();
        this.allowedMoods.forEach((value, key, map) => { if (value) allowedMoods.push(key) });
        this.mood = randomMood(allowedMoods);
        this.pronoun = randomPronoun();

        let allowedTenses = new Array<Tense>();
        for (let tense of tensesForMood(this.mood)) {
            if (this.allowedTenses.get(tense)) {
                allowedTenses.push(tense);
            }
        }

        this.tense = randomTense(allowedTenses);
        this.verb = randomVerb();
    }
}

let currentState = new State();

function updateMood(mood: Mood) {
    let moodElement = document.getElementById("mood");
    if (mood == "indicative") {
        moodElement.innerText = "indicativo";
    } else {
        moodElement.innerText = "subjuntivo";
    }
}

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
    let conjugated = currentState.verb.conjugate(currentState.mood, currentState.tense, currentState.pronoun);
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
    updateMood(currentState.mood);
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

    let allowedMoods = document.getElementById("allowedMoods") as HTMLElement;
    for (let child of allowedMoods.childNodes) {
        if (child.nodeName === "INPUT") {
            let input = child as HTMLInputElement;
            if (input.checked) {
                currentState.allowedMoods.set(input.id as Mood, true);
            } else {
                currentState.allowedMoods.set(input.id as Mood, false);
            }
            input.addEventListener('click', _ => {
                currentState.allowedMoods.set(input.id as Mood, !currentState.allowedMoods.get(input.id as Mood));
            });
        }
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
