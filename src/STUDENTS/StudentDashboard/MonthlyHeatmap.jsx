import React from "react";
import { Box, Typography, Tooltip } from "@mui/material";

// Generate 365 days
const generateYearData = () => {
    return Array.from({ length: 365 }, (_, i) => ({
        day: i + 1,
        count: Math.floor(Math.random() * 5),
    }));
};

// Month labels (approx positions)
const months = [
    { name: "Jan", index: 0 },
    { name: "Feb", index: 4 },
    { name: "Mar", index: 8 },
    { name: "Apr", index: 13 },
    { name: "May", index: 17 },
    { name: "Jun", index: 21 },
    { name: "Jul", index: 26 },
    { name: "Aug", index: 30 },
    { name: "Sep", index: 35 },
    { name: "Oct", index: 39 },
    { name: "Nov", index: 44 },
    { name: "Dec", index: 48 },
];

// Color scale
const getColor = (count) => {
    if (count === 0) return "#ebedf0";
    if (count === 1) return "#c6e48b";
    if (count === 2) return "#7bc96f";
    if (count === 3) return "#239a3b";
    return "#196127";
};

const YearHeatmap = () => {
    const data = generateYearData();

    return (
        <Box
            sx={{
                width: "100%",
                height:'100%',
                // bgcolor: "#e93131",
                borderRadius: 3,
                p: 1.5, //  reduced padding
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                flexDirection:'column'
            }}
        >
            {/* Month Labels */}
            <Box
                sx={{
                    display: "flex",
                    gap: "2px",
                    ml: "20px", // space for alignment
                }}
            >
                {months.map((m) => (
                    <Typography
                        key={m.name}
                        sx={{
                            fontSize: 10,
                            width: m.index === 0 ? 10 : m.index * 2,
                        }}
                    >
                        {m.name}
                    </Typography>
                ))}
            </Box>

            {/* Heatmap + Days */}
            <Box sx={{ display: "flex", mt: 1 }}>
                {/* Day Labels */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        mr: 1,
                        height: 80,
                    }}
                >
                    <Typography fontSize={9}>Mon</Typography>
                    <Typography fontSize={9}>Wed</Typography>
                    <Typography fontSize={9}>Fri</Typography>
                </Box>

                {/* Heatmap */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "2px",
                        overflowX: "auto",
                    }}
                >
                    {Array.from({ length: 53 }).map((_, weekIndex) => (
                        <Box
                            key={weekIndex}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                            }}
                        >
                            {Array.from({ length: 7 }).map((_, dayIndex) => {
                                const dataIndex = weekIndex * 7 + dayIndex;
                                const item = data[dataIndex];

                                return (
                                    <Tooltip
                                        key={dayIndex}
                                        title={
                                            item
                                                ? `Day ${item.day}: ${item.count} activities`
                                                : ""
                                        }
                                        arrow
                                    >
                                        <Box
                                            sx={{
                                                width: 9, //  smaller
                                                height: 9,
                                                borderRadius: "2px",
                                                bgcolor: item
                                                    ? getColor(item.count)
                                                    : "transparent",
                                                border:
                                                    item && item.count === 0
                                                        ? "1px solid #ddd"
                                                        : "none",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </Tooltip>
                                );
                            })}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Legend */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 1,
                    justifyContent: "flex-end",
                    width:'100%'
                }}
            >
                <Typography fontSize={9}>Less</Typography>

                {[0, 1, 2, 3, 4].map((c) => (
                    <Box
                        key={c}
                        sx={{
                            width: 9,
                            height: 9,
                            bgcolor: getColor(c),
                            borderRadius: "2px",
                            border: c === 0 ? "1px solid #ddd" : "none",
                        }}
                    />
                ))}

                <Typography fontSize={9}>More</Typography>
            </Box>
        </Box>
    );
};

export default YearHeatmap;