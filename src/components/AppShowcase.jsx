import React, { useState, useEffect } from 'react';
import './AppShowcase.css';
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from 'recharts';

const Icons = {
    Dashboard: () => <span className="text-2xl">📊</span>,
    Resources: () => <span className="text-2xl">📚</span>,
    Report: () => <span className="text-2xl">📝</span>,
    Calendar: () => <span className="text-2xl">📅</span>,
};

// --- Screen Components ---

const StatusHeader = ({ title, showBack = true, showMenu = true }) => (
    <div className="phone-header">
        {showBack ? (
            <button className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
        ) : <div className="w-5" />}
        <h3 className="header-title">{title}</h3>
        {showMenu ? (
            <button className="icon-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
            </button>
        ) : <div className="w-5" />}
    </div>
);

const BottomNav = () => (
    <div className="phone-bottom-nav">
        <div className="nav-item active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span>Dashboard</span>
        </div>
        <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <span>Recursos</span>
        </div>
        <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>Reportes</span>
        </div>
        <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Citas</span>
        </div>
    </div>
);

const DashboardScreen = () => {
    const data = [
        { name: '10', value: 30 },
        { name: '10', value: 50 },
        { name: '10', value: 25 },
        { name: '50', value: 65 },
        { name: '70', value: 45 },
        { name: '200', value: 80 },
        { name: '180', value: 60 },
    ];

    return (
        <div className="phone-screen-inner dashboard-theme">
            <StatusHeader title="Monitoreo en Tiempo Real" />

            <div className="content-scroll">
                <div className="main-stats-card">
                    <div className="stats-header">
                        <span>Progreso General</span>
                        <button className="icon-xs">🖨️</button>
                    </div>
                    <div className="stats-value">75%</div>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={120}>
                            <LineChart data={data}>
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#fff"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#fff' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="info-grid">
                    <div className="info-card">
                        <span className="info-label">Última evaluación</span>
                        <span className="info-date">20 Mar, 2024</span>
                    </div>
                    <div className="info-card">
                        <span className="info-label">Análisis IA</span>
                        <span className="info-sub">Patrones identificados</span>
                    </div>
                </div>

                <div className="list-section">
                    <div className="list-item">
                        <div className="item-icon bg-orange-100 text-orange-500">🧩</div>
                        <div className="item-content">
                            <h4>Análisis de Desarrollo General</h4>
                            <p>20 Mar 2024 10:00 AM</p>
                        </div>
                        <div className="item-action">📄</div>
                    </div>
                    <div className="list-item">
                        <div className="item-icon bg-green-100 text-green-500">🧠</div>
                        <div className="item-content">
                            <h4>Actividades Apoyo</h4>
                            <p>Patrones identificados</p>
                        </div>
                        <div className="item-action">🧠</div>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

const ResourcesScreen = () => (
    <div className="phone-screen-inner resources-theme">
        <StatusHeader title="Biblioteca de Recursos" showMenu={false} showBack={true} />
        <div className="top-actions">
            <button className="tab-pill active">Explorar Recursos</button>
            <button className="tab-pill">Mis favoritos</button>
        </div>

        <div className="content-scroll">
            <div className="hero-card">
                <div className="book-icon">📖</div>
                <button className="hero-btn">Ver Reporte Completo</button>
            </div>

            <div className="resource-list">
                <div className="resource-card">
                    <div className="res-icon bg-green-50 text-green-600">📝</div>
                    <div className="res-content">
                        <h4>Guías para Padres</h4>
                        <span className="date">20 Mar, 2024</span>
                        <p>Visión, mitos, consejos sobre el autismo y estrategias educativas.</p>
                    </div>
                    <button className="action-btn-sm orange">Ver</button>
                </div>

                <div className="resource-card">
                    <div className="res-icon bg-blue-50 text-blue-600">📊</div>
                    <div className="res-content">
                        <h4>Mitos y realidades sobre...</h4>
                        <span className="date">20 Mar, 2024 10:09 AM</span>
                        <p>Resumen breve sobre el autismo y sus datos básicos.</p>
                    </div>
                    <button className="action-btn-sm orange">Ver</button>
                </div>
            </div>

            <div className="section-title">Próximas Citas</div>
            {/* Mock next item to fill space */}
            <div className="resource-card compact">
                <div className="res-icon bg-red-50 text-red-500">🏥</div>
                <div className="res-content">
                    <h4>Evaluación de Dislexia</h4>
                    <span className="date">20 Mar, 2024 - 10:00 AM</span>
                </div>
                <button className="action-btn-sm orange">Ver</button>
            </div>

        </div>
        <BottomNav />
    </div>
);

const CalendarScreen = () => {
    const days = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <div className="phone-screen-inner calendar-theme">
            <StatusHeader title="Gestión de Citas" />

            <div className="content-scroll">
                <div className="calendar-widget">
                    <div className="cal-header">
                        <span>Marzo 2024</span>
                        <button className="icon-xs">📅</button>
                    </div>
                    <div className="cal-grid">
                        <div className="cal-day-name">S</div>
                        <div className="cal-day-name">M</div>
                        <div className="cal-day-name">T</div>
                        <div className="cal-day-name">W</div>
                        <div className="cal-day-name">T</div>
                        <div className="cal-day-name">F</div>
                        <div className="cal-day-name">S</div>
                        {/* Empty slots for offset */}
                        <div></div><div></div><div></div><div></div><div></div>
                        {days.slice(0, 14).map(d => (
                            <div key={d} className={`cal-day ${d === 10 ? 'selected' : ''} ${d === 15 || d === 19 ? 'marker' : ''}`}>
                                {d}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="section-title-lg">Gestión de Citas</div>

                <div className="calendar-list">
                    <div className="calendar-row">
                        <div className="cal-time-col">
                            <div className="time-bubble">15</div>
                            <div className="time-sub">23</div>
                        </div>
                        <div className="cal-events-col">
                            <div className="cal-event-card">
                                <div className="cal-icon bg-green-100 text-green-600">🩺</div>
                                <div className="cal-details">
                                    <h4>Dr. Ana Pérez (Pediatra)</h4>
                                    <span>20 Mar 2024 - 10:30 AM</span>
                                </div>
                                <button className="btn-blue-sm">Ver</button>
                            </div>
                            <div className="cal-event-card">
                                <div className="cal-icon bg-orange-100 text-orange-600">🧩</div>
                                <div className="cal-details">
                                    <h4>Terapia Ocupacional</h4>
                                    <span>20 Mar 2024 - 09:50 AM</span>
                                </div>
                                <button className="btn-blue-sm">Ver</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    );
};


const screens = [
    {
        id: 'dashboard',
        title: 'Monitorización en Tiempo Real',
        description: 'Accede a un panel intuitivo con el progreso de las evaluaciones y análisis IA.',
        icon: Icons.Dashboard,
        Component: DashboardScreen
    },
    {
        id: 'resources',
        title: 'Biblioteca de Recursos',
        description: 'Guías, mitos y realidades sobre el autismo al alcance de tu mano.',
        icon: Icons.Resources,
        Component: ResourcesScreen
    },
    {
        id: 'calendar',
        title: 'Gestión de Citas',
        description: 'Organiza evaluaciones y consultas con especialistas fácilmente.',
        icon: Icons.Calendar,
        Component: CalendarScreen
    }
];

const AppShowcase = () => {

    const [activeScreen, setActiveScreen] = useState(screens[0]);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    // Auto demo
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveScreen(prev => {
                const index = screens.findIndex(s => s.id === prev.id);
                return screens[(index + 1) % screens.length];
            });
        }, 5000); // 5 seconds for better reading time

        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientY - top - height / 2) / 25;
        const y = (e.clientX - left - width / 2) / 25;
        setRotate({ x: -x, y: y });
    };

    const ActiveComponent = activeScreen.Component;

    return (
        <section className="app-showcase-section" id="showcase">
            <div className="showcase-container">

                {/* TEXT SIDE */}
                <div className="showcase-content">
                    <h2 className="showcase-title">
                        Tu Compañero Integral en el Desarrollo
                    </h2>
                    <p className="showcase-description">
                        AutiSense simplifica el seguimiento y la detección temprana con una interfaz amigable diseñada para padres y especialistas.
                    </p>

                    <div className="feature-tabs">
                        {screens.map((screen) => (
                            <div
                                key={screen.id}
                                className={`feature-tab ${activeScreen.id === screen.id ? 'active' : ''}`}
                                onClick={() => setActiveScreen(screen)}
                            >
                                <div className="tab-icon">
                                    <screen.icon />
                                </div>
                                <div className="tab-info">
                                    <h3>{screen.title}</h3>
                                    <p>{screen.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PHONE SIDE */}
                <div className="phone-frame-wrapper">

                    <motion.div
                        className="phone-frame"
                        animate={{
                            rotateX: rotate.x,
                            rotateY: rotate.y
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 15 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setRotate({ x: 0, y: 0 })}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >

                        <div className="phone-notch"></div>

                        <div className="screen-content">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeScreen.id}
                                    className="app-screen"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {/* Render dynamic component instead of image */}
                                    <ActiveComponent />
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default AppShowcase;
