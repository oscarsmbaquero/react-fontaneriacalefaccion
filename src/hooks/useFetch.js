import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function useClient(endpoint) {
  const [material, setMaterial] = useState([]);
  useEffect(() => {
    const fetchClientes = async () => {
      const res = await axios.get(endpoint);
      setMaterial(res.data);
    };
    fetchClientes();
  }, [endpoint]);
  return {material, setMaterial}
}
