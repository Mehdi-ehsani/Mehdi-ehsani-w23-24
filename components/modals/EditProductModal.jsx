
import styles from "./addAndEditModals.module.css";

import { useEditProduct } from "../../services/mutations";
import useEditProductReducer from "../../store/reducers/useEditProductReducer";

const EditProductModal = ({ setIsEditModalShow , id  ,data}) => {
	const [formData, dispatchFormData] = useEditProductReducer(id , data);

    const {mutate} = useEditProduct(id)

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
    const addEditedProduct = () => {
	  if(formData.name || formData.price) {
		  mutate({ name: formData.name, price: formData.price, quantity: formData.quantity},{
			onSuccess: (data) => {
				console.log(data.data);
				
				setIsEditModalShow(false)
			},
			onError: (error) => console.log(error.response.data.message),
		})
	  }	
    }
	return (
		<div className={styles.container} onClick={() => setIsEditModalShow(false)}>
			<form
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
				className={styles.form}
			>
				<h1>ویرایش اطلاعات </h1>
				<label htmlFor="">نام کالا</label>
				<input onChange={changeHandler} name="name" value={formData.name} placeholder="نام کالا" type="text" />
				<label htmlFor="">تعداد موجودی</label>
				<input onChange={changeHandler} name="quantity" value={formData.quantity} placeholder="تعداد " type="number" />
				<label htmlFor="">قیمت</label>
				<input onChange={changeHandler} name="price" value={formData.price} placeholder="قیمت" type="number" />
				<div className={styles.btnContainer}>
					<button onClick={addEditedProduct} className={styles.addBtn}>ثبت اطلاعات جدید</button>
					<button className={styles.cancelB}onClick={() => setIsEditModalShow(false)}>انصراف</button>
				</div>
			</form>
		</div>
	);
};

export default EditProductModal;
