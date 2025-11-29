// src/Courses.jsx
import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { useAuth } from "./AuthContext";
import { sampleCourses } from "./sampleData";

const Courses = () => {
  const { user, enroll } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(sampleCourses());
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) { alert("Please login to enroll."); return; }
    const res = await enroll(courseId);
    if (!res.success) alert(res.message || "Unable to enroll");
    else alert("Enrolled successfully");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Available Courses</Typography>
      <Grid container spacing={3}>
        {courses.map((c) => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card elevation={4}>
              <img src={c.image} alt={c.title} style={{ width: "100%", height: 160, objectFit: "cover" }} />
              <CardContent>
                <Typography variant="h6">{c.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{c.description}</Typography>
              </CardContent>
              <CardActions sx={{ px: 2, pb: 2 }}>
                <Button variant="contained" onClick={() => handleEnroll(c.id)} sx={{ backgroundColor: "#EF4444" }}>Enroll</Button>
                <Button href={`/courses/${c.id}`} variant="outlined">Details</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
