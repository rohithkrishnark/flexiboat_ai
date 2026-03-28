import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Input,
  IconButton,
  Chip,
  Modal,
  ModalDialog,
  Divider,
  Button,
} from "@mui/joy";

import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useFetchAllAlumini, useFetchMyConnections } from "../../ADMIN/CommonCode/useQuery";
import { getAuthUser } from "../../constant/Constant";

const MyNetwork = () => {
  const [search, setSearch] = useState("");
  // const [open, setOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const user = getAuthUser();
  const alum_id = user?.alum_id;

  const navigate = useNavigate();

  const { data: AllAluminiDetail = [] } = useFetchAllAlumini();
  const { data: myConnections = [] } = useFetchMyConnections({
    user_id: alum_id,
    user_type: "alumni",
  });

  //  get connected alumni IDs
  const connectedIds = new Set(
    myConnections?.map((c) => Number(c.receiver_id))
  );

  //  ONLY connected users
  useEffect(() => {
    if (AllAluminiDetail.length > 0) {
      const formatted = AllAluminiDetail
        .filter((item) => connectedIds.has(Number(item.alum_id))) // 🔥 ONLY CONNECTED
        .map((item) => ({
          id: item.alum_id,
          name: item.alum_name,
          role: item.alum_company_designation,
          company: item.alum_company,
          location: item.alum_company_location,
          experience: item.alum_experience,
          email: item.alum_email,
        }));

      setUsers(formatted);
    }
  }, [AllAluminiDetail, myConnections]);

  // search filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (user) => {
    navigate(`/alumini/aluminiglobal/${user.id}`);
    // setSelectedUser(user);
    // setOpen(true);
  };

  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#f4f6f8",
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          bgcolor: "#fff",
          p: 2,
          borderBottom: "1px solid #eee",
        }}
      >
        <Typography level="title-lg" sx={{ fontWeight: 700 }}>
          My Connections
        </Typography>

        <Input
          startDecorator={<SearchIcon />}
          placeholder="Search connections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            mt: 1,
            borderRadius: "20px",
            bgcolor: "#f1f5f9",
          }}
        />
      </Box>

      {/* GRID */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 2,
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {filteredUsers.length === 0 ? (
          <Typography>No connections found</Typography>
        ) : (
          filteredUsers.map((user) => (
            <Box
              key={user.id}
              sx={{
                bgcolor: "#fff",
                borderRadius: 3,
                p: 2,
                boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
                transition: "0.25s",
                cursor: "pointer",
                height: 250,
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Avatar sx={{ mx: "auto", width: 60, height: 60 }} />

                <Typography fontWeight={600} mt={1}>
                  {user.name}
                </Typography>

                <Typography fontSize={12} color="gray">
                  {user.role}
                </Typography>

                <Chip size="sm" sx={{ mt: 1 }}>
                  {user.company}
                </Chip>
              </Box>

              {/* ACTIONS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  gap: 1,
                }}
              >
                <Button
                  size="sm"
                  startDecorator={<VisibilityIcon />}
                  onClick={() => handleView(user)}
                  sx={{ flex: 1 }}
                >
                  View
                </Button>

                <Button
                  size="sm"
                  color="primary"
                  startDecorator={<ChatIcon />}
                  sx={{ flex: 1 }}
                >
                  Chat
                </Button>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* MODAL */}
      {/* <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            width: 420,
            borderRadius: "20px",
            p: 0,
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: 100,
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
            }}
          />

          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
              color: "#fff",
            }}
          >
            <CloseIcon />
          </IconButton>

          {selectedUser && (
            <Box sx={{ p: 2, mt: -6 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: "auto",
                  border: "3px solid #fff",
                }}
              />

              <Typography textAlign="center" mt={1} fontWeight={700}>
                {selectedUser.name}
              </Typography>

              <Typography textAlign="center" fontSize={13} color="gray">
                {selectedUser.role}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "grid", gap: 1 }}>
                <Typography fontSize={13}>
                  🏢 {selectedUser.company}
                </Typography>
                <Typography fontSize={13}>
                  📍 {selectedUser.location}
                </Typography>
                <Typography fontSize={13}>
                  💼 {selectedUser.experience}
                </Typography>
                <Typography fontSize={13}>
                  📧 {selectedUser.email}
                </Typography>
              </Box>

              <Button fullWidth sx={{ mt: 2 }} startDecorator={<ChatIcon />}>
                Message
              </Button>
            </Box>
          )}
        </ModalDialog>
      </Modal> */}
    </Box>
  );
};

export default MyNetwork;