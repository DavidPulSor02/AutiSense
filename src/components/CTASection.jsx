import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './CTASection.css';

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="cta-section" id="cta">
      <div className="cta-shell">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-copy">
            <span className="cta-badge">
              <Sparkles size={16} />
              Impulso clínico
            </span>
            <h2>¿Listo para llevar la atención a otro nivel?</h2>
            <p>
              Diseñamos experiencias digitales claras para equipos médicos que necesitan
              velocidad, seguridad y una visión más completa del paciente.
            </p>
            <div className="cta-actions">
              <button type="button" className="cta-btn-primary" onClick={() => navigate('/contact')}>
                Solicitar demo
                <ArrowRight size={18} />
              </button>
              <button type="button" className="cta-btn-secondary" onClick={() => navigate('/contact')}>
                Hablar con ventas
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
