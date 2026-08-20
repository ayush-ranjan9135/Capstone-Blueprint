'use client';

import { motion } from 'framer-motion';
import { Lock, FileKey2, ShieldAlert } from 'lucide-react';

export default function SecuritySection() {
  const securityFeatures = [
    {
      title: 'Firebase Authentication',
      description: 'Enterprise-grade identity management ensuring only verified team members can access your workspace.',
      icon: Lock,
    },
    {
      title: 'Data Isolation',
      description: 'Firestore security rules strictly isolate data between projects and workspaces to prevent unauthorized access.',
      icon: FileKey2,
    },
    {
      title: 'Protected Routes',
      description: 'Client and server-side route protection prevents unauthenticated exposure of project information.',
      icon: ShieldAlert,
    },
  ];

  return (
    <section id="security" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            Your work deserves a secure foundation.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            We take your project data seriously. TaskMatrix is built on Google's Firebase infrastructure, providing robust security right out of the box.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {securityFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-[#0A0A0A] border border-white/5 hover:border-purple-500/30 rounded-2xl p-8 flex flex-col items-center text-center transition-all group shadow-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all relative z-10">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-900/10 filter blur-[120px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
