import { motion } from 'motion/react';

export interface InfoBoxProps {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  countryColor: string;
  delay: number;
}

export function InfoBox({ icon: Icon, label, value, countryColor, delay }: InfoBoxProps) {
  return (
    <motion.div
      className="mb-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        className="flex items-start gap-2 p-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
        style={{ borderColor: `${countryColor}20` }}
      >
        <Icon
          className="w-4 h-4 flex-shrink-0 mt-0.5"
          style={{ color: countryColor }}
        />
        <div className="flex-1 min-w-0">
          <span className="opacity-70 text-xs block mb-1">{label}</span>
          <span
            className="text-sm block leading-snug"
            style={{
              color: countryColor,
              textShadow: `0 0 10px ${countryColor}40`,
              fontWeight: 500,
            }}
          >
            {value}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
