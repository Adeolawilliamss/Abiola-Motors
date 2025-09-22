import Home from "@/components/homepage";
import MainPage from "@/components/main";
import Footer from "@/components/footer";
import Introduction from "@/components/introduction/introduction";

function App() {
  return (
    <div className="bg-white">
      <Home />
      <Introduction />
      <MainPage />
      <Footer />      
    </div>
  );
}

export default App;