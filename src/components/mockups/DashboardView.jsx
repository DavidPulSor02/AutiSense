import React from "react";
import "./DashboardView.css";
import PlatformFrame from "./PlatformFrame";

const DashboardView = () => {
    return (
        <PlatformFrame activeItem="dashboard">
            <div className="dv-content">
                {/* TOP ROW */}
                <div className="dv-top-row">
                    {/* Welcome Card */}
                    <div className="dv-welcome">
                        <span className="dv-welcome-label">Bienvenido,</span>
                        <h2>Dr. Miguel Rivera</h2>
                        <p className="dv-tagline">Detección temprana, futuro sin límites.</p>
                        <div className="dv-welcome-stats">
                            <div className="dv-ws-box">
                                <span>Pacientes activos.</span>
                                <strong>20</strong>
                            </div>
                            <div className="dv-ws-box">
                                <span>Pacientes diagnosticados.</span>
                                <strong>27</strong>
                            </div>
                        </div>
                    </div>

                    {/* Donut chart - Señales */}
                    <div className="dv-signals-card">
                        <h4>Señales detectadas por la IA (Resumen general)</h4>
                        <div className="dv-donut-row">
                            <div className="dv-donut-wrap">
                                <svg viewBox="0 0 100 100" className="dv-donut-svg">
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#e2e8f0" strokeWidth="10" />
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#0ea5a4" strokeWidth="10"
                                        strokeDasharray="124 239" strokeLinecap="round"
                                        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="10"
                                        strokeDasharray="54 239" strokeDashoffset="-124"
                                        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="10"
                                        strokeDasharray="33 239" strokeDashoffset="-178"
                                        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                                    <circle cx="50" cy="50" r="38" fill="none" stroke="#94a3b8" strokeWidth="10"
                                        strokeDasharray="27 239" strokeDashoffset="-211"
                                        style={{ transform: "rotate(-90deg)", transformOrigin: "center" }} />
                                </svg>
                            </div>
                            <div className="dv-donut-legend">
                                <div><span className="dv-dot" style={{ background: "#0ea5a4" }}></span> Señales leves <b>52.1%</b></div>
                                <div><span className="dv-dot" style={{ background: "#f59e0b" }}></span> Señales altas <b>22.8%</b></div>
                                <div><span className="dv-dot" style={{ background: "#3b82f6" }}></span> Señales moderadas <b>13.9%</b></div>
                                <div><span className="dv-dot" style={{ background: "#94a3b8" }}></span> Señales nulas <b>11.2%</b></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="dv-bottom-row">
                    {/* Cases */}
                    <div className="dv-cases-card">
                        <div className="dv-cases-header">
                            <h4>Casos listos para revisión humana</h4>
                            <span className="dv-filter-tag">Filtrar por riesgo ▾</span>
                        </div>
                        <div className="dv-case-list">
                            <div className="dv-case-item">
                                <div className="dv-case-avatar">CF</div>
                                <span>Chris Friedly</span>
                            </div>
                            <div className="dv-case-item highlight">
                                <div className="dv-case-avatar">MJ</div>
                                <span>Maggie Johnson</span>
                            </div>
                            <div className="dv-case-item">
                                <div className="dv-case-avatar">GH</div>
                                <span>Gael Harry</span>
                            </div>
                            <div className="dv-case-item">
                                <div className="dv-case-avatar">JS</div>
                                <span>Jenna Sullivan</span>
                            </div>
                        </div>
                    </div>

                    {/* Bar chart */}
                    <div className="dv-freq-card">
                        <h4>Frecuencia de Comportamientos detectados</h4>
                        <div className="dv-bar-chart">
                            <div className="dv-bar-group">
                                <div className="dv-bar-wrapper">
                                    <div className="dv-bar" style={{ height: "55%" }}></div>
                                    <div className="dv-bar b2" style={{ height: "40%" }}></div>
                                    <div className="dv-bar b3" style={{ height: "65%" }}></div>
                                </div>
                                <span>Social</span>
                            </div>
                            <div className="dv-bar-group">
                                <div className="dv-bar-wrapper">
                                    <div className="dv-bar" style={{ height: "70%" }}></div>
                                    <div className="dv-bar b2" style={{ height: "50%" }}></div>
                                    <div className="dv-bar b3" style={{ height: "35%" }}></div>
                                </div>
                                <span>Visual</span>
                            </div>
                            <div className="dv-bar-group">
                                <div className="dv-bar-wrapper">
                                    <div className="dv-bar" style={{ height: "45%" }}></div>
                                    <div className="dv-bar b2" style={{ height: "60%" }}></div>
                                    <div className="dv-bar b3" style={{ height: "75%" }}></div>
                                </div>
                                <span>Movimientos Repetitivos</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MINI TABLES ROW */}
                <div className="dv-mini-row">
                    <div className="dv-mini-card">
                        <div className="dv-mini-header">
                            <h4>Citas próximas</h4>
                            <span>Filtrar por mes ▾</span>
                        </div>
                        <div className="dv-mini-item"><span className="dv-mini-dot"></span> Maggie Johnson <small>21 DIC 1:30 PM</small></div>
                        <div className="dv-mini-item"><span className="dv-mini-dot"></span> Gael Harry <small>22 DIC 11:21 PM</small></div>
                    </div>
                    <div className="dv-mini-card">
                        <div className="dv-mini-header">
                            <h4>Reportes generados</h4>
                            <span>Filtrar por mes ▾</span>
                        </div>
                        <div className="dv-mini-item"><span className="dv-mini-dot"></span> Maggie Johnson <small>21 DIC 7:29 PM</small></div>
                        <div className="dv-mini-item"><span className="dv-mini-dot"></span> Gael Harry <small>23 DIC 13:21 PM</small></div>
                    </div>
                </div>
            </div>
        </PlatformFrame>
    );
};

export default DashboardView;