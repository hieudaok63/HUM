import React from 'react';
import { func, bool, arrayOf, shape, string } from 'prop-types';
import CarItem from './CarItem';

class ShoppingCarMenu extends React.Component {
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

  clickFurniture = (id) => {
    const { clickFurniture } = this.props;
    clickFurniture(id);
  };

  clickFavFurniture = (id, fav) => {
    const { clickFavFurniture } = this.props;
    clickFavFurniture(id, fav);
  };

  render() {
    const { shoppingCarItems = [], show } = this.props;
    return (
      <React.Fragment>
        <div
          className={`menu-properties-container d-flex flex-column justify-content-start align-items-start ${
            show ? '' : 'display-none'
          }`}
        >
          <div className="title">FURNITURE</div>
          <div
            id="shopping-menu"
            className={`shopping-menu sub-menu ${show ? '' : 'display-none'}`}
          >
            {this.generateCarItems(shoppingCarItems)}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ShoppingCarMenu.propTypes = {
  clickFavFurniture: func.isRequired,
  clickFurniture: func.isRequired,
  show: bool.isRequired,
  shoppingCarItems: arrayOf(shape({})).isRequired,
  token: string.isRequired
};

export default ShoppingCarMenu;
