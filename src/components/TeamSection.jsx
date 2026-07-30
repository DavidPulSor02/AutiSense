import { motion } from "framer-motion";
import { useState } from "react";
import "./TeamSection.css";

const teamMembers = [
    {
        name: "David Pulido Sorcia",
        username: "DavidPulSor02",
        role: "Fundador & Lead Engineer",
        bio: "Dirige la visión técnica y el crecimiento de AutiSense con foco en producto y escalabilidad.",
        avatar: "https://github.com/DavidPulSor02.png?size=240",
        githubUrl: "https://github.com/DavidPulSor02"
    },
    {
        name: "Daniel López Beristain",
        username: "daniloviu21",
        role: "Desarrollador Frontend",
        bio: "Impulsa la experiencia visual y la interacción del producto con enfoque en usabilidad.",
        avatar: "https://github.com/daniloviu21.png?size=240",
        githubUrl: "https://github.com/daniloviu21"
    },
    {
        name: "Elian Medina Cobos",
        username: "ElianMC3",
        role: "Desarrollador Backend",
        bio: "Diseña la lógica de negocio y la arquitectura que soporta las soluciones clínicas.",
        avatar: "https://github.com/ElianMC3.png?size=240",
        githubUrl: "https://github.com/ElianMC3"
    },
    {
        name: "Carlos Bañuelos Cano",
        username: "CarlosGBC",
        role: "Product & UX",
        bio: "Aporta claridad de producto, experiencia y enfoque en las necesidades del usuario final.",
        avatar: "https://github.com/CarlosGBC.png?size=240",
        githubUrl: "https://github.com/CarlosGBC"
    }
];

const TeamSection = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="team-section" id="team">
            <div className="team-shell">
                <div className="team-heading">
                    <h2>Conectado con personas reales.</h2>
                    <p>El equipo detrás de AutiSense está formado por personas con visión técnica, clínica y productiva.</p>
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
                                    <a
                                        href={member.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="team-github-link"
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        @{member.username}
                                    </a>
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
