import styles from "./addAndEditModals.module.css";
import useAddProductReducer from "../../store/reducers/useAddProductReducer";
import { usePostProduct } from "../../services/mutations";

const AddProductModal = ({ setIsAddModalOpen  }) => {
	const [formData, dispatchFormData] = useAddProductReducer();
    const {mutate} = usePostProduct()

	const changeHandler = (event) => {
		const value = event.target.value;
		const name = event.target.name.toUpperCase();

		switch (name) {
			case "NAME":
				dispatchFormData({ type: "NAME", payload: value });
				break;
			case "PRICE":
				dispatchFormData({ type: "PRICE", payload: value });
				break;
			case "QUANTITY":
				dispatchFormData({ type: "QUANTITY", payload: value });
		}
	};
    const addProduct = () => {
	  if(formData.name && formData.price) {
		  mutate({ name: formData.name, price: formData.price, quantity: formData.quantity},{
			onSuccess: (data) => {
				console.log(data.data);
				
				setIsAddModalOpen(false)
			},
			onError: (error) => console.log(error.response.data.message),
		})
	  }	else {
		dispatchFormData({ type: "SET_ERROR",field: "name", payload: "نام کالا را وارد کنید" })
		dispatchFormData({ type: "SET_ERROR",field: "price", payload: "مبلغ کالا را وارد کنید" })
	  }
    }
	return (
		<div className={styles.container} onClick={() => setIsAddModalOpen(false)}>
			<form
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
				className={styles.form}
			>
				<h1>ایجاد محصول جدید</h1>
				<label htmlFor="">نام کالا</label>
				<input onChange={changeHandler} name="name" value={formData.name} placeholder="نام کالا" type="text" />
				<p className={styles.error}>{formData.errors.name}</p>
				<label htmlFor="">تعداد موجودی</label>
				<input onChange={changeHandler} name="quantity" value={formData.quantity} placeholder="تعداد " type="number" />
				<label htmlFor="">قیمت</label>
				<input onChange={changeHandler} name="price" value={formData.price} placeholder="قیمت" type="number" />
				<p className={styles.error}>{formData.errors.price}</p>
				<div className={styles.btnContainer}>
					<button onClick={addProduct} className={styles.addBtn}>ایجاد</button>
					<button className={styles.cancelB}onClick={() => setIsAddModalOpen(false)}>انصراف</button>
				</div>
			</form>
		</div>
	);
};

export default AddProductModal;
