import styles from "./loading.module.css";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className={styles.centered}>
      <div className={styles.blob_1}></div>
      <div className={styles.blob_2}></div>
    </div>
  );
}
