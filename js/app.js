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

console.log('=== DATA LAPORAN KERUSAKAN SIPERKA ===');
console.table(daftarLaporanKerusakan);

try {
  const statistik = hitungStatistikLaporan(daftarLaporanKerusakan);
  console.log('=== STATISTIK PENANGANAN ===');
  console.table(statistik);

  const laporanDarurat = filterLaporanByUrgensi(daftarLaporanKerusakan, 'tinggi');
  console.log('=== LAPORAN URGENSI TINGGI ===');
  console.table(laporanDarurat);

  const tiket = cariLaporanById(daftarLaporanKerusakan, 101);
  console.log('=== TIKET #101 ===', tiket);
} catch (error) {
  console.error('Terjadi kesalahan:', error.message);
}

const themeButton = document.querySelector('#theme-button');

if (themeButton) {
  const savedTheme = localStorage.getItem('siperka_theme') ?? 'light';
  document.documentElement.dataset.theme = savedTheme;

  themeButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('siperka_theme', nextTheme);
  });
}

