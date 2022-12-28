import CalificacionesTotal from "./CalificacionesTotal";
import Calificar from "./Calificar";

const CalificacionesPage = () => {

    return (
        <section className="AppCalificaciones">
            <h2>Calificaciones</h2>

            <CalificacionesTotal/>

            <Calificar/>
        </section>
    );
};

export default CalificacionesPage;
