import ToggleContainer from "./ToggleContainer";
import styled from "styled-components";
import useToggle from "../../hooks/useToggle";
import { useEffect } from "react";

const ToggleSwitch = styled.div`
    width: 64px;
    height: 30px;
    padding: 2px;
    background-color: #ccc;
    box-sizing: border-box;
    transition: backgroundColor 0.2s ease-out;
    border-radius: 15px;

    &:after {
        content: "";
        position: relative;
        left: 0;
        display: block;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background-color: white;
        transition: left 0.2s ease-out;
      },
`;

const ToggleInput = styled.input`
  display: none;

  &:checked + div {
    background: lightgreen;
  }

  &:checked + div:after {
    left: calc(100% - 26px);
  }

  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;

    &:after {
      opacity: 0.7;
    }
  }
`;

const Toggle = ({ name, on, disabled = false, onChange, ...props }) => {
  const [checked, toggle] = useToggle(on);

  const handleChange = () => {
    toggle();
    onChange && onChange();
  };

  return (
    <ToggleContainer {...props}>
      <ToggleInput
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
};

export default Toggle;
