import Navbar from "./Component/Navbar";
import "./Home.css";
import ai from "../src/assets/newai.gif";
import brain from '../src/assets/newbrain.png'
import { useEffect, useState } from "react";

function Home() {
 const texts = [
  "Get instant answers, in-depth academic guidance, and concept explanations powered by advanced AI, designed to support  learning .",
  
  "Upload your academic documents, notes, or study materials and receive smart summaries, insights, and explanations within seconds.",
  
  "Ask questions, explore complex topics, clarify doubts, and accelerate your learning journey with an intelligent academic assistant.",
  
  "FlexiBot acts as your personal academic companion, helping you study smarter, stay organized, and achieve better academic results."
];


  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true); // fade in
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parent">
      <Navbar />
      <div className="home">
        {/* HERO SECTION */}
        <div className="hero">
          <div className="hero-left">
            <span className="tagline">Academic Assistant</span>
            <h1>
              Smart learning 
            <img src={ai} alt="Chatbot" className="hero-image" /><br />
              powered by <span>FLEXIBOT</span>
            </h1>

            <p className={`fade-text ${fade ? "fade-in" : "fade-out"}`}>
              {texts[index]}
            </p>

            <button className="primary-btn">Recent Queries</button>
          </div>

          <div className="hero-right">
            <img src={brain} alt="Chatbot" className="hero-image2" />
          </div>
        </div>

        {/* DASHBOARD SECTION */}
        <div className="dashboard">
          <div className="card">
            <h3>📄 Documents</h3>
            <p>Access academic files and notices</p>
          </div>

          <div className="card">
            <h3>📊 Analytics</h3>
            <p>Track usage and performance</p>
          </div>

          <div className="card">
            <h3>📢 Announcements</h3>
            <p>Latest updates & recent queries</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
