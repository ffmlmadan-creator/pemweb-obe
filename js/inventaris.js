const inventaris = [
{ id: 1, nama: 'AC Split Daikin 2 PK', kategori: 'Elektronik', jumlah: 6, kondisi: 'Baik', lokasi: 'Gedung Kuliah Bersama' },
{ id: 2, nama: 'Proyektor LCD Epson', kategori: 'Elektronik', jumlah: 4, kondisi: 'Perlu Cek', lokasi: 'Gedung SBSN' },
{ id: 3, nama: 'PC Desktop Lab Komputer', kategori: 'Komputer', jumlah: 25, kondisi: 'Baik', lokasi: 'Gedung Fakultas Teknik' },
{ id: 4, nama: 'Router Wi-Fi MikroTik', kategori: 'Jaringan', jumlah: 5, kondisi: 'Baik', lokasi: 'Gedung UPT TIK' },
{ id: 5, nama: 'Kursi Kuliah Lipat', kategori: 'Furnitur', jumlah: 40, kondisi: 'Perlu Cek', lokasi: 'Gedung Kuliah Bersama' },
{ id: 6, nama: 'Lampu LED Koridor 18W', kategori: 'Kelistrikan', jumlah: 12, kondisi: 'Perlu Cek', lokasi: 'Gedung Rektorat' },
{ id: 7, nama: 'Switch Hub Cisco 24 Port', kategori: 'Jaringan', jumlah: 3, kondisi: 'Baik', lokasi: 'Gedung SBSN' },
{ id: 8, nama: 'Papan Tulis Whiteboard', kategori: 'Furnitur', jumlah: 8, kondisi: 'Baik', lokasi: 'Gedung Fakultas Teknik' },
{ id: 9, nama: 'Stopkontak Kabel Roll', kategori: 'Kelistrikan', jumlah: 15, kondisi: 'Baik', lokasi: 'Gedung Fakultas Teknik' },
{ id: 10, nama: 'Dispenser Air Galon', kategori: 'Sanitasi', jumlah: 2, kondisi: 'Perlu Cek', lokasi: 'Gedung Rektorat' }
];

const daftarAlatContainer = document.querySelector('#daftar-alat');
const tombolFilter = document.querySelectorAll('[data-filter]');
const inputCari = document.querySelector('#input-cari');
const selectLimit = document.querySelector('#pilih-limit');
const themeButton = document.querySelector('#theme-button');

let kondisiTerpilih = 'Semua';

function renderItems(items) {
daftarAlatContainer.replaceChildren();

if (items.length === 0) {
    const trKosong = document.createElement('tr');
    const tdKosong = document.createElement('td');
    tdKosong.colSpan = 7;
    tdKosong.style.textAlign = 'center';
    tdKosong.style.padding = '1.5rem';
    tdKosong.style.color = 'var(--color-muted)';
    tdKosong.textContent = 'Tidak ada fasilitas atau alat yang cocok dengan pencarian.';
    trKosong.append(tdKosong);
    daftarAlatContainer.append(trKosong);
    return;
}

items.forEach((item, index) => {
    const tr = document.createElement('tr');

    const tdNo = document.createElement('td');
    tdNo.textContent = index + 1;

    const tdNama = document.createElement('td');
    tdNama.style.fontWeight = '600';
    tdNama.textContent = item.nama;

    const tdKategori = document.createElement('td');
    tdKategori.textContent = item.kategori;

    const tdLokasi = document.createElement('td');
    tdLokasi.textContent = item.lokasi;

    const tdKondisi = document.createElement('td');
    const spanBadge = document.createElement('span');
    spanBadge.className = item.kondisi === 'Baik' ? 'badge badge-baik' : 'badge badge-cek';
    spanBadge.textContent = item.kondisi;
    tdKondisi.append(spanBadge);

    const tdJumlah = document.createElement('td');
    tdJumlah.textContent = `${item.jumlah} Unit`;

    const tdAksi = document.createElement('td');
    tdAksi.style.textAlign = 'center';
    const btnDetail = document.createElement('button');
    btnDetail.type = 'button';
    btnDetail.className = 'btn btn-primary';
    btnDetail.style.padding = '0.35rem 0.75rem';
    btnDetail.style.fontSize = '0.8rem';
    btnDetail.dataset.action = 'detail';
    btnDetail.dataset.id = item.id;
    btnDetail.textContent = 'Detail';
    tdAksi.append(btnDetail);

    tr.append(tdNo, tdNama, tdKategori, tdLokasi, tdKondisi, tdJumlah, tdAksi);
    daftarAlatContainer.append(tr);
});
}

function perbaruiTampilan() {
const keyword = inputCari.value.toLowerCase().trim();
const limit = Number(selectLimit.value);

let hasil = inventaris;

if (kondisiTerpilih !== 'Semua') {
    hasil = hasil.filter(item => item.kondisi === kondisiTerpilih);
}

if (keyword !== '') {
    hasil = hasil.filter(item =>
    item.nama.toLowerCase().includes(keyword) ||
    item.lokasi.toLowerCase().includes(keyword) ||
    item.kategori.toLowerCase().includes(keyword)
    );
}

renderItems(hasil.slice(0, limit));
}

tombolFilter.forEach(button => {
button.addEventListener('click', () => {
    kondisiTerpilih = button.dataset.filter;
    perbaruiTampilan();
});
});

inputCari.addEventListener('input', () => {
perbaruiTampilan();
});

daftarAlatContainer.addEventListener('click', (event) => {
const tombol = event.target.closest('button[data-action="detail"]');
if (!tombol) return;

const idAlat = Number(tombol.dataset.id);
const dataAlat = inventaris.find(item => item.id === idAlat);

if (dataAlat) {
    alert(`[RINCIAN FASILITAS]\nNama: ${dataAlat.nama}\nKategori: ${dataAlat.kategori}\nLokasi: ${dataAlat.lokasi}\nKondisi: ${dataAlat.kondisi}\nJumlah: ${dataAlat.jumlah} Unit`);
}
});

const savedTheme = localStorage.getItem('siperka_theme') ?? 'light';
document.documentElement.dataset.theme = savedTheme;

themeButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem('siperka_theme', nextTheme);
});

const savedLimit = localStorage.getItem('siperka_item_limit') ?? '5';
selectLimit.value = savedLimit;

selectLimit.addEventListener('change', (event) => {
const limitBaru = event.target.value;
localStorage.setItem('siperka_item_limit', limitBaru);
perbaruiTampilan();
});

perbaruiTampilan();