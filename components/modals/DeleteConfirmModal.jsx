import { useDeleteProduct } from "../../services/mutations";
import Image from 'next/image';

import closeImg from "../../assets/image/close.png";
import styles from "./DeleteConfirmModal.module.css"
import toast from "react-hot-toast";

const DeleteConfirmModal = ({ id, setIsDeleteModalShow }) => {
	const { mutate } = useDeleteProduct();

    const deleteHandler = () => {
		const data = { ids: [id] };
		mutate(
			{ data },
			{
				onSuccess: (data) => {
					toast.success("محصول با موفقیت حذف شد!");
					setIsDeleteModalShow(false)
				},
				onError: (error) => toast.error("مدت اعتبار توکن تمام شده - صفحه را مجدد بارگذاری کنید")
			}
		);
	};
	return (
		<div className={styles.container} onClick={() => setIsDeleteModalShow(false)}>
			<div className={styles.form} onClick={(e) => e.stopPropagation()}>
				<Image src={closeImg} alt="icon" />
				<h2>آیا از حذف این محصول مطمئنید؟</h2>
				<div className={styles.btnContainer}>
					<button className={styles.delete} onClick={deleteHandler}>حذف</button>
					<button className={styles.close} onClick={() => setIsDeleteModalShow(false)}>لغو</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteConfirmModal;
