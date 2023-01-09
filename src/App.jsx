import './App.scss';
import routes from "./Config/routes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer'
function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
