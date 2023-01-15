import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import "./AddAvisos.scss";
import Swal from "sweetalert2"; // hay que probarlo
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AddAvisos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

 
  const onSubmit = async (formData) => {
   
    
    try {
      const cobrado ='No Cobrado';
      formData = {...formData,cobrado}
      const result = await fetch(`${BASE_URL}/avisos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resultado = await fetch(`${BASE_URL}/clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await resultado.json();
      if(result.status === 200 && resultado.status === 200){
        Swal.fire({
          //title: "Success!",
          text: "Aviso introducido y cliente creado",
          icon: "success",
          confirmButtonText: "Ok",
        });        
      } else if(result.status === 200 && resultado.status === 401){
        Swal.fire({
          //title: "Success!",
          text: "Aviso introducido, cliente ya en el sistema",
          icon: "success",
          confirmButtonText: "Ok",
        });        
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container">
        <section className="sectionForm row">
          <div className="col-12 col-lg-12 my-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <img className="logoReservas1" src={logo} alt="logo"></img> */}
              <br />
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-6 my-2">
                  {/* <label className="form__label">Cliente * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="cliente"
                    placeholder="Cliente"
                    {...register("cliente",{
                      required: "Campo Obligatorio",
                    })}
                  />
                   {errors.cliente && errors.cliente.type === "required" && (
                <p className="error">{errors.cliente.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-6 mx-md-3 my-2">
                  {/* <label className="form__label">Dirección * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    {...register("direccion", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.direccion && errors.direccion.type === "required" && (
                <p className="error">{errors.direccion.message}</p>
              )}
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-4 my-2">
                  {/* <label className="form__label">Localidad * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="localidad"
                    placeholder="Localidad"
                    {...register("localidad", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.localidad && errors.localidad.type === "required" && (
                <p className="error">{errors.localidad.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-4 mx-md-3 my-2">
                  {/* <label className="form__label">Teléfono* </label> */}
                  <input
                    className="form-control"
                    type="tel"
                    //pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                    name="telefono"
                    placeholder="Teléfono"
                    {...register("telefono", {
                  required: "Campo Obligatotio",
                })}
              />
                </div>
                <div className="d-flex flex-column col-11 col-md-4 my-2">
                  {/* <label className="form__label">Tipo Caldera * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="caldera"
                    placeholder="Tipo de Caldera"
                    {...register("caldera", {
                  required: "Campo Obligatotio",
                })}
              />
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-lg-12 col-md-6 mx-md-1 my-2">
                  {/* <label className="form__label">Averia * </label> */}
                  <textarea
                    className="form-control"
                    type="text"
                    name="averia"
                    placeholder="Descripción averia"
                    {...register("averia", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.averia && errors.averia.type === "required" && (
                <p className="error">{errors.averia.message}</p>
              )}
                  
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-6 my-2">
                  {/* <label className="form__label">Prioridad * </label> */}
                  <select {...register("prioridad")} className="form-control">
                    <option value="Urgente">Urgente</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
                <div className="d-flex flex-column col-11 col-md-6 mx-md-3 my-2">
                  {/* <label className="form__label">Estado * </label> */}
                  <select {...register("estado")} className="form-control" >
                    <option value="Abierto" selected>Abierto</option>
                    
                  </select>
                  
                </div>
              </div>
              <Button
                variant="contained"
                //color="primary"
                type="submit"
                endIcon={<SendIcon />}
                style={{
                  borderRadius: 50,
                  backgroundColor: "primary",
                  color: "white",
                  marginTop:'30px'
                }}
              >
                Enviar
              </Button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddAvisos;
