import {NavLink} from "react-router-dom";

const Navegacion = () => {

    const f = ({isActive}) => isActive ? "navlinkactive" : "";

    return <nav>
        <ul>
            <li><NavLink className={f} to="/">Home</NavLink></li>
            <li><NavLink className={f} to="/evaluaciones/">Evaluaciones</NavLink></li>
            <li><NavLink className={f} to="/alumnos/">Alumnos</NavLink></li>
            <li><NavLink className={f} to="/calificaciones/">Calificaciones</NavLink></li>
            <li><NavLink className={f} to="/miscosas/">Mis Cosas</NavLink></li>
        </ul>
    </nav>
};

export default Navegacion;
