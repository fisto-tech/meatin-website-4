'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  X,
  User,
  Mail,
  Phone,
  ChevronDown,
  Send,
  CheckCircle,
  Pencil,
  Upload
} from 'lucide-react';

export default function CareersBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [position, setPosition] = useState('');
  const [experience, setExperience] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  // Drag and Drop & Preview States
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Dropdown UI Toggle States
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showExperienceDropdown, setShowExperienceDropdown] = useState(false);

  // Errors State
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleUploadedFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'File size exceeds 5MB limit' }));
      setFileName('No file chosen');
      setSelectedFile(null);
      setPreviewUrl(null);
    } else {
      setFileName(file.name);
      setSelectedFile(file);
      // Create local URL for PDF previews
      if (file.type === 'application/pdf') {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
      setErrors(prev => {
        const next = { ...prev };
        delete next.resume;
        return next;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFile(e.target.files[0]);
    }
  };

  const positions = [
    'Administration Assistant',
    'Administration Manager',
    'HR Manager',
    'HR Assistant',
    'ERP Coordinator',
    'Business Development Manager',
    'Business Development Officer',
    'Customer Relations Executive',
    'Customer Relations Officer',
    'Finance Manager',
    'Accounts (General ,Sales)',
    'Managing Director',
    'Chief Marketing Officer'
  ];

  const experiences = [
    'Fresher / < 1 Year',
    '1-2 Years',
    '2-3 Years',
    '3-5 Years',
    '5+ Years'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full name is required';

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(mobile)) {
      newErrors.mobile = 'Enter a valid mobile number';
    }

    if (!position) newErrors.position = 'Please select a position';
    if (!experience) newErrors.experience = 'Please select your experience';

    if (fileName === 'No file chosen') {
      newErrors.resume = 'Please upload your resume';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const handleResetAndClose = () => {
    setIsModalOpen(false);
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
    setMobile('');
    setPosition('');
    setExperience('');
    setCoverLetter('');
    setFileName('No file chosen');
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrors({});
  };

  return (
    <div className="w-full">
      {/* Scroll Reveal Animation Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[1334px] mx-auto rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 relative group"
      >
        {/* =========================================================================
            1. DESKTOP VIEW (hidden md:block) - Clean SVG Banner with Interactive Apply Button
           ========================================================================= */}
        <div className="hidden md:block relative w-full aspect-[1334/427] select-none overflow-hidden">
          {/* Base SVG Banner Asset */}
          <Image
            src="/ContactUs/careers-banner.svg"
            alt="Join Our Team - MEATiN Careers"
            fill
            priority
            className="object-contain w-full h-full pointer-events-none"
            sizes="(max-width: 1334px) 100vw, 1334px"
          />

          {/* Overlay People Cutout & Truck Image */}
          <div
            className="absolute z-10 overflow-hidden pointer-events-none"
            style={{
              left: '56.1%',
              top: '1.1%',
              width: '42.5%',
              height: '94.6%',
              borderRadius: '26% 0 0 0',
            }}
          >
            <Image
              src="/ContactUs/contact-banner-people-image.webp"
              alt="MEATiN Team & Truck"
              fill
              priority
              className="object-cover object-left"
              sizes="(max-width: 1334px) 50vw, 600px"
            />
          </div>

          {/* Interactive Clickable Hotspot for APPLY NOW Button */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="absolute z-20 cursor-pointer focus:outline-none group/btn rounded-xl overflow-hidden"
            style={{
              left: '3.2%',
              top: '72.6%',
              width: '13.1%',
              height: '12.2%',
            }}
            aria-label="Apply Now for Careers at MEATiN"
          >
            {/* Subtle glow & sheen overlay on hover */}
            <div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/20 transition-all duration-300 rounded-xl" />
            <div className="absolute inset-0 ring-2 ring-white/0 group-hover/btn:ring-white/60 transition-all duration-300 rounded-xl shadow-lg" />
          </motion.button>
        </div>

        {/* =========================================================================
            2. MOBILE & TABLET VIEW (block md:hidden) - Custom Compact Animated Layout
           ========================================================================= */}
        <div className="block md:hidden p-4 sm:p-5 bg-[#FBF7F2]">
          <div className="flex flex-col space-y-4">
            {/* Header Title & Subtitle */}
            <div className="flex flex-col items-start space-y-1.5">
              <div className="relative flex flex-col items-start">
                <span className="text-[#064823] font-extrabold text-xs tracking-widest uppercase font-manrope">
                  Careers
                </span>
                <div className="h-[2px] w-[50%] bg-[#064823] mt-0.5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-barlow tracking-relaxed uppercase leading-tight">
                <span className="text-[#8DC541] mr-2">Join</span>
                <span className="text-[#064823]">Our Team</span>
              </h2>
              <p className="text-slate-800 font-medium text-xs sm:text-sm leading-relaxed font-manrope pt-0.5">
                Build your career with MEATiN. We're always looking for passionate and driven people to grow with us.
              </p>
            </div>

            {/* Feature Cards Grid (Grow, Learn, Belong) */}
            <div className="grid grid-cols-3 gap-2 py-1">
              {/* Grow Pill */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="bg-white/90 border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#8DC541]/15 flex items-center justify-center text-[#064823] mb-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <span className="text-[11px] font-extrabold text-[#8DC541] font-barlow uppercase tracking-wider">Grow</span>
                <span className="text-[9px] text-slate-500 font-medium font-manrope mt-0.5 leading-tight">Build career</span>
              </motion.div>

              {/* Learn Pill */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut", delay: 0.2 }}
                className="bg-white/90 border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#8DC541]/15 flex items-center justify-center text-[#064823] mb-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                </div>
                <span className="text-[11px] font-extrabold text-[#8DC541] font-barlow uppercase tracking-wider">Learn</span>
                <span className="text-[9px] text-slate-500 font-medium font-manrope mt-0.5 leading-tight">Develop skills</span>
              </motion.div>

              {/* Belong Pill */}
              <motion.div
                whileHover={{ scale: 1.04 }}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 0.4 }}
                className="bg-white/90 border border-slate-200/80 rounded-xl p-2.5 flex flex-col items-center text-center shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#8DC541]/15 flex items-center justify-center text-[#064823] mb-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-[11px] font-extrabold text-[#8DC541] font-barlow uppercase tracking-wider">Belong</span>
                <span className="text-[9px] text-slate-500 font-medium font-manrope mt-0.5 leading-tight">Be part of team</span>
              </motion.div>
            </div>

            {/* Apply Now Button with Infinite Arrow Motion */}
            <div className="pt-0.5">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2.5 font-manrope group"
              >
                <span>Apply Now</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>

            {/* MEATiN Team Image Header */}
            <div className="relative w-full h-[150px] sm:h-[180px] rounded-xl overflow-hidden shadow-xs border border-slate-200/60">
              <Image
                src="/ContactUs/contact-banner-mobile-image.webp"
                alt="MEATiN Team"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Careers Popup Form Modal overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">

            {/* Modal Box Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3 }}
              data-lenis-prevent
              className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden max-h-[90vh] flex flex-col font-manrope text-slate-800"
            >

              {/* Close Button top-right */}
              <button
                onClick={handleResetAndClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                // FORM VIEW
                <div className="overflow-y-auto pr-1 flex flex-col h-full">
                  {/* Header Title with Briefcase Icon */}
                  <div className="flex items-center gap-3 mb-6 pb-2 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-[#FAF9F5] flex items-center justify-center text-[#064823] border border-[#EBEAE5]">
                      <BriefcaseBusiness className="w-5 h-5" />
                    </div>
                    <h2 className="text-[1.5rem] md:text-[1.75rem] font-extrabold text-[#064823] font-manrope uppercase">
                      Apply For A Position
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                      {/* Full Name Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Full Name <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#064823] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              if (errors.fullName) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.fullName;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 ${errors.fullName ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                          />
                        </div>
                        {errors.fullName && <p className="text-xs text-[#D62828]">{errors.fullName}</p>}
                      </div>

                      {/* Email Address Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Email Address <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#064823] w-4 h-4" />
                          <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.email;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 ${errors.email ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                          />
                        </div>
                        {errors.email && <p className="text-xs text-[#D62828]">{errors.email}</p>}
                      </div>

                      {/* Mobile Number Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Mobile Number <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[#064823] w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Enter your mobile number"
                            value={mobile}
                            onChange={(e) => {
                              setMobile(e.target.value);
                              if (errors.mobile) {
                                setErrors(prev => {
                                  const next = { ...prev };
                                  delete next.mobile;
                                  return next;
                                });
                              }
                            }}
                            className={`w-full pl-9 pr-4 py-2.5 sm:py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 ${errors.mobile ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                          />
                        </div>
                        {errors.mobile && <p className="text-xs text-[#D62828]">{errors.mobile}</p>}
                      </div>

                      {/* Position Dropdown Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Position Interested In <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setShowPositionDropdown(!showPositionDropdown);
                              setShowExperienceDropdown(false);
                            }}
                            className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl text-sm flex items-center justify-between text-left outline-none transition-all ${errors.position ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#064823]'} bg-white`}
                          >
                            <span className={position ? 'text-slate-800' : 'text-slate-400/80'}>
                              {position || 'Select Position'}
                            </span>
                            <ChevronDown className="w-4 h-4 text-[#064823] shrink-0" />
                          </button>
                          {showPositionDropdown && (
                            <div
                              data-lenis-prevent
                              className="absolute left-0 right-0 top-[98%] mt-0 bg-white border-2 border-slate-400 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-30 font-medium text-sm"
                            >
                              {positions.map((p, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setPosition(p);
                                    setShowPositionDropdown(false);
                                    setErrors(prev => {
                                      const next = { ...prev };
                                      delete next.position;
                                      return next;
                                    });
                                  }}
                                  className={`w-full text-left px-4 py-2.5 transition-colors ${position === p ? 'bg-[#064823] text-white' : 'hover:bg-[#EEF6E8] text-[#064823] hover:text-[#064823]'}`}
                                >
                                  {p}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {errors.position && <p className="text-xs text-[#D62828]">{errors.position}</p>}
                      </div>

                      {/* Experience Dropdown Field */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Experience <span className="text-[#D62828]">*</span></label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => {
                              setShowExperienceDropdown(!showExperienceDropdown);
                              setShowPositionDropdown(false);
                            }}
                            className={`w-full px-4 py-2.5 sm:py-3 border rounded-xl text-sm flex items-center justify-between text-left outline-none transition-all ${errors.experience ? 'border-[#D62828]' : 'border-slate-400 focus:border-[#064823]'} bg-white`}
                          >
                            <span className={experience ? 'text-slate-800' : 'text-slate-400/80'}>
                              {experience || 'Select Experience'}
                            </span>
                            <ChevronDown className="w-4 h-4 text-[#064823] shrink-0" />
                          </button>
                          {showExperienceDropdown && (
                            <div
                              data-lenis-prevent
                              className="absolute left-0 right-0 top-[98%] mt-0 bg-white border-2 border-slate-400 rounded-xl shadow-2xl max-h-48 overflow-y-auto z-30 font-medium text-sm"
                            >
                              {experiences.map((exp, idx) => (
                                <button
                                  key={idx}
                                  type="button"
                                  onClick={() => {
                                    setExperience(exp);
                                    setShowExperienceDropdown(false);
                                    setErrors(prev => {
                                      const next = { ...prev };
                                      delete next.experience;
                                      return next;
                                    });
                                  }}
                                  className={`w-full text-left px-4 py-2.5 transition-colors ${experience === exp ? 'bg-[#064823] text-white' : 'hover:bg-[#EEF6E8] text-[#064823] hover:text-[#064823]'}`}
                                >
                                  {exp}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        {errors.experience && <p className="text-xs text-[#D62828]">{errors.experience}</p>}
                      </div>

                      {/* Upload Resume File Field with Drag & Drop Zone */}
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Upload Resume <span className="text-[#D62828]">*</span></label>
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`border rounded-xl p-2 flex flex-wrap sm:flex-nowrap items-center gap-2 bg-white transition-all ${isDragging ? 'border-dashed border-[#064823] bg-[#EEF6E8]/30' : errors.resume ? 'border-[#D62828]' : 'border-slate-400 focus-within:border-[#064823]'}`}
                        >
                          {/* File input (Hidden) */}
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />

                          {/* Green square container with Upload icon */}
                          <div className="w-10 h-10 shrink-0 rounded-lg bg-[#EEF6E8] flex items-center justify-center text-[#064823] mr-1">
                            <Upload className="w-5 h-5" />
                          </div>

                          {/* Custom Button Trigger */}
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="shrink-0 border border-slate-200 text-[#064823] hover:bg-[#EEF6E8] hover:text-[#064823] hover:border-[#EEF6E8] transition-all font-bold text-xs px-3.5 py-2.5 rounded-lg active:scale-95 bg-white shadow-xs"
                          >
                            Choose File
                          </button>

                          <span className="text-xs text-slate-500 truncate min-w-[70px] flex-1">
                            {fileName}
                          </span>

                          {/* Preview Resume Option if file exists */}
                          {selectedFile && (
                            <button
                              type="button"
                              onClick={() => {
                                if (previewUrl) {
                                  window.open(previewUrl, '_blank');
                                } else {
                                  alert(`Previewing is supported directly in the browser for PDF resumes. For Word docs (${selectedFile.name}), please download to view.`);
                                }
                              }}
                              className="shrink-0 border border-[#064823] text-[#064823] hover:bg-[#064823] hover:text-white transition-all font-bold text-[10px] sm:text-xs px-2.5 py-1.5 rounded-lg active:scale-95 ml-auto"
                            >
                              Preview
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">PDF, DOC, DOCX (Max 5MB) • Drag & Drop supported</p>
                        {errors.resume && <p className="text-xs text-[#D62828]">{errors.resume}</p>}
                      </div>

                    </div>

                    {/* Cover Letter Field */}
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-bold text-slate-700">Cover Letter (Optional)</label>
                      <div className="relative">
                        <Pencil className="absolute left-3 top-3 text-[#064823] w-4 h-4" />
                        <textarea
                          rows={3}
                          placeholder="Write a few lines about yourself"
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 border border-slate-400 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20 rounded-xl text-sm outline-none transition-all placeholder:text-slate-400/80 resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-6 py-3.5 sm:px-6 sm:py-3.5 rounded-xl uppercase transition-all duration-300 flex items-center gap-2 shadow-md active:scale-95 hover:shadow-lg font-manrope"
                      >
                        Submit Application <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                // SUCCESS SCREEN VIEW
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8DC541]/15 flex items-center justify-center text-[#8DC541] mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064823] font-manrope uppercase tracking-relaxed">
                    Application Submitted!
                  </h2>
                  <p className="text-slate-800 font-medium text-sm sm:text-base max-w-md leading-relaxed">
                    Successful submission! We will contact you shortly. Thank you for your interest in joining MEATiN.
                  </p>
                  <button
                    onClick={handleResetAndClose}
                    className="mt-8 bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl uppercase transition-all shadow-md active:scale-95"
                  >
                    Close
                  </button>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
