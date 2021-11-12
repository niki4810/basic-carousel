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
import "./node_modules/@niki4810/basic-carousel/basic-carousel.css"
```

> You may need to adjust the path to node_modules based on where your root css file is located