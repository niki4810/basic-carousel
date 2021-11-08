import "@testing-library/jest-dom";
import React, { FC } from "react";
import { render, screen, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BasicCarousel } from "./basic-carousel";
import { BasicCarouselProps, PaginationButtonPositions } from "../types";

const TestCarouselComponet: FC<Partial<BasicCarouselProps>> = ({
  onSlideChange,
  showPaginationButtons,
  showPaginationDots,
  paginationButtonsPosition,
}) => {
  const tiles = new Array(7).fill("").map((_, i) => `Tile - ${i}`);

  return (
    <div style={{ width: "1300px", height: "800px" }}>
      <BasicCarousel
        onSlideChange={onSlideChange}
        showPaginationButtons={showPaginationButtons}
        showPaginationDots={showPaginationDots}
        paginationButtonsPosition={paginationButtonsPosition}
      >
        {tiles.map((tile, i) => {
          return (
            <div
              key={tile}
              style={{
                width: "250px",
                height: "350px",
                background: "#dce4ef",
                color: "#212121",
                border: "5px dashed #212121",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "28px",
              }}
            >
              {tile}
            </div>
          );
        })}
      </BasicCarousel>
    </div>
  );
};

describe("When the carousel is rendered", () => {
  let slideChangeCb: jest.Mock<any, any>;
  let renderResult: RenderResult;
  beforeAll(() => {
    window.scrollTo = jest.fn();
    // Mock IntersectionObserver
    class IntersectionObserver {
      observe = jest.fn();
      disconnect = jest.fn();
      unobserve = jest.fn();
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });

    Object.defineProperty(global, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: IntersectionObserver,
    });
  });

  afterAll(() => {
    slideChangeCb.mockRestore();
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    jest.useFakeTimers();
    slideChangeCb = jest.fn();
    renderResult = await render(
      <TestCarouselComponet onSlideChange={slideChangeCb} />
    );
  });

  it("should render correct number of tiles", () => {
    expect(screen.getByText(`Tile - 0`)).toBeInTheDocument();
    expect(screen.getByText(`Tile - 6`)).toBeInTheDocument();
  });

  it("should display correct pagination buttons and dots", () => {
    expect(screen.queryByRole("button", { name: "<" })).not.toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByRole("button", { name: ">" })).toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByLabelText("slide 0")).toHaveClass(
      "basic_carousel__dots--active"
    );
  });

  it("should paginate correctly", () => {
    // paginate forward
    userEvent.click(screen.getByRole("button", { name: ">" }));
    expect(screen.getByRole("button", { name: "<" })).toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByRole("button", { name: ">" })).toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByLabelText("slide 100")).toHaveClass(
      "basic_carousel__dots--active"
    );
    expect(slideChangeCb).toHaveBeenCalledWith([1]);
    slideChangeCb.mockReset();
    // paginate backwards
    userEvent.click(screen.getByRole("button", { name: "<" }));
    expect(screen.queryByRole("button", { name: "<" })).not.toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByRole("button", { name: ">" })).toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByLabelText("slide 0")).toHaveClass(
      "basic_carousel__dots--active"
    );
    expect(slideChangeCb).toHaveBeenCalledWith([0]);
    slideChangeCb.mockReset();
    // paginate using dots
    userEvent.click(screen.getByLabelText("slide 1"));
    expect(screen.getByRole("button", { name: "<" })).toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByRole("button", { name: ">" })).toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByLabelText("slide 1")).toHaveClass(
      "basic_carousel__dots--active"
    );
    expect(slideChangeCb).toHaveBeenCalledWith([1]);
    slideChangeCb.mockReset();
  });

  it("should hide pagination button container when showPaginationButtons prop is set to false", () => {
    renderResult.rerender(
      <TestCarouselComponet showPaginationButtons={false} />
    );
    expect(screen.getByTestId("previous-btn-container")).toHaveClass(
      "basic_carousel__btn--container-no-width"
    );
    expect(screen.getByRole("button", { name: "<" })).not.toHaveClass(
      "basic_carousel__btn--active"
    );
    expect(screen.getByTestId("next-btn-container")).toHaveClass(
      "basic_carousel__btn--container-no-width"
    );
    expect(screen.getByRole("button", { name: ">" })).not.toHaveClass(
      "basic_carousel__btn--active"
    );
  });

  it("should hide pagination dots container when showPaginationDots prop is set to false", () => {
    renderResult.rerender(<TestCarouselComponet showPaginationDots={false} />);
    expect(
      screen.queryByTestId("pagination-dots-container")
    ).not.toBeInTheDocument();
  });

  it("should apply correct classes when the paginationButtonsPosition is set to onTop", () => {
    renderResult.rerender(
      <TestCarouselComponet
        paginationButtonsPosition={PaginationButtonPositions.onTop}
      />
    );

    expect(screen.getByTestId("previous-btn-container")).toHaveClass(
      "basic_carousel__btn--container-no-width"
    );
    expect(screen.getByRole("button", { name: "<" })).toHaveClass(
      "basic_carousel__btn--positioned"
    );
    expect(screen.getByTestId("next-btn-container")).toHaveClass(
      "basic_carousel__btn--container-no-width"
    );
    expect(screen.getByRole("button", { name: ">" })).toHaveClass(
      "basic_carousel__btn--positioned"
    );
  });
});
