import { useEffect, useState } from "react";
import { getCookie } from "../utils/cookie";
import Image from "next/image"

import { useProducts } from "../services/queries";

import settingImg from "../assets/image/setting.png";
import styles from "./products.module.css";
import Product from "../components/Product";
import AddProductModal from "../components/modals/AddProductModal";
import { useMultiDeleteProduct } from "../services/mutations";
import PaginationButtons from "../components/PaginationButtons";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner/Spinner";

const ProductsPage = () => {
	const [isAddModalShow, setIsAddModalShow] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [selectedIds, setSelectedIds] = useState([]);
	const [showCheckBox, setShowCheckBox] = useState(false);
	const [searchedValue , setSearchedValue] = useState("")

	const {mutate} = useMultiDeleteProduct()




	const { data, isPending, isError, error } = useProducts(pageNumber, searchedValue);

	const handleCheckboxChange = (id) => {
		setSelectedIds((prevSelectedIds) => {
			if (prevSelectedIds.includes(id)) {
				return prevSelectedIds.filter((selectedId) => selectedId !== id);
			} else {
				return [...prevSelectedIds, id];
			}
		});
	};
	const multiDeleteHandler =() => {
		if(showCheckBox) {
			const data = { ids: [...selectedIds] };
			if(selectedIds.length) {
				mutate(
					{ data },
					{
						onSuccess: () => setSelectedIds([]),
						onError: (error) => console.log(error),
					}
				);
			}
			setShowCheckBox(false)
		}else {
			setShowCheckBox(true);
		}
		
	}
	return (
		<div className={styles.container}>
			<Navbar searchedValue={searchedValue} setSearchedValue={setSearchedValue} />
			<div className={styles.btn}>
				<div>
					<Image src={settingImg} alt="icon"/>
					<h1>مدیریت کالا</h1>
				</div>
				<div className={styles.bContainer}>
					<button onClick={() => setIsAddModalShow(true)}>افزودن محصول</button>
					<button onClick={multiDeleteHandler} className={styles.selectBtn}>{showCheckBox ? "حذف گروهی" : "انتخاب گروهی"}</button>
				</div>
			</div>
			<div className={styles.products}>
				<div className={styles.header}>
					<p>نام کالا</p>
					<p>موجودی</p>
					<p>قیمت</p>
					<p>شناسه کالا</p>
				</div>
				<div>
					{isPending && <Spinner/>}
					{!isPending &&
						data?.data?.data?.map((product) => (
							<Product
								showCheckBox={showCheckBox}
								handleCheckboxChange={handleCheckboxChange}
								isSelected={selectedIds.includes(product.id)}
								data={data}
								key={product.id}
								product={product}
							/>
						))}
					{isError && <h1>{error}</h1>}
				</div>
			</div>
			{isAddModalShow && (
				<AddProductModal setIsAddModalOpen={setIsAddModalShow} />
			)}
			<PaginationButtons pageNumber={pageNumber} setPageNumber={setPageNumber} data={data} />
		</div>
	);
};

export default ProductsPage;