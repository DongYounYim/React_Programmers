import styled from "styled-components";

// feather-icons 설치후 사용
const IcontWrapper = styled.i`
  display: inline-block;
`;

const Icon = ({
  name,
  size = 16,
  strokeWidth = 2,
  rotate,
  color = "#222",
  ...props
}) => {
  const shapeStyle = {
    width: size,
    height: size,
    transform: rotate ? `rotate(${rotate}deg)` : undefined,
  };
  const iconStyle = {
    "stroke-width": strokeWidth,
    stroke: color,
    width: size,
    height: size,
  };

  const icon = require("feather-icons").icons[name];
  const svg = icon ? icon.toSvg(iconStyle) : "";
  const decode = decodeURIComponent(encodeURIComponent(svg));
  const base64 = btoa(decode);
  return (
    <IcontWrapper style={shapeStyle}>
      <img src={`data:image/svg+xml;base64,${base64}`} alt={name} />
    </IcontWrapper>
  );
};

export default Icon;
