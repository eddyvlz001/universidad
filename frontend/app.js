const BASE = "http://localhost:3000"; // API NestJS
let currentModule = "docentes";
let page = 1;
let limit = 10;

const tbody = document.getElementById("tbody");
const thead = document.getElementById("thead");
const title = document.getElementById("title");
const modal = document.getElementById("modal");
const dataForm = document.getElementById("dataForm");

const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

document.querySelectorAll("#menu li").forEach(li => {
  li.onclick = () => {
    document.querySelectorAll("#menu li").forEach(x => x.classList.remove("active"));
    li.classList.add("active");
    currentModule = li.dataset.module;
    title.textContent = li.textContent.replace("👨‍🏫 ", "").replace("🎓 ", "").replace("🧑‍🎓 ", "").replace("📅 ", "").replace("📚 ", "");
    loadData();
  };
});

async function loadData() {
  thead.innerHTML = "";
  tbody.innerHTML = "";
  pageInfo.textContent = "Cargando...";

  try {
    const res = await fetch(`${BASE}/${currentModule}?page=${page}&limit=${limit}`);
    const data = await res.json();
    const rows = Array.isArray(data) ? data : data.data || [];

    if (rows.length === 0) {
      tbody.innerHTML = "<tr><td colspan='5'>No hay datos</td></tr>";
      return;
    }

    // Crear encabezados
    const cols = Object.keys(rows[0]);
    thead.innerHTML = "<tr>" + cols.map(c => `<th>${c}</th>`).join("") + "<th>Acciones</th></tr>";

    // Crear filas
    rows.forEach(r => {
      const tr = document.createElement("tr");
      cols.forEach(c => {
        const td = document.createElement("td");
        td.textContent = r[c];
        tr.appendChild(td);
      });

      const tdAction = document.createElement("td");
      const del = document.createElement("button");
      del.textContent = "🗑️";
      del.className = "danger";
      del.onclick = () => deleteItem(r.id);
      tdAction.appendChild(del);
      tr.appendChild(tdAction);
      tbody.appendChild(tr);
    });

    pageInfo.textContent = `Página ${page}`;
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5">Error: ${err.message}</td></tr>`;
  }
}

// === Modal ===
addBtn.onclick = async () => {
  modal.classList.remove("hidden");
  dataForm.innerHTML = "";
  try {
    const res = await fetch(`${BASE}/${currentModule}`);
    const data = await res.json();
    const sample = Array.isArray(data) && data.length ? data[0] : {};
    const keys = Object.keys(sample).filter(k => k !== "id");

    if (keys.length === 0) {
      dataForm.innerHTML = "<p>No se pudieron determinar los campos.</p>";
      return;
    }

    keys.forEach(k => {
      const input = document.createElement("input");
      input.name = k;
      input.placeholder = k;
      dataForm.appendChild(input);
    });
  } catch {
    dataForm.innerHTML = "<p>Error cargando campos</p>";
  }
};

cancelBtn.onclick = () => modal.classList.add("hidden");

saveBtn.onclick = async (e) => {
  e.preventDefault();
  const obj = {};
  new FormData(dataForm).forEach((v, k) => (obj[k] = v));

  try {
    const res = await fetch(`${BASE}/${currentModule}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (!res.ok) throw new Error("Error al guardar");
    alert("Registro guardado ✅");
    modal.classList.add("hidden");
    loadData();
  } catch (err) {
    alert(err.message);
  }
};

async function deleteItem(id) {
  if (!confirm("¿Eliminar este registro?")) return;
  try {
    const res = await fetch(`${BASE}/${currentModule}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo eliminar");
    loadData();
  } catch (err) {
    alert(err.message);
  }
}

prevBtn.onclick = () => {
  if (page > 1) {
    page--;
    loadData();
  }
};
nextBtn.onclick = () => {
  page++;
  loadData();
};

loadData();
