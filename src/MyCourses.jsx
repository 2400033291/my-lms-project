// src/MyCourses.jsx
import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, List, ListItem } from "@mui/material";
import { useAuth } from "./AuthContext";
import { sampleCourses } from "./sampleData";
import { Link } from "react-router-dom";

const MyCourses = () => {
  const { user, getEnrollments, unenroll } = useAuth();
  const [enrolls, setEnrolls] = useState([]);
  const [coursesMap, setCoursesMap] = useState({});

  useEffect(() => {
    const map = {};
    sampleCourses().forEach(c => (map[c.id] = c));
    setCoursesMap(map);
  }, []);

  useEffect(() => {
    if (!user) return setEnrolls([]);
    getEnrollments(user.id).then(setEnrolls);
  }, [user, getEnrollments]);

  const handleRemove = async (id) => {
    await unenroll(id);
    setEnrolls((s) => s.filter(e => e.id !== id));
  };

  if (!user) return <Container sx={{ mt: 4 }}><Typography>Please login to view your courses.</Typography></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5">My Courses</Typography>
        <List>
          {enrolls.map(e => (
            <ListItem key={e.id} sx={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Typography variant="subtitle1">{coursesMap[e.courseId]?.title || `Course ${e.courseId}`}</Typography>
                <Typography variant="body2" color="text.secondary">{coursesMap[e.courseId]?.description}</Typography>
              </div>
              <div>
                <Button component={Link} to={`/courses/${e.courseId}`} sx={{ mr: 1 }}>Open</Button>
                <Button color="error" variant="outlined" onClick={() => handleRemove(e.id)}>Remove</Button>
              </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default MyCourses;
