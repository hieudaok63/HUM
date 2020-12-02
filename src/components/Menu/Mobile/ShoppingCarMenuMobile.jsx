/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape } from 'prop-types';
import CarItem from './CarItem';
import { shoppingCarItemsSelector } from '../../../selectors/ShoppingCart';

class ShoppingCarMenuMobile extends React.Component {
  constructor(props) {
    super(props);

    this.itemsContainer = React.createRef();
    this.isDown = false;
    this.startX = null;
    this.scrollLeft = null;
  }

  generateCarItems = (shoppingCarItems) =>
    shoppingCarItems.map(
      ({ name, img, retailer, price, currency, fabricsColors, id }) => (
        <CarItem
          key={`furniture-${name}`}
          name={name}
          img={img}
          retailer={retailer}
          price={price}
          currency={currency}
          colors={fabricsColors}
          id={id}
        />
      )
    );

  onMouseDown = (e) => {
    this.isDown = true;
    this.itemsContainer.current.classList.add('active');
    this.startX = e.pageX - this.itemsContainer.current.offsetLeft;
    this.scrollLeft = this.itemsContainer.current.scrollLeft;
  };

  onMouseUp = () => {
    this.isDown = false;
    this.itemsContainer.current.classList.remove('active');
  };

  onMouseLeave = () => {
    this.isDown = false;
    this.itemsContainer.current.classList.remove('active');
  };

  onMouseMove = (e) => {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.itemsContainer.current.offsetLeft;
    const walk = (x - this.startX) * 3; // scroll-fast
    this.itemsContainer.current.scrollLeft = this.scrollLeft - walk;
  };

  render() {
    const { shoppingCarItems } = this.props;
    return (
      <Fragment>
        <div className="mobile-submenu-title">FURNITURE</div>
        <div className="shopping-car-menu d-flex justify-content-center align-items-center">
          <div
            ref={this.itemsContainer}
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onMouseLeave={this.onMouseLeave}
            onMouseMove={this.onMouseMove}
            className="items-container"
          >
            {this.generateCarItems(shoppingCarItems)}
          </div>
        </div>
      </Fragment>
    );
  }
}

ShoppingCarMenuMobile.propTypes = {
  shoppingCarItems: arrayOf(shape({})).isRequired
};

const mapStateToProps = (state) => ({
  shoppingCarItems: shoppingCarItemsSelector(state)
});

export default connect(mapStateToProps)(ShoppingCarMenuMobile);
