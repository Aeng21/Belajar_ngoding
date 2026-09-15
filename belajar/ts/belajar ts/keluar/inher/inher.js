import { Makhluk } from "../class/class.js";
export class Manusia extends Makhluk {
    sifat;
    suara;
    constructor(namaParam, umurParam, ghaibParam, sifatParam, suaraParam) {
        super(namaParam, umurParam, ghaibParam);
        this.sifat = sifatParam;
        this.suara = suaraParam;
    }
    teriakan() {
        console.info(`${this.suara}`);
    }
}
export const prabowo = new Manusia("prabowo", 140, false, "lancang", "hei antek antek asing");
export const windah = new Manusia("brando", 40, false, "barbar tapi penakut", "ini adalah aku raja meksiko elmatador salvador tekila elkontole yah");
//# sourceMappingURL=inher.js.map