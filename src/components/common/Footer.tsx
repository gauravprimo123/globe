import { ImageWithFallback } from './ImageWithFallback'
import footerImage from '@/assets/footer-img.png';
import { motion } from 'motion/react';

const Footer = () => {
    return (
        <div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative left-0 right-0 w-full"
            >
                <ImageWithFallback
                    src={footerImage}
                    alt="Med Learning Group - Supported by Lilly"
                    className="w-full h-auto object-contain block"
                    id="main-footer"
                />
            </motion.div>

        </div>
    )
}

export default Footer