import React, { useMemo } from "react";
import { Box, Typography, Divider } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import AssessmentTwoToneIcon from "@mui/icons-material/AssessmentTwoTone";

const ActivityAverageAnalytics = ({ data = [] }) => {

  const weeklyAvg = useMemo(() => {
    if (!data.length) return [];

    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toISOString().split("T")[0];
    });

    const map = days.reduce((acc, day) => {
      acc[day] = { total: 0, count: 0 };
      return acc;
    }, {});

    data.forEach((item) => {
      if (!item.created_at || item.rejected) return;

      const day = item.created_at.split("T")[0];

      if (map[day]) {
        map[day].total += Number(item.activity_score || 0);
        map[day].count += 1;
      }
    });

    return days.map((day) => {
      const { total, count } = map[day];
      return count ? Number((total / count).toFixed(2)) : 0;
    });
  }, [data]);

  const labels = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        boxShadow: "lg",
        borderRadius: 5,
        p: 3,
      }}
    >
      <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
        <AssessmentTwoToneIcon sx={{ fontSize: 16 }} /> Weekly Average Score
      </Typography>

      <Divider sx={{ my: 2 }} />

      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: labels,
          },
        ]}
        series={[
          {
            data: weeklyAvg,
            label: "Avg Score",
          },
        ]}
        height={250}
      />
    </Box>
  );
};

export default ActivityAverageAnalytics;