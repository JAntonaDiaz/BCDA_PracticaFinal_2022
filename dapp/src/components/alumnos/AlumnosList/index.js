
import AlumnosHead from "./AlumnosHead";
import AlumnosBody from "./AlumnosBody";


const AlumnosList = () => (
    <section className="AppAlumnos">
        <h3>Todos los Alumnos</h3>
        <table>
            <AlumnosHead/>
            <AlumnosBody/>
        </table>
    </section>
);

export default AlumnosList;