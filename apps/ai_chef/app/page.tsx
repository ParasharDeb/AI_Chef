import Mainbody from "@/components/body";
import Menu from "@/components/menu";


export default function Home() {
  return (
    <div className="bg-paper w-screen h-100vh">
    <div><Mainbody/></div>
    <div><Menu/></div>
    <div className="h-screen"></div>
    </div>
  );
}
