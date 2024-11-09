const validateRegisterForm = (formData , dispatchFormData) => {
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

    if (!formData.confirmPassword) {
        dispatchFormData({
            type: "SET_ERROR",
            field: "confirmPassword",
            payload: "رمز را تایید کنید",
        });
        isValid = false;
    }else if(formData.password !== formData.confirmPassword) {
  dispatchFormData({
            type: "SET_ERROR",
            field: "confirmPassword",
            payload: "رمز تایید نشد!",
        });
} else {
        dispatchFormData({ type: "SET_ERROR", field: "job", payload: "" });
    }

    return isValid;
}
export default validateRegisterForm