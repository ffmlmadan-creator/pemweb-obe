export function validasiDataLaporan(data) {
if (!Array.isArray(data)) {
    throw new TypeError('Data laporan harus berupa array.');
}
if (data.length === 0) {
    throw new Error('Data laporan tidak boleh kosong.');
}
}

export function hitungStatistikLaporan(data) {
validasiDataLaporan(data);

return {
    totalLaporan: data.length,
    urgensiTinggi: data.filter(item => item.tingkatUrgensi === 'tinggi').length,
    selesai: data.filter(item => item.status === 'Selesai').length,
    dalamProses: data.filter(item => item.status !== 'Selesai').length
};
}

export function filterLaporanByUrgensi(data, urgensi) {
validasiDataLaporan(data);
return data.filter(item => item.tingkatUrgensi.toLowerCase() === urgensi.toLowerCase());
}

export function cariLaporanById(data, id) {
validasiDataLaporan(data);
const hasil = data.find(item => item.id === id);
if (!hasil) {
    throw new Error(`Laporan dengan ID ${id} tidak ditemukan.`);
}
return hasil;
}

export function formatRingkasanLaporan({ id, lokasiGedung, kategoriFasilitas, tingkatUrgensi, status }) {
return `[Tiket #${id}] Lokasi: ${lokasiGedung} | Kategori: ${kategoriFasilitas} | Urgensi: ${tingkatUrgensi.toUpperCase()} | Status: ${status}`;
}