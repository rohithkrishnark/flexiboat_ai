import './Home.css';

function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-left">
          <span className="tagline">Academic Assistant</span>

          <h1>
            Smart learning <br />
            powered by <span>FLEXIBOT</span>
          </h1>

          <p>
            Get instant answers, academic hello   guidance, documents,
            and insights using AI.
          </p>

          <button className="primary-btn">
            Recent Queries
          </button>
        </div>

        <div className="hero-right">
          <img
            src="/bot.png"
            alt="Chatbot"
            className="hero-image"
          />
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
  );
}

export default Home;
