/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import { func, arrayOf, shape, string, bool } from 'prop-types';
import CarItem from '../CarItem';

class ShoppingCarMenuMobile extends React.Component {
  constructor(props) {
    super(props);

    this.itemsContainer = React.createRef();
    this.isDown = false;
    this.startX = null;
    this.scrollLeft = null;
  }

  generateCarItems = (shoppingCarItems) =>
    shoppingCarItems.map((item) => {
      const { token } = this.props;
      let price = '';
      let currency = '';
      let fabricsColors = null;
      if (item.details.length > 0) {
        if (item.details[0].countries[0].price) {
          price = item.details[0].countries[0].price;
        }
        if (item.details[0].countries[0].currency) {
          currency = item.details[0].countries[0].currency;
        }
      }

      if (item.fabricsColors && item.fabricsColors.length > 0) {
        fabricsColors = item.fabricsColors;
      } else if (item.details.length > 0) {
        if (item.details[0].countries[0].fabrics) {
          fabricsColors = item.details[0].countries[0].fabrics;
        } else {
          fabricsColors = ['transparent'];
        }
      } else {
        fabricsColors = ['transparent'];
      }

      return (
        <CarItem
          key={`furniture-${item.name}`}
          name={item.name}
          img={item.previews[0].name}
          retailer={item.details.length > 0 ? item.details[0].retailer : 'N/A'}
          price={price}
          currency={currency}
          colors={fabricsColors}
          id={item.id}
          favorite={item.favorite}
          clickFurniture={this.clickFurniture}
          clickFavFurniture={this.clickFavFurniture}
          token={token}
        />
      );
    });

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

  clickFurniture = (id) => {
    const { clickFurniture } = this.props;
    clickFurniture(id);
  };

  clickFavFurniture = (id, fav) => {
    const { clickFavFurniture } = this.props;
    clickFavFurniture(id, fav);
  };

  render() {
    const { isActive, shoppingCarItems } = this.props;
    return (
      <Fragment>
        <div className="mobile-submenu-title">FURNITURE</div>
        <div
          className={`${
            isActive ? 'shopping-car-menu' : 'display-none'
          } d-flex justify-content-center align-items-center`}
        >
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
  clickFavFurniture: func.isRequired,
  clickFurniture: func.isRequired,
  shoppingCarItems: arrayOf(shape({})).isRequired,
  token: string.isRequired,
  isActive: bool.isRequired
};

export default ShoppingCarMenuMobile;
