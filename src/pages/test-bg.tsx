import Image from "next/image";

export default function TestBackground() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/background.jpg"
        alt="Background"
        fill
        className="object-cover z-0"
      />

      {/* Overlay text */}
      <div className="z-10 text-white text-4xl font-bold">
        Hello from Background Test
      </div>
    </div>
  );
}
