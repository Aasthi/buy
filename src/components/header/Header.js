import Link from "next/link";
import { list } from "../../components/constants/data";
import React, { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { Web3Auth } from "@web3auth/modal";
const Header = () => {
  const [open, setOpen] = useState(false);
  const [web3Auth, setWeb3Auth] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      //   if (typeof window !== "undefined") {
      const web3auth = new Web3Auth({
        clientId:
          "BPUis61aJ1Oy3ZK4MyiOX-OFuFL2OgfZZDLlnCNz1E6E2lz8olJLjpsyN7zY3SeYZo86CsjcTjPddzhuQBlDu40", // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: "eip155",
          chainId: "0x89", // Use 0x13881 for Mumbai Testnet
          rpcTarget: "https://polygon-rpc.com",
        },
      });
      await web3auth.initModal();
      setWeb3Auth(web3auth);
      //   }
    })();
  }, []);

  const login = async () => {
    if (web3Auth) {
      await web3Auth.connect();
      setLoggedIn(true);
    }
  };
  const logout = async () => {
    if (web3Auth) {
      await web3Auth.logout();
      setLoggedIn(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between px-4">
        <div className="py-5 lg:pt-10">
          <p className="text-2xl lg:text-4xl lg:ml-12 cursor-pointer text-[#DEBD6D] font-bold">
            A A S T H I
          </p>
        </div>
        <div className=" py-6 lg:pt-10">
          <button
            onClick={loggedIn ? logout : login}
            className="hidden w-50 lg:w-400 lg:flex text-white lg:mr-12 float-right border-[1px] rounded-lg py-2 px-4 border-[#575555]"
          >
            {loggedIn ? "Disconnect Your Wallet" : " Connect Your Wallet"}
          </button>
          <HiMenu
            onClick={() => setOpen(!open)}
            fontSize={24}
            className="text-[#DEBD6D] lg:hidden"
          />
        </div>
      </div>
      <div
        className={`fixed inset-y-0 left-0 w-64 overflow-y-auto ease-in-out transition-all duration-300 bg-white  z-[100] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div onClick={() => setOpen(!open)} className="absolute right-0 p-4">
          <RxCross1 fontSize={20} />
        </div>
        <div className="mt-16">
          {list?.map((item) => {
            return (
              <div className="flex flex-col  py-3 text-black rounded-md hover:bg-[#86b1f780]">
                <Link target="_blank" href={`${item?.route}`}>
                  {" "}
                  <div className="flex ml-12  text-black gap-x-3 cursor-pointer">
                    {" "}
                    <p>{item.icon}</p> <p>{item.title}</p>
                  </div>
                </Link>{" "}
              </div>
            );
          })}
          <button
            onClick={loggedIn ? logout : login}
            className="md:hidden  flex justify-center text-black w-[90%] mx-auto border-[1px] rounded-lg py-2 mt-4 px-4 border-[#575555]"
          >
            {loggedIn ? "Disconnect Your Wallet" : " Connect Your Wallet"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
