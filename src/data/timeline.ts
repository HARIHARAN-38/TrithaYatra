export type TimelineChapter = {
  id: string
  number: string
  tradition: string
  date: string
  title: string
  subtitle: string
  place: string
  material: string
  image: string
  accent: string
  video: {
    file: string
    title: string
    maker: string
    license: string
    sourceUrl: string
    footageLabel?: string
    hasAudio?: boolean
  }
  imagePosition?: string
  description: string
  context: string
  significance: string
  detail: string
  sourceLabel: string
  sourceUrl: string
  motifs?: { label: string; meaning: string }[]
  newspaper: {
    headline: string
    insideHeadline: string
    glanceHeading: string
    glance: string
    historyHeading: string
    history: string
    meaningHeading: string
    meaning: string
    closeHeading: string
    close: string
    detailPosition: string
  }
}

export const chapters: TimelineChapter[] = [
  {
    id: 'indus', number: '01', tradition: 'INDUS VALLEY', date: 'c. 2500 BCE',
    title: 'A figure in motion', subtitle: 'Dancing Girl of Mohenjo-daro', place: 'Mohenjo-daro · Indus region',
    material: 'Bronze · lost-wax casting', image: '/images/indus.webp', accent: '#bd8059', imagePosition: '50% 38%',
    video: { file: '/videos/indus-site-context.mp4', title: 'Ancient History of India · VideoWiki slide', maker: 'M. Imran, Sarah Welc, Charles Shepherd, and Arthur Robertson', license: 'CC BY-SA 4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_History_of_India_Visualized_VideoWiki_Slide.webm', footageLabel: 'Mohenjo-daro context · the Great Bath' },
    description: 'A small bronze figure stands with one hand resting on her hip and the other lowered. Her jewellery and assured stance give the sculpture a striking sense of presence.',
    context: 'The statuette belongs to the urban Harappan world of the third millennium BCE. It was found at Mohenjo-daro, now in present-day Pakistan, and is held by the National Museum in New Delhi.',
    significance: 'Its cast-bronze body is evidence of skilled metalworking. The figure also reminds us how much remains unknown about the people, performance, and social life of the Indus cities.',
    detail: 'The National Museum describes the statuette as cast using the lost-wax process. Its date is commonly given around 2500 BCE; the wider Harappan period spans a longer chronology.',
    sourceLabel: 'National Museum of India · Harappan collection', sourceUrl: 'https://nationalmuseumindia.gov.in/en/collections/index/6',
    newspaper: {
      headline: 'A bronze with poise', insideHeadline: 'The Dancing Girl of Mohenjo-daro',
      glanceHeading: 'A striking stance', historyHeading: 'Harappan world',
      meaningHeading: 'What survives', closeHeading: 'Look at the pose',
      glance: 'One hand rests on her hip; bangles climb her arm. The small figure meets the viewer with an assured stance.',
      history: 'Found at Mohenjo-daro, in present-day Pakistan, the bronze comes from the urban Harappan world of the third millennium BCE.',
      meaning: 'Its lost-wax casting reveals skilled metalwork. Her pose invites questions about identity and performance that the surviving evidence cannot settle.',
      close: 'Look at the jewellery and the weight set into one hip. The National Museum dates this statuette to around 2500 BCE.',
      detailPosition: '50% 0%',
    },
  },
  {
    id: 'ajanta', number: '02', tradition: 'AJANTA', date: '2nd century BCE – 6th century CE',
    title: 'Painted into stone', subtitle: 'Bodhisattva Padmapani · Cave 1', place: 'Ajanta · Maharashtra',
    material: 'Mural painting · rock-cut architecture', image: '/images/ajanta.webp', accent: '#b87c63', imagePosition: '50% 28%',
    video: { file: '/videos/indian-paintings-overview.mp4', title: 'Glimpses of Indian Paintings', maker: 'Indian Diplomacy', license: 'CC BY 3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Glimpses_of_Indian_Paintings.webm', footageLabel: 'A wider history of Indian painting · includes Ajanta' },
    description: 'A bodhisattva turns gently toward the viewer, lotus in hand. Subtle line, shaded colour, and a quiet gaze give this wall painting its lasting intimacy.',
    context: 'Ajanta is a group of Buddhist caves excavated above the Waghora River. Work took place in two broad phases: early caves from the 2nd and 1st centuries BCE, followed by major additions in the 5th and 6th centuries CE.',
    significance: 'The painted caves bring together architecture, sculpture, and narrative image. UNESCO describes their paintings and sculptures as masterpieces of Buddhist religious art with influence beyond India.',
    detail: 'Cave 1’s Padmapani is one of Ajanta’s best-known painted figures. The work belongs to a living sacred setting and should be understood as religious art, not simply decoration.',
    sourceLabel: 'UNESCO World Heritage Centre · Ajanta Caves', sourceUrl: 'https://whc.unesco.org/en/list/242',
    newspaper: {
      headline: 'The gaze of Ajanta', insideHeadline: 'Padmapani in Cave 1',
      glanceHeading: 'A quiet gaze', historyHeading: 'Caves above a river',
      meaningHeading: 'Beyond the caves', closeHeading: 'Inside Cave 1',
      glance: 'A bodhisattva holds a lotus and turns gently outward. Shaded colour and a quiet gaze bring the painted figure close.',
      history: 'Ajanta’s Buddhist caves were made in two broad phases, from the 2nd century BCE and again in the 5th and 6th centuries CE.',
      meaning: 'Painting, sculpture, and rock-cut architecture meet here. UNESCO notes the caves’ far-reaching influence on Buddhist art.',
      close: 'Padmapani remains part of a sacred setting. The painted image belongs to that religious space, not simply to its decoration.',
      detailPosition: '48% 27%',
    },
  },
  {
    id: 'chola', number: '03', tradition: 'CHOLA', date: 'c. late 11th century',
    title: 'The cosmic dance', subtitle: 'Shiva as Lord of Dance · Nataraja', place: 'Tamil Nadu · Chola period',
    material: 'Copper alloy · processional sculpture', image: '/images/nataraja.webp', accent: '#c4a166', imagePosition: '50% 42%',
    video: { file: '/videos/nataraja-artwork.mp4', title: 'Shiva Nataraja · Lord of the Dance', maker: 'Xiaweiyang', license: 'CC BY-SA 3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Shiva_Nataraja(Lord_of_the_Dance).webm', footageLabel: 'The Nataraja at Freer and Sackler Galleries' },
    description: 'Shiva dances within a ring of flame. The drum, fire, raised foot, and surrounding circle turn the bronze into an image of creation, destruction, and release.',
    context: 'The Chola period saw major achievements in temple architecture, sculpture, painting, and bronze casting. Portable icons such as this one could travel outside the shrine during festivals.',
    significance: 'The image joins multiple ideas in a single, balanced form. Its movement and symbolism made Nataraja one of the most recognised works of South Indian art.',
    detail: 'This Met sculpture is dated to the late 11th century and made of copper alloy. Use the symbols below to explore details described by the museum.',
    sourceLabel: 'The Metropolitan Museum of Art · Object 1987.80.1', sourceUrl: 'https://www.metmuseum.org/art/collection/search/39328',
    newspaper: {
      headline: 'Shiva in motion', insideHeadline: 'A universe in the dance',
      glanceHeading: 'A figure in motion', historyHeading: 'A Chola image',
      meaningHeading: 'Movement and stillness', closeHeading: 'The flying hair',
      glance: 'Shiva balances within a flaming halo. Four arms reach outward as the hair fans to either side, giving still metal the force of movement.',
      history: 'Made in Tamil Nadu during the Chola period, this copper-alloy sculpture dates to the late 11th century. The familiar form of Nataraja developed under Chola rule.',
      meaning: 'A calm face anchors the turning pose. The Met reads the sculpture as an image of Shiva’s roles as creator, preserver, and destroyer within a continuing cycle of time.',
      close: 'In this closer view, the hair sweeps away from Shiva’s composed face. That meeting of energy and balance is visible before the symbols are read below.',
      detailPosition: '50% 36%',
    },
    motifs: [
      { label: 'DRUM', meaning: 'The damaru signals the first sound of creation.' },
      { label: 'FIRE', meaning: 'The flame represents destruction and renewal.' },
      { label: 'RING OF FLAMES', meaning: 'The circle frames the continuing cycle of time.' },
      { label: 'RAISED FOOT', meaning: 'The raised foot offers refuge and release.' },
    ],
  },
  {
    id: 'mughal', number: '04', tradition: 'MUGHAL', date: '16th–18th centuries',
    title: 'A world on paper', subtitle: 'An illustrated page from the Akbarnama', place: 'Mughal court · South Asia',
    material: 'Ink, opaque watercolour, and gold on paper', image: '/images/mughal.webp', accent: '#ba9e64', imagePosition: '50% 40%',
    video: { file: '/videos/mughal-art-study.mp4', title: 'Akbarnama · motion study of the featured page', maker: 'Artwork: Basawan and Chitra · motion study: Trithayatra', license: 'Public-domain artwork · motion study in this exhibit', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Basawan._Akbar_Taming_Mad_Elephant_Hawai._Composition_by_Basawan,_coloring_by_Chitra._(right_part)_Akbarnama,_ca._1590,_Victoria_and_Albert_Museum,_London.._(2).jpg', footageLabel: 'A slow study of the exact Akbarnama page shown', hasAudio: false },
    description: 'Manuscript painting brings people, animals, architecture, and landscape into a carefully ordered frame. The image rewards looking closely at its many small events.',
    context: 'Mughal rulers supported large court workshops. Under Akbar, painters with different training worked together on illustrated manuscripts, including the Akbarnama, a history of the emperor’s reign.',
    significance: 'These paintings joined image and text while recording courtly life and imperial history. Their detail reflects collaboration between artists and the ambitions of the atelier.',
    detail: 'The featured image is a page from an Akbarnama manuscript attributed to Basawan and Chitra, around 1590, in the Victoria and Albert Museum. The public-domain image is shared through Wikimedia Commons.',
    sourceLabel: 'The Metropolitan Museum of Art · Mughal manuscript painting', sourceUrl: 'https://www.metmuseum.org/exhibitions/listings/2005/illustrated-khamsa',
    newspaper: {
      headline: 'An empire on paper', insideHeadline: 'A page from the Akbarnama',
      glanceHeading: 'A crowded scene', historyHeading: 'Akbar’s workshop',
      meaningHeading: 'Painted history', closeHeading: 'Two artists',
      glance: 'Figures, animals, and architecture fill a closely ordered scene. The eye moves between many small events.',
      history: 'Akbar’s court brought painters together in large workshops. The Akbarnama paired images with a history of his reign.',
      meaning: 'The manuscript joined storytelling and imperial record. Its intricate scenes also reveal the work of several hands.',
      close: 'This page, made around 1590, is attributed to Basawan for its composition and Chitra for its colour.',
      detailPosition: '52% 42%',
    },
  },
  {
    id: 'mithila', number: '05', tradition: 'MITHILA / MADHUBANI', date: 'A continuing tradition',
    title: 'A canvas filled with life', subtitle: 'Mithila painting', place: 'Mithila region · Bihar',
    material: 'Pigment and line · wall, paper, and cloth', image: '/images/mithila.webp', accent: '#c9794a', imagePosition: '50% 46%',
    video: { file: '/videos/mithila-painting.mp4', title: 'Madhubani Art with Bharti Dayal · excerpt', maker: 'Bharti Dayal', license: 'CC BY-SA 3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Madhubani_Art_with_Bharti_Dayal.ogv', footageLabel: 'Artist demonstration · edited excerpt from 04:02–04:44' },
    description: 'Bold outlines, repeated pattern, and subjects drawn from nature, daily life, and sacred stories fill the picture plane with colour and movement.',
    context: 'Mithila painting is associated with the Mithila region of Bihar. Artists have worked on walls and on portable surfaces such as paper and cloth; practices and materials vary between artists and communities.',
    significance: 'The tradition continues to change as artists work across media and audiences. Each painting belongs to its maker and context, rather than to a single fixed visual formula.',
    detail: 'This image is a contemporary painting by Bhuvana Meenakshi. It is included as an example of a continuing practice, not as a claim that every Mithila painting shares one style.',
    sourceLabel: 'Development Commissioner (Handicrafts) · Mithila Painting', sourceUrl: 'https://handicrafts.nic.in/crafts/All_Crafts/Craft_Categories/Miscellaneous/Folk_Painting/Mithila_painting/MithilaPaintingWebPage.html',
    newspaper: {
      headline: 'A world of pattern', insideHeadline: 'Painting in the Mithila region',
      glanceHeading: 'Pattern and line', historyHeading: 'Roots in Mithila',
      meaningHeading: 'Still changing', closeHeading: 'One artist’s hand',
      glance: 'Strong outlines and repeated marks carry the eye through a richly filled surface of colour and form.',
      history: 'Mithila artists have painted walls, paper, and cloth. Materials and subjects vary across makers and communities.',
      meaning: 'The tradition continues to change as artists work for new settings and audiences, while keeping ties to its regional practice.',
      close: 'This contemporary painting is by Bhuvana Meenakshi. It shows one artist’s work within a much wider tradition.',
      detailPosition: '48% 40%',
    },
  },
  {
    id: 'warli', number: '06', tradition: 'WARLI', date: 'A continuing tradition',
    title: 'Stories in geometry', subtitle: 'Warli painting', place: 'Maharashtra · western India',
    material: 'White pigment on an earthen ground', image: '/images/warli.webp', accent: '#d28b55', imagePosition: '50% 48%',
    video: { file: '/videos/warli-intro.mp4', title: 'Traditional Warli Art Painting Process', maker: 'Ds babariya', license: 'Pexels License', sourceUrl: 'https://www.pexels.com/video/traditional-warli-art-painting-process-37421046/', footageLabel: 'A Warli artist paints the story by hand' },
    description: 'Circles, triangles, and lines become people, animals, plants, and everyday scenes. A repeated rhythm can gather individual figures into a shared dance.',
    context: 'Warli painting is practised by Warli communities in Maharashtra and neighbouring areas. Traditionally, artists painted on earthen walls using a white rice-based pigment; contemporary practice also includes other surfaces.',
    significance: 'Its visual language makes social and environmental relationships legible through a small set of forms. The tradition remains active, with artists carrying it into new settings.',
    detail: 'The age of the tradition is not fixed here: published estimates vary. This chapter focuses on the documented materials and continuing practice.',
    sourceLabel: 'Development Commissioner (Handicrafts) · Warli Painting', sourceUrl: 'https://handicrafts.nic.in/crafts/All_Crafts/Craft_Categories/Miscellaneous/Folk_Painting/Warli_Painting/Warli_Paintingwebpage.html',
    newspaper: {
      headline: 'Stories in white lines', insideHeadline: 'The shapes of Warli painting',
      glanceHeading: 'Shapes at work', historyHeading: 'Painted on earth',
      meaningHeading: 'A shared rhythm', closeHeading: 'Follow the dance',
      glance: 'Circles, triangles, and lines become people, animals, and plants. Repetition gathers figures into shared scenes.',
      history: 'Warli communities in western India have painted with white rice-based pigment on earthen walls. Artists now use other surfaces too.',
      meaning: 'A small set of shapes makes relationships between people and their surroundings easy to see.',
      close: 'Look for figures linked in a dance. This visual language remains active, with artists carrying it into new settings.',
      detailPosition: '50% 48%',
    },
  },
]
