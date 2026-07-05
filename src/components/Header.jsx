import { useState } from "react";
export function Header() {
    const [search,setSearch]=useState(false)
    function handleSearchClick(){
        if(!search){
            setSearch(true)
        }
        else{
            setSearch(false)
        }
    }
    return (
        <div className="header">
            <div className="left-section">
                <a href="index.html" className="header-link">
                    <img className="logo"
                        src="images/logo.png" />
                    <img className="mobile-logo"
                        src="images/mobile-logo-white.png" />
                </a>
            </div>

            <div className="middle-section">
                <a className="home-link header-link" href="index.html">

                    <span className="home-text">Home</span>
                </a>
                <a className="information-link header-link" href="index.html">

                    <span className="information-text">Information</span>
                </a>
                <a className="orders-link header-link" href="orders.html">

                    <span className="orders-text">Products</span>
                </a>
                <a className="terms-link header-link" href="index.html">

                    <span className="terms-text">Terms</span>
                </a>

            </div>

            <div className="right-section">
                {search && <input className="search-bar" type="text" placeholder="Search" />}

                <button className="search-button" onClick={handleSearchClick}>
                    <img className="search-icon" src="images/icons/search.png" />
                </button>


                <a className="cart-link header-link" href="checkout.html">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">3</div>
                    <div className="cart-text">Cart</div>
                </a>
            </div>
        </div>
    );
}