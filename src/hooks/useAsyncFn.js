// 비동기 로직을 제거하기 위해 사용됨
// 네트워크나 Timeout 로직이 있을 때 사용할 수 있다.

import { useState, useCallback, useRef } from "react";

const useAsyncFn = (fn, deps) => {
  //마지막에 실행된 비동기 로직의 것을 상태로 지정하기 위해서
  const lastCallId = useRef(0);
  const [state, setState] = useState({
    isLoading: false,
  });

  const callback = useCallback((...args) => {
    const callId = ++lastCallId.current;
    if (!state.isLoading) {
      setState({ ...state, isLoading: true });
    }

    return fn(...args).then(
      (value) => {
        callId === lastCallId.current && setState({ value, isLoading: false });
        return value;
      },
      (error) => {
        callId === lastCallId.current && setState({ error, isLoading: false });
        return error;
      }
    );
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
