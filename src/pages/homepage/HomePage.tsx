'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Zap, Expand } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export default function LandingPage() {
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolling ? 'bg-gray-900/80 backdrop-blur-sm' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <a href="#" className="text-2xl font-bold text-white">
              Task manager
            </a>
            <Button
              onClick={() => navigate('/login')}
              className="text-white border-white hover:bg-white hover:text-gray-900"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 sm:py-32 relative pt-28">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight"
          >
            Welcome to Task manager
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-xl sm:text-2xl text-blue-200 max-w-3xl mx-auto"
          >
            Revolutionizing the way you manage your boards and projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10"
          >
            <a
              href="#features"
              onClick={scrollToFeatures}
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 inline-flex items-center group"
            >
              Explore Features
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-16 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolling ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-full h-full bg-gradient-to-t from-gray-900 to-transparent" />
        </motion.div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
            Why Choose Task manager?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Feature 1 */}
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8" />}
              title="Easy to Manage"
              description="Organize and track your boards with ease using our intuitive interface."
              color="blue"
            />

            {/* Feature 2 */}
            <FeatureCard
              icon={<Expand className="h-8 w-8" />}
              title="Drag and Drop"
              description="Seamlessly reorder your tasks with our drag-and-drop feature."
              color="indigo"
            />

            {/* Feature 3 */}
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Fast and Responsive"
              description="Experience blazing-fast performance on all your devices."
              color="blue"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 py-20 sm:py-32">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Get Started with Task manager Today!
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Take control of your boards and workflows with our powerful app.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="/signup"
              className="bg-blue-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 inline-flex items-center group"
            >
              Sign Up Now
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Task manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gray-700 p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className={`flex justify-center mb-6 bg-${color}-900 p-3 rounded-full w-16 h-16 mx-auto`}
      >
        <span className={`text-${color}-300`}>{icon}</span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
