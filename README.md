# Basic Carousel

A Basic carousel implementation using react, typescript and css.

## Usage

- Install the package

```
npm i --save @niki4810/basic-carousel
```

- Import the component in your code

```
import {BasicCarouse} from "@niki4810/basic-carousel"
```

- Render the carousel

```
const Parent = () => {
  return (
      <BasicCarousel>
        <div>Tile 1</div>
        <div>Tile 2</div>
        <div>Tile 3</div>
        <div>Tile 4</div>
        <div>Tile 5</div>
      </BasicCarousel>
  );
}
```
- Import the styles in your root css file:

```
@import '@niki4810/basic-carousel/dist/basic-carousel.css';
```