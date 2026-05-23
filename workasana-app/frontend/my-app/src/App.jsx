import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/Signup";
import Teams from "./pages/Teams";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/teams"
            element={
              <ProtectedRoutes>
                <Layout>
                  <Teams />
                </Layout>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/reports"
            element={
              <ProtectedRoutes>
                <Layout>
                  <Reports />
                </Layout>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
