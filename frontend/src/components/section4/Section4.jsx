import React from 'react';
import './section4.css';
import im2 from '../../assets/im2.jpg';
import im3 from '../../assets/im3.jpg';
import im4 from '../../assets/im4.jpg';

const Section4 = () => {
    const clientsData = [
        {
            imgSrc: im4,
            quote:
                "I have always been skeptical about online courses, but this web app completely changed my perspective. The course selection is fantastic, the user interface is intuitive, and the learning experience is top-notch. I've gained valuable skills and knowledge that have boosted my career. Highly recommended!",
            name: 'Emily S.',
        },
        {
            imgSrc: im3,
            quote:
                "As a lifelong learner, I've tried several online platforms, but this course selling web app stands out from the rest. The courses offered are up-to-date, well-structured, and taught by industry experts. The app's user-friendly design makes navigation a breeze. I've found my go-to platform for continuous learning.",
            name: 'Mark H.',
        },
        {
            imgSrc: im2,
            quote:
                "I'm thrilled with my learning journey on this course selling web app. The variety of courses available cater to all levels of learners. The interactive content, quizzes, and assignments kept me engaged throughout the courses. It's incredible how much I've grown professionally thanks to this platform. Bravo!",
            name: 'Sarah M.',
        },
    ];

    return (
        <section className="section4">
            <h4>What our clients say</h4>
            <div className="clients-container">
                {clientsData.map((client, index) => (
                    <div className="clients-box" key={index}>
                        <img src={client.imgSrc} alt="" />
                        <div className="clients-box-content">
                            <p>{client.quote}</p>
                            <h5>{client.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section4;