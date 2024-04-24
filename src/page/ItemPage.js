import { motion } from "framer-motion";

import ChooseItem from "../components/chooseItem/ChooseItem";

const ItemPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <ChooseItem/>
        </motion.div>
    )
}

export default ItemPage;