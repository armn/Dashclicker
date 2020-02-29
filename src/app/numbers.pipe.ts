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
      { key: "Td", value: Math.pow(10, 42) },
      { key: "D", value: Math.pow(10, 39) },
      { key: "U", value: Math.pow(10, 36) },
      { key: "D", value: Math.pow(10, 33) },
      { key: "N", value: Math.pow(10, 30) },
      { key: "O", value: Math.pow(10, 27) },
      { key: "Sp", value: Math.pow(10, 24) },
      { key: "S", value: Math.pow(10, 21) },
      { key: "Qi", value: Math.pow(10, 18) },
      { key: "Q", value: Math.pow(10, 15) },
      { key: "T", value: Math.pow(10, 12) },
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
