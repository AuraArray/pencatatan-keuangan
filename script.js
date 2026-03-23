// 1. Ambil data dari LocalStorage
let transaksi = JSON.parse(localStorage.getItem('dataKeuangan')) || [];

// 2. Fungsi untuk menampilkan data ke tabel (Update UI)
function updateTampilan() {
    const tbody = document.querySelector('#tabel-riwayat tbody');
    const totalElement = document.getElementById('total-saldo');
    
    // Validasi apakah elemen ada di HTML
    if (!tbody || !totalElement) return;

    // Bersihkan tabel sebelum diisi ulang
    tbody.innerHTML = '';
    let saldo = 0;

    // Mapping data transaksi ke baris tabel
    transaksi.forEach((item) => {
        const row = document.createElement('tr');
        
        let simbol = item.jenis === 'pemasukan' ? '+' : '-';
        let warna = item.jenis === 'pemasukan' ? '#28a745' : '#ea4335';
        
        // Isi kolom tabel
        row.innerHTML = `
            <td>${item.keterangan}</td>
            <td style="text-align: right; color: ${warna}; font-weight: bold;">
                ${simbol} Rp ${parseInt(item.nominal).toLocaleString('id-ID')}
            </td>
        `;
        
        tbody.appendChild(row);

        // Hitung total saldo
        if (item.jenis === 'pemasukan') {
            saldo += parseInt(item.nominal);
        } else {
            saldo -= parseInt(item.nominal);
        }
    });

    // Tampilkan total saldo
    totalElement.innerText = `Rp ${saldo.toLocaleString('id-ID')}`;
    
    // Simpan data terbaru ke LocalStorage
    localStorage.setItem('dataKeuangan', JSON.stringify(transaksi));
}

// 3. Fungsi Tambah Transaksi (Dipanggil tombol)
function tambahTransaksi() {
    // Ambil elemen input
    const inputKet = document.getElementById('keterangan');
    const inputNom = document.getElementById('nominal');
    const inputJen = document.getElementById('jenis');

    // Ambil nilainya
    const ket = inputKet.value.trim();
    const nom = parseInt(inputNom.value);
    const jen = inputJen.value;

    // Validasi sederhana
    if (ket === "" || isNaN(nom) || nom <= 0) {
        alert("Harap isi keterangan dan nominal dengan benar!");
        return;
    }

    // Masukkan ke array transaksi
    transaksi.push({
        keterangan: ket,
        nominal: nom,
        jenis: jen
    });

    // Update tampilan tabel
    updateTampilan();

    // Reset form input agar kosong kembali
    inputKet.value = '';
    inputNom.value = '';
}

// 4. Fungsi Hapus Semua
function hapusSemua() {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat?")) {
        transaksi = [];
        updateTampilan();
    }
}

// Jalankan fungsi saat halaman selesai dimuat
window.onload = updateTampilan;
