import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../assets/ApiRoutes";

export default function useClient() {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    const fetchClientes = async () => {
      const res = await axios.get(`${BASE_URL}/clientes`);
      setClientes(res.data);
    };
    fetchClientes();
  }, []);
  return clientes;
}
