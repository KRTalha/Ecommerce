import { DeliveryOptions } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ cart, deliveryOptions, loadPage }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            }
          );
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <DeliveryDate selectDeliveryOption={selectDeliveryOption} />

              <div className="cart-item-details-grid">
                <CartItemDetails cartItem={cartItem} loadPage={loadPage} />
                <DeliveryOptions
                  cartItem={cartItem}
                  deliveryOptions={deliveryOptions}
                  loadPage={loadPage}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
