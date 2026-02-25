import React from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Rating,
} from '@mui/material';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import { PieChart } from '@mui/x-charts';
import Person3TwoToneIcon from '@mui/icons-material/Person3TwoTone';

const staticFeedback = [
  { rating: 5, comment: 'The chatbot solved my issue in seconds.' },
  { rating: 4, comment: 'Website UI is clean and easy to use.' },
  { rating: 3, comment: 'Bot replies are sometimes repetitive.' },
  { rating: 5, comment: 'Very smooth experience overall.' },
  { rating: 2, comment: 'Website loading is slow on mobile.' },
  { rating: 4, comment: 'Helpful answers but needs more examples.' },
];

// Pie data
const ratingCounts = [1, 2, 3, 4, 5].map((star) => ({
  id: star,
  value: staticFeedback.filter((f) => f.rating === star).length,
  label: `${star} Star`,
}));

const UserFeedbackWithChart = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#fff',
        boxShadow: 'lg',
        borderRadius: 5,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {/* HEADER */}
      <Typography fontWeight={700} sx={{ fontSize: 14 }}>
        <FeedbackTwoToneIcon sx={{ fontSize: 14, mr: 0.5 }} />
        User Feedback
      </Typography>

      <Divider />

      {/* FLEX CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        {/* LEFT: PIE CHART */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PieChart
            series={[
              {
                data: ratingCounts,
                innerRadius: 30,
                outerRadius: 60,
              },
            ]}
            height={180}
          />
        </Box>

        {/* RIGHT: FEEDBACK LIST */}
        <Box
          sx={{
            flex: 1,
            overflow: 'hidden',
          }}
        >
          <List
            sx={{
              pr: 1,
              maxHeight: '100%',
              overflowY: 'auto',

              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {staticFeedback.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography fontSize={12} fontWeight={600}>
                     <Person3TwoToneIcon sx={{fontSize:14}}/> Anonymous User
                    </Typography>
                  }
                  secondary={
                    <>
                      <Rating value={item.rating} readOnly size="small" />
                      <Typography fontSize={12} color="gray">
                        {item.comment}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default UserFeedbackWithChart;