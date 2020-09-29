/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, func } from 'prop-types';
import { truncate, numberWithCommas } from '../../../utils';
import CircleColors from '../CircleColors';
import ThreeSixtyAction from '../../../stores/threeSixty/actions';

class CarItem extends React.Component {
  createColorCircles = (colors) =>
    colors.map((color) => <CircleColors color={color} key={`key-${color}`} />);

  clickFurniture = (id) => {
    const { dispatch } = this.props;
    dispatch(
      ThreeSixtyAction.furnitureCount({
        assetId: id
      })
    );
  };

  render() {
    const {
      name,
      img,
      retailer,
      price,
      currency,
      colors = [],
      id
    } = this.props;

    return (
      <>
        <div
          className="shopping-car-item mobile d-lg-none d-xl-none"
          onClick={() => {
            this.clickFurniture(id);
          }}
        >
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
            <div className="d-flex justify-content-start align-items-center footer">
              <span>
                <span className="price">${numberWithCommas(price)}</span>{' '}
                <span className="currency">{currency}</span> - Estimated price
              </span>
            </div>
          </div>
        </div>
      </>
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
  dispatch: func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapDispatchToProps)(CarItem);
