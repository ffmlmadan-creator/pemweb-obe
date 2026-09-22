import {
hitungStatistikLaporan,
filterLaporanByUrgensi,
cariLaporanById,
formatRingkasanLaporan
} from './laporan-service.js';

const daftarLaporanKerusakan = [
{
    id: 101,
    namaPelapor: 'Rizki Ramadhan',
    npm: '2440302001',
    kategoriFasilitas: 'jaringan',
    tingkatUrgensi: 'tinggi',
    lokasiGedung: 'Gedung SBSN, Lab Komputer 1',
    tanggalDitemukan: '2026-09-18',
    status: 'Dalam Perbaikan'
},
{
    id: 102,
    namaPelapor: 'Ahmad Fauzi',
    npm: '2440302015',
    kategoriFasilitas: 'elektronik',
    tingkatUrgensi: 'sedang',
    lokasiGedung: 'Gedung Rektorat Lt 2',
    tanggalDitemukan: '2026-09-19',
    status: 'Menunggu Verifikasi'
},
{
    id: 103,
    namaPelapor: 'Nurul Hidayah',
    npm: '2440302022',
    kategoriFasilitas: 'sanitasi',
    tingkatUrgensi: 'rendah',
    lokasiGedung: 'Gedung Dekanat FT',
    tanggalDitemukan: '2026-09-20',
    status: 'Selesai'
},
{
    id: 104,
    namaPelapor: 'Budi Santoso',
    npm: '2440302030',
    kategoriFasilitas: 'kelistrikan',
    tingkatUrgensi: 'tinggi',
    lokasiGedung: 'Lab Teknik Komputer',
    tanggalDitemukan: '2026-09-21',
    status: 'Dalam Perbaikan'
}
];

console.log('=== SEMUA DATA LAPORAN KERUSAKAN SIPERKA ===');
console.table(daftarLaporanKerusakan);

try {
const statistik = hitungStatistikLaporan(daftarLaporanKerusakan);
console.log('=== STATISTIK PENANGANAN KERUSAKAN ===');
console.table(statistik);

const laporanDarurat = filterLaporanByUrgensi(daftarLaporanKerusakan, 'tinggi');
console.log('=== LAPORAN PRIORITAS TINGGI / TANGGAP DARURAT ===');
console.table(laporanDarurat);

const cariTiket = cariLaporanById(daftarLaporanKerusakan, 999);
console.log('=== PENCARIAN TIKET #101 ===');
console.log(cariTiket);

const ringkasanTeks = daftarLaporanKerusakan.map(formatRingkasanLaporan);
console.log('=== DAFTAR RINGKASAN TIKET ADUAN ===');
ringkasanTeks.forEach(teks => console.log(teks));

} catch (error) {
console.error('Terjadi kesalahan saat memproses data:', error.message);
}