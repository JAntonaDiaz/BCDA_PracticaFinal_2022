import CalificacionesHead from "./CalificacionesHead";
import CalificacionesBody from "./CalificacionesBody";

const CalificacionesPage = () => {

    return (
        <section className="AppCalificaciones">
            <h3>Calificaciones finales</h3>
            <table>
                <CalificacionesHead />
                <CalificacionesBody />
            </table>
        </section>
    );
};

export default CalificacionesPage;
