/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Logo from "@/components/Logo";
import signup from '../../public/users/signup.png'


const Signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/login");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode);
        return {};
        // ..
      });
  };

  return (
    <>
        <div className="lg:flex lg:relative">
          <div className="block lg:hidden">
            <div className=" w-screen px-[24px] xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto  ">
              <div className="pt-[20px]">
                <Container>
                  <div className="flex justify-between  md:flex-row">
                    <Logo />
                    <Link href="/login"
                      type="button"
                      className="h-[42px] md:h-[48px] flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-[100px] md:w-[142px]"
                    > Log in </Link>
                  </div>
                </Container>
              </div>
            </div>

          </div>

          <div className=" hidden lg:block w-[40%] xl:w-[35%]  h-screen bg-[#0E6E97]">
          <div className=" w-screen px-[24px] xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto  ">
              <div className="pt-[20px]">
                <Container>
                  <div className="flex justify-between  md:flex-row">
                    <Logo />
                    <Link href="/login"
                      type="button"

                      className="h-[42px] md:h-[48px] flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-[100px] md:w-[142px]"
                    > Log in </Link>
                  </div>
                </Container>
              </div>
            </div>
              <Image
                className="p-5 mt-[20px] xl:ml-[20px]"
                src={signup}
                alt="Picture of the author"
                width={600}
                height={600}
              />
          </div>
          <div className="lg:absolute top-[25%] flex flex-col items-center justify-center left-[55%]  p-2">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[24px] text-lg text-[#1e1e1e]">
                Sign up to Brevi
              </h3>
              <p className="text-[#808080] align-middle text-[16px]">
                Simplify your links, amplify your reach
              </p>
              <div className="bg-[#f6c86c60] rounded-[5px] px-5 py-2 text-[#8d6c2b]">Name input is currently unavailable.</div>
            </div>
            <form className="flex mt-[32px] flex-col gap-y-[16px] ">
              <div className="flex flex-col md:flex-row gap-y-[16px] gap-x-[16px] opacity-50">
                <div className="flex flex-col gap-y-[4px] text-[#1e1e1e] ">
                  <label
                    htmlFor="first-name"
                    className="text-[14px] md:text-[16px] "
                  >
                    First name
                  </label>
                  <input
                    disabled = {true}
                    className="w-[300px] disabled focus:outline-none md:w-[200px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
                    type="text"
                    name="firstName"
                    placeholder="Your first name here"
                    id=""
                  />
                </div>
                <div className="flex flex-col gap-y-[4px]">
                  <label
                    htmlFor="first-name"
                    className="text-[14px] md:text-[16px] text-[#1e1e1e] "
                  >
                    Last name
                  </label>
                  <input
                  disabled = {true}
                    className="w-[300px] md:w-[200px] focus:outline-none px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
                    type="text"
                    name="firstName"
                    placeholder="Your last name here"
                    id=""
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="email-address"
                  className="text-[14px] md:text-[16px] text-[#1e1e1e] "
                >
                  Email address
                </label>
                <input
                  className="w-[300px] md:w-[416px] focus:outline-none px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-[14px] md:text-[16px] text-[#1e1e1e] "
                >
                  Password
                </label>
                <input
                  className="w-[300px] focus:outline-none md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                />
              </div>
              <div className=" bg-[#FF4E4E] text-white">
            {error}
          </div>

              <input
                type="submit"
                onClick={onSubmit}
                value="Sign up"
                className="h-[42px] md:h-[48px] md:flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-full"
              />
            </form>

            <p className="text-[#808080] mt-[8px]">
              Already have an account?
              <Link
                className="text-[#1e1e1e] font-semibold  pl-[2px]"
                href="/login"
              >
                Log in
              </Link>
            </p>
            <div className="md:w-[400px] text-center mt-[50px]">
              By creating an account, you agree to Bervi's Terms of Service,
              Privacy Policy and Acceptable Use Policy.
            </div>
          </div>

        </div>
    </>
  );
};

export default Signup;
