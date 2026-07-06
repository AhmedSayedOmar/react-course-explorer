import './HomePage.css'
import './header.css'
import { NavLink } from 'react-router';

import { Header } from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Course} from './Course';
export function HomePage() {
    
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        const fetchCourses = async () => {
            const response = await axios.get('/api/courses');
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

   

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
                            return <Course key={course.id} course={course} />;
                        })
                    }
                </div>
            </div>
        </>
    );
}