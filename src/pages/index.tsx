import Link from "next/link";
import Image from "next/image";
import bg from "../../public/bg.png";
export default function Home() {
  return (
    <>
      <div className="xl:w-[1440px] px-[24px] xl:px-[120px] lg:px-[64px] md:px-[32px] m-auto ">
        <div className="flex justify-between mt-[20px]">
          <div className="  text-French-Puce text-[32px] font-bold cursor-pointer">
            Br<span className="text-Crayola">evi</span>
          </div>
          <Link
            href="/login"
            type="button"
            className="h-[42px] md:h-[48px] flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-[100px] md:w-[142px]"
          >
            {" "}
            Log in{" "}
          </Link>
        </div>
        <div className="flex flex-col gap-5 items-center md:flex-row justify-between mt-[100px]">
          <div>
            <h1 className=" text-[32px] lg:text-[42px] lg:w-[350px] font-bold">
              SImplify Links, Engage with Ease
            </h1>
            <p className=" text-[18px] lg:text-[20px] text-[gray] lg:w-[338px]">
              Brevi is a simple tool which was built to make URLs as short as
              possible and boost engagements
            </p>
            <Link
              href="/signup"
              type="button"
              className="h-[42px] mt-[16px] md:h-[48px] flex items-center justify-center cursor-pointer rounded-[5px] text-[16px] md:text-[18px] font-semibold text-white bg-French-Puce w-[100px] md:w-[142px]"
            >
              {" "}
              Get started{" "}
            </Link>
          </div>
          <div>
            <Image
              src={bg}
              alt="Picture of the author"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </>
  );
}
