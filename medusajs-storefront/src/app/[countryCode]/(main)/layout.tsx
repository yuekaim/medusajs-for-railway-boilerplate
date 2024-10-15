import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import TitleAnimation from "@modules/layout/components/title-animation/page"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <div className="px-4 sm:px-8 py-8"
      style={{
        'position': "fixed",
        'zIndex': 100,
        'mixBlendMode': 'multiply',
        // 'textShadow' : '5px 2px 3px black',
        // 'filter': 'blur(1px) brightness(1.3) contrast(3)'
      }
      }><TitleAnimation /></div>
      <div className="top-28 absolute w-full">
        {props.children}
      </div>
      <Footer />
    </>
  )
}
