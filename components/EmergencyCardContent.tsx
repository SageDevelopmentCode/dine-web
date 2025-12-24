"use client";

import { COLORS } from "@/constants/colors";
import type {
  UserEmergencyCard,
  UserEmergencyCardContact,
  UserEmergencyCardDoctor,
  UserEmergencyCardHospital,
} from "@/lib/supabase/types";

interface EmergencyCardContentProps {
  emergencyCard: UserEmergencyCard | null;
  emergencyContacts: UserEmergencyCardContact[];
  emergencyDoctors: UserEmergencyCardDoctor[];
  emergencyHospitals: UserEmergencyCardHospital[];
  textColor?: string;
  variant?: "expandable" | "dedicated";
}

export default function EmergencyCardContent({
  emergencyCard,
  emergencyContacts,
  emergencyDoctors,
  emergencyHospitals,
  textColor = COLORS.WHITE,
  variant = "expandable",
}: EmergencyCardContentProps) {
  // Sort contacts by priority
  const sortedContacts = [...emergencyContacts].sort(
    (a, b) => a.priority - b.priority
  );

  // Sort hospitals by priority
  const sortedHospitals = [...emergencyHospitals].sort(
    (a, b) => a.priority - b.priority
  );

  // Group doctors by type
  const primaryCareDoctor = emergencyDoctors.find(
    (d) => d.doctor_type === "primary_care"
  );
  const allergySpecialist = emergencyDoctors.find(
    (d) => d.doctor_type === "allergy_specialist"
  );
  const otherDoctors = emergencyDoctors.filter(
    (d) => d.doctor_type === "other"
  );

  // Format date of birth
  const formatDateOfBirth = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format phone number
  const formatPhoneNumber = (phone: string | null) => {
    if (!phone) return "N/A";
    // Simple formatting for display
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phone;
  };

  // Get doctor type label
  const getDoctorTypeLabel = (type: string) => {
    switch (type) {
      case "primary_care":
        return "Primary Care Physician";
      case "allergy_specialist":
        return "Allergy Specialist";
      case "other":
        return "Other Doctor";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-4">
      {/* Personal Information Section */}
      {emergencyCard && (
        <div className="rounded-lg p-4" style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#692B47" }}>
          <h4
            className="text-sm font-merriweather font-semibold mb-3"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            Personal Information
          </h4>
          <div
            className="space-y-2 text-xs font-merriweather"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            <p>
              <strong>Full Legal Name:</strong> {emergencyCard.full_legal_name}
            </p>
            {emergencyCard.blood_type && (
              <p>
                <strong>Blood Type:</strong> {emergencyCard.blood_type}
              </p>
            )}
            {emergencyCard.height_cm && (
              <p>
                <strong>Height:</strong> {emergencyCard.height_cm} cm
              </p>
            )}
            {emergencyCard.weight_kg && (
              <p>
                <strong>Weight:</strong> {emergencyCard.weight_kg} kg
              </p>
            )}
            {emergencyCard.date_of_birth && (
              <p>
                <strong>Date of Birth:</strong>{" "}
                {formatDateOfBirth(emergencyCard.date_of_birth)}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Emergency Contacts Section */}
      {sortedContacts.length > 0 && (
        <div className="rounded-lg p-4" style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#692B47" }}>
          <h4
            className="text-sm font-merriweather font-semibold mb-3"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            Emergency Contacts
          </h4>
          <div className="space-y-3">
            {sortedContacts.map((contact, index) => (
              <div
                key={contact.id}
                className="text-xs font-merriweather pb-3"
                style={{
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                  borderBottom:
                    index < sortedContacts.length - 1
                      ? variant === "dedicated"
                        ? `1px solid rgba(0, 0, 0, 0.1)`
                        : `1px solid rgba(255, 255, 255, 0.2)`
                      : "none",
                }}
              >
                <p className="font-semibold mb-1">
                  {contact.full_name} ({contact.relationship})
                </p>
                {contact.phone_number && (
                  <p>
                    {formatPhoneNumber(contact.phone_number)}
                    {contact.is_mobile && " (Mobile)"}
                  </p>
                )}
                {contact.email && <p>{contact.email}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Doctors Section */}
      {emergencyDoctors.length > 0 && (
        <div className="rounded-lg p-4" style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#692B47" }}>
          <h4
            className="text-sm font-merriweather font-semibold mb-3"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            Medical Providers
          </h4>
          <div className="space-y-3">
            {primaryCareDoctor && (
              <div
                className="text-xs font-merriweather pb-3"
                style={{
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                  borderBottom:
                    allergySpecialist || otherDoctors.length > 0
                      ? variant === "dedicated"
                        ? `1px solid rgba(0, 0, 0, 0.1)`
                        : `1px solid rgba(255, 255, 255, 0.2)`
                      : "none",
                }}
              >
                <p className="font-semibold mb-1">
                  {getDoctorTypeLabel(primaryCareDoctor.doctor_type)}
                </p>
                <p>{primaryCareDoctor.full_name}</p>
                {primaryCareDoctor.practice_name && (
                  <p className="opacity-90">
                    {primaryCareDoctor.practice_name}
                  </p>
                )}
                {primaryCareDoctor.phone_number && (
                  <p>{formatPhoneNumber(primaryCareDoctor.phone_number)}</p>
                )}
              </div>
            )}

            {allergySpecialist && (
              <div
                className="text-xs font-merriweather pb-3"
                style={{
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                  borderBottom:
                    otherDoctors.length > 0
                      ? variant === "dedicated"
                        ? `1px solid rgba(0, 0, 0, 0.1)`
                        : `1px solid rgba(255, 255, 255, 0.2)`
                      : "none",
                }}
              >
                <p className="font-semibold mb-1">
                  {getDoctorTypeLabel(allergySpecialist.doctor_type)}
                </p>
                <p>{allergySpecialist.full_name}</p>
                {allergySpecialist.practice_name && (
                  <p className="opacity-90">
                    {allergySpecialist.practice_name}
                  </p>
                )}
                {allergySpecialist.phone_number && (
                  <p>{formatPhoneNumber(allergySpecialist.phone_number)}</p>
                )}
              </div>
            )}

            {otherDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="text-xs font-merriweather pb-3"
                style={{
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                  borderBottom:
                    index < otherDoctors.length - 1
                      ? variant === "dedicated"
                        ? `1px solid rgba(0, 0, 0, 0.1)`
                        : `1px solid rgba(255, 255, 255, 0.2)`
                      : "none",
                }}
              >
                <p className="font-semibold mb-1">
                  {getDoctorTypeLabel(doctor.doctor_type)}
                </p>
                <p>{doctor.full_name}</p>
                {doctor.practice_name && (
                  <p className="opacity-90">{doctor.practice_name}</p>
                )}
                {doctor.phone_number && (
                  <p>{formatPhoneNumber(doctor.phone_number)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hospitals Section */}
      {sortedHospitals.length > 0 && (
        <div className="rounded-lg p-4" style={{ backgroundColor: variant === "dedicated" ? COLORS.WHITE : "#692B47" }}>
          <h4
            className="text-sm font-merriweather font-semibold mb-3"
            style={{ color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE }}
          >
            Preferred Hospitals
          </h4>
          <div className="space-y-3">
            {sortedHospitals.map((hospital, index) => (
              <div
                key={hospital.id}
                className="text-xs font-merriweather pb-3"
                style={{
                  color: variant === "dedicated" ? COLORS.BLACK : COLORS.WHITE,
                  borderBottom:
                    index < sortedHospitals.length - 1
                      ? variant === "dedicated"
                        ? `1px solid rgba(0, 0, 0, 0.1)`
                        : `1px solid rgba(255, 255, 255, 0.2)`
                      : "none",
                }}
              >
                <p className="font-semibold mb-1">{hospital.name}</p>
                {hospital.address && (
                  <p className="opacity-90">{hospital.address}</p>
                )}
                {hospital.phone_number && <p>{hospital.phone_number}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
