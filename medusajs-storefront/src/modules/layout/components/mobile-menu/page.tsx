'use client'

import React, {useState} from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Transition } from "@headlessui/react"

const SideMenuItems = {
    Home: "/",
    Releases: "/releases",
    Store: "/store",
    Events: "/events",
    Info: "/info",
    Account: "/account",
    Cart: "/cart",
  }

const MobileMenu = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="menu-container">
        <button className="menu-button text-xl" onClick={toggleMenu}>
            {menuOpen ? 'Close' : 'Menu'}
        </button>
        <Transition
            show={menuOpen}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
        {menuOpen && (
            <ul className="mt-8">
            {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                    <li key={name}>
                    <LocalizedClientLink
                        href={href}
                        className="text-xl leading-6 hover:text-ui-fg-disabled"
                        onClick={toggleMenu}
                    >
                        {name}
                    </LocalizedClientLink>
                    </li>
                )
            })}
            </ul>
        )}
        </Transition>
    </div>
  )
}

export default MobileMenu;
