const ToggleContainer = ({ children }) => {
  return (
    <label
      style={{ display: "inline-block", cursor: "pointer", userSelect: "none" }}
    >
      {children}
    </label>
  );
};

export default ToggleContainer;
