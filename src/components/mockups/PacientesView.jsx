import React from "react";
import "./PacientesView.css";
import PlatformFrame from "./PlatformFrame";

const patients = [
    { name: "Ximena Rodríguez López", tutor: "Juan Martínez", phone: "554-123-7789", email: "juan.perez.demo@gmail.com", risk: "Moderado", riskColor: "#f59e0b" },
    { name: "Emiliano Hernández García", tutor: "Cell Text", phone: "561-840-9921", email: "maria.lopez.test@outlook.com", risk: "Alto", riskColor: "#ef4444" },
    { name: "Itzel Martínez Torres", tutor: "Cell Text", phone: "222-745-3180", email: "carlos.ramirez.fake@yahoo.com", risk: "Bajo", riskColor: "#22c55e" },
    { name: "Gael Sánchez Rivera", tutor: "Cell Text", phone: "333-928-4407", email: "sofia.garcia.sample@protonmail.com", risk: "Nulo", riskColor: "#94a3b8" },
    { name: "Citlali Ramírez Morales", tutor: "Cell Text", phone: "444-610-5532", email: "andres.torres.mock@icloud.com", risk: "Alto", riskColor: "#ef4444" },
    { name: "Mariana Gómez Ortega", tutor: "Cell Text", phone: "229-374-8890", email: "paola.mendoza.prueba@live.com", risk: "Moderado", riskColor: "#f59e0b" },
    { name: "Diego Castillo Vargas", tutor: "Cell Text", phone: "664-592-1043", email: "ricardo.santos.dummy@zoho.com", risk: "Bajo", riskColor: "#22c55e" },
];

const PatientsView = () => {
    return (
        <PlatformFrame activeItem="pacientes">
            <div className="pv-content">
                {/* Add Button */}
                <button className="pv-add-btn">+Agregar paciente</button>

                {/* Table */}
                <div className="pv-table-wrapper">
                    <table className="pv-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Paciente ↓</th>
                                <th>Tutor</th>
                                <th>Contacto</th>
                                <th>Correo Electrónico</th>
                                <th>Cita</th>
                                <th>Riesgo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((p, i) => (
                                <tr key={i}>
                                    <td><input type="checkbox" className="pv-check" readOnly /></td>
                                    <td className="pv-name">{p.name}</td>
                                    <td>{p.tutor}</td>
                                    <td>{p.phone}</td>
                                    <td className="pv-email">{p.email}</td>
                                    <td><span className="pv-cal-icon">📅</span></td>
                                    <td>
                                        <span
                                            className="pv-risk-badge"
                                            style={{ background: `${p.riskColor}18`, color: p.riskColor, borderColor: `${p.riskColor}40` }}
                                        >
                                            {p.risk}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </PlatformFrame>
    );
};

export default PatientsView;