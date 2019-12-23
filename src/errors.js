const codes = {
    MISMATCH_SCHEME: 0x101
};

function errorMessageGen(key, txt) {
    return `${key}(${codes[key]}): ${txt}`;
}

function EMismatchScheme() {
    return new Error(errorMessageGen('MISMATCH_SCHEME'));
}
