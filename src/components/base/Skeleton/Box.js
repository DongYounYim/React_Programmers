import styled from "styled-components";
import Base from "./Base";

const Box = styled(Base)`
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  height: ${({ height }) =>
    typeof height === "number" ? `${height}px` : height};
`;

export default Box;
