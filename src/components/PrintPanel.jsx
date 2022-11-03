import { useEffect, useState } from "react";
import { Statistics } from "./Statistics";

export function PrintPanel() {
  const [text, setText] = useState([]);
  const [start, setStart] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [errorIndex, setErrror] = useState();
  const [countErrors, setCountErrors] = useState(0);
  const [accuracy, setAccurancy] = useState(100);

  useEffect(() => {
    fetch(
      "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1"
    )
      .then((res) => res.json())
      .then((data) => setText(data[0].split("")))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const onKeypress = (e) => checkSymbol(e.key);

    document.addEventListener("keypress", onKeypress);

    checkAccuracy();

    return () => {
      document.removeEventListener("keypress", onKeypress);
    };
  }, [text, activeIndex, errorIndex]);

  const checkSymbol = (key) => {
    if (key === text[activeIndex]) {
      setActiveIndex(activeIndex + 1);
      setErrror();
    } else {
      setErrror(activeIndex);
      setCountErrors(countErrors + 1);
    }
  };
  const checkAccuracy = () => {
    const result = ((text.length - countErrors) / text.length) * 100;
    setAccurancy(result.toFixed(2));
  };

  return (
    <>
      <section className="hero ">
        <div className="start">
          <button className="start__title" onClick={() => setStart(true)}>
            Кликни для старта 
          </button>

          <div className="hero-body">
            {start &&
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
        </div>

        <Statistics countErrors={countErrors} accuracy={accuracy} />
      </section>
    </>
  );
}
