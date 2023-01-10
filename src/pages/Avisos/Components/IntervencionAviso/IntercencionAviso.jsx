import React, { useEffect, useState } from "react";
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

const IntercencionAviso = () => {
  //const userLogged = useGetAuth();
  //let [aviso, SetAviso] = useState();
  //const [users, setUsers] = useState([]);
  const { id } = useParams();
  //const [material, setMaterial] = useState([]);
  //const [materialById, setMaterialById] = useState([]);
  const [visible, setVisible] = useState("Cerrada");
  //const [fechaInicio, setFechaInicio] = useState();
  //const [fechaFinal, setFechaFinal] = useState();
  //const [tiempoViaje, setTiempoViaje] = useState();
  //const [items, setItems] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid }}= useForm({ mode: "onChange" });
  let navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`${BASE_URL}/avisos/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => SetAviso(data));
  // }, [id]);

  // useEffect(() => {
  //   fetch(`${BASE_URL}/users`)
  //     .then((response) => response.json())
  //     .then((data) => setUsers(data));
  // }, []);

  // useEffect(() => {
  //   fetch(`${BASE_URL}/items`)
  //     .then((response) => response.json())
  //     .then((data) => setItems(data));
  // }, []);
  // useEffect(() => {
  //   fetch(`${BASE_URL}/material`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Authorization: `Bearer ${loggedUser.token}`
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMaterial(data);
  //     });
  // }, [userLogged.token]);
  // useEffect(() => {
  //   fetch(`${BASE_URL}/material/${userLogged.id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       //Authorization: `Bearer ${loggedUser.token}`
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMaterialById(data);
  //     });
  // }, [userLogged.token]);

  // //funcion que determina el estado de la intervencin, si esta Pendiente habilita el select de motivo de pendiente
  // const captureType = (e) => {
  //   setVisible(e.target.value);
  // };

  // const fechaIni = (e) => {
  //   setFechaInicio(e.target.value);
  // };
  // const fechaFin = (e) => {
  //   setFechaFinal(e.target.value);
  // };
  // const horasViaje = (e) => {
  //   setTiempoViaje(e.target.value);
  // };
  // let fechaInicial = new Date(fechaInicio).getTime();
  // let fechafinal = new Date(fechaFinal).getTime();
  // const horasIntervencion = (
  //   (fechafinal - fechaInicial) /
  //   60 /
  //   60 /
  //   1000
  // ).toFixed(2);

  // const intervencion = parseFloat(horasIntervencion);
  // const desplazamiento = parseFloat(tiempoViaje);

  // const totalHoras = intervencion + desplazamiento;

  // const tecnicos = users.filter(
  //   (user) => user.account_type === "Tecnico" || user.account_type === "Admin"
  // );
  // const materialOperativo = materialById.filter(
  //   (material) => material.estado === "Operativo"
  // );

  const onSubmit = async (formData) => {
    formData = { ...formData };
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
              {/* <h3>Añadir Int:&nbsp;{aviso.n_incidencia}</h3> */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-md-3  ">
                    <label className="form__label">Selecciona estado * </label>
                    <select
                      className="form-control"
                    
                      {...register("estado", {
                        required: "Estado is required",
                      })}  
                      // onChange={captureType}
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
                          Motivo de aviso pendiente *
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
                    <label className="form__label">Selecciona item </label>
                    {/* <select className="form-control" {...register("item", {
                        required: "Campo Obligatotio",
                      })}>
                       {errors.item && errors.item.type === "required" && (
                          <p className="error">{errors.item.message}</p>
                        )}
                      <option selected>Selecciona Item</option>
                      {items.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.codigo}-{item.descripcion}
                        </option>
                      ))}
                    </select> */}
                  </div>
                </div>
                <Button
                  variant="contained"
                  disabled={!isValid}
                  //color="primary"
                  type="submit"
                  endIcon={<SendIcon />}
                  style={{
                    borderRadius: 50,
                    backgroundColor: "black",
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
