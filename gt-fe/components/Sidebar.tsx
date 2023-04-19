import Link from "next/link";
import { ReactNode } from "react";
import { GiKitchenKnives } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";

type PropType = {
  children: ReactNode;
};

export default function Sidebar({ children }: PropType): JSX.Element {
  return (
    <div className="flex">
      <div className="fixed w-20 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center gap-10">
          <Link href="/">
            <div>
              <GiKitchenKnives size={30} />
            </div>
          </Link>

          <Link href="/user">
            <div className="bg-gray-100 p-4 rounded-lg inline-block hover:bg-gray-200 cursor-pointers my-4">
              <AiOutlineUser size={30} />
            </div>
          </Link>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
}
