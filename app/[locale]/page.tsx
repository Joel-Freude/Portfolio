"use client";

import React, { useState, useEffect, useRef } from "react";
import WelcomeAnimation from "../components/WelcomeAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimationDelay } from "../components/useAnimationDelay";
import PolygonBall from "../components/PolygonBall";
import { Network, Globe, Wrench, ArrowDown, ArrowUp } from "lucide-react";
import ScrollingLines from "../components/ScrollingLines";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import servicesData from "../../public/data/services.json";
import gsap from "gsap";
import { toast, Toaster } from "react-hot-toast";

type ServiceType = {
  id: number;
  name: string;
  image: string;
  description: string;
  subservices: string[];
  prices: number[];
};

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  city: string;
};

type Step = "service" | "contact" | "share";

const WA_NUMBER = "237650812141";

const STEPS: { key: Step; label: string }[] = [
  { key: "contact", label: "steps.contact" },
  { key: "service", label: "steps.service" },
  { key: "share", label: "steps.share" },
];

const STEP_INDEX: Record<Step, number> = { contact: 0, service: 1, share: 2 };

const IMAGE_POSITION: Record<number, string> = {
  1: "center center",
  2: "center 80%",
  3: "center 55%",
};

const IMAGE_ZOOM: Record<number, number> = {
  1: 1,
  2: 1.6,
  3: 1.45,
};

const SERVICE_ACCENTS: Record<number, {
  topBorder: string;
  iconColor: string;
  hoverBorder: string;
  badgeStyle: string;
}> = {
  1: {
    topBorder: "border-t-zinc-500",
    iconColor: "text-zinc-300",
    hoverBorder: "hover:border-zinc-500/50",
    badgeStyle: "text-zinc-400 border-zinc-700",
  },
  2: {
    topBorder: "border-t-zinc-500",
    iconColor: "text-zinc-300",
    hoverBorder: "hover:border-zinc-500/50",
    badgeStyle: "text-zinc-400 border-zinc-700",
  },
  3: {
    topBorder: "border-t-zinc-500",
    iconColor: "text-zinc-300",
    hoverBorder: "hover:border-zinc-500/50",
    badgeStyle: "text-zinc-400 border-zinc-700",
  },
};

const icons: Record<string, React.ReactNode> = {
  "IT Maintenance": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
    </svg>
  ),
  "Web Design": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  "Network Administration": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
};

async function generateQuotePDF(
  service: ServiceType,
  selectedIndexes: number[],
  total: number,
  contact: ContactForm
): Promise<{ base64: string; blob: Blob }> {
  const jsPDF = (await import("jspdf/dist/jspdf.umd.min.js")).default;
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const W = 210;
  const margin = 20;
  let y = 0;

  const getBase64 = async (url: string): Promise<string | null> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      return null;
    }
  };

  const logoLeft = await getBase64("/images/PDF-Logo.png");
  const logoRight = await getBase64("/images/PROFORMA.png");

  if (!logoLeft && !logoRight) {
    y = 20;
    doc.setFontSize(22);
    doc.setTextColor(232, 112, 42);
    doc.setFont("helvetica", "bold");
    doc.text("FreudeDev Quote", margin, y);
    y += 15;
  }

  if (logoLeft) doc.addImage(logoLeft, "PNG", margin, 15, 35, 35, undefined, "FAST");
  if (logoRight) doc.addImage(logoRight, "PNG", W - margin - 75, 15, 75, 35, undefined, "FAST");

  y = 55;

  doc.setFontSize(10);
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "normal");
  doc.text("Addressed to:", margin, y);
  y += 8;

  doc.setFontSize(22);
  doc.setTextColor(232, 112, 42);
  doc.setFont("helvetica", "bold");
  doc.text(contact.name.toUpperCase(), margin, y);

  y += 3;
  doc.setDrawColor(232, 112, 42);
  doc.setLineWidth(1);
  doc.line(margin, y, margin + 85, y);

  y += 10;
  doc.setFontSize(11);
  doc.setTextColor(50, 50, 50);
  doc.setFont("helvetica", "normal");
  doc.text(`Tel : ${contact.phone}`, margin, y);
  y += 7;
  doc.text(`E-mail : ${contact.email}`, margin, y);

  let rightY = 62;
  const quoteId = `00000${Math.floor(Math.random() * 100)}`;
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(11);
  doc.text(`ID : ${quoteId}`, W - margin - 50, rightY);
  rightY += 8;
  doc.text(`Date : ${new Date().toLocaleDateString("en-GB")}`, W - margin - 50, rightY);

  y = 95;
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.setFont("helvetica", "normal");
  doc.text("Service : ", margin, y);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(service.name, margin + 17, y);

  y += 6;

  doc.setFillColor(232, 112, 42);
  doc.rect(margin, y, 115, 10, "F");

  doc.setFillColor(18, 42, 62);
  doc.rect(margin + 115, y, 55, 10, "F");

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Details des services", margin + 57.5, y + 6.5, { align: "center" });

  doc.setTextColor(255, 255, 255);
  doc.text("Montant", margin + 142.5, y + 6.5, { align: "center" });

  y += 10;

  doc.setDrawColor(30, 30, 30);
  doc.setLineWidth(0.2);

  selectedIndexes.forEach((idx) => {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);

    const textLines = doc.splitTextToSize(service.subservices[idx], 110);
    const rowH = Math.max(10, textLines.length * 5 + 4);

    if (y + rowH > 260) {
      doc.addPage();
      y = 20;
    }

    doc.rect(margin, y, 115, rowH, "S");
    doc.rect(margin + 115, y, 55, rowH, "S");

    doc.text(textLines, margin + 3, y + 6.5);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);

    doc.text(`${service.prices[idx].toLocaleString()}`, margin + 142.5, y + (rowH / 2) + 1.5, { align: "center" });

    y += rowH;
  });

  if (y + 12 > 260) {
    doc.addPage();
    y = 20;
  }
  doc.setFillColor(18, 42, 62);
  doc.rect(margin, y, 170, 14, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL", margin + 4, y + 9, { align: "left" });
  doc.text(`${total.toLocaleString()} FCFA`, margin + 142.5, y + 9, { align: "center" });

  y += 30;

  if (y + 45 > 280) {
    doc.addPage();
    y = 20;
  }

  doc.setTextColor(232, 112, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Payment Instructions", margin, y);

  y += 8;

  doc.setTextColor(70, 70, 70);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  const paymentText =
    `1. Mobile Money: 6 50 81 21 41\n` +
    `2. Bank Transfer: Contact for account details\n` +
    `3. Online Payment: https://pay.freudedev.com/quote/${quoteId}\n\n` +
    `Payment confirmation will be sent after processing.`;

  const paymentLines = doc.splitTextToSize(paymentText, 170);
  paymentLines.forEach((line: string) => {
    doc.text(line, margin, y);
    y += 5;
  });

  y += 15;

  doc.setTextColor(232, 112, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Conditions", margin, y);

  doc.setFontSize(12);
  doc.text("Mode de paiement", W - margin - 60, y);

  y += 8;

  doc.setTextColor(70, 70, 70);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const termsText = "Les différentes opérations ainsi que les\ntransactions électroniques seront notifiées auprès\ndes clients jusqu'à ce que le travail soit terminé. Le\nprestataire n'est en aucun cas responsable de\nl'appareil si le client ne le récupère pas après 72\nheures";

  doc.text(termsText, margin, y);

  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.text("MOMO : 6 50 81 21 41", W - margin - 60, y);

  const base64 = doc.output("dataurlstring");
  const blob = doc.output("blob");
  return { base64, blob };
}

export default function Home() {
  const t = useTranslations('home');
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const [isFreshLoad, setIsFreshLoad] = useState(true);
  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [buttonOverWhite, setButtonOverWhite] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [elementVisibility, setElementVisibility] = useState({
    heading: false,
    paragraph1: false,
    paragraph2: false,
    profile: false,
    image: false
  });

  const [activeService, setActiveService] = useState<ServiceType | null>(null);
  const [selected, setSelected] = useState<number[]>([]);
  const [step, setStep] = useState<Step>("contact");
  const [contact, setContact] = useState<ContactForm>({ name: "", email: "", phone: "", city: "" });
  const [sending, setSending] = useState<boolean>(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [pdfBase64, setPdfBase64] = useState<string>("");
  const [glowVisible, setGlowVisible] = useState<boolean>(false);

  const modalRef    = useRef<HTMLDivElement | null>(null);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const glowRef     = useRef<HTMLDivElement | null>(null);
  const whiteSectionRef = useRef<any>(null);
  const headingRef = useRef<any>(null);
  const paragraph1Ref = useRef<any>(null);
  const paragraph2Ref = useRef<any>(null);
  const profileRef = useRef<any>(null);
  const imageRef = useRef<any>(null);
  const fullName = "Fofie Jounewe Joel Freude";

  const getDelay = useAnimationDelay();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const whiteSections = document.querySelectorAll('.bg-white');
      if (whiteSections.length === 0) {
        setButtonOverWhite(false);
        return;
      }

      let isAnyWhiteVisible = false;
      whiteSections.forEach(section => {
        const whiteRect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (whiteRect.top < windowHeight && whiteRect.bottom > 0) {
          isAnyWhiteVisible = true;
        }
      });

      setButtonOverWhite(isAnyWhiteVisible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    if (whiteSectionRef.current) {
      observer.observe(whiteSectionRef.current);
    }

    return () => {
      if (whiteSectionRef.current) {
        observer.unobserve(whiteSectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observers = [
      { ref: headingRef, key: 'heading' },
      { ref: paragraph1Ref, key: 'paragraph1' },
      { ref: paragraph2Ref, key: 'paragraph2' },
      { ref: profileRef, key: 'profile' },
      { ref: imageRef, key: 'image' }
    ];

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = observers.find(o => o.ref.current === entry.target);
          if (element) {
            setElementVisibility(prev => ({
              ...prev,
              [element.key]: entry.isIntersecting
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-20px'
      }
    );

    if (isMounted) {
      observers.forEach(({ ref }) => {
        if (ref.current) {
          intersectionObserver.observe(ref.current);
        }
      });
    }

    return () => {
      observers.forEach(({ ref }) => {
        if (ref.current) {
          intersectionObserver.unobserve(ref.current);
        }
      });
    };
  }, [isMounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!animationComplete) return;

    const interval = setInterval(() => {
      setCurrentJobIndex((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [animationComplete]);

  useEffect(() => {
    const hasSeenAnimation = sessionStorage.getItem("hasSeenWelcomeAnimation");
    if (!hasSeenAnimation) {
      setIsFreshLoad(true);
      setShowAnimation(true);
    } else {
      setIsFreshLoad(false);
      setAnimationComplete(true);
    }
  }, []);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    sessionStorage.setItem("hasSeenWelcomeAnimation", "true");
  };

  useEffect(() => {
    if (activeService && modalRef.current) {
      gsap.fromTo(modalRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "expo.out" }
      );
    }
  }, [activeService]);

  const handleClose = () => {
    if (!modalRef.current) return;
    gsap.to(modalRef.current, {
      y: 40, opacity: 0, duration: 0.3, ease: "power2.in",
      onComplete: () => {
        setActiveService(null);
        setSelected([]);
        setGlowVisible(false);
        setStep("contact");
        setContact({ name: "", email: "", phone: "", city: "" });
        setPdfBlob(null);
        setPdfBase64("");
      },
    });
  };

  const toggleSubservice = (index: number) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalBoxRef.current || !glowRef.current) return;
    const r = modalBoxRef.current.getBoundingClientRect();
    gsap.to(glowRef.current, { x: e.clientX - r.left - 150, y: e.clientY - r.top - 150, duration: 0.4 });
  };

  const total = selected.reduce((sum, i) => sum + (activeService?.prices[i] ?? 0), 0);

  const handleProceedToServices = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("service");
  };

  const handleGeneratePDF = async (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!activeService) return;
    setSending(true);
    try {
      const { base64, blob } = await generateQuotePDF(activeService, selected, total, contact);
      setPdfBase64(base64);
      setPdfBlob(blob);
      const quoteId = `00000${Math.floor(Math.random() * 100)}`;
      setStep("share");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("PDF generation failed");
    }
    setSending(false);
  };

  const downloadPDF = () => {
    if (!pdfBlob || !activeService) return;
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `FreudeDev_Quote_${contact.name.replace(/\s+/g, "_")}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sendQuoteByEmail = async () => {
    if (!activeService || !pdfBase64) return false;
    const selectedServices = selected.map((i) => ({
      name: activeService.subservices[i],
      price: activeService.prices[i],
    }));
    const res = await fetch('/api/quote', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientName: contact.name,
        clientEmail: contact.email,
        clientPhone: contact.phone,
        clientCity: contact.city,
        serviceName: activeService.name,
        selectedServices,
        total,
        pdfBase64,
      }),
    });
    return res.ok;
  };

  const handleWhatsApp = async () => {
    const servicesList = selected
      .map((i) => `• ${activeService?.subservices[i]} — ${activeService?.prices[i].toLocaleString()} FCFA`)
      .join("\n");
    const message = encodeURIComponent(
      `Hello ${contact.name}, here is your quote for ${activeService?.name}.\n\n` +
      `Services:\n${servicesList}\n\n` +
      `Total: ${total.toLocaleString()} FCFA\n\n` +
      `Contact: ${contact.phone} | ${contact.email}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${message}`, "_blank");
    downloadPDF();
    setSending(true);
    try {
      await sendQuoteByEmail();
    } catch (err) {
      console.error("Email send failed after WhatsApp redirect:", err);
    } finally {
      setSending(false);
    }
  };

  const handleEmail = async () => {
    if (!activeService || !pdfBase64) return;
    setSending(true);
    try {
      const sent = await sendQuoteByEmail();
      if (sent) {
        toast.success(`Quote sent to ${contact.email}`);
        handleClose();
      } else {
        toast.error("Failed to send the quote email. Please try again.");
      }
    } catch {
      toast.error("Could not reach the server. Please try again.");
    }
    setSending(false);
  };

  const h1Delay    = isFreshLoad ? 2.1 : getDelay(0);
  const subDelay   = isFreshLoad ? 3.1 : getDelay(1);
  const bodyDelay  = isFreshLoad ? 4.1 : getDelay(2);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="min-h-screen w-full grid grid-rows-3">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #3f3f46",
            fontSize: "13px",
            borderRadius: "12px",
          },
          success: { iconTheme: { primary: "#f97316", secondary: "#fff" } },
        }}
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-enter { animation: fadeUp 0.6s ease forwards; }
      `}</style>

      {showAnimation && (
        <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
      )}

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: h1Delay }}
        className="relative w-full flex items-center justify-center min-h-[20vh] md:min-h-[80vh] overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: bodyDelay }}
          className="relative z-10 flex flex-col items-center text-center px-4 md:px-8 pt-4 md:pt-32"
        >
          <h1
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-zinc-100 mb-4 md:mb-6 px-4 md:px-64"
            style={{ fontFamily: "var(--font-gued)" }}
          >
            {t('greeting', { name: fullName })}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: bodyDelay }}
            className="text-base md:text-lg text-zinc-500 max-w-2xl"
            style={{ fontFamily: "var(--font-vlorentine)" }}
          >
            {t('passion')}
          </motion.p>
          <div className="relative text-xl md:text-2xl lg:text-3xl text-zinc-400 mb-4 md:mb-8 overflow-hidden" style={{ fontFamily: "var(--font-vlorentine)" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentJobIndex}
                initial={{ opacity: 0 }}
                animate={animationComplete ? { opacity: 1 } : { opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center"
              >
                {currentJobIndex === 0 && t('jobTitles.networkAdministrator')}
                {currentJobIndex === 1 && t('jobTitles.webDesigner')}
                {currentJobIndex === 2 && t('jobTitles.mobileAppDev')}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <PolygonBall sphereSize={isMobile ? 3 : 5} />
        </div>
      </motion.section>

      {/* My Approach Section */}
      <motion.section
        className="w-full max-w-9xl px-4 md:px-20 py-20 md:mt-12 bg-white relative overflow-hidden"
      >
        <div className="absolute left-[80vw] md:left-[80vw] line w-50 h-50 hidden md:block">
          <ScrollingLines />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <motion.h2
              ref={headingRef}
              initial={{ opacity: 0, y: 20 }}
              animate={elementVisibility.heading ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-8xl font-bold text-zinc-900 text-center md:text-left"
              style={{ fontFamily: "var(--font-gued)" }}
            >
              {t('approachTitle')}
            </motion.h2>
            <motion.p
              ref={paragraph1Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={elementVisibility.paragraph1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base md:text-lg lg:text-xl text-zinc-600 leading-relaxed text-center md:text-left"
              style={{ fontFamily: "var(--font-vlorentine)" }}
            >
              {t('approachParagraph1')}
            </motion.p>
            <motion.p
              ref={paragraph2Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={elementVisibility.paragraph2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-base md:text-lg lg:text-xl text-zinc-400 leading-relaxed text-center md:text-left"
              style={{ fontFamily: "var(--font-vlorentine)" }}
            >
              {t('approachParagraph2')}
            </motion.p>

            {/* Circular Profile Element */}
            <motion.div
              ref={profileRef}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={elementVisibility.profile ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center md:items-start mt-8"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center mb-3">
                <span className="text-zinc-400 text-xl md:text-2xl lg:text-3xl">👨‍💻</span>
              </div>
              <p className="text-xs md:text-sm lg:text-base text-zinc-500 font-sans text-center md:text-left">
                {t('buildingWithPurpose')}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: 30 }}
            animate={elementVisibility.image ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <div className="aspect-[3/4] md:aspect-[3/3] overflow-hidden bg-zinc-800 border border-zinc-700 relative">
              <img
                src="https://www.tstc.edu/wp-content/uploads/2025/09/Computer-Networking-1200x800.jpg"
                alt="Working on projects"
                className="w-full h-full object-cover"
              />
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 border-2 border-zinc-700 rounded-full opacity-50"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 md:w-16 md:h-16 border-2 border-zinc-700 rounded-lg opacity-50"></div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: bodyDelay + 1 }}
        className="flex flex-col items-center px-4 pt-8 md:pt-0 lg:flex-row lg:gap-40 lg:items-center lg:m-40"
      >
        <div className="w-full">
          <div className="flex items-end justify-between border-b border-zinc-800 pb-8 mb-12">
             <div>
               <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase font-medium mb-3" style={{ fontFamily: "var(--font-vlorentine)" }}>— {t('tagline')}</p>
               <h2 className="text-5xl md:text-7xl font-black text-transparent leading-none tracking-tight bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-500" style={{ fontFamily: "var(--font-gued)" }}>
                 {t('servicesTitle')}
               </h2>
             </div>
            <p className="hidden md:block max-w-xs text-zinc-500 text-sm text-right leading-relaxed" style={{ fontFamily: "var(--font-vlorentine)" }}>
              {t('description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(servicesData.services as ServiceType[])?.map((item: ServiceType, i: number) => {
              const accent = SERVICE_ACCENTS[item.id] ?? SERVICE_ACCENTS[1];
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveService(item); setStep("contact"); }}
                  className={`card-enter group relative text-left rounded-2xl overflow-hidden border border-zinc-800 border-t-2 ${accent.topBorder} ${accent.hoverBorder} transition-all duration-500 bg-zinc-950`}
                  style={{ animationDelay: `${i * 0.12}s` } as React.CSSProperties}
                >
                  <div className="relative h-56 overflow-hidden bg-zinc-900">
                    <div
                      className="absolute inset-0"
                      style={{ transform: `scale(${IMAGE_ZOOM[item.id] ?? 1})`, transformOrigin: "center" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        style={{ objectPosition: IMAGE_POSITION[item.id] ?? "center" }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                    <span className={`absolute top-4 right-4 text-xs font-mono border px-2 py-1 rounded ${accent.badgeStyle}`}>0{item.id}</span>
                  </div>
                   <div className={`relative p-6 ${item.id === 2 || item.id === 3 ? 'py-11' : 'py-6' }`}>
                     <div className="flex items-start gap-4 mb-4">
                       <div className={`${accent.iconColor} mt-0.5 shrink-0`}>{icons[item.name]}</div>
                       <div>
                         <h3 className="text-xl font-black text-white leading-tight group-hover:text-zinc-300 transition-colors duration-300" style={{ fontFamily: "var(--font-gued)" }}>
                           {t(`services.${item.name}.name`) || item.name}
                         </h3>
                         <p className="text-zinc-500 text-sm mt-1 leading-relaxed" style={{ fontFamily: "var(--font-vlorentine)" }}>
                           {t(`services.${item.name}.description`) || item.description}
                         </p>
                       </div>
                     </div>
                     <div className="flex flex-wrap gap-2 mt-4">
                       {item.subservices.slice(0, 3).map((sub: string, idx: number) => (
                         <span key={idx} className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 border border-zinc-800 group-hover:border-zinc-500/30 group-hover:text-zinc-300/70 px-2 py-1 rounded transition-all duration-300">{t(`services.${item.name}.subservices.${idx}`) || sub}</span>
                       ))}
                       {item.subservices.length > 3 && (
                         <span className={`text-[10px] font-mono uppercase tracking-wider border px-2 py-1 rounded ${accent.badgeStyle}`}>{t('more', { count: item.subservices.length - 3 })}</span>
                       )}
                     </div>
                     <div className="mt-6 flex items-center justify-between">
                       <span className="text-xs text-zinc-600 font-mono">{t('from')} {Math.min(...item.prices).toLocaleString()} {t('fcfa')}</span>
                       <div className="flex items-center gap-2 text-zinc-300 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                         <span>{t('explore')}</span>
                         <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                         </svg>
                       </div>
                     </div>
                   </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Service Modal */}
      {activeService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={handleClose} />

          <div ref={modalRef} className="relative z-10 w-full max-w-5xl max-h-[95vh] overflow-hidden">
            <div
              ref={modalBoxRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setGlowVisible(true)}
              onMouseLeave={() => setGlowVisible(false)}
              className="relative rounded-2xl overflow-hidden border border-zinc-800"
              style={{ background: "#0a0a0a" }}
            >
              {/* Glow */}
              <div ref={glowRef} className={`pointer-events-none absolute size-[300px] rounded-full blur-3xl transition-opacity duration-300 ${glowVisible ? "opacity-30" : "opacity-0"} bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400`} />

              <div className="relative z-10 grid md:grid-cols-[1fr_1.4fr]">

                {/* LEFT — Service identity */}
                <div className="relative flex flex-col justify-between p-3 md:p-10 overflow-hidden min-h-[160px] md:min-h-[340px] text-center md:text-left">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${activeService.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-orange-950/60" />
                  <div className="relative z-10">
                    <span className="text-[10px] md:text-xs font-mono text-orange-400 tracking-[0.2em] md:tracking-[0.25em] uppercase">Service 0{activeService.id}</span>
                  </div>
                  <div className="relative z-10 mt-auto">
                    <div className="text-orange-500 mb-2 md:mb-4 text-lg md:text-2xl flex justify-center md:justify-start">{icons[activeService.name]}</div>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight mb-2 md:mb-3">{t(`services.${activeService.name}.name`) || activeService.name}</h2>
                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed max-w-xs mx-auto md:mx-0">{t(`services.${activeService.name}.description`) || activeService.description}</p>
                  </div>
                  <div className="relative z-10 mt-4 md:mt-8 pt-3 md:pt-6 border-t border-white/10 flex gap-4 md:gap-8 justify-center md:justify-start">
                    <div>
                      <div className="text-lg md:text-2xl font-black text-orange-400">{activeService.subservices.length}</div>
                      <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider">{t('subservices')}</div>
                    </div>
                    <div>
                      <div className="text-lg md:text-2xl font-black text-orange-400">{Math.min(...activeService.prices).toLocaleString()}</div>
                      <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wider">{t('minFcfa')}</div>
                    </div>
                  </div>
                </div>

                {/* RIGHT — Multi-step panel */}
                <div className="p-4 md:p-10 border-t md:border-t-0 md:border-l border-zinc-800/80 flex flex-col overflow-y-auto max-h-[94vh]">

                  {/* Shared header: step indicator + back/close */}
                  <div className="flex items-center justify-between mb-4 md:mb-7 text-center md:text-left">
                    {/* Step progress */}
                    <div className="flex items-center flex-1 mr-2 md:mr-3 justify-center md:justify-start">
                      {STEPS.map((s, i) => {
                        const cur = STEP_INDEX[step];
                        const done = i < cur;
                        const active = i === cur;
                        return (
                          <React.Fragment key={s.key}>
                            {i > 0 && (
                              <div className={`flex-1 h-px mx-1 md:mx-2 transition-colors duration-300 ${done ? "bg-orange-500/50" : "bg-zinc-800"}`} />
                            )}
                            <div className={`flex items-center gap-1 md:gap-1.5 transition-opacity duration-300 ${active ? "opacity-100" : done ? "opacity-70" : "opacity-30"}`}>
                              <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-black border transition-all duration-300 ${active ? "bg-orange-500 border-orange-500 text-white" : done ? "bg-orange-500/20 border-orange-500/40 text-orange-400" : "border-zinc-700 text-zinc-600"}`}>
                                {done ? (
                                  <svg className="w-2 h-2 md:w-2.5 md:h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : String(i + 1)}
                              </div>
                               <span className={`text-[9px] md:text-[10px] font-mono uppercase tracking-wider hidden sm:block transition-colors duration-300 ${active ? "text-zinc-300" : done ? "text-zinc-500" : "text-zinc-700"}`}>{t(s.label)}</span>
                            </div>
                          </React.Fragment>
                        );
                      })}
                    </div>

                    {/* Back + Close */}
                    <div className="flex items-center gap-1 shrink-0">
                      {step !== "contact" && (
                        <button
                          type="button"
                          onClick={() => setStep(step === "share" ? "service" : "contact")}
                          className="text-zinc-500 hover:text-white text-[10px] md:text-[11px] font-mono flex items-center gap-1 px-2 md:px-2.5 py-1 md:py-1.5 rounded-lg hover:bg-zinc-800 transition"
                        >
                          <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                          Back
                        </button>
                      )}
                      <button type="button" onClick={handleClose} className="text-zinc-600 hover:text-white transition p-1.5 md:p-2 rounded-lg hover:bg-zinc-800">
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Step title */}
                  <div className="mb-4 md:mb-6 text-center md:text-left">
                    {step === "contact" && (
                      <>
                        <h3 className="text-white font-black text-lg md:text-xl">{t('yourDetails')}</h3>
                        <p className="text-zinc-500 text-[10px] md:text-xs mt-1">{t('pleaseEnterDetails')}</p>
                      </>
                    )}
                    {step === "service" && (
                      <>
                        <h3 className="text-white font-black text-lg md:text-xl">{t('selectServices')}</h3>
                        <p className="text-zinc-500 text-[10px] md:text-xs mt-1">{t('chooseServices')}</p>
                      </>
                    )}
                    {step === "share" && (
                      <>
                        <h3 className="text-white font-black text-lg md:text-xl">{t('sendQuote')}</h3>
                        <p className="text-zinc-500 text-[10px] md:text-xs mt-1">{t('chooseHowToReach')}</p>
                      </>
                    )}
                  </div>

                  {/* STEP 1 — Contact */}
                  {step === "contact" && (
                    <form onSubmit={handleProceedToServices} className="flex flex-col flex-1">
                      <div className="space-y-3 md:space-y-4 flex-1 overflow-y-auto max-h-[35vh] md:max-h-[45vh] pr-1">
                        <div>
                          <label className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 md:mb-1.5">{t('fullName')}</label>
                          <input required value={contact.name} onChange={(e) => setContact((p) => ({ ...p, name: e.target.value }))}
                            placeholder="John Doe"
                            className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm outline-none transition-all placeholder:text-zinc-600" />
                        </div>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 md:mb-1.5">{t('emailAddress')}</label>
                          <input required type="email" value={contact.email} onChange={(e) => setContact((p) => ({ ...p, email: e.target.value }))}
                            placeholder="john@example.com"
                            className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm outline-none transition-all placeholder:text-zinc-600" />
                        </div>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 md:mb-1.5">{t('phoneNumber')}</label>
                          <input required value={contact.phone} onChange={(e) => setContact((p) => ({ ...p, phone: e.target.value }))}
                            placeholder="+237 6XX XXX XXX"
                            className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm outline-none transition-all placeholder:text-zinc-600" />
                        </div>
                        <div>
                          <label className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1 md:mb-1.5">{t('city')}</label>
                          <input required value={contact.city} onChange={(e) => setContact((p) => ({ ...p, city: e.target.value }))}
                            placeholder="Douala"
                            className="w-full bg-zinc-900 border border-zinc-700 focus:border-orange-500 rounded-xl px-3 md:px-4 py-2 md:py-3 text-white text-xs md:text-sm outline-none transition-all placeholder:text-zinc-600" />
                        </div>
                      </div>
                      <button type="submit"
                        className="mt-4 md:mt-6 w-full py-3 md:py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-500 hover:to-amber-400 shadow-lg shadow-orange-900/40 transition-all duration-300 flex items-center justify-center gap-2">
                        {t('continueToServices')}
                      </button>
                    </form>
                  )}

                  {/* STEP 2 — Service selection */}
                  {step === "service" && (
                    <div className="flex flex-col flex-1">
                      <div className="grid grid-cols-[1fr_auto] text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] text-zinc-600 border-b border-zinc-800 pb-2 md:pb-3 mb-2 md:mb-3 px-1 text-left">
                        <span>{t('service')}</span>
                        <span>{t('priceFcfa')}</span>
                      </div>
                      <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-6 flex-1 overflow-y-auto max-h-[25vh] md:max-h-[35vh] pr-1">
                        {activeService.subservices.map((sub: string, index: number) => {
                          const checked = selected.includes(index);
                          return (
                            <li key={index} onClick={() => toggleSubservice(index)}
                              className={`grid grid-cols-[16px_1fr_auto] items-center gap-2 md:gap-4 px-3 md:px-4 py-2 md:py-3.5 rounded-xl cursor-pointer transition-all duration-200 ${checked ? "bg-orange-500/10 border border-orange-500/40" : "border border-transparent hover:border-zinc-700 hover:bg-zinc-900"}`}>
                              <div className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded flex items-center justify-center border-2 transition-all duration-200 shrink-0 ${checked ? "border-orange-500 bg-orange-500" : "border-zinc-600"}`}>
                                {checked && (
                                  <svg className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                )}
                              </div>
                              <div>
                                <p className="text-xs md:text-sm font-medium text-zinc-300">{t(`services.${activeService.name}.subservices.${index}`) || sub}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs md:text-sm font-semibold text-orange-400">{activeService.prices[index].toLocaleString()} FCFA</p>
                                <p className="text-[10px] md:text-xs text-zinc-500">{t('add')}</p>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="bg-zinc-900 rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-zinc-800">
                        <div className="flex justify-between">
                          <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">{t('total')}</span>
                          <span className="text-orange-400 font-black text-xs md:text-sm">{total.toLocaleString()} FCFA</span>
                        </div>
                      </div>
                      <button
                        onClick={handleGeneratePDF}
                        disabled={sending || selected.length === 0}
                        className="w-full py-3 md:py-4 rounded-xl font-black text-xs md:text-sm uppercase tracking-widest bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-500 hover:to-amber-400 shadow-lg shadow-orange-900/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {sending ? (
                          <>
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Generating PDF...
                          </>
                        ) : (
                          t('generateQuote')
                        )}
                      </button>
                    </div>
                  )}

                  {/* STEP 3 — Share */}
                  {step === "share" && (
                    <div className="flex flex-col flex-1">
                      <div className="flex-1 overflow-y-auto max-h-[35vh] md:max-h-[45vh] pr-1">
                        {/* PDF ready badge */}
                        <div className="flex items-center gap-2 md:gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-3 md:px-4 py-2 md:py-3 mb-3 md:mb-5">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <div>
                            <p className="text-green-400 text-xs md:text-sm font-semibold">{t('pdfQuoteReady')}</p>
                            <p className="text-zinc-500 text-[10px] md:text-xs">{t('preparedFor', { name: contact.name })}</p>
                          </div>
                          <button onClick={downloadPDF} className="ml-auto text-[10px] md:text-xs text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 px-2 md:px-3 py-1 md:py-1.5 rounded-lg transition flex items-center gap-1">
                            <svg className="w-2.5 h-2.5 md:w-3 md:h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {t('download')}
                          </button>
                        </div>

                        {/* Quote summary */}
                        <div className="bg-zinc-900 rounded-xl p-3 md:p-4 mb-3 md:mb-5 border border-zinc-800">
                          <p className="text-[9px] md:text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-1 md:mb-2">
                            {`${selected.length} service${selected.length !== 1 ? 's' : ''} — ${activeService.name}`}
                          </p>
                          <div className="flex justify-between">
                            <span className="text-[10px] md:text-xs font-black text-white uppercase tracking-wider">{t('total')}</span>
                            <span className="text-orange-400 font-black text-xs md:text-sm">{total.toLocaleString()} FCFA</span>
                          </div>
                        </div>

                        <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.15em] md:tracking-[0.2em] text-zinc-600 text-center mb-3 md:mb-4">{t('sendVia')}</p>
                      </div>

                      {/* WhatsApp */}
                      <button onClick={handleWhatsApp}
                        className="w-full py-3 md:py-4 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 md:gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white transition-all duration-300 shadow-lg shadow-green-900/30 mb-2 md:mb-3 shrink-0">
                        <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        {t('sendViaWhatsApp')}
                        <span className="text-[10px] md:text-xs font-normal opacity-75 hidden sm:inline">({t('pdfAutoDownloads')})</span>
                      </button>

                      {/* Email */}
                      <button onClick={handleEmail} disabled={sending}
                        className="w-full py-3 md:py-4 rounded-xl font-black text-xs md:text-sm flex items-center justify-center gap-2 md:gap-3 bg-zinc-800 hover:bg-zinc-700 text-white transition-all duration-300 border border-zinc-700 disabled:opacity-50 shrink-0">
                        {sending ? (
                          <>
                            <svg className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            {t('sending')}
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t('sendViaEmail')}
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-zinc-600 text-center mt-4">
                        {t('whatsappInfo')} {contact.email}
                      </p>
                    </div>
                  )}

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed right-4 bottom-4 md:right-8 md:bottom-8 flex items-center gap-3 z-50"
            >
             <span className={`text-xs font-sans [writing-mode:vertical-lr] rotate-180 transition-colors duration-300 ${buttonOverWhite ? 'text-zinc-900' : 'text-zinc-100'}`}>
               {t('backToTop')}
             </span>
             <button
               onClick={scrollToTop}
               className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 border ${buttonOverWhite ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700' : 'bg-zinc-800 hover:bg-zinc-700 border-zinc-600'}`}
             >
               <ArrowUp size={20} className={buttonOverWhite ? 'text-white' : 'text-zinc-100'} />
             </button>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    );
  }
