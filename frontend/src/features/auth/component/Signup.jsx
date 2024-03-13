import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, selectUser } from "../authSlice";
import { Link, Navigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("my user is ", user);

  return (
    <>
      {user && <Navigate to="/" replace={true} />}
      <div className="bg-orange-100 px-20 py-5 " >
      <div className="flex flex-1  min-h-full flex-col justify-center mx-20  px-3 py-12 lg:px-0 bg-white border-red-600 border-solid border-2 rounded-lg shadow-lg w-200">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-15 w-auto"
            src={require("../../../asset/Group1.jpeg")}
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              console.log("Sign up data:-", data);
              dispatch(
                createUserAsync({
                  name:data.name,
                  company:data.companyName,
                  email: data.email,
                  password: data.password,
                  addresses: [],
                  role: "user",
                }),
              );
              reset();
            })}
          >

            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Name
              </label>

              <div className="mt-2">
                <input
                  id="name"
                  type="string"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 place"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="Name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Your Company Name
              </label>

              <div className="mt-2">
                <input
                  id="companyName"
                  type="string"
                  {...register("companyName", {
                    required: "comapany name is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 place"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email Address
              </label>

              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 place"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>

              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "password is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                      message: `
                          - at least 8 characters\n
                          - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                          - Can contain special characters`,
                    },
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>

              <div className="mt-2">
                <input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password required",
                    validate: (value, formValues) =>
                      value === formValues.password || "password not matching",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm sm:leading-6"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10">
              <button
                type="submit"
                className='flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member? {""}
            <Link to="/login" className="text-blue-800">
              Login
            </Link>
          </p>
        </div>
      </div>
      </div>
    </>
  );
}

export default Signup;
