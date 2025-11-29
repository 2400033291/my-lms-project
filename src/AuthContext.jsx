// src/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "lms_user";
const ASSIGN_KEY = "lms_assignments";
const ENROLL_KEY = "lms_enrollments";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
  }, [user]);

  // register: store user locally (id is timestamp)
  const register = async (name, email, password) => {
    // simple duplicate check
    const users = JSON.parse(localStorage.getItem("lms_users") || "[]");
    if (users.find((u) => u.email === email)) return { success: false, message: "Email already used" };
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("lms_users", JSON.stringify(users));
    setUser(newUser);
    return { success: true, user: newUser };
  };

  // login: check local users
  const login = async (email, password) => {
    const users = JSON.parse(localStorage.getItem("lms_users") || "[]");
    const u = users.find((x) => x.email === email && x.password === password);
    if (!u) return { success: false, message: "Invalid credentials" };
    setUser(u);
    return { success: true, user: u };
  };

  const logout = () => {
    setUser(null);
  };

  // enrollments stored as [{ id, userId, courseId }]
  const enroll = async (courseId) => {
    if (!user) return { success: false, message: "Login required" };
    const enrolls = JSON.parse(localStorage.getItem(ENROLL_KEY) || "[]");
    const exists = enrolls.find((e) => e.userId === user.id && e.courseId === courseId);
    if (exists) return { success: false, message: "Already enrolled" };
    const e = { id: Date.now(), userId: user.id, courseId };
    enrolls.push(e);
    localStorage.setItem(ENROLL_KEY, JSON.stringify(enrolls));
    return { success: true, enrollment: e };
  };

  const unenroll = async (enrollId) => {
    const enrolls = JSON.parse(localStorage.getItem(ENROLL_KEY) || "[]");
    const filtered = enrolls.filter((e) => e.id !== enrollId);
    localStorage.setItem(ENROLL_KEY, JSON.stringify(filtered));
    return { success: true };
  };

  const getEnrollments = async (userId) => {
    const enrolls = JSON.parse(localStorage.getItem(ENROLL_KEY) || "[]");
    return enrolls.filter((e) => e.userId === userId);
  };

  // assignments stored as [{id,userId,courseId,fileName,fileData,submittedAt}]
  const submitAssignment = async ({ courseId, fileName, fileData }) => {
    if (!user) return { success: false, message: "Login required" };
    const list = JSON.parse(localStorage.getItem(ASSIGN_KEY) || "[]");
    const item = { id: Date.now(), userId: user.id, courseId, fileName, fileData, submittedAt: new Date().toISOString() };
    list.push(item);
    localStorage.setItem(ASSIGN_KEY, JSON.stringify(list));
    return { success: true, item };
  };

  const getAssignments = async (userId) => {
    const list = JSON.parse(localStorage.getItem(ASSIGN_KEY) || "[]");
    return list.filter((s) => s.userId === userId);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, enroll, unenroll, getEnrollments, submitAssignment, getAssignments }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
