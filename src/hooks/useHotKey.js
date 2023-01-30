// 복잡한 단축키를 지원하기위해 사용하는 훅
// 키보드 접근성 향상

import { useCallback, useMemo, useEffect } from "react";

const ModifierBitMasks = {
  alt: 1,
  ctrl: 2,
  meta: 4,
  shift: 8,
};

const ShiftKeys = {
  "~": "`",
  "!": "1",
  "@": "2",
  "#": "3",
  $: "4",
  "%": "5",
  "^": "6",
  "&": "7",
  "*": "8",
  "(": "9",
  ")": "0",
  _: "-",
  "+": "=",
  "{": "[",
  "}": "]",
  "|": "\\",
  ":": ";",
  '"': "'",
  "<": ",",
  ">": ".",
  "?": "/",
};

// esc, window 키 등
const Aliases = {
  win: "meta",
  window: "meta",
  cmd: "meta",
  command: "meta",
  esc: "escape",
  opt: "alt",
  option: "alt",
};

const getKeyCombo = (e) => {
  //이벤트를 받아서 처리하기 쉬운형태로 넘김

  // 스페이스바 처리
  const key = e.key !== " " ? e.key.toLowerCase() : "space";
  //컨트롤 쉬프트 등의 처리
  let modifiers = 0;
  if (e.altKey) modifiers += ModifierBitMasks.alt;
  if (e.ctrlKey) modifiers += ModifierBitMasks.ctrl;
  if (e.mataKey) modifiers += ModifierBitMasks.meta;
  if (e.shiftKey) modifiers += ModifierBitMasks.shift;

  return { modifiers, key };
};

const parseKeyCombo = (combo) => {
  // 콤보를 받아 재처리

  const pieces = combo.replace(/\s/g, "").toLowerCase().split("+");
  let modifiers = 0;
  let key;
  for (const piece of pieces) {
    if (ModifierBitMasks[piece]) {
      modifiers += ModifierBitMasks[piece];
    } else if (ShiftKeys[piece]) {
      modifiers += ModifierBitMasks.shift;
      key = ShiftKeys[piece];
    } else if (Aliases[piece]) {
      key = Aliases[piece];
    } else {
      key = piece;
    }
  }

  return { modifiers, key };
};

const comboMatches = (a, b) => {
  return a.modifiers === b.modifiers && a.key === b.key;
};

const useHotKey = (hotkeys) => {
  //글로벌이벤트와 로컬이벤트로 나뉠 수 있다.
  const localKeys = useMemo(() => hotkeys.filter((k) => !k.global), [hotkeys]);
  const globalKeys = useMemo(() => hotkeys.filter((k) => k.global), [hotkeys]);

  const invokeCallback = useCallback(
    (global, combo, callbackName, e) => {
      for (const hotkey of global ? globalKeys : localKeys) {
        // TODO 단축키를 처리한다.
        // callbackName : onKeyDown, onKeyUp
        if (comboMatches(parseKeyCombo(hotkey.combo), combo)) {
          hotkey[callbackName](e) && hotkey[callbackName](e);
        }
      }
    },
    [localKeys, globalKeys]
  );

  const handleGlobalKeyDown = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyDown", e);
    },
    [invokeCallback]
  );

  const handleGlobalKeyUp = useCallback(
    (e) => {
      invokeCallback(true, getKeyCombo(e), "onKeyUp", e);
    },
    [invokeCallback]
  );

  const handleLocalKeyDown = useCallback(
    (e) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        "onKeyDown",
        e.nativeEvent
      );
    },
    [invokeCallback]
  );

  const handleLocalKeyUp = useCallback(
    (e) => {
      invokeCallback(
        false,
        getKeyCombo(e.nativeEvent),
        "onKeyUp",
        e.nativeEvent
      );
    },
    [invokeCallback]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("keyup", handleGlobalKeyUp);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("keyup", handleGlobalKeyUp);
    };
  }, [handleGlobalKeyDown, handleGlobalKeyUp]);

  return { handleKeyDown: handleLocalKeyDown, handleKeyUp: handleLocalKeyUp };
};

/*
사용예시
const hotkeys = [
    {
        global: true
        combo: 'ctrl+k',  => 단축키의 영역
        onKeyDown: (e) => {
            alert('ctrl+k')
        }
    }
];

uesHotKey(hotkeys);
*/

export default useHotKey;
