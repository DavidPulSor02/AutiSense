import "./AnalisisView.css";
import PlatformFrame from "./PlatformFrame";

export default function AnalisisView() {
    return (
        <PlatformFrame activeItem="analisis">
            <div className="av-content">
                {/* Title */}
                <h2 className="av-title">Carga de contenido multimedia para análisis predictivo.</h2>
                <p className="av-subtitle">
                    Sube un video del infante para que la plataforma realice un análisis automatizado basado en patrones de desarrollo y comportamiento.
                </p>

                {/* Requirements */}
                <div className="av-requirements">
                    <h4>Requisitos y recomendaciones del video.</h4>
                    <ul>
                        <li>Duración mínima recomendada: 15-30 segundos.</li>
                        <li>El rostro y el cuerpo del infante deben ser visibles.</li>
                        <li>Entorno bien iluminado.</li>
                    </ul>
                    <div className="av-extra-notes">
                        <small>·Evitar ruidos fuertes o distracciones.</small>
                        <small>·Formatos permitidos: MP4, MOV, AVI.</small>
                        <small>·Tamaño máximo: 200 MB.</small>
                    </div>
                </div>

                {/* Patient selector */}
                <div className="av-selector-row">
                    <span className="av-step-num">1.</span>
                    <span>Seleccionar el paciente</span>
                    <div className="av-patient-search">Buscar Paciente...</div>
                </div>

                {/* Upload area */}
                <div className="av-upload-card">
                    <div className="av-upload-header">
                        <h4>Subir contenido multimedia</h4>
                        <span className="av-upload-close">✕</span>
                    </div>
                    <small className="av-upload-subtitle">Agrega tus documentos aquí (máximo 5 archivos).</small>

                    <div className="av-dropzone">
                        <span className="av-cloud-icon">☁️</span>
                        <p>Arrastra tu(s) archivo(s) o <span className="av-browse">busca</span></p>
                        <small>Max 10 MB files are allowed</small>
                    </div>
                    <small className="av-formats">Solo se permiten archivos MP4, MOV, AVI</small>
                </div>

                {/* Progress bars */}
                <div className="av-progress-list">
                    <div className="av-progress-item">
                        <div className="av-progress-info">
                            <span className="av-progress-label">Analizando...</span>
                            <small>65% • 30 segundos</small>
                        </div>
                        <div className="av-progress-bar">
                            <div className="av-progress-fill" style={{ width: "65%" }}></div>
                        </div>
                        <div className="av-progress-actions">
                            <span>⏸</span>
                            <span className="av-cancel">✕</span>
                        </div>
                    </div>

                    <div className="av-progress-item">
                        <div className="av-progress-info">
                            <span className="av-progress-label">Analizando...</span>
                            <small>85% • 30 segundos</small>
                        </div>
                        <div className="av-progress-bar">
                            <div className="av-progress-fill orange" style={{ width: "85%" }}></div>
                        </div>
                        <div className="av-progress-actions">
                            <span>⏸</span>
                            <span className="av-cancel">✕</span>
                        </div>
                    </div>
                </div>
            </div>
        </PlatformFrame>
    );
}