import {
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Badge, Card, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../../../assets/ApiRoutes";
//import { useGetAuth } from "../../../context/context";
import Button from "@mui/material/Button"; // hay que probarlo
import SplashScreen from "../../../../core/SplashScreen/SplashScreen";
import "./Detail.scss";
import { MDBIcon } from "mdb-react-ui-kit";
const DetailAvisos = () => {
  //const userLogged = useGetAuth();
  const { id } = useParams();
  //const navigate = useNavigate();
  const [avisos, SetAvisos] = useState();
  useEffect(() => {
    fetch(`${BASE_URL}/avisos/${id}`)
      .then((response) => response.json())
      .then((data) => SetAvisos(data));
  }, [id]);
  console.log(avisos,2777)
  return (
    <div>
      {!avisos ? (
        <SplashScreen />
      ) : (
        <>
          <Container>
            <Grid container spacing={5} sx={{ paddingTop: "50px" }}>
              <Grid item key={avisos._id} xs={12} md={12} lg={12}>
                <Card
                  elevation={5}
                  sx={{
                    borderRadius: "16px",
                    justifyContent: "center",
                    // alignItems:'center',
                    //flex: "1 0 auto",
                    //flexDirection: "row",
                    flexWrap: "wrap",
                    ":hover": {
                      boxShadow: 20, // theme.shadows[20]
                    },
                  }}
                >
                  <CardHeader
                    sx={{
                      //color: "white.main",
                      background: "azure",
                      // justifyContent: "flex-start",
                      // flexDirection: "row",
                    }}
                    title={avisos.cliente.nombre}
                    titleStyle={{textAlign: 'left'}}
                    subheader={
                      <Badge bg="danger">
                        <MDBIcon icon="phone" className="me-3" color="white" />
                        <a href={`tel:+34${avisos.cliente.telefono}`}>
                          &nbsp;
                          <span className="showIntervencion">
                            {avisos.cliente.telefono}
                          </span>
                        </a>
                      </Badge>
                    }
                  />
                  <CardContent sx={{ flex: "2 0 auto" }}>
                    <Typography
                      variant="body1"
                      color="error"
                      sx={{ fontSize: 26 }}
                    >
                      {avisos.prioridad === "Urgente" ? (
                        <Badge bg="warning">{avisos.prioridad}</Badge>
                      ) : (
                        <Badge bg="success">{avisos.prioridad}</Badge>
                      )}
                    </Typography>
                    <Typography variant="h4" component={"div"}>
                      {avisos.cliente.caldera}
                    </Typography>
                    <Typography sx={{ fontSize: 26 }} color="text.secondary">
                      {avisos.cliente.direccion}
                    </Typography>
                    <Typography variant="h6">
                      {
                        avisos.estado === "Abierto" ? ( //primera condicion
                          <Badge bg="success"> {avisos.estado}</Badge>
                        ) : avisos.estado === "Pendiente" ? ( //segunda condicion
                          <Badge bg="warning"> {avisos.estado}</Badge>
                        ) : (
                          <Badge bg="primary"> {avisos.estado}</Badge>
                        ) //si no cumple tercera condicion
                      }
                    </Typography>
                    <Typography variant="h6"></Typography>
                    <Typography variant="body1" color="text.secondary">
                      {avisos.averia}
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      justifyContent: "center",
                    }}
                  >
                    {avisos.intervencion.length > 0 && (
                      <Button variant="contained" color="success" size="small">
                        <Link 
                        // to={`avisos/mostrarIntervencion/${avisos._id}`}
                        >
                          <span className="showIntervencion">
                            Mostrar Intervenciónes
                          </span>
                        </Link>
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </div>
  );
};

export default DetailAvisos;
