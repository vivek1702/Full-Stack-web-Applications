import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import useFetch from "./useFetch";
import { useMemo } from "react";

export default function UseTeams(filters = {}, refreshTeams) {
  const { user } = useContext(AuthContext);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value !== [] && value !== undefined) {
        params.append(key, value);
      }
    });

    return params.toString();
  }, [filters, refreshTeams]);

  const url = queryString
    ? `http://localhost:3000/api/teams?${queryString}`
    : `http://localhost:3000/api/teams`;

  const { data, loading, error } = useFetch(url);
  return {
    teams: data || [],
    loading,
    error,
    isAdmin: user?.role === "admin",
  };
}
