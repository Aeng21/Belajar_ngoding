export class Makhluk {
    nama;
    umur;
    ghaib;
    constructor(namaParam, umurParam, ghaibParam) {
        this.nama = namaParam;
        this.umur = umurParam;
        this.ghaib = ghaibParam;
    }
    tampilkan() {
        console.info(`
            nama: ${this.nama}
            umur: ${this.umur}
            ghaib: ${this.ghaib}
            `);
    }
}
//# sourceMappingURL=class.js.map