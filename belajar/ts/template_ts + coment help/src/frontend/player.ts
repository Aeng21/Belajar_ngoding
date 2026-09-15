// Base URL endpoint untuk resource player di server.
const API_URL = 'http://localhost:3000/api/player';

// ============================================================
// 2. AMBIL ELEMEN DOM UNTUK FORM TAMBAH DATA
// ============================================================

// Ambil elemen form tambah, input nama, alamat, rank, dan tbody tabel.
const formTambah = document.getElementById('formTambah') as HTMLFormElement;
const namaTambah = document.getElementById('namaTambah') as HTMLInputElement;
const alamatTambah = document.getElementById('alamatTambah') as HTMLInputElement;
const rankTambah = document.getElementById('rankTambah') as HTMLInputElement;
const tbody = document.getElementById('tbodyPlayer') as HTMLTableSectionElement;

// ============================================================
// 3. AMBIL ELEMEN DOM UNTUK MODAL EDIT
// ============================================================

// Modal overlay (lapisan gelap di belakang modal)
const modalOverlay = document.getElementById('modalEdit') as HTMLDivElement;
// Form edit di dalam modal
const formEdit = document.getElementById('formEdit') as HTMLFormElement;
// Input-an di dalam modal
const editNama = document.getElementById('editNama') as HTMLInputElement;
const editAlamat = document.getElementById('editAlamat') as HTMLInputElement;
const editRank = document.getElementById('editRank') as HTMLInputElement;
// Tombol close (ikon 'x') dan tombol batal
const modalClose = document.getElementById('modalClose') as HTMLSpanElement;
const btnCancelEdit = document.getElementById('btnCancelEdit') as HTMLButtonElement;

// Variabel untuk menyimpan ID player yang sedang diedit
let currentEditId: string | null = null;

// ============================================================
// 4. FUNGSI UNTUK MEMBUKA DAN MENUTUP MODAL EDIT
// ============================================================

// Membuka modal dan mengisi input dengan data yang akan diedit
function openEditModal(id: string, nama: string, alamat: string, rank: string) {
    currentEditId = id;               // simpan ID untuk keperluan update
    editNama.value = nama;            // isi nilai input
    editAlamat.value = alamat;
    editRank.value = rank;
    modalOverlay.classList.add('active'); // tampilkan modal (CSS class 'active')
}

// Menutup modal, mereset form dan ID
function closeEditModal() {
    modalOverlay.classList.remove('active');
    currentEditId = null;
    formEdit.reset();
}

// Event listener untuk menutup modal:
// - klik tombol close (x)
// - klik tombol Batal
// - klik di luar area modal (overlay)
modalClose.addEventListener('click', closeEditModal);
btnCancelEdit.addEventListener('click', closeEditModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeEditModal();
});

// ============================================================
// 5. FUNGSI UNTUK MEMUAT DATA DARI SERVER (GET)
// ============================================================

// Mengambil semua data player dari API dan menampilkannya di tabel
async function loadData() {
    try {
        const res = await fetch(API_URL);              // GET request
        const result = await res.json();               // parse JSON
        if (result.success) renderData(result.data);   // jika sukses, tampilkan
        else alert('Gagal memuat data: ' + result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memuat data.');
    }
}

// ============================================================
// 6. FUNGSI MENAMPILKAN DATA KE TABEL
// ============================================================

// Menerima array data dan membuat baris tabel + tombol aksi
function renderData(data: any[]) {
    // Jika data kosong, tampilkan pesan
    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data</td></tr>`;
        return;
    }
    // Bangun string HTML untuk setiap baris
    let html = '';
    data.forEach(item => {
        html += `
          <tr>
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.alamat}</td>
            <td>${item.rank}</td>
            <td>
              <!-- Tombol Edit dan Hapus, menyimpan data sebagai atribut data-* -->
              <button class="action-btn edit-btn" data-id="${item.id}" data-nama="${item.nama}" data-alamat="${item.alamat}" data-rank="${item.rank}">Edit</button>
              <button class="action-btn delete-btn" data-id="${item.id}">Hapus</button>
            </td>
          </tr>
        `;
    });
    tbody.innerHTML = html;

    // Pasang event listener pada tombol Edit (setelah dirender)
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn as HTMLButtonElement;
            // Ambil data dari atribut data-* dan buka modal
            openEditModal(
                target.dataset.id!,
                target.dataset.nama!,
                target.dataset.alamat!,
                target.dataset.rank!
            );
        });
    });

    // Pasang event listener pada tombol Hapus
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn as HTMLButtonElement;
            deleteData(target.dataset.id!);
        });
    });
}

// ============================================================
// 7. FUNGSI UNTUK CREATE (TAMBAH) DATA
// ============================================================

// Mengirim data baru ke server dengan method POST
async function createData(nama: string, alamat: string, rank: string) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            // tempat mendeklarasikan key yang dipakai diback end nya.ini adalah fitur dari js modern bernama : Shorthand Property Names
            // yaitu bila nama key dan nama param sama maka boleh disingkat menjadi hanya menyebutkan salah satunya saja.
            // dibawah ini sama saja dengan mendeklarasikan 
            // body: JSON.stringify({ 
            //      nama: nama,     <= 'nama' sebelah kiri adalah KEY, 'nama' sebelah kanan adalah PARAMETER
            //      alamat: alamat, 
            //      rank: rank 
            // })

            body: JSON.stringify({ nama, alamat, rank })
        });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil ditambahkan!');
            formTambah.reset();    // reset form tambah
            loadData();            // refresh tabel
        } else {
            alert('Gagal: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambah data.');
    }
}

// ============================================================
// 8. FUNGSI UNTUK UPDATE (EDIT) DATA
// ============================================================

// Mengirim data yang telah diubah ke server dengan method PUT
async function updateData(id: string, nama: string, alamat: string, rank: string) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, alamat, rank })
        });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil diupdate!');
            closeEditModal();      // tutup modal
            loadData();            // refresh tabel
        } else {
            alert('Gagal: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengupdate data.');
    }
}

// ============================================================
// 9. FUNGSI UNTUK DELETE (HAPUS) DATA
// ============================================================

// Menghapus data berdasarkan ID dengan method DELETE
async function deleteData(id: string) {
    if (!confirm('Yakin ingin menghapus data ini?')) return; // konfirmasi
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil dihapus!');
            loadData();            // refresh tabel
        } else {
            alert('Gagal: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus data.');
    }
}

// ============================================================
// 10. EVENT LISTENER UNTUK FORM TAMBAH
// ============================================================

// Saat form tambah disubmit, ambil nilai, validasi, lalu panggil createData
formTambah.addEventListener('submit', (e) => {
    e.preventDefault(); // cegah reload halaman
    // trim fungsi untuk menghapus spasi diawal dan diakhir
    const nama = namaTambah.value.trim();
    const alamat = alamatTambah.value.trim();
    const rank = rankTambah.value.trim();
    // !nama =
    // false
    // 0
    // ""
    // null
    // undefined
    // NaN
    if (!nama || !alamat || !rank) {
        alert('Semua field harus diisi!');
        return;
    }
    createData(nama, alamat, rank);
});

// ============================================================
// 11. EVENT LISTENER UNTUK FORM EDIT
// ============================================================

// Saat form edit disubmit, ambil nilai, validasi, lalu panggil updateData
formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = editNama.value.trim();
    const alamat = editAlamat.value.trim();
    const rank = editRank.value.trim();
    if (!nama || !alamat || !rank) {
        alert('Semua field harus diisi!');
        return;
    }
    if (currentEditId === null) {
        alert('ID tidak ditemukan.');
        return;
    }
    updateData(currentEditId, nama, alamat, rank);
});

// ============================================================
// 12. MEMUAT DATA SAAT HALAMAN PERTAMA KALI DIBUKA
// ============================================================

// Ketika DOM sudah siap, jalankan loadData() untuk menampilkan data awal
document.addEventListener('DOMContentLoaded', loadData);

// ============================================================
// 13. EKSPOR KOSONG (AGAR FILE DIANGGAP MODULE)
// ============================================================

// Tanpa export/import, TypeScript dapat memperlakukan file tersebut sebagai script global.
// Karena kita menggunakan TypeScript dan mungkin ingin menghindari error global,
// kita export {} agar file ini diperlakukan sebagai modul.
export { };