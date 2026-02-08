import { useState, useEffect } from "react";

function Compras() {
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const categoriasPorPagina = 3;

  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [editando, setEditando] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");

  // productos por categoría
  const [productos, setProductos] = useState({});
  const [nuevoProducto, setNuevoProducto] = useState("");

  const iconos = ["🛒", "🧰", "👕", "📦", "🍽️", "🧹", "🎁", "📚", "🛠️"];

  // cargar datos
  useEffect(() => {
    const loadData = () => {
      try {
        const guardadas = JSON.parse(localStorage.getItem("categorias")) || [
          "Supermercado",
        ];
        const guardadosProductos =
          JSON.parse(localStorage.getItem("productos")) || {};
        return { categorias: guardadas, productos: guardadosProductos };
      } catch (error) {
        console.error("Error loading compras data:", error);
        return { categorias: ["Supermercado"], productos: {} };
      }
    };
    
    const { categorias, productos } = loadData();
    setCategorias(categorias);
    setProductos(productos);
  }, []);

  // guardar categorías
  useEffect(() => {
    localStorage.setItem("categorias", JSON.stringify(categorias));
  }, [categorias]);

  // guardar productos
  useEffect(() => {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  // añadir categoría
  const agregarCategoria = () => {
    if (!nuevaCategoria.trim()) return;

    setCategorias([...categorias, nuevaCategoria.trim()]);
    setProductos({ ...productos, [nuevaCategoria.trim()]: [] });

    setNuevaCategoria("");
  };

  // eliminar categoría
  const eliminarCategoria = (nombre) => {
    const filtradas = categorias.filter((c) => c !== nombre);
    setCategorias(filtradas);

    const copia = { ...productos };
    delete copia[nombre];
    setProductos(copia);

    if (categoriaActiva === nombre) setCategoriaActiva(null);
  };

  // renombrar categoría
  const guardarNuevoNombre = (oldName) => {
    if (!nuevoNombre.trim()) return;

    const actualizadas = categorias.map((c) =>
      c === oldName ? nuevoNombre.trim() : c,
    );

    const nuevosProductos = { ...productos };
    nuevosProductos[nuevoNombre.trim()] = nuevosProductos[oldName];
    delete nuevosProductos[oldName];

    setCategorias(actualizadas);
    setProductos(nuevosProductos);

    setEditando(null);
    setNuevoNombre("");
  };

  // añadir producto
  const agregarProducto = () => {
    if (!nuevoProducto.trim()) return;

    const lista = productos[categoriaActiva] || [];
    const actualizada = [...lista, nuevoProducto.trim()];

    setProductos({ ...productos, [categoriaActiva]: actualizada });
    setNuevoProducto("");
  };

  // eliminar producto
  const eliminarProducto = (prod) => {
    const lista = productos[categoriaActiva].filter((p) => p !== prod);
    setProductos({ ...productos, [categoriaActiva]: lista });
  };

  // paginación
  const indexUltima = paginaActual * categoriasPorPagina;
  const indexPrimera = indexUltima - categoriasPorPagina;
  const categoriasPagina = categorias.slice(indexPrimera, indexUltima);

  const totalPaginas = Math.ceil(categorias.length / categoriasPorPagina);

  return (
    <div className="compras-page">
      <h2>Lista de Compras</h2>

      {/* añadir categoría */}
      <div className="agregar-categoria">
        <input
          type="text"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría"
          onKeyDown={(e) => {
            if (e.key === "Enter") agregarCategoria();
          }}
        />

        <button onClick={agregarCategoria}>Agregar</button>
      </div>

      {/* categorías */}
      <div className="categorias-paginacion">
        {categoriasPagina.map((cat, index) => (
          <div
            key={index}
            className="categoria-item"
            onClick={(e) => {
              if (
                e.target.tagName !== "BUTTON" &&
                e.target.tagName !== "INPUT"
              ) {
                setCategoriaActiva(cat);
              }
            }}
          >
            <span className="icono">{iconos[index % iconos.length]}</span>

            {editando === cat ? (
              <input
                type="text"
                value={nuevoNombre}
                onChange={(e) => setNuevoNombre(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") guardarNuevoNombre(cat);
                }}
              />
            ) : (
              <span>{cat}</span>
            )}

            <div className="acciones" onClick={(e) => e.stopPropagation()}>
              {editando === cat ? (
                <button onClick={() => guardarNuevoNombre(cat)}>💾</button>
              ) : (
                <button
                  onClick={() => {
                    setEditando(cat);
                    setNuevoNombre(cat);
                  }}
                >
                  ✏️
                </button>
              )}

              <button onClick={() => eliminarCategoria(cat)}>❌</button>
            </div>
          </div>
        ))}
      </div>

      {/* paginación */}
      <div className="paginacion">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaActual(i + 1)}
            className={paginaActual === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* panel de productos */}
      {categoriaActiva && (
        <div className="productos-panel">
          <h3>{categoriaActiva}</h3>

          {/* añadir producto */}
          <div className="agregar-categoria">
            <input
              type="text"
              value={nuevoProducto}
              onChange={(e) => setNuevoProducto(e.target.value)}
              placeholder="Nuevo producto"
              onKeyDown={(e) => {
                if (e.key === "Enter") agregarProducto();
              }}
            />

            <button onClick={agregarProducto}>Añadir</button>
          </div>

          {/* lista de productos */}
          <ul>
            {(productos[categoriaActiva] || []).map((prod, i) => (
              <li key={i}>
                {prod}
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => eliminarProducto(prod)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Compras;
