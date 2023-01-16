
import React, { useEffect, useState} from 'react';
import { Badge } from "react-bootstrap";
// import {  Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../../assets/ApiRoutes";
import DataTable from "react-data-table-component";
// import Table from "../../../Components/Table/Table.jsx"

import { Container, Table, TableBody,  TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const MostrarIntervencion = () => {

    const [intervencion, setIntervencion] = useState();
    const [intervencionTabla, setIntervencionTabla] = useState([]);
    const { id } =useParams();
    

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/mostrar/intervencion/${id}`)
        .then(response => response.json())
        .then(data => setIntervencion(data))
    
    }, [id])
    console.log(intervencion,'intervencionnnnnnnnn')
    useEffect(() => {
      if (intervencion) {
        let tabla=[]
        intervencion.intervencion.map( (aviso, index ) => (
          tabla.push({
            estado:intervencion.estado,
            fecha_inicio: intervencion.fecha_inicio[index],
            fecha_fin:intervencion.fecha_fin[index] ,
            km: intervencion.km[index],
            intervencion: intervencion.intervencion[index],
            material: intervencion.materialIntervencion[index]?.descripcion,
            totalHoras: intervencion.totalHoras[index],
          })
        ))

        setIntervencionTabla(tabla);
      }
  
  }, [intervencion])
  
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
      name: "Fecha Inicio",
      selector: (row) => row.fecha_inicio,
      sortable: true,
    },
    {
      name: "Fecha Fin",
      selector: (row) => row.fecha_fin,
      sortable: true,
    },
    {
      name: "Intervención",
      selector: (row) => row.intervencion,
      sortable: true,
    },
    {
      name: "Total Horas",
      selector: (row) => row.totalHoras,
      sortable: true,
    },
    {
      name: "Km",
      sortable: true,
      selector: (row) => row.km,
    },
  ];
     //console.log(intervencion,'intervenciones');
  return (
    <DataTable
      customStyles={tableCustomStyles}
      columns={columns}
      data={intervencionTabla}
      //pagination
      dense
      responsive
      //conditionalRowStyles={conditionalRowStyles}
    />
  )
  }

export default MostrarIntervencion