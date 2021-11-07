import React from "react";
import { Meta, Story } from "@storybook/react";
import {
  BasicCarousel,
  BasicCarouselProps,
  PaginationButtonPositions,
} from "../src/index";

const meta: Meta = {
  title: "Basic Carousel Framework",
  component: BasicCarousel,
  argTypes: {},
  parameters: {
    controls: { expanded: false },
  },
};

export default meta;

const Template: Story<
  BasicCarouselProps & { styleFn: (i: number) => Record<string, unknown> }
> = (args) => {
  // Styles not part of carousel props, just used as a example in storybook to keep things DRY
  const {
    styleFn = () => ({}),
    showPaginationButtons = true,
    showPaginationDots = true,
    paginationButtonsPosition = PaginationButtonPositions.outside,
    onSlideChange = () => {},
  } = args;
  const tiles = new Array(26).fill("").map((_, i) => `Tile - ${i}`);

  return (
    <BasicCarousel
      showPaginationButtons={showPaginationButtons}
      showPaginationDots={showPaginationDots}
      paginationButtonsPosition={paginationButtonsPosition}
      onSlideChange={onSlideChange}
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
              ...styleFn(i),
            }}
          >
            {tile}
          </div>
        );
      })}
    </BasicCarousel>
  );
};

export const Default = Template.bind({});
Default.storyName = "Carousel with equal width tiles";
Default.args = {
  styleFn: () => ({
    width: "250px",
  }),
};

export const WithSlideChangeCallback = Template.bind({});
WithSlideChangeCallback.storyName =
  "Carousel with slide change callback to view the visibile tile indexes";
WithSlideChangeCallback.args = {
  styleFn: () => ({
    onSlideChange: (tileIndexes: number[]) => {
      console.log(`Visible tile indexes: ${tileIndexes}`);
    },
  }),
};

export const UnequalWidth = Template.bind({});
UnequalWidth.storyName = "Carousel with unequal width tiles";
UnequalWidth.args = {
  styleFn: (i) => ({
    width:
      i == 4 || i === 7 || i == 8 ? "475px" : i === 17 ? "1300px" : "250px",
  }),
};

export const OverflowingWidthTiles = Template.bind({});
OverflowingWidthTiles.storyName =
  "Carousel where tile widths are greater than carousel viewport width";
OverflowingWidthTiles.args = {
  styleFn: (i) => ({
    width: "1300px",
  }),
};

export const WithoutPaginationButtons = Template.bind({});
WithoutPaginationButtons.storyName = "Carousel without pagination buttons";
WithoutPaginationButtons.args = {
  showPaginationButtons: false,
};

export const WithoutPaginationDots = Template.bind({});
WithoutPaginationDots.storyName = "Carousel without pagination dots";
WithoutPaginationDots.args = {
  showPaginationDots: false,
};

export const PaginationButtonsOnTop = Template.bind({});
PaginationButtonsOnTop.storyName =
  "Carousel with pagination buttons on top of the carousel";
PaginationButtonsOnTop.args = {
  paginationButtonsPosition: PaginationButtonPositions.onTop,
};
