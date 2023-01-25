import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../assets/ApiRoutes";

export default function useClient() {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    const fetchClientes = async () => {
      const res = await axios.get(`${BASE_URL}/material`);
      setMaterial(res.data);
    };
    fetchClientes();
  }, []);
  return {material, setMaterial}
}
