import React, { FC } from "react";
import { Meta } from "@storybook/react";
import {
  BasicCarousel,
  BasicCarouselProps,
  PaginationButtonPositions,
} from "../src/index";
import faker from "faker";

const meta: Meta = {
  title: "Real World Examples with Basic Carousel",
  component: BasicCarousel,
  argTypes: {},
  parameters: {
    controls: { expanded: false },
  },
};

export default meta;

type MockProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  rating: number;
};

type FilterPillProps = {
  id: string;
  text: string;
};

const MockProductTile: FC<{ product: MockProduct }> = ({ product }) => {
  return (
    <div
      style={{
        color: "#212121",
        border: "1px solid #205493",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img src={product.image} alt={product.title} width="200" height="200" />
      <p
        style={{
          fontWeight: "bold",
          fontSize: "18px",
          height: "40px",
          margin: "5px",
        }}
      >
        {product.title}
      </p>
      <div style={{ color: "#205493", fontSize: "24px", marginBottom: "5px" }}>
        {product.price}
      </div>
      <div style={{ fontSize: "16px", marginBottom: "10px" }}>
        Rating{product.rating}
      </div>
      <button
        style={{
          width: "100%",
          height: "40px",
          background: "#205493",
          borderColor: "#205493",
          color: "#ffffff",
          borderStyle: "solid",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

const MockProductTileAlt: FC<{ product: MockProduct }> = ({ product }) => {
  return (
    <div
      style={{
        color: "#212121",
        border: "1px solid #205493",
        padding: "15px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        width="200"
        height="200"
        style={{ marginRight: "10px" }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "18px",
            height: "40px",
            width: "200px",
            margin: "5px",
          }}
        >
          {product.title}
        </p>
        <div
          style={{ color: "#205493", fontSize: "24px", marginBottom: "5px" }}
        >
          {product.price}
        </div>
        <div style={{ fontSize: "16px", marginBottom: "10px" }}>
          Rating{product.rating}
        </div>
        <button
          style={{
            width: "100%",
            height: "40px",
            background: "#205493",
            borderColor: "#205493",
            color: "#ffffff",
            borderStyle: "solid",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const FilterPill: FC<FilterPillProps> = ({ text }) => {
  return (
    <div
      style={{
        minWidth: "80px",
        border: "1px solid #212121",
        color: "#212121",
        padding: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {text}
    </div>
  );
};

export const Default = () => {
  const products: MockProduct[] = new Array(26).fill({}).map((product, i) => {
    const title = `${faker.lorem.words()}-${i + 1}`;
    return {
      ...product,
      id: faker.datatype.uuid(),
      title,
      image: `https:///picsum.photos/200/200?random=${i}`,
      price: `\$${faker.finance.amount()}`,
      rating: Math.floor(Math.random() * 5 + 1),
    };
  });

  return (
    <>
      <h1>Product Carousel</h1>
      <BasicCarousel>
        {products.map((product) => {
          return (
            <MockProductTile
              key={product.id}
              product={product}
            ></MockProductTile>
          );
        })}
      </BasicCarousel>
    </>
  );
};

Default.storyName = "Products Carousel";

export const AltProductCarousel = () => {
  const products: MockProduct[] = new Array(26).fill({}).map((product, i) => {
    const title = `${faker.lorem.words()}-${i + 1}`;
    return {
      ...product,
      id: faker.datatype.uuid(),
      title,
      image: `https:///picsum.photos/200/200?random=${i}`,
      price: `\$${faker.finance.amount()}`,
      rating: Math.floor(Math.random() * 5 + 1),
    };
  });

  return (
    <>
      <h1>Product Carousel Alternate</h1>
      <BasicCarousel>
        {products.map((product) => {
          return (
            <MockProductTileAlt
              key={product.id}
              product={product}
            ></MockProductTileAlt>
          );
        })}
      </BasicCarousel>
    </>
  );
};

AltProductCarousel.storyName = "Products Carousel Alternate";

export const FilterPillsCarousel = () => {
  const filters: FilterPillProps[] = new Array(100)
    .fill({})
    .map((filter, i) => {
      return {
        ...filter,
        id: faker.random.uuid(),
        text: `${faker.lorem.word()}-${i + 1}`,
      };
    });

  return (
    <>
      <h1>Filter Pills Carousel</h1>
      <BasicCarousel>
        {filters.map((filter) => {
          return (
            <FilterPill
              key={filter.id}
              text={filter.text}
              id={filter.id}
            ></FilterPill>
          );
        })}
      </BasicCarousel>
    </>
  );
};

FilterPillsCarousel.storyName = "Filter Pills Carousel";

type ImageProps = {
  id: string;
  imageUrl: string;
  alt: string;
};

export const ImageGalleryCarousel = () => {
  const images: ImageProps[] = new Array(27).fill({}).map((image, i) => {
    return {
      id: faker.random.uuid(),
      imageUrl: `https:///picsum.photos/200/300?random=${i}`,
      alt: `${faker.lorem.word()}-${i + 1}`,
    };
  });

  return (
    <>
      <h1>Image Gallery Carousel</h1>
      <BasicCarousel>
        {images.map((image) => {
          return (
            <img
              width="200"
              height="300"
              key={image.id}
              id={image.id}
              src={image.imageUrl}
              alt={image.alt}
            />
          );
        })}
      </BasicCarousel>
    </>
  );
};

ImageGalleryCarousel.storyName = "Image Gallery Carousel";

export const ImageGalleryCarouselAlt = () => {
  const images: ImageProps[] = new Array(27).fill({}).map((image, i) => {
    return {
      id: faker.random.uuid(),
      imageUrl: `https:///picsum.photos/200/300?random=${i}`,
      alt: `${faker.lorem.word()}-${i + 1}`,
    };
  });

  return (
    <>
      <h1>Image Gallery Carousel Alternate</h1>
      <BasicCarousel
        paginationButtonsPosition={PaginationButtonPositions.onTop}
      >
        {images.map((image) => {
          return (
            <img
              width="200"
              height="300"
              key={image.id}
              id={image.id}
              src={image.imageUrl}
              alt={image.alt}
            />
          );
        })}
      </BasicCarousel>
    </>
  );
};

ImageGalleryCarouselAlt.storyName = "Image Gallery Carousel Alternate";
