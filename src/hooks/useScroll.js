// 특정 엘리먼트의 스크롤 위치를 추적하는 역할

import { useEffect, useRef } from "react";
import useRafState from "./useRafState";

const useScroll = () => {
  //   const [state, setState] = useState({ x: 0, y: 0 });
  // requestAnimationFrame을 통한 위보다 약간의 성능적인 이득 발생
  const [state, setState] = useRafState({ x: 0, y: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // 스크롤 이벤트 발생할 때마다 브라우저가 reflow이벤트가 발생해 rerender한다
    // 약간의 성능이득을 위해 requestAnimationFrame이라는 함수 사용가능
    const handleScroll = () => {
      setState({
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
      });
    };
    //(최적화) passive가 true일 경우 브라우저가 preventDefault를 체크 x
    // 따라서 약간의 성능적인 이득을 볼 수 있다.
    element.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [ref, setState]);

  return [ref, state];
};

export default useScroll;
