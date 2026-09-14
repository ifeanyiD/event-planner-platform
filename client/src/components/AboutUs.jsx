import {useNavigate} from "react-router-dom";
import "../styles/AboutUs.scss";

const AboutUs = () => {

  const navigate = useNavigate();

  return (
    <div className="about">

      {/* HERO */}
      <section className="about__hero">
        <div className="about__hero-content">
          <h1>Creating Unforgettable Events</h1>
          <p>
            We are a professional event planning company dedicated to
            organizing beautiful, memorable and perfectly executed events.
          </p>
          <button onClick={()=>navigate("/contact")}>Book an Event</button>
        </div>
      </section>

      <section>
        <div className="container">
          <h3>We Turn Moments Into Memories</h3>
          <p> We are a passionate event planning team dedicated to creating memorable experiences that are beautifully planned, well-organized, and tailored to every client. From intimate celebrations to grand occasions, we take care of the details so you can focus on enjoying your special moment. Our services cover event planning, coordination, decoration, vendor management, and on-the-day support.
            We believe every event is unique. That is why we work closely with our clients to understand their vision, preferences, and expectations, turning their ideas into an event they can truly be proud of.
          </p>
          <h3>Why Choose Us?</h3>
          <h4>Professional Planning</h4>
          <p>We carefully organize every aspect of your event from concept to execution.</p>
          <h4>Attention to Detail</h4>
          <p>We pay attention to the small details that make a big difference.</p>
          
        </div>
      </section>

      {/* TEAM */}
      <section className="about__team">
        <h2>Meet Our Team</h2>

        <div className="team">

          <div className="member">
            <img src="https://randomuser.me/api/portraits/women/44.jpg"/>
            <h4>Sarah Johnson</h4>
            <p>Creative Director</p>
          </div>

          <div className="member">
            <img src="https://randomuser.me/api/portraits/men/32.jpg"/>
            <h4>Michael Brown</h4>
            <p>Event Coordinator</p>
          </div>

          <div className="member">
            <img src="https://randomuser.me/api/portraits/women/68.jpg"/>
            <h4>Emily Davis</h4>
            <p>Decor Specialist</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <h2>Ready to Plan Your Event?</h2>
        <p>Let’s work together to make your event unforgettable.</p>
        <button onClick={()=>navigate("/contact")}>Contact Us</button>
      </section>

    </div>
  );
};

export default AboutUs;