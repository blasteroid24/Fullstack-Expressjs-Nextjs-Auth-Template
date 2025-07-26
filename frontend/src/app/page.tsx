import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Welcome to Requiem</h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-8">
          This is your portal to discover insights, visualize data, and interact with meaningful tools.
        </p>
        <a
          href="/auth/login"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition">
          Get Started
        </a>
      </main>
    </>
  );
}
