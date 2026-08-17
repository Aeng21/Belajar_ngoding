"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//variabel
const nama = "kamal";
console.info(`variabel@ ${nama}`);
console.info(" ");
// Array
const iniArray = [
    "apel",
    "38",
    "zombie",
    "5000"
];
console.info(iniArray);
console.info(" ");
//for of
for (const element of iniArray) {
    console.info(element);
}
console.info(" ");
//objeck
const iniObjeck = {
    tipe: "hostile",
    attack: true,
    health: 30
};
//for in
for (const element in iniObjeck) {
    const key = element;
    console.info(`${key} : ${iniObjeck[key]}`);
}
console.info(" ");
// function
function tambah(a, b) {
    const hasil = a + b;
    return hasil;
}
const tambahAwal = tambah(4, 7);
console.info(tambahAwal);
console.info(" ");
//if else
function ifElse(angka) {
    if (angka < 0) {
        return "angka tidak boleh negatif";
    }
    else {
        return "angka anda tidak negatif";
    }
}
const ifElseHasil = ifElse(-7);
console.info(ifElseHasil);
console.info(" ");
//switch
const iniSwitch = 80;
switch (true) {
    case iniSwitch == 100:
        console.info("perfect nilai");
        break;
    case iniSwitch >= 90:
        console.info("sangat bagus");
        break;
    case iniSwitch >= 80:
        console.info("bagus");
        break;
    case iniSwitch >= 70:
        console.info("rata- rata");
        break;
    case iniSwitch < 70:
        console.info("hasilnya sampah");
        break;
    default:
        console.info("masukan nilai");
        break;
}
console.info(" ");
//for
for (let index = 0; index <= 10; index++) {
    console.info(index);
}
//class
//# sourceMappingURL=index.js.map