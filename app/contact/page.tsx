"use client";

import { motion } from "framer-motion";
import { useAnimationDelay } from "@/app/components/useAnimationDelay";
import { useState } from "react";
import PolygonBall from "../components/PolygonBall";

export default function Contact() {
  const getDelay = useAnimationDelay();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center bg-zinc-950">
      {/* Desktop Layout */}
      <div className="hidden md:flex w-full">
        <img src="/images/Moi.jpg" alt="my image" className="opacity-20 w-[50%] h-full object-cover" />
        <div className="contact flex flex-col gap-6 w-[50%] px-20 mb-[10%] pt-50 z-100">
          <div className=" absolute z-0 lg:w-[100%] lg:h-[98%] w-[200%] h-[108%] left-1/3 bottom-[50vh] ">
            <PolygonBall sphereSize={1.5} verticalEnabled={true} verticalAmplitude={0.2} verticalSpeed={0.1}/>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="z-10"
          >
            <h1 className="text-5xl font-bold font-sans text-zinc-300 mb-2">Get In Touch</h1>
            <p className="text-zinc-500 font-sans">I'd love to hear from you. Send me a message!</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-zinc-400 text-sm font-sans mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="flex-1">
                <label className="block text-zinc-400 text-sm font-sans mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-400 text-sm font-sans mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm font-sans mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="px-8 py-4 bg-orange-400 text-black font-bold font-sans rounded-lg hover:bg-orange-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            {submitStatus === 'success' && (
              <p className="text-green-400 font-sans">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 font-sans">Failed to send message. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full min-h-screen relative">
        <img 
          src="/images/Moi.jpg" 
          alt="my image" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative z-10 flex flex-col gap-6 px-4 py-8 pt-32">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl font-bold font-sans text-zinc-300 mb-2 text-center lg:text-start">Get In Touch</h1>
            <p className="text-zinc-500 font-sans text-center lg:text-start">I'd love to hear from you. Send me a message!</p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-zinc-400 text-sm font-sans mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm font-sans mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm font-sans mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label className="block text-zinc-400 text-sm font-sans mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-zinc-900/90 border border-zinc-800 rounded-lg text-zinc-300 font-sans focus:outline-none focus:border-orange-400 transition-colors resize-none"
                placeholder="Your message..."
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="px-8 py-4 bg-orange-400 text-black font-bold font-sans rounded-lg hover:bg-orange-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
            {submitStatus === 'success' && (
              <p className="text-green-400 font-sans">Message sent successfully!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-red-400 font-sans">Failed to send message. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
}