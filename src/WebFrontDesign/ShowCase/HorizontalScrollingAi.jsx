import React, { useEffect, useRef } from "react";
import { Box, Typography, Card, Button } from "@mui/joy";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollingAi = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".panel");

      gsap.to(scrollRef.current, {
        x: () => -(scrollRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () =>
            "+=" + (scrollRef.current.scrollWidth - window.innerWidth),
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const slideStyle = {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 10,
  };

  const contentStyle = {
    maxWidth: "1400px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    alignItems: "center",
  };

  const textBox = {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  };

  const featureGrid = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 3,
  };

  const cardStyle = {
    p: 3,
    borderRadius: "14px",
    bgcolor: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(12px)",
    // border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
      border: "1px solid rgba(108,124,255,0.4)",
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        height: "100vh",
        overflow: "hidden",
        bgcolor: "#050505",
      }}
    >
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          width: "400vw",
          height: "100%",
        }}
      >

        {/* PANEL 1 */}
        <Box className="panel" sx={slideStyle}>
          <Box sx={contentStyle}>
            <Box sx={textBox}>
              <Typography level="title-lg" sx={{ color: "#6c7cff" }}>
                AI College Assistant
              </Typography>

              <Typography level="h1" sx={{ color: "white" }}>
                Smart Chatbot for College Management
              </Typography>

              <Typography level="body-lg" sx={{ color: "#9a9a9a" }}>
                A centralized AI system designed to help students,
                faculty, alumni, and administrators instantly access
                information related to academics, policies, schedules,
                and campus services.
              </Typography>

              <Button
                size="lg"
                sx={{
                  bgcolor: "#6c7cff",
                  width: "220px",
                }}
              >
                Explore AI System
              </Button>
            </Box>

            <Box sx={featureGrid}>
              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Student Support</Typography>
                <Typography level="body-sm">
                  Ask about timetables, assignments, results,
                  and course materials instantly.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Faculty Assistance</Typography>
                <Typography level="body-sm">
                  Manage class resources, attendance,
                  and academic documentation easily.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Admin Control</Typography>
                <Typography level="body-sm">
                  Administrators manage departments,
                  faculty data, and institutional policies.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Alumni Network</Typography>
                <Typography level="body-sm">
                  Alumni stay connected with college
                  updates and career opportunities.
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* PANEL 2 */}
        <Box className="panel" sx={slideStyle}>
          <Box sx={contentStyle}>
            <Box sx={textBox}>
              <Typography level="title-lg" sx={{ color: "#6c7cff" }}>
                Knowledge Processing
              </Typography>

              <Typography level="h1" sx={{ color: "white" }}>
                AI That Understands College Data
              </Typography>

              <Typography level="body-lg" sx={{ color: "#9a9a9a" }}>
                The system processes documents, policies,
                academic guidelines, and institutional records
                to build a powerful AI knowledge base.
              </Typography>

              <Button
                size="lg"
                variant="outlined"
                sx={{ borderColor: "#6c7cff", color: "#6c7cff" }}
              >
                How AI Works
              </Button>
            </Box>

            <Box sx={featureGrid}>
              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Document Parsing</Typography>
                <Typography level="body-sm">
                  Extracts structured knowledge from
                  PDF, DOC, and institutional files.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Semantic Search</Typography>
                <Typography level="body-sm">
                  AI retrieves answers based on meaning,
                  not just keywords.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Context Awareness</Typography>
                <Typography level="body-sm">
                  AI understands department,
                  course, and student context.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Continuous Learning</Typography>
                <Typography level="body-sm">
                  The AI improves as more
                  academic data is uploaded.
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* PANEL 3 */}
        <Box className="panel" sx={slideStyle}>
          <Box sx={contentStyle}>
            <Box sx={textBox}>
              <Typography level="title-lg" sx={{ color: "#6c7cff" }}>
                AI Interaction
              </Typography>

              <Typography level="h1" sx={{ color: "white" }}>
                Ask Questions — Get Instant Answers
              </Typography>

              <Typography level="body-lg" sx={{ color: "#9a9a9a" }}>
                Students, faculty, and administrators
                simply ask the chatbot questions and
                receive intelligent answers instantly.
              </Typography>

              <Button
                size="lg"
                sx={{
                  bgcolor: "#6c7cff",
                  width: "220px",
                }}
              >
                Try Chatbot
              </Button>
            </Box>

            <Box sx={featureGrid}>
              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Academic Queries</Typography>
                <Typography level="body-sm">
                  Students ask about syllabus,
                  exams, and assignments.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Policy Questions</Typography>
                <Typography level="body-sm">
                  Instantly retrieve college
                  rules and procedures.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Campus Information</Typography>
                <Typography level="body-sm">
                  Find labs, departments,
                  and campus services quickly.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Administrative Support</Typography>
                <Typography level="body-sm">
                  AI assists with institutional
                  processes and workflows.
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* PANEL 4 */}
        <Box className="panel" sx={slideStyle}>
          <Box sx={contentStyle}>
            <Box sx={textBox}>
              <Typography level="title-lg" sx={{ color: "#6c7cff" }}>
                Future Ready
              </Typography>

              <Typography level="h1" sx={{ color: "white" }}>
                The Next Generation Campus Platform
              </Typography>

              <Typography level="body-lg" sx={{ color: "#9a9a9a" }}>
                This AI powered system transforms
                traditional college management into
                an intelligent digital campus.
              </Typography>

              <Button
                size="lg"
                sx={{
                  bgcolor: "#6c7cff",
                  width: "220px",
                }}
              >
                Get Started
              </Button>
            </Box>

            <Box sx={featureGrid}>
              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Unified Platform</Typography>
                <Typography level="body-sm">
                  Students, faculty, and alumni
                  use one intelligent system.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>24/7 AI Assistant</Typography>
                <Typography level="body-sm">
                  Answers questions anytime
                  without human support.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Smart Insights</Typography>
                <Typography level="body-sm">
                  AI analyzes academic
                  and operational data.
                </Typography>
              </Card>

              <Card sx={cardStyle}>
                <Typography level="title-md" sx={{color:"white"}}>Digital Transformation</Typography>
                <Typography level="body-sm">
                  Move from traditional
                  management to AI powered systems.
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default HorizontalScrollingAi;