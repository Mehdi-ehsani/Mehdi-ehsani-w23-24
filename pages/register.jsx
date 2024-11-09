import { useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';



import useRegisterReducer from "../store/reducers/useRegisterReducer";
import validateRegisterForm from "../utils/validateRegisterForm";
import { useRegister } from "../services/mutations";
import { getCookie } from "../utils/cookie";
import styles from "./Forms.module.css";
import logo from "../assets/image/logo.png";
import { useRouter } from "next/router";

const RegistrationPage = () => {
	const [formData, dispatchFormData] = useRegisterReducer();
	const { mutate } = useRegister();
	const router = useRouter();

	useEffect(() => {
		const token = getCookie("token");
		token && router.replace("/");
	}, [router]);

	const changeHandler = (event) => {
		const value = event.target.value;
		const name = event.target.name.toUpperCase();

		switch (name) {
			case "NAME":
				dispatchFormData({ type: "NAME", payload: value });
				break;
			case "PASSWORD":
				dispatchFormData({ type: "PASSWORD", payload: value });
				break;
			case "CONFIRM_PASSWORD":
				dispatchFormData({ type: "CONFIRM_PASSWORD", payload: value });
		}
	};

	const addUser = (event) => {
		event.preventDefault();
		if (validateRegisterForm(formData, dispatchFormData)) {
			mutate(
				{ username: formData.name, password: formData.password },
				{
					onSuccess: (data) => {
						console.log(data.data.message);
						router.replace("/login");
					},
					onError: (error) => console.log(error.response.data.message),
				}
			);
		}
	};
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				<Image className={styles.logo} src={logo} alt="logo" />
				<h1>فرم ثبت نام</h1>
				<input
					onChange={changeHandler}
					name="name"
					value={formData.name}
					type="text"
					placeholder="نام کاربری"
				/>
				<p className={styles.error}>{formData.errors.name}</p>
				<input
					onChange={changeHandler}
					name="password"
					value={formData.password}
					type="password"
					placeholder="رمز عبور"
				/>
				<p className={styles.error}>{formData.errors.password}</p>
				<input
					onChange={changeHandler}
					name="confirm_password"
					value={formData.confirmPassword}
					type="password"
					placeholder=" تکرار رمز عبور"
				/>
				<p className={styles.error}>{formData.errors.confirmPassword}</p>
				<button onClick={addUser} className={styles.submitBtn} type="submit">
					ثبت نام
				</button>
				<Link href="/login">حساب کاربری دارید؟</Link>
			</form>
		</div>
	);
};

export default RegistrationPage;
