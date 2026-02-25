import React, { useState } from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';

const faqAnalytics = [
  { question: 'How to reset my password?', count: 120 },
  { question: 'How to contact support?', count: 90 },
  { question: 'How to track my order?', count: 70 },
  { question: 'Refund policy?', count: 50 },
  { question: 'How do I change my email address?', count: 85 },
  { question: 'How to cancel my order?', count: 65 },
  { question: 'What payment methods are accepted?', count: 95 },
  { question: 'Is cash on delivery available?', count: 40 },
  { question: 'How long does delivery take?', count: 110 },
  { question: 'Can I update my shipping address?', count: 55 },
  { question: 'Why is my payment failing?', count: 75 },
  { question: 'How to apply a discount coupon?', count: 60 },
  { question: 'How do I delete my account?', count: 30 },
  { question: 'Is my data secure?', count: 45 },
];

const FAQAnalytics = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleCount = 5;

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
        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: 14,fontWeight:800 }}>
         <ContactSupportTwoToneIcon sx={{fontSize:14}}/> Frequently Asked Questions & FAQ Analytics
        </Typography>

        <Divider sx={{ mb: 1 }} />

        <List
          sx={{
            maxHeight: showAll ? 260 : 'auto',
            overflowY: showAll ? 'auto' : 'hidden',
            pr: 1,
          }}
        >
          {(showAll ? faqAnalytics : faqAnalytics.slice(0, visibleCount))?.map(
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

      {/* RIGHT: ANALYTICS CHART */}
      <Box sx={{ width: '60%' }}>

        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: faqAnalytics.map((faq) => faq.question),
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