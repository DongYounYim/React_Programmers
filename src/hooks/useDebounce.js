// 특정 기간 내에 같은 이벤트가 호출된 경우 가장 마지막 이벤트만 호출하도록 함

import { useEffect } from "react";
import useTimeoutFn from "./useTimeoutFn";

const useDebounce = (fn, ms, deps) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  useEffect(run, deps);

  return clear;
};

export default useDebounce;
