import { formatMoney } from "../../utils/Money";
export function CartItems({cartItemCourse}){
    console.log(cartItemCourse)
    return(
        <div className="cart-item-container">
              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={cartItemCourse.image} />

                <div className="cart-item-details">
                  <div className="product-name">
                    {cartItemCourse.name}
                  </div>
                  <div className="product-price">
                    {formatMoney(cartItemCourse.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity: <span className="quantity-label">1</span>
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
    );
}
