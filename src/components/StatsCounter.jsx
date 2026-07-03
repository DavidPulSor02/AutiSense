import { useEffect, useState } from 'react';
import './StatsCounter.css';

const stats = [
  { value: 38, suffix: '+', label: 'médicos expertos' },
  { value: 92, suffix: '%', label: 'más claridad operativa' },
  { value: 24, suffix: 'h', label: 'de tiempo ahorrado' }
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    let frameId;
    const duration = 1400;
    const startTime = performance.now();

    const animate = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(stats.map((item) => Math.round(item.value * eased)));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="stats-counter" id="stats">
      <div className="stats-shell">
        <div className="stats-header">
          <span className="stats-kicker">Impacto medible</span>
          <h2>Resultados que se traducen en mejor atención</h2>
        </div>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <div className="stat-card" key={item.label}>
              <strong>
                {counts[index]}
                {item.suffix}
              </strong>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
