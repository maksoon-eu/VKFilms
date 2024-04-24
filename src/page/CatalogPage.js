import { motion } from "framer-motion";

import Catalog from "../components/catalog/Catalog";

const CatalogPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Catalog/>
        </motion.div>
    )
}

export default CatalogPage;