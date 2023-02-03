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
  //console.log(clientes, 56);

  //FILTERS  BY CLIENT
  const filteredItems = clientes.filter(
    (item) =>
      item.cliente &&
      item.cliente.toLowerCase().includes(filterText.toLowerCase())
  );

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
          {/* <a href={`tel:${row.telefono}`} className="mdbicon"> */}
          <MDBIcon far icon="list-alt" color="primary" />
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
          <a href= {`mailto:${row.email}`} className="mdbicon">
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
