// 웹 사이트에서의 반복적인 로직을 처리 할 때 사용

import { useCallback } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const useIntervalFn = (fn, ms) => {
  const intervalId = useRef();
  const callback = useRef(fn);
  //ref를 통해 함수를 내부에서 관리하는 것이 중요
  //useInterval의 핵심.
  //fn이 갑자기 바뀌는 경우를 대비할 수 있음.
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);

    intervalId.current = setInterval(() => {
      callback.current();
    }, ms);
  });

  const clear = useCallback(() => {
    intervalId.current && clearInterval(intervalId.current);
  }, []);
  // 정리
  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useIntervalFn;
