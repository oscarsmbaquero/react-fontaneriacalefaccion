
import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from "../../../../assets/ApiRoutes";
import DataTable from "react-data-table-component";

const MostrarIntervencion = () => {

    const [intervencion, setIntervencion] = useState();
    const [intervencionTabla, setIntervencionTabla] = useState([]);
    const { id } =useParams();
    

    useEffect(() => {
        fetch(`${BASE_URL}/avisos/mostrar/intervencion/${id}`)
        .then(response => response.json())
        .then(data => setIntervencion(data))
    
    }, [id])
    console.log(intervencion,'intervencion')
    useEffect(() => {
      if (intervencion) {
        let tabla=[]
        intervencion.intervencion.map( (aviso, index ) => (
          tabla.push({
            estado:intervencion.estado,
            fecha_inicio: intervencion.fecha_inicio[index].replace('T','  '),
            fecha_fin:intervencion.fecha_fin[index].replace('T','  ') ,
            km: intervencion.km[index],
            intervencion: intervencion.intervencion[index],
            material: intervencion.materialIntervencion[index]?.descripcion,
            totalHoras: intervencion.totalHoras[index],
            
          })
          
        ))
          
        setIntervencionTabla(tabla);
      }
  
  }, [intervencion])
  console.log(intervencionTabla,'tabla')
  
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
    {
      name: "Consumo",
      sortable: true,
      selector: (row) => row.material ||'No hay consumo',
    },
  ];
     //console.log(intervencion,'intervenciones');
  return (
    <DataTable
      customStyles={tableCustomStyles}
      columns={columns}
      data={intervencionTabla}
      pagination
      dense
      responsive
      //conditionalRowStyles={conditionalRowStyles}
    />
  )
  }

export default MostrarIntervencion