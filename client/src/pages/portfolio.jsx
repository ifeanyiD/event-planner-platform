import { useEffect, useState } from "react";
import "../styles/Portfolio.scss";
import A from "../assets/a.jpg";
import B from "../assets/b.jpg";
import C from "../assets/c.jpg";
import D from "../assets/d.jpg";
import E from "../assets/conference.jpg";
import API from "../api/axios";

const categories = ["All", "Wedding", "Corporate", "Birthday", "Conference", "Private"];
const evts = [
  {
    _id : 1,
    title : "Wedding",
    location : "Lagos State",
    year : 2025,
    category : "Wedding",
    img : [A]
  },
  {
    _id : 2,
    title : "Corporate",
    location : "Lagos State",
    year : 2025,
    category : "Corporate",
    img : [B]
  },
  {
    _id : 3,
    title : "Birthday",
    location : "Abuja",
    year : 2026,
    category : "Birthday",
    img : [C]
  },
  {
    _id : 4,
    title : "Wedding",
    location : "Lagos State",
    year : 2025,
    category : "Private",
    img : [D]
  },
  {
    _id : 5,
    title : "Conference",
    location : "Osun State",
    year : 2026,
    category : "Wedding",
    img : [E]
  },
]
export default function Portfolio() {
  const [events, setEvents] = useState(evts);
  const [filter, setFilter] = useState("All");

  // useEffect(() => {
  //   API.get("/api/events").then(res => {
  //       setEvents(res.data);
  //       console.log("coming from contact", res)
  //   });
  // }, []);

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter(e => e.category === filter);

  return (
    <div className="portfolio">

      {/* HERO */}
      <section className="portfolio__hero">
        <h1>Our Portfolio</h1>
        <p>Crafting unforgettable experiences.</p>
      </section>

      {/* FILTER */}
      <div className="portfolio__filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={filter === cat ? "active" : ""}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="portfolio__grid">
        {filteredEvents.map(event => (
          <div key={event._id} className="card">
            <img src={event.img[0]} alt={event.title} />
            <div className="card__overlay">
              <h3>{event.title}</h3>
              <p>{event.category} | {event.location} | {event.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section className="portfolio__cta">
        <h2>Ready to plan your event?</h2>
        <button>Book Consultation</button>
      </section>
    </div>
  );
}