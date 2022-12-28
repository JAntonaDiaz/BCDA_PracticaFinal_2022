import { BrowserRouter, Routes, Route } from "react-router-dom";

import '../css/App.css';
import Loading from './Loading';
import Layout from './Layout';
import HomePage from './home/HomePage';
import EvaluacionesPage from "./evaluaciones/EvaluacionesPage";
import AlumnosPage from "./alumnos/AlumnosPage";
import AlumnoDetail from "./alumnos/AlumnoDetail";
import CalificacionesPage from "./calificaciones/CalificacionesPage";
import MisCosasPage from "./misCosas/MisCosasPage";
import NoMatch from './NoMatch';

function App() {
    return (
        <div className="App">
            <Loading>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="evaluaciones" element={<EvaluacionesPage/>}/>
                            <Route path="alumnos" element={<AlumnosPage/>}/>
                            <Route path="alumnos/:addr" element={<AlumnoDetail/>}/>
                            <Route path="calificaciones" element={<CalificacionesPage/>}/>
                            <Route path="miscosas" element={<MisCosasPage/>}/>
                            <Route path="*" element={<NoMatch/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Loading>
        </div>
    );
}

export default App;