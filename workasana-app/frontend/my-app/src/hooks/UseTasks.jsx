import { useContext } from "react";
import { AuthContext } from "../context/AuthorizationContext";
import UseFetch from "./UseFetch";
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
    ? `https://full-stack-web-applications-fy35.onrender.com/api/task?${queryString}`
    : `https://full-stack-web-applications-fy35.onrender.com/api/task`;

  const { data, loading, error } = UseFetch(url);

  return {
    tasks: data || [], // always safe array
    loading,
    error,
    isAdmin: user?.role === "admin",
  };
}
