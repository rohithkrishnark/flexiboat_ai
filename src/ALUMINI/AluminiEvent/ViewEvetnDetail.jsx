import React, { useState, useMemo } from "react";
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
import { getAuthUser } from "../../constant/Constant";
import {
  useFetchAlumniFullEventMedia,
  useFetchSingleAluminiEvent,
} from "../../ADMIN/CommonCode/useQuery";
import { BACKEND_IMAGE } from "../../constant/Static";

const ViewEventDetail = () => {
  const [filter, setFilter] = useState("upcoming");

  const user = getAuthUser();
  const alum_id = user?.alum_id;

  const { data: alumninEventDetail = [] } =
    useFetchSingleAluminiEvent(alum_id ?? null);

  const { data: alumninEventMediaDetail = [] } =
    useFetchAlumniFullEventMedia(alum_id ?? null);

  //  Map eventId -> first image
  const mediaMap = useMemo(() => {
    const map = {};
    alumninEventMediaDetail.forEach((item) => {
      map[item.eventId] = item.media?.[0]?.url || null;
    });
    return map;
  }, [alumninEventMediaDetail]);

  // ✅ Merge event + image
  const events = useMemo(() => {
    return alumninEventDetail.map((event) => ({
      ...event,
      image: mediaMap[event.id] || event.banner_image || null,
    }));
  }, [alumninEventDetail, mediaMap]);

  // ✅ filter by status
  const filteredEvents = events.filter(
    (event) => event.status === filter
  );

  return (
    <Box sx={{ height: "90vh", overflow: "hidden", bgcolor: "#f4f4f4" }}>
      {/* TABS */}
      <Box sx={{ position: "sticky", top: 0, zIndex: 10, bgcolor: "#f4f4f4", p: 1 }}>
        <Tabs value={filter} onChange={(e, val) => setFilter(val)}>
          <TabList>
            <Tab value="upcoming">Upcoming</Tab>
            <Tab value="completed">Completed</Tab>
          </TabList>
        </Tabs>
      </Box>

      {/* LIST */}
      <Box
        sx={{
          height: "calc(90vh - 50px)",
          overflowY: "auto",
          px: 1,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {filteredEvents.map((event) => (
          <Card key={event.id} sx={{ mb: 1, borderRadius: "10px" }}>

            {event.image && (
              <Box
                component="img"
                src={`${BACKEND_IMAGE}${event.image}`}
                alt="event"
                sx={{ width: "100%", height: "140px", objectFit: "cover" }}
              />
            )}

            <CardContent sx={{ p: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography level="title-sm">{event.title}</Typography>
                  <Typography level="body-xs" sx={{ opacity: 0.6 }}>
                    {event.company}
                  </Typography>
                </Box>

                <Chip size="sm">{event.event_type}</Chip>
              </Box>

              <Typography level="body-xs" sx={{ mt: 0.5 }}>
                <FaCalendarAlt size={12} />{" "}
                {new Date(event.event_date).toDateString()}
              </Typography>

              <Typography level="body-xs">
                <FaClock size={12} /> {event.start_time} - {event.end_time}
              </Typography>

              <Typography level="body-xs">
                <FaMapMarkerAlt size={12} /> {event.location}
              </Typography>

              <Typography level="body-xs" sx={{ mt: 0.5 }}>
                {event.description}
              </Typography>

            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ViewEventDetail;