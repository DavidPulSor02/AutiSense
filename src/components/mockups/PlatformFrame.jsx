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

import AutiSenseLogo from "../AutiSenseLogo.jsx";

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
                        <AutiSenseLogo size={32} />
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
