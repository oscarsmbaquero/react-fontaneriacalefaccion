import { Badge } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { IconButton } from "@mui/material";
import DataTable from "react-data-table-component";
import { DeleteOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";
import CallSplitIcon from "@mui/icons-material/CallSplit";

const Averiado = ({ material }) => {
  const navigate = useNavigate();

  const deleteMaterial = (e, id) => {
    console.log(id, "id");
    // e.preventDefault();
    Swal.fire({
      title: "Vas a eliminar el material seleccionado",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/material/${id}`, {
          method: "DELETE",
          headers: {
            //'Content-Type': 'multipart/form-data',
            //Authorization: `Bearer ${userLogged.token}`
          },
          // body: JSON.stringify({
          //   id: id,
          // }),
        })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Material eliminado", res.message, "success");
            }
            navigate("/avisos");
          })
          .catch((error) => console.error(error));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  const repararMaterial = (e, id) => {
    // e.preventDefault();
    Swal.fire({
      title: "El material pasa a ser Reparado",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Enviar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch(`${BASE_URL}/material/reparar/${id}`, {
          method: "PUT",
          headers: {
            //'Content-Type': 'multipart/form-data',
            //Authorization: `Bearer ${userLogged.token}`
          },
          // body: JSON.stringify({
          //   id: id,
          // }),
        })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Material reparado", res.message, "success");
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
        row.tipo === "Consumible" ? (
          <Badge bg="success">{row.tipo}</Badge>
        ) : (
          <Badge bg="danger">{row.tipo}</Badge>
        ),
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
      cell: (row) => (
        //
        <>
          {row.tipo === "Consumible" ? (
            <IconButton
              color="warning"
              onClick={(e) => deleteMaterial(e, row._id)}
            >
              <DeleteOutlined />
            </IconButton>
          ) : (
            <IconButton
              color="primary"
              onClick={(e) => repararMaterial(e, row._id)}
            >
              <CallSplitIcon />
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
