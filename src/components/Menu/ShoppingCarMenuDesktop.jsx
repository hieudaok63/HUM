import React from 'react';
import { connect } from 'react-redux';
import { arrayOf, shape } from 'prop-types';
import CarItem from './CarItem';
import { shoppingCarItemsSelector } from '../../selectors/ShoppingCart';

class ShoppingCarMenu extends React.Component {
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
  render() {
    const { shoppingCarItems = [] } = this.props;
    return (
      <>
        <div className="menu-properties-container d-flex flex-column justify-content-start align-items-start">
          <div className="title">FURNITURE</div>
          <div id="shopping-menu" className="shopping-menu sub-menu">
            {this.generateCarItems(shoppingCarItems)}
          </div>
        </div>
      </>
    );
  }
}

ShoppingCarMenu.propTypes = {
  shoppingCarItems: arrayOf(shape({})).isRequired
};

const mapStateToProps = (state) => ({
  shoppingCarItems: shoppingCarItemsSelector(state)
});
export default connect(mapStateToProps)(ShoppingCarMenu);
