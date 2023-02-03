import React from "react";
import '../../Clientes.scss'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import Swal from "sweetalert2"; // hay que probarlo
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AddCliente = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  //Añado estado Operativo y unidades 1
  
  const onSubmit = async (formData) => {
    console.log(formData,'formData');
    try {
      const result = await fetch(`${BASE_URL}/clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();
      Swal.fire({
        text: "Cliente Añadido Correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/");
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
   <div className="form">
      <div className="container">
        <section className="sectionForm row">
          <div className="col-12 col-lg-11 mx-3">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <img className="logoReservas1" src={logo} alt="logo"></img> */}
              <br />
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-7 my-2">
                  {/* <label className="form__label">Cliente * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="nombre"
                    placeholder="Nombre Cliente"
                    {...register("nombre",{
                      required: "Campo Obligatorio",
                    })}
                  />
                   {errors.nombre && errors.nombre.type === "required" && (
                <p className="error">{errors.nombre.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-5 mx-md-3 my-2">
                  {/* <label className="form__label">Dirección * </label> */}
                  <select {...register("tipoCliente",{
                      required: "Campo Obligatorio",
                    })} className="form-control"
                    >
                    {errors.tipoCliente && errors.tipoCliente.type === "required" && (
                <p className="error">{errors.tipoCliente.message}</p>
              )}
                  <option selected>Tipo de Cliente</option>
                    <option value="Particular">Particular</option>
                    <option value="Empresa">Empresa</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-2 mx-md-3 my-2">
                  {/* <label className="form__label">Localidad * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    step="any"
                    name="dni"
                    placeholder="DNI o CIF"
                    {...register("dni", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.dni && errors.dni.type === "required" && (
                <p className="error">{errors.dni.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-3 mx-md-3 my-2">
                  {/* <label className="form__label">Teléfono* </label> */}
                  <input
                    className="form-control"
                    type="text"
                    step="any"
                    //pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                    name="telefono"
                    placeholder="Teléfono"
                    {...register("telefono", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.telefono && errors.telefono.type === "required" && (
                <p className="error">{errors.telefono.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-3 mx-md-3 my-2">
                  {/* <label className="form__label">Tipo Caldera * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    step="any"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <p className="error">{errors.email.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-3 mx-md-3 my-2">
                  {/* <label className="form__label">Tipo Caldera * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    step="any"
                    name="caldera"
                    placeholder="Caldera"
                    {...register("caldera", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.caldera && errors.caldera.type === "required" && (
                <p className="error">{errors.caldera.message}</p>
              )}
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-7 my-2">
                  {/* <label className="form__label">Cliente * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="direccion"
                    placeholder="Dirección"
                    {...register("direccion",{
                      required: "Campo Obligatorio",
                    })}
                  />
                   {errors.direccion && errors.direccion.type === "required" && (
                <p className="error">{errors.direccion.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-5 mx-md-3 my-2">
                  {/* <label className="form__label">Dirección * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="localidad"
                    placeholder="Localidad"
                    {...register("localidad",{
                      required: "Campo Obligatorio",
                    })}
                  />
                  {errors.localidad && errors.localidad.type === "required" && (
                <p className="error">{errors.localidad.message}</p>
              )}
                </div>
              </div>
              <Button
                variant="contained"
                disabled={!isValid}
                type="submit"
                endIcon={<SendIcon />}
                style={{
                  borderRadius: 50,
                  backgroundColor: "primary",
                  color: "white",
                  marginTop:'30px',
                }}
              >
                Enviar
              </Button>
            </form>
          </div>
        </section>
      </div>
   </div>
    </>
  );
};

export default AddCliente;
