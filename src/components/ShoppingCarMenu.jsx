import React from 'react';
import { bool, arrayOf, shape, string, func } from 'prop-types';
import CarItem from './CarItem';

class ShoppingCarMenu extends React.Component {
  constructor(props) {
    super(props);

    this.itemsContainer = React.createRef();
    this.isDown = false;
    this.startX = null;
    this.scrollLeft = null;
  }

  generateCarItems = (shoppingCarItems) => {
    const { token } = this.props;
    return shoppingCarItems.map((item) => {
      let colors = ['transparent'];
      if (item.fabricsColors.length > 0) {
        colors = item.fabricsColors;
      } else if (item.details.length > 0) {
        colors = item.details[0].countries[0].fabrics || ['transparent'];
      }
      return (
        <CarItem
          key={`furniture-${item.name}`}
          name={item.name}
          img={item.previews[0].name}
          retailer={item.details.length > 0 ? item.details[0].retailer : 'N/A'}
          price={
            item.details.length > 0
              ? item.details[0].countries[0].price || ''
              : ''
          }
          currency={
            item.details.length > 0
              ? item.details[0].countries[0].currency || ''
              : ''
          }
          colors={colors}
          id={item.id}
          favorite={item.favorite}
          clickFurniture={this.clickFurniture}
          clickFavFurniture={this.clickFavFurniture}
          token={token}
        />
      );
    });
  };

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
    const { isActive, shoppingCarItems, title } = this.props;
    return (
      <React.Fragment>
        <div className={`${isActive ? 'shopping-car-menu' : 'display-none'}`}>
          <div className="title">{title}</div>
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
      </React.Fragment>
    );
  }
}

ShoppingCarMenu.propTypes = {
  isActive: bool.isRequired,
  shoppingCarItems: arrayOf(shape({})).isRequired,
  title: string.isRequired,
  token: string.isRequired,
  clickFavFurniture: func.isRequired,
  clickFurniture: func.isRequired
};

export default ShoppingCarMenu;
