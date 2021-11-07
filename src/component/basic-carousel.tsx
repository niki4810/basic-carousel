import React, { FC, useRef } from "react";
import { BasicCarouselProps, PaginationButtonPositions } from "../types";
import { useCarouselStateCalculator } from "./hooks/use-carousel-state";
import { useInterSectionObserver } from "./hooks/use-intersection-observer";
import { useScroll } from "./hooks/use-scroll";

/**
 * A Basic carousel component in React
 */
export const BasicCarousel: FC<BasicCarouselProps> = ({
  children,
  showPaginationButtons = true,
  showPaginationDots = true,
  paginationButtonsPosition = PaginationButtonPositions.outside,
  onSlideChange = () => {},
}) => {
  /* Hooks */
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const { carouselState, setCarouselState } = useCarouselStateCalculator(
    carouselContainerRef,
    (scrollPoints: number[]) => {
      if (scrollPoints.length > 0) {
        getVisibleTileIndexes(0, 0, scrollPoints);
      }
    }
  );
  useScroll(carouselContainerRef, carouselState, setCarouselState);

  useInterSectionObserver(
    carouselContainerRef,
    carouselState,
    setCarouselState,
    (slideIndex: number) => {
      let nextTileIndex = carouselState.scrollPoints[slideIndex];
      if (nextTileIndex !== null && nextTileIndex !== undefined) {
        getVisibleTileIndexes(
          slideIndex,
          nextTileIndex,
          carouselState.scrollPoints
        );
      }
    }
  );

  /* Visibility variables */
  const { totalNoOfSlides, currentSlideIndex, scrollPoints } = carouselState;
  const displayPrev =
    showPaginationButtons && totalNoOfSlides > 1 && currentSlideIndex > 0;
  const displayNext =
    showPaginationButtons &&
    totalNoOfSlides > 1 &&
    currentSlideIndex + 1 !== totalNoOfSlides;
  const displayPaginationDots = showPaginationDots && scrollPoints.length > 1;
  const paginationButtonsOnTop =
    paginationButtonsPosition === PaginationButtonPositions.onTop;

  /* Helpers */
  function getVisibleTileIndexes(
    slideIndex: number,
    nextTileIndex: number,
    scrollPoints: number[]
  ) {
    const tileIndex = scrollPoints[slideIndex];
    const visibleTileIndexes: number[] = [];
    if (tileIndex !== null && tileIndex !== undefined) {
      let nextSlideIndex = slideIndex + 1;
      if (
        carouselContainerRef.current &&
        tileIndex === scrollPoints[scrollPoints.length - 1]
      ) {
        nextTileIndex = carouselContainerRef.current?.children.length;
      } else {
        nextTileIndex = scrollPoints[nextSlideIndex];
      }

      if (nextTileIndex) {
        for (let i = tileIndex; i < nextTileIndex; i++) {
          visibleTileIndexes.push(i);
        }
      }
    }
    onSlideChange(visibleTileIndexes);
  }

  const navigateToSlideBySlideIndex = (slideIndex: number) => {
    const { scrollPoints, currentSlideIndex } = carouselState;
    const nextTileIndex = scrollPoints[slideIndex];
    if (nextTileIndex !== null && nextTileIndex !== undefined) {
      const carouselTile = carouselContainerRef.current?.children[
        nextTileIndex
      ] as HTMLElement;

      const parentEl = carouselTile.offsetParent as HTMLElement;

      if (typeof carouselContainerRef.current?.scrollTo === "function") {
        carouselContainerRef.current?.scrollTo({
          left: carouselTile.offsetLeft - (parentEl?.offsetLeft ?? 0), // ct.offsetleft - ct.offsetwidth previously
          behavior: "smooth",
        });
      }

      if (currentSlideIndex !== slideIndex) {
        getVisibleTileIndexes(slideIndex, nextTileIndex, scrollPoints);
        setCarouselState((prevState) => {
          return {
            ...prevState,
            currentSlideIndex: slideIndex,
          };
        });
      }
    }
  };

  const navigateSlides = (direction: "forward" | "backwards") => {
    const currentSlideIndex = carouselState.currentSlideIndex;
    const nextSlideIndex =
      direction === "forward" ? currentSlideIndex + 1 : currentSlideIndex - 1;
    navigateToSlideBySlideIndex(nextSlideIndex);
  };

  /* Event Handlers */
  const handlePrevClick = () => {
    navigateSlides("backwards");
  };

  const handleNextClick = () => {
    navigateSlides("forward");
  };

  const handleSlideClick = (slideIndex: number) => {
    navigateToSlideBySlideIndex(slideIndex);
  };

  /* Mapping passed Children */
  // Wrap each passed in child in a secion tag. As we will add/remove
  // style attributes related to scrolling on each tile, wrapping it in
  // a parent container i.e. a section tag in this case will ensure
  // we don't mutate any attributes of the passed in child html elements.
  const transformedChildren = React.Children.map(children, (child, i) => {
    return (
      <section
        className="basic_carousel__tile"
        data-tile-id={i}
        key={`tile-${i}`}
      >
        {child}
      </section>
    );
  });

  /* Render */
  return (
    <div className="basic_carousel__viewport">
      <div className="basic_carousel__viewport--inner">
        <div
          className={`basic_carousel__btn--container ${
            paginationButtonsOnTop || !showPaginationButtons
              ? "basic_carousel__btn--container-no-width"
              : ""
          }`}
        >
          <button
            className={`basic_carousel__btn basic_carousel__btn--prev ${
              displayPrev ? "basic_carousel__btn--active" : ""
            } ${
              paginationButtonsOnTop ? "basic_carousel__btn--positioned" : ""
            }`}
            onClick={handlePrevClick}
          >
            &lt;
          </button>
        </div>
        <div className="basic_carousel__container" ref={carouselContainerRef}>
          {transformedChildren}
        </div>
        <div
          className={`basic_carousel__btn--container ${
            paginationButtonsOnTop || !showPaginationButtons
              ? "basic_carousel__btn--container-no-width"
              : ""
          }`}
        >
          <button
            className={`basic_carousel__btn basic_carousel__btn--next ${
              displayNext ? "basic_carousel__btn--active" : ""
            } ${
              paginationButtonsOnTop ? "basic_carousel__btn--positioned" : ""
            }`}
            onClick={handleNextClick}
          >
            &gt;
          </button>
        </div>
      </div>
      {displayPaginationDots && (
        <div className="basic_carousel__dots--container">
          {scrollPoints.map((_: number, i: number) => {
            const paginationDotsClass = `basic_carousel__dots ${
              currentSlideIndex === i ? "basic_carousel__dots--active" : ""
            }`;
            return (
              <button
                key={`slide-pagination-dot-${i}`}
                aria-label={`slide ${i}`}
                className={paginationDotsClass}
                onClick={() => {
                  handleSlideClick(i);
                }}
              ></button>
            );
          })}
        </div>
      )}
    </div>
  );
};
