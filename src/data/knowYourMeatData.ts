// Static data for Know Your Meat page to reduce AST size and speed up compilation

export interface ChickenPartData {
  name: string;
  rotation: number;
  offsetY?: number;
  productImg: string;
  img: string;
  pouchImg: string;
  platterImg: string;
  plateStyle: {
    mobile: { width: string; height: string; marginTop: string };
    tablet: { width: string; height: string; marginTop: string };
    desktop: { width: string; height: string; marginTop: string };
  };
  desc: string;
  weight: string;
  nutrition: {
    protein: string;
    calories: string;
    fat: string;
    carbs: string;
  };
}

  export const CHICKEN_PARTS: ChickenPartData[] = [
  {
    name: "Breast",
    rotation: 108,
    offsetY: -150,
    productImg: "/Product/Chicken/ChickenParts/brest.webp",
    img: "/Product/Chicken/raw-meat/brest.webp",
    pouchImg: "/Product/Chicken/packed-meat/breast.webp",
    platterImg: "/Product/Chicken/Platters/breast.webp",
    plateStyle: {
      mobile: { width: "72%", height: "82%", marginTop: "-12%" },
      tablet: { width: "48%", height: "64%", marginTop: "-10%" },
      desktop: { width: "84%", height: "94%", marginTop: "-14%" },
    },
    desc: "Lean and protein-rich boneless chicken breast fillets. Extremely versatile and perfect for healthy salads, grilling, and baking.",
    weight: "500g",
    nutrition: {
      protein: "23.0 g",
      calories: "165 kcal",
      fat: "3.6 g",
      carbs: "0 g",
    },
  },

  {
    name: "Thigh",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/thig.webp",
    img: "/Product/Chicken/raw-meat/thigh.webp",
    pouchImg: "/Product/Chicken/packed-meat/thigh.webp",
    platterImg: "/Product/Chicken/Platters/thigh.webp",
    plateStyle: {
      mobile: { width: "70%", height: "80%", marginTop: "-12%" },
      tablet: { width: "46%", height: "64%", marginTop: "-10%" },
      desktop: { width: "54%", height: "84%", marginTop: "-12%" },
    },
    desc: "Flavorful and tender chicken thighs, bone-in and skin-on. Holds moisture perfectly for slow cooking and roasts.",
    weight: "500g",
    nutrition: {
      protein: "18.0 g",
      calories: "209 kcal",
      fat: "15.0 g",
      carbs: "0 g",
    },
  },

  {
    name: "Drumstick",
    rotation: -84,
    productImg: "/Product/Chicken/ChickenParts/drumstick.webp",
    img: "/Product/Chicken/raw-meat/drumstick.webp",
    pouchImg: "/Product/Chicken/packed-meat/drumstick.webp",
    platterImg: "/Product/Chicken/Platters/drumstick.webp",
    plateStyle: {
      mobile: { width: "68%", height: "78%", marginTop: "-12%" },
      tablet: { width: "44%", height: "62%", marginTop: "-10%" },
      desktop: { width: "70%", height: "82%", marginTop: "-14%" },
    },
    desc: "Tender and juicy drumsticks, perfectly cut and hygienically packed to retain natural freshness and rich taste in every bite.",
    weight: "500g",
    nutrition: {
      protein: "20.4 g",
      calories: "160 kcal",
      fat: "7.0 g",
      carbs: "0 g",
    },
  },

  {
    name: "Wing",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/wing.webp",
    img: "/Product/Chicken/raw-meat/wing.webp",
    pouchImg: "/Product/Chicken/packed-meat/wings.webp",
    platterImg: "/Product/Chicken/Platters/wings.webp",
    plateStyle: {
      mobile: { width: "68%", height: "76%", marginTop: "-12%" },
      tablet: { width: "45%", height: "60%", marginTop: "-10%" },
      desktop: { width: "80%", height: "62%", marginTop: "-12%" },
    },
    desc: "Crispy and delicious chicken wings, perfect for deep frying, barbecue, or baking with your favorite glaze.",
    weight: "500g",
    nutrition: {
      protein: "18.5 g",
      calories: "203 kcal",
      fat: "14.0 g",
      carbs: "0 g",
    },
  },

  {
    name: "Gizzard",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/gizzard.webp",
    img: "/Product/Chicken/raw-meat/gizzard.webp",
    pouchImg: "/Product/Chicken/packed-meat/gizzard.webp",
    platterImg: "/Product/Chicken/Platters/gizzard.webp",
    plateStyle: {
      mobile: { width: "64%", height: "74%", marginTop: "-12%" },
      tablet: { width: "42%", height: "58%", marginTop: "-10%" },
      desktop: { width: "55%", height: "80%", marginTop: "-14%" },
    },
    desc: "Tough and highly flavorful chicken gizzards. Firm texture that becomes beautifully tender when braised or slow-cooked.",
    weight: "500g",
    nutrition: {
      protein: "18.0 g",
      calories: "94 kcal",
      fat: "2.0 g",
      carbs: "0 g",
    },
  },

  {
    name: "Liver",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/liver.webp",
    img: "/Product/Chicken/raw-meat/liver.webp",
    pouchImg: "/Product/Chicken/packed-meat/liver.webp",
    platterImg: "/Product/Chicken/Platters/liver.webp",
    plateStyle: {
      mobile: { width: "64%", height: "74%", marginTop: "-12%" },
      tablet: { width: "42%", height: "58%", marginTop: "-10%" },
      desktop: { width: "65%", height: "80%", marginTop: "-12%" },
    },
    desc: "Fresh and nutrient-dense chicken liver, rich in iron, vitamin A, and essential vitamins. Soft texture and rich taste.",
    weight: "500g",
    nutrition: {
      protein: "17.2 g",
      calories: "119 kcal",
      fat: "4.8 g",
      carbs: "0 g",
    },
  },

  {
    name: "Heart",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/heart.webp",
    img: "/Product/Chicken/raw-meat/heart.webp",
    pouchImg: "/Product/Chicken/packed-meat/heart.webp",
    platterImg: "/Product/Chicken/Platters/heart.webp",
    plateStyle: {
      mobile: { width: "62%", height: "72%", marginTop: "-10%" },
      tablet: { width: "40%", height: "56%", marginTop: "-8%" },
      desktop: { width: "42%", height: "100%", marginTop: "-12%" },
    },
    desc: "Clean and trimmed chicken hearts. High in protein and iron with a firm, chewy texture, excellent for skewers and stir-fries.",
    weight: "500g",
    nutrition: {
      protein: "16.0 g",
      calories: "150 kcal",
      fat: "9.0 g",
      carbs: "0 g",
    },
  },

  // Not present in the provided pricing list
  {
    name: "Drumette",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/drumette.webp",
    img: "/Product/Chicken/raw-meat/drumette.webp",
    pouchImg: "/Product/Chicken/packed-meat/drumette.webp",
    platterImg: "/Product/Chicken/Platters/drumette.webp",
    plateStyle: {
      mobile: { width: "66%", height: "76%", marginTop: "-12%" },
      tablet: { width: "44%", height: "60%", marginTop: "-10%" },
      desktop: { width: "60%", height: "90%", marginTop: "-14%" },
    },
    desc: "Juicy and meaty drumettes, the perfect party starter. Great for spicy buffalo wings or crispy batter fry.",
    weight: "500g",
    nutrition: {
      protein: "19.0 g",
      calories: "170 kcal",
      fat: "9.5 g",
      carbs: "0 g",
    },
  },

  {
    name: "Neck",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/neck.webp",
    img: "/Product/Chicken/raw-meat/neck.webp",
    pouchImg: "/Product/Chicken/packed-meat/neck.webp",
    platterImg: "/Product/Chicken/Platters/neck.webp",
    plateStyle: {
      mobile: { width: "66%", height: "76%", marginTop: "-12%" },
      tablet: { width: "44%", height: "60%", marginTop: "-10%" },
      desktop: { width: "48%", height: "82%", marginTop: "-12%" },
    },
    desc: "Rich bone-in chicken necks, perfect for preparing highly nutritious stocks, soups, and slow-cooked gravies.",
    weight: "500g",
    nutrition: {
      protein: "16.0 g",
      calories: "180 kcal",
      fat: "12.0 g",
      carbs: "0 g",
    },
  },

  {
    name: "Back",
    rotation: 0,
    productImg: "/Product/Chicken/ChickenParts/bact.webp",
    img: "/Product/Chicken/raw-meat/back.webp",
    pouchImg: "/Product/Chicken/packed-meat/back.webp",
    platterImg: "/Product/Chicken/Platters/back.webp",
    plateStyle: {
      mobile: { width: "70%", height: "80%", marginTop: "-12%" },
      tablet: { width: "46%", height: "62%", marginTop: "-10%" },
      desktop: { width: "45%", height: "82%", marginTop: "-15%" },
    },
    desc: "Clean-cut chicken backs, rich in marrow and collagen. The ultimate choice for deep, flavorful bone broths and stocks.",
    weight: "500g",
    nutrition: {
      protein: "15.0 g",
      calories: "220 kcal",
      fat: "17.0 g",
      carbs: "0 g",
    },
  },
];

export interface RecipeEntry {
  title: string;
  label: string;
  desc: string;
  img: string;
  time: string;
  servings: string;
  diff: string;
}

export const PART_RECIPES_MAP: Record<string, RecipeEntry[]> = {
  wing: [
    {
      title: "Spicy Chicken Wing Fry",
      label: "BEST FOR FRY",
      desc: "Crispy and spicy chicken wings tossed in fiery chili glaze.",
      img: "/Recipies/wing/spicy-chicken-wnig-fry.webp",
      time: "25 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
    {
      title: "Honey Glazed BBQ Wings",
      label: "BEST FOR BBQ",
      desc: "Sweet and smoky glazed chicken wings cooked to sticky perfection.",
      img: "/Recipies/wing/Honey-Glazed-BBQ Wings.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Garlic Parmesan Wings",
      label: "BEST FOR SNACK",
      desc: "Tender wings coated in rich garlic butter and parmesan cheese.",
      img: "/Recipies/wing/Garlic-Parmesan-Wings.webp",
      time: "30 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Buffalo Wing Platter",
      label: "BEST FOR STARTER",
      desc: "Classic American style buffalo wings served with creamy ranch dip.",
      img: "/Recipies/wing/Buffalo-Wing-Platter.webp",
      time: "20 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
  ],
  heart: [
    {
      title: "Spicy Heart Skewers",
      label: "BEST FOR GRILL",
      desc: "Tender grilled chicken hearts seasoned with black pepper & herbs.",
      img: "/Recipies/heart/Spicy-Heart-skewers.webp",
      time: "20 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
    {
      title: "Chicken Heart Pepper Fry",
      label: "BEST FOR FRY",
      desc: "Sautéed chicken hearts with crushed black pepper & curry leaves.",
      img: "/Recipies/heart/Chicken-Heart- Pepper-Fry.webp",
      time: "25 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "South Indian Heart Curry",
      label: "BEST FOR CURRY",
      desc: "Rich and aromatic chicken heart curry in coconut gravy.",
      img: "/Recipies/heart/South-Indian-Heart-Curry.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
    {
      title: "Garlic Butter Heart Stir-Fry",
      label: "BEST FOR STIR-FRY",
      desc: "Cleaned chicken hearts tossed with garlic, butter & veggies.",
      img: "/Recipies/heart/Garlic-Butter-Heart-Stir-Fry.webp",
      time: "15 mins",
      servings: "2 Servings",
      diff: "Easy",
    },
  ],
  drumette: [
    {
      title: "Crispy Fried Drumettes",
      label: "BEST FOR FRY",
      desc: "Golden deep-fried drumettes with crunchy seasoned batter.",
      img: "/Recipies/drumette/Crispy-Fried-Drumettes.webp",
      time: "25 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Tangy BBQ Drumette Roast",
      label: "BEST FOR BBQ",
      desc: "Marinated drumettes slow-roasted in rich tangy barbecue sauce.",
      img: "/Recipies/drumette/Tangy-BBQ-Drumette-Roast.webp",
      time: "40 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Spicy Lollipop Drumettes",
      label: "BEST FOR STARTER",
      desc: "Lollipop style drumettes served with spicy schezwan dip.",
      img: "/Recipies/drumette/Spicy-Lollipop-Drumettes.webp",
      time: "30 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
    {
      title: "Herb Roasted Drumette Platter",
      label: "BEST FOR ROAST",
      desc: "Oven-baked drumettes with rosemary, thyme, and olive oil.",
      img: "/Recipies/drumette/Hearb-Roasted-Drumette-Platter.webp",
      time: "35 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
  ],
  thigh: [
    {
      title: "Creamy Chicken Thigh Curry",
      label: "BEST FOR CURRY",
      desc: "Tender bone-in chicken thighs cooked in rich onion gravy.",
      img: "/Recipies/thigh/Cremy-Chicken-Thigh-Curry.webp",
      time: "40 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Smoky Grilled Chicken Thigh",
      label: "BEST FOR GRILL",
      desc: "Char-broiled chicken thighs marinated in rustic Indian spices.",
      img: "/Recipies/thigh/Smoky-Grilled-Chicken-Thigh.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Crispy Fried Thigh Steaks",
      label: "BEST FOR FRY",
      desc: "Juicy thigh cuts battered and fried to crispy perfection.",
      img: "/Recipies/thigh/Crispy-Fried-Thigh-Steaks.webp",
      time: "30 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
    {
      title: "Slow Cooked Thigh Roast",
      label: "BEST FOR ROAST",
      desc: "Succulent chicken thighs slow-cooked with aromatic spices.",
      img: "/Recipies/thigh/Slow-Cooked-Thigh-Roast.webp",
      time: "50 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
  ],
  neck: [
    {
      title: "Nutritious Neck Soup",
      label: "BEST FOR SOUP",
      desc: "Nourishing and collagen-rich chicken neck bone soup with herbs.",
      img: "/Recipies/neck/Nutritious-Neck-Soup.webp",
      time: "45 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Spicy Neck Pepper Masala",
      label: "BEST FOR GRAVY",
      desc: "Flavorful chicken necks sautéed with spicy black pepper gravy.",
      img: "/Recipies/neck/Spicy-Neck-Pepper-Masala.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
    {
      title: "Traditional Bone Broth Stock",
      label: "BEST FOR BROTH",
      desc: "Slow-simmered chicken neck stock packed with wholesome nutrients.",
      img: "/Recipies/neck/Traditional-Bone-Broth-Stock.webp",
      time: "60 mins",
      servings: "6 Servings",
      diff: "Easy",
    },
    {
      title: "South Indian Neck Fry",
      label: "BEST FOR FRY",
      desc: "Spicy and crisp fried chicken necks seasoned with curry leaves.",
      img: "/Recipies/neck/South-Indian-Neck-Fry.webp",
      time: "30 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
  ],
  breast: [
    {
      title: "Grilled Lemon Herb Breast",
      label: "BEST FOR HEALTHY",
      desc: "Lean boneless breast fillets grilled with fresh lemon & olive oil.",
      img: "/Recipies/breast/Grilled-Lemon-Herb-Breast.webp",
      time: "20 mins",
      servings: "2 Servings",
      diff: "Easy",
    },
    {
      title: "Creamy Butter Breast Curry",
      label: "BEST FOR CURRY",
      desc: "Boneless chicken breast in rich velvety tomato butter gravy.",
      img: "/Recipies/breast/Creamy-Butter-Breat-Curry.webp",
      time: "30 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Crispy Breast Nuggets",
      label: "BEST FOR SNACK",
      desc: "Bite-sized chicken breast nuggets served with garlic aioli dip.",
      img: "/Recipies/breast/Crisppy-Breast-Nuggets.webp",
      time: "25 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Healthy Chicken Breast Salad",
      label: "BEST FOR FITNESS",
      desc: "Sliced grilled breast on garden greens with light dressing.",
      img: "/Recipies/breast/Healthy-Chicken-Breast-Salad.webp",
      time: "15 mins",
      servings: "2 Servings",
      diff: "Easy",
    },
  ],
  back: [
    {
      title: "Rich Back Bone Broth",
      label: "BEST FOR BROTH",
      desc: "Collagen-dense chicken back bone broth simmered for deep flavor.",
      img: "/Recipies/back/Rich-Back-Bone-Broth.webp",
      time: "90 mins",
      servings: "6 Servings",
      diff: "Easy",
    },
    {
      title: "Spicy Back Piece Curry",
      label: "BEST FOR CURRY",
      desc: "Traditional country-style chicken back curry with coconut milk.",
      img: "/Recipies/back/Spicy-Back-Piece-Curry.webp",
      time: "40 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
    {
      title: "Chicken Back Soup Base",
      label: "BEST FOR SOUP",
      desc: "Flavor-packed chicken stock base for rich winter soups.",
      img: "/Recipies/back/Chicken-Back-Soup-Base.webp",
      time: "45 mins",
      servings: "5 Servings",
      diff: "Easy",
    },
    {
      title: "Masala Roasted Back Cuts",
      label: "BEST FOR ROAST",
      desc: "Spicy oven-roasted chicken back cuts with caramelized onions.",
      img: "/Recipies/back/Masala-Roasted-Back-Cuts.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
  ],
  liver: [
    {
      title: "Chicken Liver Pepper Fry",
      label: "BEST FOR FRY",
      desc: "Tender chicken liver sautéed with caramelized onions and pepper.",
      img: "/Recipies/liver/Chicken-Liver-Pepper-Fry.webp",
      time: "20 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
    {
      title: "Rich Chicken Liver Masala",
      label: "BEST FOR CURRY",
      desc: "Thick spicy liver curry cooked with traditional aromatic spices.",
      img: "/Recipies/liver/Rich-Chicken-Liver.webp",
      time: "25 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Garlic Butter Liver Skewers",
      label: "BEST FOR GRILL",
      desc: "Marinated liver cubes grilled on skewers with herb butter.",
      img: "/Recipies/liver/Garlic-Butter-Liver.webp",
      time: "15 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
    {
      title: "Creamy Liver Pate Spread",
      label: "BEST FOR SPREAD",
      desc: "Smooth and rich chicken liver pate infused with thyme and butter.",
      img: "/Recipies/liver/Cremy-Liver-Pate-Spread.webp",
      time: "30 mins",
      servings: "6 Servings",
      diff: "Medium",
    },
  ],
  drumstick: [
    {
      title: "Spicy Tandoori Drumsticks",
      label: "BEST FOR TANDOORI",
      desc: "Classic tandoori drumsticks charred over open flame.",
      img: "/Recipies/drumstick/Sicy-Thandoori-Drumsticks.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Crispy Fried Drumstick Box",
      label: "BEST FOR FRY",
      desc: "Golden crunchy drumsticks seasoned with Southern spices.",
      img: "/Recipies/drumstick/Crispy-Fried-Drumstick-Box.webp",
      time: "30 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Chettinad Drumstick Curry",
      label: "BEST FOR CURRY",
      desc: "Fiery South Indian drumstick curry with freshly ground spices.",
      img: "/Recipies/drumstick/Chettinad-Drumstick-Curry.webp",
      time: "40 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
    {
      title: "Garlic Butter Glazed Leg",
      label: "BEST FOR ROAST",
      desc: "Oven-roasted drumsticks brushed with rich garlic herb butter.",
      img: "/Recipies/drumstick/Garlic-Butter-Glazed-Leg.webp",
      time: "35 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
  ],
  gizzard: [
    {
      title: "Crunchy Gizzard Pepper Fry",
      label: "BEST FOR FRY",
      desc: "Chewy and crispy fried gizzards with green chillies & pepper.",
      img: "/Recipies/gizzard/Crunchy-Grizzard-Pepper-Fry.webp",
      time: "30 mins",
      servings: "4 Servings",
      diff: "Easy",
    },
    {
      title: "Spicy Braised Gizzard Gravy",
      label: "BEST FOR GRAVY",
      desc: "Slow-braised gizzards in rich caramelized onion gravy.",
      img: "/Recipies/gizzard/Spicy-Braised-Gizzard-Gravy.webp",
      time: "45 mins",
      servings: "4 Servings",
      diff: "Medium",
    },
    {
      title: "Grilled Gizzard Skewers",
      label: "BEST FOR GRILL",
      desc: "Marinated chicken gizzards grilled to savory perfection.",
      img: "/Recipies/gizzard/Grilled-Gizzard-Skewers.webp",
      time: "25 mins",
      servings: "3 Servings",
      diff: "Easy",
    },
    {
      title: "Pickled Gizzard Delicacy",
      label: "BEST FOR SNACK",
      desc: "Tangy and spicy pickled gizzards infused with mustard oil.",
      img: "/Recipies/gizzard/Pickled-Gizzard-Delicacy.webp",
      time: "40 mins",
      servings: "6 Servings",
      diff: "Medium",
    },
  ],
};

export const BASE_PARTS = {
  left: [
    {
      name: "WING",
      desc: "Great for frying,\ngrilling & BBQ",
      img: "/Product/Chicken/ChickenParts/wing.webp",
      id: "wing",
    },
    {
      name: "DRUMETTE",
      desc: "Juicy & tender.\nPerfect for snacks",
      img: "/Product/Chicken/ChickenParts/drumette.webp",
      id: "drumette",
    },
    {
      name: "THIGH",
      desc: "Tender & flavourful.\nIdeal for curries & roasts",
      img: "/Product/Chicken/ChickenParts/thig.webp",
      id: "thigh",
    },
  ],
  right: [
    {
      name: "NECK",
      desc: "Great for stocks\n& Soups",
      img: "/Product/Chicken/ChickenParts/neck.webp",
      id: "neck",
    },
    {
      name: "BREAST",
      desc: "Lean & protein rich. Best\nfor grilling & healthy meals",
      img: "/Product/Chicken/ChickenParts/brest.webp",
      id: "brest",
    },
    {
      name: "DRUMSTICK",
      desc: "Juicy & meaty.\nPerfect for curries & grilling",
      img: "/Product/Chicken/ChickenParts/drumstick.webp",
      id: "drumstick",
    },
  ],
  bottom: [] as { name: string; desc: string; img: string; id: string }[],
};

export const CALLOUTS = {
  skin: BASE_PARTS,
  skinless: BASE_PARTS,
  inside: {
    left: [
      BASE_PARTS.left[0], // WING
      {
        name: "HEART",
        desc: "High protein &\nrich in iron.",
        img: "/Product/Chicken/ChickenParts/heart.webp",
        id: "heart",
      },
      BASE_PARTS.left[1], // DRUMETTE
      BASE_PARTS.left[2], // THIGH
    ],
    right: [
      BASE_PARTS.right[0], // NECK
      BASE_PARTS.right[1], // BREST
      {
        name: "BACK",
        desc: "Great for stocks,\nsoups & broths",
        img: "/Product/Chicken/ChickenParts/bact.webp",
        id: "back",
      },
      {
        name: "LIVER",
        desc: "Rich in Iron\n& Vitamins",
        img: "/Product/Chicken/ChickenParts/liver.webp",
        id: "liver",
      },
      BASE_PARTS.right[2], // DRUMSTICK
    ],
    bottom: [
      {
        name: "GIZZARD",
        desc: "Tough &\nFlavourful",
        img: "/Product/Chicken/ChickenParts/gizzard.webp",
        id: "gizzard",
      },
    ],
  },
};

export const CATEGORIES = [
  {
    name: "CHICKEN",
    href: "/know-your-meat",
    icon: "/Product/Chicken/Banner/image 298.webp",
  },
  {
    name: "BUFFALO",
    href: "/know-your-meat",
    icon: "/Product/Chicken/Banner/image 298 (1).webp",
  },
  {
    name: "MUTTON",
    href: "/know-your-meat",
    icon: "/Product/Chicken/Banner/image 298 (2).webp",
  },
  {
    name: "DUCK",
    href: "/know-your-meat",
    icon: "/Product/Chicken/Banner/image 298 (3).webp",
  },
  {
    name: "QUAIL",
    href: "/know-your-meat",
    icon: "/Product/Chicken/Banner/image 298 (4).webp",
  },
  {
    name: "BURGER PATTY",
    href: "/know-your-meat",
    icon: "/Product/Chicken/Banner/burger-patty.webp",
  },
];

export const PART_GLB_MAP: Record<string, string> = {
  Wing: "/Product/details/glb/wing.glb",
  wing: "/Product/details/glb/wing.glb",
  Wings: "/Product/details/glb/wing.glb",
  wings: "/Product/details/glb/wing.glb",
  Heart: "/Product/details/glb/heart.glb",
  heart: "/Product/details/glb/heart.glb",
  Drumette: "/Product/details/glb/drumette.glb",
  drumette: "/Product/details/glb/drumette.glb",
  Thigh: "/Product/details/glb/thighs.glb",
  thigh: "/Product/details/glb/thighs.glb",
  Thighs: "/Product/details/glb/thighs.glb",
  thighs: "/Product/details/glb/thighs.glb",
  Neck: "/Product/details/glb/neck.glb",
  neck: "/Product/details/glb/neck.glb",
  Breast: "/Product/details/glb/breast.glb",
  breast: "/Product/details/glb/breast.glb",
  Back: "/Product/details/glb/chest.glb",
  back: "/Product/details/glb/chest.glb",
  Chest: "/Product/details/glb/chest.glb",
  chest: "/Product/details/glb/chest.glb",
  Liver: "/Product/details/glb/liver.glb",
  liver: "/Product/details/glb/liver.glb",
  Drumstick: "/Product/details/glb/drumstick.glb",
  drumstick: "/Product/details/glb/drumstick.glb",
  Drumsticks: "/Product/details/glb/drumstick.glb",
  drumsticks: "/Product/details/glb/drumstick.glb",
  Gizzard: "/Product/details/glb/gizzard.glb",
  gizzard: "/Product/details/glb/gizzard.glb",
  Feet: "/Product/details/glb/feet.glb",
  feet: "/Product/details/glb/feet.glb",
  Head: "/Product/details/glb/head.glb",
  head: "/Product/details/glb/head.glb",
  Tenderloin: "/Product/details/glb/tenderloins.glb",
  tenderloin: "/Product/details/glb/tenderloins.glb",
  Tenderloins: "/Product/details/glb/tenderloins.glb",
  tenderloins: "/Product/details/glb/tenderloins.glb",
};
