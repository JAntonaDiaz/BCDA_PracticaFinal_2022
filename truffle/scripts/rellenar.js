module.exports = async callback => {

    try {
        const Asignatura = artifacts.require("./Asignatura.sol");

        // Usar las cuentas de usuario
        const accounts = await web3.eth.getAccounts();
        if (accounts.length < 8) {
            throw new Error("No hay cuentas.");
        }

        let asignatura = await Asignatura.deployed();

        // Identificar al profesor:
        let profesor = await asignatura.profesor();
        console.log("Cuenta del profesor =", profesor);

        console.log("Crear cuatro evaluaciones:");
        await asignatura.creaEvaluacion("Parcial 1", Date.now() + 60 * 24 * 3600000, 25);
        await asignatura.creaEvaluacion("Parcial 2", Date.now() + 120 * 24 * 3600000, 30);
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 50 * 24 * 3600000, 20);
        await asignatura.creaEvaluacion("Práctica 1", Date.now() + 110 * 24 * 3600000, 25);

        console.log("Matricular a dos alumnos:");
        let evaAccount = accounts[1];
        let pepeAccount = accounts[2];
        console.log("Cuenta de Eva =", evaAccount);
        console.log("Cuenta de Pepe =", pepeAccount);
        await asignatura.automatricula("Eva Martinez", "em@dominio.es", {from: evaAccount});
        await asignatura.automatricula("Jose Redondo", "jr@stio.com", {from: pepeAccount});

        console.log("Añadir calificaciones:");
        await asignatura.califica(evaAccount,  0, 1, 0);
        await asignatura.califica(evaAccount,  1, 2, 400);
        await asignatura.califica(evaAccount,  2, 2, 750);
        await asignatura.califica(evaAccount,  3, 2, 900);
        await asignatura.califica(pepeAccount, 0, 0, 0);
        await asignatura.califica(pepeAccount, 1, 1, 0);
        await asignatura.califica(pepeAccount, 2, 2, 350);
        await asignatura.califica(pepeAccount, 3, 2, 650);
    } catch (err) {   // Capturar errores
        console.log(`Error: ${err}`);
    } finally {
        console.log("FIN");
    }

    callback();      // Terminar
};
