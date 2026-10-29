'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import CareersBanner from '@/components/layout/CareersBanner';

interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  link: string;
}

const contactInfo: ContactInfoItem[] = [
  {
    icon: "/ContactUs/contact-us-icons/phone-icon.svg",
    label: "Call Us",
    value: "+91 9946616162",
    link: "tel:+919946616162",
  },
  {
    icon: "/ContactUs/contact-us-icons/email-icon.svg",
    label: "Email Us",
    value: "info@meatinfoods.com",
    link: "mailto:info@meatinfoods.com",
  },
  {
    icon: "/ContactUs/contact-us-icons/address-icon.svg",
    label: "Our Location",
    value: "15/809E, Panchami Complex, Perumpilavu, Karikkad P.O., Thrissur - 680519, Kerala, India",
    link: "https://maps.google.com/?q=Panchami+Complex+Perumpilavu",
  },
  {
    icon: "/ContactUs/contact-us-icons/whatsapp-icon.svg",
    label: "WhatsApp",
    value: "+91 98765 43210",
    link: "https://wa.me/919876543210",
  }
];

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How do I apply for a job at MEATiN?",
    answer: "You can apply directly using our careers form! Scroll down to the 'Join Our Team' banner below, click 'Apply Now', upload your resume, and submit. Our HR team will review your details."
  },
  {
    question: "How can I become a distributor / trader for MEATiN Product?",
    answer: "We are always expanding our distribution network! Please submit an enquiry using the form above, selecting 'Distributor Enquiry' as the type, or email us directly at info@meatinfoods.com with your location and business profile."
  },
  {
    question: "What documents are required for franchise application?",
    answer: "Typically, you will need business registration proofs, food safety licenses (FSSAI), identity verification (Aadhaar/PAN), and floor layouts of your proposed retail location. Our executive team will share a detailed checklist once you submit a request."
  },
  {
    question: "How can I partner with MEATiN for business collaborations?",
    answer: "We welcome strategic partnerships and corporate tie-ups. Please reach out to our Business Development team via enquiry form, or drop a detailed proposal at info@meatinfoods.com."
  }
];

export default function ContactPage() {
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState('');
  const [customEnquiryType, setCustomEnquiryType] = useState('');
  const [message, setMessage] = useState('');
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // Dropdown & Success states
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const enquiryTypes = [
    'General Enquiry',
    'Sales Enquiry',
    'Distribution Enquiry',
    'Careers',
    'Partnership Enquiry',
    'Franchise Enquiry',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{7,20}$/.test(phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!enquiryType) newErrors.enquiryType = 'Please select enquiry type';
    if (enquiryType === 'Other' && !customEnquiryType.trim()) {
      newErrors.customEnquiryType = 'Please specify your enquiry type';
    }
    if (!message.trim()) newErrors.message = 'Message details are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setEnquiryType('');
    setCustomEnquiryType('');
    setMessage('');
    setErrors({});
    setIsSubmitted(false);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope relative overflow-hidden">
      
      {/* Background Doodle Pattern Overlay (Tiled & Filtered behind cards) */}
      <div
        className="absolute inset-0 pointer-events-none bg-repeat z-0"
        style={{
          backgroundImage: 'url("/Product/Chicken/doodle.webp")',
          backgroundSize: "950px",
          filter: "brightness(0)",
          opacity: 0.4,
        }}
      />

      {/* 1. HERO HEADER BANNER SECTION */}
      <section className="relative z-10 w-full bg-[#064823] pt-[120px] pb-24 md:pt-[150px] md:pb-36 overflow-hidden">
        {/* Background Image Overlay with full opacity from public folder */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/ContactUs/contact-us-bg.webp"
            alt="MEATiN Delivery Truck"
            fill
            priority
            className="object-cover object-center lg:object-right"
          />
        </div>
        {/* Left side gradient overlay to ensure heading readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent pointer-events-none" />

        <div className="relative w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left flex flex-col items-center md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7.5xl font-extrabold font-anek tracking-normal uppercase">
              <span className="text-[#8DC541] mr-4">CONTACT</span>
              <span className="text-white">US</span>
            </h1>
            <p className="text-slate-200 text-sm sm:text-base md:text-lg font-medium max-w-xl leading-relaxed">
              We're here to connect, collaborate and grow together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FLOATING CONTACT INFO BLOCK */}
      <section className="relative px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.035)] border border-slate-100 py-3 md:py-4 px-4 sm:px-6 md:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 md:gap-y-8 lg:gap-y-0">
            {contactInfo.map((item, idx) => {
              // Custom responsive borders for 1col on mobile, 2x2 on md, 1x4 on lg
              const borderClass = 
                idx === 0 ? "border-b md:border-b-0 md:border-r border-slate-150" :
                idx === 1 ? "border-b lg:border-b-0 lg:border-r border-slate-150" :
                idx === 2 ? "border-b md:border-b-0 md:border-r border-slate-150" :
                "";
              return (
                <a
                  href={item.link}
                  key={idx}
                  target={idx === 2 ? "_blank" : undefined}
                  rel={idx === 2 ? "noopener noreferrer" : undefined}
                  className={`group flex items-center text-left py-2 px-3 md:py-2.5 lg:px-4 transition-transform hover:-translate-y-0.5 duration-300 gap-4 ${borderClass}`}
                >
                <div className="w-14 h-14 shrink-0 rounded-full bg-[#EEF6E8] flex items-center justify-center transition-colors group-hover:bg-[#064823] duration-300">
                  <div className="relative w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all duration-300">
                    <Image
                      src={item.icon}
                      alt={item.label}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-[#F7840F] tracking-wide mb-0.5">
                    {item.label}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#064823] transition-colors break-words leading-relaxed font-manrope">
                    {item.value}
                  </p>
                </div>
              </a>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* 3. FORM AND SIDEBAR SPLIT LAYOUT (Single Outer Card) */}
      <section className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto pt-4 md:pt-5 pb-5">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.035)] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-stretch">
            
            {/* Form Side (Left Column) */}
            <div className="lg:col-span-2 flex flex-col justify-between h-full">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064823] font-manrope mb-6">
                Send Us a Message
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="relative w-5 h-5">
                          <Image
                            src="/ContactUs/contact-us-icons/full-name-icon.svg"
                            alt="Name Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Full Name <span className="text-[#D62828]">*</span></label>
                      </div>
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
                        className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-455/80 ${errors.fullName ? 'border-[#D62828]' : 'border-slate-300 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                      />
                      {errors.fullName && <p className="text-xs text-[#D62828]">{errors.fullName}</p>}
                    </div>
                    
                    
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="relative w-5 h-5">
                          <Image
                            src="/ContactUs/contact-us-icons/phone-form-icon.svg"
                            alt="Phone Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Phone Number <span className="text-[#D62828]">*</span></label>
                      </div>
                      <input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors(prev => {
                              const next = { ...prev };
                              delete next.phone;
                              return next;
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-455/80 ${errors.phone ? 'border-[#D62828]' : 'border-slate-300 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                      />
                      {errors.phone && <p className="text-xs text-[#D62828]">{errors.phone}</p>}
                    </div>


                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="relative w-5 h-5">
                          <Image
                            src="/ContactUs/contact-us-icons/email-address-form-icon.svg"
                            alt="Email Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Email Address <span className="text-[#D62828]">*</span></label>
                      </div>
                      <input
                        type="email"
                        placeholder="Enter your email address"
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
                        className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-455/80 ${errors.email ? 'border-[#D62828]' : 'border-slate-300 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                      />
                      {errors.email && <p className="text-xs text-[#D62828]">{errors.email}</p>}
                    </div>


                    {/* Enquiry Type Dropdown */}
                    <div className="space-y-1.5 relative" ref={dropdownRef}>
                      <div className="flex items-center gap-2 mb-1">
                        <div className="relative w-5 h-5">
                          <Image
                            src="/ContactUs/contact-us-icons/enquiry-type.svg"
                            alt="Enquiry Icon"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Enquiry Type <span className="text-[#D62828]">*</span></label>
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowDropdown(!showDropdown)}
                          className={`w-full px-4 py-3 border rounded-xl text-sm flex items-center justify-between text-left outline-none transition-all bg-white ${errors.enquiryType ? 'border-[#D62828]' : 'border-slate-300 focus:border-[#064823]'}`}
                        >
                          <span className={enquiryType ? 'text-slate-800 font-medium' : 'text-slate-400'}>
                            {enquiryType || 'Select enquiry type'}
                          </span>
                          <ChevronDown className="w-4 h-4 text-[#064823] shrink-0" />
                        </button>

                        {showDropdown && (
                          <div
                            data-lenis-prevent
                            className="absolute left-0 right-0 top-[98%] mt-0 bg-white border-2 border-slate-400 rounded-xl shadow-2xl max-h-56 overflow-y-auto z-30 font-medium text-sm"
                          >
                            {enquiryTypes.map((type, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                   setEnquiryType(type);
                                  setShowDropdown(false);
                                  setErrors(prev => {
                                    const next = { ...prev };
                                    delete next.enquiryType;
                                    return next;
                                  });
                                }}
                                className={`w-full text-left px-4 py-2.5 transition-colors ${enquiryType === type ? 'bg-[#EEF6E8] text-[#064823] font-semibold' : 'hover:bg-[#EEF6E8] text-[#064823] hover:text-[#064823]'}`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.enquiryType && <p className="text-xs text-[#D62828]">{errors.enquiryType}</p>}
                    </div>

                  </div>

                  {/* Custom Enquiry Type (If 'Other' is selected) */}
                  <AnimatePresence>
                    {enquiryType === 'Other' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-1.5 overflow-hidden"
                      >
                        <label className="text-xs sm:text-sm font-bold text-slate-700">Specify Enquiry Type <span className="text-[#D62828]">*</span></label>
                        <input
                          type="text"
                          placeholder="Enter your enquiry type"
                          value={customEnquiryType}
                          onChange={(e) => {
                            setCustomEnquiryType(e.target.value);
                            if (errors.customEnquiryType) {
                              setErrors(prev => {
                                const next = { ...prev };
                                delete next.customEnquiryType;
                                return next;
                              });
                            }
                          }}
                          className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-455/80 ${errors.customEnquiryType ? 'border-[#D62828]' : 'border-slate-300 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                        />
                        {errors.customEnquiryType && <p className="text-xs text-[#D62828]">{errors.customEnquiryType}</p>}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message TextArea */}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/ContactUs/contact-us-icons/message-icon.svg"
                          alt="Message Icon"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <label className="text-xs sm:text-sm font-bold text-slate-700">Message <span className="text-[#D62828]">*</span></label>
                    </div>
                    <textarea
                      rows={5}
                      placeholder="Write your message here..."
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) {
                          setErrors(prev => {
                            const next = { ...prev };
                            delete next.message;
                            return next;
                          });
                        }
                      }}
                      className={`w-full px-4 py-3 border rounded-xl text-sm outline-none transition-all placeholder:text-slate-455/80 resize-none ${errors.message ? 'border-[#D62828]' : 'border-slate-300 focus:border-[#064823] focus:ring-1 focus:ring-[#064823]/20'}`}
                    />
                    {errors.message && <p className="text-xs text-[#D62828]">{errors.message}</p>}
                  </div>

                  {/* Submit block */}
                  <div className="flex justify-end pt-2">

                    <button
                      type="submit"
                      className="bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md active:scale-95 hover:shadow-lg self-end md:self-auto"
                    >
                      <div className="relative w-6 h-6">
                        <Image
                          src="/ContactUs/contact-us-icons/bitcoin-icons_share-filled.svg"
                          alt="Submit"
                          fill
                          className="object-contain brightness-0 invert"
                        />
                      </div>
                      Submit Enquiry
                    </button>
                  </div>
                </form>
              ) : (
                // Success Screen View
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 px-4 space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#8DC541]/10 flex items-center justify-center text-[#8DC541] mb-2">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-2xl font-extrabold text-[#064823] uppercase font-manrope">
                    Enquiry Submitted!
                  </h2>
                  <p className="text-slate-600 font-medium text-sm sm:text-base max-w-md leading-relaxed">
                    Successful submission! Thank you for reaching out to us. Our support executives will contact you shortly.
                  </p>
                  <button
                    onClick={resetForm}
                    className="!mt-6 bg-[#064823] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl uppercase transition-all shadow-md active:scale-95"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar Info Box (Right Column Nested Inside Single Card) */}
            <div className="bg-[#F8FAF7] rounded-2xl border border-[#E5EAE1] p-6 sm:p-8 flex flex-col items-center text-center space-y-6 h-full">
              <div className="w-16 h-16 rounded-full bg-[#EAF3E7] flex items-center justify-center">
                <div className="relative w-9 h-9">
                  <Image
                    src="/ContactUs/contact-us-icons/headset-icon.svg"
                    alt="Headset Support"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#064823] font-manrope">
                  We value your time
                </h3>
                <p className="text-xs sm:text-sm text-[#535353] font-medium leading-relaxed max-w-xs">
                  Our team will get back to you as soon as possible.
                </p>
              </div>

              {/* List */}
              <div className="w-full text-left space-y-6 pt-2">
                
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#EAF3E7] flex items-center justify-center">
                    <div className="relative w-6 h-6">
                      <Image
                        src="/ContactUs/contact-us-icons/email-outline.svg"
                        alt="Quick Response"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000000]">Quick Response</h4>
                    <p className="text-xs text-[#535353] font-medium mt-0.5">We usually respond within 24 hours.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#EAF3E7] flex items-center justify-center">
                    <div className="relative w-6 h-6">
                      <Image
                        src="/ContactUs/contact-us-icons/safeguard-outline.svg"
                        alt="Safe Info"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000000]">Your Information is Safe</h4>
                    <p className="text-xs text-[#535353] font-medium leading-normal mt-0.5">
                      We respect your privacy and keep your information secure.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-[#EAF3E7] flex items-center justify-center">
                    <div className="relative w-6 h-6">
                      <Image
                        src="/ContactUs/contact-us-icons/dedicated-support.svg"
                        alt="Dedicated support"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#000000]">Dedicated Support</h4>
                    <p className="text-xs text-[#535353] font-medium mt-0.5">
                      Our team is here to help you with all your queries.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 4. FAQ ACCORDION SECTION (Matching Card Alignment Stacked Below Form) */}
      <section className="relative z-10 w-full max-w-[1400px] lg:max-w-[90vw] mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.6 }}
          className="w-full bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.035)] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 items-center">
            
            {/* Title Block (Vertically Centered) */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 my-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full bg-[#ECF1E6] flex items-center justify-center">
                <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                  <Image
                    src="/ContactUs/contact-us-icons/faq-icon.svg"
                    alt="FAQ"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#064823] font-manrope">
                  Frequently Asked Questions
                </h2>
                <div className="h-[3px] w-14 bg-[#8DC541] mt-2 mb-3 mx-auto sm:mx-0 rounded-full" />
                <p className="text-sm text-[#535353] font-medium leading-relaxed">
                  Find quick answers to common questions about working and partnering with MEATiN.
                </p>
              </div>
            </div>

            {/* Accordion Block */}
            <div className="lg:col-span-2 space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen 
                        ? 'border-[#064823] bg-[#EEF6E8]/30 shadow-sm ring-1 ring-[#064823]/20' 
                        : 'border-slate-200/90 bg-white hover:border-[#064823]/40 hover:bg-[#F8FAF7]'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left p-4 sm:p-5 font-bold text-sm sm:text-base text-[#064823] outline-none"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#064823] shrink-0 ml-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                      )}
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="p-4 sm:p-5 pt-0 border-t border-slate-100/80 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </section>

      {/* 5. REUSABLE CAREERS BANNER */}
      <section className="py-4 md:py-6 w-full">
        <div className="w-full max-w-[1400px] lg:max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8">
          <CareersBanner />
        </div>
      </section>

    </div>
  );
}
