import ThemeToggle from "@/components/utils/themeToggle";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="flex flex-col items-center text-2xl bg-back" >
      <h1 className="text-primary">PRimary</h1>
      <h1 className="text-secondary">Secondary</h1>
      <h1 className="text-highlight">highlight</h1>
      <div className="bg-success w-12 h-12"></div>
      <div className="bg-error w-12 h-12"></div>
      <ThemeToggle />
    </div>
  )
}
