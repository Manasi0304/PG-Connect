import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import hero1 from "../../assets/Hero1.jpg";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* Left Side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle" />
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Find Your Perfect Stay, <br />
              Effortlessly! <br />
            </motion.h1>
          </div>
          <div className="flexColStart secondaryText hero-description">
            <span>
              Comfortable, affordable, and well-maintained PGs with all the
              amenities you need. Book your stay now!
            </span>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Stats Section */}
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={0} end={100} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Affordable Living Spaces</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={100} end={200} duration={4} /> <span>+</span>
              </span>
              <span className="secondaryText">Happy Customers</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="secondaryText">Locations in Pune</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flexCenter hero-right">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 2,
              type: "ease-in",
            }}
            className="image-container"
          >
            <img src={hero1} alt="Property Showcase" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
