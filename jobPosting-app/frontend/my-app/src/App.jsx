import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobListings from "./pages/JobListing";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Layout from "./components/Layout";
import JobDetails from "./pages/JobDetails";
import CreateJobs from "./pages/CreateJobs";
import DeleteJobs from "./pages/DeleteJobs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/joblistings"
            element={
              <ProtectedRoutes>
                <Layout>
                  <JobListings />
                </Layout>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/jobdetails/:id"
            element={
              <ProtectedRoutes>
                <Layout>
                  <JobDetails />
                </Layout>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/createjobs"
            element={
              <ProtectedRoutes>
                <Layout>
                  <CreateJobs />
                </Layout>
              </ProtectedRoutes>
            }
          />

          <Route
            path="/deletejobs"
            element={
              <ProtectedRoutes>
                <Layout>
                  <DeleteJobs />
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
