import { useReducer } from "react";
const useRegisterReducer = () => {
    const initialState = {
        name: "",
        password: "",
        confirmPassword: "",
        errors: {
          name: "",
          password: "",
          confirmPassword: "",
        },
      };
    
      const reducer = (state, action) => {
        switch (action.type) {
          case "NAME":
            return { ...state, name: action.payload };
          case "PASSWORD":
            return { ...state, password: action.payload };
          case "CONFIRM_PASSWORD":
            return { ...state, confirmPassword: action.payload };
          case "SET_ERROR":
            return {
              ...state,
              errors: { ...state.errors, [action.field]: action.payload },
            };
          case "SUCCES":
            return initialState;
          default:
            return state;
        }
      };
      return useReducer(reducer, initialState);
}
export default useRegisterReducer