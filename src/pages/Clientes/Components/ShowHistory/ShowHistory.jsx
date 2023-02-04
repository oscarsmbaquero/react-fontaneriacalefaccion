import { Badge } from "react-bootstrap";
import "../../Clientes.scss";
import { Link, useParams } from "react-router-dom";
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


const ShowHistory = ({ clientes }) => {
  const [avisos, SetAvisos] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/avisos/history/${id}`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, [id]);
  console.log(avisos,37);
 
  
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
      selector: (row) => row.averia,
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: "TotalHoras",
      selector: (row) => row.totalHoras,
      sortable: true,
    },
    {
      name: "Intervención",
      selector: (row) => row.intervencion,
      sortable: true,
    },
    // {
    //   name: "A.Impagados",
    //   selector: (row) => row.numeroAvisosImpagadas,
    //   sortable: true,
    // },
    {
      name: "Material",
      sortable: true,
      selector: (row) => row.materialIntervencion.descripcion
    },
    // {
    //   name: "Acciones",
    //   // selector: (row) => row.localidad,
    //   cell: (row) => (
    //     //
    //     <>
    //       {/* <a href={`tel:${row.telefono}`} className="mdbicon"> */}
    //       <MDBIcon far icon="list-alt" color="primary" />
    //       {/* </a> */}
    //       &nbsp;&nbsp;&nbsp;
    //       <a href={`tel:${row.telefono}`} className="mdbicon">
    //         <MDBIcon icon="phone" color="danger" />
    //       </a>
    //       &nbsp;&nbsp;&nbsp;
    //       <a
    //         href={`https://wa.me/+34${row.telefono}?text=Buenos días`}
    //         class="whatsapp_float"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="mdbicon"
    //       >
    //         <MDBIcon color="success" fab icon="whatsapp" size="1x" />
    //       </a>
    //       &nbsp;&nbsp;&nbsp;
    //       <a href= {`mailto:${row.email}`} className="mdbicon">
    //       <MDBIcon icon="envelope" className="me-3" color="blue" />
    //       </a>
    //     </>
    //   ),
    //   ignoreRowClick: true,
    //   allowOverflow: true,
    //   button: true,
    // },
  ];
  return (
    <DataTable
      customStyles={tableCustomStyles}
      columns={columns}
      data={avisos}
      pagination
      dense
      responsive
      subHeader
      // persistTableHead
    />
  );
};

export default ShowHistory;
