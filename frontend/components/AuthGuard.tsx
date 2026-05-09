import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AuthGuard({ children }: any) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const user = localStorage.getItem("user_id");

    if (!user) {
      router.push("/login");
    }
  }, []);

  if (!isClient) return null;

  return children;
}