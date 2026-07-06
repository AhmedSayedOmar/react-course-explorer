import { useEffect, useState} from "react";
import { formatMoney } from "../../utils/Money";
import { Clock, Bookmark } from 'lucide-react';
import axios from "axios";

export function Course({course}) {
    const [savedForLater, setSavedForLater] = useState(false);
    useEffect(()=>{
        const fetchBookmark = async () => {
            const response = await axios.get('/api/bookmarks');
            setSavedForLater(response.data.some(bookmark => bookmark.courseId === course.id));
        }
        fetchBookmark();
    },[course.id, setSavedForLater]);
    

     const handleSaveForLaterClick = async () => {
            if (!savedForLater) {
                setSavedForLater(true);
                await axios.post('/api/bookmarks', { courseId: course.id })

            }
            else {
                setSavedForLater(false);
                await axios.delete(`/api/bookmarks/${course.id}`)
            }
        }
    return (
        <div key={course.id} className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={course.image} />
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
}