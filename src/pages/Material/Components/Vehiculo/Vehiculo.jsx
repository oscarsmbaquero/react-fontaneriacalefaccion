import { Badge } from 'react-bootstrap';
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";

const Vehiculo = ({ material }) => {
 const navigate = useNavigate();
  const tableCustomStyles = {
    headCells: {
      style: {
        color: "white",
        //justifyContent: 'center',
        backgroundColor: "#1C82AD",
      },
    },
  };
  const changeUbicacion=(e,id)=>{
    const almacen='Almacen'
    Swal.fire({  
     title: 'Emilio!!!!Deseas reubicar a Almacén?',  
     showDenyButton: true,  showCancelButton: true,  
     confirmButtonText: `Enviar`,  
     denyButtonText: `Cancelar`,
   }).then((result) => {  
       if (result.isConfirmed) {
        fetch(`${BASE_URL}/material/traspaso/`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
                  //Authorization: `Bearer ${userLogged.token}`
             },
             body: JSON.stringify({
                 
                 id: id,
                 almacen: almacen
             })
         })
             .then(res => {
                 if (res.status === 200) {
                     Swal.fire("Cambiado a Almacén", res.message, "success");
                 }navigate("/material");
             }).catch((error) => console.error(error))
       } else if (result.isDenied) {
           Swal.fire('Changes are not saved', '', 'info')
        }
   });
   }

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
        <>
          <Link  onClick={(e) => changeUbicacion(e, row._id)}>
            <IconButton aria-label="delete" color="primary">
              <SendIcon />
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
    />
  );
};

export default Vehiculo;
