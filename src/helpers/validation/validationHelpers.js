import { defineRule } from "vee-validate";

const emailValidationParams = {
    regEx: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    regExValidationMessage: "This field must be a valid email",
};
const passwordValidationParams = {
    regEx: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    regExValidationMessage:
        "Password must be at least 8 characters long, contain at least one letter, one number and one special character",
};
const nameValidationParams = {
    regEx: /^\p{L}+$/u,
    regExValidationMessage: "This field must contain only letters",
};

function validateUserDataInputs(value, validateWithRegEx, regEx = null, regExValidationMessage = "") {
    if (!value) {
        return "This field is required";
    }

    if (validateWithRegEx) {
        if (!regEx.test(value)) {
            return regExValidationMessage;
        }
    }

    return true;
}

function validateLogbookEntryInputs(value, isICAO, isTime) {
    if (isICAO) {
        if (value.length !== 4) {
            return "ICAO codes must have 4 characters";
        }
    }
    if (isTime) {
        if (value === 0) {
            return "Logbook entries can't have time set to 0 hours";
        }
    }

    return true;
}

defineRule("required", value => {
    return validateUserDataInputs(value, false);
});

defineRule("email", value => {
    return validateUserDataInputs(value, true, emailValidationParams.regEx, emailValidationParams.regExValidationMessage);
});

defineRule("password", value => {
    return validateUserDataInputs(value, true, passwordValidationParams.regEx, passwordValidationParams.regExValidationMessage);
});

defineRule("name", value => {
    return validateUserDataInputs(value, true, nameValidationParams.regEx, nameValidationParams.regExValidationMessage);
});

defineRule("icao", value => {
    return validateLogbookEntryInputs(value, true, false);
});

defineRule("flightTime", value => {
    return validateLogbookEntryInputs(value, false, true);
});
