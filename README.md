# Basic Carousel
![example workflow](https://github.com/niki4810/basic-carousel/actions/workflows/main.yml/badge.svg) [![npm version](https://badge.fury.io/js/@niki4810%2Fbasic-carousel.svg)](https://www.npmjs.com/package/@niki4810/basic-carousel) <a href="https://bundlephobia.com/result?p=@niki4810/basic-carousel@latest" target="\_parent">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/@niki4810/basic-carousel@latest" />
</a>

A Basic carousel implementation using react, typescript and css.

![Basic-Carousel](https://user-images.githubusercontent.com/1467801/141728652-a2dad7cd-207a-480f-a2ad-ff31e1a2f694.gif)


## Usage

- Install the package

```
npm i --save @niki4810/basic-carousel
```

- Import the component in your code

```
import {BasicCarousel} from "@niki4810/basic-carousel"
```

- Render the carousel

```
const Parent = () => {
  const tileStyles = {width: "250px",height: "350px",background: "#dce4ef",color: "#212121"};
  return (
      <BasicCarousel>
        <div style={tileStyle}>Tile 1</div>
        <div style={tileStyle}>Tile 2</div>
        <div style={tileStyle}>Tile 3</div>
        <div style={tileStyle}>Tile 4</div>
        <div style={tileStyle} >Tile 5</div>
        <div style={tileStyle} >Tile 6</div>
        <div style={tileStyle} >Tile 7</div>
        <div style={tileStyle} >Tile 8</div>
        <div style={tileStyle} >Tile 9</div>
        <div style={tileStyle} >Tile 10</div>
      </BasicCarousel>
  );
}
```
- Import the styles in your root css file:

```
@import '@niki4810/basic-carousel/dist/basic-carousel.css';
```

## Available props

Here are the available carousel props 

Prop | Description | Default 
---|---|---
showPaginationButtons | Determines if the bottom pagination buttons should be rendered. | true
paginationButtonsPosition | Determines if left and  right chevron pagination buttons should be rendered outside the carousel or on top of the carousel | PaginationButtonPositions.outside 
showPaginationDots | Determines if the bottom pagination dots should be rendered.| true
onSlideChange| A callback function that returns an array of child tile indexes fully visible in the carousel viewport.Dispatched once when the slides are calculated (like the initial mount), everytime when slides are changed due to pagination or resizing of the window. This is provided as a handle to identify which tiles are fully visible to users so that the consumers can take further actions as per the application needs. | `() => {}`


## Examples

You have view code examples by running the storybook:

- `npm run storybook`
- Visit [http://localhost:6006/](http://localhost:6006/)

