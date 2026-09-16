import { ringkasInventaris } from './utils.js';

const inventaris = [
    { id: 1, nama: 'Router MikroTik RB951', kategori: 'Jaringan', jumlah: 5, kondisi: 'Baik' },
    { id: 2, nama: 'Switch Cisco 24 Port', kategori: 'Jaringan', jumlah: 3, kondisi: 'Perlu Cek' },
    { id: 3, nama: 'Proyektor Epson EB-X400', kategori: 'Elektronik', jumlah: 8, kondisi: 'Baik' },
    { id: 4, nama: 'Multimeter Digital', kategori: 'Elektronika', jumlah: 12, kondisi: 'Baik' },
    { id: 5, nama: 'Kabel UTP Roll Cat6', kategori: 'Jaringan', jumlah: 4, kondisi: 'Perlu Cek' }
];

const alatBaik = inventaris.filter(item => item.kondisi === 'Baik');
const namaAlat = inventaris.map(({ nama }) => nama);
const totalUnit = inventaris.reduce((total, item) => total + item.jumlah, 0);

console.table(alatBaik);
console.log(namaAlat);
console.log('Total Unit:', totalUnit);

try {
    const statistik = ringkasInventaris(inventaris);
    console.log('Statistik Inventaris:', statistik);
    } catch (error) {
    console.error(error.message);
}