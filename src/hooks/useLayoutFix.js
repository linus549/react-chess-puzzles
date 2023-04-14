import { useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import { UPDATE_LAYOUT_DEBOUNCE_DELAY } from "config";

function useLayoutFix(setPadding, actionBarRefs = [], dependencies = []) {
  const debouncedUpdateLayoutRef = useRef(
    debounce(
      () => {
        for (const actionBarRef of actionBarRefs) {
          if (actionBarRef.current) {
            setPadding(
              actionBarRef.current.getBoundingClientRect().height.toFixed(1)
            );
          }
        }
      },
      UPDATE_LAYOUT_DEBOUNCE_DELAY,
      { leading: true }
    )
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => debouncedUpdateLayoutRef.current(), dependencies);

  useEffect(function manageResizeListener() {
    const listener = debouncedUpdateLayoutRef.current;
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, []);
}

export default useLayoutFix;
