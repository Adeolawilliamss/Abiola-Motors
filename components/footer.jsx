import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="container mx-auto flex flex-col items-center gap-3">
        {/* Logo */}
        <Image
          src="/images/Abiola-Motors.jpg"
          alt="Company Logo"
          width={50}
          height={50}
          className="w-12 h-auto"
        />
        {/* Company Name */}
        <p className="text-lg font-semibold text-red-500">Abiola Motors</p>
        {/* Rights */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Abiola Motors. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
