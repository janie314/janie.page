// @ts-nocheck
import { SyntheticBaseEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { CodeInput } from "./components/CodeInput";

function App() {
  let loadData;
  if (window.location.hash === "" || window.location.hash === "#") {
    loadData = { html: "", css: "" };
  } else {
    loadData = JSON.parse(decodeURI(window.location.hash.slice(1)));
  }

  const [currentInput, setCurrentInput] = useState("html");
  const [htmlInputText, setHtmlInputText] = useState(loadData.html);
  const [cssInputText, setCssInputText] = useState(loadData.css);
  const [htmlInputPos, setHtmlInputPos] = useState(0);
  const [cssInputPos, setCssInputPos] = useState(0);
  const [displayOutput, setDisplayOutput] = useState("");
  const [pos, setPos] = useState(0);

  const inputRefs = {
    html: {
      ref: useRef(null),
      opposite: "css",
      inputText: htmlInputText,
      setInputText: setHtmlInputText,
      inputPos: htmlInputPos,
      setInputPos: setHtmlInputPos,
    },
    css: {
      ref: useRef(null),
      opposite: "html",
      inputText: cssInputText,
      setInputText: setCssInputText,
      inputPos: cssInputPos,
      setInputPos: setCssInputPos,
    },
  };

  function handleInput(event: SyntheticBaseEvent, inputtype: string) {
    if (inputtype === "html") {
      setHtmlInputText(event.target.value);
    } else if (inputtype === "css") {
      setCssInputText(event.target.value);
    } else {
      console.error(
        `error 289139: invalid inputtype ${inputtype} passed to handleInput`,
      );
      return;
    }
  }

  function handleKeyDown(event: SyntheticBaseEvent) {
    // @ts-ignore
    const str = inputRefs[currentInput].ref.current.value;
    // @ts-ignore
    const pos1 = inputRefs[currentInput].ref.current.selectionStart;
    // @ts-ignore
    const pos2 = inputRefs[currentInput].ref.current.selectionEnd;
    if (event.code === "Tab") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.shiftKey) {
        if (pos1 == pos2) {
          // @ts-ignore
          inputRefs[currentInput].setInputText(
            str.slice(0, pos1) +
              "\t" +
              str.slice(pos1),
          );
          setPos(pos1 + 1);
        } else {
          const ind = str.slice(0, pos1).lastIndexOf("\n");
          if (ind !== -1) {
            const fullLineSel = str.slice(ind, pos2)
              .replaceAll("\n", "\n\t");
            // @ts-ignore
            inputRefs[currentInput].setInputText(
              str.slice(0, ind) +
                fullLineSel +
                str.slice(pos2),
            );
            setPos(pos2 + 1);
          } else {
            const fullLineSel = "\t" + str.slice(0, pos2)
              .replaceAll("\n", "\n\t");
            // @ts-ignore
            inputRefs[currentInput].setInputText(
              fullLineSel +
                str.slice(pos2),
            );
            setPos(pos2 + 1);
          }
        }
      } else {
        // @ts-ignore
        inputRefs[
          // @ts-ignore
          inputRefs[currentInput]["opposite"]
        ].ref.current.focus();
        // @ts-ignore
        setCurrentInput(inputRefs[currentInput]["opposite"]);
      }
    } else if (event.code === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      const lastNewline =
        str.slice(str.slice(0, pos1).lastIndexOf("\n") + 1).match(
          /^[ \f\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]*/,
        )[0];
      // @ts-ignore
      inputRefs[currentInput].setInputText(
        str.slice(0, pos1) +
          "\n" +
          lastNewline +
          str.slice(pos1),
      );
      setPos(pos1 + 1 + lastNewline.length);
    }
  }

  useEffect(
    () => {
      setDisplayOutput(
        `<html><head><style>${cssInputText}</style></head><body>${htmlInputText}</body></html>`,
      );
      window.location.hash = encodeURI(
        JSON.stringify({ html: htmlInputText, css: cssInputText }),
      );
    },
    [htmlInputText, cssInputText],
  );

  useEffect(() => {
    // @ts-ignore
    inputRefs[currentInput].ref.current.selectionStart =
      // @ts-ignore
      inputRefs[currentInput]
        .ref.current.selectionEnd =
        pos;
  }, [pos]);

  return (
    <div className="app" onKeyDown={handleKeyDown}>
      <div className="panel-webview">
        <iframe className="webview" sandbox="" srcDoc={displayOutput}></iframe>
      </div>
      <div className="panel-input">
        <CodeInput
          ref={inputRefs.html.ref}
          inputValue={htmlInputText}
          handleInput={(e) => handleInput(e, "html")}
          handleFocus={(e) => setCurrentInput("html")}
        >
        </CodeInput>
        <CodeInput
          ref={inputRefs.css.ref}
          inputValue={cssInputText}
          // @ts-ignore
          handleInput={(e) => handleInput(e, "css")}
          // @ts-ignore
          handleFocus={(e) => setCurrentInput("css")}
        >
        </CodeInput>
      </div>
    </div>
  );
}

export default App;
