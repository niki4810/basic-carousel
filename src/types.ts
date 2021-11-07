import { ReactNode } from "react";

export enum PaginationButtonPositions {
  outside = "outside",
  onTop = "onTop",
}

export type BasicCarouselProps = {
  children: ReactNode;
  /*Determines if left and right chevron pagination buttons should be rendered. Defaults to true */
  showPaginationButtons?: boolean;
  /* Determines if left and  right chevron pagination buttons should be rendered outside the carousel or on top of the carousel. Defaults to outside*/
  paginationButtonsPosition?: PaginationButtonPositions;
  /* Determines if the bottom pagination dots should be rendered. Defaults to true */
  showPaginationDots?: boolean;
  /* 
    A callback function that returns an array of child tile indexes fully visible in the carousel viewport.
    Dispatched once when the slides are calculated (like the initial mount), everytime when slides are changed due to pagination
    or resizing of the window. This is provided as a handle to identify which tiles are fully visible to users so that the consumers
    can take further actions as per the application needs.
  */
 onSlideChange?: (tileIndexes: number[]) => void;
};

export type BasicCarouselState = {
    currentSlideIndex: number;
    totalNoOfSlides: number;
    scrollPoints: number[];
    isScrolling: boolean;
}
