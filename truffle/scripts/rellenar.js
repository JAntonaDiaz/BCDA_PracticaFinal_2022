module.exports = async callback => {

    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        let asignatura = await Asignatura.deployed();

        // Asignar cuentas de usuario
        let owner = accounts[0];
        console.log("Cuenta del owner =", owner);

        let coordinador = accounts[1];
        console.log("Cuenta del owner =", coordinador);

        // accounts[2] reservado para otro coordinador

        let profesor = accounts[3];
        console.log("Cuenta del profesor =", profesor);

        // accounts[4] reservado para otro profesor

        let alumno1 = accounts[5];
        let alumno2 = accounts[6];
        console.log("Cuenta del alumno1 =", alumno1);
        console.log("Cuenta del alumno2 =", alumno2);

        console.log("Estableciendo la cuenta del coordinador...");
        await asignatura.setCoordinador(coordinador, {from: owner});

        console.log("Añadiendo un profesor...");
        await asignatura.addProfesor(profesor, "Aitor Encinas", {from: owner});


        console.log("Creando cuatro evaluaciones...");
        await asignatura.creaEvaluacion("Parcial 1", Date.now() + 60 * 24 * 3600000, 25, 3, {from: coordinador});
        await asignatura.creaEvaluacion("Parcial 2", Date.now() + 120 * 24 * 3600000, 30, 5, {from: coordinador});
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 50 * 24 * 3600000, 20, 4, {from: coordinador});
        await asignatura.creaEvaluacion("Práctica 2", Date.now() + 110 * 24 * 3600000, 25, 4, {from: coordinador});

        console.log("Matriculando a dos alumnos...");
        await asignatura.automatricula("Jose Antona", "11112222", "jose.antona@upm.es", {from: alumno1});
        await asignatura.automatricula("Alejandro Moreno", "11113333", "alejandro.moreno@upm.es", {from: alumno2});

        console.log("Añadiendo calificaciones...");
        await asignatura.califica(alumno1,  0, 2, 600, {from: profesor});
        await asignatura.califica(alumno1,  1, 2, 800, {from: profesor});
        await asignatura.califica(alumno1,  2, 2, 950, {from: profesor});
        await asignatura.califica(alumno1,  3, 2, 900, {from: profesor});
        await asignatura.califica(alumno2, 0, 1, 0, {from: profesor});
        await asignatura.califica(alumno2, 1, 1, 0, {from: profesor});
        await asignatura.califica(alumno2, 2, 2, 350, {from: profesor});
        await asignatura.califica(alumno2, 3, 2, 780, {from: profesor});

    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
