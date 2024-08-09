import { Text, clx } from "@medusajs/ui"

import { getCategoriesList, getCollectionsList } from "@lib/data"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"
import { Suspense } from "react"
import CartButton from "@modules/layout/components/cart-button"

export default async function Footer() {
  const SideMenuItems = {
    Home: "/",
    Releases: "/releases",
    Store: "/store",
    Events: "/events",
    Info: "/info"
  }
  return (
    <div>
      {/* desktop menu */}
      <div className="hidden sm:flex flex-row justify-between px-4 fixed bottom-8 w-full">
        <div className="bg-white border-black border-2 z-50 w-max px-6">
        <ul className="flex sm:flex-row gap-6 items-center justify-betweenr">
          {Object.entries(SideMenuItems).map(([name, href]) => {
            return (
              <li key={name}>
                <LocalizedClientLink
                  href={href}
                  className="text-xl leading-10 hover:text-ui-fg-disabled uppercase"
                  
                  data-testid={`${name.toLowerCase()}-link`}
                >
                  {name}
                </LocalizedClientLink>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="bg-white border-black border-2 z-50 w-max px-6">
        <ul className="flex flex-row gap-6 items-center justify-betweenr">
        <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-6 h-full">
                {process.env.FEATURE_SEARCH_ENABLED && (
                  <LocalizedClientLink
                    className="text-xl leading-10 hover:text-ui-fg-disabled"
                    href="/search"
                    scroll={false}
                    data-testid="nav-search-link"
                  >
                    Search
                  </LocalizedClientLink>
                )}
                <LocalizedClientLink
                  className="text-xl leading-10 hover:text-ui-fg-disabled"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="text-xl leading-10 hover:text-ui-fg-disabled"
                    href="/cart"
                    data-testid="nav-cart-linkx"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
        </ul>
      </div>
    </div>
  </div>
  )
}
