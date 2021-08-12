import { tensesForMood, randomMood } from "./mood.js";
import { randomPronoun } from "./pronoun.js";
import { randomTense } from "./tense.js";
import { randomVerb } from "./verb.js";
class State {
    constructor() {
        this.allowedMoods = new Map();
        this.allowedTenses = new Map();
    }
    randomize() {
        let allowedMoods = new Array();
        this.allowedMoods.forEach((value, key, map) => { if (value)
            allowedMoods.push(key); });
        this.mood = randomMood(allowedMoods);
        this.pronoun = randomPronoun();
        let allowedTenses = new Array();
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
function updateMood(mood) {
    let moodElement = document.getElementById("mood");
    if (mood == "indicative") {
        moodElement.innerText = "indicativo";
    }
    else {
        moodElement.innerText = "subjuntivo";
    }
}
function updatePronoun(pronoun) {
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
    }
    else if (pronoun == "nosotros") {
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                pronounElement.innerText = "nosotros";
                break;
            case 1:
                pronounElement.innerText = "nosotras";
                break;
        }
    }
    else if (pronoun == "ellos") {
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
    }
    else {
        pronounElement.innerText = pronoun;
    }
}
function updateTense(tense) {
    let table = document.getElementById("table");
    table.className = tense;
    let tenseElement = document.getElementById("tense");
    if (tense == "present") {
        tenseElement.innerText = "presente";
    }
    else if (tense == "preterite") {
        tenseElement.innerText = "preterito";
    }
    else if (tense == "imperfect") {
        tenseElement.innerText = "imperfecto";
    }
    else if (tense == "perfect") {
        tenseElement.innerText = "preterito perfecto";
    }
    else if (tense == "pluperfect") {
        tenseElement.innerText = "pluscuamperfecto";
    }
    else if (tense == "future") {
        tenseElement.innerText = "futuro";
    }
    else if (tense == "conditional") {
        tenseElement.innerText = "condicional";
    }
}
function updateVerb(verb) {
    let verbElement = document.getElementById("verb");
    verbElement.innerText = verb.infinitive;
}
function checkAnswer(conjugated, answer) {
    // May want to do some normalization of the answer at some point
    // e.g. remove whitespace or allow incorrect accents.
    return conjugated == answer;
}
function handleAnswer() {
    let input = document.getElementById("input");
    let result = document.getElementById("result");
    let conjugated = currentState.verb.conjugate(currentState.mood, currentState.tense, currentState.pronoun);
    if (checkAnswer(conjugated, input.value)) {
        result.innerText = "Correct!";
    }
    else {
        result.innerText = "Oops: " + conjugated;
    }
    let form = document.getElementById("answer");
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        nextQuestion();
    }, { once: true });
}
function nextQuestion() {
    let form = document.getElementById("answer");
    form.addEventListener('submit', ev => {
        ev.preventDefault();
        handleAnswer();
    }, { once: true });
    let input = document.getElementById("input");
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
    let input = document.getElementById("input");
    for (let c of ['á', 'é', 'í', 'ñ', 'ó', 'ú']) {
        let el = document.getElementById(c);
        el.addEventListener('click', _ => {
            input.value += c;
            input.focus();
        });
    }
    let allowedMoods = document.getElementById("allowedMoods");
    for (let child of allowedMoods.childNodes) {
        if (child.nodeName === "INPUT") {
            let input = child;
            if (input.checked) {
                currentState.allowedMoods.set(input.id, true);
            }
            else {
                currentState.allowedMoods.set(input.id, false);
            }
            input.addEventListener('click', _ => {
                currentState.allowedMoods.set(input.id, !currentState.allowedMoods.get(input.id));
            });
        }
    }
    let allowedTenses = document.getElementById("allowedTenses");
    for (let child of allowedTenses.childNodes) {
        if (child.nodeName === "INPUT") {
            let input = child;
            if (input.checked) {
                currentState.allowedTenses.set(input.id, true);
            }
            else {
                currentState.allowedTenses.set(input.id, false);
            }
            input.addEventListener('click', _ => {
                currentState.allowedTenses.set(input.id, !currentState.allowedTenses.get(input.id));
            });
        }
    }
    nextQuestion();
}
