import { formatMoney } from "../../utils/money";
import dayjs from "dayjs";
import axios from "axios";
export function DeliveryOptions({ cartItem, deliveryOptions, loadPage }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">Choose a delivery option:</div>
      {deliveryOptions.map((deliveryOption) => {
        let priceString = "Free Shipping";
        if (deliveryOption.priceCents > 0) {
          priceString = formatMoney(deliveryOption.priceCents);
        }

        const upDateDeliveryOption = async () => {
          axios.put(`/api/cart-items/${cartItem.productId}`, {
            deliveryOptionId: deliveryOption.id,
          });
          loadPage();
        };
        return (
          <div
            key={deliveryOption.id}
            className="delivery-option"
            onClick={upDateDeliveryOption}
          >
            <input
              type="radio"
              checked={deliveryOption.id === cartItem.deliveryOptionId}
              onChange={() => {}}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`}
            />
            <div>
              <div className="delivery-option-date">
                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd,MMMM,D"
                )}
              </div>
              <div className="delivery-option-price">{priceString}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
