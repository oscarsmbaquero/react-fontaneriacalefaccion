import { Badge } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import ConstructionIcon from "@mui/icons-material/Construction";
import { BASE_URL } from "../../assets/ApiRoutes";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchAvisos = async () => {
      const res = await axios.get(`${BASE_URL}/clientes`);
      setClientes(res.data);
    };
    fetchAvisos();
  }, []);

  const conditionalRowStyles = [
    {
      when: (row) => row.prioridad === "Urgente",
      style: {
        backgroundColor: "rgb(212, 210, 0)",
        //backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: "black",
        text: "bold",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.prioridad === "Normal",
      style: {
        backgroundColor: "rgba(63, 195, 128, 0.9)",
        color: "black",
        text: "bold",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "white",
        //justifyContent: 'center',
        backgroundColor: "#1C82AD",
      },
    },
  };

  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.cliente,
      sortable: true,
    },
    {
      name: "Dirección",
      selector: (row) => row.direccion,
      sortable: true,
    },
    {
      name: "Localidad",
      selector: (row) => row.localidad,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.telefono,
      sortable: true,
    },
    {
      name: "Caldera",
      sortable: true,
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.caldera}
        </Badge>
      ),
    },
    {
      name: "Acciones",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          <a href={`tel:${row.telefono}`} className="mdbicon">
            <MDBIcon icon="phone" color="danger"/>
          </a>&nbsp;&nbsp;&nbsp;
          <a
            href={`https://wa.me/+34${row.telefono}?text=Buenos días`}
            class="whatsapp_float"
            target="_blank"
            rel="noopener noreferrer"
            className="mdbicon"
          >
            <MDBIcon color="success" fab icon="whatsapp" size="1x" />
          </a>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  return (
    <DataTable
      customStyles={tableCustomStyles}
      columns={columns}
      data={clientes}
      pagination
      dense
      responsive
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default Clientes;
