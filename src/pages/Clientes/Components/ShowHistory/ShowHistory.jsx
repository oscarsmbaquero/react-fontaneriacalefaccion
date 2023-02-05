import { Badge } from "react-bootstrap";
import "../../Clientes.scss";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import DataTable from "react-data-table-component";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { MDBIcon } from "mdb-react-ui-kit";
import axios from "axios";
import styled from "styled-components";
import { export_table_to_excel } from "../../Export-Excel/Export-excel";
import IconoDescarga from "../../../../assets/images/excell.png";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
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
  const [table, setTable] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/avisos/history/${id}`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, [id]);
  console.log(avisos,37);
  useEffect(() => {
    if (avisos) {
      let tabla=[]
      avisos.map( (aviso, index ) => (
        tabla.push({
          averia:aviso.averia,
          //fecha_inicio: aviso.fecha_inicio[index].replace('T','  '),
          fecha_fin:aviso.createdAt.slice(0,10),
          id:aviso._id,
          //.replace('T','  ') ,
          estado:aviso.estado,
          //intervencion: aviso.intervencion[index].lenght(-1) ,
          //material: aviso.materialIntervencion[index]?.descripcion,
          totalHoras: aviso.totalHoras[index],
        })
      ))

      setTable(tabla);
    }

}, [avisos])
 
  
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
      name: "Fecha Aviso",
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
    },
    // {
    //   name: "Intervención",
    //   selector: (row) => row.intervencion,
    //   sortable: true,
    // },
    // {
    //   name: "A.Impagados",
    //   selector: (row) => row.numeroAvisosImpagadas,
    //   sortable: true,
    // },
    // {
    //   name: "Material",
    //   sortable: true,
    //   selector: (row) => row.materialIntervencion.descripcion
    // },
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
    {
      name: "Acciones",
      cell: (row) => (
        //
        <>
          
          <Link to={`/avisos/mostrar/intervencion/${row.id}`}>
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
      data={table}
      pagination
      dense
      responsive
      subHeader
      // persistTableHead
    />
  );
};

export default ShowHistory;
