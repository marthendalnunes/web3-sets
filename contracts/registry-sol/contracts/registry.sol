//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract IdentifierRegistry {

    string[] public identifiers;

    constructor() {}

    /* ===================================================================================== */
    /* External Functions                                                                    */
    /* ===================================================================================== */

    function list() external view returns (string[] memory) {
        return identifiers;
    }

    function addDid(string memory did) external returns (bool) {
        identifiers.push(did);
        return true;
    }

}