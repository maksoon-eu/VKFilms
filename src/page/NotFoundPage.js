import { motion } from "framer-motion";

import NotFound from "../components/notFound/NotFound";

const NotFoundPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <NotFound/>
        </motion.div>
    )
}

export default NotFoundPage;