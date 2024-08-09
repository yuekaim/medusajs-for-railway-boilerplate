import { listRegions } from "@lib/data";
import MobileMenu from "@modules/layout/components/mobile-menu/page";
import CartButton from "@modules/layout/components/cart-button";
import TitleAnimation from "@modules/layout/components/title-animation/page";

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions)

  return (
    <div className="sticky top-0 z-50">
      <div className="flex sm:hidden flex-row justify-between text-3xl uppercase px-4 py-0 w-100 bg-white">
        <MobileMenu />
        <CartButton />
      </div>
      {/* <div className="px-4 sm:px-8 py-8"><TitleAnimation /></div> */}
    </div>
  )
}
