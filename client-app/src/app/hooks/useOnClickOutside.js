import { useEffect } from "react";

export const useOnClickOutside = (ref, active, handler, ignoreRef = null) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !active ||
        !ref.current ||
        ref.current.contains(event.target) ||
        (ignoreRef &&
          (!ignoreRef.current || ignoreRef.current.contains(event.target)))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, ignoreRef]);
};
