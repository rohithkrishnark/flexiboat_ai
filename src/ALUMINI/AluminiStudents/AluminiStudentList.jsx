import React, { useState, useMemo } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Input,
    Button,
    Select,
    Option,
    Avatar,
    Chip
} from "@mui/joy";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatIcon from "@mui/icons-material/Chat";

import {
    useFetchAllActiveStudents,
    useFetchAllDeprtmentDetail
} from "../../ADMIN/CommonCode/useQuery";
import { useNavigate } from "react-router-dom";

const AluminiStudentList = () => {

    //  REMOVE "All"
    const [selectedDept, setSelectedDept] = useState(null);
    const [search, setSearch] = useState("");

    const { data: departmentDetail = [] } = useFetchAllDeprtmentDetail();
    const { data: students = [] } = useFetchAllActiveStudents();

    // const students = allStudents?.lStudents || [];

    const navigate = useNavigate();

    //  departments from API
    const departments = useMemo(() => {
        return departmentDetail.map((d) => d.dep_name);
    }, [departmentDetail]);

    //  FILTER
    const filteredStudents = useMemo(() => {
        return students.filter((s) => {

            //  only filter if selected
            const matchDept =
                !selectedDept ||
                s.dep_name === selectedDept ||
                s.department === selectedDept;

            const matchSearch =
                s.std_name?.toLowerCase().includes(search.toLowerCase());

            return matchDept && matchSearch;
        });
    }, [students, selectedDept, search]);

    return (
        <Box sx={{ display: "flex", gap: 3, p: 2 }}>

            {/* LEFT */}
            <Card sx={{ width: "25%", minHeight: "80vh" }}>
                <CardContent>

                    <Typography level="h5" mb={2}>
                        Filters
                    </Typography>

                    {/* SEARCH */}
                    <Typography level="body-sm">Search</Typography>
                    <Input
                        placeholder="Search name..."
                        startDecorator={<SearchIcon />}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    {/* DEPARTMENT */}
                    <Typography level="body-sm">Department</Typography>
                    <Select
                        placeholder="Select department"
                        value={selectedDept}
                        onChange={(e, val) => setSelectedDept(val)}
                        sx={{ mb: 2 }}
                    >
                        {departments.map((d) => (
                            <Option key={d} value={d}>
                                {d}
                            </Option>
                        ))}
                    </Select>

                    <Button
                        fullWidth
                        onClick={() => {
                            setSelectedDept(null);
                            setSearch("");
                        }}
                    >
                        Clear Filters
                    </Button>

                </CardContent>
            </Card>

            {/* RIGHT */}
            <Box sx={{ width: "75%" }}>

                <Typography level="h4" mb={2}>
                    Students
                </Typography>

                {filteredStudents.length === 0 ? (
                    <Typography textAlign="center" mt={5}>
                        No students found
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                            gap: 2
                        }}
                    >
                        {filteredStudents.map((student) => (
                            <Card
                                key={student.std_id}
                                sx={{
                                    borderRadius: "16px",
                                    p: 1,
                                    background: "linear-gradient(145deg, #ffffff, #f3f6fb)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                                    transition: "0.25s",
                                    "&:hover": {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
                                    }
                                }}
                            >
                                <CardContent>

                                    {/* TOP SECTION */}
                                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>

                                        <Avatar
                                            sx={{
                                                width: 50,
                                                height: 50,
                                                fontSize: 18,
                                                bgcolor: "#2563eb"
                                            }}
                                        >
                                            {student.std_name?.charAt(0)}
                                        </Avatar>

                                        <Box>
                                            <Typography fontWeight="bold" fontSize={15}>
                                                {student.std_name}
                                            </Typography>

                                            <Typography level="body-xs" color="neutral">
                                                {student.std_email}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* PROFILE NAME */}
                                    <Box mt={2}>
                                        <Typography
                                            fontSize={13}
                                            fontWeight="600"
                                            sx={{ color: "#2563eb" }}
                                        >
                                            {student.profile_name || "Student"}
                                        </Typography>
                                    </Box>

                                    {/* BIO */}
                                    <Box mt={1}>
                                        <Typography
                                            level="body-sm"
                                            sx={{
                                                color: "#555",
                                                display: "-webkit-box",
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden"
                                            }}
                                        >
                                            {student.bio || "No bio available"}
                                        </Typography>
                                    </Box>

                                    {/* ACTION BUTTONS */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                            mt: 2
                                        }}
                                    >
                                        <Button
                                            size="sm"
                                            variant="plain"
                                            sx={{
                                                flex: 1,
                                                borderRadius: "8px",
                                                border: "1px solid #e0e0e0",
                                                "&:hover": {
                                                    backgroundColor: "#f3f4f6"
                                                }
                                            }}
                                            startDecorator={<VisibilityIcon />}
                                            onClick={() =>
                                                navigate(`/common/studetnglobalview/${student.std_id}`)
                                            }
                                        >
                                            View
                                        </Button>



                                        <Button
                                            size="sm"
                                            sx={{
                                                flex: 1,
                                                borderRadius: "8px",
                                                backgroundColor: "#2563eb",
                                                "&:hover": {
                                                    backgroundColor: "#1e4fd1"
                                                }
                                            }}
                                            startDecorator={<ChatIcon />}
                                            onClick={() =>
                                                navigate("/alumini/chat", {
                                                    state: {
                                                        user: {
                                                            id: student.std_id,
                                                            name: student.std_name,
                                                            type: "student"
                                                        }
                                                    }
                                                })
                                            }
                                        >
                                            Chat
                                        </Button>
                                    </Box>

                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}

            </Box>
        </Box>
    );
};

export default AluminiStudentList;