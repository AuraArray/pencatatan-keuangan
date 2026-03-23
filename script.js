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

    // Urutkan transaksi (opsional: yang terbaru di atas)
    const dataTerbalik = [...transaksi].reverse();

    // Loop data transaksi untuk dimasukkan ke tabel
    dataTerbalik.forEach((item) => {
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
    const inputKet = document.getElementById('keterangan');
    const inputNom = document.getElementById('nominal');
    const inputJen = document.getElementById('jenis');

    const ket = inputKet.value.trim();
    const nom = parseInt(inputNom.value);
    const jen = inputJen.value;

    // Validasi input
    if (ket === "" || isNaN(nom) || nom <= 0) {
        alert("Harap isi keterangan dan nominal dengan benar!");
        return;
    }

    // Masukkan data baru
    transaksi.push({
        keterangan: ket,
        nominal: nom,
        jenis: jen,
        tanggal: new Date().toLocaleDateString('id-ID') // Menambah data tanggal otomatis
    });

    updateTampilan();

    // Kosongkan form
    inputKet.value = '';
    inputNom.value = '';
    inputKet.focus(); // Fokus kembali ke input keterangan
}

// 4. Fungsi Cetak Laporan (PDF)
function cetakLaporan() {
    if (transaksi.length === 0) {
        alert("Tidak ada data yang bisa dicetak!");
        return;
    }
    window.print();
}

// 5. Fungsi Hapus Semua Data
function hapusSemua() {
    if (confirm("Apakah Anda yakin ingin menghapus seluruh riwayat transaksi?")) {
        transaksi = [];
        updateTampilan();
    }
}

// Jalankan fungsi saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', updateTampilan);
