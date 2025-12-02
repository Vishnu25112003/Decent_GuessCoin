import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { CyberButton } from "./Button";

type ModalType = "success" | "error" | "warning" | "info" | "confirm";

export interface CyberModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: ModalType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
}

export const CyberModal: React.FC<CyberModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
  confirmText = "OK",
  cancelText = "CANCEL",
  onConfirm,
  showCancel = false,
}) => {
  const typeConfig = {
    success: {
      icon: <CheckCircle className="w-12 h-12" />,
      iconColor: "text-cyber-success",
      borderColor: "border-cyber-success",
      buttonVariant: "success" as const,
    },
    error: {
      icon: <AlertCircle className="w-12 h-12" />,
      iconColor: "text-cyber-danger",
      borderColor: "border-cyber-danger",
      buttonVariant: "danger" as const,
    },
    warning: {
      icon: <AlertTriangle className="w-12 h-12" />,
      iconColor: "text-cyber-accent",
      borderColor: "border-cyber-accent",
      buttonVariant: "warning" as const,
    },
    info: {
      icon: <Info className="w-12 h-12" />,
      iconColor: "text-cyber-primary",
      borderColor: "border-cyber-primary",
      buttonVariant: "primary" as const,
    },
    confirm: {
      icon: <AlertTriangle className="w-12 h-12" />,
      iconColor: "text-cyber-accent",
      borderColor: "border-cyber-accent",
      buttonVariant: "primary" as const,
    },
  };

  const config = typeConfig[type];

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Cyberpunk Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(10, 14, 39, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </motion.div>

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md pointer-events-auto"
            >
              {/* Glowing border effect */}
              <div
                className={`absolute -inset-1 ${config.borderColor} opacity-20 blur-xl rounded-lg`}
              />

              {/* Main modal container */}
              <div
                className={`
                  relative bg-cyber-dark border-2 ${config.borderColor}
                  rounded-lg overflow-hidden shadow-2xl
                `}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 9, 51, 0.95) 100%)",
                }}
              >
                {/* Top accent line */}
                <div
                  className={`h-1 ${config.borderColor.replace("border-", "bg-")} opacity-50`}
                />

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={`absolute top-4 right-4 p-1.5 rounded ${config.iconColor} bg-opacity-10 hover:bg-opacity-20 transition-all`}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`flex justify-center mb-4 ${config.iconColor}`}
                  >
                    {config.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-display font-bold text-cyber-text uppercase mb-3 tracking-wider">
                    {title}
                  </h2>

                  {/* Message */}
                  <p className="text-gray-300 font-mono text-sm mb-6 leading-relaxed">
                    {message}
                  </p>

                  {/* Buttons */}
                  <div
                    className={`flex gap-3 ${showCancel ? "justify-center" : "justify-center"}`}
                  >
                    {showCancel && (
                      <CyberButton
                        variant="secondary"
                        size="md"
                        onClick={onClose}
                        className="min-w-[100px]"
                      >
                        {cancelText}
                      </CyberButton>
                    )}
                    <CyberButton
                      variant={config.buttonVariant}
                      size="md"
                      onClick={handleConfirm}
                      glow
                      className="min-w-[120px]"
                    >
                      {confirmText}
                    </CyberButton>
                  </div>
                </div>

                {/* Corner decorations */}
                <div
                  className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${config.borderColor}`}
                />
                <div
                  className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${config.borderColor}`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${config.borderColor}`}
                />
                <div
                  className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${config.borderColor}`}
                />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};