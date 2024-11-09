import { useState } from "react";
import Image from "next/image"

import styles from "./product.module.css";
import trashImg from "../assets/image/trash.png";
import editImg from "../assets/image/edit.png";
import EditProductModal from "./modals/EditProductModal";
import DeleteConfirmModal from "./modals/DeleteConfirmModal";
import formatNumber from "../helpers/formatNumber";
import shortenText from "../helpers/shortenText"

const Product = (props) => {
	const { product , data , isSelected , handleCheckboxChange , showCheckBox} = props
    const [isEditModalShow , setIsEditModalShow] = useState(false) 
    const [isDeleteModalShow , setIsDeleteModalShow] = useState(false) 

	return (
		<div className={styles.product} key={product.id}>
			<p>{product.name}</p>
			<p>{product.quantity}</p>
			<p>{formatNumber(product.price)} تومان</p>
			<div className={styles.btnContainer}>
				<span title={product.id}>{shortenText(product.id)}</span>
				<div>
					<Image onClick={() => setIsEditModalShow(true)} src={editImg}  alt="icon"/>
					<Image onClick={() => setIsDeleteModalShow(true)} src={trashImg}  alt="icon"/>
					{showCheckBox &&   <input  type="checkbox"  checked={isSelected} onChange={() => handleCheckboxChange(product.id)}/>}
				</div>
			</div>
			{isEditModalShow && <EditProductModal data={data} id={product.id} setIsEditModalShow={setIsEditModalShow}/>}
			{isDeleteModalShow && <DeleteConfirmModal id={product.id} setIsDeleteModalShow={setIsDeleteModalShow} />}
		</div>
	);
};

export default Product;
