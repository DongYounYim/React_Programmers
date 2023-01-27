import styled from "styled-components";
import ImageComponent from "../Image";
import AvatarGroup from "./AvatarGroup";
import PropTypes from "prop-types";

import { useState, useEffect } from "react";

const ShapeToCssValue = {
  circle: "50%",
  round: "4px",
  square: "0px",
};

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  border: 1px solid #dadada;
  border-radius: ${({ shape }) => ShapeToCssValue[shape]};
  overflow: hidden;
  background-color: #eee;
  > img {
    transition: opacity 0.2s ease-out;
  }
`;

const Avatar = ({
  lazy,
  threshold,
  src,
  size = 70,
  shape = "circle", // round, square
  placeholder,
  alt,
  mode = "dover",
  __TYPE = "Avatar", // 내부에서만 사용하겠다는 표시
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => setLoaded(true);
  }, []);
  return (
    <AvatarWrapper {...props} shape={shape}>
      <ImageComponent
        block
        lazy={lazy}
        threshold={threshold}
        width={size}
        height={size}
        src={src}
        placeholder={placeholder}
        alt={alt}
        mode={mode}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </AvatarWrapper>
  );
};

Avatar.defaultProps = {
  __TYPE: "Avatar",
};

Avatar.Group = AvatarGroup;

export default Avatar;
