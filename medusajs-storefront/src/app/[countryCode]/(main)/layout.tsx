import { Metadata } from "next"

import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import TitleAnimation from "@modules/layout/components/title-animation/page"
import RegionsWrapper from "@modules/layout/components/region-select"


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

// const queryClient = new QueryClient()

export default async function PageLayout(props: { children: React.ReactNode }) {
  return (
    // <MedusaProvider
    //   queryClientProviderProps={{ client: queryClient }}
    //   baseUrl="http://localhost:9000"
    // >
    <>
      <Nav />
      <div className="px-4 sm:px-8 sm:py-8 py-2 fixed z-50 sm:top-0 sm:left-0 sm:w-max w-full bottom-0 
      sm:bg-transparent bg-white pointer-events-none border-t-2 border-black sm:border-none sm:mix-blend-lighten">
        <TitleAnimation />
      </div>
      <div className="top-28 absolute w-full">
        {props.children}
      </div>
      <Footer />
      {/* <RegionSelect /> */}
      <RegionsWrapper />
    </>
    // </MedusaProvider>
  )
}
