// Mengambil data dari localStorage saat halaman dimuat
let transaksi = JSON.parse(localStorage.getItem('dataKeuangan')) || [];

// Fungsi untuk menampilkan data ke tabel
function updateTampilan() {
    const tbody = document.querySelector('table tbody');
    const totalElement = document.getElementById('total-saldo');
    
    // Bersihkan tabel
    tbody.innerHTML = '';
    let saldo = 0;

    // Susun ulang baris tabel
    transaksi.forEach((item) => {
        const row = document.createElement('tr');
        
        let warnaKelas = item.jenis === 'pemasukan' ? 'text-success' : 'text-danger';
        let simbol = item.jenis === 'pemasukan' ? '+' : '-';
        
        row.innerHTML = `
            <td>${item.keterangan}</td>
            <td style="color: ${item.jenis === 'pemasukan' ? '#28a745' : '#ea4335'}; font-weight: bold;">
                ${simbol} Rp ${parseInt(item.nominal).toLocaleString('id-ID')}
            </td>
        `;
        
        tbody.appendChild(row);

        // Hitung Saldo
        if (item.jenis === 'pemasukan') {
            saldo += parseInt(item.nominal);
        } else {
            saldo -= parseInt(item.nominal);
        }
    });

    // Update angka saldo di layar
    totalElement.innerText = `Rp ${saldo.toLocaleString('id-ID')}`;
    
    // Simpan ke memori browser
    localStorage.setItem('dataKeuangan', JSON.stringify(transaksi));
}

// Fungsi yang dipanggil tombol "Tambah Transaksi"
function tambahTransaksi() {
    const ket = document.getElementById('keterangan').value;
    const nom = document.getElementById('nominal').value;
    const jen = document.getElementById('jenis').value;

    // Validasi sederhana
    if (ket === "" || nom === "" || nom <= 0) {
        alert("Isi keterangan dan nominal dengan benar ya!");
        return;
    }

    // Tambah ke array
    transaksi.push({
        keterangan: ket,
        nominal: parseInt(nom),
        jenis: jen
    });

    // Perbarui layar
    updateTampilan();

    // Kosongkan form setelah input
    document.getElementById('keterangan').value = '';
    document.getElementById('nominal').value = '';
}

// Fungsi yang dipanggil tombol "Hapus Semua"
function hapusSemua() {
    if (confirm("Yakin mau hapus semua catatan?")) {
        transaksi = [];
        updateTampilan();
    }
}

// Jalankan fungsi update saat halaman pertama kali dibuka
window.onload = updateTampilan;
