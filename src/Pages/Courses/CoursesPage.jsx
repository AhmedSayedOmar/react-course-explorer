import './CoursesPage.css'
import { NavLink } from 'react-router';
import { useSearchParams } from 'react-router';
import {Header} from '../../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Course} from './Course';
export function CoursesPage({cart,loadCart}) {
    
    const [courses, setCourses] = useState([]);
    const [searchParams] = useSearchParams();
    const search=searchParams.get("search");
    useEffect(() => {
        let response;
        const fetchCourses = async () => {
            const url=search ? `${import.meta.env.VITE_API_URL}/api/courses?search=${search}` : `${import.meta.env.VITE_API_URL}/api/courses`;
            response = await axios.get(url);
            setCourses(response.data);
        };
        fetchCourses();
    }, [search]);
   
    return (
        <>
            <Header cart={cart}/>
            <div className="header-text">
                <p className="order-heading-text">Advanced Programs</p>
                <p className="order-subheading-text">Master low-level engineering and scalable architecture with expert-led courses.</p>
            </div>
            <div className="home-page">
                <div className="products-grid">
                    {
                        courses.map((course) => {
                            return <Course key={course.id} course={course} loadCart={loadCart} />;
                        })
                    }
                </div>
            </div>
        </>
    );
}