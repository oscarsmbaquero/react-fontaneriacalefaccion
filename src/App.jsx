import "./App.scss";
import routes from "./Config/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/context";
//import { SWContextProvider } from "./context/context";
import Header from "./Components/Header/Header.jsx";
import Footer from "./Components/Footer/Footer";
import IconApp from "./core/IconApp/IconApp";
function App() {
  return (
    <div className="App">
      {/* <SWContextProvider> */}
      <AuthProvider>
        <Router>
          <Header />
          <div className="main">
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              ))}
            </Routes>
           <IconApp/> 
          </div>
          <Footer />
        </Router>
      </AuthProvider>
      {/* </SWContextProvider> */}
    </div>
  );
}

export default App;
