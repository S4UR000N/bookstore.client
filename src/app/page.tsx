'use client'
import Image from "next/image";
import Link from "next/link";
import Auth from "./components/auth";
import { useState } from "react";
import LibrarianHome from "./home/librarianHome";
import CustomerHome from "./home/customerHome";
import JwtService from "./services/JwtService";
export default function Home() {
  const [backgroundImage, setBackgroundImage] = useState(JwtService.getJwtToken()?.role ? '' : 'images/home-background.webp');
  const navHeight = {
    width: '100%',
    height: '56px'
  }
  const containerStyle = {
    backgroundPosition: '50%',
    backgroundImage: `url(${backgroundImage})`,
    height: '100%',
  }

  return (
    <main className="h-full">
      <Auth roles="">
        <section className="mb-40 h-full">
          <div className="relative overflow-hidden bg-cover bg-no-repeat" style={containerStyle}>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 h-full overflow-hidden w-full overflow-hidden bg-[hsla(0,0%,0%,0.75)] bg-fixed">
              <div className="flex h-full items-center justify-center">
                <div className="px-6 text-center text-white md:px-12">
                  <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                    The best books in the world <br /><span>for your curiosity</span>
                  </h1>
                  <Link href="/register">
                    <button type="button"
                      className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                      data-te-ripple-init data-te-ripple-color="light">
                      Explore New Frontiers
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Auth>
      <Auth roles="Customer">
        <div style={navHeight}/>
        <CustomerHome />
      </Auth>
      <Auth roles="Admin, Librarian">
        <div style={navHeight}/>
        <LibrarianHome />
      </Auth>
    </main>
  );
}
