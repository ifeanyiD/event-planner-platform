import "../styles/footer.scss";
import { FaFacebook, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer__container">

        {/* COMPANY INFO */}
        <div className="footer__section">
          <h3>Event_</h3>
          <p>
            We create unforgettable events from weddings to corporate
            celebrations. Our mission is to turn your vision into reality.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="footer__section">
          <h4>Quick Links</h4>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Services</li>
            <li>Events</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer__section">
          <h4>Services</h4>
          <ul>
            <li>Wedding Planning</li>
            <li>Corporate Events</li>
            <li>Birthday Parties</li>
            <li>Concert Management</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="footer__section">
          <h4>Contact</h4>

          <p><FaPhone /> +234 913 195 6559</p>
          <p><FaEnvelope /> info@event_.com</p>
          <p><FaMapMarkerAlt /> Lagos, Nigeria</p>

          <div className="footer__socials">
            <FaFacebook />
            <FaInstagram />
          </div>
        </div>

      </div>


      {/* COPYRIGHT */}
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} EventMaster. All Rights Reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;