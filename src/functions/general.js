import * as R from "ramda"

export function callMethod(obj, methodName, ...args) {
    return obj[methodName](...args);
}

export function functionize(obj, methodName) {
    return (...args)=>{return callMethod(obj, methodName, ...args)}
}

export function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

export function base7(num = 0) {
    let sign = num < 0 && '−' || '';
    num = num * (sign + 1);
    let result = '';
    while (num) {
       result = num % 7 + result;
       num = num / 7 ^ 0;
    };
    return sign + result || "0";
 };

export default {
    callMethod,
    functionize,
    randomNumber,
}