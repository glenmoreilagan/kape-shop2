import Link from "next/link";
import HomePage from "./home";
import themes from "@/configs/themes";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <>
      <NavBar />
    </>
  );
}
