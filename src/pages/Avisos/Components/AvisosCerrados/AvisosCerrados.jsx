import { Badge } from "react-bootstrap";
import "./AvisosCerrados.scss";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import Swal from "sweetalert2";

import { IconButton } from "@mui/material";
import DataTable from "react-data-table-component";
import EuroIcon from "@mui/icons-material/Euro";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import confetti from 'canvas-confetti';
//import MyDocument from "../Pdf/MyDocument";

const AvisosCerrados = ({ averias }) => {
  const navigate = useNavigate();

  const collectRepair = (e, id) => {
    e.preventDefault();
    Swal.fire({
      title: "Vas a situar aviso en Cobrados",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        confetti();
        fetch(`${BASE_URL}/avisos/collectRepair/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            //Authorization: `Bearer ${userLogged.token}`
          },
        })
          .then((res) => {
            if (res.status === 200) {
              //console.log('Borrado');
              Swal.fire("Aviso Cobrado", res.message, "success");
            }
           
            navigate("/avisos");
          })
          .catch((error) => console.error(error));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

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
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.cliente.nombre}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Dirección",
      selector: (row) => row.cliente.direccion,
      sortable: true,
    },
    {
      name: "Localidad",
      selector: (row) => row.cliente.localidad,
      sortable: true,
    },
    {
      name: "Teléfono",
      selector: (row) => row.cliente.telefono,
      sortable: true,
    },
    {
      name: "Caldera",
      sortable: true,
      selector: (row) => row.cliente.caldera,
    },
    {
      name: "Avería",
      sortable: true,
      selector: (row) => row.averia,
    },
    {
      name: "Precio Intervención",
      selector: (row) => (
        <Badge bg="success">
          <span>{row.importeReparacion}</span>&nbsp;<span>€</span>
        </Badge>
      ),

      sortable: true,
    },
    {
      name: "Mat. Utilizado",
      sortable: true,
      selector: (row) =>
        row.materialIntervencion[0]?.descripcion || "No hay consumo",
    },
    {
      name: "Estado Factura",
      sortable: true,
      selector: (row) =>
        row.cobrado === "Cobrado" ? (
          <Badge>{row.cobrado}</Badge>
        ) : (
          <Badge bg="danger">{row.cobrado}</Badge>
        ),
    },
    {
      name: "Acciones",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          <Link to={`/avisos/mostrar/intervencion/${row._id}`}>
            <IconButton aria-label="delete" color="error">
              <ExpandCircleDownIcon />
            </IconButton>
          </Link>
          {row.cobrado === "No Cobrado" ? (
            <Link>
              <IconButton
                aria-label="delete"
                color="info"
                onClick={(e) => collectRepair(e, row._id)}
              >
                <EuroIcon />
              </IconButton>
            </Link>
          ) : (
            <Link>
              <IconButton aria-label="delete">
                <EuroIcon />
              </IconButton>
            </Link>
          )}
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
      //conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default AvisosCerrados;
