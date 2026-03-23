// 1. Inisialisasi data dari LocalStorage atau array kosong
let transaksi = JSON.parse(localStorage.getItem('dataKeuangan')) || [];

// 2. Fungsi Utama untuk Memperbarui Tabel dan Saldo
function updateTampilan() {
    const tbody = document.getElementById('isi-tabel');
    const totalElement = document.getElementById('total-saldo');
    
    // Pastikan elemen ditemukan sebelum lanjut
    if (!tbody || !totalElement) return;

    // Bersihkan isi tabel lama
    tbody.innerHTML = '';
    let saldo = 0;

    // Loop data transaksi untuk dimasukkan ke tabel
    transaksi.forEach((item) => {
        const row = document.createElement('tr');
        
        let simbol = item.jenis === 'pemasukan' ? '+' : '-';
        let warna = item.jenis === 'pemasukan' ? '#28a745' : '#ea4335';
        
        row.innerHTML = `
            <td>${item.keterangan}</td>
            <td style="text-align: right; color: ${warna}; font-weight: bold;">
                ${simbol} Rp ${parseInt(item.nominal).toLocaleString('id-ID')}
            </td>
        `;
        
        tbody.appendChild(row);

        // Kalkulasi saldo
        if (item.jenis === 'pemasukan') {
            saldo += parseInt(item.nominal);
        } else {
            saldo -= parseInt(item.nominal);
        }
    });

    // Update teks saldo di layar
    totalElement.innerText = `Rp ${saldo.toLocaleString('id-ID')}`;
    
    // Simpan permanen ke browser
    localStorage.setItem('dataKeuangan', JSON.stringify(transaksi));
}

// 3. Fungsi Tambah Transaksi
function tambahTransaksi() {
    // Ambil elemen input berdasarkan ID di HTML
    const inputKet = document.getElementById('keterangan');
    const inputNom = document.getElementById('nominal');
    const inputJen = document.getElementById('jenis');

    // Ambil nilainya dan bersihkan spasi
    const ket = inputKet.value.trim();
    const nom = parseInt(inputNom.value);
    const jen = inputJen.value;

    // Validasi: Keterangan tidak boleh kosong, Nominal harus angka > 0
    if (ket === "" || isNaN(nom) || nom <= 0) {
        alert("Waduh, isi keterangan dan nominal dengan benar dulu ya!");
        return;
    }

    // Masukkan data baru ke dalam array
    transaksi.push({
        keterangan: ket,
        nominal: nom,
        jenis: jen
    });

    // Update UI dan simpan data
    updateTampilan();

    // Kosongkan kembali form input
    inputKet.value = '';
    inputNom.value = '';
}

// 4. Fungsi Hapus Semua Data
function hapusSemua() {
    if (confirm("Serius mau hapus semua riwayat keuangan?")) {
        transaksi = [];
        updateTampilan();
    }
}

// Jalankan updateTampilan saat halaman pertama kali dibuka
window.addEventListener('DOMContentLoaded', updateTampilan);
