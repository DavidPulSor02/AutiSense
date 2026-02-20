import React from "react";
import "./PlatformFrame.css";
import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineDocumentReport,
    HiOutlineChartBar,
    HiOutlineSearch,
    HiOutlineBell,
    HiOutlineCog,
    HiOutlineQuestionMarkCircle
} from "react-icons/hi";

const navItems = [
    { id: "dashboard", label: "Dashboard", icon: HiOutlineHome },
    { id: "pacientes", label: "Pacientes", icon: HiOutlineUsers },
    { id: "reportes", label: "Reportes", icon: HiOutlineDocumentReport },
    { id: "analisis", label: "Análisis", icon: HiOutlineChartBar },
];

export default function PlatformFrame({ activeItem, children }) {
    return (
        <div className="pf-frame">
            {/* SIDEBAR */}
            <aside className="pf-sidebar">
                <div className="pf-logo-area">
                    <div className="pf-logo-circle">
                        <svg viewBox="0 0 40 40" className="pf-logo-svg">
                            <circle cx="20" cy="20" r="18" fill="none" stroke="#4dd0e1" strokeWidth="2" />
                            <circle cx="20" cy="20" r="12" fill="none" stroke="#80cbc4" strokeWidth="1.5" />
                            <circle cx="20" cy="14" r="3" fill="#e91e63" />
                            <circle cx="14" cy="23" r="2.5" fill="#ff9800" />
                            <circle cx="26" cy="23" r="2.5" fill="#4caf50" />
                            <circle cx="20" cy="20" r="2" fill="#2196f3" />
                        </svg>
                    </div>
                    <span className="pf-logo-text">Autisense</span>
                </div>

                <nav className="pf-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className={`pf-nav-item ${activeItem === item.id ? "active" : ""}`}
                            >
                                <Icon className="pf-nav-icon" />
                                <span>{item.label}</span>
                            </div>
                        );
                    })}
                </nav>

                <div className="pf-sidebar-bottom">
                    <HiOutlineQuestionMarkCircle className="pf-nav-icon" />
                    <span>Ayuda</span>
                </div>
            </aside>

            {/* MAIN AREA */}
            <div className="pf-main">
                {/* TOPBAR */}
                <header className="pf-topbar">
                    <div className="pf-search-box">
                        <HiOutlineSearch className="pf-search-icon" />
                        <span>Buscar</span>
                    </div>
                    <div className="pf-topbar-actions">
                        <div className="pf-avatar-sm"></div>
                        <div className="pf-notif-icon">
                            <HiOutlineBell />
                            <span className="pf-notif-dot"></span>
                        </div>
                        <HiOutlineCog className="pf-action-icon" />
                    </div>
                </header>

                {/* CONTENT */}
                <div className="pf-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
