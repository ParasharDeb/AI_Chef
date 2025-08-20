import Mainbody from "@/components/body";
import Footer from "@/components/footer";
import LargeRecipe from "@/components/largeRecipe";
import Menu from "@/components/menu";


export default function Home() {
  return (
    <div className="bg-paper w-screen h-100vh">
    <div><Mainbody/></div>
    <div><Menu/></div>  
    <div><LargeRecipe/></div>
    <div><Footer/></div>
    </div>
  );
}
