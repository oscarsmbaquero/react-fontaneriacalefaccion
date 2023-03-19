import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Intervencion.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Swal from "sweetalert2";
import { MultiSelect } from "react-multi-select-component";
const IntercencionAviso = () => {
  const { id, cliente } = useParams();
  //const [averias, SetAverias] = useState();
  const [visible, setVisible] = useState("Cerrada");
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFinal, setFechaFinal] = useState();
  const [tiempoViaje, setTiempoViaje] = useState();
  const [material, setMaterial] = useState([]);
  const [selectPrice, setSelectPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [image, setImage] = useState("");
  const [clientes, setClientes] = useState({});
  const [selected, setSelected] = useState([]);

  //console.log(id,27)

  useEffect(() => {
    const fetchMaterial = async () => {
      const res = await axios.get(`${BASE_URL}/material`);
      setMaterial(res.data);
    };
    fetchMaterial();
  }, []);

  useEffect(() => {
    const fetchClienteByID = async () => {
      const res = await axios.get(`${BASE_URL}/clientes/ById/${cliente}`);
      setClientes(res.data);
    };
    fetchClienteByID();
  }, []);
  const clienteInte = clientes._id;

  /**
   * Función que consulta precio de pieza seleccionada y suma todas piezas
   * @param {} selectedOptions 
   */
  const consultPrice = (selectedOptions) => {
    const idSelected = selectedOptions[selectedOptions.length - 1].value;
    fetch(`${BASE_URL}/material/consultarPrecio/${idSelected}`)
      .then((response) => response.json())
      .then((data) => {
        let ppieza = data.pvp;
        setSelectPrice(ppieza);
        setTotalPrice(totalPrice + ppieza);
      });
  };
  const handleImageChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  /**
   * Funcion que determina el estado de la intervencin, 
   * si esta Pendiente habilita el select de motivo de pendiente
  */
  
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
  // calculo horas de intervención
  const horasIntervencion = (
    (fechafinal - fechaInicial) /
    60 /
    60 /
    1000
  ).toFixed(2);
  const intervencion = parseFloat(horasIntervencion);
  const desplazamiento = parseFloat(tiempoViaje);
  const totalHoras = intervencion + desplazamiento;
  /**
   * Filtro de material que mestra en el select(Operativo Y Vehículo)
   */
  const materialOperativo = material.filter(
    (material) =>
      material.estado === "Operativo" && material.ubicacion === "Furgo"
  );

  /**
   * Función envio del form -Recibimos los datos y añadimos los calculados
   * @param {*} formData 
   */
  const onSubmit = async (formData) => {
    //añadimos los campos calculados
    formData = { ...formData, totalHoras, image, clienteInte, selected };
    console.log(formData, 81);
    try {
      const result = await fetch(`${BASE_URL}/avisos/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(result);
      Swal.fire({
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
  /**
   * Mapeamos el material y lo trasnformo para pintarlo en el select multiple
   */
  const options = materialOperativo.map((material) => ({
    label: material.descripcion,
    value: material._id,
  }));
   /**
    * Función que recibe el elemento o elementos seleccionados
    * si viene vacio (pongo contador de precio total a 0 y 
    * añado vacio los elementos seleccionados
    * Si viene con elementos consulto precio de los selecciondos
    * @param {*} selectedItems 
    */
   const handleMultiSelectChange = (selectedItems) => {
    if (selectedItems.length === 0) {
      setTotalPrice(0);
      setSelected(selectedItems);
    } else {
      setSelected(selectedItems);
      consultPrice(selectedItems);
    }
  };  

  return (
    <div>
      <div className="container justify-content-center">
        <section className="section">
          <div className="col-12 col-lg-11 mx-3">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
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
                <div className="d-flex flex-column col-11 col-md-1 mx-md-3">
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
                <div className="d-flex flex-column col-11 col-md-1 mx-md-2">
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
              <div className="d-flex flex-column flex-md-row justify-content-center ">
                <div className="d-flex flex-column col-11 col-md-11 mx-md-2">
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
              <div className="d-flex flex-column flex-md-row justify-content-center">
                <div className="d-flex flex-column col-11 col-md-10 mx-md-5">
                  <label className="form__label">Consumo Material *</label>
                  {/* <select
                    name="jobs"
                    className="form-control"
                    {...register("materialIntervencion")}
                    onClick={(e) => collectRepair(e, row._id)}
                    onChange={consultPrice}
                    onChange={event => consultPrice(event.target.value)}
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
                  </select> */}
                  <MultiSelect
                    options={options}
                    value={selected}
                    onChange={handleMultiSelectChange}
                    labelledBy="Selecciona Material"
                  />
                  {totalPrice > 0 && (
                    <p className="error"> PVP:&nbsp;{totalPrice}&nbsp;€</p>
                  )}
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-center">
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
                  <div className="d-flex flex-column col-11 col-md-8 mx-md-3">
                    <label className="form__label">
                      <span className="labelDist">
                        Motivo de aviso pendiente*
                      </span>
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
                  <>
                    <div className="d-flex flex-column col-11 col-md-8 mx-md-3">
                      <label className="form__label">
                        <span className="labelDist">Importe de factura*</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        name="importeReparacion"
                        placeholder={`${totalPrice} + Intervencion`}
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
                  </>
                )}
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-center">
                <div className="d-flex flex-column col-5">
                  <label className="form__label"></label>
                  <input
                    type="file"
                    name="image"
                    className="input-camera"
                    onChange={handleImageChange}
                  />
                </div>
                {/* <div className="d-flex flex-column col-6">
                  <label className="form__label">
                    Captura Foto *
                  </label>
                  <input
                      type="file"
                      name="image"
                      accept="image/*"
                      capture="camera"
                      className="edit__input"
                      onChange={handleImageChange}
                    />
                </div> */}
              </div>
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
                  marginBottom: "30px",
                  marginTop: "30px",
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
