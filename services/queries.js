import { useQuery } from "@tanstack/react-query";
import api from "../configs/api";

const useProducts = (pageNumber , name) => {
	const queryFn = (data) => {
	 return	api.get(`products?page=${pageNumber}&limit=10&name=${name}`, data);
	};
	return useQuery({queryKey: ["products", pageNumber , name] , queryFn });
};
export {useProducts}