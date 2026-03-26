import React, { useState } from "react";
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
  Card,
  CardContent,
  Button,
} from "@mui/joy";

import SearchIcon from "@mui/icons-material/Search";
import ChatIcon from "@mui/icons-material/Chat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { getAuthUser } from "../../constant/Constant";
import GlobalLoader from "../../Component/GlobalLoader";
import { useFetchMyConnections } from "../../ADMIN/CommonCode/useQuery";


const MyConnection = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const user = getAuthUser();
  const std_id = user?.user_id;

  const { data: connections = [], isLoading } =
    useFetchMyConnections({
      user_id: std_id,
      user_type: "student",
    });

  //  Format data
  const users = connections.map((item) => ({
      id: item.receiver_id,
      name:
        item.alum_name ||
        item.student_name ||
        item.faculty_name,
      role: item.alum_company_designation || "",
      company: item.alum_company || "",
      email: item.alum_email || "",
      type: item.receiver_type,
    }));

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <Box sx={{ height: "80vh", display: "flex", flexDirection: "column", bgcolor: "#f5f7fb" }}>

      {isLoading && <GlobalLoader text="Loading Connections..." />}

      {/* HEADER */}
      <Box sx={{ position: "sticky", top: 0, p: 2, bgcolor: "#f5f7fb", borderBottom: "1px solid #eee" }}>
        <Typography level="h3">My Connections</Typography>

        <Input
          startDecorator={<SearchIcon />}
          placeholder="Search connections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mt: 1, maxWidth: 400, borderRadius: "20px" }}
        />
      </Box>

      {/* LIST */}
      <Box sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 2,
      }}>
        {filteredUsers.map((user) => (
          <Card key={user.id} sx={{ borderRadius: "16px" }}>
            <CardContent>

              <Box sx={{ textAlign: "center" }}>
                <Avatar sx={{ mx: "auto", width: 60, height: 60 }} />

                <Typography level="title-md">
                  {user.name}
                </Typography>

                <Typography level="body-sm">
                  {user.role}
                </Typography>

                <Typography level="body-xs" sx={{ color: "#6366f1" }}>
                  {user.company}
                </Typography>
              </Box>

              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Chip size="sm" color="success">
                  Connected
                </Chip>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}>
                <Button size="sm" startDecorator={<VisibilityIcon />} onClick={() => handleView(user)}>
                  View
                </Button>

                <Button size="sm" variant="soft" startDecorator={<ChatIcon />}>
                  Chat
                </Button>
              </Box>

            </CardContent>
          </Card>
        ))}
      </Box>

      {/* MODAL */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ width: 400 }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>

          {selectedUser && (
            <>
              <Box sx={{ textAlign: "center" }}>
                <Avatar sx={{ mx: "auto", width: 80, height: 80 }} />
                <Typography level="h4">{selectedUser.name}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography>🏢 {selectedUser.company}</Typography>
              <Typography>📧 {selectedUser.email}</Typography>

              <Button fullWidth sx={{ mt: 2 }}>
                Start Chat
              </Button>
            </>
          )}
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default MyConnection;