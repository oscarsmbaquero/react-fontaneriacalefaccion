import { Badge } from "react-bootstrap";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "react-data-table-component";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";

const Almacen = ({ material }) => {
  const navigate = useNavigate();
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
  const changeUbicacion=(e,id)=>{
    const almacen='Furgo'
    Swal.fire({  
     title: 'Emilio!!!!Deseas reubicar a Furgo?',  
     showDenyButton: true,  showCancelButton: true,  
     confirmButtonText: `Enviar`,  
     denyButtonText: `Cancelar`,
   }).then((result) => {  
       /* Read more about isConfirmed, isDenied below */  
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
                     Swal.fire("Cambiado a Vehículo", res.message, "success");
                    
                 }
             }).catch((error) => console.error(error))
         
       } else if (result.isDenied) {    
           Swal.fire('Changes are not saved', '', 'info')  
        }
   });
   }
    

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
      selector: (row) => (
        <Badge bg="success" text="bold">
          {row.pvp}
        </Badge>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      // selector: (row) => row.localidad,
      cell: (row) => (
        //
        <>
          <Link onClick={(e) => changeUbicacion(e, row._id)}>
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
      //conditionalRowStyles={conditionalRowStyles}
    />
  );
};

export default Almacen;
