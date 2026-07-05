import './HomePage.css'
import './header.css'
import { NavLink } from 'react-router';
import { Clock, Bookmark } from 'lucide-react';
import { Header } from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
export function HomePage() {
    const [savedForLater, setSavedForLater] = useState(false);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get('/api/courses');
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

    function handleSaveForLaterClick() {
        if (!savedForLater) {
            setSavedForLater(true);
        }
        else {
            setSavedForLater(false);
        }
    }

    return (
        <>
            <Header />
            <div className="header-text">
                <p className="order-heading-text">Advanced Programs</p>
                <p className="order-subheading-text">Master low-level engineering and scalable architecture with expert-led courses.</p>
            </div>
            <div className="home-page">
                <div className="products-grid">
                    {
                        courses.map((course) => {
                            return (
                                <div key ={course.id} className="product-container">
                                    <div className="product-image-container">
                                        <img className="product-image"
                                            src={course.image} />
                                    </div>

                                    <div className="product-name limit-text-to-2-lines">
                                        {course.name}
                                    </div>

                                    <div className="product-rating-container">
                                        <img className="product-rating-stars"
                                            src="/images/ratings/rating-45.png" />
                                        <div className="product-rating-count link-primary">
                                            87
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        $10.90
                                    </div>

                                    <div className="product-hours-container">
                                        <Clock />
                                        <p>1 hour</p>
                                    </div>
                                    <div className="product-save-for-later-container" onClick={handleSaveForLaterClick}>
                                        <Bookmark fill={savedForLater ? "currentColor" : "none"} />
                                        <p>Save for later</p>
                                    </div>
                                    <div className="product-spacer"></div>

                                    <div className="added-to-cart">
                                        <img src="/images/icons/checkmark.png" />
                                        Added
                                    </div>

                                    <button className="add-to-cart-button button-primary">
                                        Add to Cart
                                    </button>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}