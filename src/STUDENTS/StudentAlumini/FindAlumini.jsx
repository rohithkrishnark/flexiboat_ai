import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Input,
  Avatar,
  Button,
} from "@mui/joy";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchAllAlumini, useFetchMyConnections } from "../../ADMIN/CommonCode/useQuery";
import GlobalLoader from "../../Component/GlobalLoader";
import { axiosLogin } from "../../Axios/axios";
import { errorNotify, getAuthUser, successNotify } from "../../constant/Constant";

const FindAlumini = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const user = getAuthUser();
  const std_id = user?.user_id;

  const { data: AllAluminiDetail = [], isLoading: LoadingAlumini, } = useFetchAllAlumini();
  const { data: myConnections = [], refetch: FetchAllMyConnections } = useFetchMyConnections({
    user_id: std_id,
    user_type: "student",
  });





  // const connectedIds = new Set(
  //   myConnections.map((c) => {
  //     return Number(c.sender_id) === Number(std_id)
  //       ? Number(c.receiver_id)   // you sent request
  //       : Number(c.sender_id);    // someone connected to you
  //   })
  // );

  // //  sync API data to local state
  // useEffect(() => {
  //   if (AllAluminiDetail.length > 0) {

  //     const formatted = AllAluminiDetail
  //       // .filter((item) => connectedIds.has(Number(item.alum_id)))
  //       ?.filter((item) => !connectedIds?.has(Number(item.alum_id)))
  //       ?.map((item) => ({
  //         id: item.alum_id,
  //         name: item.alum_name,
  //         role: item.alum_company_designation,
  //         company: item.alum_company,
  //         connected: connectedIds?.has(Number(item.alum_id)), //  mark only
  //       }));

  //     setUsers(formatted);
  //   }
  // }, [AllAluminiDetail, myConnections]);


  const connectedIds = new Set(
    myConnections.map((c) => Number(c.receiver_id))
  );

  useEffect(() => {
    if (AllAluminiDetail.length > 0) {

      const formatted = AllAluminiDetail
        .filter((item) => !connectedIds.has(Number(item.alum_id)))
        .map((item) => ({
          id: item.alum_id,
          name: item.alum_name,
          role: item.alum_company_designation,
          company: item.alum_company,
        }));

      setUsers(formatted);
    }
  }, [AllAluminiDetail, myConnections]);

  //  CONNECT TO ALUMNI
  const handleConnect = async (id) => {
    try {
      const response = await axiosLogin.post("/student/connect-alumini", {
        sender_id: std_id,
        sender_type: "student",
        receiver_id: id,
        receiver_type: "alumni",
      });
      const { success, message } = response.data ?? {}
      if (success === 1) {
        // update UI
        const updated = users.map((user) =>
          user.id === id ? { ...user, connected: true } : user
        );
        successNotify(message)
        setUsers(updated);
        FetchAllMyConnections()
      }

    } catch (err) {
      errorNotify("Errror in Conneting Try After Some Times")
    }
  };

  //  SEARCH FILTER
  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase().includes(search.toLowerCase())
  );


 

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f5f7fb",
      }}
    >
      {LoadingAlumini && <GlobalLoader text="Fetching Detail Wait..." />}
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          bgcolor: "#f5f7fb",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Typography level="h3" sx={{ mb: 1 }}>
          Find Alumni
        </Typography>

        <Input
          startDecorator={<SearchIcon />}
          placeholder="Search alumni..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 400, borderRadius: "20px" }}
        />
      </Box>

      {/* LIST */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {filteredUsers?.length === 0 ? (
          <Typography>No alumni found</Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 2,
            }}
          >
            {filteredUsers?.map((user) => (
              <Card
                key={user.id}
                sx={{
                  borderRadius: "14px",
                  textAlign: "center",
                  p: 2,
                  transition: "0.25s",
                  boxShadow: "sm",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "md",
                  },
                }}
              >
                <CardContent>
                  <Avatar sx={{ mx: "auto", mb: 1 }} />

                  <Typography level="title-md">
                    {user.name}
                  </Typography>

                  <Typography level="body-sm" sx={{ opacity: 0.7 }}>
                    {user.role}
                  </Typography>

                  <Typography level="body-xs" sx={{ color: "#6366f1" }}>
                    {user.company}
                  </Typography>

                  <Button
                    size="sm"
                    startDecorator={
                      user.connected ? <CheckIcon /> : <PersonAddIcon />
                    }
                    variant={user.connected ? "soft" : "solid"}
                    sx={{
                      mt: 2,
                      borderRadius: "20px",
                    }}
                    onClick={() => handleConnect(user.id)}
                  >
                    {user.connected ? "Connected" : "Connect"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FindAlumini;