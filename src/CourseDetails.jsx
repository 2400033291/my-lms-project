// src/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Paper, Typography, Button } from "@mui/material";
import { useAuth } from "./AuthContext";
import { sampleCourses } from "./sampleData";

const fileToBase64 = (file) => new Promise((res, rej) => {
  const reader = new FileReader();
  reader.onload = () => res(reader.result);
  reader.onerror = rej;
  reader.readAsDataURL(file);
});

const CourseDetails = () => {
  const { id } = useParams();
  const courseId = parseInt(id, 10);
  const [course, setCourse] = useState(null);
  const { user, enroll, unenroll, getEnrollments, submitAssignment } = useAuth();
  const [enrollment, setEnrollment] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const found = sampleCourses().find(c => c.id === courseId);
    setCourse(found || null);
  }, [courseId]);

  useEffect(() => {
    const check = async () => {
      if (!user) { setEnrollment(null); return; }
      const e = await getEnrollments(user.id);
      setEnrollment(e.find(x => x.courseId === courseId) || null);
    };
    check();
  }, [user, courseId, getEnrollments]);

  const doEnroll = async () => {
    const res = await enroll(courseId);
    if (res.success) { alert("Enrolled"); setEnrollment(res.enrollment); }
    else alert(res.message);
  };

  const doUnenroll = async () => {
    if (!enrollment) return;
    await unenroll(enrollment.id);
    setEnrollment(null);
    alert("Un-enrolled");
  };

  const handleFile = (e) => setFile(e.target.files[0] || null);

  const submit = async () => {
    if (!file) { alert("Choose file"); return; }
    const data = await fileToBase64(file);
    const res = await submitAssignment({ courseId, fileName: file.name, fileData: data });
    if (res.success) { alert("Submitted"); setFile(null); }
  };

  if (!course) return <Container sx={{ mt: 4 }}><Typography>Course not found</Typography></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4">{course.title}</Typography>
        <Typography sx={{ mt: 2 }}>{course.description}</Typography>

        {!enrollment ? (
          <Button variant="contained" sx={{ mt: 3, backgroundColor: "#EF4444" }} onClick={doEnroll}>Enroll Now</Button>
        ) : (
          <Button variant="outlined" color="error" sx={{ mt: 3 }} onClick={doUnenroll}>Un-enroll</Button>
        )}

        {enrollment && (
          <div style={{ marginTop: 20 }}>
            <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" onChange={handleFile} />
            <Button variant="contained" sx={{ ml: 2 }} onClick={submit}>Upload & Submit</Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default CourseDetails;
