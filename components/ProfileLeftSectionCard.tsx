import { COLORS } from "@/constants/colors";
import { User } from "lucide-react";
import { Twemoji } from "@/utils/twemoji";
import type { Database } from "@/lib/supabase/types";

type UserWebProfile = Database['web_profiles']['Tables']['user_web_profiles']['Row'];
type UserProfile = Database['core']['Tables']['user_profiles']['Row'];
type UserWebProfileWithUserData = UserWebProfile & UserProfile;
type UserEmergencyCardContact = Database['emergency']['Tables']['user_emergency_card_contacts']['Row'];
import { formatTimestamp, formatPhoneNumber } from "@/utils/formatters";
import Link from "next/link";
import DownloadDineSection from "./DownloadDineSection";

interface ProfileLeftSectionCardProps {
  profile: UserWebProfileWithUserData;
  emergencyContacts: UserEmergencyCardContact[];
  slug: string;
}

export default function ProfileLeftSectionCard({
  profile,
  emergencyContacts,
  slug,
}: ProfileLeftSectionCardProps) {
  // Get priority 1 emergency contact
  const primaryContact = emergencyContacts.find(
    (contact) => contact.priority === 1
  );

  // Format the name
  const displayName = [profile.first_name, profile.last_name]
    .filter(Boolean)
    .join(" ") || "Anonymous User";

  // Format last updated time
  const lastUpdated = formatTimestamp(profile.updated_at, profile.created_at);
  return (
    <div className="flex flex-col items-start justify-between w-full md:w-[25%] overflow-y-visible md:overflow-y-auto h-auto md:h-[86vh]">
      {/* Top Section Group */}
      <div className="flex flex-col w-full items-center md:items-start">
        {/* Profile Circle */}
        <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <User size={64} className="text-gray-400" />
        </div>
        {/* Name */}
        <h2
          className="text-xl font-merriweather font-bold mb-1 text-center md:text-left"
          style={{ color: COLORS.BLACK }}
        >
          {displayName}
        </h2>
        {/* Last Updated */}
        <p
          className="text-xs font-lato text-center md:text-left"
          style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
        >
          Last updated: {lastUpdated}
        </p>

        {/* View Full Profile Button */}
        <Link
          href={`/profile/${slug}`}
          className="w-full mt-4 py-3 rounded-lg text-center font-lato font-bold text-sm transition-opacity hover:opacity-80"
          style={{
            backgroundColor: COLORS.DOWNLOAD_SECTION_BLUE,
            color: COLORS.WHITE,
          }}
        >
          View Full Profile
        </Link>

        {/* About Me Section */}
        <div
          className="w-full mt-4 p-4 rounded-lg"
          style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
        >
          {/* About Me Label */}
          <h3
            className="text-xs font-lato mb-2"
            style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
          >
            About me
          </h3>
          {/* Description */}
          <p
            className="text-sm font-lato leading-relaxed"
            style={{ color: COLORS.BLACK }}
          >
            {profile.about_me || "No description provided."}
          </p>
        </div>

        {/* Emergency Contact Section - Only show if display_emergency_contact is true */}
        {profile.display_emergency_contact && primaryContact && (
          <div
            className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: COLORS.HEADER_BACKGROUND }}
          >
            <Twemoji hex="1f4de" size={20} alt="telephone emoji" />
            <p
              className="text-sm font-lato"
              style={{ color: COLORS.SECONDARY_TEXT_GRAY }}
            >
              Emergencies: {primaryContact.full_name} •{" "}
              {formatPhoneNumber(primaryContact.phone_number)}
            </p>
          </div>
        )}
        {/* EpiPen Section - Only show if display_epipen is true */}
        {profile.display_epipen && (
          <div
            className="w-full mt-3 p-3 rounded-lg flex items-center gap-3"
            style={{ backgroundColor: COLORS.EPIPEN_COLOR }}
          >
            <Twemoji hex="2705" size={20} alt="checkmark emoji" />
            <p
              className="text-sm font-lato"
              style={{ color: COLORS.WHITE }}
            >
              Carries an EpiPen: Yes
            </p>
          </div>
        )}
      </div>

      {/* Download Dine Section */}
      <DownloadDineSection />
    </div>
  );
}
