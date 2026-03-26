import React from 'react';
import {
    Box,
    Typography,
    Divider,
    Grid,
    Chip,
} from '@mui/material';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import { PieChart } from '@mui/x-charts';

// Mock Student Data
const studentActivityData = [
    { label: 'Completed', value: 18 },
    { label: 'Pending', value: 7 },
    { label: 'Overdue', value: 3 },
];

// Totals
const totalTasks = studentActivityData.reduce((acc, item) => acc + item.value, 0);

// Completion %
const completedTasks = studentActivityData.find(item => item.label === 'Completed')?.value || 0;
const completionPercentage = ((completedTasks / totalTasks) * 100).toFixed(1);

const StudentPerformanceCard = () => {
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
                position: 'relative',
            }}
        >
            {/* HEADER */}
            <Typography fontWeight={700} fontSize={14}>
                <AssessmentTwoToneIcon sx={{ fontSize: 16, mr: 0.5 }} />
                My Activity Overview
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
                {/* PIE CHART */}
                <Box sx={{ position: 'relative' }}>
                    <PieChart
                        series={[
                            {
                                data: studentActivityData.map((item, index) => ({
                                    id: index,
                                    value: item.value,
                                    label: item.label,
                                })),
                                innerRadius: 50,
                                outerRadius: 90,
                            },
                        ]}
                        height={250}
                    />
                </Box>

                {/* CENTER % */}
                <Box
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 20,
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                    }}
                >
                    <Typography fontWeight={700} fontSize={18}>
                        {completionPercentage}%
                    </Typography>
                    <Typography fontSize={11} color="gray">
                        Completed
                    </Typography>
                </Box>

                {/* SUMMARY */}
                <Grid container spacing={1} sx={{ width: '40%' }}>
                    {studentActivityData.map((item, index) => (
                        <Grid item xs={6} key={index}>
                            <Chip
                                label={`${item.label}: ${item.value}`}
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

export default StudentPerformanceCard;