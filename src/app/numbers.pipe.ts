import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "numbers"
})
export class NumbersPipe implements PipeTransform {
  transform(number: number, args?: any): any {
    if (isNaN(number)) return null; // will only work value is a number
    if (number === null) return null;
    if (number === 0) return 0;
    let abs = Math.abs(number);
    const rounder = Math.pow(10, 2);
    const isNegative = number < 0; // will also work for Negative numbers
    let key = "";

    const powers = [
      { key: "c", value: Math.pow(10, 66) },
      { key: "v", value: Math.pow(10, 63) },
      { key: "Nd", value: Math.pow(10, 60) },
      { key: "Od", value: Math.pow(10, 57) },
      { key: "Spd", value: Math.pow(10, 54) },
      { key: "Sxd", value: Math.pow(10, 51) },
      { key: "Qid", value: Math.pow(10, 48) },
      { key: "Qad", value: Math.pow(10, 45) },
      { key: "Td", value: Math.pow(10, 42) },
      { key: "Dd", value: Math.pow(10, 39) },
      { key: "Ud", value: Math.pow(10, 36) },
      { key: "d", value: Math.pow(10, 33) },
      { key: "N", value: Math.pow(10, 30) },
      { key: "Oc", value: Math.pow(10, 27) },
      { key: "Sp", value: Math.pow(10, 24) },
      { key: "Sx", value: Math.pow(10, 21) },
      { key: "Qi", value: Math.pow(10, 18) },
      { key: "Qa", value: Math.pow(10, 15) },
      { key: "t", value: Math.pow(10, 12) },
      { key: "B", value: Math.pow(10, 9) },
      { key: "M", value: Math.pow(10, 6) },
      { key: "K", value: 1000 }
    ];

    for (let i = 0; i < powers.length; i++) {
      let reduced = abs / powers[i].value;
      reduced = Math.round(reduced * rounder) / rounder;
      if (reduced >= 1) {
        abs = reduced;
        key = powers[i].key;
        break;
      } else {
        abs = (Math.round(abs) * 100) / 100;
      }
    }
    return (isNegative ? "-" : "") + abs + key;
  }
}
