import styles from "./PaginationButtons.module.css"

const PaginationButtons = ({data ,pageNumber, setPageNumber}) => {
	const repetitions = Array.from({ length: data?.data?.totalPages });

    const pageNextHandler = () => {
		if (pageNumber !== data.data.totalPages) {
			setPageNumber((prev) => prev + 1);
		}
	};
	const pagePrevHandler = () => {
		if (pageNumber !== 1) {
			setPageNumber((prev) => prev - 1);
		}
	};
	const changePage = (number) => {
		setPageNumber(number);
	};

  return (
    <div className={styles.paginationContainer}>
				<button
					onClick={pagePrevHandler}
					name="prev"
					className={styles.prevBtn}
				>
					{"<"}
				</button>
				{repetitions.map((event, index) => (
					<button
						onClick={() => changePage(index + 1)}
						className={`${styles.pageNumberBtn} ${
							pageNumber === index + 1 && styles.active
						}`}
						key={index}
					>
						{index + 1}
					</button>
				))}
				<button
					onClick={pageNextHandler}
					name="next"
					className={styles.nextBtn}
				>
					{">"}
				</button>
			</div>
  )
}

export default PaginationButtons