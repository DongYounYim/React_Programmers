import { useState, useEffect, useCallback } from "react";
import { v4 } from "uuid";
import ToastItem from "./ToastItem";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1500;
`;

const ToastManager = ({ bind }) => {
  const [toasts, setToasts] = useState([]);

  const createToast = useCallback((message, duration) => {
    const newToast = {
      id: v4(),
      message,
      duration,
    };
    setToasts((oldToast) => [...oldToast, newToast]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((oldToast) => oldToast.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    console.log("test");
    bind(createToast);
  }, [bind, createToast]);

  return (
    <Container>
      {toasts.map(({ id, message, duration }) => (
        <ToastItem
          message={message}
          duration={duration}
          key={id}
          onDone={() => removeToast(id)}
        />
      ))}
    </Container>
  );
};

export default ToastManager;
