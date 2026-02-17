import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import "./PaymentModal.css";

const PaymentModal = ({ isOpen, onClose, plan, price, period }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulación de proceso de pago
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            // Cerrar automáticamente después de mostrar éxito
            setTimeout(() => {
                onClose();
                // Reset states after animation
                setTimeout(() => setIsSuccess(false), 500);
            }, 3000);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="payment-modal-overlay">
                <motion.div
                    className="payment-modal-content"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                    <button className="close-btn" onClick={onClose}>&times;</button>

                    {!isSuccess ? (
                        <>
                            <div className="modal-header">
                                <h2>Completar Pago</h2>
                                <p>Suscripción segura con cifrado SSL</p>
                            </div>

                            <div className="plan-summary">
                                <div className="plan-info">
                                    <h4>Plan {plan}</h4>
                                    <p>{period === "/ mes" ? "Facturación Mensual" : "Facturación Anual"}</p>
                                </div>
                                <div className="plan-price">
                                    ${price}
                                    <span style={{ fontSize: '0.8rem', opacity: 0.7 }}> {period}</span>
                                </div>
                            </div>

                            <form className="payment-form" onSubmit={handleSubmit}>
                                <div className="input-group">
                                    <label>Titular de la tarjeta</label>
                                    <input type="text" placeholder="Nombre completo" required />
                                </div>

                                <div className="input-group">
                                    <label>Número de tarjeta</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                                </div>

                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Vencimiento</label>
                                        <input type="text" placeholder="MM/YY" maxLength="5" required />
                                    </div>
                                    <div className="input-group">
                                        <label>CVC</label>
                                        <input type="text" placeholder="123" maxLength="3" required />
                                    </div>
                                </div>

                                <button type="submit" className="pay-button" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <div className="spinner"></div>
                                            Procesando...
                                        </>
                                    ) : `Pagar $${price}`}
                                </button>

                                <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#64748b', marginTop: '1rem' }}>
                                    Al pagar, aceptas nuestros términos de servicio y políticas de privacidad.
                                </p>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            className="success-content"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="success-icon">✓</div>
                            <h2>¡Pago Exitoso!</h2>
                            <p>¡Bienvenido a AutiSense! Tu cuenta ha sido activada correctamente.</p>
                            <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>Redirigiendo al panel...</p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PaymentModal;
