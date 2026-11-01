import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/pages/Dashboard";
import Stock from "../components/pages/Stock"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/medicines" element={<Stock/>}/>
        </Routes>
    )
}

export default AppRoutes;