// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * General purpose popup component.
 *
 * @param {boolean} isOpen - Controls popup visibility.
 * @param {function} onClose - Called when popup should close.
 * @param {ReactNode} children - Popup content.
 * @param {string} title - Optional header title.
 * @param {string} width - Tailwind width classes (default w-full max-w-md).
 */
export default function Popup({
  isOpen,
  onClose,
  children,
  title,
  width = 'w-full max-w-md',
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Popup Content */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${width} bg-white rounded-2xl shadow-xl border border-gray-200`}
          >
            {/* Header */}
            {(title || onClose) && (
              <div className="flex justify-between items-center border-b px-4 py-3">
                {title && <h2 className="text-lg font-semibold">{title}</h2>}
                {onClose && (
                  <button
                    onClick={onClose}
                    aria-label="Close popup"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
