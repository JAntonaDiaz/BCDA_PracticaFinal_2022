import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";
import SoyCoordinador from "../roles/SoyCoordinador";
import SoyProfesor from "../roles/SoyProfesor";
import CalificacionesEval from "./CalificacionesEval";

const CalificacionesPage = () => {
    return (
        <section className="AppCalificaciones">

        //Aquí deberíamos añadir algo que seleccione el usuario y que le permita seleccionar si quiere ver todas las calificaciones, una evaluación, un alumno...

            <h2>Calificaciones</h2>

            <CalificacionesTotal/>

            <Calificar/>

            <SoyCoordinador> 
                <CalificacionesEval/>  
            </SoyCoordinador>
            <SoyProfesor>
                <CalificacionesEval/> 
            </SoyProfesor>
        </section>
    );
};

export default CalificacionesPage;
