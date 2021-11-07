import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BasicCarousel } from "./basic-carousel";

const TestCarouselComponet = () => {
  const tiles = new Array(7).fill("").map((_, i) => `Tile - ${i}`);

  return (
    <div style={{ width: "1300px", height: "800px" }}>
      <BasicCarousel>
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
  beforeAll(() => {
    window.scrollTo = jest.fn()
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
    jest.clearAllMocks();
  });

  beforeEach(async () => {
    jest.useFakeTimers();
    await render(<TestCarouselComponet />);
  });

  it("should render correct number of tiles", () => {
    expect(screen.getByText(`Tile - 0`)).toBeInTheDocument();
    expect(screen.getByText(`Tile - 6`)).toBeInTheDocument();
  });

  it("should display correct pagination buttons and dots", () => {
    expect(screen.queryByRole("button", {name: "<"})).not.toHaveClass("basic_carousel__btn--active");
    expect(screen.getByRole("button", {name: ">"})).toHaveClass("basic_carousel__btn--active");
    expect(screen.getByLabelText("slide 0")).toHaveClass("basic_carousel__dots--active");
  });

  it("should paginate correctly", () => {
    // paginate forward
    userEvent.click(screen.getByRole("button", {name: ">"}));
    expect(screen.getByRole("button", {name: "<"})).toHaveClass("basic_carousel__btn--active");
    expect(screen.getByRole("button", {name: ">"})).toHaveClass("basic_carousel__btn--active");
    expect(screen.getByLabelText("slide 1")).toHaveClass("basic_carousel__dots--active");

    // paginate backwards
    userEvent.click(screen.getByRole("button", {name: "<"}));
    expect(screen.queryByRole("button", {name: "<"})).not.toHaveClass("basic_carousel__btn--active");
    expect(screen.getByRole("button", {name: ">"})).toHaveClass("basic_carousel__btn--active");
    expect(screen.getByLabelText("slide 0")).toHaveClass("basic_carousel__dots--active");

    // paginate using dots
    userEvent.click(screen.getByLabelText("slide 1"));
    expect(screen.getByRole("button", {name: "<"})).toHaveClass("basic_carousel__btn--active");
    expect(screen.getByRole("button", {name: ">"})).toHaveClass("basic_carousel__btn--active");
    expect(screen.getByLabelText("slide 1")).toHaveClass("basic_carousel__dots--active");
  });
});
