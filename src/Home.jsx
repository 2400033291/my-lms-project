// src/Home.jsx
import React from "react";
import { Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h3" align="center" gutterBottom>Welcome to the LMS</Typography>
      <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
        Modern, clean interface — enroll courses, upload assignments, manage your learning.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Explore Courses</Typography>
              <Typography color="text.secondary">Browse available courses and enroll.</Typography>
              <Button component={Link} to="/courses" variant="contained" sx={{ mt: 2 }}>Browse</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">My Courses</Typography>
              <Typography color="text.secondary">View enrolled courses and manage them.</Typography>
              <Button component={Link} to="/mycourses" variant="contained" sx={{ mt: 2 }}>Open</Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6">Assignments</Typography>
              <Typography color="text.secondary">Upload and download your submissions.</Typography>
              <Button component={Link} to="/assignments" variant="contained" sx={{ mt: 2 }}>View</Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
