import React from 'react';
import {
    Box,
    Typography,
    Divider,
    Grid,
    Chip,
} from '@mui/material';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import { PieChart } from '@mui/x-charts';

const gradeDataFromAPI = [
    { grade: 'A', count: 120 },
    { grade: 'B', count: 95 },
    { grade: 'C', count: 60 },
    { grade: 'D', count: 25 },
    { grade: 'F', count: 10 },
];

// Total Students
const totalStudents = gradeDataFromAPI.reduce(
    (acc, item) => acc + item.count,
    0
);

// Pass Students (everything except F)
const passStudents = gradeDataFromAPI
    .filter(item => item.grade !== 'F')
    .reduce((acc, item) => acc + item.count, 0);

// Pass Percentage
const passPercentage = ((passStudents / totalStudents) * 100).toFixed(1);

const FacultyGradeDistribution = () => {
    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: '#fff',
                borderRadius: 4,
                boxShadow: 'lg',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                position:'relative'
            }}
        >
            {/* HEADER */}
            <Typography fontWeight={700} fontSize={14}>
                <SchoolTwoToneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                Grade Distribution
            </Typography>

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* PIE CHART WITH CENTER TEXT */}
                <Box sx={{ position: 'relative' }}>
                    <PieChart
                        series={[
                            {
                                data: gradeDataFromAPI.map((item, index) => ({
                                    id: index,
                                    value: item.count,
                                    label: `Grade ${item.grade}`,
                                })),
                                innerRadius: 50,
                                outerRadius: 90,
                            },
                        ]}
                        height={250}
                    />

                    {/* CENTER PASS % */}

                </Box>
                <Box
                    sx={{
                        position: 'absolute',
                        // top: '50%',
                        // left: '50%',
                        right:10,
                        top:20,
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}
                >
                    <Typography fontWeight={700} fontSize={18}>
                        {passPercentage}%
                    </Typography>
                    <Typography fontSize={11} color="gray">
                        Pass Rate
                    </Typography>
                </Box>
                {/* GRADE SUMMARY */}
                <Grid container spacing={1} sx={{ width: '40%' }}>
                    {gradeDataFromAPI.map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Chip
                                label={`Grade ${item.grade}: ${item.count}`}
                                size="small"
                                sx={{
                                    fontSize: 12,
                                    fontWeight: 600,
                                    width: '100%',
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