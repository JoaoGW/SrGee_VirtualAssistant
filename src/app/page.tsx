"use client"
import Image from "next/image";

import { Typewriter } from 'react-simple-typewriter';

import { Header } from "@components/Header/Header";
import { Footer } from "@components/Footer/Footer";
import { ButtonWithEndIcon } from "@components/Buttons/ButtonWithEndIcon";

import GitHubLogo from '@assets/GitHub/github-logo-unofficial.png'

import { ArrowRightSquare, MoveUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="h-screen w-screen relative">
      <Image
        src={GitHubLogo}
        alt=""
        className="absolute top-0 right-0 h-screen w-[41.5vw] object-cover opacity-20 z-0 pt-10"
        style={{
          maskImage: "linear-gradient(to right, transparent, black)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black)",
        }}
      />

      <Header />

      <section className="absolute left-0 top-1/2 transform -translate-y-1/2 pl-15">
        <span className="text-3xl">
          <h2 className="mb-3 text-5xl">Your usefull AI friend tool to: </h2>
          <Typewriter
            words={['Roast your Code', 'Manage Added Files', 'Help Commit Changes', 'Push Files Modifications', 'Make a Pull Request', 'Merge branches', 'Release Stable Versions']}
            loop={0}
            typeSpeed={150}
            deleteSpeed={90}
            cursor
            cursorStyle='_'
            cursorBlinking
          />
          <h4 className="mt-8 text-[26px]">Want to spend less time automatizing repetitive tasks?</h4>
          <h4 className="mt-1 text-[26px]">You don't like to write commits or it's not creative enough?</h4>
          <h4 className="mt-1 text-[26px]">Help manage changes and write a profissional Pull Request?</h4>
          <div className="flex flex-row gap-10">
            <ButtonWithEndIcon text="Let's do It!" icon={ArrowRightSquare} style={{ width: 250, marginTop: 20 }} />
            <ButtonWithEndIcon text="Learn More" icon={MoveUpRight} style={{ width: 250, marginTop: 20 }} />
          </div>
        </span>
      </section>

      <Footer />
    </div>
  );
}