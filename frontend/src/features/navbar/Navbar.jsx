import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import {selectCart} from "../cart/cartSlice"

import {
  Bars3Icon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", link: "/", user: "true" },
  { name: "Products", link: "/admin", admin: "true" },
  { name: "orders", link: "/admin/orders", admin: "true" },
];

const userNavigation = [
  { name: "My Profile", link: "/profile", icon: "" },
  { name: "My Orders", link: "/orders", icon: "" },
  { name: "Sign out", link: "/logout", icon: "" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar({ children }) {
  const user = useSelector(selectUser);
  const cart=useSelector(selectCart)

  const user1 = user ? user[0] : null;
  console.log("user data in navbar", user1);
  console.log("My Cart:- ",cart);

  return (
    <div className="min-h-full sticky top-0">
      <Disclosure as="nav" className="bg-orange-200">
        {({ open }) => (
          <>
            <div className="mx-auto  px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link to="/">
                      <img
                        className="mx-auto h-12 w-auto"
                        src={require("../../asset/Group1.jpeg")}
                        alt="Your Company"
                      />
                    </Link>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {user1 &&
                        navigation.map((item) =>
                          item[user1.role] ? (
                            <Link
                              key={item.name}
                              to={item.link}
                              className={
                                "bg-orange-800 text-white hover:bg-yellow-600 hover:text-white rounded-md px-3 py-2 m-6"
                              }
                              aria-admin={item.admin ? "page" : undefined}
                            >
                              {item.name}
                            </Link>
                          ) : null
                        )}
                    </div>
                  </div>
                </div>

                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <div className="relative">
                      <Link to="/cart">
                        <button
                          type="button"
                          className="relative rounded-full  p-1 text-orange-600 hover:text-yellow-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="absolute -inset-1.5" />
                          <ShoppingCartIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </button>
                      </Link>
                      {cart.length > 0 && <span className="absolute -top-2 -right-1 inline-flex items-center rounded-lg bg-yellow-100 px-1.5 py-0.5 text-xs font-medium text-orange-600 ring-1 ring-inset ring-red-600/10">{cart.length}</span>}
                    </div>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />

                          {/* <span className=" text-xl">Hey!! {user1.name}</span> */}
                          <span className="sr-only">Open user menu</span>
                          {/* <span>{user1.name}</span> */}
                          <img
                            className="h-8 w-8 rounded-full bg-black ml-3"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.link}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-orange-600 p-2 text-white-400 hover:bg-yellow-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-grey-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Bars3Icon
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-orange-600 text-white"
                        : "text-orange-600 hover:bg-yellow-600 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 rounded-full bg-black ml-3"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <div className="relative">
                    <Link to="">
                      <button
                        type="button"
                        className="relative rounded-full bg-orange-400 p-1 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <ShoppingCartIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </button>

                      {cart.length > 0 && 
                        <span className="absolute -top-2 -right-1 inline-flex items-center rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"></span>
                      }

                    </Link>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-orange-600 hover:bg-yellow-600 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <header className="bg-white shadow">
        <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-regular tracking-tight text-gray-900">
            Welcome back,{" "}
            <span className="text-3xl font-medium text-orange-600 ">
              {user1.name}
            </span>
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

export default Navbar;
