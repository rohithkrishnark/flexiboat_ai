import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import FeedbackTwoToneIcon from '@mui/icons-material/FeedbackTwoTone';
import Person3TwoToneIcon from '@mui/icons-material/Person3TwoTone';
import { PieChart } from '@mui/x-charts';
import { useFetchLatestChat } from '../../CommonCode/useQuery';


const UserFeedbackWithChart = () => {

  const { data: chatData = [] } = useFetchLatestChat();

  //  GROUP BY DATE (for chart)
  const chartData = useMemo(() => {
    const map = {};
    chatData?.forEach((item) => {
      const date = new Date(item.created_at).toLocaleDateString();
      map[date] = (map[date] || 0) + 1;
    });

    return Object.keys(map).map((date, index) => ({
      id: index,
      value: map[date],
      label: date,
    }));
  }, [chatData]);

  //  LATEST FIRST
  const sortedChats = useMemo(() => {
    return [...chatData].sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [chatData]);

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
        User Interactions
      </Typography>

      <Divider />

      {/* CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          gap: 2,
          overflow: 'hidden',
        }}
      >
        {/* LEFT: PIE CHART (Messages per day) */}
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
                data: chartData,
                innerRadius: 30,
                outerRadius: 60,
              },
            ]}
            height={180}
          />
        </Box>

        {/* RIGHT: CHAT LIST */}
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
            {sortedChats.map((item, index) => (
              <ListItem key={index} alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography fontSize={12} fontWeight={600}>
                      <Person3TwoToneIcon sx={{ fontSize: 14 }} /> Anonymous User
                    </Typography>
                  }
                  secondary={
                    <>
                      {/* USER QUESTION */}
                      <Typography fontSize={12} color="#111" fontWeight={500}>
                        Q: {item.query}
                      </Typography>

                      {/* BOT RESPONSE */}
                      <Typography fontSize={11} color="gray">
                        A: {item.response}
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