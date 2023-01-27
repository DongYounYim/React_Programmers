// request Animation Frame의 성능 이득을 위함

import { useCallback, useRef, useState } from "react";

const useRafState = (initialState) => {
  const frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value) => {
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      // state는 requestAnimationFrame의 id를 받게된다.
      setState(value);
    });
  }, []);

  return [state, setRafState];
};

export default useRafState;
