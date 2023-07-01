"use client"
import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Container from '@/components/Container';
import Logo from '@/components/Logo';
import Image from 'next/image';
import login from '../../public/users/login.png'
 
const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('')
    const [password, setPassword] = useState('');
       
    const onLogin = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            router.push("/dashboard")
            alert(`${user.email} is signed in`)
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorCode)
            console.log(errorCode, errorMessage)
        });
       
    }
 
    return(
        <>
        <div className="lg:flex lg:relative">
          <div className="block lg:hidden">
            <div className=" w-screen px-[24px] xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto  ">
              <div className="pt-[20px]">
                <Container>
                  <div className="flex justify-between  md:flex-row">
                    <Logo />
                    <Link href="/signup"
                      type="button"

                      className="h-[42px] md:h-[48px] flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[20px] font-semibold text-white bg-French-Puce w-[100px] md:w-[142px]"
                    > Sign up </Link>
                  </div>
                </Container>
              </div>
            </div>
            <div>
            </div>
          </div>

          <div className=" hidden lg:block w-[40%] xl:w-[35%] h-screen bg-[#0E6E97]">

          <div className=" w-screen px-[24px] xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto  ">
              <div className="pt-[20px]">
                <Container>
                  <div className="flex justify-between  md:flex-row">
                    <Logo />
                    <Link href="/signup"
                      type="button"

                      className="h-[42px] md:h-[48px] flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[20px] font-semibold text-white bg-French-Puce w-[100px] md:w-[142px]"
                    > Sign up </Link>
                  </div>
                </Container>
              </div>

            </div>
              <Image
                className="p-5 mt-[20px] xl:ml-[20px]"
                src={login}
                alt="Picture of the author"
                width={600}
                height={600}
              />
          </div>
          <div className="lg:absolute top-[25%] flex flex-col items-center justify-center left-[55%]  p-2">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[24px] text-lg text-[#1e1e1e]">
                Welcome back 👋
              </h3>
              <p className="text-[#808080] align-middle text-[16px]">
                Simplify your links, amplify your reach
              </p>
            </div>
            <form className="flex mt-[32px] flex-col gap-y-[16px] ">
              <div className="flex flex-col">
                <label
                  htmlFor="email-address"
                  className="text-[14px] md:text-[16px] text-[#1e1e1e] "
                >
                  Email address
                </label>
                <input
                  className="w-[300px] md:w-[416px] focus:outline-French-Puce  px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
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
                  className="w-[300px] focus:outline-French-Puce  md:w-[416px] px-[14px] rounded-[5px] py-[10px] bg-[#E8E8E8]"
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
                onClick={onLogin}
                value="Log in"
                className="h-[42px] md:h-[48px] md:flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-full"
              />
            </form>

            <p className="text-[#808080] mt-[8px]">
              Already have an account?
              <Link
                className="text-[#1e1e1e] font-semibold  pl-[2px]"
                href="/signup"
              >
                Sign up
              </Link>
            </p>
          </div>

        </div>
        </>
    )
}
 
export default Login