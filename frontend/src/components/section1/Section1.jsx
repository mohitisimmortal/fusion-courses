import React from 'react'
import './section1.css'
import Section2 from '../section2/Section2';
import Section3 from '../section3/Section3';
import Section4 from '../section4/Section4';
import Footer from '../footer/Footer';
import Section5 from '../section5/Section5';

function Section1() {
  return (
    <>
      <section className='section1'>
        <div className="section1-left">
          <h6>Upgrade Your Skill</h6>
          <h1>Fusion of <br /> Skills & Tech</h1>
          <p>Join a growing community, get peer insights, and discover <br />exciting business opportunities and collaborations.</p>
          <span>
            <a href="#section3" className='startbtn'>Start Learning</a>
          </span>
        </div>

        <div className="section1-right">
          <div>
            <svg fill="#e39ff6" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M925 687q-31-8-52-19-35-18-35-42 0-6-5-10.5t-12-3.5q-29 4-62-31-20-22-37-53-1-3-4-3t-4 3q-17 31-37 53-33 35-62 31-7-1-12 3.5t-5 10.5q1 24-34 42-22 11-52 19-3 0-4 2.5t1 4.5q22 26 35 50 22 41 14 65-2 5 .5 10.5t7.5 7.5q18 8 25 42 5 21 5 47 0 3 2.5 4.5t4.5.5q26-13 50-16 37-6 54 15 4 5 11 5t11-5q17-21 55-15 23 3 49 15 3 2 5 .5t2-4.5q0-26 5-48 8-33 25-41 5-2 7.5-7t.5-10q-8-25 14-65 13-25 35-51 2-2 1-4.5t-3-2.5zm-97 34l-5 7q-33 42-32 95v4q0 4-3 6.5t-7 2.5h-2l-11-3q-50-15-100 0l-11 3h-2q-4 0-7-2.5t-3-6.5v-4q1-53-32-95l-5-7q-3-3-1.5-7.5t6.5-5.5q29-8 54-24t42-40l1-1q3-4 8-4t8 4l1 1q17 24 41.5 40t54.5 24q5 1 6.5 5.5T828 721zM533 885q-1-4-5-6-21-10-30.5-31.5T495 804q4-14-2-27-13-24-31-45-10-12-13.5-28t1-32 17-27.5 30-15.5 34.5-11q4-3 5-8 0-4-3-7l-34-52q-6-8-14-15-2-2-1.5-4t2.5-4q60-28 98-83 39-58 39-124 0-63-31-116t-84-84-115.5-31T277 121t-84 84-31 116q0 66 39 124 38 54 98 83 2 1 2 3.5t-1 4.5q-8 7-14 15-88 131-132 205-18 32-18 52 0 28 34.5 51.5t93.5 37T393 910q72 0 134-15 3-1 4.5-3.5t1.5-6.5z"></path></g></svg>
          </div>
        </div>
      </section>

      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Footer />
    </>
  )
}

export default Section1;