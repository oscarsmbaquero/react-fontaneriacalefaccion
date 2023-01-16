import { Badge } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import ConstructionIcon from "@mui/icons-material/Construction";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

const AvisosPendintes = ({ averias }) => {

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "white",
        backgroundColor: "#1C82AD",
      },
    },
  };

  const columns = [
    {
      name: "Cliente",
      selector: (row) =>row.cliente,
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
      selector: (row) => row.caldera,
    },
    {
      name: "Avería",
      sortable: true,
      selector: (row) => row.averia,
    },
    {
      name: "Motivo",
      sortable: true,
      selector: (row) => <Badge>{row.motivo}</Badge>,
    },
    {
      name: "Prioridad",
      selector: (row) =>
        row.prioridad === "Urgente" ? (
          <Badge bg="danger">{row.prioridad}</Badge>
        ) : (
          <Badge bg="success">{row.prioridad}</Badge>
        ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        //
        <>
          <Link to={`/addIntervencion/${row._id}`}>
            <IconButton aria-label="delete" color="primary">
              <ConstructionIcon />
            </IconButton>
          </Link>
          <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="success">
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to={`/avisos/mostrar/intervencion/${row._id}`}>
          <IconButton aria-label="delete" color="error">
            <ExpandCircleDownIcon />
          </IconButton>
          </Link>
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
      data={averias}
      pagination
      dense
      responsive
    />
  );
};

export default AvisosPendintes;
