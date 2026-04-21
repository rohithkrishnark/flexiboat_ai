import React, { useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { BarChart } from '@mui/x-charts';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import { useFetchLatestChat } from '../../CommonCode/useQuery';

const FAQAnalytics = () => {
  
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 5;


  const { data: chatData = [] } = useFetchLatestChat();

  //  PROCESS DATA (GROUP BY QUESTION)
  const faqAnalytics = useMemo(() => {
    const map = {};

    chatData?.forEach((item) => {
      let question = item.query;

      if (!question) return;

      //  CLEAN + NORMALIZE
      question = question
        .toLowerCase()
        .trim()
        .replace(/[^\w\s]/gi, '') // remove symbols
        .replace(/\s+/g, ' ');

      map[question] = (map[question] || 0) + 1;
    });
    //  convert to array
    const result = Object.keys(map).map((q) => ({
      question: q,
      count: map[q],
    }));

    //  sort highest first
    return result.sort((a, b) => b.count - a.count);
  }, [chatData]);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        bgcolor: '#fff',
        boxShadow: 'lg',
        borderRadius: 5,
        p: 3,
        display: 'flex',
        gap: 3,
      }}
    >
      {/* LEFT: FAQ LIST */}
      <Box sx={{ width: '50%' }}>
        <Typography
          variant="h6"
          sx={{ fontSize: 14, fontWeight: 800, display: 'flex', gap: 1 }}
        >
          <ContactSupportTwoToneIcon sx={{ fontSize: 16 }} />
          Frequently Asked Questions & Analytics
        </Typography>

        <Divider sx={{ mb: 1 }} />

        <List
          sx={{
            maxHeight: showAll ? 260 : 'auto',
            overflowY: showAll ? 'auto' : 'hidden',
            pr: 1,
          }}
        >
          {(showAll ? faqAnalytics : faqAnalytics.slice(0, visibleCount)).map(
            (faq, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  primary={`${index + 1}. ${faq.question}`}
                  secondary={`Asked ${faq.count} times`}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#111',
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      fontSize: 10,
                      color: 'gray',
                    },
                  }}
                />
              </ListItem>
            )
          )}
        </List>

        {/* SHOW MORE / LESS */}
        {faqAnalytics.length > visibleCount && (
          <Typography
            onClick={() => setShowAll(!showAll)}
            sx={{
              mt: 1,
              fontSize: 12,
              fontWeight: 600,
              color: 'primary.main',
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            {showAll ? 'Show less' : 'Show more'}
          </Typography>
        )}
      </Box>

      {/* RIGHT: BAR CHART */}
      <Box sx={{ width: '60%' }}>
        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: faqAnalytics.map((faq) =>
                faq.question.length > 15
                  ? faq.question.slice(0, 15) + '...'
                  : faq.question
              ),
            },
          ]}
          series={[
            {
              data: faqAnalytics.map((faq) => faq.count),
              label: 'No. of times asked',
            },
          ]}
          height={270}
        />
      </Box>
    </Box>
  );
};

export default FAQAnalytics;