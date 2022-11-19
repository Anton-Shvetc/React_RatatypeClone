import { useEffect, useState } from "react";
import { Statistics } from "./Statistics";

export function PrintPanel() {
  const [text, setText] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorIndex, setError] = useState();
  const [countErrors, setCountErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(1); // Количество ошибок, на старте 100%

  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [typeSpeed, setTypeSpeed] = useState(0);

  const checkSymbol = (key) => {
    if (key === text[activeIndex]) {
      setActiveIndex(activeIndex + 1);
      setError();
    } else {
      setError(activeIndex);
      setCountErrors(countErrors + 1);
    }
  };
  const checkAccuracy = () => {
    const result = ((text.length - countErrors) / text.length) * 100;
    setAccuracy(result.toFixed(2));
  };

  useEffect(() => {
    fetch(
      "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1"
    )
      .then((res) => res.json())
      .then((data) => setText(data[0].split("")))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  useEffect(() => {
    const onKeypress = (e) => checkSymbol(e.key);

    document.addEventListener("keypress", onKeypress);

    checkAccuracy();
    setTypeSpeed(
      activeIndex ? Math.round(activeIndex * (60 / (time / 600))) : 0
    );
    return () => {
      document.removeEventListener("keypress", onKeypress);
    };
  }, [text, activeIndex, errorIndex]);

  useEffect(() => {
    if (activeIndex === text.length) {
      setIsActive(false);
    }
  }, [activeIndex]);

  return (
    <>
      <section className="hero ">
        <div className="start">
          {!isStart ? (
            <button
              className="start__title"
              onClick={() => {
                setIsStart(true);
                setIsActive(true);
              }}
            >
              Кликни для старта
            </button>
          ) : (
            <div className="hero-body">
              {isStart &&
                text.map((e, index) => {
                  return (
                    <span
                      key={index}
                      className={`
                  ${activeIndex === index ? "active" : ""} 
                  ${errorIndex === index ? "error" : ""}`}
                    >
                      {e}
                    </span>
                  );
                })}
            </div>
          )}
        </div>
        <Statistics
          countErrors={countErrors}
          accuracy={accuracy}
          typeSpeed={typeSpeed}
        />
      </section>
    </>
  );
}
