import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Intervencion.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { SWContext } from "../../../../context/context";
//import Loader from "../../../core/components/Loader/Loader";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
//import { useGetAuth } from "../../../context/context";
import Swal from "sweetalert2";

const IntercencionAviso = () => {
  //const userLogged = useGetAuth();

  const { material } = useContext(SWContext);

  const { id } = useParams();
  const [visible, setVisible] = useState("Cerrada");
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFinal, setFechaFinal] = useState();
  const [tiempoViaje, setTiempoViaje] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  // //funcion que determina el estado de la intervencin, si esta Pendiente habilita el select de motivo de pendiente
  const captureType = (e) => {
    setVisible(e.target.value);
  };

  const materialOperativo = material.filter(
    (element) => element.estado === "Operativo" && element.ubicacion === "Furgo"
  );

  const fechaIni = (e) => {
    setFechaInicio(e.target.value);
  };
  const fechaFin = (e) => {
    setFechaFinal(e.target.value);
  };
  const horasViaje = (e) => {
    setTiempoViaje(e.target.value);
  };
  console.log(tiempoViaje,'tiempoViaje');
  let fechaInicial = new Date(fechaInicio).getTime();
  let fechafinal = new Date(fechaFinal).getTime();
  const horasIntervencion = (
    (fechafinal - fechaInicial) /
    60 /
    60 /
    1000
  ).toFixed(2);

  const intervencion = parseFloat(horasIntervencion);
  const desplazamiento = parseFloat(tiempoViaje);

  const totalHoras = intervencion + desplazamiento;
 

  const onSubmit = async (formData) => {
    formData = { ...formData, totalHoras };
    console.log(formData, "formData");
    try {
      const result = await fetch(`${BASE_URL}/avisos/${id}`, {
        //modifico url 24/06/2022
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();

      Swal.fire({
        title: "Success!",
        text: "Intervención añadida",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/avisos/caceres");
    } catch (error) {}
  };

  return (
    <div>
     
        <div className="container">
          <section>
            <div className="col-11 col-lg-11 mx-4 mt-5">
            
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-md-3">
                    <label className="form__label">Selecciona estado* </label>
                    <select
                      className="form-control"
                    
                      {...register("estado", {
                        required: "Estado is required",
                      })}  onChange={captureType}
                    >
                      {errors.estado && errors.estado.type === "required" && (
                        <p>{errors.estado.message}</p>
                      )}
                      <option value="Cerrada">Cerrada</option>
                      <option value="Pendiente">Pendiente</option>
                    </select>
                  </div>
                  <div className="d-flex flex-column col-11 col-md-5  mx-md-3">
                    {visible === "Pendiente" ? (
                      <>
                        <label className="form__label">
                          Motivo de aviso pendiente*
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          name="motivo"
                          placeholder="Motivo"
                          {...register("motivo", {
                            required: "Campo Obligatotio",
                          })}
                        />
                        {errors.motivo && errors.motivo.type === "required" && (
                          <p className="error">{errors.motivo.message}</p>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="d-flex flex-column col-11 col-md-4">
                    <label className="form__label">Selecciona Material</label>
                    <select className="form-control" {...register("material", {
                        required: "Campo Obligatotio",
                      })}>
                       {errors.material && errors.material.type === "required" && (
                          <p className="error">{errors.material.message}</p>
                        )}
                      <option selected>No hay Consumo</option>
                      {materialOperativo.map((material) => (
                        <option key={material._id} value={material._id}>
                          {material.descripcion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row justify-content-center">
                  <div className="d-flex flex-column col-11 col-md-2 ">
                    <label className="form__label">Fecha Inicio *</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      name="fecha_inicio"
                      placeholder="Inicio"
                      onChange={fechaIni}
                      {...register("fecha_inicio", {
                            required: "Campo Obligatotio",
                          })}
                    />
                     {errors.fecha_inicio && errors.fecha_inicio.type === "required" && (
                          <p className="error">{errors.fecha_inicio.message}</p>
                        )}
                  </div>
                  <div className="d-flex flex-column col-11 col-md-2  mx-md-4">
                    <label className="form__label">Fecha Fin*</label>
                    <input
                      className="form-control"
                      type="datetime-local"
                      name="fecha_fin"
                      onChange={fechaFin}
                      {...register("fecha_fin", {
                            required: "Campo Obligatotio",
                          })}
                    />
                     {errors.fecha_fin && errors.fecha_fin.type === "required" && (
                          <p className="error">{errors.fecha_fin.message}</p>
                        )}
                  </div>
                  <div className="d-flex flex-column col-11 col-md-2 mx-md-3">
                    <label className="form__label">Km*</label>
                    <input
                      className="form-control"
                      type="number"
                      name="km"
                      placeholder="Km"
                      {...register("km", {
                        required: "Campo Obligatotio",
                      })}
                    />
                    {errors.km && errors.km.type === "required" && (
                      <p className="error">{errors.km.message}</p>
                    )}
                  </div>
                  <div className="d-flex flex-column col-11 col-md-3 mx-md-2">
                    <label className="form__label">T.Despl.*</label>
                    <input
                      className="form-control"
                      type="number"
                      name="viaje"
                      onChange={horasViaje}
                      placeholder="Tiempo Despl."
                      {...register("viaje", {
                        required: "Campo Obligatotio",
                      })}
                      
                    />
                    {errors.viaje && errors.viaje.type === "required" && (
                      <p className="error">{errors.viaje.message}</p>
                    )}
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row ">
                  <div className="d-flex flex-column col-11 col-md-12 mx-md-auto">
                    <label className="form__label">Intervención*</label>
                    <textarea
                      rows={5}
                      class="form-control"
                      type="text"
                      name="intervencion"
                      placeholder="Intervencion"
                      {...register("intervencion", {
                        required: "Campo Obligatotio",
                      })}
                    />
                     {errors.intervencion && errors.intervencion.type === "required" && (
                      <p className="error">{errors.intervencion.message}</p>
                    )}
                  </div>
                </div>
                <br />
                <Button
                  variant="contained"
                  disabled={!isValid}
                  //color="primary"
                  type="submit"
                  endIcon={<SendIcon />}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "blue",
                    color: "white",
                    // marginTop:'0px'
                  }}
                >
                  Enviar
                </Button>
              </form>
            </div>
          </section>
        </div>
  
    </div>
  );
};

export default IntercencionAviso;
