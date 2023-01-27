import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";

// 바깥쪽에서 만드는 이유는
// 모듈내에서 전역적으로 사용하고
// 새로 생성되더라도 다시 생성하지 않도록
let observer = null;
const LOAD_IMG_EVENT_TYPE = "loadImage";

const onIntersection = (entries, io) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      io.unobserve(entry.target);
      entry.target.dispatchEvent(new CustomEvent(LOAD_IMG_EVENT_TYPE));
    }
  });
};

const Image = ({
  lazy,
  threshold = 0.5,
  placeholder,
  src,
  block,
  width,
  height,
  alt,
  mode,
  ...props
}) => {
  const imageStyle = {
    display: block ? "block" : undefined,
    width,
    height,
    objectFit: mode, //cover, fill, contain
  };
  // Intersection observer를 이용한 lazy loading
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!lazy) {
      setLoaded(true);
      return;
    }
    const handleLoadImage = () => setLoaded(true);

    const imgElement = imgRef.current;
    imgElement &&
      imgElement.addEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);

    return () => {
      imgElement &&
        imgElement.removeEventListener(LOAD_IMG_EVENT_TYPE, handleLoadImage);
    };
  }, [lazy]);
  //옵저버 부분
  useEffect(() => {
    if (!lazy) return;

    if (!observer) {
      observer = new IntersectionObserver(onIntersection, { threshold });
    }
    imgRef.current && observer.observe(imgRef.current);
  }, [lazy, threshold]);

  return (
    <img
      src={loaded ? src : placeholder}
      style={{ ...props.style, ...imageStyle }}
      alt={alt}
      ref={imgRef}
    />
  );
};

Image.propTypes = {
  lazy: PropTypes.bool,
  placeholder: PropTypes.string,
  threshold: PropTypes.number,
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  alt: PropTypes.string,
  mode: PropTypes.string,
  block: PropTypes.bool,
};

export default Image;
