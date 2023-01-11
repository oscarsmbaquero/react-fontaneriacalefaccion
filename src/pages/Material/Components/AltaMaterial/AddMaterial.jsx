import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import "./AddMaterial.scss";
import Swal from "sweetalert2"; // hay que probarlo
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AddMaterial = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  //Añado estado Operativo y unidades 1
  const estado ="Operativo"
  const unidades=1;
  
  const onSubmit = async (formData) => {
    formData={...formData,estado,unidades};
    console.log(formData,'formData');
    try {
      const result = await fetch(`${BASE_URL}/material`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const resData = await result.json();
      Swal.fire({
        title: "Success!",
        text: "Material Añadido Correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      navigate("/material");
      console.log(resData);
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
                <div className="d-flex flex-column col-11 col-md-7 my-2">
                  {/* <label className="form__label">Cliente * </label> */}
                  <input
                    className="form-control"
                    type="text"
                    name="descripcion"
                    placeholder="Descripcion"
                    {...register("descripcion",{
                      required: "Campo Obligatorio",
                    })}
                  />
                   {errors.descripcion && errors.descripcion.type === "required" && (
                <p className="error">{errors.descripcion.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-5 mx-md-3 my-2">
                  {/* <label className="form__label">Dirección * </label> */}
                  <select {...register("tipo",{
                      required: "Campo Obligatorio",
                    })} className="form-control"
                    >
                    {errors.descripcion && errors.descripcion.type === "required" && (
                <p className="error">{errors.descripcion.message}</p>
              )}
                  <option selected>Tipo de Material</option>
                    <option value="Reparable">Reparable</option>
                    <option value="Consumible">Consumible</option>
                  </select>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row">
                <div className="d-flex flex-column col-11 col-md-2 mx-md-4 my-2">
                  {/* <label className="form__label">Localidad * </label> */}
                  <input
                    className="form-control"
                    type="number"
                    step="any"
                    name="pcompra"
                    placeholder="Precio de Compra"
                    {...register("pcompra", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.pcompra && errors.pcompra.type === "required" && (
                <p className="error">{errors.pcompra.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-2 mx-md-4 my-2">
                  {/* <label className="form__label">Teléfono* </label> */}
                  <input
                    className="form-control"
                    type="number"
                    step="any"
                    //pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                    name="iva"
                    placeholder="I.V.A."
                    {...register("iva", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.iva && errors.iva.type === "required" && (
                <p className="error">{errors.iva.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-2 mx-md-4 my-2">
                  {/* <label className="form__label">Tipo Caldera * </label> */}
                  <input
                    className="form-control"
                    type="number"
                    step="any"
                    name="pvp"
                    placeholder="Precio Venta Público"
                    {...register("pvp", {
                  required: "Campo Obligatotio",
                })}
              />
              {errors.pvp && errors.pvp.type === "required" && (
                <p className="error">{errors.pvp.message}</p>
              )}
                </div>
                <div className="d-flex flex-column col-11 col-md-4 mx-md-4 my-2">
                <select {...register("ubicacion",{
                      required: "Campo Obligatorio",
                    })} className="form-control"
                    >
                    {errors.ubicacion && errors.ubicacion.type === "required" && (
                <p className="error">{errors.ubicacion.message}</p>
              )}
                  <option selected>Ubicación</option>
                    <option value="Furgo">Vehículo</option>
                    <option value="Almacen">Almacén</option>
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

export default AddMaterial;
