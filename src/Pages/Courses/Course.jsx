import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/Money";
import { Clock, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from "axios";
import './Course.css';

export function Course({ course ,loadCart}) {
    const [savedForLater, setSavedForLater] = useState(false);
    const [showAdded,setShowAdded]=useState(false);
    useEffect(() => {
        const fetchBookmark = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookmarks`);
            setSavedForLater(response.data.some(bookmark => bookmark.courseId === course.id));
        }
        fetchBookmark();
    }, [course.id, setSavedForLater]);
    const navigate = useNavigate();
    const handleSaveForLaterClick = async () => {
        if (!savedForLater) {
            setSavedForLater(true);
            await axios.post(`${import.meta.env.VITE_API_URL}/api/bookmarks`, { courseId: course.id })
        }
        else {
            setSavedForLater(false);
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookmarks/${course.id}`)
        }
    }
    const addToCart=async()=>{
        await axios.post('api/cart-items',{
            courseId:course.id,
            quantity: 1
        });
        await loadCart();
        setShowAdded(true);
        setTimeout(()=>{
            setShowAdded(false);
        },2000)
    }
    return (
        <div key={course.id} className="product-container">
            <div className="clickable-course" onClick={()=>{ navigate(`courseDetails/?search=${course.id}`)}}>
                

                    <div className="product-image-container">
                        <img className="product-image"
                            src={`${import.meta.env.VITE_API_URL}/${course.image}`} />
                    </div>

                    <div className="product-name limit-text-to-2-lines">
                        {course.name}
                    </div>

                    <div className="professor-name-container">
                        <div className="professor-name limit-text-to-1-line">
                            {`by ${course.instructor}`}
                        </div>
                    </div>

                    <div className="product-price">
                        {formatMoney(course.priceCents)}
                    </div>

                    <div className="product-hours-container">
                        <Clock />
                        <p>{`${course.hours} hours`}</p>
                    </div>
            </div>
            <div className="product-save-for-later-container" onClick={handleSaveForLaterClick}>
                <Bookmark fill={savedForLater ? "currentColor" : "none"} />
                <p>Save for later</p>
            </div>
            <div className="product-spacer"></div>

            <div className="added-to-cart" style={{opacity:showAdded?1:0}}>
                <img src={`${import.meta.env.VITE_API_URL}/images/icons/checkmark.png`} />
                Added
            </div>

            <button className="add-to-cart-button button-primary" onClick={addToCart}>
                Add to Cart
            </button>
        </div>
    );
}