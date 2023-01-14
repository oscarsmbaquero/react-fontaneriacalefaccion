import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Intervencion.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
//import Loader from "../../../core/components/Loader/Loader";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
//import { useGetAuth } from "../../../context/context";
import Swal from "sweetalert2";
//import { SWContext } from "../../../../context/context";

const IntercencionAviso = () => {
  //const { material } = useContext(SWContext);
  const { id } = useParams();
  const [averias, SetAverias] = useState();
  const [visible, setVisible] = useState("Cerrada");
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFinal, setFechaFinal] = useState();
  const [tiempoViaje, setTiempoViaje] = useState();
  const [material, setMaterial] = useState([]);
  // useEffect(() => {    
  //   const fetchAvisos = async () => {
  //     const res = await axios.get(`${BASE_URL}/avisos${id}`);
  //     SetAverias(res.data);
  //   };
  //   fetchAvisos();
  // }, []);

  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await axios.get(`${BASE_URL}/material`);
      setMaterial(res.data);
    };
    fetchMaterial();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    //setValue,
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  //funcion que determina el estado de la intervencin, si esta Pendiente habilita el select de motivo de pendiente
  const captureType = (e) => {
    setVisible(e.target.value);
  };

  const fechaIni = (e) => {
    setFechaInicio(e.target.value);
  };
  const fechaFin = (e) => {
    setFechaFinal(e.target.value);
  };
  const horasViaje = (e) => {
    setTiempoViaje(e.target.value);
  };
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

  const materialOperativo = material.filter(
    (material) => material.estado === "Operativo"
  );

  const onSubmit = async (formData) => {
    formData = { ...formData, totalHoras };
    try {
      const result = await fetch(`${BASE_URL}/avisos/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      Swal.fire({
        //title: "Success!",
        text: "Intervención añadida Correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/avisos");
      //console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container justify-content-center">
        <section className="section">
          <div className="col-11 col-lg-11 mx-4">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-3">
                  <label className="form__label">Selecciona estado* </label>
                  <select
                    {...register("estado")}
                    className="form-control"
                    onChange={captureType}
                  >
                    <option value="Cerrada">Cerrada</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
                {visible === "Pendiente" ? (
                  <div className="d-flex flex-column col-11 col-md-9  mx-md-3">
                    <label className="form__label">
                      <span className="labelDist">Motivo de aviso pendiente*</span>
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
                  </div>
                ) : (
                  <div className="d-flex flex-column col-11 col-md-9  mx-md-3">
                    <label className="form__label">
                    <span className="labelDist">Importe de factura*</span>
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      name="importeReparacion"
                      placeholder="Introduce importe"
                      {...register("importeReparacion", {
                        required: "Campo Obligatotio",
                      })}
                    />
                    {errors.importeReparacion &&
                      errors.importeReparacion.type === "required" && (
                        <p className="error">
                          {errors.importeReparacion.message}
                        </p>
                      )}
                  </div>
                )}
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-12 mx-md-3">
                  <label className="form__label">Consumo Material *</label>
                  <select
                    name="jobs"
                    className="form-control"
                    {...register("materialIntervencion")}
                  >
                    <option
                      selected
                      value="638e32a42062209de55fd347"
                      class="bold-option"
                    >
                      No hay consumo
                    </option>
                    {materialOperativo.map((el) => (
                      <option key={el._id} value={el._id}>
                        {el.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-center">
                <div className="d-flex flex-column col-11 col-md-2 ">
                  <label className="form__label">Fecha Inicio*</label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    name="fecha_inicio"
                    placeholder="Inicio"
                    {...register("fecha_inicio")}
                    onChange={fechaIni}
                  />
                </div>
                <div className="d-flex flex-column col-11 col-md-2  mx-md-4">
                  <label className="form__label">Fecha Fin*</label>
                  <input
                    className="form-control"
                    type="datetime-local"
                    name="fecha_fin"
                    {...register("fecha_fin")}
                    onChange={fechaFin}
                  />
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
                  <label className="form__label">Despl.*</label>
                  <input
                    className="form-control"
                    type="float"
                    name="viaje"
                    placeholder="Tiempo Despl."
                    {...register("viaje", {
                      required: "Campo Obligatotio",
                    })}
                    onChange={horasViaje}
                  />
                  {errors.viaje && errors.viaje.type === "required" && (
                    <p className="error">{errors.viaje.message}</p>
                  )}
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row ">
                <div className="d-flex flex-column col-11 col-md-12 mx-md-auto">
                  <label className="form__label">Intervención *</label>
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
                  {errors.intervencion &&
                    errors.intervencion.type === "required" && (
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
