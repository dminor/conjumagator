import { Tense } from "./tense.js";

export type Mood =
    "indicative"
    | "subjunctive";

export function randomMood(allowedMoods: Array<Mood>): Mood {
    if (allowedMoods.length === 0) {
        return "indicative";
    }
    return allowedMoods[Math.floor(Math.random() * allowedMoods.length)];
}

export function tensesForMood(mood: Mood): Array<Tense> {
    if (mood === "indicative") {
        return ["present", "preterite", "imperfect", "perfect", "pluperfect", "future", "conditional"];
    } else {
        return ["present"];
    }
}