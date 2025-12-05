import Image from "next/image";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import styles from "./qrCode.module.css";

const QrCode = ({ value, setQrCode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={() => setQrCode("")}
      className={styles.qrCodeContainer}>
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        onClick={(e) => e.stopPropagation()}
        className={styles.qrCode}>
        <div className={styles.header}>
          <Image
            onClick={() => setQrCode("")}
            width={16}
            height={16}
            src="/icons/zarbdar.svg"
            alt="close"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `https://ULinkk.liara.run/${value}`,
              );
              toast.success("Copied to clipboard");
            }}>
            Copy
          </button>
        </div>
        <QRCode
          size={250}
          className={styles.code}
          value={`https://hamrahlink.com/${value}`}
        />
      </motion.div>
    </motion.div>
  );
};

export default QrCode;
