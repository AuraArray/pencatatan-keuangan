// 1. Inisialisasi data dari LocalStorage atau array kosong jika belum ada data
let transaksi = JSON.parse(localStorage.getItem('dataKeuangan')) || [];

// 2. Fungsi untuk memperbarui tampilan tabel dan saldo
function updateTampilan() {
    const tbody = document.querySelector('#tabel-transaksi tbody');
    const totalElement = document.getElementById('total-saldo');
    
    // Kosongkan tabel sebelum diisi ulang
    tbody.innerHTML = '';
    let saldo = 0;

    // Iterasi setiap data transaksi
    transaksi.forEach((item, index) => {
        const row = tbody.insertRow();
        
        // Buat kolom Keterangan
        const cellKet = row.insertCell(0);
        cellKet.innerText = item.keterangan;
        
        // Buat kolom Nominal
        const cellNom = row.insertCell(1);
        
        // Logika perhitungan saldo dan pewarnaan teks
        if (item.jenis === 'pemasukan') {
            cellNom.innerText = `+ Rp ${item.nominal.toLocaleString('id-ID')}`;
            cellNom.style.color = '#28a745'; // Hijau
            saldo += item.nominal;
        } else {
            cellNom.innerText = `- Rp ${item.nominal.toLocaleString('id-ID')}`;
            cellNom.style.color = '#dc3545'; // Merah
            saldo -= item.nominal;
        }
    });

    // Update total saldo di layar
    totalElement.innerText = `Rp ${saldo.toLocaleString('id-ID')}`;
    
    // Simpan data terbaru ke LocalStorage
    localStorage.setItem('dataKeuangan', JSON.stringify(transaksi));
}

// 3. Fungsi untuk menambah transaksi baru
function tambahTransaksi() {
    const ketInput = document.getElementById('keterangan');
    const nomInput = document.getElementById('nominal');
    const jenInput = document.getElementById('jenis');

    const ket = ketInput.value;
    const nom = parseInt(nomInput.value);
    const jen = jenInput.value;

    // Validasi input
    if (ket.trim() === '' || isNaN(nom) || nom <= 0) {
        alert("Harap masukkan keterangan dan nominal yang valid!");
        return;
    }

    // Masukkan data ke array
    transaksi.push({
        keterangan: ket,
        nominal: nom,
        jenis: jen
    });

    // Perbarui UI
    updateTampilan();

    // Reset form input
    ketInput.value = '';
    nomInput.value = '';
}

// 4. Fungsi untuk menghapus semua data
function hapusSemua() {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat transaksi?")) {
        transaksi = [];
        updateTampilan();
    }
}

// Panggil fungsi tampilan saat halaman pertama kali dimuat
document.addEventListener('DOMContentLoaded', updateTampilan);
