import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Student",
  };

  const enrolled = JSON.parse(localStorage.getItem("myCourses")) || [];
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome, {user.name} 👋</h1>

      {/* Stats Section */}
      <div style={styles.stats}>
        <div style={styles.card}>
          <h2>{enrolled.length}</h2>
          <p>Courses Enrolled</p>
        </div>

        <div style={styles.card}>
          <h2>{assignments.length}</h2>
          <p>Assignments Submitted</p>
        </div>
      </div>

      {/* Quick Links */}
      <div style={styles.quickLinks}>
        <Link to="/courses" style={styles.button}>Browse Courses</Link>
        <Link to="/mycourses" style={styles.button}>My Courses</Link>
        <Link to="/profile" style={styles.button}>Profile</Link>
      </div>

      {/* Recent Courses */}
      <h2 style={{ marginTop: "30px" }}>Recent Courses</h2>
      <div style={styles.recentContainer}>
        {enrolled.slice(0, 3).map((course) => (
          <div key={course.id} style={styles.recentCard}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: { padding: "40px" },
  title: { fontSize: "32px", marginBottom: "20px" },
  stats: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    flex: 1,
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
  },
  quickLinks: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  button: {
    padding: "10px 15px",
    background: "#4f46e5",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
  },
  recentContainer: {
    display: "flex",
    gap: "20px",
  },
  recentCard: {
    background: "#e0e7ff",
    padding: "15px",
    borderRadius: "10px",
    width: "30%",
  },
};

export default Dashboard;
