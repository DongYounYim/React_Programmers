import styled from "styled-components";
import useHover from "../hooks/useHover";
import useScroll from "../hooks/useScroll";
import useKey from "../hooks/useKey";
import useKeyPress from "../hooks/useKeyPress";
import { useState, useRef } from "react";
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

import { Image } from "../components";
import { Fragment } from "react";
import DummyInput from "../dummyComponents/DummyInput";

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
      if (!email) errors.eamil = "???????????? ??????????????????";
      if (!password) errors.password = "??????????????? ??????????????????";
      if (!/^.+@.+\..+$/.test(email))
        errors.email = "????????? ???????????? ??????????????????";
      return errors;
    },
  });

  const [run, clear] = useTimeoutFn(() => {
    alert("??????!");
  }, 3000);
  // story??? ???????????? ????????? ??????????????????
  // ????????? ???????????? 3?????? ???????????? ?????? ?????? ????????? ??????
  let clearB; // <= ?????? ???
  // const clearB = useTimeout(() => {
  //   alert("??????B");
  // }, 3000);

  const [array, setArray] = useState([]);
  const [runInterval, clearInterval] = useIntervalFn(() => {
    setArray([...array, "?????????"]);
  }, 1000);
  // story??? ???????????? ????????? ????????????22
  // ????????? ???????????? interval??? ?????? ????????? ??????
  let arrayB; // <= ?????????
  let clearIntervalB; // <= ?????????
  // const [arrayB, setArrayB] = useState([]);
  // const clearIntervalB = useInterval(() => {
  //   setArrayB([...arrayB, "?????????"]);
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

  // useImperativeHandle
  // ????????????????????? ??????????????? ????????? ?????????????????? ????????? ???
  // ref??? ?????? ???????????????????????? ????????? ????????????????????? ???????????????
  // ???????????????????????? ????????????????????? ????????? ????????????
  const inputRef = useRef();

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
        <div>useTimeoutFn ?????????</div>
        <button onClick={run}>3??? ??? ??????!</button>
        <button onClick={clear}>??????!</button>
      </div>
      <div>
        <div>useTimeout ?????????</div>
        <button onClick={clearB}>??????!</button>
      </div>
      <div>
        <div>useIntervalFn ?????????</div>
        <div>{array}</div>
        <button onClick={runInterval}>1????????? ??????!</button>
        <button onClick={clearInterval}>??????</button>
      </div>
      <div>
        <div>useInterval ?????????</div>
        <div>{arrayB}</div>
        <button onClick={clearIntervalB}>??????</button>
      </div>
      <div>
        <div>useAsyncFn ?????????</div>
        <div>{JSON.stringify(asyncState)}</div>
        <button onClick={asyncCallback} disabled={asyncState.isLoading}>
          ????????? ?????? ??????
        </button>
        <div>{JSON.stringify(asyncStateB)}</div>
        <button onClick={asyncCallbackB} disabled={asyncStateB.isLoading}>
          ????????? ?????? ??????
        </button>
      </div>
      <div>
        <div>useHotKey ?????????</div>
      </div>
      <div>
        <DummyInput ref={inputRef} />
        <button onClick={() => inputRef.current.focus()}>Focus</button>
        <button onClick={() => inputRef.current.clear()}>Clear</button>
      </div>
    </>
  );
};

export default HooksTest;
