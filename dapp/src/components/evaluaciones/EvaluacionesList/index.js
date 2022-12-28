import EvaluacionesHead from "./EvaluacionesHead";
import EvaluacionesBody from "./EvaluacionesBody";


const EvaluacionesList = () => (
    <section className="AppEvaluaciones">
        <h3>Todas las Evaluaciones</h3>

        <table>
            <EvaluacionesHead/>
            <EvaluacionesBody/>
        </table>
    </section>
);

export default EvaluacionesList;
