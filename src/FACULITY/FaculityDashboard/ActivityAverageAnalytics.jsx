import React, { useMemo } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';

const activityGrades = [
    { activity: "Hackathon", grades: [85, 90, 78, 88, 92] },
    { activity: "Workshop", grades: [70, 75, 80, 68, 72] },
    { activity: "Seminar", grades: [88, 84, 90, 86, 91] },
    { activity: "Sports", grades: [60, 65, 72, 70, 68] },
    { activity: "Project Expo", grades: [92, 94, 89, 96, 90] },

    { activity: "Coding Contest", grades: [81, 87, 79, 85, 90] },
    { activity: "Technical Quiz", grades: [73, 78, 76, 80, 74] },
    { activity: "Cultural Fest", grades: [89, 85, 91, 87, 90] },
    { activity: "Internship Program", grades: [88, 92, 84, 90, 86] },
    { activity: "Paper Presentation", grades: [77, 82, 79, 85, 80] },
    { activity: "Robotics Competition", grades: [90, 93, 88, 91, 95] },
    { activity: "Debate Competition", grades: [72, 75, 78, 74, 76] },
    { activity: "Community Service", grades: [84, 86, 88, 82, 85] },
    { activity: "Startup Pitch", grades: [91, 89, 94, 92, 90] },
    { activity: "Research Symposium", grades: [87, 90, 85, 88, 92] },
];


const ActivityAverageAnalytics = () => {

    //  Calculate Average for each activity
    const activityAverage = useMemo(() => {
        return activityGrades.map((item) => {
            const total = item.grades.reduce((sum, grade) => sum + grade, 0);
            const avg = total / item.grades.length;
            return {
                activity: item.activity,
                average: Number(avg.toFixed(2)),
            };
        });
    }, []);

    return (
        <Box
            sx={{
                width: '100%',
                bgcolor: '#fff',
                boxShadow: 'lg',
                borderRadius: 5,
                p: 3,
            }}
        >
            <Typography sx={{ fontSize: 14, fontWeight: 800 }}>
                <AssessmentTwoToneIcon sx={{ fontSize: 16 }} /> Activity Average Grade Analytics
            </Typography>

            <Divider sx={{ my: 2 }} />

            <BarChart
                xAxis={[
                    {
                        scaleType: 'band',
                        data: activityAverage.map((a) => a.activity),
                    },
                ]}
                series={[
                    {
                        data: activityAverage.map((a) => a.average),
                        label: 'Average Grade',
                    },
                ]}
                height={200}
            />
        </Box>
    );
};

export default ActivityAverageAnalytics;