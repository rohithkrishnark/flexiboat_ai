
import { Box } from '@mui/joy'
import { Outlet } from 'react-router-dom'
import { memo } from 'react'
import ReusableSidebar from '../../Component/ReusableSidebar'
import { FACULTY_MENU } from '../../Menu/facultyMenu'
import ReusableTopBar from '../../Component/ReusableTopBar'
import logo from '../../assets/logo.png'
import SchoolIcon from '@mui/icons-material/School';
import { getAuthUser } from '../../constant/Constant'

const FaculityLayout = () => {
    const user = getAuthUser();

    console.log({
        user
    });

    return (
        <Box
            sx={{
                display: 'flex',
                height: '100vh',   //  important
                overflow: 'hidden' //  prevent full page scroll
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    height: '100vh',  //  full height
                    flexShrink: 0
                }}
            >
                <ReusableSidebar
                    menuItems={FACULTY_MENU}
                    title="Faculty Panel"
                    subTitle="FlexiBot"
                    logo={logo}
                    logoutPath="/faculty/logout"
                />
            </Box>

            {/* Right side */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    height: '100vh'
                }}
            >
                {/* Top Navbar */}
                <Box sx={{ flexShrink: 0 }}>
                    <ReusableTopBar
                        title="Fculty"
                        leftIcon={SchoolIcon}
                        userName={user?.fac_name || "Fac Name"}
                        background="#fffdfd"
                        Department="Master of Computer Application"
                    />
                </Box>

                {/* Scrollable Content */}
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',  //  only this scrolls
                        p: 2,
                        bgcolor: '#f9fafb'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    )
}

export default memo(FaculityLayout)
