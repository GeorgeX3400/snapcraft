import { Inter } from "next/font/google";
import Link from "next/link";
import "../styles/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SnapCraft - AI-Powered Social Media Posts",
  description: "Create stunning social media posts instantly with AI for influencers, businesses, and marketers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-white`}>
        {/* Header */}
        <header className="w-full p-6 bg-white shadow-md">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
              <h2 className="text-2xl font-bold text-gray-900">SnapCraft</h2>
            </Link>
            {/* Navigation */}
            <nav className="space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link href="/register" className="text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </nav>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 w-full p-6">
          {children}
        </main>
        {/* Footer (Optional) */}
        <footer className="w-full p-4 bg-gray-100 text-center text-gray-600">
          <p>&copy; 2025 SnapCraft. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}