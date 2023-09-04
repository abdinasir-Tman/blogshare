"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Nav = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [providers, setProviders] = useState(null);
  const { data: session } = useSession();
  const router = useRouter();
  const getProfile = () => {
    router.push(`/profile/user-profile?id=${session?.user.id}`);
  };
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await getProviders();

        setProviders(response);
      } catch (e) {
        console.log("error ", err);
      }
    };
    fetchProviders();
  }, []);
  return (
    <div className="max-w-3xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl text-gray-600">
          Logo
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              signOut();
              // setIsLoggedin(false);
            }}
            className="bg-white text-gray-600 border rounded-lg py-2 px-3 hover:bg-black hover:text-white"
          >
            Sign Out
          </button>
          {session?.user ? (
            <>
              <Link href="posts/new-post">
                <button className="bg-white text-gray-600 border rounded-lg py-2 px-3 hover:bg-black hover:text-white">
                  Create Post
                </button>
              </Link>
              <button
                onClick={() => {
                  signOut();
                  // setIsLoggedin(false);
                }}
                className="bg-white text-gray-600 border rounded-lg py-2 px-3 hover:bg-black hover:text-white"
              >
                Sign Out
              </button>

              <Image
                onClick={getProfile}
                src={session?.user.image}
                width={33}
                alt={"Uer image"}
                height={33}
                className="cursor-pointer rounded-full"
              />
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="bg-gray-600 text-white hover:bg-white py-1 px-3 hover:text-gray-500 border rounded-md"
                  >
                    Sing in
                  </button>
                ))}
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
