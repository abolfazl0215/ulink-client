import Image from "next/image";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import styles from "./qrCode.module.css";

const QrCode = ({ value, setQrCode }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://ulinkk-back.onrender.com/${value}`,
    );
    toast.success("Link copied to clipboard!", {
      style: {
        background: '#059669',
        color: '#fff',
        fontWeight: '600',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#059669',
      },
    });
  };

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `ulink-qr-${value}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success("QR Code downloaded!", {
        style: {
          background: '#059669',
          color: '#fff',
          fontWeight: '600',
        },
      });
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => setQrCode("")}
      className={styles.qrCodeContainer}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        onClick={(e) => e.stopPropagation()}
        className={styles.qrCode}>
        
        {/* Header */}
        <div className={styles.header}>
          <button
            onClick={handleCopy}
            className={styles.copyButton}
            aria-label="Copy Link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
          <button
            onClick={() => setQrCode("")}
            className={styles.closeButton}
            aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* QR Code Container */}
        <div className={styles.qrWrapper}>
          <div className={styles.qrContainer}>
            <QRCode
              id="qr-code-svg"
              size={256}
              value={`https://hamrahlink.com/${value}`}
              level="H"
              className={styles.code}
              fgColor="#059669"
              bgColor="transparent"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QrCode;