
import React, { useEffect, useRef } from 'react';
import pinCode from '../pincode';

/**
 * React Wrapper for pinCode
 *
 * Usage:
 * <PinCode
 *   fields={5}
 *   onComplete={(code) => console.log(code)}
 * />
 */
const PinCode = ({
  fields = 5,
  placeholder = "•",
  autofocus = true,
  hideinput = true,
  reset = false,
  pattern = "^[0-9]*$",
  copypaste = true,
  onComplete,
  onInvalid,
  onKeydown,
  onInput,
  className = "",
  id = "pincode-container"
}) => {
  const containerRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
        // Clear container in case of re-mount issues (though typically strict mode does this)
        containerRef.current.innerHTML = "";

        const options = {
            fields,
            placeholder,
            autofocus,
            hideinput,
            reset,
            pattern,
            copypaste,
            complete: onComplete || (() => {}),
            invalid: onInvalid || (() => {}),
            keydown: onKeydown || (() => {}),
            input: onInput || (() => {})
        };

        instanceRef.current = new pinCode(containerRef.current, options);
    }
  }, [
      fields, placeholder, autofocus, hideinput, reset, pattern, copypaste,
      onComplete, onInvalid, onKeydown, onInput
  ]);

  return (
    <div
        id={id}
        ref={containerRef}
        className={className}
    ></div>
  );
};

export default PinCode;
