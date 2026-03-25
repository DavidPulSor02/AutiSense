import logoImg from "../assets/logo.png";

export default function AutiSenseLogo({ size = 40, className = "" }) {
    return (
        <img 
            src={logoImg} 
            alt="AutiSense Logo" 
            style={{ width: size, height: 'auto', display: 'block' }}
            className={className}
        />
    );
}

