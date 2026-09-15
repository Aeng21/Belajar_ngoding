const API_URL = 'http://localhost:3000/api/player';
const formTambah = document.getElementById('formTambah');
const namaTambah = document.getElementById('namaTambah');
const alamatTambah = document.getElementById('alamatTambah');
const rankTambah = document.getElementById('rankTambah');
const tbody = document.getElementById('tbodyPlayer');
const modalOverlay = document.getElementById('modalEdit');
const formEdit = document.getElementById('formEdit');
const editNama = document.getElementById('editNama');
const editAlamat = document.getElementById('editAlamat');
const editRank = document.getElementById('editRank');
const modalClose = document.getElementById('modalClose');
const btnCancelEdit = document.getElementById('btnCancelEdit');
let currentEditId = null;
function openEditModal(id, nama, alamat, rank) {
    currentEditId = id;
    editNama.value = nama;
    editAlamat.value = alamat;
    editRank.value = rank;
    modalOverlay.classList.add('active');
}
function closeEditModal() {
    modalOverlay.classList.remove('active');
    currentEditId = null;
    formEdit.reset();
}
modalClose.addEventListener('click', closeEditModal);
btnCancelEdit.addEventListener('click', closeEditModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay)
        closeEditModal();
});
async function loadData() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        if (result.success)
            renderData(result.data);
        else
            alert('Gagal memuat data: ' + result.message);
    }
    catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memuat data.');
    }
}
function renderData(data) {
    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Belum ada data</td></tr>`;
        return;
    }
    let html = '';
    data.forEach(item => {
        html += `
          <tr>
            <td>${item.id}</td>
            <td>${item.nama}</td>
            <td>${item.alamat}</td>
            <td>${item.rank}</td>
            <td>
              <button class="action-btn edit-btn" data-id="${item.id}" data-nama="${item.nama}" data-alamat="${item.alamat}" data-rank="${item.rank}">Edit</button>
              <button class="action-btn delete-btn" data-id="${item.id}">Hapus</button>
            </td>
          </tr>
        `;
    });
    tbody.innerHTML = html;
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn;
            openEditModal(target.dataset.id, target.dataset.nama, target.dataset.alamat, target.dataset.rank);
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn;
            deleteData(target.dataset.id);
        });
    });
}
async function createData(nama, alamat, rank) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, alamat, rank })
        });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil ditambahkan!');
            formTambah.reset();
            loadData();
        }
        else {
            alert('Gagal: ' + result.message);
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambah data.');
    }
}
async function updateData(id, nama, alamat, rank) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, alamat, rank })
        });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil diupdate!');
            closeEditModal();
            loadData();
        }
        else {
            alert('Gagal: ' + result.message);
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengupdate data.');
    }
}
async function deleteData(id) {
    if (!confirm('Yakin ingin menghapus data ini?'))
        return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil dihapus!');
            loadData();
        }
        else {
            alert('Gagal: ' + result.message);
        }
    }
    catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menghapus data.');
    }
}
formTambah.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = namaTambah.value.trim();
    const alamat = alamatTambah.value.trim();
    const rank = rankTambah.value.trim();
    if (!nama || !alamat || !rank) {
        alert('Semua field harus diisi!');
        return;
    }
    createData(nama, alamat, rank);
});
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
document.addEventListener('DOMContentLoaded', loadData);
export {};
