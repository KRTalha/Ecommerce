import { formatMoney } from "../../utils/money";
import axios from "axios";

import { useState } from "react";
export function Products({ product, loadPage }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = async () => {
    await axios.post("/api/cart-items", {
      productId: product.id,
      quantity,
    });
    await loadPage();
    setAdded(true);
  };
  setTimeout(() => {
    setAdded(false);
  }, 2000);

  const changeQuantity = (event) => {
    const changedQuantity = Number(event.target.value);
    setQuantity(changedQuantity);
  };

  return (
    <div className="product-container">
      <div className="product-image-container">
        <img
          className="product-image"
          data-testid="product-image"
          src={product.image}
        />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          data-testid="product-rating-stars-image"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {/* ${(product.priceCents/100).toFixed(2)} */}
        {formatMoney(product.priceCents)}
      </div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={changeQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ opacity: added ? 1 : 0 }}>
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button
        className="add-to-cart-button button-primary"
        onClick={addToCart}
        data-testId="add-to-cart-button"
      >
        Add to Cart
      </button>
    </div>
  );
}
