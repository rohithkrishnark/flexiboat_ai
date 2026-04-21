import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  Chip,
} from "@mui/material";
import SchoolTwoToneIcon from "@mui/icons-material/SchoolTwoTone";
import { PieChart } from "@mui/x-charts";

const FacultyGradeDistribution = ({ data = [] }) => {

  const weeklyData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        date: d.toISOString().split("T")[0],
        label: d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
        }),
        score: 0,
      };
    });

    const map = {};
    days.forEach((d) => (map[d.date] = d));

    data.forEach((item) => {
      if (!item.created_at || item.rejected) return;

      const day = item.created_at.split("T")[0];

      if (map[day]) {
        map[day].score += Number(item.activity_score || 0);
      }
    });

    return days;
  }, [data]);

  const totalScore = weeklyData.reduce((sum, d) => sum + d.score, 0);

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderRadius: 4,
        boxShadow: "lg",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 1,
        position: "relative",
      }}
    >
      {/* HEADER */}
      <Typography fontWeight={700} fontSize={14}>
        <SchoolTwoToneIcon sx={{ fontSize: 16, mr: 0.5 }} />
        Weekly Activity Score Distribution
      </Typography>

      <Divider />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* PIE */}
        <Box sx={{ position: "relative" }}>
          <PieChart
            series={[
              {
                data: weeklyData.map((item, index) => ({
                  id: index,
                  value: item.score,
                  label: item.label,
                })),
                innerRadius: 50,
                outerRadius: 90,
              },
            ]}
            height={250}
          />
        </Box>

        {/* CENTER TOTAL */}
        <Box
          sx={{
            position: "absolute",
            right: 10,
            top: 20,
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <Typography fontWeight={700} fontSize={18}>
            {totalScore}
          </Typography>
          <Typography fontSize={11} color="gray">
            Weekly Score
          </Typography>
        </Box>

        {/* SUMMARY */}
        <Grid container spacing={1} sx={{ width: "40%" }}>
          {weeklyData.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Chip
                label={`${item.label}: ${item.score}`}
                size="small"
                sx={{
                  fontSize: 12,
                  fontWeight: 600,
                  width: "100%",
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FacultyGradeDistribution;