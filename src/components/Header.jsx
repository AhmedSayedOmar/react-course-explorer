import './header.css'
import { useState } from "react";
import { useNavigate,NavLink } from 'react-router';
import {  Bookmark } from 'lucide-react';
export function Header({cart}) {
    const [search,setSearch]=useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    function calculateQunatity(){
        return (cart.length);
    }
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
                <a href="/" className="header-link">
                    <img className="logo"
                        src="images/logo.png" />
                </a>
            </div>

            <nav className="middle-section">
                <NavLink className={({ isActive }) => isActive ? "home-link header-link active-link" : "home-link header-link"} to="/">

                    <span className="home-text">Home</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "orders-link header-link active-link" : "orders-link header-link"}  to="/">

                    <span className="orders-text">Products</span>
                </NavLink>
                <NavLink className={({ isActive }) => isActive ? "bookmark-view-link header-link active-link" : "bookmark-view-link header-link"}  to="/bookmarks">
                    <span >
                        Bookmark
                    </span>
                    
                </NavLink>

            </nav>

            <div className="right-section">
                {search && <input className="search-bar" type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />}

                <button className="search-button" onClick={handleSearchClick}>
                    <img className="search-icon" src="images/icons/search.png" />
                </button>


                <a className="cart-link header-link" href="/checkout">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{calculateQunatity()}</div>
                    <div className="cart-text">Cart</div>
                </a>
            </div>
        </div>
    );
}