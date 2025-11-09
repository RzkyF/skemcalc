const kategoriList = {
  kipas: [
    { label: "Daya (Watt)", id: "daya", type: "number" },
    { label: "Jam Pemakaian per Hari", id: "jam", type: "number" },
    { label: "Hari Pemakaian per Tahun", id: "hari", type: "number" }
  ],
  ac: [
    { label: "Daya (Watt)", id: "daya", type: "number" },
    { label: "Jam Pemakaian per Hari", id: "jam", type: "number" },
    { label: "Hari Pemakaian per Tahun", id: "hari", type: "number" }
  ],
  kulkas: [
    { label: "Daya (Watt)", id: "daya", type: "number" },
    { label: "Jam Nyala per Hari", id: "jam", type: "number" }
  ],
  PenanakNasi: [
    { label: "Daya (Watt)", id: "daya", type: "number" }
    { label: "Jam Nyala per Hari", id: "jam", type: "number" }
  ]
};

document.getElementById("kategori").addEventListener("change", e => {
  const container = document.getElementById("detailInput");
  container.innerHTML = "";
  const fields = kategoriList[e.target.value];
  if (!fields) return;
  fields.forEach(f => {
    container.innerHTML += `
      <label>${f.label}</label>
      <input type="${f.type}" id="${f.id}" required>
    `;
  });
});