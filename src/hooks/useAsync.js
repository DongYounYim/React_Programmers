// 컴포넌트가 마운트될때 바로 실행

import { useEffect } from "react";
import useAsyncFn from "./useAsyncFn";

const useAsync = (fn, deps) => {
  const [state, callback] = useAsyncFn(fn, deps);

  useEffect(() => {
    callback();
  }, [callback]);

  return state;
};

export default useAsync;
