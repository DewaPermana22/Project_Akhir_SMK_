import { Link } from "react-router";

const NotFound_404 = () => {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/30 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/2 -right-32 w-64 h-64 bg-gradient-to-bl from-blue-400/25 to-indigo-500/15 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-pink-400/15 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/4 left-1/3 w-2 h-2 bg-indigo-400/60 rounded-full blur-sm animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "2s" }}
        ></div>
        <div
          className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full blur-sm animate-bounce"
          style={{ animationDelay: "1.5s", animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/6 w-1.5 h-1.5 bg-blue-400/70 rounded-full blur-sm animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "3s" }}
        ></div>
      </div>
      <div
        style={{ minHeight: "calc(100vh - 100px)" }}
        className="relative z-10 flex flex-col justify-center items-center container mx-auto"
      >
        <object className="w-xs lg:w-md" data="/svg/404.svg" type=""></object>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl lg:text-4xl font-author-bold text-transparent bg-clip-text linear-purple">
            Oops!, Halaman Tidak Tersedia
          </h1>
          <p className="text-sm text-center lg:text-lg text-gray-600">
            Sepertinya halaman ini tidak tersedia. Coba kembali ke 
            <Link to="/" className="text-indigo-600 underline"> Halaman Utama</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound_404;
