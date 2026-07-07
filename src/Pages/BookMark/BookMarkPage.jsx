import {useState, useEffect} from 'react';
import { Header } from '../../components/Header';
import {Course} from '../Courses/Course';
import axios from 'axios';
export function BookMarkPage({cart, loadCart}) {
    const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
    useEffect(() => {
        let response;
        const fetchCourses = async () => {
            response = await axios.get('/api/bookmarks?expand=course');
            setBookmarkedCourses(response.data);
        };
        fetchCourses();
    }, []);
    return (
        <>
            <Header cart={cart} />
            <div className="header-text">
                <p className="order-heading-text">Book Marked Courses</p>
            </div>
            <div className="home-page">
                <div className="products-grid">
                    {
                        bookmarkedCourses.map((course) => {
                            return <Course key={course.course.id} course={course.course} loadCart={loadCart} />;
                        })
                    }
                </div>
            </div>
        </>
    );
}