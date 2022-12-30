import ProfesorBody from "./ProfesorBody";
import ProfesoresHead from "./ProfesoresHead";

const ProfesoresList = () => (
    <section className="AppAlumnos">
        <h3>Todos los Profesores</h3>
        <table>
            <ProfesoresHead/>
            <ProfesorBody/>
        </table>
    </section>
);

export default ProfesoresList;