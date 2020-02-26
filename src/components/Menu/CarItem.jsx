/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, arrayOf, func } from 'prop-types';
import favIcon from '../../assets/Icons/icon-fav.svg';
import favActive from '../../assets/Icons/icon-fav-active.svg';
import { truncate, numberWithCommas } from '../../utils';
import CircleColors from './CircleColors';

class CarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favIconFav: false
    };
  }

  createColorCircles = (colors) =>
    colors.map((color) => <CircleColors color={color} key={`key-${color}`} />);

  toggleIcon = (id) => {
    const { favorite, token, clickFavFurniture } = this.props;
    const fav = !favorite;
    clickFavFurniture(id, fav);
    if (token) {
      this.setState({
        favIconFav: fav
      });
    }
  };

  updateFav = () => {
    const { favorite } = this.props;
    this.setState({
      favIconFav: favorite
    });
  };

  render() {
    const {
      name,
      img,
      retailer,
      price,
      currency,
      colors = [],
      id,
      favorite,
      clickFurniture
    } = this.props;

    const { favIconFav } = this.state;

    return (
      <React.Fragment>
        <div className="shopping-car-item">
          <div className="d-flex justify-content-end align-items-center flex-column item">
            <div
              className="d-flex justify-content-between align-items-center name"
              onClick={() => {
                clickFurniture(id);
              }}
            >
              <div>
                <span className="furniture-name">{truncate(20, name)}</span>
              </div>
              <div
                className="fav-icon"
                onClick={() => {
                  this.toggleIcon(id);
                }}
              >
                {favorite || favIconFav ? (
                  <img src={favActive} alt="fav-active" />
                ) : (
                  <img src={favIcon} alt="fav" />
                )}
              </div>
            </div>
            <div
              className="d-flex justify-content-start align-items-center retailer"
              onClick={() => {
                clickFurniture(id);
              }}
            >
              <span>{retailer}</span>
            </div>
            <div className="d-flex justify-content-between align-items-start cart-image-container">
              <div className="d-flex justify-content-start align-items-center flex-column colors">
                {this.createColorCircles(colors)}
              </div>
              <div
                className="cart-image"
                onClick={() => {
                  clickFurniture(id);
                }}
              >
                <img src={img} alt={`furniture-${name}`} />
              </div>
            </div>
            <div
              className="d-flex justify-content-center align-items-center footer"
              onClick={() => {
                clickFurniture(id);
              }}
            >
              <span className="footer-info">
                {price !== '' && (
                  <span className="price">${numberWithCommas(price)}</span>
                )}
                {currency !== '' && (
                  <span className="currency">{` ${currency} `}</span>
                )}
                {price === '' && currency === ''
                  ? 'Currently Out of Stock'
                  : '- Estimated price'}
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

CarItem.propTypes = {
  name: string.isRequired,
  img: string.isRequired,
  retailer: string.isRequired,
  price: string.isRequired,
  currency: string.isRequired,
  colors: arrayOf(string).isRequired,
  id: string.isRequired,
  favorite: bool,
  clickFurniture: func.isRequired,
  token: string.isRequired,
  clickFavFurniture: func.isRequired
};

CarItem.defaultProps = {
  favorite: false
};

export default CarItem;
