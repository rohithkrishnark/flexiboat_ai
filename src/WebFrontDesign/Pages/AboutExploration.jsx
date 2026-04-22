import React from "react";
import PageLoader from "../../Component/PageLoader";
import { Box, Typography, Card, CardContent } from "@mui/joy";
import bismi from '../../assets/louthfac/bismi k charley.jpg'
import MEENU from '../../assets/louthfac/MEENU V S.jpg'
import RAMYA from '../../assets/louthfac/RAMYA KRISHNAN S.jpg'
import SELMA from '../../assets/louthfac/SELMA JOSEPH.jpg'
import SHERIN from '../../assets/louthfac/SHERIN JOSEPH.jpg'
import sureshkumar from '../../assets/louthfac/sureshkumar s.jpg'
import lourth from '../../assets/louth.jpg'

const features = [
  {
    title: "Students",
    desc: "Students can explore academic resources, interact with departments, track academic activities and collaborate with faculty."
  },
  {
    title: "Faculty",
    desc: "Faculty members guide students, conduct research, manage academic programs and mentor future professionals."
  },
  {
    title: "Departments",
    desc: "Departments manage academic programs, organize research activities and support institutional development."
  },
  {
    title: "Alumni",
    desc: "Alumni stay connected with the institution, share experiences and mentor students entering the professional world."
  }
];

const faculty = [
  {
    name: "Dr. John Mathew",
    dept: "Computer Science",
    img: bismi
  },
  {
    name: "Dr. Anitha Thomas",
    dept: "Electronics",
    img: MEENU
  },
  {
    name: "Dr. Rajesh Kumar",
    dept: "Mechanical",
    img:RAMYA
  },
  {
    name: "Dr. Neha Nair",
    dept: "Civil Engineering",
    img: SELMA
  },
  {
    name: "Dr. Arun Joseph",
    dept: "Electrical Engineering",
    img: SHERIN
  },
   {
    name: "Dr. Suresh Kumar",
    dept: "Electrical Engineering",
    img: sureshkumar
  }
];

const AboutExploration = () => {
  return (
    <PageLoader>
      <Box sx={{ width: "100%", bgcolor: "#000", color: "#fff" }}>

        {/* PLATFORM INTRO */}
        <Box
          sx={{
            maxWidth: 1000,
            mx: "auto",
            py: 12,
            px: 4,
            textAlign: "center",
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            height:'100vh'
          }}
        >
          <Typography level="h1" sx={{ fontSize: 48, mb: 3, color: "#651bdb" }}>
            Academic Collaboration Platform
          </Typography>

          <Typography sx={{ color: "#aaa", fontSize: 18, lineHeight: 1.8 }}>
            This platform is designed to strengthen collaboration between
            students, faculty members, departments and alumni. It provides
            a centralized environment where academic resources, research
            opportunities and institutional activities can be explored
            efficiently.
            <br /><br />
            Through this system students can connect with faculty mentors,
            departments can organize academic activities, and alumni can
            stay connected with the institution. The goal is to build a
            strong academic ecosystem that encourages innovation,
            knowledge sharing and professional development.
          </Typography>
        </Box>

        {/* HERO */}
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            px: 4
          }}
        >
          <Typography level="h1" sx={{ fontSize: 44, mb: 2,color:'#651bdb' }}>
            Lourdes Matha College of Science and Technology
          </Typography>

          <Typography sx={{ maxWidth: 750, color: "#aaa", fontSize: 18 }}>
            A premier engineering institution established in 2002,
            dedicated to developing innovative engineers, researchers,
            and socially responsible leaders.
          </Typography>
        </Box>

        {/* ABOUT COLLEGE */}
        <Box
          sx={{
            maxWidth: 1100,
            mx: "auto",
            py: 10,
            px: 4,
            textAlign: "center"
          }}
        >
          <Typography level="h2" sx={{ mb: 3, color: "#591cc1"}}>
            About the Institution
          </Typography>

          <Typography sx={{ color: "#bbb", lineHeight: 1.8 }}>
            Lourdes Matha College of Science and Technology is located
            near Kuttichal in Thiruvananthapuram, Kerala. Established in
            2002 by the Lourdes Matha Catholic Educational Society,
            the institution focuses on delivering quality engineering
            education and fostering innovation.
            <br /><br />
            The college is approved by AICTE and affiliated with
            APJ Abdul Kalam Technological University. The campus
            spans approximately 25 acres surrounded by natural
            greenery near the Western Ghats, creating a peaceful
            environment for academic excellence.
          </Typography>
        </Box>

        {/* VISION MISSION */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 4,
            px: 4,
            pb: 10
          }}
        >
          <Card sx={{ bgcolor: "#111", border: "1px solid #222" }}>
            <CardContent>
              <Typography level="h3" sx={{ mb: 2, color: "#ff8709" }}>
                Vision
              </Typography>

              <Typography sx={{ color: "#aaa" }}>
                To become a center of excellence in professional
                education by fostering innovation, research and
                technology that contributes to societal development.
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ bgcolor: "#111", border: "1px solid #222" }}>
            <CardContent>
              <Typography level="h3" sx={{ mb: 2, color: "#ff8709" }}>
                Mission
              </Typography>

              <Typography sx={{ color: "#aaa" }}>
                To develop skilled engineers and professionals,
                encourage research and creativity, and promote
                continuous learning in a collaborative academic
                environment.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* FEATURES */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: 4,
            px: 4,
            pb: 10
          }}
        >
          {features.map((item, index) => (
            <Card
              key={index}
              sx={{
                bgcolor: "#111",
                border: "1px solid #222",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-8px)",
                  borderColor: "#651bdb"
                }
              }}
            >
              <CardContent>
                <Typography level="h4">{item.title}</Typography>
                <Typography sx={{ color: "#aaa", fontSize: 14 }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* FACULTY SCROLLER */}
        <Box sx={{ py: 10, px: 4 }}>
          <Typography level="h2" textAlign="center" sx={{color:'#651bdb'}} mb={5}>
            Our Faculty
          </Typography>

          <Box
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              pb: 2
            }}
          >
            {faculty.map((f, i) => (
              <Card
                key={i}
                sx={{
                  minWidth: 220,
                  bgcolor: "#111",
                  border: "1px solid #222",
                  flexShrink: 0
                }}
              >
                <img
                  src={f.img}
                  alt={f.name}
                  style={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover"
                  }}
                />

                <CardContent>
                  <Typography level="title-md">
                    {f.name}
                  </Typography>

                  <Typography sx={{ color: "#aaa", fontSize: 14 }}>
                    {f.dept}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* CAMPUS */}
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 6,
            px: 4,
            pb: 12
          }}
        >
          <Box
            sx={{
              height: 350,
              bgcolor: "#111",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666"
            }}
          >
             <img
                  src={lourth}
                  alt={"collger"}
                  style={{
                    width: "100%",
                    height: '100%',
                    objectFit: "cover",
                    borderRadius:10
                  }}
                />
          </Box>

          <Box>
            <Typography level="h2" sx={{ mb: 2 ,color: "#591cc1" }}>
              Campus & Facilities
            </Typography>

            <Typography sx={{ color: "#aaa", lineHeight: 1.8 }}>
              The campus provides modern infrastructure including
              advanced laboratories, computer centers, libraries,
              seminar halls, sports facilities and hostels.
              <br /><br />
              The peaceful environment surrounded by the Western
              Ghats provides an ideal setting for learning,
              innovation and research.
            </Typography>
          </Box>
        </Box>

        {/* LOCATION */}
        <Box
          sx={{
            background: "linear-gradient(135deg,#651bdb,#0a0a0a)",
            py: 10,
            textAlign: "center",
            px: 4
          }}
        >
          <Typography level="h2" sx={{ mb: 2 }}>
            Campus Location
          </Typography>

          <Typography sx={{ maxWidth: 700, mx: "auto", color: "#ddd" }}>
            Lourdes Matha College of Science and Technology is located
            approximately 24 km from Thiruvananthapuram city near
            Kuttichal surrounded by lush greenery of the Western Ghats.
          </Typography>
        </Box>

      </Box>
    </PageLoader>
  );
};

export default AboutExploration;