import React, { useEffect, useState } from 'react';
import A from "../assets/a.jpg"
import B from "../assets/b.jpg";
import C from "../assets/c.jpg"
import "../styles/nero.scss";
import { getEvents } from '../api/api';

const types = [ "Social", "Birthday", "Anniversary", "Wedding"]

export default function Nero() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [counter, setCounter] = useState(0);
  const [events, setEvents] = useState([A,B,C]);

  // Fetch from backend
  // useEffect(()=>{
  //   const fetchEvents = async () => {
  //     try {
  //       const {data} = await getEvents();

  //       setEvents(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchEvents()
  // },[]);

  // Preload images
  useEffect(() => {
    if(events.length === 0) return;

     let loadedCount = 0;

      events.forEach((src) => {
        const img = new Image();
        img.src = src;

        img.onload = () => {
          loadedCount++;
          if (loadedCount === events.length) {
            setLoaded(true); // all images loaded
          }
        };
      });
  }, [events]);

  useEffect(() => {
    if(!loaded) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval)
  }, [loaded]);

  useEffect(()=>{
    const interval = setInterval(() => {
      setCounter((prev)=> (prev + 1) % types.length)
    }, 3000);
    return () => clearInterval(interval) 
  }, []);

    if (!loaded) {
    return (
      <section className="hero">
        <div className="overlay" />
        <div className="content">
          <h1>Loading images...</h1>
        </div>
      </section>
    );
  }

  return (
    <section className='hero'>
      {events.map((img, i) => (
        <div
          key={i}
          className={`slide ${i === index ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

        <div className='overlay'></div>

        <div className='container'>
          <h1>Let’s make your <span>{types[counter]}</span> Party unforgettable—together</h1>
          <h3>based in Germany</h3>
          <button>Book an Event</button>
        </div>
    </section>
  );
}
