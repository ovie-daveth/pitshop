import Image from "next/image";
import media from "../../../../../public/images/nomedia.png"
import { Button } from "@headlessui/react";
import AssetActions from "./asset_action";

const NoItemComponent = () => {

    return (
        <div className="flex items-center justify-center flex-col gap-10 w-full lg:mt-32 mt-10">
            <div className="flex items-center flex-col justify-center">
                <Image src={media} alt="backgroubd" width={100} height={100} className="w-36 h-36" />
                <h1 className="lg:text-xl text-base">No Media uploaded yet!</h1>
                <p className="font-light text-xs w-[80%] mx-auto text-center mt-5">Start by adding your assets to organize and prepare them for your campaign</p>
            </div>
            <div>
              <AssetActions />
            </div>
        </div>
    )
}

export default NoItemComponent;