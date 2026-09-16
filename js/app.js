import { ringkasInventaris, cariAlatById, formatRingkasanAlat } from './utils.js';

const inventaris = [
    { id: 1, nama: 'Router MikroTik RB951', kategori: 'Jaringan', jumlah: 5, kondisi: 'Baik', lokasi: 'Lab Jaringan' },
    { id: 2, nama: 'Switch Cisco 24 Port', kategori: 'Jaringan', jumlah: 3, kondisi: 'Perlu Cek', lokasi: 'Ruang Server' },
    { id: 3, nama: 'Proyektor Epson EB-X400', kategori: 'Elektronik', jumlah: 8, kondisi: 'Baik', lokasi: 'Lab Komputer 1' },
    { id: 4, nama: 'Multimeter Digital', kategori: 'Elektronika', jumlah: 12, kondisi: 'Baik', lokasi: 'Lab Elektronika' },
    { id: 5, nama: 'Kabel UTP Roll Cat6', kategori: 'Jaringan', jumlah: 4, kondisi: 'Perlu Cek', lokasi: 'Lab Jaringan' }
];

const alatBaik = inventaris.filter(item => item.kondisi === 'Baik');
const namaAlat = inventaris.map(({ nama }) => nama);
const totalUnit = inventaris.reduce((total, item) => total + item.jumlah, 0);

const alatDiLabJaringan = inventaris.filter(item => item.lokasi === 'Lab Jaringan');
const alatDicari = cariAlatById(inventaris, 3);

const daftarRingkasan = inventaris.map(formatRingkasanAlat);

console.table(alatBaik);
console.log(namaAlat);
console.log('Total Unit:', totalUnit);

console.log('=== HASIL FILTER LOKASI (Lab Jaringan) ===');
console.table(alatDiLabJaringan);

console.log('=== HASIL CARI BERDASARKAN ID (ID: 3) ===');
console.log(alatDicari);

console.log('=== RINGKASAN SETIAP ALAT (DESTRUCTURING + TEMPLATE LITERAL) ===');
daftarRingkasan.forEach(teks => console.log(teks));

try {
    const statistik = ringkasInventaris(inventaris);
    console.log('Statistik Inventaris:', statistik);
    } catch (error) {
    console.error(error.message);
}