import { useMutation , useQueryClient} from "@tanstack/react-query";
import api from "../configs/api";

const useRegister = () => {
	const mutationFn = (data) => {
	 return	api.post("auth/register", data);
	};
	return useMutation({ mutationFn });
};
const useLogin = () => {
	const mutationFn = (data) => api.post("auth/login", data);
	return useMutation({ mutationFn });
};
const usePostProduct = () => {
	const queryClient = useQueryClient()
	
	const mutationFn = (data) => api.post("products", data);
	const onSuccess = async () => {
		queryClient.invalidateQueries({queryKey: ["products"]})
	  }
	return useMutation({ mutationFn , onSuccess });
}
const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	
	const mutationFn = (data) => api.delete("products", data);
	const onSuccess = async () => {
		queryClient.invalidateQueries({queryKey: ["products"]})
	  }
	return useMutation({ mutationFn , onSuccess });
}
const useEditProduct = (id) => {
	const queryClient = useQueryClient()
	
	const mutationFn = (data) => api.put(`products/${id}`, data);
	const onSuccess = async () => {
		queryClient.invalidateQueries({queryKey: ["products"]})
	  }
	return useMutation({ mutationFn , onSuccess });
}
const useMultiDeleteProduct = () => {
	const queryClient = useQueryClient()
	
	const mutationFn = (data) => api.delete("products", data);
	const onSuccess = async () => {
		queryClient.invalidateQueries({queryKey: ["products"]})
	  }
	return useMutation({ mutationFn , onSuccess });
}
export { useRegister, useLogin ,usePostProduct , useDeleteProduct , useEditProduct , useMultiDeleteProduct};
