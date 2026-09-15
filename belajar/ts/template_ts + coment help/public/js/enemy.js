const API_URL = 'http://localhost:3000/api/enemy';
const formTambah = document.getElementById('formTambah');
const namaTambah = document.getElementById('namaTambah');
const difTambah = document.getElementById('difTambah');
const healthTambah = document.getElementById('healthTambah');
const tbody = document.getElementById('tbodyEnemy');
const modalOverlay = document.getElementById('modalEdit');
const formEdit = document.getElementById('formEdit');
const editNama = document.getElementById('editNama');
const editDif = document.getElementById('editDif');
const editHealth = document.getElementById('editHealth');
const modalClose = document.getElementById('modalClose');
const btnCancelEdit = document.getElementById('btnCancelEdit');
let currentEditId = null;
function openEditModal(id, nama, dif, health) {
    currentEditId = id;
    editNama.value = nama;
    editDif.value = dif;
    editHealth.value = health;
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
            <td>${item.dif}</td>
            <td>${item.health}</td>
            <td>
              <button class="action-btn edit-btn" data-id="${item.id}" data-nama="${item.nama}" data-dif="${item.dif}" data-health="${item.health}">Edit</button>
              <button class="action-btn delete-btn" data-id="${item.id}">Hapus</button>
            </td>
          </tr>
        `;
    });
    tbody.innerHTML = html;
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn;
            openEditModal(target.dataset.id, target.dataset.nama, target.dataset.dif, target.dataset.health);
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn;
            deleteData(target.dataset.id);
        });
    });
}
async function createData(nama, dif, health) {
    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, dif, health: parseInt(health) })
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
async function updateData(id, nama, dif, health) {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nama, dif, health: parseInt(health) })
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
    const dif = difTambah.value.trim();
    const health = healthTambah.value.trim();
    if (!nama || !dif || !health) {
        alert('Semua field harus diisi!');
        return;
    }
    createData(nama, dif, health);
});
formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = editNama.value.trim();
    const dif = editDif.value.trim();
    const health = editHealth.value.trim();
    if (!nama || !dif || !health) {
        alert('Semua field harus diisi!');
        return;
    }
    if (currentEditId === null) {
        alert('ID tidak ditemukan.');
        return;
    }
    updateData(currentEditId, nama, dif, health);
});
document.addEventListener('DOMContentLoaded', loadData);
export {};
