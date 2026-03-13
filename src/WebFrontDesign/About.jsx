import { Box, Button, Typography } from "@mui/joy";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const About = () => {
  const headingRef = useRef();
  const descRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    // hide text initially
    gsap.set([headingRef.current, descRef.current], {
      opacity: 0,
      textContent: ""
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-section",
        start: "top 70%",
        once: true
      }
    });

    tl.to(headingRef.current, {
      opacity: 1,
      duration: 0.3
    })

      .to(headingRef.current, {
        duration: 2,
        scrambleText: {
          text: "Building Intelligent Knowledge Systems",
          chars: "upperCase",
          speed: 0.4
        }
      })

      .to(descRef.current, {
        opacity: 1,
        duration: 0.3
      })

      .to(descRef.current, {
        duration: 3,
        scrambleText: {
          text: "Our platform transforms static documents into dynamic AI knowledge. Teams can instantly search, understand, and interact with their organization’s information through intelligent conversations.Our platform transforms static documents into dynamic AI knowledge. Teams can instantly search, understand, and interact with their organization’s information through intelligent conversations Our platform transforms static documents into dynamic AI knowledge. Teams can instantly search, understand, and interact with their organization’s information through intelligent conversations.Our platform transforms static documents into dynamic AI knowledge. Teams can instantly search, understand, and interact with their organization’s information through intelligent conversations ",
          chars: "lowerCase ",
          speed: 0.3
        }
      });

  }, []);

  return (
    <Box
      id="about"
      sx={{
        width: '100%',
        position: 'relative',
        height: "100vh",
        bgcolor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: 10
      }}
    >
      <Typography
        level="h1"
        sx={{
          color: "#ffffff",
          mb: 3,
          fontWeight: 700,
          fontSize: 50
        }}
      >
        ABOUT US
      </Typography>
      <Box sx={{ maxWidth: '90%', textAlign: "center", overflow: 'hidden' }}>

        <Typography
          level="h1"
          ref={headingRef}
          sx={{
            color: "#6c7cff",
            mb: 3,
            fontWeight: 700,
            fontSize: 30
          }}
        />

        <Typography
          level="body-lg"
          ref={descRef}
          sx={{
            color: "#fcfcfc",
            fontSize: "15px",
            lineHeight: 1.7
          }}
        />
        <Button
          onClick={() => navigate("/about")}
          size="lg"
          sx={{
            mt: 4,
            border: "1px solid #6c7cff",
            background: "transparent",
            "&:hover": { bgcolor: "#5a6bff" },
          }}
        >
          Explore More About Us
        </Button>
      </Box>
    </Box>
  );
};

export default About;