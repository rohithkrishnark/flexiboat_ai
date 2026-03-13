import React, { useEffect, useState, useRef } from "react";
import { Box, Typography } from "@mui/joy";
import gsap from "gsap";

const PageLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const textRef = useRef([]);
  const pathRefs = useRef([]);

useEffect(() => {
  const numPoints = 10;
  const numPaths = 2;
  const delayPointsMax = 0.3;
  const delayPerPath = 0.25;

  let pointsDelay = [];
  let allPoints = [];

  const tl = gsap.timeline({
    onUpdate: render
  });

  // create morph points
  for (let i = 0; i < numPaths; i++) {
    let points = [];
    for (let j = 0; j < numPoints; j++) {
      points.push(100);
    }
    allPoints.push(points);
  }

  // FLEXIBOT writing animation
  tl.fromTo(
    textRef.current,
    {
      strokeDasharray: 500,
      strokeDashoffset: 500
    },
    {
      strokeDashoffset: 0,
      duration: 2,
      stagger: 0.2,
      ease: "power2.out"
    }
  )

  // pause after writing
  .to({}, { duration: 0.4 });

  // prepare delays
  for (let i = 0; i < numPoints; i++) {
    pointsDelay[i] = Math.random() * delayPointsMax;
  }

  // MORPH animation (now INSIDE timeline)
  for (let i = 0; i < numPaths; i++) {
    let points = allPoints[i];
    let pathDelay = delayPerPath * i;

    for (let j = 0; j < numPoints; j++) {
      let delay = pointsDelay[j];

      tl.to(
        points,
        {
          [j]: 0,
          duration: 0.9,
          ease: "power2.inOut"
        },
        delay + pathDelay
      );
    }
  }

  // wait for morph to finish
  tl.to({}, { duration: 1.2 });

  // show page
  tl.add(() => setLoading(false));

  function render() {
    for (let i = 0; i < numPaths; i++) {
      let path = pathRefs.current[i];
      let points = allPoints[i];

      if (!path) return;

      let d = `M 0 ${points[0]} C`;

      for (let j = 0; j < numPoints - 1; j++) {
        let p = ((j + 1) / (numPoints - 1)) * 100;
        let cp = p - (100 / (numPoints - 1)) / 2;

        d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
      }

      d += ` V 0 H 0`;
      path.setAttribute("d", d);
    }
  }

}, []);
  if (loading) {
    return (
      <Box
        sx={{
          position: "fixed",
          height: "100vh",
          width: "100%",
          background: "#0b0b0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          overflow: "hidden"
        }}
      >

        {/* FLEXIBOT DRAW */}
        <svg width="520" height="120">
          {["F", "L", "E", "X", "I", "B", "O", "T"].map((letter, i) => (
            <text
              key={i}
              ref={(el) => (textRef.current[i] = el)}
              x={40 + i * 55}
              y="80"
              fontSize="64"
              fill="transparent"
              stroke="#6823d6"
              strokeWidth="2"
              style={{ fontFamily: "monospace" }}
            >
              {letter}
            </text>
          ))}
        </svg>

        <Typography sx={{ color: "#aaa", mt: 2 }}>
          Initializing AI Assistant...
        </Typography>

        {/* MORPH OVERLAY */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0
          }}
        >
          <defs>

            <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff8709"/>
              <stop offset="100%" stopColor="#f7bdf8"/>
            </linearGradient>

            <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffd9b0"/>
              <stop offset="100%" stopColor="#ff8709"/>
            </linearGradient>

          </defs>

          <path ref={(el) => (pathRefs.current[0] = el)} fill="url(#gradient2)"/>
          <path ref={(el) => (pathRefs.current[1] = el)} fill="url(#gradient1)"/>

        </svg>

      </Box>
    );
  }

  return children;
};

export default PageLoader;