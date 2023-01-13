import { Badge } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import ConstructionIcon from "@mui/icons-material/Construction";
import { DeleteOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import CallSplitIcon from "@mui/icons-material/CallSplit";

const Averiado = ({ material }) => {
  const navigate = useNavigate();
  const deleteMaterial = (e, material) => {
    e.preventDefault();
    fetch(`${BASE_URL}/material/${material}`, {
      method: "DELETE",
      headers: {
        //'Content-Type': 'multipart/form-data',
        //Authorization: `Bearer ${userLogged.token}`
      },
    }).then((res) => {
      if (res.status === 200) {
        //console.log('Borrado');
        Swal.fire("Material eliminado", res.message, "success");
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
      name: "Descripcion",
      selector: (row) => (
        <Badge bg="primary" text="bold">
          {row.descripcion}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Tipo Material",
      selector: (row) => 
      <Badge bg="warning">{row.tipo}</Badge>
      ,
      sortable: true,
    },
    {
      name: "Precio Compra",
      selector: (row) => row.pcompra,
      sortable: true,
    },
    {
      name: "PVP",
      selector: (row) => row.pvp,
      sortable: true,
    },
    {
      name: "Acciones",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          {row.tipo === "Consumible" ? (
            <IconButton
              color="warning"
              onClick={(e) => deleteMaterial(e,row._id)}
            >
              <DeleteOutlined />
            </IconButton>
          ) : (
            <IconButton color="primary">
              <Link to={`/material/ubicar/${row._id}`}>
                <CallSplitIcon />
              </Link>
            </IconButton>
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
      data={material}
      pagination
      dense
      responsive
    />
  );
};

export default Averiado;
