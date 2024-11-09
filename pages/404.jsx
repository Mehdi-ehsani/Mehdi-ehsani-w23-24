import Image from "next/image"
import Link from "next/link"

import styles from "./404.module.css"
import img from "../assets/image/notfound.png"

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Image src={img} alt="404 logo"/>
      <Link href="/">بازگشت به صفحه اصلی</Link>
    </div>
  )
}

export default NotFound