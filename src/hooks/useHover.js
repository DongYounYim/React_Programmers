// 특정 엘리먼트에 마우스가 올라올 때 true
// 벗어날 때 false
// 툴팁 등을 보여주는 용도로 사용된다.

import { useCallback, useEffect, useRef, useState } from "react";

const useHover = () => {
  const [state, setState] = useState(false);
  const ref = useRef(null);

  const handleMouseOver = useCallback(() => setState(true), []);
  const handleMouseOut = useCallback(() => setState(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mouseover", handleMouseOver);
    element.addEventListener("mouseout", handleMouseOut);

    return () => {
      element.removeEventListener("mouseover", handleMouseOver);
      element.removeEventListener("mouseout", handleMouseOut);
    };
  }, [ref, handleMouseOut, handleMouseOver]);

  return [ref, state];
};

export default useHover;
