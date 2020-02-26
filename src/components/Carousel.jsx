import React from 'react';
import { arrayOf, shape } from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from './CarouselItem';

const CarouselContainer = ({ items }) => {
  const carouselItems = items.map((carouselItem, index) => {
    return (
      <CarouselItem
        key={`carousel-item-${index.toString()}`}
        items={carouselItem}
      />
    );
  });

  return (
    <Carousel indicators={false} interval={null}>
      {carouselItems}
    </Carousel>
  );
};

CarouselContainer.propTypes = {
  items: arrayOf(shape({})).isRequired
};

export default CarouselContainer;
