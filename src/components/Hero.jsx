import "./Hero.css";

export default function Hero() {
    return (
        <section id="hero" className="hero">
            
            <div className="hero-content fade-left">
                <h1>
                    Plataforma Inteligente para la <span>Detección</span> Temprana del TEA
                </h1>

                <p>
                    AutiSense es una plataforma inteligente que utiliza inteligencia
                    artificial para apoyar la identificación temprana de señales de
                    riesgo del Trastorno del Espectro Autista en infantes.
                </p>

                <div className="hero-actions">
                    <button className="btn-primary">Demo</button>
                </div>
            </div>

            <div className="hero-image fade-right">
                <img
                    src="https://res.cloudinary.com/dilgq19i2/image/upload/v1769148382/fondohero_bcjvxp.png"
                    alt="Plataforma AutiSense detección temprana del TEA"
                />
            </div>
        </section>
    );
}
