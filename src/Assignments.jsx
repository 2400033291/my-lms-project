// src/Assignments.jsx
import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, Button } from "@mui/material";
import { useAuth } from "./AuthContext";

const Assignments = () => {
  const { user, getAssignments } = useAuth();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    if (!user) return;
    getAssignments(user.id).then(setSubs);
  }, [user, getAssignments]);

  const download = (s) => {
    const a = document.createElement("a");
    a.href = s.fileData;
    a.download = s.fileName;
    a.click();
  };

  if (!user) return <Container sx={{ mt: 4 }}><Typography>Please login to view submissions.</Typography></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">My Submissions</Typography>
      <List>
        {subs.map(s => (
          <ListItem key={s.id} sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Typography>{s.fileName}</Typography>
              <Typography variant="caption" color="text.secondary">{new Date(s.submittedAt).toLocaleString()}</Typography>
            </div>
            <Button onClick={() => download(s)}>Download</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Assignments;
