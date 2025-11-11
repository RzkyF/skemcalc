// daftar kategori dan field-nya
const kategoriList = {
  kipas: [
    { id: "daya", label: "Daya Kipas (W)", type: "number", satuan: "W", min: 1, value: 50 ,required: true},
    { id: "jampenggunaan", label: "Waktu Penggunaan per Hari (jam)", type: "number", satuan: "jam", value: 6.6, min: 1 , required: true},
    { id: "pemakaian", label: "Pemakaian (tahun)", type: "range", min: 1, max: 10, value: 1, required: true },
  ],
  penanaknasi: [
    { id: "dayaMemasak", label: "Konsumsi Energi untuk Memasak (Wh)", type: "number", satuan: "Wh", value: 165.49, min: 1 , required: true},
    { id: "dayaMenghangatkan", label: "Konsumsi Energi untuk Menghangatkan (Wh)", type: "number", satuan: "Wh", value: 82.02, min: 1 ,required: true},
    // { id: "siklusMemasak", label: "Siklus Memasak per Hari", type: "number",satuan : "x", value: 1, min: 1 },
    // { id: "jamMenghangatkan", label: "Jam Menghangatkan per Hari", type: "number",satuan: "Jam", value: 5, min: 1 },
    { id: "pemakaian", label: "Pemakaian (tahun)", type: "range", min: 1, max: 10, value: 1, min: 1, required: true },
  ],
  airconditioner: [
    { id: "daya", label: "Daya AC (W)", type: "number", satuan: "W", min: 1, value: 820.00 ,required: true},
    { id: "jampenggunaan", label: "Waktu Penggunaan per Hari (jam)", type: "number", satuan: "jam", value: 8, min: 1 , required: true},
    { id: "pemakaian", label: "Pemakaian (tahun)", type: "range", min: 1, max: 10, value: 1, required: true },
  ],
  ledswaballast: [
    { id: "daya", label: "Daya Lampu (W)", type: "number", satuan: "W", min: 1, value: 2.79 ,required: true},
    { id: "jampenggunaan", label: "Waktu Penggunaan per Hari (jam)", type: "number", satuan: "jam", value: 8, min: 1 , required: true},
    { id: "pemakaian", label: "Pemakaian (tahun)", type: "range", min: 1, max: 10, value: 1, required: true },
  ],
};

// container input
const inputContainer = document.getElementById("inputContainer");
const hasilEl = document.getElementById("hasilHitung");
const rumusEl = document.getElementById("rumusHitung"); 
let kategoriDipilih = null;

// render input sesuai kategori
function renderInput(kategori) {
  inputContainer.innerHTML = "";
  const fields = kategoriList[kategori];
  if (!fields) return;

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
          <input type="${f.type}" min="${f.min}" id="${f.id}" class="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
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
    rumusEl.textContent = "";
    hasilEl.style.display = "none";
    rumusEl.style.display = "none";

    // reset style tombol
    buttons.forEach(b => {
      b.classList.remove("border-primary", "text-primary", "bg-primary/10");
      b.classList.add("border-gray-200", "text-gray-700", "bg-white");
    });

    // aktifkan style tombol yg dipilih
    btn.classList.remove("border-gray-200", "text-gray-700", "bg-white");
    btn.classList.add("border-primary", "text-primary", "bg-primary/10");
  });
});

// render default saat halaman dibuka
window.addEventListener("DOMContentLoaded", () => {
  kategoriDipilih = "kipas";
  renderInput(kategoriDipilih);

  const defaultBtn = document.querySelector('button[data-cat="kipas"]');
  if (defaultBtn) {
    defaultBtn.classList.add("border-primary", "text-primary", "bg-primary/10");
  }
});

// tombol hitung
document.getElementById("btnHitung").addEventListener("click", () => {
  if (!kategoriDipilih) {
    alert("Pilih kategori dulu!");
    return;
  }

  let hasil = 0;
  let rumus = "";
  let tahun = 1;

  if (kategoriDipilih === "kipas") {
    const daya = parseFloat(document.getElementById("daya").value) || 0;
    const jam = parseFloat(document.getElementById("jampenggunaan").value) || 0;
    tahun = parseFloat(document.getElementById("pemakaian").value) || 1;

    hasil = ((daya * jam * tahun * 365) / 1000).toFixed(2);
    rumus = `( Daya(${daya} W) x Pemakaian(${jam} jam) × ${tahun} Tahun(${tahun * 365} Hari) ÷ 1000`;
  }

  if (kategoriDipilih === "penanaknasi") {
    const Dm = parseFloat(document.getElementById("dayaMemasak").value) || 0;
    const Dh = parseFloat(document.getElementById("dayaMenghangatkan").value) || 0;
    // const Sm = parseFloat(document.getElementById("siklusMemasak").value) || 0;
    // const Jh = parseFloat(document.getElementById("jamMenghangatkan").value) || 0;
    tahun = parseFloat(document.getElementById("pemakaian").value) || 1;

    // hasil = (((Dm * Sm) + (Dh * Jh)) * 365 * tahun / 1000).toFixed(2);
    hasil = ((Dm + Dh ) * 365 * tahun / 1000).toFixed(2);
    // rumus = `(( Daya Memasak(${Dm}) × Siklus Memasak(${Sm})) + (Daya Menghangatkan(${Dh}) × (Waktu Menghangatkan(${Jh})) × ${tahun} Tahun(${tahun * 365}) ÷ 1000`;
    rumus = `( Daya Memasak(${Dm}) + Daya Menghangatkan(${Dh})) × ${tahun} Tahun(${tahun * 365} Hari) ÷ 1000`;
    
  }
  if (kategoriDipilih === "airconditioner") {
    const daya = parseFloat(document.getElementById("daya").value) || 0;
    const jam = parseFloat(document.getElementById("jampenggunaan").value) || 0;
    tahun = parseFloat(document.getElementById("pemakaian").value) || 1;
    hasil = ((daya * jam * tahun * 365) / 1000).toFixed(2);
    rumus = `( Daya(${daya} W) x Pemakaian(${jam} jam) × ${tahun} Tahun(${tahun * 365} Hari) ÷ 1000`;
  }

  if (kategoriDipilih === "ledswaballast") {
    const daya = parseFloat(document.getElementById("daya").value) || 0;
    const jam = parseFloat(document.getElementById("jampenggunaan").value) || 0;
    tahun = parseFloat(document.getElementById("pemakaian").value) || 1;

    hasil = ((daya * jam * tahun * 365) / 1000).toFixed(2);
    rumus = `( Daya(${daya} W) x Pemakaian(${jam} jam) × ${tahun} Tahun(${tahun * 365} Hari) ÷ 1000`;
  }

  // tampilkan hasil
  const teksTahun = tahun > 1 ? ` ${tahun}` : "";
  animasiHitung(hasil, teksTahun);
  tampilkanRumus(rumus);
});

// animasi angka bergulir
function animasiHitung(angka, teksTahun) {
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
    hasilEl.innerHTML = `${start.toFixed(2)} <span class="text-xl font-bold text-gray-600"
                          >Kwh /${teksTahun} Tahun</span
                        >`;
  }, 20);
}

// tampilkan rumus
function tampilkanRumus(rumus) {
  rumusEl.style.display = "block";
  rumusEl.innerHTML = `
    <div class="mt-2 text-sm text-gray-600">
      <span class="font-bold text-primary">Cara menghitung:</span><br>
      <code class="bg-gray-100 px-2 py-1 rounded text-sm">${rumus}</code>
    </div>
  `;
}
