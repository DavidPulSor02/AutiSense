import { motion } from "framer-motion";
import { useState } from "react";
import "./TeamSection.css";

const teamMembers = [
    {
        name: "Dra. Lucía Rivera",
        role: "Directora clínica",
        bio: "Lidera la integración entre tecnología y atención médica familiar.",
        avatar: "https://i.pravatar.cc/150?img=68"
    },
    {
        name: "Ing. Mateo Blanco",
        role: "Head de Producto",
        bio: "Diseña flujos de usuario claros para equipos clínicos y familias.",
        avatar: "https://i.pravatar.cc/150?img=56"
    },
    {
        name: "Sofía Paredes",
        role: "Especialista UX",
        bio: "Optimiza cada interacción para que el uso sea rápido y confiable.",
        avatar: "https://i.pravatar.cc/150?img=43"
    }
];

const TeamSection = () => {
    const [selectedIndex, setSelectedIndex] = useState(1);

    return (
        <section className="team-section" id="team">
            <div className="team-shell">
                <div className="team-heading">
                    <h2>Built for professionals like you.</h2>
                    <p>Used by seriously productive people.</p>
                    <p className="team-subtitle">Selecciona un integrante para ver su perfil activo.</p>
                </div>

                <div className="team-carousel">
                    {teamMembers.map((member, index) => (
                        <motion.article
                            key={member.name}
                            className={`team-card ${selectedIndex === index ? "selected" : "side"}`}
                            onClick={() => setSelectedIndex(index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    setSelectedIndex(index);
                                }
                            }}
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.55, delay: index * 0.08 }}
                            whileHover={{ y: -4, scale: selectedIndex === index ? 1.02 : 1.01 }}
                            aria-pressed={selectedIndex === index}
                        >
                            <div className="team-card-top">
                                <img src={member.avatar} alt={member.name} loading="lazy" className="team-avatar" />
                                <div className="team-card-info">
                                    <strong>{member.name}</strong>
                                    <span>{member.role}</span>
                                </div>
                            </div>
                            <p>{member.bio}</p>
                            {selectedIndex === index && <span className="team-selected-label">Seleccionado</span>}
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
