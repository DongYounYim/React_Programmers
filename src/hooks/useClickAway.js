// 특정 영역 외의 부분을 클릭하면 이벤트를 발생하는 부분
// 모달이나 팝오버의 외부부분을 클릭했을 때 발생시킴

import { useEffect } from "react";
import { useRef } from "react";

const events = ["mousedown", "touchstart"];

const useClickAway = (handler) => {
  const ref = useRef(null);
  // 핸들러가 바뀔 때마다 이벤트가 추가되는 것을 방지한다.
  // 조금의 성능개선
  const saveHandler = useRef(handler);

  useEffect(() => {
    saveHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e) => {
      //   !element.contains(e.target) && handler(e);
      !element.contains(e.target) && saveHandler.current(e);
    };

    for (const eventName of events) {
      document.addEventListener(eventName, handleEvent);
    }

    return () => {
      for (const eventName of events) {
        document.removeEventListener(eventName, handleEvent);
      }
    };
  }, [ref]);

  return ref;
};

export default useClickAway;
