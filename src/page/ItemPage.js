import { motion } from "framer-motion";

import ChooseItem from "../components/chooseItem/ChooseItem";
import SameSlider from "../components/sameSlider/SameSlider";

const ItemPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ChooseItem/>
            <SameSlider/>
        </motion.div>
    )
}

export default ItemPage;