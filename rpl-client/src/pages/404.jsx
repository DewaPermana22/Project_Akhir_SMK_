import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const NotFound_404 = () => {
  const [animationData, setAnimationData] = useState(null);
    useEffect(() => {
      fetch("/lottie/404.json")
        .then((res) => res.json())
        .then((data) => setAnimationData(data));
    }, []);
  return (
    <main className="bg-[var(--indigo-dark)] h-screen flex flex-col items-center justify-center space-y-5">
      <div className="flex justify-center max-w-sm">
        <Lottie animationData={animationData} loop={true} autoplay={true}/>
      </div>
       <h1 className="text-center text-[var(--lavender)] text-4xl font-author-bold">Oops, halaman tidak ditemukan!</h1>
    </main>
  )
}

export default NotFound_404