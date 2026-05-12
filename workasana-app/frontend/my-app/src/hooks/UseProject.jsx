import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import useFetch from "./useFetch";
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
    ? `http://localhost:3000/api/projects?${queryString}`
    : `http://localhost:3000/api/projects`;

  const { data, loading, error } = useFetch(url);
  return {
    projects: data || [],
    loading,
    error,
    isAdmin: user?.role === "admin",
  };
}
