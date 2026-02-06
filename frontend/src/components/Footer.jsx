export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      {/* Mensaje legal que se repite en todas las páginas */}
      <small>
        © <strong>{currentYear}</strong> Propiedad y derechos reservados para arrobitaSantos.
      </small>
    </footer>
  );
}
