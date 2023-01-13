import { Badge } from "react-bootstrap";
import "./AvisosCerrados.scss";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import Swal from "sweetalert2";


import { IconButton } from "@mui/material";
import DataTable from "react-data-table-component";
import EuroIcon from "@mui/icons-material/Euro";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const AvisosCerrados = ({ averias }) => {
  const navigate = useNavigate();

  const collectRepair = (e, id) => {
    console.log('Entro',id)
    e.preventDefault();
    fetch(`${BASE_URL}/avisos/collectRepair/${id}`, {
      method: "PUT",
      headers: {
        //'Content-Type': 'multipart/form-data',
        //Authorization: `Bearer ${userLogged.token}`
      },
    }).then((res) => {
      if (res.status === 200) {
        //console.log('Borrado');
        Swal.fire("Aviso Cobrado", res.message, "success");
        navigate("/");
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
      name: "Precio Intervención",
      selector: (row) =>
        // <>
        //   <span className="price">{row.importeReparacion}</span>&nbsp;
        //   <span>€</span>
        // </>
        row.intervencion.length > 1 ? (
          <Badge bg="primary" text="bold">
            <span className="price">{row.importeReparacion}</span>&nbsp;
            <span>€</span>
          </Badge>
        ) : (
          ""
        ),
      sortable: true,
    },
    {
      name: "Mat. Utilizado",
      sortable: true,
      selector: (row) => row.materialIntervencion[0]?.descripcion,
    },
    {
      name: "Acciones",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          <IconButton aria-label="delete" color="error">
            <PictureAsPdfIcon />
          </IconButton>
          <Link to={`/avisos/details/${row._id}`}>
            <IconButton aria-label="delete" color="info"  onClick={(e) => collectRepair(e,row._id)}>
              <EuroIcon />
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
      //conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default AvisosCerrados;