import {useState, useEffect} from "react";
import { BasicCarouselState } from "../../types";

export const useCarouselStateCalculator = (
    carouselContainerRef: React.RefObject<HTMLDivElement>,
    onScrollPointCalculationComplete: (scrollPoints: number[]) => void
) => {
    const [carouselState, setCarouselState] = useState<BasicCarouselState>(() => {
      return {
        currentSlideIndex: 0,
        totalNoOfSlides: 1,
        scrollPoints: [],
        isScrolling: false
      };
    });
  
    useEffect(() => {
      function calculateSlides() {
        if(!carouselContainerRef.current) return;
        const CAROUSEL_OFFSET_MARGIN = 10;
        const carouselContainerWidth = carouselContainerRef.current.getBoundingClientRect().width + CAROUSEL_OFFSET_MARGIN;
        const carouselChildren = carouselContainerRef.current?.children;
  
        let totalNoOfSlides = 0;
        let totalWidthSoFar = 0;
        let scrollPoints: number[] = [0];
        carouselChildren[0].setAttribute("style", "scroll-snap-align:start;");
        
        for(let i=0;i<carouselChildren.length;i++) {
          const child = carouselChildren[i] as HTMLElement;
          const childWidth = child.getBoundingClientRect().width;
          totalWidthSoFar += (childWidth + CAROUSEL_OFFSET_MARGIN);
          if(totalWidthSoFar >= carouselContainerWidth) {
            totalWidthSoFar = 0;
            totalWidthSoFar = totalWidthSoFar + childWidth;
            if(i!==0) {
              scrollPoints.push(i);
            }
            child.setAttribute("style", "scroll-snap-align:start;");
          }
        }
        totalNoOfSlides = scrollPoints.length;
        onScrollPointCalculationComplete(scrollPoints);
        setCarouselState((prevState) => {
          return {
            ...prevState,
            totalNoOfSlides,
            scrollPoints
          };
        });
  
        const carouselTile = carouselContainerRef.current.children[0] as HTMLElement;
        if(typeof carouselContainerRef.current.scrollTo === "function") {
          carouselContainerRef.current.scrollTo({
            left: carouselTile.offsetLeft ?? 0,
            behavior: "smooth"
          });
        }
      }
  
      /* On resize recalculate carousel slides */
      let timeout: number;
      function handleResize() {
        if(timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          calculateSlides();
        }, 300) as unknown as number;
      }
  
      calculateSlides();
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      }
    }, [carouselContainerRef]);
  
    return {
      carouselState,
      setCarouselState
    };
  }