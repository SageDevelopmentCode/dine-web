"use client";

import EmergencyCardContent from "./EmergencyCardContent";
import type { Database } from "@/lib/supabase/types";

type UserEmergencyCard = Database['emergency']['Tables']['user_emergency_cards']['Row'];
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];
type UserEmergencyCardDoctor = Database['emergency']['Tables']['user_emergency_card_doctors']['Row'];
type UserEmergencyCardHospital = Database['emergency']['Tables']['user_emergency_card_hospitals']['Row'];

interface FilteredEmergencyCardProps {
  card: UserEmergencyCard | null;
  contacts: UserEmergencyCardContact[];
  doctors: UserEmergencyCardDoctor[];
  hospitals: UserEmergencyCardHospital[];
  reactionProfile: Database['allergies']['Tables']['user_reaction_profiles']['Row'] | null;
  selectedSubitems: any;
  textColor: string;
  variant: "expandable" | "dedicated";
}

/**
 * Filter emergency card data based on selected subitems
 * Expected structure of selectedSubitems:
 * {
 *   contacts: string[], // array of contact IDs
 *   doctors: string[],  // array of doctor IDs
 *   hospitals: string[] // array of hospital IDs
 * }
 */
export default function FilteredEmergencyCard({
  card,
  contacts,
  doctors,
  hospitals,
  reactionProfile,
  selectedSubitems,
  textColor,
  variant,
}: FilteredEmergencyCardProps) {
  let filteredContacts = contacts;
  let filteredDoctors = doctors;
  let filteredHospitals = hospitals;

  // Apply filtering if selectedSubitems is provided
  if (selectedSubitems && typeof selectedSubitems === 'object') {
    if (Array.isArray(selectedSubitems.contacts) && selectedSubitems.contacts.length > 0) {
      filteredContacts = contacts.filter(contact =>
        selectedSubitems.contacts.includes(contact.id)
      );
    }

    if (Array.isArray(selectedSubitems.doctors) && selectedSubitems.doctors.length > 0) {
      filteredDoctors = doctors.filter(doctor =>
        selectedSubitems.doctors.includes(doctor.id)
      );
    }

    if (Array.isArray(selectedSubitems.hospitals) && selectedSubitems.hospitals.length > 0) {
      filteredHospitals = hospitals.filter(hospital =>
        selectedSubitems.hospitals.includes(hospital.id)
      );
    }
  }

  return (
    <EmergencyCardContent
      emergencyCard={card}
      emergencyContacts={filteredContacts}
      emergencyDoctors={filteredDoctors}
      emergencyHospitals={filteredHospitals}
      reactionProfile={reactionProfile}
      textColor={textColor}
      variant={variant}
    />
  );
}
