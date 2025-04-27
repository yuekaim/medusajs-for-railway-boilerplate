'use client'

import Regions from "./regions"
import { MedusaProvider } from "medusa-react"
import { QueryClient } from "@tanstack/react-query"

const queryClient = new QueryClient()
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"

const RegionsWrapper = () => {
  return (
    <MedusaProvider
      queryClientProviderProps={{ client: queryClient }}
      baseUrl={BASE_URL}
    >
      {/* <Regions /> */}
    </MedusaProvider>
  )
}

export default RegionsWrapper
