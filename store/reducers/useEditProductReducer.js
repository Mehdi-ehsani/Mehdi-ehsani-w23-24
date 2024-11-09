import { useReducer } from "react";
import { useProducts } from "../../services/queries";
const useEditProductReducer =  (id , data) => {
    // const {data} = useProducts()
	 const searchedProduct =  data?.data?.data?.find(
			(product) => product.id === id
		);
     
	
    const initialState = {
        name: searchedProduct?.name,
        price: searchedProduct?.price,
        quantity: searchedProduct?.quantity,
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
export default useEditProductReducer