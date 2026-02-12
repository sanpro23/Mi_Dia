import { useState, useEffect, useCallback } from "react";
import { useLocalStorage, useDebounce } from "../hooks";
import { validateFile, validateJsonData, sanitizeImportedData } from "../utils/validation";
import { PAGINATION } from "../config/constants";

function Notas() {
  const [titulo, setTitulo] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#fff8a6"); 
  const [tag, setTag] = useState("General");
  const [notas, setNotas] = useLocalStorage("NOTAS", []);
  const debouncedNotas = useDebounce(notas, 1000);
  const [selectedId, setSelectedId] = useState(null);

  // BUSCADOR
  const [search, setSearch] = useState("");

  // PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  // guardar con debounce
  useEffect(() => {
    if (debouncedNotas !== notas) {
      localStorage.setItem("notas", JSON.stringify(debouncedNotas));
    }
  }, [debouncedNotas, notas]);

  // guardar o actualizar nota
  const saveNota = useCallback(() => {
    if (!titulo.trim() || !content.trim()) {
      setError("Por favor, completa el título y el contenido.");
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
        id: Date.now() + Math.random(),
        titulo,
        content,
        color,
        tag,
        date: new Date().toLocaleString(),
      };
      updatedNotas = [...notas, newNota];
    }

    setNotas(updatedNotas);

    setTitulo("");
    setContent("");
    setColor("#fff8a6");
    setTag("General");
    setSelectedId(null);
    setError("");
  }, [titulo, content, color, tag, selectedId, notas, setNotas]);

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

    const validation = validateFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);

        const schemaValidation = validateJsonData(imported, {
          required: ['titulo', 'content']
        });
        
        if (!schemaValidation.valid) {
          setError(schemaValidation.error);
          return;
        }

        const sanitizedImport = sanitizeImportedData(imported);
        const merged = [...notas, ...sanitizedImport];
        setNotas(merged);

        setError("");
        alert("Notas importadas correctamente.");
      } catch {
        setError("Error al importar el archivo: formato inválido");
      }
    };

    reader.onerror = () => {
      setError("Error al leer el archivo");
    };

    reader.readAsText(file);
  };

  // filtrado
  const notasFiltradas = notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(search.toLowerCase())
  );

  // paginación
  const indexUltima = currentPage * PAGINATION.NOTAS_POR_PAGINA;
  const indexPrimera = indexUltima - PAGINATION.NOTAS_POR_PAGINA;
  const notasPagina = notasFiltradas.slice(indexPrimera, indexUltima);

  const totalPaginas = Math.ceil(notasFiltradas.length / PAGINATION.NOTAS_POR_PAGINA);

  return (
    <div className="page-notas">
      <h1>NOTAS</h1>
      
      {error && <div className="error-message">{error}</div>}

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
