import { motion } from 'motion/react';
import { X, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import type { CountryData } from '@/types/country.types';

export interface CountryDetailHeaderProps {
  country: CountryData;
  countryColor: string;
  onClose: () => void;
  delay: number;
}

export function CountryDetailHeader({
  country,
  countryColor,
  onClose,
  delay,
}: CountryDetailHeaderProps) {
  return (
    <motion.div
      className="flex items-center gap-3 mb-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      {/* Flag Rectangle */}
      {country.image && (
        <div
          className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2"
          style={{ borderColor: countryColor }}
        >
          <ImageWithFallback
            src={country.image}
            alt={country.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 ring-1 ring-inset"
            style={{
              boxShadow: `inset 0 0 10px ${countryColor}20`,
            }}
          />
        </div>
      )}

      {/* Country Name with Icon */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          <MapPin
            className="w-4 h-4 flex-shrink-0"
            style={{
              color: countryColor,
              filter: `drop-shadow(0 0 6px ${countryColor})`,
            }}
          />
        </motion.div>
        <h3
          className="text-lg truncate"
          style={{
            color: countryColor,
            textShadow: `0 0 20px ${countryColor}, 0 0 40px ${countryColor}80`,
            fontWeight: 600,
          }}
        >
          {country.name}
        </h3>
      </div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="p-1.5 rounded-full transition-all duration-300 hover:bg-white/10 flex-shrink-0"
        style={{ color: countryColor }}
      >
        <X className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
}
