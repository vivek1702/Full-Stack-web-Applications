import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import useFetch from "./useFetch";
import { useMemo } from "react";

export default function UseTasks(filters = {}) {
  const { user } = useContext(AuthContext);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([Key, value]) => {
      if (value !== undefined && value !== "" && value !== null) {
        params.append(Key, value);
      }
    });

    return params.toString();
  }, [filters]);

  const url = queryString
    ? `http://localhost:3000/api/task?${queryString}`
    : `http://localhost:3000/api/task`;

  const { data, loading, error } = useFetch(url);

  return {
    tasks: data || [], // always safe array
    loading,
    error,
    isAdmin: user?.role === "admin",
  };
}
