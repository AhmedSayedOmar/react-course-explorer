import axios from 'axios';
import { useSearchParams,useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import './DetailsPage.css'
export function DetailsPage() {
    const navigate=useNavigate();
    const [course, setCourse] = useState(null);
    const [showAdded,setShowAdded]=useState(false);
    const addToCart=async()=>{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/cart-items`,{
            courseId:course.id,
            quantity: 1
        });
        setShowAdded(true);
        setTimeout(()=>{
            setShowAdded(false);
        },2000)
    }
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    console.log(search);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/courses`);
            const selectedCourse = response.data.find(
                (course) => course.id === search
            );

            setCourse(selectedCourse);
        };

        fetchCourses();
    }, [search]);
    if (!course) {
        return <p>Loading...</p>;
    }
    const closeClick=()=>{
        navigate('/')
    }
    return (
        <div className="course-details-modal">

            <button className="close-button" onClick={closeClick}>
                ✕
            </button>

            <div className="course-header">

                <img
                    src={`${import.meta.env.VITE_API_URL}${course.image}`}
                    className="details-image"
                />

                <div className="course-info">

                    <h2>{course.name}</h2>

                    <div className="course-meta">

                        <div className="meta-item">
                            <h4>Instructor</h4>
                            <p>{course.instructor}</p>
                        </div>

                        <div className="meta-item">
                            <h4>Hours</h4>
                            <p>{course.hours} hours</p>
                        </div>

                        <div className="meta-item">
                            <h4>Price</h4>
                            <p>${(course.priceCents / 100).toFixed(2)}</p>
                        </div>

                    </div>

                </div>

            </div>

            <div className="details-section">

                <h3>Course Details</h3>

                <p>{course.details}</p>

            </div>
            <div className="added-to-cart" style={{opacity:showAdded?1:0}}>
                <img src={`${import.meta.env.VITE_API_URL}/images/icons/checkmark.png`} />
                Added
            </div>

            <button className="enroll-button" onClick={addToCart}>
                Add to Cart
            </button>

        </div>
    );
}