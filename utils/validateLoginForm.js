const validateLoginForm = (formData , dispatchFormData) => {
    let isValid = true;
    if (!formData.name) {
        dispatchFormData({
            type: "SET_ERROR",
            field: "name",
            payload: "نام کاربری وارد کنید",
        });
        isValid = false;
    } else {
        dispatchFormData({ type: "SET_ERROR", field: "name", payload: "" });
    }

    
    if (!formData.password) {
        dispatchFormData({
            type: "SET_ERROR",
            field: "password",
            payload: "رمز را وارد کنید",
        });
        isValid = false;
    } else if (formData.password.length < 5) {
        dispatchFormData({
            type: "SET_ERROR",
            field: "password",
            payload: "رمز کوتاه است",
        });
        isValid = false;
    } else {
        dispatchFormData({ type: "SET_ERROR", field: "email", payload: "" });
    }
    return isValid;
}
export default validateLoginForm