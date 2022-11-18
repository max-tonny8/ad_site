import React from "react";

const Footer = () => {
  return (
    <footer className="py-[50px] px-[30px] flex items-center justify-center flex-col gap-5">
      <h2 className="font-semibold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-800 ">
        Designed and Developed by Aakrut
      </h2>
      <div className="flex flex-row items-center justify-center gap-5 md:flex-col">
        <p className="foot-main">Copyright &copy; 2022 Blazo</p>
        <p className="foot-terms">Terms</p>
        <p className="foot-privacy">Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
