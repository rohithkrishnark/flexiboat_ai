import Navbar from "./Component/Navbar";
import "./Home.css";
import About from "./WebFrontDesign/About";
import Footer from "./WebFrontDesign/Footer";
import Main from "./WebFrontDesign/Main";
import ChatComponent from "./WebFrontDesign/ShowCase/ChatComponent";
import ContactUs from "./WebFrontDesign/ShowCase/ContactUs";
import ECGSection from "./WebFrontDesign/ShowCase/ECGSection";
import HorizontalScrollingAi from "./WebFrontDesign/ShowCase/HorizontalScrollingAi";

function Home() {
  return (
    <div className="parent">
      <Navbar />

      <div className="page-content">
        <Main />
        <HorizontalScrollingAi />
        <ECGSection />
        <About />
        <ChatComponent />
        <ContactUs />
        <Footer />
      </div>
    </div>
  );
}

export default Home;
