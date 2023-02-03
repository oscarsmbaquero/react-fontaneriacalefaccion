import { Badge } from "react-bootstrap";
import "../../Clientes.scss";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import DataTable from "react-data-table-component";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import styled from "styled-components";
import { export_table_to_excel } from "../../Export-Excel/Export-excel";
import IconoDescarga from "../../../../assets/images/excell.png";
import { Link } from "react-router-dom";
//styles for input
const TextField = styled.input`
  height: 32px;
  width: 200px;
  //margin: 0 auto;
  border-radius: 8px;
  border: 2px solid #1c82ad;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;
//FILTERED COMPONENT
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Buscar Cliente"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <Button className="button" onClick={onClear}>
      🔎
    </Button>
  </>
);

const ShowClientes = ({ clientes }) => {
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
   console.log(clientes, 56);

  // const averiasImpagadas = clientes.map((aviso)=>aviso.cobrado ==='No Cobrado') ;
  // const numeroaveriasImpagadas = averiasImpagadas.length;
  // console.log(numeroaveriasImpagadas,50)

  //FILTERS  BY CLIENT
  let filteredItems = clientes.filter(
    (item) =>
      item.nombre &&
      item.nombre.toLowerCase().includes(filterText.toLowerCase())
  );
  // let numeroAvisosImpagadas = {
  //   impagados:numeroaveriasImpagadas
  // }
  // filteredItems = [...filteredItems,numeroAvisosImpagadas];
  console.log(filteredItems, 59);

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <>
        <img
          src={IconoDescarga}
          alt="icono nuevo aviso"
          className="icon"
          onClick={() =>
            export_table_to_excel(filteredItems, columns, "Clientes")
          }
        />
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
      </>
    );
  }, [filterText, resetPaginationToggle, filteredItems]);

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
      name: "Averia",
      selector: (row) => row.nombre,
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
      selector: (row) => row.caldera,
      sortable: true,
    },
    {
      name: "T. Cliente",
      sortable: true,
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.tipoCliente}
        </Badge>
      ),
    },
    {
      name: "Acciones",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          <Link to={`/getClientHistory/${row._id}`}>
            <MDBIcon far icon="list-alt" color="primary" />
          </Link>
          {/* <a href={`tel:${row.telefono}`} className="mdbicon"> */}
          {/* <MDBIcon far icon="list-alt" color="primary" /> */}
          {/* </a> */}
          &nbsp;&nbsp;&nbsp;
          <a href={`tel:${row.telefono}`} className="mdbicon">
            <MDBIcon icon="phone" color="danger" />
          </a>
          &nbsp;&nbsp;&nbsp;
          <a
            href={`https://wa.me/+34${row.telefono}?text=Buenos días`}
            class="whatsapp_float"
            target="_blank"
            rel="noopener noreferrer"
            className="mdbicon"
          >
            <MDBIcon color="success" fab icon="whatsapp" size="1x" />
          </a>
          &nbsp;&nbsp;&nbsp;
          <a href={`mailto:${row.email}`} className="mdbicon">
            <MDBIcon icon="envelope" className="me-3" color="blue" />
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
      data={filteredItems}
      pagination
      paginationResetDefaultPage={resetPaginationToggle}
      dense
      responsive
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      // persistTableHead
    />
  );
};

export default ShowClientes;
