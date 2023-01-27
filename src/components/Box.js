const Box = ({ block, style }) => {
  return (
    <div
      style={{
        display: block ? "block" : "inline-block",
        width: 100,
        height: 100,
        backgroundColor: "blue",
        ...style,
      }}
    ></div>
  );
};

export default Box;
