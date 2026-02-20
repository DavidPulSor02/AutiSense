import "./ReportesView.css";
import PlatformFrame from "./PlatformFrame";

export default function ReportesView() {
    const reportDates = ["15/02/2025", "14/03/2025", "17/04/2025", "15/05/2025", "18/06/2025"];

    return (
        <PlatformFrame activeItem="reportes">
            <div className="rv-content">
                {/* Patient Header */}
                <div className="rv-patient-card">
                    <div className="rv-patient-info">
                        <div className="rv-patient-avatar">
                            <span>👦</span>
                        </div>
                        <div>
                            <h3>Expediente de Paciente</h3>
                            <p className="rv-patient-name">Johan Martínez Sanchez</p>
                            <span className="rv-patient-age">📋 Edad: 15 meses</span>
                        </div>
                    </div>
                    <div className="rv-patient-actions">
                        <span className="rv-badge-moderate">Moderado</span>
                        <button className="rv-close-btn">Cerrar caso</button>
                    </div>
                </div>

                {/* Filter */}
                <div className="rv-filter-card">
                    <h4>Filtrar reportes</h4>
                    <div className="rv-date-row">
                        <div className="rv-date-input">
                            <small>Fecha de inicio</small>
                            <span>05/10/2025 📅</span>
                        </div>
                        <div className="rv-date-input">
                            <small>Fin de fecha</small>
                            <span>05/10/2025 📅</span>
                        </div>
                    </div>
                </div>

                {/* Reports grid */}
                <div className="rv-reports-grid">
                    <div className="rv-report-list-card">
                        <h4>Reportes generados recientemente</h4>
                        {reportDates.map((d, i) => (
                            <div key={i} className="rv-report-item">
                                <span className="rv-report-dot" style={{ background: i === 2 ? "#f59e0b" : "#0ea5a4" }}></span>
                                {d}
                                <span className="rv-download-icon">⬇</span>
                            </div>
                        ))}
                    </div>
                    <div className="rv-report-list-card">
                        <h4>Historial de reportes</h4>
                        {reportDates.map((d, i) => (
                            <div key={i} className="rv-report-item">
                                <span className="rv-report-dot" style={{ background: i === 2 ? "#f59e0b" : "#0ea5a4" }}></span>
                                {d}
                                <span className="rv-download-icon">⬇</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Evolution chart */}
                <div className="rv-evolution-card">
                    <h4>Historial de Evolución de paciente</h4>
                    <div className="rv-line-chart">
                        <svg viewBox="0 0 300 80" className="rv-chart-svg">
                            <polyline
                                fill="none"
                                stroke="#0ea5a4"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                points="10,65 60,55 110,50 160,40 210,35 260,20"
                            />
                            <polyline
                                fill="rgba(14,165,164,0.1)"
                                stroke="none"
                                points="10,65 60,55 110,50 160,40 210,35 260,20 260,75 10,75"
                            />
                            {[10, 60, 110, 160, 210, 260].map((cx, i) => (
                                <circle key={i} cx={cx} cy={[65, 55, 50, 40, 35, 20][i]} r="3" fill="#0ea5a4" />
                            ))}
                        </svg>
                        <div className="rv-chart-labels">
                            <span>semana 1</span>
                            <span>semana 2</span>
                            <span>semana 3</span>
                            <span>semana 4</span>
                            <span>semana 5</span>
                            <span>semana 6</span>
                        </div>
                    </div>
                </div>
            </div>
        </PlatformFrame>
    );
}