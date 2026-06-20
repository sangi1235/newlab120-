export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Bridal' | 'Groom' | 'Guests' | 'Accessories';
  silhouette: string;
  color: string;
  theme: string;
  size: string[];
  image: string;
  description: string;
  rating: number;
  reviewsCount: number;
  svgOverlay?: string; // Inline SVG path for try-on clothing
}

export const products: Product[] = [
  {
    id: 'enchanted-garden-gown',
    name: "Enchanted Garden Gown",
    price: 1200,
    category: 'Bridal',
    silhouette: 'A-Line',
    color: 'Ivory',
    theme: 'Romantic',
    size: ['4', '6', '8', '10', '12'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ynyuOQKZz86yg3wwuy6PRyiXJp1PitM3Fqw2MaSKtH7cuThjJ7rALfXNkVVQfJJ-hzMWq8GUIKqypWNGzOFZZDgfm0TWds1UAZ-MxOOj0vap9TCFdbzzs-1t67xF89l6L8G3_HoRhHn9TdCSb_7LJYMyTs1NpfDZ4hVOoNakEwluc7qVoqStyfAyh1BSG33V7rqIxkoCswTgNNOnYoPfqVrFve9yCFB8nJJGZUf5q0gpRZWyUBIORDCUJ0AzCtSZcoeLVEePQ_t0',
    description: 'A romantic A-line gown crafted with exquisite floral lace overlays, a plunging neckline, and a flowing tulle train that sweeps behind you gracefully.',
    rating: 4.9,
    reviewsCount: 128,
    // Transparent apparel silhouette SVG path for overlay
    svgOverlay: 'M 100,50 L 150,50 L 175,100 L 160,110 L 150,90 L 165,220 L 210,350 L 90,350 L 135,220 L 150,90 L 140,110 L 125,100 Z'
  },
  {
    id: 'regal-fusion-lehenga',
    name: "Regal Fusion Lehenga",
    price: 1500,
    category: 'Bridal',
    silhouette: 'Ballgown',
    color: 'Crimson',
    theme: 'Traditional',
    size: ['S', 'M', 'L', 'XL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp1PJ9kvCxb-rxo-02BJ2Nf-N8OqpdWeAHEowiTlamcMr0BMKuK3HCE5MmblHrCSjQBCOOIrIdi9J8-v_d0Y3dW8gGBs3TBQ0v7I7EpxhNlQ1B1WdWbCbfPhO6blIdRzkWLBjPx6ONOt4D1EauHF42SSk8P6OYfJl9I3Q2usiZtVYTnDrhlJA4JZSneQVilgIIYcFRCpFtwF4F-sWVII_sELDW5415f7nHnFa0FCtOx1WwUNbsWjnqeOMrqFE_1543mFQpOBTCvGUn',
    description: 'Capturing South Asian majesty, this crimson and gold lehenga features intricate zardozi embroidery, a velvet choli, and an ethereal sheer dupatta.',
    rating: 5.0,
    reviewsCount: 94,
    svgOverlay: 'M 110,60 L 140,60 L 155,100 L 135,100 L 125,85 L 115,85 L 105,100 L 85,100 Z M 105,120 L 145,120 L 165,180 L 175,260 L 195,360 L 55,360 L 75,260 L 85,180 Z'
  },
  {
    id: 'timeless-elegance-suit',
    name: "Timeless Elegance Suit",
    price: 800,
    category: 'Groom',
    silhouette: 'Slim-Fit',
    color: 'Charcoal',
    theme: 'Modern',
    size: ['38R', '40R', '42R', '44R'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrz-C4Ml1LzgxkmNncBfmxxTCRO0ZKrHHbKS9t8e6FGd0owIdosUvoJAdSwvpygeymfvF32Mb4WHGKTstBz0jEAdO0AxHPfxohS6J58mgjjjfui5Y_t4bVquY14RVU9hzv-2PN7f_L3AMdMG9mCm44vfa1nPkV0hGJCqZONz5rz1BnUOZuZY51ldEVAHdMBhukslnqvn7zHrtcm7LOy9D1hWBR-_wUsK1HNtn1I0xqPZKE_jKWdN4Ul9PPwaT19EolzUZA8DQsg8QD',
    description: 'A classic slim-fit suit in deep charcoal grey. Tailored with Italian merino wool, a notch lapel, and elegant satin linings.',
    rating: 4.8,
    reviewsCount: 152,
    svgOverlay: 'M 95,50 L 155,50 L 170,110 L 150,115 L 145,95 L 150,220 L 160,360 L 135,360 L 125,230 L 115,230 L 105,360 L 80,360 L 90,220 L 95,95 L 90,115 L 70,110 Z'
  },
  {
    id: 'boho-chic-dress',
    name: "Boho Chic Dress",
    price: 950,
    category: 'Guests',
    silhouette: 'Empire',
    color: 'Blush',
    theme: 'Bohemian',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_qHvmuKwSs2rrz_tcj6XtSQtXIfGAVDBUcmcXlMu_Znz5xtRBUavzdbURW0odoh__byNkDYsgFCibJToPi-vd_5wXpsqx3qs8dI-1Lu8csHPkIUpV4IXC8maHWO0-RorrQu6cAAuhzvVC_D-ivyY7Zmi6CUqDGKyGVa2dOysgyn81RfXetti16MNQSOBDLvK7wdNDsbIkFYC-CLLI97grXXmcQLGp54uIQeZyrc1wmBC7qocwlI6SuYow5_AZyt-Dy1DyW7AEt8h0',
    description: 'Perfect for outdoor and garden weddings. A breathable empire-waist dress in romantic blush chiffon, featuring layered ruffles and bell sleeves.',
    rating: 4.7,
    reviewsCount: 86,
    svgOverlay: 'M 105,55 L 145,55 L 170,95 L 150,105 L 135,80 L 145,210 L 165,340 L 85,340 L 105,210 L 115,80 L 100,105 L 80,95 Z'
  },
  {
    id: 'modern-minimalist-jumpsuit',
    name: "Modern Minimalist Jumpsuit",
    price: 750,
    category: 'Bridal',
    silhouette: 'Tailored',
    color: 'Cream',
    theme: 'Modern',
    size: ['0', '2', '4', '6', '8', '10'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgjBbqvYNOVw-MWsgKj2-YMIGsjc-z5XJlitcvjlAmpmt12F7pDEmrd7pZmEjNZKow_MEjo3LAdW5Ihlnqcre1-Q7DLvL7_XucNEJfAKxcIj8HL7t1WUWvb5f5BlqjzIguOc3OyGGX5aaiDdAPVFyxzKD93kWe8wxdxxtroxJARSqpcD2urSe0AfhmNn42Knvp7Eeas9yuMPk-NnplUl0AFH2MOpZ-s1AlJLgsfh08RqToh18RFdTBay8SA-9SKycspkAO5HtDbdPd',
    description: 'A contemporary alternative for the modern bride. Features a draped cowl neck, a tailored bodice, wide-leg trousers, and a sleek satin sash.',
    rating: 4.8,
    reviewsCount: 61,
    svgOverlay: 'M 100,60 L 150,60 L 160,110 L 145,115 L 138,90 L 142,210 L 152,350 L 130,350 L 125,220 L 115,220 L 110,350 L 88,350 L 98,210 L 102,90 L 95,115 L 80,110 Z'
  },
  {
    id: 'south-asian-fusion-sari',
    name: "South Asian Fusion Sari",
    price: 1100,
    category: 'Guests',
    silhouette: 'Drape',
    color: 'Emerald',
    theme: 'Fusion',
    size: ['One Size'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOeVThCmimeWHcnk4dEpu6N1_p5KsEgA1apecCdNQWCRB8oqDeCKJABmq2GmKq3RYNInwvWg71UPl4MBiXs5lWj6tiJp3_IqevbS_nDNMflmPVOsAIfceFNkJXdz8XKOs0C1K086_baes6g2TGaZ4poze7yEwbfxfnCh2Q9aA75h4NAcYx8ePbf0Lttl-rWykoxiTWyr5THVeEWpuVVoj7yh75nShboWqcPObs5s8H8QEj9oaR8WxYs99IfTO63o_DpNEyDgjA98i',
    description: 'A striking emerald green pre-draped sari with a contemporary metallic waist belt, offering high elegance with modern, effort-free wear.',
    rating: 4.9,
    reviewsCount: 78,
    svgOverlay: 'M 100,55 L 145,55 L 160,95 L 138,95 L 132,80 L 128,190 L 160,350 L 90,350 L 110,190 L 115,80 L 108,95 L 90,95 Z'
  }
];
