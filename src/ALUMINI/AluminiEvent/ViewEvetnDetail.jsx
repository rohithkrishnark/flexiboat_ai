import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Tabs,
  TabList,
  Tab,
} from "@mui/joy";

import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const mockEvents = [
  { id: 1, title: "Infosys Hiring Drive", eventType: "Job Fair", company: "Infosys", description: "Hiring React & Node developers.", date: "April 10, 2026", time: "10:00 AM - 4:00 PM", location: "Online", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d", registrationLink: "https://example.com", status: "active" },
  { id: 2, title: "TCS Mega Recruitment", eventType: "Hiring Drive", company: "TCS", description: "Bulk hiring for freshers.", date: "April 15, 2026", time: "9:00 AM - 2:00 PM", location: "Offline", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", registrationLink: "https://example.com", status: "active" },
  { id: 3, title: "Tech Webinar", eventType: "Webinar", company: "Google", description: "Future of AI discussion.", date: "April 18, 2026", time: "6:00 PM - 8:00 PM", location: "Online", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", registrationLink: "https://example.com", status: "expired" },
  { id: 4, title: "Frontend Workshop", eventType: "Workshop", company: "Meta", description: "Hands-on React training.", date: "April 20, 2026", time: "11:00 AM - 3:00 PM", location: "Offline", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", registrationLink: "https://example.com", status: "expired" },
  { id: 5, title: "Startup Hiring", eventType: "Job Fair", company: "Zoho", description: "Hiring full stack devs.", date: "April 22, 2026", time: "10:00 AM - 5:00 PM", location: "Online", image: "https://images.unsplash.com/photo-1552664730-d307ca884978", registrationLink: "https://example.com", status: "active" },
  { id: 6, title: "Career Guidance", eventType: "Mentorship", company: "Alumni", description: "Career advice session.", date: "April 25, 2026", time: "4:00 PM - 6:00 PM", location: "Online", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", registrationLink: "https://example.com", status: "active" },
  { id: 7, title: "Backend Bootcamp", eventType: "Workshop", company: "Amazon", description: "Node.js deep dive.", date: "April 28, 2026", time: "10:00 AM - 3:00 PM", location: "Offline", image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4", registrationLink: "https://example.com", status: "expired" },
  { id: 8, title: "AI Hiring Event", eventType: "Job Fair", company: "Microsoft", description: "AI/ML roles hiring.", date: "May 1, 2026", time: "9:00 AM - 1:00 PM", location: "Online", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d", registrationLink: "https://example.com", status: "active" },
  { id: 9, title: "DevOps Session", eventType: "Webinar", company: "IBM", description: "CI/CD pipelines intro.", date: "May 3, 2026", time: "5:00 PM - 7:00 PM", location: "Online", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c", registrationLink: "https://example.com", status: "expired" },
  { id: 10, title: "Full Stack Hiring", eventType: "Hiring Drive", company: "Wipro", description: "Hiring MERN developers.", date: "May 5, 2026", time: "10:00 AM - 4:00 PM", location: "Offline", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", registrationLink: "https://example.com", status: "active" },
];

const ViewEventDetail = () => {
  const [filter, setFilter] = useState("active");

  const filteredEvents = mockEvents.filter(
    (event) => event.status === filter
  );

  return (
    <Box
      sx={{
        height: "90vh",
        overflow: "hidden",
        bgcolor: "#f4f4f4",
      }}
    >
      {/* STICKY TABS */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "#f4f4f4",
          p: 1,
        }}
      >
        <Tabs value={filter} onChange={(e, val) => setFilter(val)}>
          <TabList>
            <Tab value="active">Active</Tab>
            <Tab value="expired">Expired</Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* SCROLL AREA */}
      <Box
        sx={{
          height: "calc(90vh - 50px)",
          overflowY: "auto",
          px: 1,

          // 🔥 hide scrollbar
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {filteredEvents.map((event) => (
          <Card key={event.id} sx={{ mb: 1, borderRadius: "8px" }}>
            
            <Box
              component="img"
              src={event.image}
              alt="event"
              sx={{ width: "100%", height: "140px", objectFit: "cover" }}
            />

            <CardContent sx={{ p: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography level="title-sm">{event.title}</Typography>
                  <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                    {event.company}
                  </Typography>
                </Box>

                <Chip size="sm">{event.eventType}</Chip>
              </Box>

              <Typography level="body-xs" sx={{ mt: 0.5 }}>
                <FaCalendarAlt size={12} /> {event.date}
              </Typography>

              <Typography level="body-xs">
                <FaClock size={12} /> {event.time}
              </Typography>

              <Typography level="body-xs">
                <FaMapMarkerAlt size={12} /> {event.location}
              </Typography>

              <Typography level="body-xs" sx={{ mt: 0.5 }}>
                {event.description}
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Button size="sm" onClick={() => window.open(event.registrationLink)}>
                  Register
                </Button>
                <Button size="sm" variant="outlined">
                  View
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ViewEventDetail;