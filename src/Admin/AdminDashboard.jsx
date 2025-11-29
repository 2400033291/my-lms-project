import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Manage Courses</Typography>
          <Button variant="contained" sx={{ mt: 1 }} component={Link} to="/admin/courses">
            Add / Edit Courses
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">User Access</Typography>
          <Button variant="contained" sx={{ mt: 1 }} component={Link} to="/admin/access">
            Approve Course Access
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Assignments</Typography>
          <Button variant="contained" sx={{ mt: 1 }} component={Link} to="/admin/assignments">
            Manage Assignments
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
