import { ImageWithFallback } from './ImageWithFallback'
import headerImage from '@/assets/header-img.png';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative top-0 left-0 right-0 z-50"
                id="main-header"
            >
                <ImageWithFallback
                    src={headerImage}
                    alt="Beyond Borders - Bridging Gaps in the Management of Type 2 Diabetes Across the Globe"
                    className="w-full h-auto object-contain block"
                />
            </motion.div>
        </div>
    )
}

export default Header