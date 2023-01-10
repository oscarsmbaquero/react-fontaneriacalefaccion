import './App.scss';
import routes from "./Config/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SWContextProvider } from "./context/context";
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer';
function App() {
  return (
    <div className="App">
     <SWContextProvider>
      <Router>
        <Header/>
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
          </div>        
        <Footer/>
      </Router>
      </SWContextProvider>
    </div>
  );
}

export default App;
