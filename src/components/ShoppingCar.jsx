import React from 'react';
import Clear from '@material-ui/icons/Clear';
import { bool, func } from 'prop-types';
import shopIcon from '../assets/Icons/icon-cart.svg';

const ShoppingCar = (props) => {
  const {
    isPreview,
    isTablet,
    loading,
    activateShoppingMenu,
    isActive,
    showShoppingCar
  } = props;
  return (
    <React.Fragment>
      <div
        className={`shopping-icon d-lg-none d-xl-none d-flex justify-content-center align-items-center 
                ${isPreview ? 'display-none' : ''} ${loading &&
          'display-none'} ${!showShoppingCar ? 'display-none' : ''}`}
      >
        {!isActive ? (
          <img
            src={shopIcon}
            alt="shopIcon"
            style={{ width: '70%', height: '70%' }}
            onClick={activateShoppingMenu}
          />
        ) : (
          <Clear onClick={activateShoppingMenu} />
        )}
      </div>
      <div
        className={`${loading && 'display-none'} ${
          !isTablet ? 'shop-icon-desktop' : 'shop-icon-tablet'
        } ${!isPreview ? 'd-lg-block d-md-none' : 'display-none'} ${
          !showShoppingCar ? 'display-none' : ''
        } ${isActive && 'active'}`}
      >
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          {!isActive ? (
            <img
              src={shopIcon}
              alt="shopIcon"
              style={{ width: '60%', height: '60%' }}
              onClick={activateShoppingMenu}
            />
          ) : (
            <Clear onClick={activateShoppingMenu} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

ShoppingCar.propTypes = {
  isPreview: bool.isRequired,
  isTablet: bool.isRequired,
  loading: bool.isRequired,
  activateShoppingMenu: func.isRequired,
  isActive: bool.isRequired,
  showShoppingCar: bool.isRequired
};

export default ShoppingCar;
