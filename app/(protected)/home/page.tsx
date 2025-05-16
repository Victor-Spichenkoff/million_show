import ThemeToggle from "@/components/utils/themeToggle";

import { Header } from "@/components/template/header";

export default function Home() {

  return (<>
  <Header label="Home" showConfig showLogo/>
    <div className="flex flex-col items-center text-2xl h-screen w-screen" >
      
      {/* <ThemeToggle /> */}
        
    </div>
  </>)
}
