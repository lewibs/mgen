import * as Tone from 'tone';
import * as R from 'ramda';
import * as G from "../general";

window.Tone = Tone;
window.R = R;

export const SYNTH = new Tone.Synth().toDestination();

function numToChord(num) {
    //0 = a1
    //1 = b1
    //2 = c1
    //3 = d1
    //4 = e1
    //5 = f1
    //6 = g1
    //7 = a2
    //49 = g7

    const letters = ["a", "b", "c", "d", "e", "f", "g"];
    const [letterInd, ...final] = R.reverse([...G.base7(num)]);
    const head = letters[+letterInd];
    const tail = final.pop();

    return head + tail;
}

const makeSound = R.curry(function (synth, cord, note, time) {
    return function sound() {
        return synth.triggerAttackRelease(cord, note, time);
    }
})

function generateNoteMaker(synth) {
    let triggerAttackRelease = makeSound(synth);

    return function makeNote(cord, note) {
        return triggerAttackRelease(cord, note);
    }
}

function makeFolder(action, maxLength) {
    let count = 0;
    return function(n) {
        if (count++ > maxLength) { 
            return false;
        } else {
            return [n, action(n)];
        }
    }
}

function makeNumShifter(min, max, diff) {
    return function generatenumber(n) {
        const rand = G.randomNumber(diff * -1, diff) + n;
        if (min > rand || max < rand) {
            return generatenumber(n);
        } else {
            return rand;
        }
    }
}

export function playCord(chord) {
    return generateNoteMaker(SYNTH)(chord, "1n")(); 
}

export function makeMelody(synth, differentialFactor, minLength, maxLength, minCord, maxCord) {
    if (minLength < 4) {
        throw new Error("min melody length must be greater then or equal to 4");
    }

    const length = G.randomNumber(minLength, maxLength);
    const start = G.randomNumber(minCord, maxCord);

    const generateNoteNum = makeNumShifter(minCord, maxCord, differentialFactor);
    const folder = makeFolder(generateNoteNum, length);
    const nums = R.map(Math.floor, R.unfold(folder, start));
    const noteMaker = generateNoteMaker(synth);
    const notes = R.map(numToChord, nums);
    const sounds = R.map((n)=>{return noteMaker(n, "6n")}, notes);

    return sounds;
}

export function executeMelody(melody, tick, now) {
    let time = 0;
    melody.map((s,i)=>{
        let ret = s(now+time)
        time = time + tick;
        return ret;
    }).forEach((s)=>{s()});
    return time;
}