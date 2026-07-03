import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, CircleHelp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: '¿Qué hace diferente a AutiSense?',
    answer:
      'Combina IA clínica, seguimiento seguro y una experiencia visual clara para que los equipos puedan priorizar lo que realmente importa.'
  },
  {
    question: '¿Se adapta a distintos tipos de clínicas?',
    answer:
      'Sí. La plataforma está pensada para equipos pediátricos, de neurología y centros que buscan mejorar la coordinación del cuidado.'
  },
  {
    question: '¿Cómo inicia un proyecto con ustedes?',
    answer:
      'Comenzamos con una evaluación rápida de necesidades, diseño de flujo y una propuesta de implementación alineada con tus objetivos.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq">
      <div className="faq-shell">
        <div className="faq-header">
          <span className="faq-kicker">
            <CircleHelp size={16} />
            Preguntas frecuentes
          </span>
          <h2>Todo lo que necesitas saber antes de empezar</h2>
        </div>

        <div className="faq-list">
          {faqs.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <motion.div className="faq-item" key={item.question} layout>
                <button
                  type="button"
                  className={`faq-question ${isOpen ? 'open' : ''}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <ChevronDown size={18} className={isOpen ? 'rotated' : ''} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="faq-answer"
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
