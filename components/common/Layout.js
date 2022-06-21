import styles from '@/styles/Layout.module.css'
import {Modal, Pagination, Table} from "@/components";
import {useSelector, useDispatch} from 'react-redux';
export function Layout({children}) {
    const { loginUser } = useSelector((state) => state.login);
    return (
        <div className={styles.container}>
            <main className={styles.main}>{children}</main>
        </div>
    );
}