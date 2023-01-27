// 단축키를 구현할 때 주로 사용함.

import { useEffect } from "react";
import { useCallback } from "react";

const useKey = (event = "keydown", targetKey, handler) => {
  const handleKey = useCallback(
    ({ key }) => {
      //console.log(key);
      if (key === targetKey) {
        handler();
      }
    },
    [targetKey, handler]
  );

  useEffect(() => {
    window.addEventListener(event, handleKey);

    return () => {
      window.removeEventListener(event, handleKey);
    };
  }, [event, targetKey, handleKey]);
};

export default useKey;
