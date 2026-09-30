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
const formLapor = document.querySelector('#lapor-form');
const statusForm = document.querySelector('#form-status');
const previewData = document.querySelector('#preview-data');
const previewList = document.querySelector('#preview-list');

const kategoriValid = ['kelistrikan', 'elektronik', 'furnitur', 'sanitasi', 'jaringan'];

function validateForm(data) {
    const errors = {};
    
    const nama = String(data.get('nama_pelapor') || '').trim();
    const kategori = String(data.get('kategori_fasilitas') || '').trim();
    const jumlah = Number(data.get('jumlah_fasilitas'));
    const tanggal = String(data.get('tanggal_ditemukan') || '').trim();
    
    if (!nama) {
        errors.nama_pelapor = 'Nama pelapor wajib diisi.';
    } else if (nama.length < 3) {
        errors.nama_pelapor = 'Nama pelapor minimal 3 karakter.';
    }

    if (!kategori) {
        errors.kategori_fasilitas = 'Kategori kerusakan wajib dipilih.';
    } else if (!kategoriValid.includes(kategori)) {
        errors.kategori_fasilitas = 'Kategori yang dipilih tidak valid dari sistem.';
    }

    if (!data.get('jumlah_fasilitas')) {
        errors.jumlah_fasilitas = 'Jumlah fasilitas rusak wajib diisi.';
    } else if (!Number.isInteger(jumlah) || jumlah < 1) {
        errors.jumlah_fasilitas = 'Jumlah harus berupa bilangan bulat minimal 1.';
    }

    if (!tanggal) {
        errors.tanggal_ditemukan = 'Tanggal ditemukan wajib diisi.';
    } else {
        const tglInput = new Date(tanggal);
        const tglHariIni = new Date();
        tglHariIni.setHours(0, 0, 0, 0);
        if (tglInput > tglHariIni) {
            errors.tanggal_ditemukan = 'Tanggal pelaporan tidak boleh melebihi hari ini.';
        }
    }

    return errors;
}

if (formLapor) {
    formLapor.addEventListener('submit', event => {
        event.preventDefault();
        
        const data = new FormData(formLapor);
        const errors = validateForm(data);

        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        formLapor.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
        previewData.style.display = 'none';

        if (Object.keys(errors).length > 0) {
            for (const [field, message] of Object.entries(errors)) {
                const errorSpan = document.querySelector(`#error-${field}`);
                if (errorSpan) errorSpan.textContent = message;
                
                const inputEl = formLapor.elements[field];
                if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
            }
            
            const firstErrorField = Object.keys(errors)[0];
            formLapor.elements[firstErrorField]?.focus();
            
            statusForm.style.color = 'var(--color-primary)';
            statusForm.textContent = ' Laporan gagal diproses. Periksa kembali data yang berwarna merah.';
        } else {
            statusForm.style.color = '#15803d';
            statusForm.textContent = ' Data valid! Berikut pratinjau data (Belum dikirim ke server).';
            
            previewList.innerHTML = '';
            for (const [key, value] of data.entries()) {
                if(key === 'bukti_kerusakan' || value === '') continue; 
                
                const label = key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                const li = document.createElement('li');
                li.innerHTML = `<strong>${label}:</strong> ${value}`;
                previewList.appendChild(li);
            }
            previewData.style.display = 'block';
        }
    });
}