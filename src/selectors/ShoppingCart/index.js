import { createSelector } from 'reselect';

export class ShoppingCart {
  static getShoppinCartItems(state) {
    if (state.threeSixty.levels.length > 0) {
      return state.threeSixty.levels[0].styles[0].scenes[0].uses[0].furniture.map(
        (item) => {
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

          return {
            id: item.id,
            name: item.name,
            img: item.previews[0].name,
            retailer:
              item.details.length > 0 ? item.details[0].retailer : 'N/A',
            price,
            currency,
            fabricsColors
          };
        }
      );
    }
    return [];
  }
}

export const shoppingCarItemsSelector = createSelector(
  [ShoppingCart.getShoppinCartItems],
  (shoppingCartItems) => shoppingCartItems
);
