import Image from "next/image";
import goldMount from "@/assets/images/goldMountain.png"

export function GoldMount() {
    return (
        <div className="relative max-w-36 mx-auto">
            <Image src={goldMount} alt={"Gold Mountain"}/>


            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-yellow-400 opacity-10 animate-ping -z-10" />
        </div>
    )
}
