import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-white w-full">
      <div className="flex items-center justify-between px-2 py-4 sm:px-4 md:px-8 lg:px-12">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <Image
            src="/assets/Logo.png"
            alt="Dine by SageField"
            width={200}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </div>

        {/* App store buttons on the right */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Download on the App Store"
          >
            <Image
              src="/assets/DownloadOnAppStore.png"
              alt="Download on the App Store"
              width={135}
              height={40}
              className="h-10 w-auto"
            />
          </button>
          <button
            type="button"
            className="transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            aria-label="Get it on Google Play"
          >
            <Image
              src="/assets/GetItOnGooglePlay.png"
              alt="Get it on Google Play"
              width={135}
              height={40}
              className="h-10 w-auto"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
