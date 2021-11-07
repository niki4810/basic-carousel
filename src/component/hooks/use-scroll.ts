/* istanbul ignore file */

import { useEffect } from "react";
import { BasicCarouselState } from "../../types";

// Scroll Event Throttling: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#scroll_event_throttling
export const useScroll = (
  carouselContainerRef: React.RefObject<HTMLDivElement>,
  carouselState: BasicCarouselState,
  setCarouselState: React.Dispatch<React.SetStateAction<BasicCarouselState>>
) => {
  useEffect(() => {
    let animationFrameTimeout: number;

    function handleScroll() {
      const { isScrolling } = carouselState;
      if (!isScrolling) {
        if (animationFrameTimeout) cancelAnimationFrame(animationFrameTimeout);
        animationFrameTimeout = requestAnimationFrame(() => {
          setCarouselState((prevState) => {
            return {
              ...prevState,
              isScrolling: false,
            };
          });
        });

        setCarouselState((prevState) => {
          return {
            ...prevState,
            isScrolling: true,
          };
        });
      }
    }
    const container = carouselContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(animationFrameTimeout);
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [carouselContainerRef, carouselState, setCarouselState]);
};
