function Inicio() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="home-page">
      <div className="logo-container">
        <img
          src="/logotipoAgenda.png"
          alt="Logotipo de la agenda"
          className="logo-home"
        />
        <span className="year-inside-logo">{currentYear}</span>
      </div>
    </div>
  );
}

export default Inicio;



