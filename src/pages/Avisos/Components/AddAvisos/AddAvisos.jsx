import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
import "./AddAvisos.scss";
import axios from "axios";
import Swal from "sweetalert2"; // hay que probarlo
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchInput from "../../../../core/SearchInput/SearchInput";

const AddAvisos = () => {
  const [clientes, setClientes] = useState([]);
  //const [keyword, setKeyword] = useState("");
  const [relatedData, setRelatedData] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  //console.log(selectedOption,18);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  let navigate = useNavigate();

  useEffect(() => {
    const fetchClientes = async () => {
      const res = await axios.get(`${BASE_URL}/clientes`);
      setClientes(res.data);
    };
    fetchClientes();
  }, []);
  console.log(clientes,36)
  useEffect(() => {
    const fetchClientesId = async () => {
      const res = await axios.get(`${BASE_URL}/clientes/ById/${selectedOption}`);
      setRelatedData(res.data);
    };
    fetchClientesId();
  }, [selectedOption]);

  console.log(relatedData._id,45)
  //console.log(relatedData,46)
  //Capturamos eel valor del input del buscador  y lo seteamos a keyword pasandolo a minusculas
  // const onInputChange = (e) => {
  //   setKeyword(e.target.value.toLowerCase());
  // };
  /*Con el valor introducido en el inpute del buscador filtramos los trabajos almacenaos en jobs,
    Filtramos por empresa o por puestos ofertados, previo paso a minusculas*/
  // const filteredClientes = clientes.filter((client) =>
  //   client.cliente.toLowerCase().includes(keyword)||
  //   client.dni.toLowerCase().includes(keyword)
  // );

  //console.log(filteredClientes);
  const onSubmit = async (formData) => {
    try {
      const cobrado = "No Cobrado";
      const estado = "Abierto";
      formData = { ...formData, cobrado, estado};
      console.log(formData, 633);
      const result = await fetch(`${BASE_URL}/avisos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // const resultado = await fetch(`${BASE_URL}/clientes`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      if (result.status === 200) {
        Swal.fire({
          //title: "Success!",
          text: "Aviso introducido",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } 
      // else if (result.status === 200 && resultado.status === 401) {
      //   Swal.fire({
      //     //title: "Success!",
      //     text: "Aviso introducido, cliente ya en el sistema",
      //     icon: "success",
      //     confirmButtonText: "Ok",
      //   });
      // }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <section className='searchContainer'>
        <SearchInput placeholder="Buscar Cliente" onChange={onInputChange} />
      </section> */}

      <div className="form">
        <div className="container">
          <section className="sectionForm row">
            <div className="col-12 col-lg-11 mx-3">
              <form onSubmit={handleSubmit(onSubmit)}>
                <br />
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-md-6 my-2">
                  <select
                    name="jobs"
                    className="form-control"
                    value={selectedOption}
                    {...register("cliente")}
                    onChange={(e) => setSelectedOption(e.target.value)}
                      
                  >
                    <option
                      // selected
                      // value="638e32a42062209de55fd347"
                      // class="bold-option"
                    >
                      {/* No hay consumo */}
                    </option>
                    {clientes.map((el) => (
                      <option key={el._id} value={el._id} >
                        {el.nombre}
                      </option>
                    ))}
                  </select>
                    {/* <label className="form__label">Cliente * </label> */}
                    {/* <input
                    className="form-control"
                    type="text"
                    name="cliente"
                    placeholder="Cliente"
                    {...register("cliente",{
                      required: "Campo Obligatorio",
                    })}
                  /> */}
                    {/* <select
                      value={selectedOption}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    >
                      <option value="option1">Opción 1</option>
                      <option value="option2">Opción 2</option>
                      <option value="option3">Opción 3</option>
                    </select> */}

                  </div>
                  <div className="d-flex flex-column col-11 col-md-6 mx-md-3 my-2">
                    <input
                      className="form-control"
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      value={relatedData.direccion}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-md-3 my-2 mx-3">
                    <input
                      className="form-control"
                      type="text"
                      name="localidad"
                      placeholder="Localidad"
                      value={relatedData.localidad}
                    />
                  </div>
                  <div className="d-flex flex-column col-11 col-md-4 mx-md-3 my-2">
                    <input
                      className="form-control"
                      type="tel"
                      name="telefono"
                      placeholder="Teléfono"
                      value={relatedData.telefono}
                    />
                  </div>
                  <div className="d-flex flex-column col-11 col-md-4 my-2 mx-md-3">
                    <input
                      className="form-control"
                      type="text"
                      name="caldera"
                      placeholder="Tipo de Caldera"
                      value={relatedData.caldera}
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row">
                  <div className="d-flex flex-column col-11 col-lg-12 col-md-6 mx-md-1 my-2">
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
                  <div className="d-flex flex-column col-11 col-lg-12 col-md-6 mx-md-1 my-2">
                    <select {...register("prioridad")} className="form-control">
                      <option value="Urgente">Urgente</option>
                      <option value="Normal">Normal</option>
                    </select>
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
    </>
  );
};

export default AddAvisos;
