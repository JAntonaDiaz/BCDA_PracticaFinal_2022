// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";

import "../contracts/Asignatura.sol";

contract TestAsignatura {

    Asignatura asignatura = Asignatura(payable(DeployedAddresses.Asignatura()));

    // Comprobar que no hay evaluaciones 
    function testNoHayEvaluaciones() public {

        uint n = asignatura.evaluacionesLength();

        uint expected = 0;

        Assert.equal(n, expected, "El contador deberia tener 0 evaluaciones inicialmente.");
    }
}
