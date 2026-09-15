import type{ Ciri } from '../ciri/ciri.js'

export class Makhluk implements Ciri {
    nama: string
    umur: number
    ghaib: boolean
    constructor (namaParam:string, umurParam: number, ghaibParam: boolean) {
        this.nama = namaParam
        this.umur = umurParam
        this.ghaib = ghaibParam
    }
    tampilkan(): void {
        console.info(`
            nama: ${this.nama}
            umur: ${this.umur}
            ghaib: ${this.ghaib}
            `)
    }
}
