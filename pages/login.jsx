import Link from "next/link";
import Image from 'next/image';
import { useEffect } from "react";

import useLoginReducer from "../store/reducers/useLoginReducer";
import validateLoginForm from "../utils/validateLoginForm";
import { setCookie } from "../utils/cookie";
import { useLogin } from "../services/mutations";
import logo from "../assets/image/logo.png";
import styles from "./Forms.module.css";
import { useRouter } from "next/router";
import { getCookie } from "../utils/cookie";


const LoginPage = () => {
	const [formData, dispatchFormData] = useLoginReducer();
	const { mutate } = useLogin();
	const router = useRouter();

	useEffect(() => {
		console.log("login")

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
		}
	};
	const loginUser = (event) => {
		event.preventDefault();
		if (validateLoginForm(formData, dispatchFormData)) {
			mutate(
				{ username: formData.name, password: formData.password },
				{
					onSuccess: (data) => {
						console.log(data.data);
						setCookie("token", data.data?.token);
						router.replace("/")
					},
					onError: (error) => console.log(error.response.data.message),
				}
			);
		}
	};
	return (
		<div className={styles.container}>
			<form className={styles.form}>
			<Image src={logo} alt="logo" className={styles.logo}/>
				<h1>فرم ورود</h1>
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
				<button onClick={loginUser} className={styles.submitBtn} type="submit">
					ورود
				</button>
				<Link href={"/register"} >ایجاد حساب کاربری!</Link>
			</form>
		</div>
	);
};

export default LoginPage;
