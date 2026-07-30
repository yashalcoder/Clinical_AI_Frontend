import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
});

export const metadata = {
  title: {
    template: "%s | ClinicFlow AI",
    default: "ClinicFlow AI - Modern Clinic Automation Platform"
  },
  description: "The AI Operating System for Modern Clinics."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-brand-dark">
        {children}
      </body>
    </html>
  );
}
