import { Badge } from 'react-bootstrap';
import React from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import ConstructionIcon from "@mui/icons-material/Construction";

const Almacen = ({ material }) => {
  
  // const conditionalRowStyles = [
  //   {
  //     when: row => row.estado === 'Averiado',
  //     style: {
  //       backgroundColor: 'rgb(212, 210, 0)',
  //       //backgroundColor: 'rgba(63, 195, 128, 0.9)',
  //       color: 'black',
  //       text:'bold',
  //       '&:hover': {
  //         cursor: 'pointer',
  //       },
  //     },
  //   },
  //   {
  //     when: row => row.estado === 'Operativo',
  //     style: {
  //       backgroundColor: 'rgba(63, 195, 128, 0.9)',
  //       color: 'black',
  //       text:'bold',
  //       '&:hover': {
  //         cursor: 'pointer',
  //       },
  //     },
  //   },  
  // ]

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
      name: "Descripcion",
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.descripcion}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
    },
    {
      name: "Tipo Material",
      selector: (row) => row.tipo,
      sortable: true,
    },
    {
      name: "Precio Compra",
      selector: (row) => row.pcompra,
      sortable: true,
    },
    {
      name: "PVP",
      selector: (row) =>
      <Badge bg="success" text="bold">
         {row.pvp}
      </Badge>,
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
      data={material}
      pagination
      dense
      responsive
      //conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default Almacen;
