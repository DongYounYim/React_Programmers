import styled from "styled-components";
import useHover from "../hooks/useHover";
import useScroll from "../hooks/useScroll";
import useKey from "../hooks/useKey";
import useKeyPress from "../hooks/useKeyPress";
import { useState } from "react";
import useClickAway from "../hooks/useClickAway";
import useResize from "../hooks/useResize";
import useForm from "../hooks/useForm";
import useTimeoutFn from "../hooks/useTimeoutFn";
import useTimeout from "../hooks/useTimeout";
import useIntervalFn from "../hooks/useIntervalFn";
import useInterval from "../hooks/useInterval";
import useDebounce from "../hooks/useDebounce";
import useAsyncFn from "../hooks/useAsyncFn";
import useHotKey from "../hooks/useHotKey";

import Image from "../components/Image";
import { Fragment } from "react";

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
`;

const ScrollBox = styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  overflow: auto;
`;

const Inner = styled.div`
  width: 10000px;
  height: 10000px;
  background-image: linear-gradient(180deg, #000 0%, #fff 100%);
`;

const Popover = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: #eee;
`;

const Background = styled.div`
  width: 100%;
  height: 400px;
  background-color: blue;
`;

const sleep = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 1000);
  });
};

const companies = [
  "Cobalt",
  "Grepp",
  "Kakao",
  "Naver",
  "Daangn",
  "Coupang",
  "Line",
  "Woowahan",
];

const asyncReturnValue = () => {
  return new Promise((reslove) => {
    setTimeout(() => {
      reslove("Success");
    }, 1000);
  });
};

const asyncReturnError = () => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject("Error");
    }, 1000);
  });
};

const HooksTest = () => {
  const [ref, hover] = useHover();
  const [scrollRef, coord] = useScroll();
  useKey("keydown", "f", () => {
    alert("f key down");
  });
  useKey("keyup", "q", () => {
    alert("q key up");
  });
  const pressed = useKeyPress("?");

  const [show, setShow] = useState(false);
  const popRef = useClickAway((e) => {
    if (e.target.tagName !== "BUTTON") {
      setShow(false);
    }
  });
  const [imageSize, setImageSize] = useState({ width: 0, hegiht: 0 });
  const resizeRef = useResize((rect) => {
    setImageSize({ width: rect.width, hegiht: rect.height });
  });

  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await sleep();
      alert(JSON.stringify(values));
    },
    validate: ({ email, password }) => {
      const errors = {};
      if (!email) errors.eamil = "이메일을 입력해주세요";
      if (!password) errors.password = "비밀번호를 입력해주세요";
      if (!/^.+@.+\..+$/.test(email))
        errors.email = "올바른 이메일을 입력해주세요";
      return errors;
    },
  });

  const [run, clear] = useTimeoutFn(() => {
    alert("실행!");
  }, 3000);
  // story를 모아놨기 때문에 주석처리했음
  // 화면이 뜨자마자 3초뒤 실행되는 것을 보고 싶으면 해제
  let clearB; // <= 지울 것
  // const clearB = useTimeout(() => {
  //   alert("실행B");
  // }, 3000);

  const [array, setArray] = useState([]);
  const [runInterval, clearInterval] = useIntervalFn(() => {
    setArray([...array, "추가됨"]);
  }, 1000);
  // story를 모아놨기 때문에 주석처리22
  // 화면이 뜨자마자 interval을 보고 싶으면 해제
  let arrayB; // <= 지울것
  let clearIntervalB; // <= 지울것
  // const [arrayB, setArrayB] = useState([]);
  // const clearIntervalB = useInterval(() => {
  //   setArrayB([...arrayB, "추가됨"]);
  // }, 1000);
  const [searchVal, setSearchVal] = useState("");
  const [result, setResult] = useState([]);

  useDebounce(
    () => {
      if (searchVal === "") setResult([]);
      else
        setResult(
          companies.filter((company) =>
            company.toLowerCase().includes(searchVal.toLowerCase())
          )
        );
    },
    300,
    [searchVal]
  );

  const [asyncState, asyncCallback] = useAsyncFn(async () => {
    return await asyncReturnValue();
  }, []);

  const [asyncStateB, asyncCallbackB] = useAsyncFn(async () => {
    return await asyncReturnError();
  }, []);

  const hotkeys = [
    {
      global: true,
      combo: "meta+o",
      onKeyDown: (e) => {
        alert("meta+o");
      },
    },
    {
      global: true,
      combo: "esc",
      onKeyDown: (e) => {
        alert("esc");
      },
    },
  ];

  useHotKey(hotkeys);

  return (
    <>
      <Box ref={ref} />
      {hover ? <div>ToolTip!</div> : null}
      <ScrollBox ref={scrollRef}>
        <Inner />
      </ScrollBox>
      <button
        onClick={() => {
          scrollRef.current.scrollTo({
            top: 2000,
            left: 2000,
            behavior: "smooth",
          });
        }}
      >
        Scroll
      </button>
      {coord.x}, {coord.y}
      <br />
      {pressed ? "Peek-A-Boo!" : "Press ? key"}
      <br />
      <div>
        <button onClick={() => setShow(true)}>Show</button>
        <Popover ref={popRef} style={{ display: show ? "block" : "none" }}>
          Popover
        </Popover>
      </div>
      <div>
        <span>debounceTest</span>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <div>
          {result.map((item) => (
            <Fragment key={item}>
              {item}
              <br />
            </Fragment>
          ))}
        </div>
      </div>
      <Background ref={resizeRef}>
        <Image
          width={imageSize.width}
          height={imageSize.hegiht}
          src="https://picsum.photos/1000"
          mode="contain"
        />
      </Background>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email}
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          {errors.password}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loadding..." : "Submit"}
        </button>
      </form>
      <div>
        <div>useTimeoutFn 테스트</div>
        <button onClick={run}>3초 뒤 실행!</button>
        <button onClick={clear}>멈춰!</button>
      </div>
      <div>
        <div>useTimeout 테스트</div>
        <button onClick={clearB}>멈춰!</button>
      </div>
      <div>
        <div>useIntervalFn 테스트</div>
        <div>{array}</div>
        <button onClick={runInterval}>1초마다 추가!</button>
        <button onClick={clearInterval}>취소</button>
      </div>
      <div>
        <div>useInterval 테스트</div>
        <div>{arrayB}</div>
        <button onClick={clearIntervalB}>취소</button>
      </div>
      <div>
        <div>useAsyncFn 테스트</div>
        <div>{JSON.stringify(asyncState)}</div>
        <button onClick={asyncCallback} disabled={asyncState.isLoading}>
          비동기 호출 성공
        </button>
        <div>{JSON.stringify(asyncStateB)}</div>
        <button onClick={asyncCallbackB} disabled={asyncStateB.isLoading}>
          비동기 호출 에러
        </button>
      </div>
      <div>
        <div>useHotKey 테스트</div>
      </div>
    </>
  );
};

export default HooksTest;
