import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import UseFetch from "./UseFetch";
import { useMemo } from "react";

export default function UseProjects(filters = {}, refreshProjects) {
  const { user } = useContext(AuthContext);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== [] && value !== undefined) {
        params.append(key, value);
      }
    });

    return params.toString();
  }, [filters, refreshProjects]);

  const url = queryString
    ? `https://full-stack-web-applications-fy35.onrender.com/api/projects?${queryString}`
    : `https://full-stack-web-applications-fy35.onrender.com/api/projects`;

  const { data, loading, error } = UseFetch(url);
  return {
    projects: data || [],
    loading,
    error,
    isAdmin: user?.role === "admin",
  };
}
