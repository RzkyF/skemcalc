// daftar kategori dan field-nya
const kategoriList = {
  kipas: [
    { id: "daya", label: "Daya Kipas (W)", type: "number", satuan: "W" },
    { id: "jampenggunaan", label: "Waktu Penggunaan", type: "number", satuan: "W" },
    { id: "pemakaian", label: "Pemakaian (tahun)", type: "range", min: 1, max: 10, value: 1 },
  ],
  penanaknasi: [
    { id: "dayaMemasak", label: "Daya Memasak (Wh)", type: "number", satuan: "Wh" },
    { id: "dayaMenghangatkan", label: "Daya Menghangatkan (Wh/jam)", type: "number", satuan: "Wh/jam" },
    { id: "siklusMemasak", label: "Siklus Memasak per Hari", type: "number" },
    { id: "jamMenghangatkan", label: "Jam Menghangatkan per Hari", type: "number" },
    { id: "pemakaian", label: "Pemakaian (tahun)", type: "range", min: 1, max: 10, value: 1 },
  ],
};

// container input
const inputContainer = document.getElementById("inputContainer");
const hasilEl = document.getElementById("hasilHitung");
let kategoriDipilih = null;

// render input sesuai kategori
function renderInput(kategori) {
  inputContainer.innerHTML = "";
  const fields = kategoriList[kategori];
  if (!fields) {
    console.error("Kategori tidak ditemukan:", kategori);
    return;
  }

  fields.forEach(f => {
    const div = document.createElement("div");
    div.className = "mb-4";

    let html = `<label class="block text-sm font-bold text-gray-700 mb-2">${f.label}</label>`;

    if (f.type === "range") {
      html += `
        <input type="range" id="${f.id}" min="${f.min}" max="${f.max}" value="${f.value}"
          class="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer">
        <span class="text-sm text-gray-500">${f.value} Tahun</span>`;
    } else {
      html += `
        <div class="relative">
          <input type="${f.type}" id="${f.id}" class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg"
            value="${f.value || ""}">
          ${f.satuan ? `<span class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">${f.satuan}</span>` : ""}
        </div>`;
    }

    div.innerHTML = html;
    inputContainer.appendChild(div);

    if (f.type === "range") {
      const rangeInput = div.querySelector("input[type=range]");
      const span = div.querySelector("span");
      rangeInput.addEventListener("input", () => {
        span.textContent = `${rangeInput.value} Tahun`;
      });
    }
  });
}

// tombol kategori + logika highlight
const buttons = document.querySelectorAll("button[data-cat]");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    kategoriDipilih = btn.dataset.cat.toLowerCase();
    renderInput(kategoriDipilih);
    hasilEl.textContent = "";
    hasilEl.style.display = "none";

    // reset semua tombol ke abu-abu
    buttons.forEach(b => {
      b.classList.remove("border-primary-200", "text-primary");
      b.classList.add("border-gray-200", "text-gray-500");
    });

    // ubah tombol aktif jadi primary
    btn.classList.remove("border-gray-200", "text-gray-500");
    btn.classList.add("border-primary-200", "text-primary");
  });
});

// render default saat halaman dibuka
window.addEventListener("DOMContentLoaded", () => {
  kategoriDipilih = "kipas";
  renderInput(kategoriDipilih);

  const defaultBtn = document.querySelector('button[data-cat="kipas"]');
  if (defaultBtn) {
    defaultBtn.classList.remove("border-gray-200", "text-gray-500");
    defaultBtn.classList.add("border-primary-200", "text-primary");
  }
});

// tombol hitung
document.getElementById("btnHitung").addEventListener("click", () => {
  if (!kategoriDipilih) {
    alert("Pilih kategori dulu!");
    return;
  }

  if (kategoriDipilih === "kipas") {
    const daya = parseFloat(document.getElementById("daya").value) || 0;
    const tahun = parseFloat(document.getElementById("pemakaian").value) || 1;
    const jam = parseFloat(document.getElementById("jampenggunaan").value) || 0;
    const hasil = ((daya * jam * tahun * 365) / 1000).toFixed(2);
    animasiHitung(hasil);
  }

  if (kategoriDipilih === "penanaknasi") {
    const Dm = parseFloat(document.getElementById("dayaMemasak").value) || 0;
    const Dh = parseFloat(document.getElementById("dayaMenghangatkan").value) || 0;
    const Sm = parseFloat(document.getElementById("siklusMemasak").value) || 0;
    const Jh = parseFloat(document.getElementById("jamMenghangatkan").value) || 0;
    const T = parseFloat(document.getElementById("pemakaian" * 365 ).value) || 1;
    const hasil = (((Dm * Sm) + (Dh * Jh)) * 365 * T / 1000).toFixed(2);
    animasiHitung(hasil);
  }
});

// animasi angka
function animasiHitung(angka) {
  hasilEl.style.display = "block";
  let start = 0;
  const end = parseFloat(angka);
  const duration = 1000;
  const step = Math.ceil(end / (duration / 20));
  const counter = setInterval(() => {
    start += step;
    if (start >= end) {
      start = end;
      clearInterval(counter);
    }
    hasilEl.textContent = start.toFixed(2);
  }, 20);
}
