export function Statistics({ countErrors, accuracy, typeSpeed }) {
  const reset = () => {
    console.log("reset");
    window.location.reload();
  };

  return (
    <>
      <div className="statistics">
        <div className="statistics__err">
          <h3>
            Ошибки <i className="fas fa-exclamation-circle"></i>
          </h3>
          <span id="statistics__err">{countErrors}</span>
        </div>

        <div className="statistics__acc">
          <h3>
            Точность <i className="fas fa-bullseye"></i>
          </h3>

          <span id="statistics__acc">{`${accuracy}%`} </span>
        </div>
        <div className="statistics__speed">
          <h3>
            Скорость <i className="fas fa-tachometer-alt"></i>
          </h3>
          <span id="statistics__speed">{`${typeSpeed} зн/мин`}</span>
        </div>
        <div className="reset">
          <button onClick={reset}>Сброс </button>{" "}
          <i className="fas fa-reply"></i>
        </div>
      </div>
    </>
  );
}

