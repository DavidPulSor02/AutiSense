import React, { useState, useEffect } from 'react';
import './AppShowcase.css';
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import {
    BarChart3,
    BookOpen,
    FileText,
    CalendarDays,
    Printer,
    Puzzle,
    FileBarChart,
    Brain,
    Stethoscope,
    Hospital,
    ChevronLeft,
    MoreHorizontal,
    Home,
    Search,
    ArrowRight,
    Sparkles,
    TrendingUp,
    Shield
} from 'lucide-react';

// --- Screen Components ---

const StatusHeader = ({ title, showBack = true, showMenu = true }) => (
    <div className="phone-header">
        {showBack ? (
            <button className="icon-btn">
                <ChevronLeft size={20} />
            </button>
        ) : <div className="w-5" />}
        <h3 className="header-title">{title}</h3>
        {showMenu ? (
            <button className="icon-btn">
                <MoreHorizontal size={20} />
            </button>
        ) : <div className="w-5" />}
    </div>
);

const BottomNav = () => (
    <div className="phone-bottom-nav">
        <div className="nav-item active">
            <Home size={20} />
            <span>Dashboard</span>
        </div>
        <div className="nav-item">
            <Search size={20} />
            <span>Recursos</span>
        </div>
        <div className="nav-item">
            <FileText size={20} />
            <span>Reportes</span>
        </div>
        <div className="nav-item">
            <CalendarDays size={20} />
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
                        <button className="icon-xs"><Printer size={16} color="#93c5fd" /></button>
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
                        <div className="item-icon bg-orange-100 text-orange-500">
                            <Puzzle size={20} />
                        </div>
                        <div className="item-content">
                            <h4>Análisis de Desarrollo General</h4>
                            <p>20 Mar 2024 10:00 AM</p>
                        </div>
                        <div className="item-action"><FileBarChart size={18} color="#94a3b8" /></div>
                    </div>
                    <div className="list-item">
                        <div className="item-icon bg-green-100 text-green-500">
                            <Brain size={20} />
                        </div>
                        <div className="item-content">
                            <h4>Actividades Apoyo</h4>
                            <p>Patrones identificados</p>
                        </div>
                        <div className="item-action"><Brain size={18} color="#94a3b8" /></div>
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
                <div className="book-icon"><BookOpen size={28} color="#8b5cf6" /></div>
                <button className="hero-btn">Ver Reporte Completo</button>
            </div>

            <div className="resource-list">
                <div className="resource-card">
                    <div className="res-icon bg-green-50 text-green-600">
                        <FileText size={22} />
                    </div>
                    <div className="res-content">
                        <h4>Guías para Padres</h4>
                        <span className="date">20 Mar, 2024</span>
                        <p>Visión, mitos, consejos sobre el autismo y estrategias educativas.</p>
                    </div>
                    <button className="action-btn-sm orange">Ver</button>
                </div>

                <div className="resource-card">
                    <div className="res-icon bg-blue-50 text-blue-600">
                        <BarChart3 size={22} />
                    </div>
                    <div className="res-content">
                        <h4>Mitos y realidades sobre...</h4>
                        <span className="date">20 Mar, 2024 10:09 AM</span>
                        <p>Resumen breve sobre el autismo y sus datos básicos.</p>
                    </div>
                    <button className="action-btn-sm orange">Ver</button>
                </div>
            </div>

            <div className="section-title">Próximas Citas</div>
            <div className="resource-card compact">
                <div className="res-icon bg-red-50 text-red-500">
                    <Hospital size={20} />
                </div>
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
                        <button className="icon-xs"><CalendarDays size={16} color="#3b82f6" /></button>
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
                                <div className="cal-icon bg-green-100 text-green-600">
                                    <Stethoscope size={18} />
                                </div>
                                <div className="cal-details">
                                    <h4>Dr. Ana Pérez (Pediatra)</h4>
                                    <span>20 Mar 2024 - 10:30 AM</span>
                                </div>
                                <button className="btn-blue-sm">Ver</button>
                            </div>
                            <div className="cal-event-card">
                                <div className="cal-icon bg-orange-100 text-orange-600">
                                    <Puzzle size={18} />
                                </div>
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
        icon: BarChart3,
        accent: '#3b82f6',
        Component: DashboardScreen
    },
    {
        id: 'resources',
        title: 'Biblioteca de Recursos',
        description: 'Guías, mitos y realidades sobre el autismo al alcance de tu mano.',
        icon: BookOpen,
        accent: '#8b5cf6',
        Component: ResourcesScreen
    },
    {
        id: 'calendar',
        title: 'Gestión de Citas',
        description: 'Organiza evaluaciones y consultas con especialistas fácilmente.',
        icon: CalendarDays,
        accent: '#10b981',
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
        }, 5000);

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

                {/* TEXT SIDE — Redesigned */}
                <div className="showcase-content">
                    <motion.div
                        className="showcase-badge"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles size={14} />
                        <span>Explora la Plataforma</span>
                    </motion.div>

                    <motion.h2
                        className="showcase-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Tu Compañero Integral <br />
                        en el <span className="showcase-highlight">Desarrollo</span>
                    </motion.h2>

                    <motion.p
                        className="showcase-description"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        AutiSense simplifica el seguimiento y la detección temprana con una interfaz amigable diseñada para padres y especialistas.
                    </motion.p>

                    {/* Stats row */}
                    <motion.div
                        className="showcase-stats"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                    >
                        <div className="stat-item">
                            <TrendingUp size={18} className="stat-icon" />
                            <div>
                                <span className="stat-number">+85%</span>
                                <span className="stat-label">Precisión IA</span>
                            </div>
                        </div>
                        <div className="stat-divider" />
                        <div className="stat-item">
                            <Shield size={18} className="stat-icon" />
                            <div>
                                <span className="stat-number">100%</span>
                                <span className="stat-label">Datos Seguros</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Feature tabs */}
                    <div className="feature-tabs">
                        {screens.map((screen, i) => {
                            const Icon = screen.icon;
                            const isActive = activeScreen.id === screen.id;
                            return (
                                <motion.div
                                    key={screen.id}
                                    className={`feature-tab ${isActive ? 'active' : ''}`}
                                    onClick={() => setActiveScreen(screen)}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                >
                                    <div className="tab-icon" style={isActive ? { background: `${screen.accent}33` } : {}}>
                                        <Icon size={22} color={isActive ? '#fff' : screen.accent} />
                                    </div>
                                    <div className="tab-info">
                                        <h3>{screen.title}</h3>
                                        <p>{screen.description}</p>
                                    </div>
                                    <ArrowRight
                                        size={16}
                                        className={`tab-arrow ${isActive ? 'visible' : ''}`}
                                    />
                                </motion.div>
                            );
                        })}
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
