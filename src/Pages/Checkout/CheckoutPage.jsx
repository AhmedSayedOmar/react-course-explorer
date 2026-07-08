import './checkout-header.css';
import './CheckoutPage.css';
import { CartItems } from './CartItems'
import { formatMoney } from '../../utils/Money';
import {Link} from 'react-router'
export function CheckoutPage({ cart, loadCart }) {
    function calculatePayment() {
        let total = 0;
        cart.forEach((cartItem) => {
            total += cartItem.course.priceCents;
        });
        return total;
    }
    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <Link to="/">
                            <img className="logo" src={`${import.meta.env.VITE_API_URL}/images/logo.png`} />
                        </Link>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<Link className="return-to-home-link"
                            to="/">{`${cart.length} items`}</Link>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src={`${import.meta.env.VITE_API_URL}/images/icons/checkout-lock-icon.png`} />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {cart.map((cartItem) => {
                            return (<CartItems key={cartItem.courseId} cartItemCourse={cartItem.course} loadCart={loadCart}/>);
                        })}


                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>

                        <div className="payment-summary-row">
                            <div>Items ({cart.length}):</div>
                            <div className="payment-summary-money">{formatMoney(calculatePayment())}</div>
                        </div>



                        <div className="payment-summary-row subtotal-row">
                            <div>Total before tax:</div>
                            <div className="payment-summary-money">{formatMoney(calculatePayment())}</div>
                        </div>

                        <div className="payment-summary-row">
                            <div>Estimated tax (10%):</div>
                            <div className="payment-summary-money">{formatMoney(0.1*calculatePayment())}</div>
                        </div>

                        <div className="payment-summary-row total-row">
                            <div>Order total:</div>
                            <div className="payment-summary-money">{formatMoney(1.1*calculatePayment())}</div>
                        </div>

                        <button className="place-order-button button-primary">
                            Place your order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}