import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import SchoolIcon from '@mui/icons-material/School';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TimelineIcon from '@mui/icons-material/Timeline';

const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <Paper
        elevation={2}
        sx={{
            p: 3,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            transition: 'transform 0.2s',
            '&:hover': {
                transform: 'translateY(-5px)',
            },
        }}
    >
        <Box
            sx={{
                backgroundColor: `${color}15`,
                borderRadius: '12px',
                p: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ fontSize: 40, color: color }} />
        </Box>
        <Box>
            <Typography variant="h4" component="div" fontWeight="bold">
                {value}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="caption" color="text.secondary">
                    {subtitle}
                </Typography>
            )}
        </Box>
    </Paper>
);

const Statistics = ({ stats }) => {
    const pieChartData = stats.schoolsByCity.map(item => ({
        id: item.city,
        value: item.count,
        label: item.city,
    }));

    const statCards = [
        {
            icon: SchoolIcon,
            title: "Total Schools",
            value: stats.totalSchools,
            color: "#72b626"
        },
        {
            icon: DirectionsCarIcon,
            title: "Total Cars",
            value: stats.totalCars,
            color: "#2196f3"
        },
        {
            icon: PersonIcon,
            title: "Total Trainers",
            value: stats.totalTrainers,
            color: "#ff9800"
        },
        {
            icon: GroupIcon,
            title: "Total Students",
            value: stats.totalStudents,
            color: "#e91e63"
        },
        {
            icon: MenuBookIcon,
            title: "Theoretical Exam Passed",
            value: stats.exams.theoretical,
            subtitle: `${((stats.exams.theoretical / stats.totalStudents) * 100).toFixed(1)}% of total students`,
            color: "#9c27b0"
        },
        {
            icon: DirectionsCarIcon,
            title: "Practical Exam Passed",
            value: stats.exams.practical,
            subtitle: `${((stats.exams.practical / stats.totalStudents) * 100).toFixed(1)}% of total students`,
            color: "#009688"
        },
        {
            icon: TimelineIcon,
            title: "Practical Lessons",
            value: stats.practicalLessons.completed,
            subtitle: `${((stats.practicalLessons.completed / stats.practicalLessons.total) * 100).toFixed(1)}% completion rate`,
            color: "#607d8b"
        }
    ];

    return (
        <Box sx={{ mb: 4 }}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StatCard {...card} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                            Schools Distribution by City
                        </Typography>
                        <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
                            <PieChart
                                series={[
                                    {
                                        data: pieChartData,
                                        highlightScope: { faded: 'global', highlighted: 'item' },
                                        faded: { innerRadius: 30, additionalRadius: -30 },
                                    },
                                ]}
                                height={400}
                                width={500}
                                colors={['#72b626', '#2196f3', '#ff9800', '#e91e63', '#9c27b0']}
                                slotProps={{
                                    legend: {
                                        direction: 'row',
                                        position: { vertical: 'bottom', horizontal: 'middle' },
                                        padding: 0,
                                    },
                                }}
                            />
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, color: 'text.secondary' }}>
                            Monthly Performance
                        </Typography>
                        <Box sx={{ height: 400, display: 'flex', justifyContent: 'center' }}>
                            <BarChart
                                xAxis={[{ 
                                    scaleType: 'band', 
                                    data: stats.monthlyStats.map(item => item.month) 
                                }]}
                                series={[
                                    {
                                        data: stats.monthlyStats.map(item => item.newStudents),
                                        label: 'New Students',
                                        color: '#72b626',
                                    },
                                    {
                                        data: stats.monthlyStats.map(item => item.theoreticalPassed),
                                        label: 'Theoretical Passed',
                                        color: '#2196f3',
                                    },
                                    {
                                        data: stats.monthlyStats.map(item => item.practicalPassed),
                                        label: 'Practical Passed',
                                        color: '#ff9800',
                                    },
                                ]}
                                height={400}
                                width={500}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;
