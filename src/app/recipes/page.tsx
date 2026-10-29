"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// Interface definitions
interface RecipeItem {
  id: string;
  title: string;
  part: string;
  label: string;
  desc: string;
  img: string;
  time: string;
  prepTime: string;
  cookTime: string;
  calories: string;
  servings: string;
  diff: string;
  about: string;
  tips: string[];
  ingredientsCol1: string[];
  ingredientsCol2: string[];
  steps: string[];
}

interface ChickenPart {
  id: string;
  name: string;
  img: string;
}

// 10 Chicken Parts Data
const chickenPartsList: ChickenPart[] = [
  { id: "breast", name: "Breast", img: "/Product/Chicken/ChickenParts/brest.webp" },

  { id: "thigh", name: "Thigh", img: "/Product/Chicken/ChickenParts/thig.webp" },

  { id: "drumstick", name: "Drumstick", img: "/Product/Chicken/ChickenParts/drumstick.webp" },

  { id: "wing", name: "Wing", img: "/Product/Chicken/ChickenParts/wing.webp" },

  { id: "gizzard", name: "Gizzard", img: "/Product/Chicken/ChickenParts/gizzard.webp" },

  { id: "liver", name: "Liver", img: "/Product/Chicken/ChickenParts/liver.webp" },

  { id: "heart", name: "Heart", img: "/Product/Chicken/ChickenParts/heart.webp" },

  { id: "drumette", name: "Drumette", img: "/Product/Chicken/ChickenParts/drumette.webp" },

  { id: "neck", name: "Neck", img: "/Product/Chicken/ChickenParts/neck.webp" },

  { id: "back", name: "Back", img: "/Product/Chicken/ChickenParts/bact.webp" },
];

// Complete Recipe Database for All 10 Chicken Parts (40 recipes total)
const recipesDatabase: Record<string, RecipeItem[]> = {
  breast: [
    {
      id: "breast-1",
      title: "Grilled Lemon Herb Breast",
      part: "Breast",
      label: "BEST FOR HEALTHY",
      desc: "Lean boneless breast fillets grilled with fresh lemon & olive oil.",
      img: "/Recipies/breast/Grilled-Lemon-Herb-Breast.webp",
      time: "20 mins",
      prepTime: "5 mins",
      cookTime: "15 mins",
      calories: "220 kcal",
      servings: "2 Servings",
      diff: "Easy",
      about:
        "A lean, high-protein healthy dish of boneless chicken breast fillets marinated in lemon, garlic, and fresh herbs.",
      tips: [
        "Pound breast to even 1/2 inch thickness for fast cooking.",
        "Do not overcook to keep chicken breast juicy.",
        "Rest for 5 minutes before slicing.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Breast (Boneless)",
        "2 tbsp Olive Oil",
        "2 tbsp Lemon Juice",
        "3 cloves Garlic (minced)",
      ],
      ingredientsCol2: [
        "1 tsp Dried Oregano",
        "1/2 tsp Chili Flakes",
        "Salt & Black Pepper",
        "Lemon Slices",
      ],
      steps: [
        "Pound breast fillets evenly.",
        "Whisk olive oil, lemon juice, garlic, oregano, salt, pepper.",
        "Marinate breast fillets for 15 minutes.",
        "Grill 6-7 minutes per side on medium-high heat.",
        "Rest 5 mins and slice over salad or rice.",
      ],
    },
    {
      id: "breast-2",
      title: "Creamy Butter Breast Curry",
      part: "Breast",
      label: "BEST FOR CURRY",
      desc: "Boneless chicken breast in rich velvety tomato butter gravy.",
      img: "/Recipies/breast/Creamy-Butter-Breat-Curry.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "390 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Classic Butter Chicken featuring tender boneless breast cubes in a rich tomato, butter, and cashew cream sauce.",
      tips: [
        "Blend tomato gravy smooth for velvety texture.",
        "Add butter towards the end of cooking.",
        "Serve with garlic butter naan.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Breast (cubed)",
        "3 tbsp Butter",
        "1 cup Tomato Puree",
        "2 tbsp Cashew Paste",
      ],
      ingredientsCol2: [
        "2 tbsp Fresh Cream",
        "1 tsp Garam Masala",
        "1 tsp Chili Powder",
        "Kasuri Methi & Salt",
      ],
      steps: [
        "Sear chicken breast cubes in 1 tbsp butter for 5 mins.",
        "Cook tomato puree and cashew paste with spices until oil separates.",
        "Add seared chicken cubes and 1/2 cup water.",
        "Simmer for 8 minutes.",
        "Stir in fresh cream, butter, and kasuri methi.",
      ],
    },
    {
      id: "breast-3",
      title: "Crispy Breast Nuggets",
      part: "Breast",
      label: "BEST FOR SNACK",
      desc: "Bite-sized chicken breast nuggets served with garlic aioli dip.",
      img: "/Recipies/breast/Crisppy-Breast-Nuggets.webp",
      time: "25 mins",
      prepTime: "10 mins",
      cookTime: "15 mins",
      calories: "310 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Crispy homemade chicken nuggets made from tender breast bites, panko breadcrumbs, and Italian herbs.",
      tips: [
        "Air fry at 200°C for a healthier low-oil option.",
        "Double coat in breadcrumbs for max crunch.",
        "Great snack for kids and movie nights.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Breast (bites)",
        "1/2 cup Flour",
        "1 Egg (beaten)",
        "1 cup Panko Breadcrumbs",
      ],
      ingredientsCol2: [
        "1 tsp Garlic Powder",
        "1/2 tsp Paprika",
        "Salt & Pepper",
        "Aioli Dip",
      ],
      steps: [
        "Cut chicken breast into bite-sized nuggets.",
        "Season nuggets with salt, pepper, garlic powder, paprika.",
        "Coat nuggets in flour, dip in egg, roll in breadcrumbs.",
        "Bake or deep-fry 10-12 mins until golden brown.",
        "Serve with garlic dip.",
      ],
    },
    {
      id: "breast-4",
      title: "Healthy Chicken Breast Salad",
      part: "Breast",
      label: "BEST FOR FITNESS",
      desc: "Sliced grilled breast on garden greens with light dressing.",
      img: "/Recipies/breast/Healthy-Chicken-Breast-Salad.webp",
      time: "15 mins",
      prepTime: "5 mins",
      cookTime: "10 mins",
      calories: "190 kcal",
      servings: "2 Servings",
      diff: "Easy",
      about:
        "A refreshing fitness meal packed with lean grilled chicken breast, cucumbers, cherry tomatoes, and olive oil vinaigrette.",
      tips: [
        "Keep greens crisp by dressing just before serving.",
        "Add feta cheese or avocado for extra richness.",
        "High protein, low carb meal.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Breast",
        "2 cups Mixed Salad Greens",
        "1/2 Cucumber (sliced)",
        "1/2 cup Cherry Tomatoes",
      ],
      ingredientsCol2: [
        "2 tbsp Olive Oil",
        "1 tbsp Dijon Mustard",
        "1 tbsp Honey",
        "Lemon & Salt",
      ],
      steps: [
        "Season chicken breast and pan-sear 5 mins per side.",
        "Let chicken rest 5 minutes and slice thin.",
        "Assemble greens, cucumber, tomatoes in a large bowl.",
        "Whisk olive oil, mustard, honey, lemon, and salt.",
        "Top salad with sliced chicken and drizzle dressing.",
      ],
    },
  ],
  thigh: [
    {
      id: "thigh-1",
      title: "Creamy Chicken Thigh Curry",
      part: "Thigh",
      label: "BEST FOR CURRY",
      desc: "Tender bone-in chicken thighs cooked in rich onion-tomato gravy.",
      img: "/Recipies/thigh/Cremy-Chicken-Thigh-Curry.webp",
      time: "40 mins",
      prepTime: "15 mins",
      cookTime: "25 mins",
      calories: "380 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Juicy bone-in chicken thighs simmered in a spiced onion gravy finished with fresh cream and kasuri methi.",
      tips: [
        "Bone-in thighs keep gravy rich and flavorful.",
        "Add kasuri methi for restaurant style aroma.",
        "Serve with butter naan or saffron rice.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Thighs",
        "2 Large Onions (chopped)",
        "2 Tomatoes (pureed)",
        "1 tbsp Ginger Garlic Paste",
      ],
      ingredientsCol2: [
        "2 tbsp Fresh Cream",
        "1 tsp Garam Masala",
        "1 tsp Kasuri Methi",
        "Spices & Oil",
      ],
      steps: [
        "Sauté onions in oil until rich brown.",
        "Add ginger garlic paste and tomato puree; cook 5 mins.",
        "Add spice powders and chicken thighs.",
        "Cover and simmer on medium flame for 20 minutes.",
        "Finish with cream and crushed kasuri methi.",
      ],
    },
    {
      id: "thigh-2",
      title: "Smoky Grilled Chicken Thigh",
      part: "Thigh",
      label: "BEST FOR GRILL",
      desc: "Char-broiled chicken thighs marinated in rustic Indian spices.",
      img: "/Recipies/thigh/Smoky-Grilled-Chicken-Thigh.webp",
      time: "35 mins",
      prepTime: "15 mins",
      cookTime: "20 mins",
      calories: "360 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Marinated chicken thighs grilled over flame for smoky charred crust and moist, succulent meat inside.",
      tips: [
        "Score chicken thighs with small cuts so marinade penetrates.",
        "Use hung curd for thick marinade coating.",
        "Baste with butter on grill.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Thighs",
        "1/2 cup Hung Curd",
        "1 tbsp Tandoori Masala",
        "1 tbsp Mustard Oil",
      ],
      ingredientsCol2: [
        "1 tsp Kashmiri Chili Powder",
        "1 tbsp Lemon Juice",
        "Salt to Taste",
        "Chaat Masala",
      ],
      steps: [
        "Score thighs and marinate with curd, oil, and spices 30 mins.",
        "Preheat grill to high heat.",
        "Grill thighs 8-10 mins per side, basting with butter.",
        "Check internal temp reaches 75°C.",
        "Sprinkle chaat masala and lemon.",
      ],
    },
    {
      id: "thigh-3",
      title: "Crispy Fried Thigh Steaks",
      part: "Thigh",
      label: "BEST FOR FRY",
      desc: "Juicy thigh cuts battered and fried to crispy golden perfection.",
      img: "/Recipies/thigh/Crispy-Fried-Thigh-Steaks.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "410 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "Boneless chicken thigh steaks coated in seasoned flour batter and fried crispy, ideal for sandwiches or burger patties.",
      tips: [
        "Use boneless thigh for fast, even frying.",
        "Add cayenne pepper for extra heat.",
        "Let rest on rack 3 mins before serving.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Thighs (boneless)",
        "1 cup Flour",
        "1 Egg (beaten)",
        "1/2 cup Breadcrumbs",
      ],
      ingredientsCol2: [
        "1 tsp Garlic Powder",
        "1 tsp Onion Powder",
        "Salt & Pepper",
        "Frying Oil",
      ],
      steps: [
        "Flatten thigh steaks slightly.",
        "Season with garlic powder, onion powder, salt, pepper.",
        "Dip in flour, egg, then breadcrumbs.",
        "Deep fry on medium heat for 6-8 mins until crispy.",
        "Serve with coleslaw or burger buns.",
      ],
    },
    {
      id: "thigh-4",
      title: "Slow Cooked Thigh Roast",
      part: "Thigh",
      label: "BEST FOR ROAST",
      desc: "Succulent chicken thighs slow-cooked with aromatic whole spices.",
      img: "/Recipies/thigh/Slow-Cooked-Thigh-Roast.webp",
      time: "50 mins",
      prepTime: "15 mins",
      cookTime: "35 mins",
      calories: "370 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Kerala-style slow-roasted chicken thighs pan-cooked with caramelized shallots, curry leaves, and black pepper.",
      tips: [
        "Use small shallots (small onions) for traditional flavor.",
        "Slow cook covered on low flame.",
        "Roast until liquid evaporates and dark glaze forms.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Thighs",
        "15 Small Shallots (sliced)",
        "2 sprigs Curry Leaves",
        "1 tbsp Ginger Garlic",
      ],
      ingredientsCol2: [
        "1 tbsp Crushed Black Pepper",
        "1 tsp Garam Masala",
        "2 tbsp Coconut Oil",
        "Salt to Taste",
      ],
      steps: [
        "Heat coconut oil, sauté shallots and curry leaves.",
        "Add ginger garlic and marinate chicken thighs.",
        "Place thighs in pan, cover and cook 25 mins on low.",
        "Uncover, add pepper, and roast on medium high until dark brown.",
        "Serve hot.",
      ],
    },
  ],
  drumstick: [
    {
      id: "drumstick-1",
      title: "Spicy Tandoori Drumsticks",
      part: "Drumstick",
      label: "BEST FOR TANDOORI",
      desc: "Classic tandoori drumsticks charred over open flame.",
      img: "/Recipies/drumstick/Sicy-Thandoori-Drumsticks.webp",
      time: "35 mins",
      prepTime: "15 mins",
      cookTime: "20 mins",
      calories: "320 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Classic Indian tandoori drumsticks marinated in thick yogurt, Kashmiri chili, and tandoori spices, grilled to smoky charred perfection.",
      tips: [
        "Deep slash leg meat so marinade reaches bone.",
        "Use Kashmiri chili powder for bright red color without extra heat.",
        "Baste with melted butter.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumsticks",
        "1/2 cup Curd (Yogurt)",
        "1 tbsp Ginger Garlic Paste",
        "1 tbsp Kashmiri Chili",
      ],
      ingredientsCol2: [
        "1 tsp Garam Masala",
        "1 tbsp Kasuri Methi",
        "2 tbsp Butter",
        "Lemon & Onion rings",
      ],
      steps: [
        "Make deep cuts into drumsticks.",
        "Whisk curd, ginger garlic, chili, garam masala, and salt.",
        "Coat drumsticks and marinate for 30 minutes.",
        "Grill or bake at 200°C for 20-25 mins, basting with butter.",
        "Serve with onion rings and lemon.",
      ],
    },
    {
      id: "drumstick-2",
      title: "Crispy Fried Drumstick Box",
      part: "Drumstick",
      label: "BEST FOR FRY",
      desc: "Golden crunchy drumsticks seasoned with Southern spices.",
      img: "/Recipies/drumstick/Crispy-Fried-Drumstick-Box.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "390 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Southern fried chicken drumsticks with extra crunchy flaked crust and juicy meat underneath.",
      tips: [
        "Double dip in flour and water for flaky crust.",
        "Fry at 165°C for thorough bone cooking.",
        "Serve with fries.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumsticks",
        "1.5 cups Flour",
        "1 tsp Paprika",
        "1 tsp Garlic Powder",
      ],
      ingredientsCol2: [
        "1/2 tsp Cayenne Pepper",
        "Salt & Black Pepper",
        "Oil for frying",
        "Ketchup & Mayo",
      ],
      steps: [
        "Season drumsticks with salt, pepper, garlic powder.",
        "Dredge in flour, dip in cold water, dredge in flour again.",
        "Deep fry in hot oil 15-18 mins until dark golden brown.",
        "Rest 3 mins on rack.",
        "Serve hot in a basket with fries.",
      ],
    },
    {
      id: "drumstick-3",
      title: "Chettinad Drumstick Curry",
      part: "Drumstick",
      label: "BEST FOR CURRY",
      desc: "Fiery South Indian drumstick curry with freshly ground spices.",
      img: "/Recipies/drumstick/Chettinad-Drumstick-Curry.webp",
      time: "40 mins",
      prepTime: "15 mins",
      cookTime: "25 mins",
      calories: "340 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Authentic Tamil Nadu Chettinad chicken leg curry cooked with dry roasted spices, star anise, poppy seeds, and coconut.",
      tips: [
        "Dry roast whole spices freshly before grinding.",
        "Simmer until oil floats on top.",
        "Best paired with steamed rice or parotta.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumsticks",
        "2 Onions (chopped)",
        "2 Tomatoes",
        "2 tbsp Chettinad Masala",
      ],
      ingredientsCol2: [
        "1/4 cup Grated Coconut",
        "Curry Leaves & Mustard",
        "Gingelly Oil",
        "Salt to taste",
      ],
      steps: [
        "Roast & grind peppercorns, fennel, coriander, star anise, coconut.",
        "Sauté onions, curry leaves, and tomatoes in oil.",
        "Add drumsticks and roasted spice masala.",
        "Add 2 cups water, cover and cook 20 minutes.",
        "Garnish with coriander and serve.",
      ],
    },
    {
      id: "drumstick-4",
      title: "Garlic Butter Glazed Leg",
      part: "Drumstick",
      label: "BEST FOR ROAST",
      desc: "Oven-roasted drumsticks brushed with rich garlic herb butter.",
      img: "/Recipies/drumstick/Garlic-Butter-Glazed-Leg.webp",
      time: "35 mins",
      prepTime: "10 mins",
      cookTime: "25 mins",
      calories: "310 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Tender oven-roasted drumsticks glazed with rich garlic, melted butter, parsley, and lemon.",
      tips: [
        "Roast on high heat for crispy skin.",
        "Baste with garlic butter twice.",
        "Serve with roasted veggies.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumsticks",
        "4 tbsp Melted Butter",
        "5 cloves Garlic (minced)",
        "1 tbsp Parsley",
      ],
      ingredientsCol2: [
        "1/2 tsp Chili Flakes",
        "Salt & Pepper",
        "Lemon Juice",
        "Olive Oil",
      ],
      steps: [
        "Combine butter, garlic, parsley, chili flakes, salt, pepper.",
        "Rub drumsticks with oil and roast at 200°C for 20 mins.",
        "Brush generously with garlic herb butter.",
        "Roast 5 more mins until golden and bubbly.",
        "Drizzle lemon juice and serve.",
      ],
    },
  ],
  wing: [
    {
      id: "wing-1",
      title: "Spicy Chicken Wing Fry",
      part: "Wing",
      label: "BEST FOR FRY",
      desc: "Crispy and spicy chicken wings tossed in fiery chili glaze.",
      img: "/Recipies/wing/spicy-chicken-wnig-fry.webp",
      time: "25 mins",
      prepTime: "10 mins",
      cookTime: "15 mins",
      calories: "280 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "Crispy chicken wings deep-fried to golden perfection and tossed in a bold chili spice blend. Great as an appetizer or party snack.",
      tips: [
        "Fry on medium-high heat for maximum crispiness.",
        "Double fry for an extra crunch.",
        "Serve hot with mint chutney or ranch dip.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Wings",
        "2 tbsp Cornflour",
        "1 tbsp Red Chili Powder",
        "1 tsp Garlic Paste",
      ],
      ingredientsCol2: [
        "Salt to Taste",
        "Oil for deep frying",
        "1 tbsp Lemon Juice",
        "Curry Leaves for garnish",
      ],
      steps: [
        "Clean and pat dry the chicken wings.",
        "Marinate with spices, cornflour, garlic paste, and salt for 20 mins.",
        "Heat oil in a deep pan on medium flame.",
        "Deep fry wings until golden brown and crispy.",
        "Toss with lemon juice, curry leaves, and serve piping hot.",
      ],
    },
    {
      id: "wing-2",
      title: "Honey Glazed BBQ Wings",
      part: "Wing",
      label: "BEST FOR BBQ",
      desc: "Sweet and smoky glazed chicken wings cooked to sticky perfection.",
      img: "/Recipies/wing/Honey-Glazed-BBQ Wings.webp",
      time: "35 mins",
      prepTime: "15 mins",
      cookTime: "20 mins",
      calories: "310 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Oven-baked or grilled chicken wings coated in a rich honey barbecue glaze with smoked paprika notes.",
      tips: [
        "Baste with extra sauce during the last 5 minutes of baking.",
        "Use pure honey for authentic sweet aroma.",
        "Garnish with toasted sesame seeds.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Wings",
        "3 tbsp BBQ Sauce",
        "2 tbsp Honey",
        "1 tbsp Soy Sauce",
      ],
      ingredientsCol2: [
        "1 tsp Black Pepper",
        "1 tbsp Butter",
        "1 tsp Garlic Powder",
        "Sesame seeds & Scallions",
      ],
      steps: [
        "Preheat oven or grill to 200°C.",
        "Season wings with salt, pepper, and garlic powder.",
        "Bake wings for 25 minutes until cooked through.",
        "Simmer BBQ sauce, honey, soy sauce, and butter in a saucepan.",
        "Coat wings generously in glaze and bake 5 minutes more.",
      ],
    },
    {
      id: "wing-3",
      title: "Garlic Parmesan Wings",
      part: "Wing",
      label: "BEST FOR SNACK",
      desc: "Tender wings coated in rich garlic butter and parmesan cheese.",
      img: "/Recipies/wing/Garlic-Parmesan-Wings.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "340 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Irresistible chicken wings tossed in melted garlic herb butter and generously sprinkled with aged parmesan cheese.",
      tips: [
        "Toss wings immediately while hot so cheese melts.",
        "Use fresh minced garlic for optimal flavor.",
        "Garnish with fresh parsley.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Wings",
        "3 tbsp Melted Butter",
        "4 cloves Garlic (minced)",
        "1/4 cup Grated Parmesan",
      ],
      ingredientsCol2: [
        "1 tsp Italian Herb Mix",
        "Salt & Crushed Pepper",
        "2 tbsp Fresh Parsley",
        "Olive Oil",
      ],
      steps: [
        "Bake or air-fry wings until crispy and golden.",
        "Melt butter in a large bowl and stir in minced garlic and herbs.",
        "Add hot wings and toss to coat completely.",
        "Sprinkle parmesan cheese and chopped parsley.",
        "Serve hot with garlic aioli.",
      ],
    },
    {
      id: "wing-4",
      title: "Buffalo Wing Platter",
      part: "Wing",
      label: "BEST FOR STARTER",
      desc: "Classic American style buffalo wings served with creamy ranch dip.",
      img: "/Recipies/wing/Buffalo-Wing-Platter.webp",
      time: "20 mins",
      prepTime: "10 mins",
      cookTime: "10 mins",
      calories: "290 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Fiery hot wings coated in authentic buffalo hot sauce and butter, served alongside celery sticks and ranch.",
      tips: [
        "Adjust hot sauce ratio for your desired spicy kick.",
        "Serve with cold ranch or blue cheese dip.",
        "Keep wings dry before frying for extra crispiness.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Wings",
        "1/3 cup Frank Hot Sauce",
        "3 tbsp Melted Butter",
        "1 tsp Vinegar",
      ],
      ingredientsCol2: [
        "1/2 tsp Garlic Powder",
        "Celery Sticks",
        "Ranch Dip",
        "Salt to Taste",
      ],
      steps: [
        "Deep fry wings until extra crispy.",
        "Whisk hot sauce, melted butter, vinegar, and garlic powder.",
        "Toss wings in buffalo sauce until fully coated.",
        "Arrange on platter with celery sticks and ranch.",
      ],
    },
  ],
  gizzard: [
    {
      id: "gizzard-1",
      title: "Crunchy Gizzard Pepper Fry",
      part: "Gizzard",
      label: "BEST FOR FRY",
      desc: "Chewy and crispy fried gizzards with green chillies & pepper.",
      img: "/Recipies/gizzard/Crunchy-Grizzard-Pepper-Fry.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "220 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "A popular bar-style snack featuring boiled gizzards pan-roasted with curry leaves, green chillies, and coarse black pepper.",
      tips: [
        "Boil gizzards in pressure cooker first to make them tender.",
        "Fry on high flame until dark and crisp.",
        "Squeeze lemon juice before eating.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Gizzards",
        "2 Onions (sliced)",
        "3 Green Chillies",
        "1 tbsp Ginger Garlic",
      ],
      ingredientsCol2: [
        "1.5 tbsp Crushed Black Pepper",
        "Curry Leaves & Oil",
        "1/2 tsp Turmeric",
        "Salt & Lemon",
      ],
      steps: [
        "Pressure cook gizzards with turmeric & salt for 3 whistles.",
        "Heat oil, sauté curry leaves, green chillies, and onions.",
        "Add cooked gizzards and fry 10 mins on medium flame.",
        "Stir in black pepper and roast dry.",
        "Serve hot with lemon wedges.",
      ],
    },
    {
      id: "gizzard-2",
      title: "Spicy Braised Gizzard Gravy",
      part: "Gizzard",
      label: "BEST FOR GRAVY",
      desc: "Slow-braised gizzards in rich caramelized onion gravy.",
      img: "/Recipies/gizzard/Spicy-Braised-Gizzard-Gravy.webp",
      time: "45 mins",
      prepTime: "15 mins",
      cookTime: "30 mins",
      calories: "250 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Slow-braised gizzards cooked in a thick spicy onion-tomato gravy with fennel and garam masala.",
      tips: [
        "Braise low and slow for tender gizzard texture.",
        "Thicken gravy by simmering uncovered.",
        "Great with roti or parotta.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Gizzards",
        "2 Onions (chopped)",
        "2 Tomatoes",
        "1 tbsp Ginger Garlic",
      ],
      ingredientsCol2: [
        "1 tsp Chili Powder",
        "1 tsp Coriander Powder",
        "1/2 tsp Garam Masala",
        "Salt & Oil",
      ],
      steps: [
        "Clean gizzards thoroughly.",
        "Sauté onions and ginger garlic paste until golden.",
        "Add tomatoes and ground spices; cook till oil separates.",
        "Add gizzards and 1.5 cups water.",
        "Cover and simmer 30 minutes until gizzards are tender.",
      ],
    },
    {
      id: "gizzard-3",
      title: "Grilled Gizzard Skewers",
      part: "Gizzard",
      label: "BEST FOR GRILL",
      desc: "Marinated chicken gizzards grilled to savory perfection.",
      img: "/Recipies/gizzard/Grilled-Gizzard-Skewers.webp",
      time: "25 mins",
      prepTime: "10 mins",
      cookTime: "15 mins",
      calories: "200 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "Street-style grilled gizzard skewers marinated in soy, chili, garlic, and sesame oil.",
      tips: [
        "Parboil gizzards 8 mins before grilling.",
        "Grill over medium flame for charred edges.",
        "Brush with chili oil while grilling.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Gizzards",
        "2 tbsp Soy Sauce",
        "1 tbsp Chili Paste",
        "1 tsp Sesame Oil",
      ],
      ingredientsCol2: [
        "1 tbsp Honey",
        "Garlic & Ginger",
        "Skewers & Sesame seeds",
        "Salt to taste",
      ],
      steps: [
        "Boil gizzards 8 mins and drain.",
        "Marinate with soy sauce, chili paste, sesame oil, honey, garlic.",
        "Thread gizzards onto skewers.",
        "Grill for 10-12 mins, turning and basting.",
        "Garnish with sesame seeds.",
      ],
    },
    {
      id: "gizzard-4",
      title: "Pickled Gizzard Delicacy",
      part: "Gizzard",
      label: "BEST FOR SNACK",
      desc: "Tangy and spicy pickled gizzards infused with mustard oil.",
      img: "/Recipies/gizzard/Pickled-Gizzard-Delicacy.webp",
      time: "40 mins",
      prepTime: "15 mins",
      cookTime: "25 mins",
      calories: "230 kcal",
      servings: "6 Servings",
      diff: "Medium",
      about:
        "Traditional Indian style meat pickle made with fried gizzards, mustard oil, vinegar, and pickling spices.",
      tips: [
        "Ensure gizzards are 100% moisture free before pickling.",
        "Store in clean glass jar.",
        "Flavor improves after 24 hours.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Gizzards",
        "3 tbsp Mustard Oil",
        "2 tbsp Vinegar",
        "1 tbsp Pickle Masala",
      ],
      ingredientsCol2: [
        "1 tbsp Ginger Garlic (minced)",
        "1 tsp Mustard Seeds",
        "Salt & Chili Powder",
        "Curry Leaves",
      ],
      steps: [
        "Deep fry gizzards until crisp and dry.",
        "Heat mustard oil, crackle mustard seeds & curry leaves.",
        "Add ginger garlic, chili powder, pickle masala, salt, and vinegar.",
        "Add fried gizzards and toss well in spicy pickle oil.",
        "Cool and store in glass jar.",
      ],
    },
  ],
  liver: [
    {
      id: "liver-1",
      title: "Chicken Liver Pepper Fry",
      part: "Liver",
      label: "BEST FOR FRY",
      desc: "Tender chicken liver sautéed with caramelized onions and pepper.",
      img: "/Recipies/liver/Chicken-Liver-Pepper-Fry.webp",
      time: "20 mins",
      prepTime: "5 mins",
      cookTime: "15 mins",
      calories: "210 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "A nutrient-dense iron-rich dish of fresh chicken liver sautéed with caramel onions, curry leaves, and black pepper.",
      tips: [
        "Do not overcook liver or it becomes tough.",
        "Clean and soak in milk for 10 mins to remove bitterness.",
        "Cook on medium heat.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Liver",
        "2 Onions (sliced)",
        "1 tbsp Ginger Garlic",
        "1 tbsp Black Pepper",
      ],
      ingredientsCol2: [
        "1/2 tsp Turmeric",
        "Curry Leaves",
        "2 tbsp Oil",
        "Salt to taste",
      ],
      steps: [
        "Rinse liver gently and drain completely.",
        "Heat oil, sauté curry leaves and onions till dark brown.",
        "Add ginger garlic, turmeric, and liver pieces.",
        "Sauté 8-10 minutes until liver is cooked through.",
        "Toss in black pepper and serve hot.",
      ],
    },
    {
      id: "liver-2",
      title: "Rich Chicken Liver Masala",
      part: "Liver",
      label: "BEST FOR CURRY",
      desc: "Thick spicy liver curry cooked with traditional aromatic spices.",
      img: "/Recipies/liver/Rich-Chicken-Liver.webp",
      time: "25 mins",
      prepTime: "10 mins",
      cookTime: "15 mins",
      calories: "240 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Soft chicken liver pieces simmered in a rich tomato onion masala gravy infused with cumin and coriander.",
      tips: [
        "Add liver towards end of gravy cooking.",
        "Use fresh tomatoes for gravy thickness.",
        "Pairs great with rice or roti.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Liver",
        "1 Onion (finely chopped)",
        "2 Tomatoes (chopped)",
        "1 tsp Cumin Powder",
      ],
      ingredientsCol2: [
        "1 tsp Coriander Powder",
        "1/2 tsp Chili Powder",
        "Garam Masala & Cilantro",
        "Salt & Oil",
      ],
      steps: [
        "Heat oil, sauté cumin seeds, onions, and tomatoes until thick masala forms.",
        "Add chili powder, coriander powder, and salt.",
        "Gently add liver pieces to the masala.",
        "Cover and cook on low heat for 10 minutes.",
        "Garnish with garam masala and cilantro.",
      ],
    },
    {
      id: "liver-3",
      title: "Garlic Butter Liver Skewers",
      part: "Liver",
      label: "BEST FOR GRILL",
      desc: "Marinated liver cubes grilled on skewers with herb butter.",
      img: "/Recipies/liver/Garlic-Butter-Liver.webp",
      time: "15 mins",
      prepTime: "5 mins",
      cookTime: "10 mins",
      calories: "230 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "Quick grilled skewers of fresh chicken liver basted in rich garlic butter and smoked paprika.",
      tips: [
        "Thread liver onto skewers carefully.",
        "Grill 3-4 mins per side.",
        "Baste liberally with herb butter.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Liver",
        "3 tbsp Butter (melted)",
        "3 cloves Garlic",
        "1 tsp Paprika",
      ],
      ingredientsCol2: [
        "1/2 tsp Thyme",
        "Salt & Pepper",
        "Wooden Skewers",
        "Lemon juice",
      ],
      steps: [
        "Mix melted butter, garlic, paprika, thyme, salt, pepper.",
        "Thread liver onto soaked skewers.",
        "Grill over medium flame for 8 minutes total.",
        "Baste with garlic butter frequently.",
        "Drizzle lemon juice and serve.",
      ],
    },
    {
      id: "liver-4",
      title: "Creamy Liver Pate Spread",
      part: "Liver",
      label: "BEST FOR SPREAD",
      desc: "Smooth and rich chicken liver pate infused with thyme and butter.",
      img: "/Recipies/liver/Cremy-Liver-Pate-Spread.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "290 kcal",
      servings: "6 Servings",
      diff: "Medium",
      about:
        "Gourmet French-style chicken liver spread cooked with shallots, butter, and thyme, blended silky smooth.",
      tips: [
        "Blend while warm for smooth texture.",
        "Top with melted butter layer to preserve in fridge.",
        "Serve with toasted baguette or crackers.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Liver",
        "1/2 cup Butter",
        "2 Shallots (minced)",
        "2 cloves Garlic",
      ],
      ingredientsCol2: [
        "1 tsp Fresh Thyme",
        "2 tbsp Heavy Cream",
        "Salt & White Pepper",
        "Crusty Bread",
      ],
      steps: [
        "Melt 2 tbsp butter, cook shallots, garlic, and thyme 3 mins.",
        "Add liver and cook 6 mins until soft pink inside.",
        "Transfer to food processor with remaining butter and heavy cream.",
        "Blend until velvety smooth.",
        "Chill in ramekins and serve with toast.",
      ],
    },
  ],
  heart: [
    {
      id: "heart-1",
      title: "Spicy Heart Skewers",
      part: "Heart",
      label: "BEST FOR GRILL",
      desc: "Tender grilled chicken hearts seasoned with black pepper & herbs.",
      img: "/Recipies/heart/Spicy-Heart-skewers.webp",
      time: "20 mins",
      prepTime: "10 mins",
      cookTime: "10 mins",
      calories: "210 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "Juicy chicken hearts marinated in dark soy, garlic, and coarse black pepper, threaded on wooden skewers and grilled.",
      tips: [
        "Soak wooden skewers in water for 15 mins to prevent burning.",
        "Grill on high heat for short duration to retain juiciness.",
        "Squeeze fresh lemon before serving.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Hearts",
        "2 tbsp Soy Sauce",
        "1 tbsp Garlic Paste",
        "1 tsp Black Pepper",
      ],
      ingredientsCol2: [
        "1 tbsp Olive Oil",
        "Salt to Taste",
        "Wooden Skewers",
        "Lemon Wedges",
      ],
      steps: [
        "Clean chicken hearts and pat dry with paper towels.",
        "Mix soy sauce, garlic, black pepper, and olive oil.",
        "Marinate hearts for 15 minutes.",
        "Thread 4-5 hearts onto each skewer.",
        "Grill for 8-10 minutes, turning frequently.",
      ],
    },
    {
      id: "heart-2",
      title: "Chicken Heart Pepper Fry",
      part: "Heart",
      label: "BEST FOR FRY",
      desc: "Sautéed chicken hearts with crushed black pepper & curry leaves.",
      img: "/Recipies/heart/Chicken-Heart- Pepper-Fry.webp",
      time: "25 mins",
      prepTime: "10 mins",
      cookTime: "15 mins",
      calories: "230 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "A South Indian delicacy featuring tender chicken hearts sautéed with caramelized onions and freshly ground pepper.",
      tips: [
        "Use freshly ground black pepper for maximum flavor.",
        "Add fresh curry leaves right at the end.",
        "Sauté onions until dark golden brown.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Hearts",
        "2 tbsp Coconut Oil",
        "2 Large Onions (sliced)",
        "1 tbsp Ginger Garlic Paste",
      ],
      ingredientsCol2: [
        "1.5 tbsp Coarse Black Pepper",
        "1 sprig Curry Leaves",
        "1/2 tsp Turmeric Powder",
        "Salt to Taste",
      ],
      steps: [
        "Heat coconut oil and fry curry leaves & onions until golden.",
        "Add ginger garlic paste and turmeric; sauté 2 mins.",
        "Add chicken hearts and cook on medium flame for 10 mins.",
        "Stir in crushed black pepper and roast until dry.",
        "Serve warm with steamed rice or bread.",
      ],
    },
    {
      id: "heart-3",
      title: "South Indian Heart Curry",
      part: "Heart",
      label: "BEST FOR CURRY",
      desc: "Rich and aromatic chicken heart curry in coconut gravy.",
      img: "/Recipies/heart/South-Indian-Heart-Curry.webp",
      time: "35 mins",
      prepTime: "15 mins",
      cookTime: "20 mins",
      calories: "260 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Tender chicken hearts simmered in a spiced coconut gravy infused with fennel, cloves, and coriander.",
      tips: [
        "Simmer coconut milk on low flame to prevent curdling.",
        "Roast whole spices before grinding for deep aroma.",
        "Pairs wonderfully with Kerala parotta or appam.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Hearts",
        "1 cup Coconut Milk",
        "1 Onion (chopped)",
        "1 Tomato (chopped)",
      ],
      ingredientsCol2: [
        "1 tsp Coriander Powder",
        "1 tsp Chili Powder",
        "1/2 tsp Garam Masala",
        "Salt & Cilantro",
      ],
      steps: [
        "Heat oil in a pan, add spices, onions, and tomato; cook soft.",
        "Add chili powder, coriander powder, and chicken hearts.",
        "Pour 1 cup water, cover, and cook 15 minutes.",
        "Stir in coconut milk and simmer for 5 minutes.",
        "Garnish with fresh cilantro.",
      ],
    },
    {
      id: "heart-4",
      title: "Garlic Butter Heart Stir-Fry",
      part: "Heart",
      label: "BEST FOR STIR-FRY",
      desc: "Cleaned chicken hearts tossed with garlic, butter & veggies.",
      img: "/Recipies/heart/Garlic-Butter-Heart-Stir-Fry.webp",
      time: "15 mins",
      prepTime: "5 mins",
      cookTime: "10 mins",
      calories: "240 kcal",
      servings: "2 Servings",
      diff: "Easy",
      about:
        "Quick high-protein stir-fry of sliced chicken hearts with bell peppers and butter garlic sauce.",
      tips: [
        "Keep heat high for quick stir-frying.",
        "Do not overcook to keep hearts tender.",
        "Add capsicum for crunch.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Hearts",
        "2 tbsp Butter",
        "1/2 cup Bell Peppers",
        "4 cloves Garlic",
      ],
      ingredientsCol2: [
        "1 tsp Soy Sauce",
        "1/2 tsp Chili Flakes",
        "Salt & Black Pepper",
        "Spring Onions",
      ],
      steps: [
        "Melt butter in a hot wok, sauté garlic for 1 min.",
        "Add chicken hearts and sear on high heat 5 mins.",
        "Add sliced bell peppers, soy sauce, and chili flakes.",
        "Stir-fry 3 minutes until tender crisp.",
        "Top with spring onions.",
      ],
    },
  ],
  drumette: [
    {
      id: "drumette-1",
      title: "Crispy Fried Drumettes",
      part: "Drumette",
      label: "BEST FOR FRY",
      desc: "Golden deep-fried drumettes with crunchy seasoned batter.",
      img: "/Recipies/drumette/Crispy-Fried-Drumettes.webp",
      time: "25 mins",
      prepTime: "10 mins",
      cookTime: "15 mins",
      calories: "320 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Meaty chicken drumettes marinated in spiced buttermilk and fried to golden crunchy perfection.",
      tips: [
        "Soak in buttermilk for extra tender meat.",
        "Maintain oil temperature at 170°C.",
        "Serve with spicy garlic mayo.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumettes",
        "1 cup Buttermilk",
        "1 cup All-Purpose Flour",
        "1 tbsp Paprika",
      ],
      ingredientsCol2: [
        "1 tsp Garlic Powder",
        "Salt & Pepper",
        "Oil for frying",
        "Dipping sauce",
      ],
      steps: [
        "Marinate drumettes in buttermilk for 30 mins.",
        "Mix flour, paprika, garlic powder, salt, and pepper.",
        "Dredge drumettes in flour mix.",
        "Deep fry for 12-15 minutes until golden and crispy.",
        "Drain on paper towels and serve.",
      ],
    },
    {
      id: "drumette-2",
      title: "Tangy BBQ Drumette Roast",
      part: "Drumette",
      label: "BEST FOR BBQ",
      desc: "Marinated drumettes slow-roasted in rich tangy barbecue sauce.",
      img: "/Recipies/drumette/Tangy-BBQ-Drumette-Roast.webp",
      time: "40 mins",
      prepTime: "10 mins",
      cookTime: "30 mins",
      calories: "340 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Oven-roasted chicken drumettes slathered in smoky BBQ glaze with caramelized edges.",
      tips: [
        "Line baking tray with foil for easy cleanup.",
        "Turn drumettes midway through baking.",
        "Baste twice for deep flavor.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumettes",
        "1/2 cup Hickory BBQ Sauce",
        "1 tbsp Brown Sugar",
        "1 tbsp Apple Cider Vinegar",
      ],
      ingredientsCol2: [
        "1 tsp Mustard Powder",
        "Salt & Black Pepper",
        "Olive Oil",
        "Fresh Parsley",
      ],
      steps: [
        "Mix BBQ sauce, brown sugar, vinegar, mustard, and oil.",
        "Coat drumettes in half of the sauce marinade.",
        "Roast at 190°C for 25 minutes.",
        "Brush with remaining BBQ sauce.",
        "Broil 5 minutes until sticky and caramelized.",
      ],
    },
    {
      id: "drumette-3",
      title: "Spicy Lollipop Drumettes",
      part: "Drumette",
      label: "BEST FOR STARTER",
      desc: "Lollipop style drumettes served with spicy schezwan dip.",
      img: "/Recipies/drumette/Spicy-Lollipop-Drumettes.webp",
      time: "30 mins",
      prepTime: "15 mins",
      cookTime: "15 mins",
      calories: "290 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Fun lollipop-cut drumettes coated in Indo-Chinese Schezwan sauce, crispy outside and juicy inside.",
      tips: [
        "Push meat down bone to form clean lollipops.",
        "Fry until crisp before tossing in sauce.",
        "Wrap bone tips in foil for neat serving.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumettes",
        "2 tbsp Schezwan Sauce",
        "1 tbsp Ginger Garlic Paste",
        "2 tbsp Cornflour",
      ],
      ingredientsCol2: [
        "1 tbsp Soy Sauce",
        "Oil for frying",
        "Salt to taste",
        "Spring Onions",
      ],
      steps: [
        "Cut and shape drumettes into lollipops.",
        "Marinate with ginger garlic paste, salt, cornflour.",
        "Deep fry until crispy.",
        "Toss in hot Schezwan and soy sauce glaze.",
        "Garnish with spring onions.",
      ],
    },
    {
      id: "drumette-4",
      title: "Herb Roasted Drumette Platter",
      part: "Drumette",
      label: "BEST FOR ROAST",
      desc: "Oven-baked drumettes with rosemary, thyme, and olive oil.",
      img: "/Recipies/drumette/Hearb-Roasted-Drumette-Platter.webp",
      time: "35 mins",
      prepTime: "10 mins",
      cookTime: "25 mins",
      calories: "280 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "A healthy and elegant oven roast featuring drumettes rubbed with extra virgin olive oil, fresh rosemary, and garlic.",
      tips: [
        "Use fresh rosemary for herbal fragrance.",
        "Roast alongside baby potatoes.",
        "Squeeze lemon before serving.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Drumettes",
        "2 tbsp Olive Oil",
        "2 sprigs Fresh Rosemary",
        "1 tsp Thyme",
      ],
      ingredientsCol2: [
        "4 cloves Garlic (crushed)",
        "Salt & Black Pepper",
        "Lemon Juice",
        "Cherry Tomatoes",
      ],
      steps: [
        "Combine olive oil, rosemary, thyme, garlic, salt, pepper.",
        "Rub herbs and oil thoroughly over drumettes.",
        "Arrange in baking dish with cherry tomatoes.",
        "Bake at 200°C for 25 minutes until golden.",
        "Drizzle lemon juice and serve.",
      ],
    },
  ],
  neck: [
    {
      id: "neck-1",
      title: "Nutritious Neck Soup",
      part: "Neck",
      label: "BEST FOR SOUP",
      desc: "Nourishing and collagen-rich chicken neck bone soup with herbs.",
      img: "/Recipies/neck/Nutritious-Neck-Soup.webp",
      time: "45 mins",
      prepTime: "10 mins",
      cookTime: "35 mins",
      calories: "180 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "A wholesome wellness soup extracting rich marrow nutrients and collagen from clean chicken necks simmered with ginger and black pepper.",
      tips: [
        "Simmer low and slow for maximum marrow extraction.",
        "Add fresh coriander stems while boiling.",
        "Great remedy for cold and immune boost.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Necks",
        "1 inch Ginger (crushed)",
        "6 cloves Garlic",
        "1/2 tsp Turmeric",
      ],
      ingredientsCol2: [
        "1 tbsp Black Peppercorns",
        "4 cups Water",
        "Salt to Taste",
        "Fresh Coriander",
      ],
      steps: [
        "Clean chicken necks thoroughly in warm salt water.",
        "In a pot or pressure cooker, add necks, ginger, garlic, turmeric, peppercorns, and water.",
        "Pressure cook for 4 whistles or simmer 35 mins.",
        "Strain or serve soup with tender neck pieces.",
        "Garnish with black pepper and coriander.",
      ],
    },
    {
      id: "neck-2",
      title: "Spicy Neck Pepper Masala",
      part: "Neck",
      label: "BEST FOR GRAVY",
      desc: "Flavorful chicken necks sautéed with spicy black pepper gravy.",
      img: "/Recipies/neck/Spicy-Neck-Pepper-Masala.webp",
      time: "35 mins",
      prepTime: "10 mins",
      cookTime: "25 mins",
      calories: "240 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Rich bone-in chicken necks cooked in a spicy Chettinad-style roasted pepper gravy.",
      tips: [
        "Dry roast coriander and fennel seeds before grinding.",
        "Pressure cook necks first to soften bone joints.",
        "Pairs great with dosa or steamed rice.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Necks",
        "2 Onions (chopped)",
        "1 Tomato (chopped)",
        "1 tbsp Ginger Garlic",
      ],
      ingredientsCol2: [
        "1.5 tbsp Roasted Black Pepper",
        "1 tsp Fennel Powder",
        "Curry Leaves & Oil",
        "Salt to taste",
      ],
      steps: [
        "Pressure cook chicken necks with turmeric & salt for 2 whistles.",
        "Sauté onions, curry leaves, and ginger garlic paste.",
        "Add tomatoes and cooked neck pieces with stock.",
        "Simmer until gravy thickens.",
        "Stir in black pepper and fennel powder before serving.",
      ],
    },
    {
      id: "neck-3",
      title: "Traditional Bone Broth Stock",
      part: "Neck",
      label: "BEST FOR BROTH",
      desc: "Slow-simmered chicken neck stock packed with wholesome nutrients.",
      img: "/Recipies/neck/Traditional-Bone-Broth-Stock.webp",
      time: "60 mins",
      prepTime: "10 mins",
      cookTime: "50 mins",
      calories: "150 kcal",
      servings: "6 Servings",
      diff: "Easy",
      about:
        "Pure homemade chicken bone broth made from collagen-dense necks, carrot, celery, and herbs.",
      tips: [
        "Add 1 tsp apple cider vinegar to extract calcium from bones.",
        "Store in airtight jars in fridge up to 5 days.",
        "Use as base for soups and risottos.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Necks",
        "1 Carrot (chunked)",
        "1 Celery stalk",
        "1 Onion (halved)",
      ],
      ingredientsCol2: [
        "1 tsp Apple Cider Vinegar",
        "2 Bay Leaves",
        "1 tsp Black Peppercorns",
        "6 cups Water",
      ],
      steps: [
        "Roast necks in oven at 200°C for 15 mins for deep flavor.",
        "Transfer necks to stockpot with vegetables, bay leaves, vinegar, and water.",
        "Bring to boil, then reduce heat to lowest setting.",
        "Simmer covered for 45-60 minutes.",
        "Strain clear golden broth and enjoy warm.",
      ],
    },
    {
      id: "neck-4",
      title: "South Indian Neck Fry",
      part: "Neck",
      label: "BEST FOR FRY",
      desc: "Spicy and crisp fried chicken necks seasoned with curry leaves.",
      img: "/Recipies/neck/South-Indian-Neck-Fry.webp",
      time: "30 mins",
      prepTime: "10 mins",
      cookTime: "20 mins",
      calories: "270 kcal",
      servings: "3 Servings",
      diff: "Easy",
      about:
        "Crispy pan-fried chicken necks seasoned with spicy red chili, garlic, and fried curry leaves.",
      tips: [
        "Boil necks for 10 mins before pan frying so meat cooks through.",
        "Fry on medium heat till dark red and crisp.",
        "Serve as a side dish with rice & rasam.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Necks",
        "1 tbsp Chili Powder",
        "1/2 tsp Turmeric",
        "1 tbsp Rice Flour",
      ],
      ingredientsCol2: [
        "1 tbsp Ginger Garlic",
        "2 sprigs Curry Leaves",
        "Oil for shallow fry",
        "Salt to taste",
      ],
      steps: [
        "Parboil necks in salted water for 10 minutes.",
        "Marinate with chili powder, turmeric, ginger garlic, rice flour.",
        "Heat 3 tbsp oil in a skillet.",
        "Shallow fry necks and curry leaves until dark crisp.",
        "Serve hot with lemon wedges.",
      ],
    },
  ],
  back: [
    {
      id: "back-1",
      title: "Rich Back Bone Broth",
      part: "Back",
      label: "BEST FOR BROTH",
      desc: "Collagen-dense chicken back bone broth simmered for deep flavor.",
      img: "/Recipies/back/Rich-Back-Bone-Broth.webp",
      time: "90 mins",
      prepTime: "10 mins",
      cookTime: "80 mins",
      calories: "160 kcal",
      servings: "6 Servings",
      diff: "Easy",
      about:
        "Concentrated bone broth made from chicken backs rich in natural gelatin, ideal for gut health and immunity.",
      tips: [
        "Simmer gently on lowest heat setting.",
        "Skim off foam during initial boil.",
        "Freeze in ice cube trays for easy cooking stock.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Backs",
        "1 Onion (quartered)",
        "2 Carrots",
        "4 Garlic cloves",
      ],
      ingredientsCol2: [
        "1 tbsp Apple Cider Vinegar",
        "1 tsp Black Peppercorns",
        "Salt to taste",
        "Water",
      ],
      steps: [
        "Place chicken backs in a deep stockpot.",
        "Add vegetables, vinegar, peppercorns, and fill with water.",
        "Bring to boil, then reduce heat to lowest setting.",
        "Simmer covered for 75-80 minutes.",
        "Strain clear broth and season with salt.",
      ],
    },
    {
      id: "back-2",
      title: "Spicy Back Piece Curry",
      part: "Back",
      label: "BEST FOR CURRY",
      desc: "Traditional country-style chicken back curry with coconut milk.",
      img: "/Recipies/back/Spicy-Back-Piece-Curry.webp",
      time: "40 mins",
      prepTime: "10 mins",
      cookTime: "30 mins",
      calories: "290 kcal",
      servings: "4 Servings",
      diff: "Medium",
      about:
        "Rustic country style chicken curry where chicken back pieces impart deep flavor into coconut curry.",
      tips: [
        "Use freshly ground curry powder.",
        "Simmer back pieces well so marrow infuses curry.",
        "Serve with rice cakes or parotta.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Backs",
        "2 Onions (sliced)",
        "1 cup Coconut Milk",
        "1 tbsp Chili Powder",
      ],
      ingredientsCol2: [
        "1 tbsp Coriander Powder",
        "1/2 tsp Turmeric",
        "Curry Leaves & Oil",
        "Salt to taste",
      ],
      steps: [
        "Sauté onions and curry leaves in oil till brown.",
        "Add ginger garlic and spice powders.",
        "Add chicken backs and toss 5 mins.",
        "Pour 1.5 cups water, cover and cook 20 mins.",
        "Stir in coconut milk and simmer 5 mins.",
      ],
    },
    {
      id: "back-3",
      title: "Chicken Back Soup Base",
      part: "Back",
      label: "BEST FOR SOUP",
      desc: "Flavor-packed chicken stock base for rich winter soups.",
      img: "/Recipies/back/Chicken-Back-Soup-Base.webp",
      time: "45 mins",
      prepTime: "10 mins",
      cookTime: "35 mins",
      calories: "170 kcal",
      servings: "5 Servings",
      diff: "Easy",
      about:
        "Clear savory chicken soup featuring tender chicken back pieces, sweet corn, and egg drops.",
      tips: [
        "Whisk egg slowly into soup while stirring for silky threads.",
        "Add cornflour slurry for thickness.",
        "Top with white pepper.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Backs",
        "1/2 cup Sweet Corn",
        "1 Egg (beaten)",
        "1 tbsp Soy Sauce",
      ],
      ingredientsCol2: [
        "1 tbsp Cornflour",
        "1/2 tsp White Pepper",
        "Salt to taste",
        "Spring Onions",
      ],
      steps: [
        "Boil chicken backs in 5 cups water 25 mins to make stock.",
        "Strain stock, shred any meat from back pieces and return to soup.",
        "Add sweet corn, soy sauce, white pepper, salt.",
        "Thicken with cornflour slurry.",
        "Drizzle beaten egg while stirring gently.",
      ],
    },
    {
      id: "back-4",
      title: "Masala Roasted Back Cuts",
      part: "Back",
      label: "BEST FOR ROAST",
      desc: "Spicy oven-roasted chicken back cuts with caramelized onions.",
      img: "/Recipies/back/Masala-Roasted-Back-Cuts.webp",
      time: "35 mins",
      prepTime: "10 mins",
      cookTime: "25 mins",
      calories: "280 kcal",
      servings: "4 Servings",
      diff: "Easy",
      about:
        "Oven-roasted chicken back cuts tossed with aromatic Indian dry spices and crispy roasted onions.",
      tips: [
        "Roast at high temp 210°C for crispy skin.",
        "Baste with oil twice.",
        "Serve as side dish.",
      ],
      ingredientsCol1: [
        "500 g MEATiN Chicken Backs",
        "1 tbsp Garam Masala",
        "1 tbsp Chili Powder",
        "1 tbsp Ginger Garlic",
      ],
      ingredientsCol2: [
        "2 tbsp Mustard Oil",
        "1 tsp Lemon Juice",
        "Salt to taste",
        "Fried Onions",
      ],
      steps: [
        "Marinate back cuts with spices, oil, and ginger garlic paste.",
        "Arrange on baking tray lined with parchment paper.",
        "Roast at 210°C for 25 mins until crisp.",
        "Sprinkle fried onions and lemon juice.",
        "Serve warm.",
      ],
    },
  ],
};

export default function RecipesPage() {
  // Active meat category state ('chicken' | 'beef' | 'goat')
  const [activeMeatType, setActiveMeatType] = useState<
    "chicken" | "beef" | "goat"
  >("chicken");
  // Filter state: 'all' to show all parts vertically, or part ID to filter
  const [activeFilter, setActiveFilter] = useState<string>("all");
  // Selected recipe detail object (if null, shows main listing view)
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);
  // Auto-highlight index for parts circles
  const [highlightedPartIdx, setHighlightedPartIdx] = useState<number>(0);
  // Pending category section to scroll to when detail view exits
  const [pendingScrollPart, setPendingScrollPart] = useState<string | null>(null);

  // Auto-cycle yellow highlight through parts circles every 2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHighlightedPartIdx((prev) => (prev + 1) % chickenPartsList.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Read URL query parameters to auto-open recipe details when redirected from Know Your Meat
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const recipeId = params.get("recipeId");
    const title = params.get("title");
    const part = params.get("part");

    if (recipeId || title || part) {
      let found: RecipeItem | undefined;

      // 1. Search by exact recipeId
      if (recipeId) {
        for (const key of Object.keys(recipesDatabase)) {
          found = recipesDatabase[key].find((r) => r.id === recipeId);
          if (found) break;
        }
      }

      // 2. Search by title match if not found by id
      if (!found && title) {
        const decodedTitle = decodeURIComponent(title).toLowerCase();
        for (const key of Object.keys(recipesDatabase)) {
          found = recipesDatabase[key].find(
            (r) => r.title.toLowerCase() === decodedTitle
          );
          if (found) break;
        }
      }

      // 3. Fallback to first recipe of part
      if (!found && part) {
        const partRecipes = recipesDatabase[part.toLowerCase()];
        if (partRecipes && partRecipes.length > 0) {
          found = partRecipes[0];
        }
      }

      if (found) {
        setSelectedRecipe(found);
        const partIdx = chickenPartsList.findIndex(
          (p) => p.id === found?.part.toLowerCase()
        );
        if (partIdx !== -1) {
          setHighlightedPartIdx(partIdx);
        }
        window.history.pushState(
          { recipeDetail: true, part: found.part.toLowerCase() },
          "",
          window.location.href
        );
      }
    }
  }, []);

  const handleBackToCategory = (targetPart?: string) => {
    const partToScroll =
      targetPart ||
      (selectedRecipe ? selectedRecipe.part.toLowerCase() : null) ||
      (typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("part")?.toLowerCase()
        : null);

    setSelectedRecipe(null);
    if (partToScroll) {
      setPendingScrollPart(partToScroll);
    }
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", "/recipes");
    }
  };

  // Intercept browser back button when recipe detail or URL parameters are active
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const hasUrlParams =
        params.has("part") || params.has("recipeId") || params.has("title");

      if (selectedRecipe || hasUrlParams) {
        handleBackToCategory();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [selectedRecipe]);

  // Reliable, retrying scroll to targeted category section after main list re-mounts
  useEffect(() => {
    if (!selectedRecipe && pendingScrollPart) {
      let attempts = 0;
      const maxAttempts = 20;

      const scrollToTarget = () => {
        const el = document.getElementById(`part-section-${pendingScrollPart}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const navOffset = 90;
          const targetY = Math.max(0, rect.top + window.scrollY - navOffset);

          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });

          setPendingScrollPart(null);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(scrollToTarget, 50);
        }
      };

      const timer = setTimeout(scrollToTarget, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedRecipe, pendingScrollPart]);

  // Auto-scroll to recipe detail view when a recipe is selected
  useEffect(() => {
    if (selectedRecipe) {
      const scrollExact = () => {
        const detailEl = document.getElementById("recipe-detail-section");
        if (detailEl) {
          const rect = detailEl.getBoundingClientRect();
          const navOffset = 100;
          const targetY = Math.max(0, rect.top + window.scrollY - navOffset);
          window.scrollTo({
            top: targetY,
            behavior: "smooth",
          });
        }
      };

      const t0 = requestAnimationFrame(scrollExact);
      const t1 = setTimeout(scrollExact, 150);
      const t2 = setTimeout(scrollExact, 400);

      return () => {
        cancelAnimationFrame(t0);
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [selectedRecipe]);

  // Smooth scroll to a part section when pill is clicked
  const handlePartClick = (partId: string) => {
    setActiveFilter("all");
    setSelectedRecipe(null);
    setPendingScrollPart(partId.toLowerCase());
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", "/recipes");
    }
  };

  // Filter parts list to render
  const partsToDisplay =
    activeFilter === "all"
      ? chickenPartsList
      : chickenPartsList.filter((p) => p.id === activeFilter);

  return (
    <div className="relative min-h-screen bg-gray-50 antialiased flex flex-col selection:bg-[#8DC541] selection:text-white overflow-x-clip pt-0">
      <section
        style={{
          background: "radial-gradient(circle at center, #488E40 0%, #064823 100%)",
        }}
        className="relative w-full text-white pt-20 sm:pt-22 md:pt-24 pb-2 sm:pb-3 px-4 sm:px-8 lg:px-12 rounded-b-[30px] md:rounded-b-[40px] overflow-hidden select-none shadow-xl min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col justify-between"
      >
        <div
          className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-80"
          style={{
            backgroundImage: 'url("/Product/Chicken/doodle.webp")',
            backgroundSize: "800px",
          }}
        />
        <div className="relative z-20 w-full flex items-stretch justify-between gap-4 md:gap-6 my-auto">
          <div className="flex-1 min-w-0 flex flex-col justify-start gap-1.5 sm:gap-2">
            <div className="w-full flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 sm:gap-4 lg:gap-5">
              <div className="space-y-2 sm:space-y-3 flex-1 min-w-[220px] max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -35 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="flex items-center gap-2.5"
                >
                  <span className="w-7 h-[2.5px] bg-[#F2CE07]" />
                  <span className="text-xs sm:text-sm lg:text-sm font-extrabold text-[#F2CE07] tracking-widest uppercase font-manrope">
                    RECIPES
                  </span>
                </motion.div>
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] xl:text-[52px] 2xl:text-[60px] font-bold font-anek tracking-wide uppercase leading-none flex items-center gap-2 sm:gap-3 flex-nowrap whitespace-nowrap">
                    <motion.span
                      initial={{ opacity: 0, x: -40, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.65, ease: "easeOut", delay: 0.25 }}
                      className="inline-block text-white font-bold"
                    >
                      CHICKEN
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, x: 40, y: 10 }}
                      animate={{ opacity: 1, x: 0, y: 0 }}
                      transition={{ duration: 0.75, ease: "easeOut", delay: 0.4 }}
                      className="text-[#8DC541] inline-block font-bold"
                    >
                      {selectedRecipe
                        ? selectedRecipe.part.toUpperCase()
                        : activeFilter !== "all"
                        ? activeFilter.toUpperCase()
                        : "RECIPES"}
                    </motion.span>
                  </h1>
                </div>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="text-white/90 text-xs sm:text-xs md:text-sm font-medium leading-snug font-manrope max-w-xs sm:max-w-sm pt-0.5"
                >
                  Explore delicious chicken recipes for every part and every mood.
                </motion.p>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="hidden min-[1301px]:block relative w-20 h-20 xl:w-24 xl:h-24 2xl:w-28 2xl:h-28 shrink-0 pointer-events-none mx-0"
              >
                <Image
                  src="/Recipies/header/spoon-image.webp"
                  alt="Wooden Spoon with Pepper"
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                className="hidden lg:block relative w-full max-w-[360px] xl:max-w-[440px] h-[150px] xl:h-[180px] shrink min-w-[150px]"
              >
                <Image
                  src="/Recipies/header/chicken-food-images.webp"
                  alt="Chicken Recipes Display"
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                />
              </motion.div>
            </div>
            <div className="w-full flex items-center justify-between gap-3 sm:gap-4 pt-1 pb-1">
              <div className="flex-1 min-w-0 overflow-x-auto scrollbar-none [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3.5 sm:py-4 px-2 sm:px-3">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-6 2xl:gap-7 select-none flex-nowrap">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                    onClick={() => {
                      setActiveFilter("all");
                      setSelectedRecipe(null);
                      if (typeof window !== "undefined") {
                        window.history.replaceState({}, "", "/recipes");
                      }
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0 relative"
                  >
                    <motion.button
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      animate={{ scale: activeFilter === "all" && !selectedRecipe ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`relative z-10 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] xl:w-[64px] xl:h-[64px] 2xl:w-[76px] 2xl:h-[76px] rounded-full flex items-center justify-center font-extrabold text-[11px] sm:text-xs lg:text-xs xl:text-xs 2xl:text-sm tracking-wider shrink-0 cursor-pointer text-white transition-all duration-300 ${
                        activeFilter === "all" && !selectedRecipe
                          ? "bg-white/35 backdrop-blur-xl border-2 border-[#F2CE07] ring-4 ring-[#F2CE07]/30 shadow-[0_4px_18px_rgba(242,206,7,0.45)]"
                          : "bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 shadow-md"
                      }`}
                    >
                      {activeFilter === "all" && !selectedRecipe && (
                        <motion.div
                          layoutId="activeCategoryHighlight"
                          className="absolute -inset-1 rounded-full border-2 border-[#F2CE07] bg-[#F2CE07]/15 pointer-events-none z-0"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        />
                      )}
                      <span className="relative z-10">ALL</span>
                    </motion.button>
                    <span
                      className={`text-[10px] sm:text-[11px] lg:text-xs xl:text-xs 2xl:text-sm font-extrabold tracking-wider uppercase font-manrope transition-colors flex flex-col items-center gap-1 ${
                        activeFilter === "all" && !selectedRecipe
                          ? "text-[#F2CE07] font-black drop-shadow-sm"
                          : "text-white/90 group-hover:text-[#F2CE07]"
                      }`}
                    >
                      ALL
                      {activeFilter === "all" && !selectedRecipe && (
                        <motion.span
                          layoutId="activeCategoryDot"
                          className="w-1.5 h-1.5 rounded-full bg-[#F2CE07] shadow-sm"
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        />
                      )}
                    </span>
                  </motion.div>

                  {chickenPartsList.map((part, index) => {
                    const isAutoHighlighted = highlightedPartIdx === index && !selectedRecipe && activeFilter === "all";
                    const isSelected = selectedRecipe
                      ? selectedRecipe.part.toLowerCase() === part.id.toLowerCase()
                      : activeFilter.toLowerCase() === part.id.toLowerCase();
                    const isHighlighted = isSelected || isAutoHighlighted;

                    return (
                      <motion.div
                        key={part.id}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          duration: 0.45,
                          delay: 0.55 + index * 0.05,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        onClick={() => {
                          setHighlightedPartIdx(index);
                          handlePartClick(part.id);
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group shrink-0 relative"
                      >
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          animate={{ scale: isHighlighted ? 1.06 : 1 }}
                          transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          className={`relative z-10 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] xl:w-[64px] xl:h-[64px] 2xl:w-[76px] 2xl:h-[76px] rounded-full bg-white flex items-center justify-center p-1 sm:p-1.5 shrink-0 cursor-pointer transition-all duration-300 ${
                            isHighlighted
                              ? "ring-4 ring-[#F2CE07]/40 bg-[#FFFDE7] shadow-[0_4px_20px_rgba(242,206,7,0.45)] border-2 border-[#F2CE07]"
                              : "border border-white/60 hover:scale-105 shadow-md"
                          }`}
                          title={part.name}
                        >
                          {isHighlighted && (
                            <motion.div
                              layoutId="activeCategoryHighlight"
                              className="absolute -inset-1 rounded-full border-2 border-[#F2CE07] bg-[#F2CE07]/15 pointer-events-none z-0"
                              transition={{ type: "spring", stiffness: 350, damping: 28 }}
                            />
                          )}
                          <div className="relative w-full h-full z-10">
                            <Image
                              src={part.img}
                              alt={part.name}
                              fill
                              className="object-contain p-0.5"
                            />
                          </div>
                        </motion.button>
                        <span
                          className={`text-[10px] sm:text-[11px] lg:text-xs xl:text-xs 2xl:text-sm font-extrabold tracking-wider uppercase font-manrope transition-colors flex flex-col items-center gap-1 ${
                            isHighlighted
                              ? "text-[#F2CE07] drop-shadow-sm font-black"
                              : "text-white/90 group-hover:text-[#F2CE07]"
                          }`}
                        >
                          {part.name}
                          {isHighlighted && (
                            <motion.span
                              layoutId="activeCategoryDot"
                              className="w-1.5 h-1.5 rounded-full bg-[#F2CE07] shadow-sm"
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            />
                          )}
                        </span>
                      </motion.div>
                    );
                  })}

                  {/* Ingredient Small Image positioned after categories list */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.05 }}
                    className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 shrink-0 pointer-events-none ml-2 sm:ml-4 lg:ml-6 2xl:ml-8 my-auto"
                  >
                    <Image
                      src="/Recipies/header/ingredient-image.webp"
                      alt="Ingredient Spices"
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="hidden sm:flex shrink-0 w-[90px] sm:w-[115px] md:w-[135px] lg:w-[155px] xl:w-[175px] relative items-end justify-center pointer-events-none"
          >
            <div className="relative w-full h-[160px] sm:h-[190px] md:h-[220px] lg:h-[250px] xl:h-[280px]">
              <Image
                src="/Recipies/header/chicken-character-image.webp"
                alt="MEATiN Chicken Chef Mascot"
                fill
                priority
                className="object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="relative z-20 flex-1 w-full px-[2vw] pt-1 sm:pt-2 pb-6 sm:pb-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedRecipe ? (
            /* ========================================================= */
            /* VIEW 1: ALL CHICKEN PARTS LISTED ONE BY ONE VERTICALLY    */
            /* ========================================================= */
            <motion.div
              key="all-parts-vertical-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 sm:space-y-8 relative"
            >
              {/* Background Doodle Pattern Overlay (View 1 Only) */}
              <div
                className="absolute inset-0 pointer-events-none bg-repeat z-0 opacity-50 filter brightness-0"
                style={{
                  backgroundImage: 'url("/Product/Chicken/doodle.webp")',
                  backgroundSize: "800px",
                }}
              />
            {partsToDisplay.map((part, index) => {
              const recipes = recipesDatabase[part.id] || [];
              const isFirstItem = index === 0;
              return (
                <section
                  key={part.id}
                  id={`part-section-${part.id}`}
                  className={`space-y-3 sm:space-y-4 scroll-mt-12 sm:scroll-mt-16 ${isFirstItem ? "pt-0 -mt-3 sm:-mt-6" : "pt-2"}`}
                >
                  {/* Section Label Header with Icon & Badge - AOS Scroll Animation */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between pb-2 max-w-[1550px] mx-auto"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white border border-slate-200/80 p-2 sm:p-2.5 flex items-center justify-center shadow-md shrink-0">
                        <Image
                          src={part.img}
                          alt={part.name}
                          width={44}
                          height={44}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold font-barlow-condensed uppercase text-[#064823] tracking-wide">
                          {part.name} RECIPES
                        </h2>
                        <p className="text-[11px] sm:text-sm lg:text-xs xl:text-sm font-medium text-slate-600 font-manrope">
                          Showing 4 curated dishes for chicken{" "}
                          {part.name.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* 4 Recipe Cards Grid for this part */}
                  <div className="grid grid-cols-2 max-[480px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1550px] mx-auto">
                    {recipes.map((recipe, idx) => (
                      <motion.div
                        key={recipe.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.4, delay: idx * 0.08 }}
                        whileHover={{
                          y: -8,
                          boxShadow: "0 20px 35px -5px rgba(0, 0, 0, 0.25)",
                        }}
                        onClick={() => {
                          setSelectedRecipe(recipe);
                          if (typeof window !== "undefined") {
                            window.history.pushState(
                              { recipeDetail: true, part: recipe.part.toLowerCase() },
                              "",
                              `/recipes?part=${recipe.part.toLowerCase()}&recipeId=${recipe.id}&title=${encodeURIComponent(recipe.title)}`
                            );
                          }
                        }}
                        className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)] transition-all duration-300 group flex flex-col select-none cursor-pointer border border-slate-200/90 ring-1 ring-black/[0.04]"
                      >
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
                            {/* Recipe Title */}
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
                          <button className="w-full bg-[#F7840F] group-hover:bg-[#e0730b] text-white text-[12.5px] font-bold py-2.5 px-3.5 rounded-xl flex items-center justify-center gap-1.5 uppercase tracking-wider transition-colors cursor-pointer font-inter shadow-sm group-hover:shadow !mt-3">
                            <span>VIEW RECIPE & STEPS →</span>
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              );
            })}
          </motion.div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: FULL RECIPE DETAIL VIEW FOR SELECTED RECIPE CARD   */
          /* ========================================================= */
          <motion.div
            key={`detail-${selectedRecipe.id}`}
            id="recipe-detail-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12 relative scroll-mt-24 w-full"
          >
            {/* Decorative Left Bottom Chicken & Herbs Bowl Graphic (Shifted left to clear ingredients text) */}
            <div className="absolute left-[-140px] sm:left-[-120px] lg:left-[-180px] xl:left-[-130px] 2xl:left-[-70px] bottom-[-20px] sm:bottom-[-30px] lg:bottom-[-50px] z-0 pointer-events-none w-[160px] sm:w-[220px] lg:w-[230px] xl:w-[290px] 2xl:w-[360px] opacity-70 lg:opacity-80 xl:opacity-100">
              <Image
                src="/Recipies/leftBottomleaf.webp"
                alt="Decorative Leaf"
                width={360}
                height={300}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="absolute right-[-45px] top-[58%] z-0 pointer-events-none w-[140px] sm:w-[180px] ">
              <Image
                src="/Recipies/rightCenterleaf.webp"
                alt="Decorative Spices"
                width={200}
                height={200}
                className="w-full h-auto object-contain"
              />
            </div>
            <div className="absolute top-0 left-[20%] z-0 pointer-events-none opacity-50 w-[500px] sm:w-[850px]">
              <Image
                src="/Recipies/doodle.webp"
                alt="Decorative Recipe Doodle"
                width={850}
                height={850}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Top Hero Section: Recipe Image (Docked Left & Top) + Overview & Stats (Right) */}
            <section className="-mx-[2vw] -mt-1 sm:-mt-2 lg:-mt-3 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch relative z-10">
              {/* Left: Recipe Hero Image Card (Docked Flush to Left & Top Edge, Proportional Height) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 xl:col-span-5 relative w-full h-full min-h-[260px] sm:min-h-[300px] lg:min-h-0 rounded-r-3xl rounded-l-none overflow-hidden shadow-xl group flex flex-col justify-end select-none border-y border-r border-slate-300/60"
              >
                <Image
                  src={selectedRecipe.img}
                  alt={selectedRecipe.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Subtle soft localized gradient at bottom for text contrast without clouding the image */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none z-0" />

                <div className="relative z-10 p-4 sm:p-5 lg:pl-7 xl:pl-10 space-y-1.5 font-inter">
                  <span className="bg-[#d62828] text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow-md inline-block">
                    {selectedRecipe.label}
                  </span>
                  <h1 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-bold text-white font-barlow-condensed tracking-wide uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {selectedRecipe.title}
                  </h1>
                </div>
              </motion.div>

              {/* Right: Recipe Details & 3-Column Stats Box */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-4 font-inter py-1 px-4 sm:px-6 lg:px-0 lg:pr-8 xl:pr-12"
              >
                <div className="space-y-6">
                  {/* ABOUT THIS RECIPE */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-extrabold text-[#064823] tracking-wide uppercase font-barlow-condensed">
                        ABOUT THIS RECIPE
                      </h3>
                      <div className="flex items-center gap-3">
                        {/* BACK Button inside Recipe Detail Section */}
                        <button
                          onClick={() => {
                            handleBackToCategory();
                          }}
                          className="bg-[#d62828] hover:bg-[#0a5e30] text-white font-bold text-xs sm:text-sm uppercase tracking-wider py-1.5 px-4 rounded-md transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>←</span>
                          <span>BACK TO RECIPIES</span>
                        </button>

                        <div className="relative w-14 sm:w-32 h-7 sm:h-16 shrink-0">
                          <Image
                            src="/Recipies/leaf.webp"
                            alt="Leaf illustration"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-b border-dashed border-slate-300" />
                    <p className="text-sm sm:text-base lg:text-base xl:text-[17px] font-medium text-slate-700 leading-relaxed font-manrope">
                      {selectedRecipe.about}
                    </p>
                  </div>

                  {/* TIPS */}
                  <div className="space-y-3.5 pt-1">
                    <div className="w-full border-b border-dashed border-slate-300" />
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-6 bg-[#8DC541] rounded-full inline-block shrink-0" />
                      <h4 className="text-lg sm:text-xl lg:text-xl xl:text-2xl font-extrabold text-[#064823] tracking-wider uppercase font-barlow-condensed">
                        COOKING TIPS & TRICKS
                      </h4>
                    </div>
                    <ul className="space-y-3 pt-1">
                      {selectedRecipe.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm sm:text-base lg:text-sm xl:text-base font-medium text-slate-800 leading-relaxed font-manrope">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8DC541] shrink-0 mt-1.5 shadow-2xs" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 3-Column Spec Box: Prep Time, Cook Time, Calories */}
                <div className="bg-white/95 backdrop-blur-md border border-slate-300/80 rounded-2xl p-4 sm:p-5 shadow-sm grid grid-cols-3 divide-x divide-slate-200 items-center text-center font-inter mt-3">
                  {/* Prep Time */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-1">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                      <Image
                        src="/Recipies/prep time.webp"
                        alt="Prep Time"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-center sm:text-left font-inter">
                      <span className="block text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider font-inter">
                        PREP TIME
                      </span>
                      <span className="block text-[11px] sm:text-sm font-semibold text-slate-700 font-inter">
                        {selectedRecipe.prepTime}
                      </span>
                    </div>
                  </div>

                  {/* Cook Time */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-1">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                      <Image
                        src="/Recipies/cookTime.webp"
                        alt="Cook Time"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-center sm:text-left font-inter">
                      <span className="block text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider font-inter">
                        COOK TIME
                      </span>
                      <span className="block text-[11px] sm:text-sm font-semibold text-slate-700 font-inter">
                        {selectedRecipe.cookTime}
                      </span>
                    </div>
                  </div>

                  {/* Calories */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 px-1">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                      <Image
                        src="/Recipies/calories.webp"
                        alt="Calories"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="text-center sm:text-left font-inter">
                      <span className="block text-[10px] sm:text-xs font-bold text-slate-900 uppercase tracking-wider font-inter">
                        CALORIES
                      </span>
                      <span className="block text-[11px] sm:text-sm font-semibold text-slate-700 font-inter">
                        {selectedRecipe.calories}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* Bottom Section: INGREDIENTS & STEPS (Centered Container) */}
            <section className="relative w-full pt-6 select-none font-inter z-10">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-start font-inter px-4 sm:px-6 lg:px-8">
                {/* Left Column: INGREDIENTS with AOS scroll animation (Indented on LG screens to clear left graphic) */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5 }}
                  className="lg:col-span-5 space-y-4 font-inter lg:pl-10 xl:pl-4 2xl:pl-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 shrink-0">
                      <Image
                        src="/Recipies/reicon_food-tray.webp"
                        alt="Ingredients"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#064823] tracking-wider uppercase font-barlow-condensed">
                      INGREDIENTS
                    </h3>
                  </div>

                  <div className="w-full border-b border-dashed border-slate-300" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1 font-inter">
                    <div className="space-y-3 font-inter">
                      {selectedRecipe.ingredientsCol1.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 font-inter"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8DC541] shrink-0 mt-1 shadow-sm" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 font-inter">
                      {selectedRecipe.ingredientsCol2.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-slate-800 font-inter"
                        >
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8DC541] shrink-0 mt-1 shadow-sm" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Right Column: STEPS with AOS scroll animation */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="lg:col-span-7 space-y-4 font-inter pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-slate-300 pt-8 lg:pt-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-8 h-8 shrink-0">
                      <Image
                        src="/Recipies/cookTime.webp"
                        alt="Steps"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#064823] tracking-wider uppercase font-barlow-condensed">
                      COOKING STEPS
                    </h3>
                  </div>

                  <div className="w-full border-b border-dashed border-slate-300" />

                  <div className="space-y-4 pt-1 font-inter">
                    {selectedRecipe.steps.map((stepText, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3.5 text-xs sm:text-sm font-semibold text-slate-800 font-inter leading-relaxed"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#064823] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-md font-inter mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{stepText}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
}
