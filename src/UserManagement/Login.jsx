// import React, { useState } from "react";
// import { Box, Button, Typography, Input, Link } from "@mui/joy";
// import { useNavigate } from "react-router-dom";
// import { errorNotify, infoNotify, successNotify, warningNotify } from "../constant/Constant";
// import { axiosLogin } from "../Axios/axios";
// // import { axiosLogin } from '../../Axios/axios';

// const Login = () => {

//     const navigate = useNavigate();

//     const [currentrole, setRole] = useState("user");



//     console.log({
//         currentrole
//     });


//     const [formData, setFormData] = useState({
//         email: "",
//         password: "",
//     });

//     const toggleRole = (selectedRole) => {
//         if (currentrole === selectedRole) {
//             setRole("user"); // toggle back to normal user
//         } else {
//             setRole(selectedRole);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const payload = {
//                 user_email: formData.email,
//                 password: formData.password,
//             };

//             const roleApi = currentrole === "user" ? "login" : "faclogin";

//             const { data: resData } = await axiosLogin.post(`/user/${roleApi}`, payload);

//             const { success, message, data } = resData;
//             console.log(typeof (success));

//             if (success === 2) {
//                 return infoNotify(message)
//             }
//             if (success === 4) {
//                 return infoNotify("Admin Verification Pending...!");
//             }

//             if (success !== 1) {
//                 return warningNotify(message || "Login failed");
//             }

//             // success === 1
//             successNotify(message || "Login successful!");

//             const { role } = data;

//             let userPayload = {};
//             let redirectPath = "";

//             if (role === "fac") {
//                 const { fac_id, fac_name, user_email, fac_dep_id } = data;

//                 userPayload = {
//                     logged_id: fac_id,
//                     logged_name: fac_name,
//                     logged_email: user_email,
//                     deparment: fac_dep_id,
//                     logged_role: role
//                 };
//                 redirectPath = "/faculity/dashboard";

//             }

//             if (role === "user") {
//                 const { user_id, user_name, user_email } = data;

//                 userPayload = { logged_id: user_id, logged_name: user_name, logged_email: user_email, logged_role: role };
//                 redirectPath = "/home";
//             }

//             const authData = {
//                 role,
//                 ...userPayload
//             };
//             localStorage.setItem("authUser", btoa(JSON.stringify(authData)));

//             navigate(redirectPath);

//         } catch (error) {
//             console.error(error);
//             errorNotify("Login failed");
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 minHeight: "100vh",
//                 bgcolor: "#0b0b0b",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center"
//             }}
//         >
//             <Box
//                 sx={{
//                     width: 420,
//                     bgcolor: "white",
//                     borderRadius: "14px",
//                     p: 4,
//                     boxShadow: "lg"
//                 }}
//             >

//                 <Typography level="h3" textAlign="center" mb={3}>
//                     Login
//                 </Typography>


//                 <Box
//                     sx={{
//                         display: "flex",
//                         gap: 1.5,
//                         justifyContent: "center",
//                         mb: 3
//                     }}
//                 >
//                     <Button
//                         size="sm"
//                         variant={currentrole === "student" ? "solid" : "outlined"}
//                         onClick={() => toggleRole("student")}
//                         sx={{
//                             borderRadius: "20px",
//                             px: 2,
//                             fontWeight: 600,
//                             borderWidth: "2px",
//                             borderColor: "#1976d2",
//                             color: currentrole === "student" ? "#fff" : "#1976d2",
//                             bgcolor: currentrole === "student" ? "#1976d2" : "transparent",
//                             transition: "all .2s ease",
//                             "&:hover": {
//                                 bgcolor: "#1565c0",
//                                 color: "#fff",
//                                 transform: "scale(1.05)"
//                             }
//                         }}
//                     >
//                         Student
//                     </Button>

//                     <Button
//                         size="sm"
//                         variant={currentrole === "faculty" ? "solid" : "outlined"}
//                         onClick={() => toggleRole("faculty")}
//                         sx={{
//                             borderRadius: "20px",
//                             px: 2,
//                             fontWeight: 600,
//                             borderWidth: "2px",
//                             borderColor: "#2e7d32",
//                             color: currentrole === "faculty" ? "#fff" : "#2e7d32",
//                             bgcolor: currentrole === "faculty" ? "#2e7d32" : "transparent",
//                             transition: "all .2s ease",
//                             "&:hover": {
//                                 bgcolor: "#1b5e20",
//                                 color: "#fff",
//                                 transform: "scale(1.05)"
//                             }
//                         }}
//                     >
//                         Faculty
//                     </Button>

//                     <Button
//                         size="sm"
//                         variant={currentrole === "alumni" ? "solid" : "outlined"}
//                         onClick={() => toggleRole("alumni")}
//                         sx={{
//                             borderRadius: "20px",
//                             px: 2,
//                             fontWeight: 600,
//                             borderWidth: "2px",
//                             borderColor: "#7b1fa2",
//                             color: currentrole === "alumni" ? "#fff" : "#7b1fa2",
//                             bgcolor: currentrole === "alumni" ? "#7b1fa2" : "transparent",
//                             transition: "all .2s ease",
//                             "&:hover": {
//                                 bgcolor: "#6a1b9a",
//                                 color: "#fff",
//                                 transform: "scale(1.05)"
//                             }
//                         }}
//                     >
//                         Alumni
//                     </Button>
//                 </Box>
//                 {/* BACK TO NORMAL USER */}


//                 <form>

//                     <Box mb={2}>
//                         <Typography level="body-sm">Email</Typography>
//                         <Input
//                             name="email"
//                             type="email"
//                             placeholder="Enter email"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                     </Box>

//                     <Box mb={3}>
//                         <Typography level="body-sm">Password</Typography>
//                         <Input
//                             name="password"
//                             type="password"
//                             placeholder="Enter password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                     </Box>

//                     <Button onClick={handleSubmit} fullWidth >
//                         Login
//                     </Button>

//                 </form>

//                 {/* SIGNUP CONDITION */}
//                 {(currentrole === "user" || currentrole === "faculty") && (
//                     <>
//                         <Typography level="body-sm" textAlign="center" mt={3}>
//                             Don’t have an account?{" "}
//                             <Link
//                                 sx={{ cursor: "pointer", fontWeight: "bold" }}
//                                 onClick={() => navigate("/signup", { state: { role: currentrole } })}
//                             >
//                                 Create account
//                             </Link>
//                         </Typography>

//                         <Typography
//                             level="body-xs"
//                             textAlign="center"
//                             sx={{ cursor: "pointer", mb: 2 }}
//                             onClick={() => navigate("/home")}
//                         >
//                             ← Back to normal login
//                         </Typography>

//                     </>
//                 )}

//             </Box>
//         </Box>
//     );
// };

// export default Login;


import React, { useState } from "react";
import { Box, Button, Typography, Input, Link } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { errorNotify, infoNotify, successNotify, warningNotify } from "../constant/Constant";
import { axiosLogin } from "../Axios/axios";

const Login = () => {
    const navigate = useNavigate();
    const [currentrole, setRole] = useState("student");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const toggleRole = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                user_email: formData.email,
                password: formData.password,
            };

            // Determine API based on role
            let roleApi = "";
            let redirectPath = "";
            let basepath = ""

            if (currentrole === "student") {
                basepath = "student"
                roleApi = "stdlogin"; // your student login API
                redirectPath = "/students";
            } else if (currentrole === "faculty") {
                basepath = "user"
                roleApi = "faclogin";
                redirectPath = "/faculity";
            } else if (currentrole === "alumni") {
                basepath = "user"
                roleApi = "alumlogin";
                redirectPath = "/alumni/dashboard";
            }

            const { data: resData } = await axiosLogin.post(`/${basepath}/${roleApi}`, payload);
            const { success, message, data } = resData;

            if (success !== 1) {
                return warningNotify(message || "Login failed");
            }

            successNotify(message || "Login successful!");

            // Save auth data
            const authData = {
                logged_role: currentrole,
                ...data,
            };

            localStorage.setItem("authUser", btoa(JSON.stringify(authData)));

            navigate(redirectPath);
        } catch (error) {
            console.error(error);
            errorNotify("Login failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#0b0b0b",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: 420,
                    bgcolor: "white",
                    borderRadius: "14px",
                    p: 4,
                    boxShadow: "lg",
                }}
            >
                <Typography level="h3" textAlign="center" mb={3}>
                    Login
                </Typography>

                {/* ROLE SELECT */}
                <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", mb: 3 }}>
                    {["student", "faculty", "alumni"].map((role) => (
                        <Button
                            key={role}
                            size="sm"
                            variant={currentrole === role ? "solid" : "outlined"}
                            onClick={() => toggleRole(role)}
                            sx={{
                                borderRadius: "20px",
                                px: 2,
                                fontWeight: 600,
                                textTransform: "none",
                                bgcolor: currentrole === role ? (role === "student" ? "#1976d2" : role === "faculty" ? "#2e7d32" : "#7b1fa2") : "transparent",
                                color: currentrole === role ? "#fff" : role === "student" ? "#1976d2" : role === "faculty" ? "#2e7d32" : "#7b1fa2",
                                borderWidth: "2px",
                                borderColor: role === "student" ? "#1976d2" : role === "faculty" ? "#2e7d32" : "#7b1fa2",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Button>
                    ))}
                </Box>

                {/* LOGIN FORM */}
                <form>
                    <Box mb={2}>
                        <Typography level="body-sm">Email</Typography>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Box>

                    <Box mb={3}>
                        <Typography level="body-sm">Password</Typography>
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </Box>

                    <Button onClick={handleSubmit} fullWidth>
                        Login
                    </Button>
                </form>

                {/* SIGNUP LINK */}
                {currentrole === "faculty" && (
                    <Typography level="body-sm" textAlign="center" mt={3}>
                        Don’t have an account?{" "}
                        <Link
                            sx={{ cursor: "pointer", fontWeight: "bold" }}
                            onClick={() => navigate("/signup", { state: { role: currentrole } })}
                        >
                            Create account
                        </Link>
                    </Typography>
                )}
                <Typography level="body-sm" textAlign="center" mt={3}>
                    <Link
                        sx={{ cursor: "pointer", fontWeight: "bold" }}
                        onClick={() => navigate("/home", { state: { role: currentrole } })}
                    >
                        go Back
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;