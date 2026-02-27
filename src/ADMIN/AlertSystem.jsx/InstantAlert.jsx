import React, { useState, useMemo } from 'react'
import {
    Box,
    Typography,
    Input,
    Textarea,
    Button,
    Select,
    Option,
    Card,
    CardContent,
    Autocomplete,
    Chip,
    Divider,
    IconButton,
    Checkbox
} from '@mui/joy'
import Delete from '@mui/icons-material/Delete'
import CampaignIcon from '@mui/icons-material/Campaign';

const InstantAlert = () => {

    const [audience, setAudience] = useState('all')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [selectAllUsers, setSelectAllUsers] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [announcements, setAnnouncements] = useState([])

    // Simulated user data (Replace with API later)
    const usersData = {
        students: Array.from({ length: 50 }, (_, i) => ({
            id: i,
            name: `Student ${i + 1}`
        })),
        alumni: Array.from({ length: 30 }, (_, i) => ({
            id: i,
            name: `Alumni ${i + 1}`
        })),
        faculty: Array.from({ length: 15 }, (_, i) => ({
            id: i,
            name: `Faculty ${i + 1}`
        }))
    }

    const options = useMemo(() => {
        return audience !== 'all' ? usersData[audience] : []
    }, [audience])

    const handleSend = () => {

        if (!title || !message) {
            alert("Title and Message required")
            return
        }

        const payload = {
            audience,
            sendToAll: audience === 'all' ? true : selectAllUsers,
            selectedUsers:
                audience === 'all' || selectAllUsers
                    ? []
                    : selectedUsers.map(user => user.id),
            title,
            message,
            createdAt: new Date().toLocaleString()
        }

        console.log("Payload:", payload)

        // Add to local history (replace with backend call)
        const newAnnouncement = {
            id: Date.now(),
            ...payload
        }

        setAnnouncements([newAnnouncement, ...announcements])

        // Reset form
        setAudience('all')
        setSelectedUsers([])
        setSelectAllUsers(false)
        setTitle('')
        setMessage('')
    }

    const handleDelete = (id) => {
        setAnnouncements(announcements.filter(a => a.id !== id))
    }

    return (
        <Box
            sx={{
                flex: 1,
                minWidth: 0, // prevents sidebar break
                bgcolor: '#ffffff',
                borderRadius: 2,
                boxShadow: 'sm',
                p: 1,
                boxSizing: 'border-box',
                height: '100%',
                position: 'relative',
                overflowY: 'scroll'
            }}
        >

            <Typography level="h3" mb={3}>
               <CampaignIcon sx={{fontSize:30,color:'#d211f8'}}/> Instant Alerts
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, height: '90%' }}>

                {/* LEFT SIDE - SEND ANNOUNCEMENT */}
                <Card sx={{ flex: 1 }}>
                    <CardContent>

                        <Typography level="h5" mb={2}>
                            Send Announcement
                        </Typography>

                        {/* Audience Select */}
                        <Typography level="body-sm">Select Audience</Typography>
                        <Select
                            value={audience}
                            onChange={(e, newValue) => {
                                setAudience(newValue)
                                setSelectedUsers([])
                                setSelectAllUsers(false)
                            }}
                            sx={{ mb: 2 }}
                        >
                            <Option value="all">All Users</Option>
                            <Option value="students">Students</Option>
                            <Option value="alumni">Alumni</Option>
                            <Option value="faculty">Faculty</Option>
                        </Select>

                        {/* Select Users Section */}
                        {audience !== 'all' && (
                            <Box sx={{ mb: 2 }}>

                                <Typography level="body-sm">
                                    Select {audience}
                                </Typography>

                                <Checkbox
                                    label={`Send to All ${audience}`}
                                    checked={selectAllUsers}
                                    onChange={() => {
                                        setSelectAllUsers(!selectAllUsers)
                                        setSelectedUsers([])
                                    }}
                                    sx={{ my: 1 }}
                                />

                                <Autocomplete
                                    multiple
                                    disabled={selectAllUsers}
                                    options={options}
                                    getOptionLabel={(option) => option.name}
                                    value={selectedUsers}
                                    onChange={(event, newValue) =>
                                        setSelectedUsers(newValue)
                                    }
                                    placeholder={`Search ${audience}...`}
                                    renderTags={(selected, getTagProps) =>
                                        selected.map((option, index) => (
                                            <Chip
                                                {...getTagProps({ index })}
                                                key={option.id}
                                                size="sm"
                                            >
                                                {option.name}
                                            </Chip>
                                        ))
                                    }
                                />

                            </Box>
                        )}

                        {/* Title */}
                        <Typography level="body-sm">Title</Typography>
                        <Input
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        {/* Message */}
                        <Typography level="body-sm">Message</Typography>
                        <Textarea
                            placeholder="Write announcement..."
                            minRows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Button fullWidth onClick={handleSend}>
                            Send Announcement
                        </Button>

                    </CardContent>
                </Card>

                {/* RIGHT SIDE - PREVIOUS ANNOUNCEMENTS */}
                <Card
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',      // Take full available height
                        minHeight: 0         // IMPORTANT for flex scroll
                    }}
                >
                    {/* Title fixed at top */}
                    <Box sx={{ p: 2, flexShrink: 0 }}>
                        <Typography level="h5">
                            Previous Announcements
                        </Typography>
                    </Box>

                    {/* Scrollable Content */}
                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            px: 2,
                            pb: 2,

                            // Hide scrollbar (Chrome, Edge, Safari)
                            '&::-webkit-scrollbar': {
                                display: 'none'
                            },

                            // Hide scrollbar (Firefox)
                            scrollbarWidth: 'none',

                            // Hide scrollbar (IE)
                            msOverflowStyle: 'none'
                        }}
                    >
                        {announcements.length === 0 && (
                            <Typography level="body-sm">
                                No announcements yet.
                            </Typography>
                        )}

                        {announcements.map((item) => (
                            <Box key={item.id} sx={{ mb: 2 }}>
                                <Divider sx={{ mb: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography fontWeight="bold">
                                        {item.title}
                                    </Typography>

                                    <IconButton
                                        size="sm"
                                        color="danger"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>

                                <Chip size="sm" sx={{ mt: 1 }}>
                                    {item.audience.toUpperCase()}
                                </Chip>

                                <Typography level="body-sm" mt={1}>
                                    {item.message}
                                </Typography>

                                <Typography level="body-xs" mt={1}>
                                    {item.createdAt}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Card>

            </Box>
        </Box>
    )
}

export default InstantAlert