import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../assets/ApiRoutes";
import { CompressOutlined } from "@mui/icons-material";

export default function useClient() {
  const [averias, setAverias] = useState([]);
  useEffect(() => {
    const fetchClientes = async () => {
      const res = await axios.get(`${BASE_URL}/avisos`);
      setAverias(res.data);
    };
    fetchClientes();
  }, []);
  console.log(averias)
  return averias;
}
