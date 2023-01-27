// target element의 크기가 변했을 때 이벤트를 발생시키는 훅이다.
// PC, Tablet, Mobile 에서의 이미지 크기를 Resize 시킬 때

import { useEffect, useRef } from "react";

const useResize = (handler) => {
  const saveHandler = useRef(handler);
  const ref = useRef(null);

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // 엘리먼트 하나 / 0번째의 것
    // contentRect => 해당 엘리먼트의 크기
    const observer = new ResizeObserver((entries) => {
      saveHandler.current(entries[0].contentRect);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return ref;
};

export default useResize;
