import { Badge } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import ConstructionIcon from "@mui/icons-material/Construction";

const AvisosPendintes = ({ averias }) => {
  
  const conditionalRowStyles = [
    {
      when: row => row.prioridad === 'Urgente',
      style: {
        backgroundColor: 'rgb(212, 210, 0)',
        //backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'black',
        text:'bold',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    {
      when: row => row.prioridad === 'Normal',
      style: {
        backgroundColor: 'rgba(63, 195, 128, 0.9)',
        color: 'black',
        text:'bold',
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },  
  ]

  const tableCustomStyles = {
    headCells: {
      style: {
        color: "white",
        //justifyContent: 'center',
        backgroundColor: "black",
      },
    },
  };

  const columns = [
    {
      name: "Cliente",
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.cliente}
        </Badge>
      ),
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
      selector: (row) => row.motivo,
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
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          <Link to={`/addIntervencion/${row._id}`}>
            <IconButton aria-label="delete" color="primary">
              <ConstructionIcon />
            </IconButton>
          </Link>
          <Link>
            <IconButton aria-label="delete" color="success">
              <SearchIcon />
            </IconButton>
          </Link>
          ,
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
      conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default AvisosPendintes;
