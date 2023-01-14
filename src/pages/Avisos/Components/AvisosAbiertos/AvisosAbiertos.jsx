import { Badge } from 'react-bootstrap';
import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import ConstructionIcon from "@mui/icons-material/Construction";
import PersonIcon from '@mui/icons-material/Person';
import SplashScreen from "../../../../core/SplashScreen/SplashScreen";

const AvisosAbiertos = ({ averias }) => {
  const conditionalRowStyles = [
    // {
    //   when: (row) => row.prioridad === "Urgente",
    //   style: {
    //     backgroundColor: "rgb(212, 210, 0)",
    //     //backgroundColor: 'rgba(63, 195, 128, 0.9)',
    //     color: "black",
    //     text: "bold",
    //     "&:hover": {
    //       cursor: "pointer",
    //     },
    //   },
    // },
    // {
    //   when: (row) => row.prioridad === "Normal",
    //   style: {
    //     backgroundColor: "rgba(63, 195, 128, 0.9)",
    //     color: "black",
    //     text: "bold",
    //     "&:hover": {
    //       cursor: "pointer",
    //     },
    //   },
    // },
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
      name: "Cliente",
      selector: (row) => 
      
          row.cliente
       
      ,
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
    // {
    //   name: "Teléfono",
    //   selector: (row) => row.telefono,
    //   sortable: true,
    // },
    {
      name: "Caldera",
      sortable: true,
      selector: (row) => row.caldera,
    },
    {
      name: "Avería",
      sortable: true,
      selector: (row) => <Badge bg="primary">{row.averia}</Badge>
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
          <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="success">
              <SearchIcon />
            </IconButton>
          </Link>
          <Link to={`/clientes/`}>
            <IconButton aria-label="delete" color="success">
              <PersonIcon />
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
    <>
    {averias ? (
      <DataTable
        customStyles={tableCustomStyles}
        columns={columns}
        data={averias}
        pagination
        dense
        responsive
        conditionalRowStyles={conditionalRowStyles}
      />
    ):<SplashScreen/>}
      
    </>
  );
};

export default AvisosAbiertos;
