/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { string, bool, arrayOf, func } from 'prop-types';
import favIconSvg from '../assets/Icons/icon-fav.svg';
import favActive from '../assets/Icons/icon-fav-active.svg';
import { truncate, numberWithCommas } from '../utils';
import CircleColors from './CircleColors';

class CarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favIcon: false
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
        favIcon: fav
      });
    }
  };

  updateFav = () => {
    const { favorite } = this.props;
    this.setState({
      favIcon: favorite
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
      favorite
    } = this.props;

    const { favIcon } = this.state;

    return (
      <React.Fragment>
        <div className="shopping-car-item mobile d-lg-none d-xl-none">
          <div className="d-flex justify-content-end align-items-center flex-column item">
            <div className="d-flex justify-content-start align-items-center name">
              {truncate(20, name)}
            </div>
            <div className="d-flex justify-content-start align-items-center retailer">
              {retailer}
            </div>
            <div className="d-flex justify-content-start align-items-start flex-row item">
              {colors.length > 1 && (
                <div>
                  <div className="d-flex justify-content-start align-items-center flex-column colors">
                    {this.createColorCircles(colors)}
                  </div>
                </div>
              )}
              <div>
                <div className="image">
                  <img src={img} alt={`furniture-${name}`} />
                </div>
              </div>
            </div>
            <div
              className="fav-icon"
              onClick={() => {
                this.toggleIcon(id);
              }}
            >
              {favorite || favIcon ? (
                <img src={favActive} alt="fav-active" />
              ) : (
                <img src={favIconSvg} alt="fav" />
              )}
            </div>
            <div className="d-flex justify-content-start align-items-center footer">
              <span>
                <span className="price">${numberWithCommas(price)}</span>{' '}
                <span className="currency">{currency}</span> - Estimated price
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
  token: string.isRequired,
  clickFavFurniture: func.isRequired
};

CarItem.defaultProps = {
  favorite: false
};

export default CarItem;
