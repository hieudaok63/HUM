import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { arrayOf, shape } from 'prop-types';

const CarouselItem = ({ items }) => (
  <Carousel.Item>
    {items.map((item) => {
      return item;
    })}
  </Carousel.Item>
);

CarouselItem.propTypes = {
  items: arrayOf(shape({})).isRequired
};

export default CarouselItem;
