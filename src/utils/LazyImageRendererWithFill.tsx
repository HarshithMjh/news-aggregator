import React, { useCallback, useEffect, useState } from "react";
import useIntersection from "./useIntersection.ts";
import "./LazyImageRendererWithFill.scss";

type LazyImageRendererProps = {
  url: string;
  id: string;
  altText: string;
};

const LazyImageRenderer: React.FC<LazyImageRendererProps> = ({
  id,
  url,
  altText,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isImageNotAvailable, setIsImageNotAvailable] = useState(false);
  const imgRef = React.useRef<HTMLDivElement>(null);

  useIntersection(
    imgRef,
    () => {
      setIsInView(true);
    },
    true,
  );

  const handleImageFetchError = useCallback(() => {
    setIsImageNotAvailable(true);
  }, []);

  useEffect(() => {
    if (!url) {
      setIsImageNotAvailable(true);
    }
  }, [url]);

  return (
    <div
      className="lazyImageRendererContainer"
      id={`lazy-image-${id}`}
      ref={imgRef}
    >
      {isInView && !isImageNotAvailable && (
        <>
          <img
            className="background-image"
            src={url}
            alt={altText}
            onError={handleImageFetchError}
          />
          <img
            className="foreground-image"
            src={url}
            alt={altText}
            onError={handleImageFetchError}
          />
        </>
      )}
      {isImageNotAvailable && (
        <div className="lazyImageNotAvailable">{altText}</div>
      )}
    </div>
  );
};

export default LazyImageRenderer;
