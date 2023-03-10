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
import ProfesoresPage from "./profesores/ProfesoresPage";
import EvaluacionEdit from "./evaluaciones/EvaluacionEdit";
import CalificacionEdit from "./calificaciones/CalificacionEdit";

function App() {
    return (
        <div className="App">
            <Loading>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout/>}>
                            <Route index element={<HomePage/>}/>
                            <Route path="evaluaciones" element={<EvaluacionesPage/>}/>
                            <Route path="evaluaciones/:id" element={<EvaluacionEdit/>}/>
                            <Route path="profesores" element={<ProfesoresPage/>}/>
                            <Route path="alumnos" element={<AlumnosPage/>}/>
                            <Route path="alumnos/:addr" element={<AlumnoDetail/>}/>
                            <Route path="calificaciones" element={<CalificacionesPage/>}/>
                            <Route path="calificaciones/:ide/:idadress" element={<CalificacionEdit/>}/>
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