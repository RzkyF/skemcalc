//input range 
const jumlahPenggunaan = document.getElementById("jumlahPenggunaan");
const spanDays = jumlahPenggunaan.parentElement.querySelector("span");

jumlahPenggunaan.addEventListener("input", () => {
  spanDays.textContent = `${jumlahPenggunaan.value} hari`;
});

//perhitungan
       document.getElementById('btnHitung').addEventListener('click', function() {
            const DayaMemasak = parseFloat(document.getElementById('DayaMemasak').value) || 0;
            const DayaMenghangatkan = parseFloat(document.getElementById('DayaMenghangatkan').value) || 0;
            const SiklusMemasak = parseFloat(document.getElementById('SiklusMemasak').value) || 0;
            const SiklusMenghangatkan = parseFloat(document.getElementById('SiklusMenghangatkan').value) || 0;
            const jumlahPenggunaan = parseFloat(document.getElementById('jumlahPenggunaan').value) || 0;
            const kwhPenanakNasi = (DayaMemasak * SiklusMemasak + DayaMenghangatkan * SiklusMenghangatkan * jumlahPenggunaan) / 1000;

        if (DayaMemasak, DayaMemasak, SiklusMemasak, SiklusMenghangatkan, jumlahPenggunaan <= 0) {
            const hasilHitung = document.getElementById('hasilHitung');
            hasilHitung.innerHTML = `Input daya tidak boleh 0`;
            hasilHitung.style.display = 'block';

        } else {
            const hasilHitung = document.getElementById('hasilHitung');
            hasilHitung.innerHTML = kwhPenanakNasi;
            hasilHitung.style.display = 'block';
        }
    
    });