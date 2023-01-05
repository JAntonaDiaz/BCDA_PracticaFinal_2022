import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyAlumno from "../roles/SoyAlumno";
import SoyProfesor from "../roles/SoyProfesor";
import CalificacionesEval from "./CalificacionesEval";
import MisNotas from "./MisNotas";
import CalificacionesFinal from "./CalificacionesFinal";
import SoyOwnerCoordinadoroProfesor from "../roles/SoyOwnerCoordinadoroProfesor";

const CalificacionesPage = () => {

    // Aquí deberíamos añadir algo que seleccione el usuario y que le permita seleccionar si quiere ver todas las calificaciones, una evaluación, un alumno...
    return (
        <section className="AppCalificaciones">

            <h2>Calificaciones</h2>

            <SoyOwnerCoordinadoroProfesor>
                <CalificacionesTotal/>
            </SoyOwnerCoordinadoroProfesor>

            <SoyAlumno>
                <MisNotas/>
            </SoyAlumno>

            <Calificar/>

            <SoyCoordinador> 
                <CalificacionesEval/>  
            </SoyCoordinador>

            <SoyProfesor>
                <CalificacionesEval/> 
            </SoyProfesor>

            <SoyCoordinador> 
                <CalificacionesFinal/>
            </SoyCoordinador>
            <SoyProfesor> 
                <CalificacionesFinal/>
            </SoyProfesor>
        </section>
    );
};

export default CalificacionesPage;
