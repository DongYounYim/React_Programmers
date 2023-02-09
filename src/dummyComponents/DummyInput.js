import { useRef, useImperativeHandle, forwardRef } from "react";
// useImperativeHandle
// 라이브러리에서 사용될만한 특수한 컴포넌트에서 쓰이는 훅
// ref를 통해 사용자정의함수를 만들어 상위컴포넌트에 전달하는데
// 상위컴포넌트에서 하위컴포넌트에 함수로 핸들링함
const DummyInput = forwardRef((_, ref) => {
  const inputRef = useRef();
  //상위컴포넌트에서 하위컴포넌트를 이용하기 위한 함수를 정의하는 훅
  useImperativeHandle(ref, () => ({
    clear: () => {
      inputRef.current.value = "";
    },
    focus: () => {
      inputRef.current.focus();
    },
  }));
  return (
    <>
      Input: <input ref={inputRef} />
    </>
  );
});

export default DummyInput;
