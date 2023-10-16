import { forwardRef } from "react";
import "./CodeInput.css";

const CodeInput = forwardRef((props, ref) => {
  return (
    <textarea
      // @ts-ignore
      ref={ref}
      // @ts-ignore
      value={props.inputValue}
      // @ts-ignore
      onChange={props.handleInput}
      // @ts-ignore
      onFocus={props.handleFocus}
      // @ts-ignore
      onKeyPress={props.handleKeydown}
    >
    </textarea>
  );
});

export { CodeInput };
