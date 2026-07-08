import { formatMoney } from "../../utils/Money";
import axios from 'axios'
export function CartItems({cartItemCourse,loadCart}){
    const deleteCourse= async()=>{
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/cart-items/${cartItemCourse.id}`)
        await loadCart();
    }
    return(
        <div className="cart-item-container">
              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={`${import.meta.env.VITE_API_URL}${cartItemCourse.image}`} />

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
                    <span className="delete-quantity-link link-primary" onClick={deleteCourse}>
                      Delete
                    </span>
                  </div>
                </div>
              </div>
            </div>
    );
}
