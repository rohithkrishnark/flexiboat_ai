import { Box, Typography } from '@mui/joy'
import { memo, useEffect, useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

const moodIcons = [
    { icon: MoodBadIcon, color: '#ef4444' },
    { icon: SentimentSatisfiedIcon, color: '#f59e0b' },
    { icon: SentimentSatisfiedAltIcon, color: '#22c55e' }
]

const ReusableTopBar = ({
    title = "Dashboard",
    leftIcon: LeftIcon,
    userName = "User",
    showClock = true,
    showMood = true,
    background = '#fffdfd',
    Department="Master of Computer Application"
}) => {

    const [time, setTime] = useState(new Date())
    const [moodIndex, setMoodIndex] = useState(0)

    // Live Clock
    useEffect(() => {
        if (!showClock) return

        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [showClock])

    // Mood Animation
    useEffect(() => {
        if (!showMood) return

        const moodTimer = setInterval(() => {
            setMoodIndex(prev => (prev + 1) % moodIcons.length)
        }, 2000)

        return () => clearInterval(moodTimer)
    }, [showMood])

    const MoodIcon = moodIcons[moodIndex]?.icon

    return (
        <Box
            sx={{
                height: 55,
                px: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: background,
                borderBottom: '2px solid #e5e7eb',
                boxShadow: '0 10px 15px rgba(119, 116, 116, 0.15)',
                m: 1,
                borderRadius: 3
            }}
        >
            {/* LEFT SECTION */}
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {LeftIcon && <LeftIcon sx={{ color: 'black' }} />}

                    <Typography
                        level="body-md"
                        sx={{
                            fontWeight: 800,
                            fontSize: 26,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {title.split('')[0]}

                        {showMood && (
                            <Box
                                sx={{
                                    display: 'inline-flex',
                                    mx: 0.5,
                                    animation: 'pulse 1s ease-in-out',
                                    '@keyframes pulse': {
                                        '0%': { opacity: 0, transform: 'scale(0.7)' },
                                        '50%': { opacity: 1, transform: 'scale(1.2)' },
                                        '100%': { opacity: 1, transform: 'scale(1)' }
                                    }
                                }}
                            >
                                <MoodIcon
                                    sx={{
                                        fontSize: 22,
                                        color: moodIcons[moodIndex].color
                                    }}
                                />
                            </Box>
                        )}

                        {title.slice(1)}
                    </Typography>
                </Box>
                <Typography sx={{
                    fontWeight: 800,
                    fontSize: 8,
                    display: 'flex',
                    alignItems: 'center'
                }}>{Department}</Typography>
            </Box>

            {/* RIGHT SECTION */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                    <Typography level="body-md" sx={{ fontWeight: 600 }}>
                        {userName}
                    </Typography>
                </Box>

                {showClock && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 14 }} />
                        <Typography level="body-sm" sx={{ fontSize: 12 }}>
                            {time.toLocaleTimeString()}
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default memo(ReusableTopBar)