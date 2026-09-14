import React, { useState } from 'react';
import Nero from '../components/nero';
import {useNavigate} from "react-router-dom";
import { MdEvent } from "react-icons/md";
import { IoLogoDesignernews } from "react-icons/io5";
import { SiManageiq } from "react-icons/si";
import { IoLinkSharp } from "react-icons/io5";
import { GrFormView } from "react-icons/gr";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdEventSeat } from "react-icons/md";
import A from "../assets/a.jpg"
import B from "../assets/b.jpg"

import "../styles/root.scss";
import Modal from '../utils/modal';

const fontSize = 25;

const imgs = [A, B];
  
export default function Root() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [index, setIndex] = useState(0);
  const arr = Array.from({length : 4});
  
  const nextTestimony = () => {
    setRotation(prev => prev - 90);
    let indexUpdate =  index === 3 ? 0 : index + 1
    setIndex(indexUpdate)
  };

  const navigate = useNavigate();

  return (
    <div className='root'>
      <Nero/>
          
      {/* STORY */}
    <section className="root__story">
      <div className="container">
        <h2>Our Story</h2>
        <p>
          Our journey started with a passion for bringing people together
          through extraordinary experiences. From small celebrations to
          large corporate events, our team focuses on creativity,
          organization, and attention to detail.
        </p>
      </div>
    </section>

    {/* STATS */}
    <section className="root__stats">
      <div className="stat">
        <h3>500+</h3>
        <p>Events Organized</p>
      </div>

      <div className="stat">
        <h3>300+</h3>
        <p>Happy Clients</p>
      </div>

      <div className="stat">
        <h3>10+</h3>
        <p>Years Experience</p>
      </div>

      <div className="stat">
        <h3>50+</h3>
        <p>Professional Staff</p>
      </div>
    </section>
    
    {/* SERVICES */}
    <section className="root__services">
      <div className='container'>
        <h2>Our Services</h2>

          <div className="services">

            <div className="service">
              <h3>Wedding Planning</h3>
              <MdEvent fontSize={fontSize} color='orange'/>
              <p>Elegant and unforgettable weddings tailored to your dream.</p>
            </div>

            <div className="service">
              <h3>Corporate Events</h3>
              <SiManageiq color='orange' fontSize={fontSize}/>
              <p>Professional conferences and brand events.</p>
            </div>

            <div className="service">
              <h3>Birthday Parties</h3>
              <IoLogoDesignernews color='orange' fontSize={fontSize}/>
              <p>Creative and exciting celebrations.</p>
            </div>

            <div className="service">
              <h3>Concerts & Shows</h3>
              <MdEventSeat color='orange' fontSize={fontSize}/>
              <p>Large-scale entertainment events.</p>
            </div>

          </div>
      </div>
    </section>

    {/* PORTFOLIO */}
    <section className='root_portfolio'>
      <div className='container'>
        <div className='title'>
          <h3>Amazing Work</h3>
          <p>Pictures Speak about our Covered Events</p>
        </div>
        <div className='r_portfolio'>
          {
            imgs.map((i, idx)=>
              <div key={idx} className= 'imgs'>
                <img src={i}/>
                <div className='img_opt'>
                  <label>Event</label>
                  <div>
                    <span onClick={()=>setSelectedImg(i)}><GrFormView/></span>
                    <span><IoLinkSharp/></span>
                  </div>
                </div>
              </div>
          )}
          
        </div>
        <button className='v_more'>View More</button>
      </div>
    </section>
      
    {/* TESTIMONY */}

    <section className='testimony'>
        <div className='container'>
          <h2>What our <span>customer say</span></h2>
          <div className='scene'>
            <div className='cube' style={{transform:`rotateY(${rotation}deg)`}}>
              <div className="face front">Testimony 1</div>
              <div className="face right">Testimony 2</div>
              <div className="face back">Testimony 3</div>
              <div className="face left">Testimony 4</div>
            </div>
          </div>
          <div className='t_btn'>
            <button onClick={nextTestimony} >Next</button>
            {
              arr.map((_, idx)=> <span key={idx} style={index === idx ? {backgroundColor : "blue"} : {backgroundColor : "inherit"}}></span>)
            }
          </div>
        </div>
    </section>
    
    {/* CONTACT */}
    <section className='r_contact'>
      <div className='container'>
        <h1>Do you have an <span>Event</span> to celebrate?</h1>
        <h4>We are ready to plan your Events</h4>
        <button onClick={()=> navigate("/contact")}>
          <FaArrowTrendUp/>
          <span>Contact us</span>
        </button>
      </div>
    </section>

      {selectedImg &&
        <Modal setSelectedImg={setSelectedImg}>
          <img src={selectedImg} alt="Preview" />
        </Modal>
      }
    </div>
  );
}
