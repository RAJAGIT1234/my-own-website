import React from "react";
import "../styles/Address.css";
import { FaMapMarkerAlt, FaEnvelope, FaCheckCircle, FaCompass, FaCity } from "react-icons/fa";

export default function Address() {
  const addressDetails = {
    present: {
      location: "Indore, Madhya Pradesh, India",
      status: "Working at Advantal Technologies",
      mobility: "Open to Relocate (Pan-India / Hybrid / Remote)",
      email: "durgashankarpatra457@gmail.com"
    },
    permanent: {
      address: "Kathasagada, Badas, Balasore, Odisha, 756083",
      city: "Balasore",
      state: "Odisha",
      country: "India",
      pin: "756083",
    }
  };

  return (
    <div className="address-container">
      <div className="address-header">
        <div className="address-badge-pill">
          <FaCompass /> Geographic Presence
        </div>
        <h1>🏠 Location & Address Details</h1>
        <p className="address-tagline">Current work location, relocation availability & permanent residence</p>
      </div>

      <div className="address-cards-grid">
        {/* Present Location */}
        <div className="address-card">
          <div className="address-card-header">
            <span className="card-tag present-tag">Present Work Location</span>
            <h2>Indore, Madhya Pradesh</h2>
          </div>
          <div className="address-body">
            <p><strong><FaMapMarkerAlt /> City & State:</strong> {addressDetails.present.location}</p>
            <p><strong><FaCheckCircle style={{ color: "#10b981" }} /> Status:</strong> {addressDetails.present.status}</p>
            <p><strong><FaCheckCircle style={{ color: "#818cf8" }} /> Mobility:</strong> {addressDetails.present.mobility}</p>
            <p>
              <strong><FaEnvelope /> Email:</strong>{" "}
              <a href={`mailto:${addressDetails.present.email}`}>{addressDetails.present.email}</a>
            </p>
          </div>
        </div>

        {/* Permanent Location */}
        <div className="address-card">
          <div className="address-card-header">
            <span className="card-tag permanent-tag">Permanent Residence</span>
            <h2>Balasore, Odisha</h2>
          </div>
          <div className="address-body">
            <p><strong><FaMapMarkerAlt /> Address:</strong> {addressDetails.permanent.address}</p>
            <p><strong><FaCity /> City:</strong> {addressDetails.permanent.city}</p>
            <p><strong>State:</strong> {addressDetails.permanent.state}</p>
            <p><strong>Country:</strong> {addressDetails.permanent.country}</p>
            <p><strong>PIN Code:</strong> {addressDetails.permanent.pin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
