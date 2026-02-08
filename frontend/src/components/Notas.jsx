import { useState, useEffect } from "react";

function Notas() {
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fff8a6"); 
  const [tag, setTag] = useState("General");
  const [notas, setNotas] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // BUSCADOR
  const [search, setSearch] = useState("");

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const notasPorPagina = 6;

  // cargar notas al iniciar
  useEffect(() => {
    const loadNotas = () => {
      try {
        const savedNotas = JSON.parse(localStorage.getItem("notas")) || [];
        return savedNotas;
      } catch (error) {
        console.error("Error loading notas:", error);
        return [];
      }
    };
    
    setNotas(loadNotas());
  }, []);

  // AUTOGUARDADO cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("notas", JSON.stringify(notas));
    }, 3000);

    return () => clearInterval(interval);
  }, [notas]);

  // guardar o actualizar nota
  const saveNota = () => {
    if (!titulo.trim() || !content.trim()) {
      alert("Por favor, completa el título y el contenido.");
      return;
    }

    let updatedNotas;

    if (selectedId) {
      updatedNotas = notas.map((nota) =>
        nota.id === selectedId
          ? { ...nota, titulo, content, color, tag, date: new Date().toLocaleString() }
          : nota
      );
    } else {
      const newNota = {
        id: Date.now(),
        titulo,
        content,
        color,
        tag,
        date: new Date().toLocaleString(),
      };
      updatedNotas = [...notas, newNota];
    }

    setNotas(updatedNotas);
    localStorage.setItem("notas", JSON.stringify(updatedNotas));

    setTitulo("");
    setContent("");
    setColor("#fff8a6");
    setTag("General");
    setSelectedId(null);
  };

  // abrir nota
  const openNota = (id) => {
    const nota = notas.find((n) => n.id === id);
    if (!nota) return;

    setTitulo(nota.titulo);
    setContent(nota.content);
    setColor(nota.color);
    setTag(nota.tag);
    setSelectedId(id);
  };

  // eliminar nota
  const deleteNota = (id) => {
    if (!confirm("¿Seguro que quieres eliminar esta nota?")) return;

    const updatedNotas = notas.filter((n) => n.id !== id);
    setNotas(updatedNotas);
    localStorage.setItem("notas", JSON.stringify(updatedNotas));

    if (selectedId === id) {
      setTitulo("");
      setContent("");
      setColor("#fff8a6");
      setTag("General");
      setSelectedId(null);
    }
  };

  // EXPORTAR NOTAS
  const exportNotas = () => {
    const blob = new Blob([JSON.stringify(notas, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mis_notas.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // IMPORTAR NOTAS
  const importNotas = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);

        if (!Array.isArray(imported)) {
          alert("El archivo no contiene un formato válido de notas.");
          return;
        }

        const merged = [...notas, ...imported];
        setNotas(merged);
        localStorage.setItem("notas", JSON.stringify(merged));

        alert("Notas importadas correctamente.");
      } catch {
        alert("Error al importar el archivo.");
      }
    };

    reader.readAsText(file);
  };

  // filtrado
  const notasFiltradas = notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(search.toLowerCase())
  );

  // paginación
  const indexUltima = currentPage * notasPorPagina;
  const indexPrimera = indexUltima - notasPorPagina;
  const notasPagina = notasFiltradas.slice(indexPrimera, indexUltima);

  const totalPaginas = Math.ceil(notasFiltradas.length / notasPorPagina);

  return (
    <div className="page-notas">
      <h1>NOTAS</h1>

      {/* FORMULARIO */}
      <input
        type="text"
        placeholder="Título de la nota"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && saveNota()}
      />

      <textarea
        placeholder="Contenido de la nota"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* COLOR */}
      <label>Color:</label>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      {/* ETIQUETAS */}
      <label>Etiqueta:</label>
      <select value={tag} onChange={(e) => setTag(e.target.value)}>
        <option>General</option>
        <option>Trabajo</option>
        <option>Ideas</option>
        <option>Personal</option>
        <option>Urgente</option>
      </select>

      <button onClick={saveNota}>
        {selectedId ? "Actualizar Nota" : "Guardar Nota"}
      </button>

      {selectedId && (
        <button
          onClick={() => {
            setTitulo("");
            setContent("");
            setColor("#fff8a6");
            setTag("General");
            setSelectedId(null);
          }}
          style={{ background: "#777", marginLeft: "10px" }}
        >
          Cancelar edición
        </button>
      )}

      {/* BOTONES EXPORTAR / IMPORTAR */}
      <div className="notas-buttons">
        <button className="export-notas-btn" onClick={exportNotas}>
          🗃️ Exportar todas las notas
        </button>

        <label className="import-notas-btn">
          📥 Importar notas
          <input
            type="file"
            accept=".json,.txt"
            onChange={importNotas}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <h3>Notas Guardadas:</h3>

      {/* BUSCADOR */}
      <input
        type="text"
        placeholder="Buscar nota por título..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        className="search-input"
      />

      {/* GRID TIPO GOOGLE KEEP */}
      <div className="notas-grid">
        {notasPagina.map((nota) => (
          <div
            key={nota.id}
            className="nota-card"
            style={{ background: nota.color }}
          >
            <h4 onClick={() => openNota(nota.id)}>{nota.titulo}</h4>
            <p onClick={() => openNota(nota.id)}>{nota.content}</p>

            <span className="tag">{nota.tag}</span>

            <div className="nota-footer">
              <small>{nota.date}</small>

              <button className="delete-btn" onClick={() => deleteNota(nota.id)}>
                X
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINACIÓN */}
      <div className="pagination">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Notas;
