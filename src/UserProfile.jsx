import React, { useState } from "react";

const UserProfile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    name: "Student",
    email: "student@example.com",
  };

  const [user, setUser] = useState(storedUser);

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated!");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Profile</h1>

      <div style={styles.container}>
        {/* Avatar */}
        <div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Avatar"
            style={styles.avatar}
          />
        </div>

        {/* Form */}
        <div style={styles.form}>
          <label>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            style={styles.input}
          />

          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={styles.input}
          />

          <button style={styles.button} onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    display: "flex",
    gap: "40px",
  },
  avatar: {
    width: "150px",
    borderRadius: "50%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    gap: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid gray",
  },
  button: {
    background: "#4f46e5",
    color: "white",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default UserProfile;
