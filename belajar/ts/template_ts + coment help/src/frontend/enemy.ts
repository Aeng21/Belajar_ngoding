const API_URL = 'http://localhost:3000/api/enemy';

const formTambah = document.getElementById('formTambah') as HTMLFormElement;
const namaTambah = document.getElementById('namaTambah') as HTMLInputElement;
const difTambah = document.getElementById('difTambah') as HTMLInputElement;
const healthTambah = document.getElementById('healthTambah') as HTMLInputElement;
const tbody = document.getElementById('tbodyEnemy') as HTMLTableSectionElement;

const modalOverlay = document.getElementById('modalEdit') as HTMLDivElement;
const formEdit = document.getElementById('formEdit') as HTMLFormElement;
const editNama = document.getElementById('editNama') as HTMLInputElement;
const editDif = document.getElementById('editDif') as HTMLInputElement;
const editHealth = document.getElementById('editHealth') as HTMLInputElement;
const modalClose = document.getElementById('modalClose') as HTMLSpanElement;
const btnCancelEdit = document.getElementById('btnCancelEdit') as HTMLButtonElement;

let currentEditId: string | null = null;

function openEditModal(id: string, nama: string, dif: string, health: string) {
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
    if (e.target === modalOverlay) closeEditModal();
});

async function loadData() {
    try {
        const res = await fetch(API_URL);
        const result = await res.json();
        if (result.success) renderData(result.data);
        else alert('Gagal memuat data: ' + result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat memuat data.');
    }
}

function renderData(data: any[]) {
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
            const target = btn as HTMLButtonElement;
            openEditModal(target.dataset.id!, target.dataset.nama!, target.dataset.dif!, target.dataset.health!);
        });
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn as HTMLButtonElement;
            deleteData(target.dataset.id!);
        });
    });
}

async function createData(nama: string, dif: string, health: string) {
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
        } else {
            alert('Gagal: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat menambah data.');
    }
}

async function updateData(id: string, nama: string, dif: string, health: string) {
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
        } else {
            alert('Gagal: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengupdate data.');
    }
}

async function deleteData(id: string) {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    try {
        const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
            alert('Data berhasil dihapus!');
            loadData();
        } else {
            alert('Gagal: ' + result.message);
        }
    } catch (error) {
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

export { };
