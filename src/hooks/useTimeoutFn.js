// 함수 호출을 통한 timeout 방법

import { useCallback } from "react";
import { useEffect, useRef } from "react";

const useTimeoutFn = (fn, ms) => {
  const timeoutId = useRef();
  //useRef로 인한 최적화
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);
  // 정리
  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
