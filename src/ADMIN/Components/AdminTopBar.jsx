// import { Box, Typography } from '@mui/joy'
// import { useEffect, useState } from 'react'
// import adminlogo from '../AdminAssets/logo.png'
// import Diversity2Icon from '@mui/icons-material/Diversity2';
// import PersonIcon from '@mui/icons-material/Person';
// import SnoozeIcon from '@mui/icons-material/Snooze';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

// const AdminTopBar = () => {
//     const [time, setTime] = useState(new Date())

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTime(new Date())
//         }, 1000)

//         return () => clearInterval(timer)
//     }, [])

//     return (
//         <Box
//             sx={{
//                 height: 50,
//                 px: 2,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 bgcolor: '#fffdfd',
//                 borderBottom: '2px solid #e5e7eb',
//                 // boxShadow:'md'
//                 boxShadow: '0 10px 15px rgba(119, 116, 116, 0.15)',
//                 m: 1,
//                 borderRadius: 5
//             }}
//         >
//             {/* LEFT */}
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                 <Diversity2Icon sx={{ color: 'black' }} />
//                 <Typography level="body-sm" sx={{ fontWeight: 800, color: 'black' ,fontSize:28}}>
//                     Dashb<span><EmojiEmotionsIcon sx={{color:"red",fontSize:16}}/></span>ard
//                 </Typography>

//             </Box>
//             <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>

//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <PersonIcon sx={{ fontSize: 15 }} />
//                     <Typography level="body-md" sx={{ fontWeight: 600 }}>
//                         Sneha Babu G
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', alignItems: 'center',gap:0. }}>
//                     <SnoozeIcon sx={{ fontSize: 15 }} />
//                     <Typography level="body-sm" sx={{ fontWeight: 500, color: 'black', fontSize: 12 }}>
//                         {time.toLocaleTimeString()}
//                     </Typography>
//                 </Box>

//             </Box>

//             {/* RIGHT */}

//         </Box>
//     )
// }

// export default AdminTopBar



import { Box, Typography } from '@mui/joy'
import { useEffect, useState } from 'react'

import Diversity2Icon from '@mui/icons-material/Diversity2'
import PersonIcon from '@mui/icons-material/Person'
import SnoozeIcon from '@mui/icons-material/Snooze'

import MoodBadIcon from '@mui/icons-material/MoodBad'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'

const moodIcons = [
  { icon: MoodBadIcon, color: '#ef4444' },
  { icon: SentimentSatisfiedIcon, color: '#f59e0b' },
  { icon: SentimentSatisfiedAltIcon, color: '#22c55e' }
]

const AdminTopBar = () => {
  const [time, setTime] = useState(new Date())
  const [moodIndex, setMoodIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const moodTimer = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % moodIcons.length)
    }, 2000)

    return () => clearInterval(moodTimer)
  }, [])

  const MoodIcon = moodIcons[moodIndex].icon

  return (
    <Box
      sx={{
        height: 50,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: '#fffdfd',
        borderBottom: '2px solid #e5e7eb',
        boxShadow: '0 10px 15px rgba(119, 116, 116, 0.15)',
        m: 1,
        borderRadius: 5
      }}
    >
      {/* LEFT */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Diversity2Icon sx={{ color: 'black' }} />

        <Typography
          level="body-sm"
          sx={{
            fontWeight: 800,
            color: 'black',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'center'
            // gap: 0.5
          }}
        >
          Dashb
          <Box
            sx={{
              display: 'inline-flex',
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
          ard
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <PersonIcon sx={{ fontSize: 15 }} />
          <Typography level="body-md" sx={{ fontWeight: 600 }}>
            Sneha Babu G
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SnoozeIcon sx={{ fontSize: 15 }} />
          <Typography level="body-sm" sx={{ fontWeight: 500, fontSize: 12 }}>
            {time.toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default AdminTopBar