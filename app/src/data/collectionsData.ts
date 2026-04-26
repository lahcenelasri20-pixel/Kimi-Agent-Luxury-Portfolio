export interface Artwork {
  id: number;
  title: string;
  image: string;
  medium: string;
  dimensions: string;
  year: string;
  price: string;
  available: boolean;
  story: string;
  tags: string[];
}

export interface Collection {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  heroImage: string;
  count: number;
  year: string;
  theme: string;
  artworks: Artwork[];
}

export const collectionsData: Collection[] = [
  {
    id: 'abstract',
    title: 'Abstract',
    tagline: 'The Language of Form',
    description:
      'Bold gestures, layered textures, and the dialogue between color and form. Each canvas begins with intuition — an act of releasing control to discover what the paint wants to say.',
    image: '/art/collection-abstract.jpg',
    heroImage: '/art/collection-abstract.jpg',
    count: 24,
    year: '2021–2024',
    theme: 'Color · Form · Intuition',
    artworks: [
      {
        id: 1,
        title: 'Whispered Memories',
        image: '/art/collection-abstract.jpg',
        medium: 'Oil on canvas',
        dimensions: '72 × 96 in',
        year: '2024',
        price: '$32,000',
        available: true,
        story:
          'This large-scale work emerged from months of observing how light transforms ordinary spaces into moments of extraordinary beauty.',
        tags: ['Large Format', 'Oil', 'Featured'],
      },
      {
        id: 2,
        title: 'Golden Hour',
        image: '/art/gallery-2.jpg',
        medium: 'Oil on canvas',
        dimensions: '48 × 60 in',
        year: '2024',
        price: '$18,500',
        available: true,
        story:
          'Painted over 14 sessions at dawn, this work captures the precise temperature of light just before morning settles.',
        tags: ['Medium Format', 'Oil'],
      },
      {
        id: 3,
        title: 'Silent Reverie',
        image: '/art/gallery-1.jpg',
        medium: 'Oil on linen',
        dimensions: '84 × 72 in',
        year: '2024',
        price: 'Private Collection',
        available: false,
        story: 'An exploration of stillness and the weight of unspoken emotion in contemporary space.',
        tags: ['Large Format', 'Linen', 'Sold'],
      },
      {
        id: 4,
        title: 'Between Shadows',
        image: '/art/gallery-3.jpg',
        medium: 'Mixed media',
        dimensions: '60 × 84 in',
        year: '2023',
        price: '$24,000',
        available: true,
        story: 'Gold leaf and oil create a shimmering tension between presence and absence.',
        tags: ['Mixed Media', 'Gold Leaf'],
      },
      {
        id: 5,
        title: 'Ethereal Distance',
        image: '/art/gallery-5.jpg',
        medium: 'Oil on canvas',
        dimensions: '60 × 80 in',
        year: '2023',
        price: '$21,000',
        available: true,
        story: 'Distance is not absence — it is the space where longing resides.',
        tags: ['Large Format', 'Oil'],
      },
      {
        id: 6,
        title: 'Quiet Presence',
        image: '/art/gallery-6.jpg',
        medium: 'Oil on canvas',
        dimensions: '40 × 52 in',
        year: '2022',
        price: '$15,800',
        available: true,
        story: 'Restraint as a choice. The quieter the palette, the louder the feeling.',
        tags: ['Medium Format', 'Oil'],
      },
    ],
  },
  {
    id: 'nature',
    title: 'Nature',
    tagline: 'Memory and Observation',
    description:
      'Landscapes and organic forms translated through memory and observation. These works resist the picturesque — they seek instead the emotional truth of place.',
    image: '/art/collection-nature.jpg',
    heroImage: '/art/collection-nature.jpg',
    count: 18,
    year: '2020–2024',
    theme: 'Landscape · Memory · Sensation',
    artworks: [
      {
        id: 1,
        title: 'Morning Light',
        image: '/art/gallery-4.jpg',
        medium: 'Oil on linen',
        dimensions: '36 × 48 in',
        year: '2023',
        price: '$12,500',
        available: true,
        story: 'The first light of morning carries a silence that painting can preserve.',
        tags: ['Medium Format', 'Linen'],
      },
      {
        id: 2,
        title: 'Still Waters',
        image: '/art/gallery-1.jpg',
        medium: 'Oil on canvas',
        dimensions: '48 × 64 in',
        year: '2023',
        price: '$17,200',
        available: true,
        story: 'Reflection is not imitation. It is translation.',
        tags: ['Large Format', 'Oil'],
      },
      {
        id: 3,
        title: 'Forest Interior',
        image: '/art/gallery-5.jpg',
        medium: 'Oil on panel',
        dimensions: '24 × 36 in',
        year: '2022',
        price: '$9,500',
        available: true,
        story: 'Deep green and filtered light — an interior world of uncommon peace.',
        tags: ['Small Format', 'Panel'],
      },
      {
        id: 4,
        title: 'Coastal Haze',
        image: '/art/gallery-6.jpg',
        medium: 'Oil on canvas',
        dimensions: '60 × 84 in',
        year: '2024',
        price: 'Private Collection',
        available: false,
        story: 'Where the sea meets memory, the horizon dissolves.',
        tags: ['Large Format', 'Sold'],
      },
      {
        id: 5,
        title: 'October',
        image: '/art/gallery-2.jpg',
        medium: 'Oil on canvas',
        dimensions: '40 × 52 in',
        year: '2023',
        price: '$14,000',
        available: true,
        story: 'A month compressed into pigment and gesture.',
        tags: ['Medium Format', 'Oil'],
      },
    ],
  },
  {
    id: 'portraits',
    title: 'Portraits',
    tagline: 'Quiet Dignity',
    description:
      'The human presence rendered in quiet dignity and emotional depth. These works do not aspire to likeness alone — they reach for the interior life of the subject.',
    image: '/art/collection-portraits.jpg',
    heroImage: '/art/collection-portraits.jpg',
    count: 12,
    year: '2019–2024',
    theme: 'Identity · Presence · Intimacy',
    artworks: [
      {
        id: 1,
        title: 'The Archivist',
        image: '/art/collection-portraits.jpg',
        medium: 'Oil on linen',
        dimensions: '36 × 48 in',
        year: '2024',
        price: '$28,000',
        available: true,
        story: 'A portrait of memory itself — the subject holds the weight of everything remembered.',
        tags: ['Medium Format', 'Featured'],
      },
      {
        id: 2,
        title: 'Interior',
        image: '/art/gallery-3.jpg',
        medium: 'Oil on canvas',
        dimensions: '48 × 60 in',
        year: '2023',
        price: '$22,000',
        available: true,
        story: 'The figure as landscape — interior life mapped across a painted surface.',
        tags: ['Large Format', 'Oil'],
      },
      {
        id: 3,
        title: 'Study in Ochre',
        image: '/art/gallery-4.jpg',
        medium: 'Oil on panel',
        dimensions: '20 × 28 in',
        year: '2022',
        price: '$11,500',
        available: true,
        story: 'A single afternoon distilled into warm light and soft shadow.',
        tags: ['Small Format', 'Panel'],
      },
    ],
  },
  {
    id: 'limited-editions',
    title: 'Limited Editions',
    tagline: 'Exclusive Encounters',
    description:
      'Exclusive mixed-media pieces with gold leaf and unique materials. Each work in this series is singular — a one-of-a-kind object that resists reproduction by its very nature.',
    image: '/art/collection-limited.jpg',
    heroImage: '/art/collection-limited.jpg',
    count: 8,
    year: '2023–2024',
    theme: 'Gold Leaf · Mixed Media · Singular',
    artworks: [
      {
        id: 1,
        title: 'Aureate Dream',
        image: '/art/collection-limited.jpg',
        medium: 'Oil, gold leaf on panel',
        dimensions: '30 × 40 in',
        year: '2024',
        price: '$48,000',
        available: true,
        story: 'Twenty-four karat gold leaf applied over sixty layers of translucent oil glaze.',
        tags: ['Gold Leaf', 'Panel', 'Featured'],
      },
      {
        id: 2,
        title: 'Threshold',
        image: '/art/gallery-6.jpg',
        medium: 'Oil, silver leaf, encaustic',
        dimensions: '24 × 36 in',
        year: '2024',
        price: '$38,500',
        available: true,
        story: 'Encaustic wax and silver leaf create a surface that breathes with temperature.',
        tags: ['Mixed Media', 'Silver Leaf'],
      },
      {
        id: 3,
        title: 'Gilded Silence',
        image: '/art/gallery-1.jpg',
        medium: 'Oil, gold leaf on linen',
        dimensions: '48 × 60 in',
        year: '2023',
        price: 'Private Collection',
        available: false,
        story: 'Silence made visible through gold and restraint.',
        tags: ['Gold Leaf', 'Linen', 'Sold'],
      },
    ],
  },
];

export function getCollectionById(id: string): Collection | undefined {
  return collectionsData.find((c) => c.id === id);
}
