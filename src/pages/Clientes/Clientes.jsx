// import { Badge } from "@mui/material";
// import React from "react";
// import { Link } from "react-router-dom";
// import { IconButton } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import DataTable from "react-data-table-component";
// import ConstructionIcon from "@mui/icons-material/Construction";

// const Clientes = () => {

  
  
//   const conditionalRowStyles = [
//     {
//       when: row => row.prioridad === 'Urgente',
//       style: {
//         backgroundColor: 'rgb(212, 210, 0)',
//         //backgroundColor: 'rgba(63, 195, 128, 0.9)',
//         color: 'black',
//         text:'bold',
//         '&:hover': {
//           cursor: 'pointer',
//         },
//       },
//     },
//     {
//       when: row => row.prioridad === 'Normal',
//       style: {
//         backgroundColor: 'rgba(63, 195, 128, 0.9)',
//         color: 'black',
//         text:'bold',
//         '&:hover': {
//           cursor: 'pointer',
//         },
//       },
//     },  
//   ]

//   const tableCustomStyles = {
//     headCells: {
//       style: {
//         color: "white",
//         //justifyContent: 'center',
//         backgroundColor: "black",
//       },
//     },
//   };

//   const columns = [
//     {
//       name: "Nombre",
//       selector: (row) => (
//         <Badge bg="primary" text="bold">
//           {row.nombre}
//         </Badge>
//       ),
//       sortable: true,
//     },
//     {
//       name: "Dirección",
//       selector: (row) => row.direccion,
//       sortable: true,
//     },
//     {
//       name: "Localidad",
//       selector: (row) => row.localidad,
//       sortable: true,
//     },
//     {
//       name: "Teléfono",
//       selector: (row) => row.telefono,
//       sortable: true,
//     },
//     {
//       name: "Caldera",
//       sortable: true,
//       selector: (row) => row.caldera,
//     },
//     {
//       name: "Acciones",
//       // selector: (row) => row.localidad,
//       cell: (row) => (
//         //
//         <>
//           <Link to={`/addIntervencion/${row._id}`}>
//             <IconButton aria-label="delete" color="primary">
//               <ConstructionIcon />
//             </IconButton>
//           </Link>
//           <Link to={`/avisos/details/${row._id}`}>
//             <IconButton aria-label="delete" color="success">
//               <SearchIcon />
//             </IconButton>
//           </Link>
//           ,
//         </>
//       ),
//       ignoreRowClick: true,
//       allowOverflow: true,
//       button: true,
//     },
//   ];
//   return (
//     <DataTable
//       customStyles={tableCustomStyles}
//       columns={columns}
//       data={}
//       pagination
//       dense
//       responsive
//       conditionalRowStyles={conditionalRowStyles}
//     />
//   );
// };

// export default Clientes;
