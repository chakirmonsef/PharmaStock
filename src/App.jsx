import { BrowserRouter } from "react-router-dom";
import Sidebar from "./layout/sidebar";
import Header from "./layout/Header";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return(
    <BrowserRouter>
    <div className="app-layout">
        <Sidebar/>

        <div className="main-content"> 
          <Header/>
          <AppRoutes/>
        </div>
      


    </div>
    </BrowserRouter>
  )
}
export default App;