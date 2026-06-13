import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Main from "./components/Main";
import { useSelector } from "react-redux";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const pendingState = useSelector((state: any) => state.sendEmail.pending);
  console.log("pending", pendingState);

  return (
    <>
      <LoadingOverlayWrapper
        active={pendingState}
        spinner
        text="Loading please wait..."
        styles={{
          overlay: (base) => ({
            ...base,
            background: "rgba(0,0,0,.4)",
          }),
        }}
      >
        <main className={styles.main}>
          <Main />
        </main>
      </LoadingOverlayWrapper>
    </>
  );
}
