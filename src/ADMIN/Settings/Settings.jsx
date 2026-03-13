import React from 'react'
import { Box, Typography } from '@mui/joy'
import PageWrapper from '../Components/PageWrapper'
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate();
    const master = [
        { label: 'Department Master', path: '/admin/depmaster' },
        { label: 'Program Master', path: '/admin/programmast' },
        { label: 'Program Detail Master', path: '/admin/programdtlmast' },
        { label: 'Designation Master', path: '/admin/designation' },
        { label: 'User Group Master', path: '/admin/usergroup' },
    ]
    return (

        <PageWrapper>
            <Typography level="h3" mb={3}>
                Master Settings
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1
                }}
            >
                {master?.map((item, index) => (
                    <Box
                        onClick={() =>
                            navigate(item.path, {
                                state: { title: item.label }
                            })
                        }
                        key={index}
                        sx={{
                            flex: '0 0 calc(25% - 16px)', // 4 per row
                            cursor: 'pointer',
                        }}
                    >
                        <Typography
                            level="h5"
                            sx={{
                                display: 'inline-block',
                                px: 1,
                                borderBottom: '3px solid red',
                                transition: '0.3s',
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5
                            }}
                        >
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </PageWrapper>

    )
}

export default Settings