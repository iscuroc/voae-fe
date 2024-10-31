import { FC, PropsWithChildren } from "react";

import logo1 from "@/assets/logo.avif";
import logo2 from "@/assets/logo2.avif";

export const LoginBase: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-wrap flex-1 justify-center gap-5">
      <div className="flex items-center justify-center">
        <img
          src={logo1}
          alt="Logo 1"
          className="w-40 h-32 mr-7 md:mr-0 mt-5 md:mt-0 md:w-80 md:h-52"
        />

        <img src={logo2} alt="Logo 2" className="w-40 h-32 md:w-80 md:h-52" />
      </div>
      <div className="shadow-lg rounded-lg ">{children}</div>
    </div>
  );
};
