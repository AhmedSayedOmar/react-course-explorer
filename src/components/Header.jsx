import './header.css'
import { useState } from "react";
import { useNavigate } from 'react-router';
import {  Bookmark } from 'lucide-react';
export function Header() {
    const [search,setSearch]=useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    function handleSearchClick(){
        if(!search){
            setSearch(true)
        }
        else{
            navigate(`/?search=${searchQuery}`);
            setSearch(false)
        }
    }
    return (
        <div className="header">
            <div className="left-section">
                <a href="index.html" className="header-link">
                    <img className="logo"
                        src="images/logo.png" />
                </a>
            </div>

            <div className="middle-section">
                <a className="home-link header-link" href="/">

                    <span className="home-text">Home</span>
                </a>
                <a className="information-link header-link" href="/">

                    <span className="information-text">Information</span>
                </a>
                <a className="orders-link header-link" href="/">

                    <span className="orders-text">Products</span>
                </a>
                <a className="terms-link header-link" href="/">

                    <span className="terms-text">Terms</span>
                </a>
                <a className="bookmark-view-link header-link" href="/bookmarks">
                    <span >
                        Bookmark
                    </span>
                    
                </a>

            </div>

            <div className="right-section">
                {search && <input className="search-bar" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />}

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