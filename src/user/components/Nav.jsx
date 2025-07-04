import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";
import UserProfile from "../../Component/UserProfile";
import { IoClose } from "react-icons/io5";
import { fullLogo } from "../../public/ExporImage";

const navigation = [
  { name: "All Ideas", to: "/AllIdeas" },
  { name: "Featured Ideas", to: "/FeaturedIdeas" },
  { name: "Watch Meeting", to: "/watchMeeting" },
  { name: "My Ideas", to: "/MyIdeas" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Nav() {
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <Disclosure as="nav" className="bg-white border-b border-gray-300 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center">
                {/* <p className="text-2xl font-bold text-[#1E40AF]">
                  Startup Arena
                </p> */}
                <img src={fullLogo} alt="" className="h-35" />
              </div>

              <div className="hidden sm:flex space-x-6">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={isActive ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "underline text-[#1E40AF]"
                          : "text-gray-800 hover:underline hover:text-[#1E40AF]",
                        "rounded-md px-3 py-2 text-sm font-medium transition transform duration-300 ease-in-out hover:scale-103 "
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* USER BUTTON */}
              <div className="flex items-center">
                <Menu as="div" className="relative ml-3">
                  <MenuButton
                    onClick={() => setShowProfile(true)}
                    className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="flex items-center gap-3">
                      <Link>
                        <button
                          to={"/submitIdea"}
                          className="flex items-center bg-blue-800  text-white px-4 py-2  text-sm font-medium rounded-md hover:bg-blue-600"
                        >
                          <p> Add Idea +</p>
                        </button>
                      </Link>
                      <img
                        src="https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover ring-4 ring-blue-300 "
                      />
                    </div>
                  </MenuButton>
                </Menu>
              </div>
            </div>

            <div className="sm:hidden flex items-center">
              <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]">
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  className="block size-6 group-data-open:hidden"
                  aria-hidden="true"
                />
                <XMarkIcon
                  className="hidden size-6 group-data-open:block"
                  aria-hidden="true"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    isActive
                      ? "bg-[#1E40AF] text-white"
                      : "text-gray-800 hover:bg-gray-200 hover:text-[#1E40AF]",
                    "block rounded-md px-3 py-2 text-base font-medium transition"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </DisclosurePanel>
      </Disclosure>

      {showProfile && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="relative">
            <button
              className="absolute -top-4 -right-4 bg-white text-[#1E40AF] rounded-full p-1 shadow"
              onClick={() => setShowProfile(false)}
            >
              <IoClose />
            </button>
            <UserProfile />
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
