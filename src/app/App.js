import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import CatalogPage from "../page/CatalogPage";
import ItemPage from "../page/ItemPage";
import NotFoundPage from "../page/NotFoundPage";

import '../../style/style.scss';

const App = () => {

  return (
      <div className="app">
        <Header/>
        <AnimatePresence mode="wait">
            <Routes>
                <Route path="/catalog" element={<CatalogPage/>}/>
                <Route path="/catalog/:id" element={<ItemPage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </AnimatePresence>
        <Footer/>
      </div>
  );
}

export default App;