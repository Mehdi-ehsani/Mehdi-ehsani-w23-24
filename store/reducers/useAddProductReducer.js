import { useReducer } from "react";
const useAddProductReducer = () => {
    const initialState = {
        name: "",
        price: 0,
        quantity: 0,
        errors: {
          name: "",
          price: "",
          quantity: "",
        },
      };
    
      const reducer = (state, action) => {
        switch (action.type) {
          case "NAME":
            return { ...state, name: action.payload };
          case "PRICE":
            return { ...state, price: action.payload };
          case "QUANTITY":
            return { ...state, quantity: action.payload };
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
export default useAddProductReducer