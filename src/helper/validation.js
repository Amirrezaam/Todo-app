export const valueValidation = (value, type) => {
    switch (type) {
        case "email":
            if (value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                return true;
            }
            return false;
        case "name":
            if (value.length > 2 && value.length < 21) {
                return true;
            }
            return false;
        case "password":
            if (value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
                return true;
            }
            return false;
        default:
            return;
    }
}

export const confirmPasswordValidation = (value, password) => {
    if (value == password) {
        return true;
    }
    return false;
}