
const CalificacionesHead = () => {

    let thead = [];
    thead.push(<th key={"chn"}>Nombre Alumno</th>);
    thead.push(<th key={"chcal"}>Nota</th>)
    thead.push(<th key={"chedit"}>Editar</th>)
    return <thead><tr>{thead}</tr></thead>;
};

export default CalificacionesHead;
