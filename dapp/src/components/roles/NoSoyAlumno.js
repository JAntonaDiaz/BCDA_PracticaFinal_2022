import {drizzleReactHooks} from '@drizzle/react-plugin'

const {useDrizzle, useDrizzleState} = drizzleReactHooks;

const NoSoyAlumno = ({children}) => {

    const {useCacheCall} = useDrizzle();
    const drizzleState = useDrizzleState(state => state);

    const myAddr = drizzleState.accounts[0];

    let show = useCacheCall(['Asignatura'], call => {
        let show = false;
        const matriculasLength = call("Asignatura", "matriculasLength") || 0;
        for (let i = 0; i < matriculasLength; i++) {
            const alumno = call("Asignatura", "matriculas", i);
            if (alumno === myAddr){
                show = true;
            }
        }
        return show;
    });

    if (show) {
        return null;
    }

    return <>
            {children}
        </>
};

export default NoSoyAlumno;