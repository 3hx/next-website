export default function SalonLogos() {
  // Note: When creating or replacing the logo images, ensure the Ruffians logo (x2.png)
  // has the porcupine element removed as requested by the client

  return (
    <section className="pt-16 pb-4 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-24 max-w-screen-2xl mx-auto">
      <p className="text-center text-base text-slate-600 mb-6 max-w-2xl mx-auto">
        Trusted by top barbers across the country
      </p>
      <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
        {[
          "/x1.png",
          "/x2.png", // This is the Ruffians logo - porcupine should be removed
          "/x3.png",
          "/x4.png",
        ].map((logo, index) => (
          <div
            key={index}
            className="w-24 h-16 md:w-28 md:h-18 flex items-center justify-center"
          >
            <img
              src={logo}
              alt={`Barber Shop ${index + 1}`}
              className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(10%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(10%)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
