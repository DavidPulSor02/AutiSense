import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { HiShieldCheck, HiLockClosed, HiCpuChip, HiDocumentCheck } from "react-icons/hi2";
import "./SecurityPrivacy.css";

const FEATURES = [
    {
        title: "Almacenamiento seguro",
        text: "Infraestructura certificada con estándares ISO 27001, SOC 2 y buenas prácticas en resguardo de información sensible.",
        icon: <HiShieldCheck />,
        codeTag: "ISO_27001 / SOC_2",
        color: "blue"
    },
    {
        title: "Cifrado avanzado",
        text: "Los videos y datos se cifran de extremo a extremo durante la carga, análisis y almacenamiento.",
        icon: <HiLockClosed />,
        codeTag: "AES_256 / E2EE",
        color: "cyan"
    },
    {
        title: "IA ética y no invasiva",
        text: "Analiza conductas, no identidades. Sin reconocimiento facial ni biometría.",
        icon: <HiCpuChip />,
        codeTag: "ETHICAL_AI / PRIVACY_FIRST",
        color: "blue"
    },
    {
        title: "Cumplimiento normativo",
        text: "Cumple con HIPAA, Ley Federal de Protección de Datos (México) y normativas sobre datos infantiles.",
        icon: <HiDocumentCheck />,
        codeTag: "HIPAA / GDPR_COMPLIANT",
        color: "cyan"
    }
];

const SCANNER_X_RATIO = 0.35; // 35% from left

const SecurityPrivacy = () => {
    const particleCanvasRef = useRef(null);
    const scannerCanvasRef = useRef(null);
    const cardLineRef = useRef(null);
    const cardStreamRef = useRef(null);
    const [speed] = useState(60);
    const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'light');

    // Interaction states
    const isDraggingRef = useRef(false);
    const startXRef = useRef(0);
    const scrollLeftRef = useRef(0);
    const positionRef = useRef(0);

    // ASCII generation logic
    const generateCode = useCallback((width, height) => {
        const library = [
            "const SCAN_WIDTH = 8;", "const FADE_ZONE = 35;", "const MAX_PARTICLES = 2500;",
            "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
            "const state = { intensity: 1.2, particles: MAX_PARTICLES };",
            "// compiled preview • scanner demo", "/* secure data stream */",
            "import { security } from '@autisense/core';", "await vault.encrypt(data);"
        ];
        let flow = library.join(" ");
        const totalChars = width * height;
        while (flow.length < totalChars) {
            flow += " " + library[Math.floor(Math.random() * library.length)];
        }
        let out = "";
        for (let row = 0; row < height; row++) {
            out += flow.slice(row * width, (row + 1) * width) + "\n";
        }
        return out;
    }, []);

    // Theme detection
    useEffect(() => {
        const observer = new MutationObserver(() => {
            setTheme(document.documentElement.getAttribute('data-theme') || 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        // --- Particle System (Three.js) ---
        const particleCanvas = particleCanvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(
            -window.innerWidth / 2, window.innerWidth / 2, 125, -125, 1, 1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({ canvas: particleCanvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, 250);

        const createParticles = () => {
            const count = 500;
            const geo = new THREE.BufferGeometry();
            const pos = new Float32Array(count * 3);
            const alphas = new Float32Array(count);
            const vels = [];
            const life = new Float32Array(count);

            for (let i = 0; i < count; i++) {
                pos[i * 3] = 0;
                pos[i * 3 + 1] = 0;
                pos[i * 3 + 2] = 0;
                alphas[i] = 0;
                vels.push({
                    x: Math.random() * 3 + 1,
                    y: (Math.random() - 0.5) * 2.5
                });
                life[i] = Math.random();
            }
            geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            geo.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

            // Particle color depends on theme
            const particleColor = theme === 'dark' ? 0xa855f7 : 0x7e22ce;

            const mat = new THREE.ShaderMaterial({
                transparent: true,
                uniforms: {
                    color: { value: new THREE.Color(particleColor) }
                },
                vertexShader: `
                    attribute float alpha;
                    varying float vAlpha;
                    void main() {
                        vAlpha = alpha;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = 2.5 * (1.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    uniform vec3 color;
                    varying float vAlpha;
                    void main() {
                        if (length(gl_PointCoord - vec2(0.5)) > 0.5) discard;
                        gl_FragColor = vec4(color, vAlpha);
                    }
                `,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const points = new THREE.Points(geo, mat);
            scene.add(points);
            return { points, vels, life };
        };

        const { points, vels, life } = createParticles();

        const animateParticles = () => {
            const positions = points.geometry.attributes.position.array;
            const alphas = points.geometry.attributes.alpha.array;
            const scannerX = (window.innerWidth * SCANNER_X_RATIO) - (window.innerWidth / 2);

            for (let i = 0; i < vels.length; i++) {
                if (scanActive) {
                    life[i] -= 0.012;
                    if (life[i] <= 0) {
                        life[i] = 1.0;
                        positions[i * 3] = scannerX + (Math.random() - 0.5) * 8;
                        positions[i * 3 + 1] = (Math.random() - 0.5) * 270;
                    }
                    positions[i * 3] += vels[i].x;
                    positions[i * 3 + 1] += vels[i].y;
                    alphas[i] = life[i] * 0.9;
                } else {
                    alphas[i] *= 0.85; // Rapid fade out when inactive
                    if (alphas[i] < 0.01) alphas[i] = 0;
                }
            }
            points.geometry.attributes.position.needsUpdate = true;
            points.geometry.attributes.alpha.needsUpdate = true;
            renderer.render(scene, camera);
        };

        // --- Scanner Logic (Canvas) ---
        const scannerCanvas = scannerCanvasRef.current;
        const ctx = scannerCanvas.getContext("2d");
        let scanActive = false;

        const renderScanner = () => {
            ctx.clearRect(0, 0, scannerCanvas.width, scannerCanvas.height);
            const scannerX = scannerCanvas.width * SCANNER_X_RATIO;

            const isDark = theme === 'dark';
            const laserColor = isDark ? "rgba(168, 85, 247, 0.7)" : "rgba(126, 34, 206, 0.6)";
            const glowColor = isDark ? "rgba(168, 85, 247, 0.4)" : "rgba(126, 34, 206, 0.3)";

            const grad = ctx.createLinearGradient(scannerX - 4, 0, scannerX + 4, 0);
            grad.addColorStop(0, "transparent");
            grad.addColorStop(0.5, scanActive ? laserColor : (isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"));
            grad.addColorStop(1, "transparent");

            ctx.fillStyle = grad;
            ctx.fillRect(scannerX - 4, 0, 8, scannerCanvas.height);

            if (scanActive) {
                ctx.shadowBlur = isDark ? 40 : 25;
                ctx.shadowColor = glowColor;
                ctx.fillStyle = glowColor;
                ctx.fillRect(scannerX - 0.5, 0, 1, scannerCanvas.height);
                ctx.shadowBlur = 0;
            }
        };

        // --- Card Stream Loop ---
        const cardLine = cardLineRef.current;

        const updateClipping = () => {
            const scannerX = window.innerWidth * SCANNER_X_RATIO;
            const cards = cardLine.querySelectorAll(".card-wrapper");
            let isAnyScanned = false;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardWidth = rect.width;

                const normal = card.querySelector(".card-normal");
                const ascii = card.querySelector(".card-ascii");

                if (rect.left < scannerX + 5 && rect.right > scannerX - 5) {
                    isAnyScanned = true;
                    const intersect = Math.max(0, scannerX - rect.left);
                    const clipPercent = (intersect / cardWidth) * 100;
                    normal.style.setProperty("--clip-right", `${clipPercent}%`);
                    ascii.style.setProperty("--clip-left", `${clipPercent}%`);
                } else {
                    if (rect.right < scannerX) {
                        normal.style.setProperty("--clip-right", "100%");
                        ascii.style.setProperty("--clip-left", "100%");
                    } else {
                        normal.style.setProperty("--clip-right", "0%");
                        ascii.style.setProperty("--clip-left", "0%");
                    }
                }
            });
            scanActive = isAnyScanned;
        };

        const loop = () => {
            const oneSetWidth = cardLine.scrollWidth / 3;

            if (!isDraggingRef.current) {
                positionRef.current -= speed * 0.016;
            }

            // Seamless wrap-around logic for both directions
            if (positionRef.current <= -oneSetWidth * 2) {
                positionRef.current += oneSetWidth;
            } else if (positionRef.current >= -oneSetWidth / 2) {
                positionRef.current -= oneSetWidth;
            }

            cardLine.style.transform = `translateX(${positionRef.current}px)`;

            animateParticles();
            renderScanner();
            updateClipping();
            requestAnimationFrame(loop);
        };

        const animationId = requestAnimationFrame(loop);

        const handleResize = () => {
            renderer.setSize(window.innerWidth, 250);
            scannerCanvas.width = window.innerWidth;
            scannerCanvas.height = 300;
        };
        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
        };
    }, [speed, theme]);

    // Drag Interaction Handlers
    const handleMouseDown = (e) => {
        isDraggingRef.current = true;
        startXRef.current = e.pageX;
        scrollLeftRef.current = positionRef.current;
        cardStreamRef.current.classList.add('grabbing');
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;
        const x = e.pageX;
        const walk = (x - startXRef.current) * 1.5;
        positionRef.current = scrollLeftRef.current + walk;
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        cardStreamRef.current.classList.remove('grabbing');
    };

    return (
        <section id="security" className="security-evervault-section">
            <div className="security-header-compact">
                <h2>Seguridad & <span>Privacidad</span></h2>
                <p>Nuestra infraestructura está diseñada para proteger cada byte de información.</p>
            </div>

            <div className="evervault-container">
                <canvas ref={particleCanvasRef} className="particle-canvas"></canvas>
                <canvas ref={scannerCanvasRef} className="scanner-canvas"></canvas>

                <div
                    className="card-stream"
                    ref={cardStreamRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div className="card-line" ref={cardLineRef}>
                        {[...FEATURES, ...FEATURES, ...FEATURES].map((f, i) => (
                            <div key={i} className="card-wrapper">
                                <div className={`card card-normal ${f.color}`}>
                                    <div className="card-glass-glow"></div>
                                    <div className="card-content-box">
                                        <div className="card-icon-box">{f.icon}</div>
                                        <h3>{f.title}</h3>
                                        <p>{f.text}</p>
                                        <div className="card-tag">{f.codeTag}</div>
                                    </div>
                                </div>
                                <div className="card card-ascii">
                                    <div className="ascii-content">
                                        {generateCode(60, 20)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="evervault-footer">
                <p>Infraestructura global con estándares de seguridad HIPAA y ISO 27001.</p>
            </div>
        </section>
    );
};

export default SecurityPrivacy;
