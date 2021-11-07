import {useEffect} from "react";
import { BasicCarouselState } from "../../types";
export const useInterSectionObserver = (
    carouselContainerRef: React.RefObject<HTMLDivElement>,
    carouselState: BasicCarouselState,
    setCarouselState: React.Dispatch<React.SetStateAction<BasicCarouselState>>,
    onCarouselScrolled: (slideIndex: number) => void
  ) => {
    useEffect(() => {
      const { scrollPoints, isScrolling, currentSlideIndex } = carouselState;
      let timeout: number = 0;
      let options = {
        root: carouselContainerRef.current,
        threshold: 1,
      };
  
      function observerTile(entries: IntersectionObserverEntry[]) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (timeout) clearTimeout(timeout);
            timeout = (setTimeout(() => {
              const tileId = (entry.target as HTMLElement).dataset['tileId'];
              if (tileId) {
                const newSlideIndex = scrollPoints.findIndex(
                  (id) => id === parseInt(tileId)
                );
                if (
                  !isScrolling &&
                  newSlideIndex !== -1 &&
                  currentSlideIndex !== newSlideIndex
                ) {
                  onCarouselScrolled(newSlideIndex);
                  setCarouselState((prevState) => {
                    return {
                      ...prevState,
                      currentSlideIndex: newSlideIndex,
                    };
                  });
                }
              }
            }, 300) as unknown) as number;
          }
        });
      }
  
      const observer = new IntersectionObserver(observerTile, options);
      if (carouselContainerRef.current) {
        for (let i = 0; i < scrollPoints.length; i++) {
          const point = scrollPoints[i];
          observer.observe(carouselContainerRef.current?.children[point]);
        }
      }
  
      return () => {
        clearTimeout(timeout);
        observer.disconnect();
      };
    }, [carouselContainerRef, carouselState, setCarouselState]);
  };