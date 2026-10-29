'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  X, 
  Eye, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  ThermometerSnowflake, 
  CheckCircle2,
  Layers,
  Utensils,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { 
  CHICKEN_PARTS, 
  PART_GLB_MAP, 
  PART_RECIPES_MAP,
  ChickenPartData 
} from '@/data/knowYourMeatData';

export interface ChickenProductItem {
  id: string;
  name: string;
  title: string;
  badge: string;
  weight: string;
  iconImg: string;
  pouchImg: string;
  platterImg: string;
  rawImg: string;
  desc: string;
  detailedDesc: string;
  cookingMethods: string[];
  nutrition: {
    protein: string;
    calories: string;
    fat: string;
    carbs: string;
  };
  storage: string;
  idealFor: string;
}

// 10 Pure Chicken Products matching 1:1 the 10 cuts in Know Your Meat
const CHICKEN_PRODUCTS: ChickenProductItem[] = [
  {
    id: 'breast',
    name: 'Breast',
    title: 'Fresh Chicken Breast',
    badge: 'High Protein',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/brest.webp',
    pouchImg: '/Product/Chicken/packed-meat/breast.webp',
    platterImg: '/Product/Chicken/Platters/breast.webp',
    rawImg: '/Product/Chicken/raw-meat/brest.webp',
    desc: 'Lean and protein-rich boneless chicken breast fillets. Extremely versatile and perfect for healthy salads, grilling, and baking.',
    detailedDesc: 'Tender, juicy, and 100% trimmed chicken breast fillets without skin or bone. Sourced from antibiotic-free poultry and vacuum-chilled to lock in fresh moisture and essential amino acids.',
    cookingMethods: ['Grilling', 'Pan Searing', 'Salads', 'Diet Meal Prep'],
    nutrition: { protein: '23.0 g', calories: '165 kcal', fat: '3.6 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Fitness diets, grilled fillets, continental salads and stir-fries.',
  },
  {
    id: 'drumstick',
    name: 'Drumstick',
    title: 'Juicy Chicken Drumsticks',
    badge: 'Best Seller',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/drumstick.webp',
    pouchImg: '/Product/Chicken/packed-meat/drumstick.webp',
    platterImg: '/Product/Chicken/Platters/drumstick.webp',
    rawImg: '/Product/Chicken/raw-meat/drumstick.webp',
    desc: 'Tender and juicy drumsticks, perfectly cut and hygienically packed to retain natural freshness and rich taste in every bite.',
    detailedDesc: 'Expertly butchered drumsticks with bone-in succulent meat that stays exceptionally moist and juicy when cooked. Ideal for marination, crispy frying, and slow-simmered rich curries.',
    cookingMethods: ['Tandoor / Roast', 'Deep Frying', 'Kerala Curry', 'Biryani'],
    nutrition: { protein: '20.4 g', calories: '160 kcal', fat: '7.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Tandoori chicken, biryani pieces, and spicy South Indian fry.',
  },
  {
    id: 'thigh',
    name: 'Thigh',
    title: 'Prime Chicken Thighs',
    badge: 'Tender & Moist',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/thig.webp',
    pouchImg: '/Product/Chicken/packed-meat/thigh.webp',
    platterImg: '/Product/Chicken/Platters/thigh.webp',
    rawImg: '/Product/Chicken/raw-meat/thigh.webp',
    desc: 'Flavorful and tender chicken thighs, bone-in and skin-on. Holds moisture perfectly for slow cooking and roasts.',
    detailedDesc: 'Chicken thighs are revered by chefs for their generous fat-to-meat ratio and tender texture that never dries out during cooking. Perfect for stews, curries, and oven bakes.',
    cookingMethods: ['Slow Curry', 'Oven Bake', 'Biryani', 'BBQ Grill'],
    nutrition: { protein: '18.0 g', calories: '209 kcal', fat: '15.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Dum Biryani, slow-cooked gravies, and braised chicken delicacies.',
  },
  {
    id: 'wing',
    name: 'Wing',
    title: 'Crispy Chicken Wings',
    badge: 'Party Favorite',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/wing.webp',
    pouchImg: '/Product/Chicken/packed-meat/wings.webp',
    platterImg: '/Product/Chicken/Platters/wings.webp',
    rawImg: '/Product/Chicken/raw-meat/wing.webp',
    desc: 'Crispy and delicious chicken wings, perfect for deep frying, barbecue, or baking with your favorite glaze.',
    detailedDesc: 'Carefully trimmed whole wing sections ready to take on dry rubs, marinades, or fiery glazes. Crisp up beautifully on the grill, oven, or air fryer.',
    cookingMethods: ['Air Fry', 'Deep Fry', 'Barbecue', 'Glazed Bake'],
    nutrition: { protein: '18.5 g', calories: '203 kcal', fat: '14.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Hot buffalo wings, honey chili wings, and game day snacks.',
  },
  {
    id: 'drumette',
    name: 'Drumette',
    title: 'Meaty Chicken Drumettes',
    badge: 'Snack Special',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/drumette.webp',
    pouchImg: '/Product/Chicken/packed-meat/drumette.webp',
    platterImg: '/Product/Chicken/Platters/drumette.webp',
    rawImg: '/Product/Chicken/raw-meat/drumette.webp',
    desc: 'Juicy and meaty drumettes, the perfect party starter. Great for spicy buffalo wings or crispy batter fry.',
    detailedDesc: 'The meatiest part of the wing, offering pure tender chicken on a convenient small bone. Great for lollipop preparations, glazed skewers, and finger snacks.',
    cookingMethods: ['Chicken Lollipop', 'Deep Fry', 'Air Fry', 'Pan Roast'],
    nutrition: { protein: '19.0 g', calories: '170 kcal', fat: '9.5 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Chicken lollipops, starters, and kid-friendly crispy bites.',
  },
  {
    id: 'back',
    name: 'Back',
    title: 'Chicken Back & Broth Cuts',
    badge: 'Rich Collagen',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/bact.webp',
    pouchImg: '/Product/Chicken/packed-meat/back.webp',
    platterImg: '/Product/Chicken/Platters/back.webp',
    rawImg: '/Product/Chicken/raw-meat/back.webp',
    desc: 'Clean-cut chicken backs, rich in marrow and collagen. The ultimate choice for deep, flavorful bone broths and stocks.',
    detailedDesc: 'Rich in bone marrow, collagen, and healthy fats. Simmer for hours with aromatics to produce golden, gut-healing chicken bone broth and silky ramen soups.',
    cookingMethods: ['Bone Broth', 'Soup Stock', 'Pressure Stew', 'Base Gravy'],
    nutrition: { protein: '15.0 g', calories: '220 kcal', fat: '17.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Nutritious chicken bone broth, medicinal soups, and rich stocks.',
  },
  {
    id: 'liver',
    name: 'Liver',
    title: 'Nutrient Chicken Liver',
    badge: 'Iron & Vitamins',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/liver.webp',
    pouchImg: '/Product/Chicken/packed-meat/liver.webp',
    platterImg: '/Product/Chicken/Platters/liver.webp',
    rawImg: '/Product/Chicken/raw-meat/liver.webp',
    desc: 'Fresh and nutrient-dense chicken liver, rich in iron, vitamin A, and essential vitamins. Soft texture and rich taste.',
    detailedDesc: 'Carefully trimmed and washed chicken liver, exceptionally high in iron, vitamin A, and B vitamins. Cooks quickly to a tender, melt-in-the-mouth texture.',
    cookingMethods: ['Pepper Fry', 'Dry Roast', 'Masala Gravy', 'Pâté'],
    nutrition: { protein: '17.2 g', calories: '119 kcal', fat: '4.8 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 24-48 hours.',
    idealFor: 'Spicy Kerala liver roast, pepper fry, and iron-boosting curries.',
  },
  {
    id: 'gizzard',
    name: 'Gizzard',
    title: 'Fresh Chicken Gizzard',
    badge: 'Firm Texture',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/gizzard.webp',
    pouchImg: '/Product/Chicken/packed-meat/gizzard.webp',
    platterImg: '/Product/Chicken/Platters/gizzard.webp',
    rawImg: '/Product/Chicken/raw-meat/gizzard.webp',
    desc: 'Tough and highly flavorful chicken gizzards. Firm texture that becomes beautifully tender when braised or slow-cooked.',
    detailedDesc: 'Thoroughly sanitized and trimmed gizzards for traditional connoisseurs. Dense muscular texture that develops rich depth of flavor during slow cooking.',
    cookingMethods: ['Slow Braise', 'Pressure Cook Curry', 'Dry Fry', 'Pickle'],
    nutrition: { protein: '18.0 g', calories: '94 kcal', fat: '2.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Spicy gizzard masala, bar bites, and traditional country gravies.',
  },
  {
    id: 'neck',
    name: 'Neck',
    title: 'Chicken Neck Pieces',
    badge: 'Deep Flavor',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/neck.webp',
    pouchImg: '/Product/Chicken/packed-meat/neck.webp',
    platterImg: '/Product/Chicken/Platters/neck.webp',
    rawImg: '/Product/Chicken/raw-meat/neck.webp',
    desc: 'Rich bone-in chicken necks, perfect for preparing highly nutritious stocks, soups, and slow-cooked gravies.',
    detailedDesc: 'Trimmed neck portions that release rich natural gelatin while cooking. Highly sought-after for thickening and enhancing traditional home curries.',
    cookingMethods: ['Slow Curry', 'Bone Soup', 'Village Masala', 'Stock'],
    nutrition: { protein: '16.0 g', calories: '180 kcal', fat: '12.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Spicy homestyle gravies, soup bases, and slow simmering.',
  },
  {
    id: 'heart',
    name: 'Heart',
    title: 'Tender Chicken Hearts',
    badge: 'Lean Superfood',
    weight: '500g',
    iconImg: '/Product/Chicken/ChickenParts/heart.webp',
    pouchImg: '/Product/Chicken/packed-meat/heart.webp',
    platterImg: '/Product/Chicken/Platters/heart.webp',
    rawImg: '/Product/Chicken/raw-meat/heart.webp',
    desc: 'Clean and trimmed chicken hearts. High in protein and iron with a firm, chewy texture, excellent for skewers and stir-fries.',
    detailedDesc: 'Trimmed hearts with excess fat removed. Naturally firm texture with rich mineral profile. A culinary favorite for flame-grilled yakitori and sautéed appetizers.',
    cookingMethods: ['Flame Skewers', 'Stir Fry', 'Pepper Sauté', 'Braising'],
    nutrition: { protein: '16.0 g', calories: '150 kcal', fat: '9.0 g', carbs: '0 g' },
    storage: 'Store between 0°C to 4°C. Cook within 48 hours or freeze.',
    idealFor: 'Yakitori style skewers, garlic pepper roast, and hearty stir fries.',
  },
];

/* =========================================================================
   1:1 EXACT INTERACTIVE PRODUCT DETAIL EXPERIENCE (From Know Your Meat Section 3 & Section 4)
   ========================================================================= */
function ProductDetailExperience({ initialPart }: { initialPart: string }) {
  const router = useRouter();
  const [activeViewTab, setActiveViewTab] = useState<'raw' | 'packed' | 'platter' | '3d'>('raw');
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isAutoSwitchStopped, setIsAutoSwitchStopped] = useState(false);
  const [isOrbitHovered, setIsOrbitHovered] = useState(false);
  const userInteractionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Match initial cut
  const matchedIdx = useMemo(() => {
    const normalized = (initialPart || '').toLowerCase().trim();
    const idx = CHICKEN_PARTS.findIndex((part) => {
      const partName = part.name.toLowerCase().trim();
      if (normalized === 'brest' && partName === 'breast') return true;
      if (normalized === 'bact' && partName === 'back') return true;
      return (
        partName === normalized ||
        normalized.includes(partName) ||
        partName.includes(normalized)
      );
    });
    return idx !== -1 ? idx : 0;
  }, [initialPart]);

  const [selectedPartIdx, setSelectedPartIdx] = useState<number>(matchedIdx);

  useEffect(() => {
    setSelectedPartIdx(matchedIdx);
  }, [matchedIdx]);

  // Responsive Screen Size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScreenSize('mobile');
      else if (window.innerWidth < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const registerUserInteraction = () => {
    setIsAutoSwitchStopped(true);
    if (userInteractionTimeoutRef.current) {
      clearTimeout(userInteractionTimeoutRef.current);
    }
    userInteractionTimeoutRef.current = setTimeout(() => {
      setIsAutoSwitchStopped(false);
      setIsOrbitHovered(false);
    }, 5000);
  };

  // Auto-switch through the 4 tabs every 3.5s unless hovered or clicked
  useEffect(() => {
    if (isAutoSwitchStopped || isOrbitHovered) return;

    const tabs: ('raw' | 'packed' | 'platter' | '3d')[] = ['raw', 'packed', 'platter', '3d'];
    const timer = setInterval(() => {
      setActiveViewTab((prev) => {
        const idx = tabs.indexOf(prev);
        return tabs[(idx + 1) % tabs.length];
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isAutoSwitchStopped, isOrbitHovered]);

  // Lazily inject Google <model-viewer> web component ONLY when 3D mode is viewed
  useEffect(() => {
    if (activeViewTab === '3d' && typeof window !== 'undefined') {
      if (!document.querySelector('script[src*="model-viewer"]')) {
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
        document.body.appendChild(script);
      }
    }
  }, [activeViewTab]);

  const currentPart = CHICKEN_PARTS[selectedPartIdx] || CHICKEN_PARTS[0];

  const getPlateStyle = (part: ChickenPartData) => {
    const custom = part?.plateStyle;
    const fallback = {
      mobile: { width: '68%', height: '76%', marginTop: '-12%' },
      tablet: { width: '44%', height: '62%', marginTop: '-10%' },
      desktop: { width: '42%', height: '62%', marginTop: '-10%' },
    };

    if (screenSize === 'mobile') return custom?.mobile || fallback.mobile;
    if (screenSize === 'tablet') return custom?.tablet || fallback.tablet;
    return custom?.desktop || fallback.desktop;
  };

  // Rotating dashed ring with alternating odd Red & even Dark Green dashes
  const renderAlternatingDottedRing = () => {
    const count = 16;
    const radius = 47.5;
    const dashSpan = 13.5;

    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none animate-spin z-0 overflow-visible"
        style={{
          animationDuration: '12s',
          animationTimingFunction: 'linear',
        }}
        viewBox="0 0 100 100"
      >
        {Array.from({ length: count }, (_, i) => {
          const startAngle = (i * 360) / count;
          const endAngle = startAngle + dashSpan;
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = 50 + radius * Math.cos(startRad);
          const y1 = 50 + radius * Math.sin(startRad);
          const x2 = 50 + radius * Math.cos(endRad);
          const y2 = 50 + radius * Math.sin(endRad);

          const isOdd = (i + 1) % 2 === 1;
          const color = isOdd ? '#E31E24' : '#15803D';
          const shadowStyle = isOdd
            ? 'drop-shadow(0px 0px 2.5px rgba(227, 30, 36, 0.35))'
            : 'drop-shadow(0px 0px 2.5px rgba(21, 128, 61, 0.35))';

          return (
            <path
              key={i}
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
              stroke={color}
              strokeWidth={2.8}
              strokeLinecap="round"
              fill="none"
              style={{ filter: shadowStyle }}
            />
          );
        })}
      </svg>
    );
  };

  // Animated flowing curved arrow with alternating red & dark green dashes entering dead-center into the arrowhead
  const renderAnimatedCurvedArrow = (
    direction: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right',
    isActive: boolean
  ) => {
    let curvePath = '';
    let arrowHead = '';

    if (direction === 'top-left') {
      curvePath = 'M 2 3 C 60 1, 115 12, 145 44';
      arrowHead = 'M 153.2 41.8 L 156.6 56.4 L 142.2 52.0 L 145 44 Z';
    } else if (direction === 'bottom-left') {
      curvePath = 'M 2 61 C 60 63, 115 52, 145 20';
      arrowHead = 'M 142.2 12.0 L 156.6 7.6 L 153.2 22.2 L 145 20 Z';
    } else if (direction === 'top-right') {
      curvePath = 'M 163 3 C 105 1, 50 12, 20 44';
      arrowHead = 'M 11.8 41.8 L 8.4 56.4 L 22.8 52.0 L 20 44 Z';
    } else {
      // bottom-right
      curvePath = 'M 163 61 C 105 63, 50 52, 20 20';
      arrowHead = 'M 22.8 12.0 L 8.4 7.6 L 11.8 22.2 L 20 20 Z';
    }

    if (!isActive) {
      return (
        <svg
          width="165"
          height="65"
          viewBox="0 0 165 65"
          fill="none"
          className="w-full h-auto opacity-75 hover:opacity-100 transition-opacity duration-300"
        >
          <path
            d={curvePath}
            stroke="#000000"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path d={arrowHead} fill="#000000" />
        </svg>
      );
    }

    return (
      <svg
        width="165"
        height="65"
        viewBox="0 0 165 65"
        fill="none"
        className="w-full h-auto overflow-visible"
      >
        <style>{`
          @keyframes arrowFlow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -24; }
          }
        `}</style>
        <path
          d={curvePath}
          stroke="#E31E24"
          strokeWidth="3.8"
          strokeDasharray="14 10"
          strokeLinecap="round"
          style={{
            animation: 'arrowFlow 1.3s linear infinite',
            filter: 'drop-shadow(0px 0px 3px rgba(227, 30, 36, 0.4))',
          }}
        />
        <path
          d={curvePath}
          stroke="#15803D"
          strokeWidth="3.8"
          strokeDasharray="14 10"
          strokeDashoffset="12"
          strokeLinecap="round"
          style={{
            animation: 'arrowFlow 1.3s linear infinite',
            filter: 'drop-shadow(0px 0px 3px rgba(21, 128, 61, 0.4))',
          }}
        />
        <path
          d={arrowHead}
          fill="#E31E24"
          style={{
            filter: 'drop-shadow(0px 0px 3px rgba(227, 30, 36, 0.45))',
          }}
        />
      </svg>
    );
  };

  const currentGlb =
    PART_GLB_MAP[currentPart.name] ||
    PART_GLB_MAP[currentPart.name.toLowerCase()] ||
    '/Product/details/glb/drumstick.glb';

  const partKey = currentPart.name.toLowerCase().trim();
  const rawRecipes = PART_RECIPES_MAP[partKey] || PART_RECIPES_MAP['drumette'] || [];
  const partRecipes = rawRecipes.slice(0, 4);
  const firstRecipe = partRecipes[0] || rawRecipes[0];
  const firstRecipeHref = firstRecipe
    ? `/recipes?part=${encodeURIComponent(partKey)}&recipeId=${encodeURIComponent(partKey)}-1&title=${encodeURIComponent(firstRecipe.title)}`
    : `/recipes?part=${encodeURIComponent(partKey)}`;

  return (
    <div className="w-full min-h-screen bg-[#8DC541] flex flex-col font-anek">
      {/* 1. EXACT SECTION 3 DETAILS SECTION (1:1 with Reference Screenshot) */}
      <section className="relative z-30 w-full pt-20 sm:pt-24 lg:pt-[4.5rem] xl:pt-[5.5rem] pb-8 sm:pb-10 lg:pb-8 flex flex-col justify-center m-0 overflow-x-hidden bg-[#8DC541]">
        {/* Background Image Container */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Layer 1: Background Doodle Pattern Overlay */}
          <div
            className="absolute top-0 inset-x-0 h-[65%] pointer-events-none bg-repeat z-0 opacity-[0.18] filter brightness-0"
            style={{
              backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
              backgroundSize: '700px',
            }}
          />

          {/* Layer 2: Main Section Background Image */}
          <Image
            src="/Product/details/section-images/product-details-bg.webp"
            alt="Section Background"
            fill
            priority
            className="object-cover object-[15%_0%] lg:object-center w-full h-full relative z-10"
          />

          {/* Floating single leaf - right side */}
          <div className="hidden md:block lg:block absolute bottom-[11vw] right-[7vw] w-[5.5vw] h-auto z-10">
            <Image
              src="/Product/details/section-images/single-leaf-image-1.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Floating single leaf - right corner */}
          <div className="hidden md:block lg:block absolute bottom-[12vw] right-[0vw] w-[3.5vw] h-auto z-10 opacity-90 animate-pulse">
            <Image
              src="/Product/details/section-images/single-leaf-image-right-corner.webp"
              alt="Leaf"
              width={140}
              height={140}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* TOP MAIN CONTENT CONTAINER */}
        <div className="relative w-full max-w-[100vw] mx-auto px-4 lg:px-[3.5vw] flex-1 lg:flex-none flex flex-col justify-start z-10 pt-1 lg:pt-[0.5vw]">

          {/* Top Left Slogan Badge: Goodness Begins at Our Farms + Two Leaves */}
          <div className="hidden md:flex lg:flex flex-col items-start absolute top-[1.2rem] lg:top-[1.6rem] xl:top-[2rem] 2xl:top-[2.4rem] left-[2.5vw] md:left-[3.5vw] z-20 pointer-events-none scale-90 md:scale-100">
            <div className="w-[13.5vw] max-w-[240px] h-auto">
              <Image
                src="/Product/details/section-images/goodness-begins-image.webp"
                alt="Goodness Begins at Our Farms"
                width={260}
                height={160}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
            <div className="w-[8.5vw] max-w-[150px] h-auto ml-[3vw]">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={140}
                height={100}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Top Center Title Header */}
          <div className="text-center w-full max-w-[90%] sm:max-w-[80%] lg:max-w-[42vw] mx-auto z-20 pt-1 lg:pt-[0.2vw] mt-0 lg:mt-1 flex flex-col items-center">
            {/* Back to All Products Button */}
            <button
              type="button"
              onClick={() => router.push('/product')}
              className="mb-2 sm:mb-2.5 inline-flex items-center gap-1.5 bg-white/95 hover:bg-white text-[#064823] hover:text-[#d52828] border border-black/15 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer group select-none"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#d52828]" />
              <span>Back to All Products</span>
            </button>

            <h4 className="text-xs sm:text-sm lg:text-[1vw] font-medium text-[#d52828] tracking-widest uppercase leading-none">
              FRESH PREMIUM CHICKEN
            </h4>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4vw] font-bold text-[#17442d] tracking-normal uppercase leading-none mt-1 lg:mt-[0.3vw] drop-shadow-sm font-anek">
              {currentPart.name}
            </h2>
            <p className="text-xs sm:text-sm lg:text-[0.82vw] font-semibold text-slate-900 leading-relaxed max-w-[92%] sm:max-w-[80%] lg:max-w-[38vw] mx-auto mt-2 lg:mt-[0.5vw]">
              {currentPart.desc}
            </p>
          </div>

          {/* Top Right Nutrition Card (Desktop only) */}
          <div className="hidden lg:block absolute top-[1.2rem] lg:top-[1.6rem] xl:top-[2rem] 2xl:top-[2.4rem] right-[3vw]">
            <Image
              src="/Product/details/section-images/nutrition-information.svg"
              alt="Nutrition information card"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[17vw] max-w-[340px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Leaf - Pure natural nutrition */}
          <div className="hidden lg:block absolute top-[calc(1.2rem+8.2vw)] lg:top-[calc(1.6rem+8.4vw)] xl:top-[calc(2rem+7.5vw)] 2xl:top-[calc(2.4rem+7vw)] right-[6.5vw]">
            <Image
              src="/Product/details/section-images/pure-natural-nutrition.webp"
              alt="Leaf - Pure nutritional information"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[9vw] max-w-[170px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Benefits */}
          <div className="hidden lg:block absolute top-[calc(1.2rem+13.8vw)] lg:top-[calc(1.6rem+13.6vw)] xl:top-[calc(2rem+12.8vw)] 2xl:top-[calc(2.4rem+12vw)] right-[6.5vw]">
            <Image
              src="/Product/details/section-images/benefits-texts.svg"
              alt="Benefits"
              width={350}
              height={150}
              className="w-[180px] sm:w-[360px] lg:w-[10.5vw] max-w-[190px] h-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>

          {/* Top Right Decorative Leaf Prop for Tablet Viewports */}
          <div className="hidden md:block lg:hidden absolute top-[2rem] right-[4vw] z-20 pointer-events-none">
            <div className="w-[10vw] max-w-[110px] h-auto opacity-80">
              <Image
                src="/Product/details/section-images/two-leaves-images.webp"
                alt="Leaves"
                width={120}
                height={90}
                className="w-full h-auto object-contain transform rotate-45"
              />
            </div>
          </div>

          {/* CENTER PRODUCT ORBIT DISPLAY */}
          <div className="relative w-full max-w-[85vw] sm:max-w-[70vw] md:max-w-[60vw] lg:max-w-[42vw] xl:max-w-[43vw] h-[220px] sm:h-[290px] md:h-[330px] lg:h-[25vw] xl:h-[26vw] mx-auto mt-0 sm:-mt-1 md:-mt-2 lg:-mt-[1.4vw] xl:-mt-[1.6vw] 2xl:-mt-[1.8vw] mb-1 sm:mb-2 flex items-center justify-center">
            {/* Main Center Selected Cut / Model Display */}
            <div className="relative w-[265px] sm:w-[410px] md:w-[470px] lg:w-[36vw] xl:w-[33.5vw] h-[195px] sm:h-[290px] md:h-[330px] lg:h-[26vw] xl:h-[27vw] flex items-center justify-center z-10">
              <AnimatePresence mode="wait">
                {activeViewTab === 'raw' && (
                  <motion.div
                    key={`raw-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Static Wood Plate */}
                    <img
                      src="/Product/Chicken/ChickenParts/woodPlate.webp"
                      alt="Wood Plate"
                      className="absolute inset-0 w-full h-full object-contain select-none pointer-events-none"
                    />

                    {/* Chicken Part positioned on plate */}
                    <div
                      className="relative z-10 flex items-center justify-center"
                      style={getPlateStyle(currentPart)}
                    >
                      <img
                        src={currentPart.productImg || '/Product/Chicken/ChickenParts/drumstick.webp'}
                        alt={currentPart.name}
                        className="w-full h-full object-contain select-none pointer-events-none drop-shadow-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {activeViewTab === 'packed' && (
                  <motion.div
                    key={`packed-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentPart.pouchImg || '/Product/details/packedProduct.webp'}
                      alt="Packed Pouch"
                      width={550}
                      height={550}
                      className="w-[180px] sm:w-[250px] md:w-[295px] lg:w-[19vw] xl:w-[19.5vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>
                )}

                {activeViewTab === 'platter' && (
                  <motion.div
                    key={`platter-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.82, y: 32 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.88, y: -18 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={currentPart.platterImg || '/Product/Chicken/Platters/drumstick.webp'}
                      alt="Prepared Platter"
                      width={550}
                      height={420}
                      className="w-[195px] sm:w-[295px] md:w-[345px] lg:w-[27vw] xl:w-[27.5vw] h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </motion.div>
                )}

                {activeViewTab === '3d' && (
                  <motion.div
                    key={`3d-${selectedPartIdx}`}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[90%] h-[90%] relative flex items-center justify-center rounded-2xl overflow-hidden drop-shadow-2xl z-20"
                  >
                    <style>{`
                      model-viewer::part(default-progress-bar),
                      model-viewer::part(default-progress-mask),
                      model-viewer > #default-progress-bar {
                        display: none !important;
                      }
                    `}</style>
                    {React.createElement(
                      'model-viewer',
                      {
                        src: currentGlb,
                        alt: `3D model of ${currentPart.name}`,
                        'auto-rotate': true,
                        'auto-rotate-delay': 0,
                        'rotation-per-second': '30deg',
                        'camera-controls': true,
                        'disable-zoom': true,
                        'touch-action': 'pan-y',
                        'shadow-intensity': '1.2',
                        'shadow-softness': '0.8',
                        exposure: '1.15',
                        loading: 'eager',
                        style: {
                          width: '88%',
                          height: '88%',
                          minHeight: '150px',
                          outline: 'none',
                          cursor: 'grab',
                          backgroundColor: 'transparent',
                        },
                      },
                      React.createElement('div', {
                        slot: 'progress-bar',
                        style: { display: 'none' },
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* DESKTOP ORBIT BADGE 1: Top-Left (Single Raw Cut) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('raw');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:top-[0.8vw] lg:-left-[3.8vw] xl:-left-[4.2vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute top-[1.8vw] -right-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('top-left', activeViewTab === 'raw')}
              </div>
              <div
                className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[5.4vw] lg:h-[5.4vw] xl:w-[5vw] xl:h-[5vw] rounded-full flex items-center justify-center p-2 lg:p-[0.6vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === 'raw'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === 'raw' && renderAlternatingDottedRing()}
                <Image
                  src={currentPart.productImg || '/Product/Chicken/ChickenParts/drumstick.webp'}
                  alt="Raw Cut"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 2: Bottom-Left (Pouch / Packaged) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('packed');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:bottom-[2.4vw] xl:bottom-[2.6vw] lg:-left-[4.4vw] xl:-left-[4.8vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute bottom-[1.8vw] -right-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('bottom-left', activeViewTab === 'packed')}
              </div>
              <div
                className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[5.4vw] lg:h-[5.4vw] xl:w-[5vw] xl:h-[5vw] rounded-full flex items-center justify-center p-2 lg:p-[0.6vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === 'packed'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === 'packed' && renderAlternatingDottedRing()}
                <Image
                  src={currentPart.pouchImg || '/Product/details/packedProduct.webp'}
                  alt="Pouch Pack"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 3: Top-Right (Bowl / Platter) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('platter');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:top-[0.8vw] lg:-right-[2.5vw] xl:-right-[2.8vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute top-[1.8vw] -left-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('top-right', activeViewTab === 'platter')}
              </div>
              <div
                className={`relative w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[5.4vw] lg:h-[5.4vw] xl:w-[5vw] xl:h-[5vw] rounded-full flex items-center justify-center p-2 lg:p-[0.6vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === 'platter'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === 'platter' && renderAlternatingDottedRing()}
                <Image
                  src={currentPart.platterImg || '/Product/Chicken/Platters/drumstick.webp'}
                  alt="Platter"
                  width={100}
                  height={100}
                  className="w-full h-full object-contain relative z-10"
                />
              </div>
            </div>

            {/* DESKTOP ORBIT BADGE 4: Bottom-Right (View in 360°) */}
            <div
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab(activeViewTab === '3d' ? 'raw' : '3d');
              }}
              onMouseEnter={() => {
                setIsOrbitHovered(true);
                if (userInteractionTimeoutRef.current) clearTimeout(userInteractionTimeoutRef.current);
              }}
              onMouseLeave={() => {
                setIsOrbitHovered(false);
                registerUserInteraction();
              }}
              className="hidden lg:block absolute lg:bottom-[2.8vw] xl:bottom-[3.2vw] lg:-right-[6.5vw] xl:-right-[6.8vw] z-30 group cursor-pointer"
            >
              <div className="hidden lg:block absolute bottom-[1.8vw] -left-[5.8vw] w-[5.6vw] h-auto pointer-events-none z-10">
                {renderAnimatedCurvedArrow('bottom-right', activeViewTab === '3d')}
              </div>
              <div
                className={`relative w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] lg:w-[5.8vw] lg:h-[5.8vw] xl:w-[5.4vw] xl:h-[5.4vw] rounded-full flex flex-col items-center justify-center p-1.5 lg:p-[0.4vw] hover:scale-110 transition-all duration-300 ${
                  activeViewTab === '3d'
                    ? 'border-[1.5px] border-transparent scale-110'
                    : 'border-[1.5px] border-black hover:border-black'
                }`}
              >
                {activeViewTab === '3d' && renderAlternatingDottedRing()}
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={50}
                  height={50}
                  className="w-5 h-5 lg:w-[2.8vw] lg:h-[2.8vw] object-contain -mt-[0.25vw] relative z-10"
                />
                <span className="text-[9px] lg:text-[0.62vw] xl:text-[0.68rem] font-black text-slate-800 tracking-tight leading-none mt-0.5 lg:-mt-[0.18vw] uppercase whitespace-nowrap relative z-10">
                  View in 360°
                </span>
              </div>
            </div>
          </div>

          {/* MOBILE / TABLET FLOATING BUTTONS ROW */}
          <div className="grid lg:hidden grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[340px] sm:max-w-none mx-auto mt-1 mb-2 sm:mt-2 sm:mb-3 z-30 px-3">
            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('raw');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === 'raw'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={currentPart.productImg || '/Product/Chicken/ChickenParts/drumstick.webp'}
                  alt="Raw Cut"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Raw Cut</span>
            </button>

            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('packed');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === 'packed'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={currentPart.pouchImg || '/Product/details/packedProduct.webp'}
                  alt="Packed Pouch"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Packed</span>
            </button>

            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab('platter');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === 'platter'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src={currentPart.platterImg || '/Product/Chicken/Platters/drumstick.webp'}
                  alt="Platter"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">Platter</span>
            </button>

            <button
              type="button"
              onClick={() => {
                registerUserInteraction();
                setActiveViewTab(activeViewTab === '3d' ? 'raw' : '3d');
              }}
              className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all w-full sm:w-auto ${
                activeViewTab === '3d'
                  ? 'bg-[#F2CE07] text-[#17442d] border-2 border-dotted border-[#17442d] ring-2 ring-[#F2CE07]/50 shadow-md scale-[1.04]'
                  : 'bg-white text-slate-800 border border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 relative shrink-0">
                <Image
                  src="/Product/details/360.webp"
                  alt="360 View"
                  width={30}
                  height={30}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="whitespace-nowrap">360° View</span>
            </button>
          </div>
        </div>

        {/* BOTTOM GREEN FOOTER SECTION */}
        <div className="relative w-full z-30 pb-4 sm:pb-6 lg:pb-[1.5vw] px-4 sm:px-8 lg:px-[3.5vw] mt-4 sm:mt-6 lg:mt-[0.6vw] xl:mt-[0.8vw]">
          {/* Center Stamp Badge */}
          <div className="w-[140px] hidden lg:block lg:w-[7.5vw] xl:w-[7vw] h-auto absolute -top-[16px] sm:-top-[20px] lg:-top-[1.8vw] xl:-top-[2vw] left-1/2 -translate-x-1/2 z-40 drop-shadow-md">
            <Image
              src="/Product/details/section-images/keralas_original-meat.webp"
              alt="Kerala's Original Meat"
              width={170}
              height={110}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Bottom Row */}
          <div className="relative z-30 w-full flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-[1.5vw] pt-5 sm:pt-6 lg:pt-0">
            {/* 1. Bottom Left Recipe Card */}
            <div className="relative w-full max-w-[350px] sm:max-w-[420px] lg:max-w-none lg:w-[21.5vw] bg-[#FDFBF2] rounded-2xl lg:rounded-[1vw] shadow-lg border border-white/80 flex items-center gap-3 lg:gap-[0.8vw] p-2.5 sm:p-3 lg:p-0 order-3 lg:order-1">
              <div className="absolute -top-3 -left-3 lg:-top-[0.8vw] lg:left-[0.25vw] lg:top-[0.25vw] w-10 h-10 lg:w-[1.85vw] lg:h-[1.85vw] rounded-full shadow-md flex items-center justify-center z-40">
                <Image
                  src="/Product/details/section-images/chef-icon.svg"
                  alt="Chef Icon"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="w-20 h-20 lg:w-[9.2vw] lg:h-[7.2vw] rounded-xl lg:rounded-l-[1vw] lg:rounded-r-none overflow-hidden relative shrink-0 shadow-sm">
                <Image
                  src={firstRecipe?.img || '/Product/details/bottomCard.webp'}
                  alt={firstRecipe?.title || 'Recipe'}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <span className="text-xs lg:text-[0.85vw] font-bold text-[#E31E24] uppercase tracking-widest leading-none">
                  WHAT'S COOKING?
                </span>
                <h5
                  className="text-xs lg:text-[0.75vw] font-bold text-black leading-tight mt-1 lg:mt-[0.35vw] truncate"
                  title={firstRecipe?.title || `Spicy Chicken ${currentPart.name} Fry`}
                >
                  {firstRecipe?.title || `Spicy Chicken ${currentPart.name} Fry`}
                </h5>
                <p
                  className="text-[10px] lg:text-[0.6vw] font-medium text-slate-900 leading-tight mt-1 lg:mt-[0.2vw] line-clamp-2 max-w-full lg:max-w-[11vw]"
                  title={firstRecipe?.desc}
                >
                  {firstRecipe?.desc || 'A Spicy and flavourful recipe For a perfect family meal.'}
                </p>

                <Link
                  href={firstRecipeHref}
                  className="mt-2 lg:mt-[0.55vw] bg-[#E31E24] hover:bg-[#c9181d] text-white text-[10px] lg:text-[0.6vw] font-extrabold py-1 lg:py-[0.35vw] px-2.5 lg:px-[0.85vw] rounded-md lg:rounded-[0.4vw] uppercase tracking-wider inline-flex items-center gap-1 lg:gap-[0.3vw] shadow transition-colors w-max"
                >
                  <span>EXPLORE RECIPE</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* 2. Center 4 Feature SVGs (1 single row) */}
            <div className="flex flex-nowrap items-center justify-center gap-1.5 sm:gap-3 lg:gap-[1.2vw] shrink-0 mt-0 lg:mt-[1.6vw] order-1 lg:order-2 max-w-full overflow-x-auto no-scrollbar">
              <img
                src="/Product/details/section-images/farm-fresh.svg"
                alt="Farm Fresh"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />
              <img
                src="/Product/details/section-images/hygienic-processing.svg"
                alt="Hygienic Processing"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />
              <img
                src="/Product/details/section-images/quality-checked.svg"
                alt="Quality Checked"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
              <div className="w-5 h-auto lg:w-[1.5px] lg:h-[3.8vw] bg-white/40" />
              <img
                src="/Product/details/section-images/ready-natural-taste.svg"
                alt="Ready Natural Taste"
                className="h-16 lg:h-[5.2vw] w-auto object-contain drop-shadow-sm shrink-0"
              />
            </div>

            {/* 3. Right Truck Graphic */}
            <div className="hidden lg:flex items-center justify-center lg:justify-end shrink-0 order-2 lg:order-3 mt-1 sm:mt-2 lg:mt-0">
              <img
                src="/Product/details/section-images/keep-fresh-delivered-fresh.svg"
                alt="Keep Fresh Delivered Fresh"
                className="h-9 sm:h-11 lg:h-[4.75vw] w-auto object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXACT RECIPES SECTION (1:1 with Reference Screenshot) */}
      <section className="relative z-20 w-full bg-[#FAF8F5] py-16 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-[4vw] overflow-hidden">
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-[0.6] filter brightness-0"
          style={{
            backgroundImage: 'url("/Product/know-your-meat-bg.webp")',
            backgroundSize: '800px',
          }}
        />
        <div className="w-full space-y-12 relative z-10 max-w-[1400px] mx-auto">
          {/* Section Header: Title, Description, and Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-start gap-6 md:gap-10 pb-2">
            {/* Left Column: RECIPES tagline + MEAT MADE DELICIOUS Title */}
            <div className="space-y-2 shrink-0 select-none">
              {/* Tagline */}
              <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] bg-[#8DC541]" />
                <span className="text-[13px] font-bold text-slate-700 tracking-widest uppercase font-manrope">
                  RECIPES
                </span>
              </div>

              {/* Title: {PART} RECIPES DELICIOUS. */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-barlow-condensed tracking-wide uppercase leading-[0.95]">
                <span className="text-[#064823] block">
                  {currentPart.name} RECIPES
                </span>
                <span className="text-[#F7840F] block">
                  DELICIOUS.
                </span>
              </h2>
            </div>

            {/* Vertical Orange Divider Line */}
            <div className="hidden md:block w-[2px] h-[70px] bg-[#F7840F] rounded-full shrink-0" />

            {/* Right Column: Paragraph + Filter buttons */}
            <div className="flex flex-col justify-between py-1 mt-4 md:mt-0 gap-4 md:gap-5">
              <p className="text-[17px] md:text-[18px] font-medium text-slate-700 max-w-[480px] leading-snug font-manrope">
                Explore trending {currentPart.name.toLowerCase()} recipes in quick, easy &amp; delicious short-form videos.
              </p>

              {/* Filter buttons */}
              <div className="flex gap-3">
                <button className="bg-[#064823] hover:bg-[#0a5e30] text-white text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm">
                  Most Popular
                </button>
                <button className="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-[13px] font-bold py-2.5 px-6 rounded-lg uppercase tracking-wider font-inter cursor-pointer transition-colors shadow-sm">
                  New Recipes
                </button>
              </div>
            </div>
          </div>

          {/* Recipes Grid (4 Cards matching 1:1 reference screenshot) */}
          <div className="grid grid-cols-2 max-[480px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-[1550px] mx-auto">
            {partRecipes.map((recipe, idx) => (
              <Link
                href={`/recipes?part=${currentPart.name.toLowerCase()}&recipeId=${currentPart.name.toLowerCase()}-${idx + 1}&title=${encodeURIComponent(recipe.title)}`}
                key={idx}
                className="block cursor-pointer group"
              >
                <div className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_35px_-5px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-300 flex flex-col select-none border border-slate-200/90 ring-1 ring-black/[0.04]">
                  {/* Compact 16:9.5 Image Header */}
                  <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={recipe.img}
                      alt={recipe.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Top-Left Category Badge Pill */}
                    <span className="absolute top-2.5 left-2.5 z-10 bg-[#d62828] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm pointer-events-none">
                      {recipe.label}
                    </span>
                  </div>

                  {/* Distinct Elevated White Card Body */}
                  <div className="p-3.5 pt-1.5 sm:p-4 sm:pt-2 flex-1 flex flex-col justify-between space-y-1.5 font-inter bg-white">
                    <div className="space-y-0">
                      <h3
                        className="text-md sm:text-base font-bold text-black tracking-wide uppercase leading-normal group-hover:text-[#064823] transition-colors line-clamp-2 h-[2.5rem] flex items-center"
                        title={recipe.title}
                      >
                        {recipe.title}
                      </h3>

                      {/* Spec Row (Difficulty, Cooking Time, Servings) */}
                      <div className="flex items-center justify-between gap-1 text-[13.5px] font-semibold text-slate-900 font-manrope pt-2 border-t border-slate-200">
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-4 h-4 shrink-0">
                            <img
                              src="/Product/recipies/easy.svg"
                              alt="Difficulty"
                              className="w-full h-full object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.diff}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="relative w-4.25 h-4.25 shrink-0">
                            <img
                              src="/Product/recipies/time.svg"
                              alt="Time"
                              className="w-full h-full object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.time}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <div className="relative w-5 h-5 shrink-0">
                            <Image
                              src="/Product/recipies/servings.png"
                              alt="Servings"
                              fill
                              className="object-contain opacity-75"
                            />
                          </div>
                          <span>{recipe.servings}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="w-full bg-[#F7840F] group-hover:bg-[#e0730b] text-white text-[12.5px] font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-sm group-hover:shadow !mt-3">
                      <span>VIEW RECIPE &amp; STEPS &rarr;</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================================
   RECIPES-HOMEPAGE-INSPIRED CHICKEN PRODUCTS CATALOG VIEW
   ========================================================================= */
function ProductCatalogView() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return CHICKEN_PRODUCTS.filter((item) => {
      return (
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.badge.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const handleProductClick = (partId: string) => {
    router.push(`/product?part=${encodeURIComponent(partId)}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 antialiased flex flex-col selection:bg-[#8DC541] selection:text-white overflow-x-clip pt-0 font-anek">
      {/* 1. HERO HEADER BANNER SECTION */}
      <section
        style={{
          background: "radial-gradient(circle at center, #488E40 0%, #064823 100%)",
        }}
        className="relative w-full text-white pt-20 sm:pt-24 md:pt-28 pb-5 sm:pb-7 md:pb-8 px-4 sm:px-8 lg:px-12 rounded-b-[30px] md:rounded-b-[40px] overflow-hidden select-none shadow-xl min-h-[310px] sm:min-h-[330px] md:min-h-[350px] flex flex-col justify-center"
      >
        {/* Background Tiled Doodle with Blend (Matching Recipes Page) */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-80"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
            backgroundSize: "800px",
          }}
        />

        {/* Hero Content Row - Left spans top-to-bottom, right elements align to bottom within height */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto flex items-end justify-between gap-4 sm:gap-6 lg:gap-8 my-auto">
          {/* 1. Left: Titles, Tagline & Quality Feature Chips */}
          <div className="space-y-3 sm:space-y-3.5 text-left max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-2.5"
            >
              <span className="w-8 h-[2.5px] bg-[#8DC541]" />
              <span className="text-xs sm:text-sm font-extrabold text-[#8DC541] tracking-widest uppercase font-manrope">
                PRODUCTS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] xl:text-[54px] font-bold font-anek tracking-wide uppercase leading-none text-white whitespace-nowrap"
            >
              CHICKEN <span className="text-[#8DC541]">PRODUCTS</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-white/90 text-xs sm:text-sm md:text-base font-medium leading-relaxed font-manrope max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
              Explore 100% Halal farm-fresh chicken cuts, scientifically vacuum-chilled and butcher-trimmed for pure natural taste.
            </motion.p>

            {/* Quality & Freshness Feature Chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1 sm:pt-1.5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-xs md:text-sm font-semibold text-white/95 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8DC541]" />
                100% Halal Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-xs md:text-sm font-semibold text-white/95 shadow-sm">
                <ThermometerSnowflake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8DC541]" />
                0°C–4°C Chilled Fresh
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-xs md:text-sm font-semibold text-white/95 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8DC541]" />
                10 Butcher Cuts
              </span>
            </motion.div>
          </div>

          {/* 2. Fresh Raw Chicken Cuts Trio Group (Breast, Drumsticks, Wings) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hidden lg:flex items-end justify-center shrink-0"
          >
            <div className="flex items-end gap-2 xl:gap-3">
              {/* Platter 1: Fresh Breast */}
              <div className="relative w-[95px] xl:w-[115px] h-[85px] xl:h-[105px]">
                <Image
                  src="/Product/Chicken/Platters/breast.webp"
                  alt="Fresh Chicken Breast Platter"
                  fill
                  className="object-contain object-bottom"
                />
              </div>

              {/* Platter 2: Juicy Drumsticks */}
              <div className="relative w-[110px] xl:w-[130px] h-[100px] xl:h-[120px]">
                <Image
                  src="/Product/Chicken/Platters/drumstick.webp"
                  alt="Fresh Juicy Drumsticks Platter"
                  fill
                  className="object-contain object-bottom"
                />
              </div>

              {/* Platter 3: Crispy Wings */}
              <div className="relative w-[95px] xl:w-[115px] h-[85px] xl:h-[105px]">
                <Image
                  src="/Product/Chicken/Platters/wings.webp"
                  alt="Fresh Chicken Wings Platter"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </motion.div>

          {/* 3. Authentic Packed Chicken Products Family */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            className="hidden sm:flex items-end justify-center shrink-0"
          >
            <div className="relative w-[230px] sm:w-[270px] md:w-[310px] lg:w-[350px] xl:w-[390px] h-[145px] sm:h-[165px] md:h-[185px] lg:h-[200px] xl:h-[215px]">
              <Image
                src="/AboutUs/countries-serve/packed-product.webp"
                alt="MEATiN Packed Chicken Products Family"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          </motion.div>

          {/* 4. MEATiN Chicken Mascot Thumbs Up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex items-end justify-center shrink-0"
          >
            <div className="relative w-[80px] sm:w-[95px] md:w-[108px] lg:w-[118px] xl:w-[130px] h-[145px] sm:h-[170px] md:h-[190px] lg:h-[205px] xl:h-[215px]">
              <Image
                src="/Product/chicken-character.webp"
                alt="MEATiN Chicken Mascot Thumbs Up"
                fill
                priority
                className="object-contain object-bottom"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN PRODUCTS SECTION */}
      <main className="relative z-20 flex-1 w-full px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-16 overflow-hidden">
        {/* Background Doodle Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-40 filter brightness-0"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
            backgroundSize: '800px',
          }}
        />

        {/* Section Label Header + Search Bar (Clean and Framed like Recipes) */}
        <div className="relative z-10 max-w-[1550px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 sm:pb-8 w-full border-b border-slate-200/80">
          {/* Left: Section Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[2px] bg-[#8DC541]" />
              <span className="text-xs sm:text-sm font-extrabold text-[#064823] tracking-widest uppercase font-manrope">
                100% FARM-FRESH CHICKEN
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold font-barlow-condensed uppercase text-[#064823] tracking-wide">
              ALL CHICKEN CUTS ({filteredProducts.length} PRODUCTS)
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 font-manrope">
              Click on any cut to view full details, interactive 3D model, raw cut plate, retail pack &amp; curated recipes.
            </p>
          </div>

          {/* Right: Search Input with increased text size */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cuts (e.g. Breast)..."
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200/90 rounded-xl text-sm sm:text-[15px] font-medium text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-[#064823] focus:ring-2 focus:ring-[#064823]/15 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear Search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Reset Button */}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs sm:text-sm font-bold text-[#d62828] hover:underline whitespace-nowrap px-1"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* 3. PRODUCTS GRID WITH LAST ROW CENTERED */}
        {filteredProducts.length > 0 ? (
          <div id="products-grid" className="relative z-10 max-w-[1550px] mx-auto w-full pt-6 sm:pt-8">
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full">
              {filteredProducts.map((product, idx) => {
                const displayImage = product.platterImg;

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{
                      y: -8,
                      boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.25)',
                    }}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)] xl:w-[calc(25%-1.5rem)] max-w-[380px] bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-300 group flex flex-col select-none cursor-pointer border border-slate-200/90 ring-1 ring-black/[0.04]"
                  >
                    {/* Compact 16:9.5 Image Header */}
                    <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-gradient-to-b from-[#F8FAF7] to-[#F1F6EE] flex items-center justify-center p-3">
                      {/* Top-Left Category Badge Pill */}
                      <span className="absolute top-2.5 left-2.5 z-10 bg-[#d62828] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm pointer-events-none">
                        {product.badge}
                      </span>

                      {/* Product Image */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={displayImage}
                          alt={product.title}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-md"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                    </div>

                    {/* Distinct Elevated White Card Body (Exact Match to Recipes Card) */}
                    <div className="p-3.5 pt-1.5 sm:p-4 sm:pt-2 flex-1 flex flex-col justify-between space-y-1.5 font-inter bg-white">
                      <div className="space-y-0">
                        {/* Product Title */}
                        <h3
                          className="text-md sm:text-base font-bold text-black tracking-wide uppercase leading-normal group-hover:text-[#064823] transition-colors line-clamp-2 h-[2.5rem] flex items-center"
                          title={product.title}
                        >
                          {product.title}
                        </h3>

                        {/* Spec Row (Protein, Calories, Cold Chain) matching Recipes Spec Row */}
                        <div className="flex items-center justify-between gap-1 text-[13.5px] font-semibold text-slate-900 font-manrope pt-2 border-t border-slate-200">
                          {/* Protein */}
                          <div className="flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-[#064823] opacity-75 shrink-0" />
                            <span>{product.nutrition.protein}</span>
                          </div>

                          {/* Calories */}
                          <div className="flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-[#F7840F] opacity-75 shrink-0" />
                            <span>{product.nutrition.calories}</span>
                          </div>

                          {/* Cold Chain */}
                          <div className="flex items-center gap-1.5">
                            <ThermometerSnowflake className="w-4 h-4 text-[#064823] opacity-75 shrink-0" />
                            <span>0°C-4°C</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button matching Recipes Button */}
                      <button
                        type="button"
                        className="w-full bg-[#F7840F] group-hover:bg-[#e0730b] text-white text-[12.5px] font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-sm group-hover:shadow !mt-3"
                      >
                        <span>VIEW PRODUCT &amp; 3D &rarr;</span>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="relative z-10 bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto shadow-sm space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-[#EEF6E8] text-[#064823] flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-[#064823]">No matching cuts found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We couldn&apos;t find any cuts matching &ldquo;{searchQuery}&rdquo;. Try another search term or show all 10 chicken cuts.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="bg-[#064823] hover:bg-[#0a5e30] text-white text-xs sm:text-sm font-bold px-6 py-2.5 rounded-xl transition-all uppercase"
            >
              Show All 10 Cuts
            </button>
          </div>
        )}

        
      </main>
    </div>
  );
}

/* =========================================================================
   MASTER ROUTER PAGE WITH SUSPENSE (Handles ?part= URL query parameter)
   ========================================================================= */
function ProductPageContent() {
  const searchParams = useSearchParams();
  const partParam = searchParams.get('part');

  if (partParam) {
    return <ProductDetailExperience initialPart={partParam} />;
  }

  return <ProductCatalogView />;
}

export default function ProductPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBFBF9] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#8DC541] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProductPageContent />
    </Suspense>
  );
}
