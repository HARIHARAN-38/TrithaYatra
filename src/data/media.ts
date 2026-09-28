export type MediaCredit = {
  file: string
  kind?: 'film'
  title: string
  maker: string
  license: string
  sourceUrl: string
}

export const mediaCredits: MediaCredit[] = [
  { file: 'warli-video-poster.webp', kind: 'film', title: 'Traditional Warli Art Painting Process · timeline opening video', maker: 'Ds babariya', license: 'Pexels License', sourceUrl: 'https://www.pexels.com/video/traditional-warli-art-painting-process-37421046/' },
  { file: 'indus.webp', kind: 'film', title: 'Ancient History of India · Great Bath context video', maker: 'M. Imran, Sarah Welc, Charles Shepherd, and Arthur Robertson', license: 'CC BY-SA 4.0 · MP4 transcode', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ancient_History_of_India_Visualized_VideoWiki_Slide.webm' },
  { file: 'ajanta.webp', kind: 'film', title: 'Glimpses of Indian Paintings · history survey video', maker: 'Indian Diplomacy', license: 'CC BY 3.0 · MP4 transcode', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Glimpses_of_Indian_Paintings.webm' },
  { file: 'nataraja.webp', kind: 'film', title: 'Shiva Nataraja · artwork video', maker: 'Xiaweiyang', license: 'CC BY-SA 3.0 · MP4 transcode', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Shiva_Nataraja(Lord_of_the_Dance).webm' },
  { file: 'mughal.webp', kind: 'film', title: 'Akbarnama · motion study of the featured page', maker: 'Artwork by Basawan and Chitra; motion study by this exhibit', license: 'Public-domain artwork', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Basawan._Akbar_Taming_Mad_Elephant_Hawai._Composition_by_Basawan,_coloring_by_Chitra._(right_part)_Akbarnama,_ca._1590,_Victoria_and_Albert_Museum,_London.._(2).jpg' },
  { file: 'mithila.webp', kind: 'film', title: 'Madhubani Art with Bharti Dayal · 42-second excerpt', maker: 'Bharti Dayal', license: 'CC BY-SA 3.0 · edited excerpt and MP4 transcode', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Madhubani_Art_with_Bharti_Dayal.ogv' },
  { file: 'indus.webp', title: 'Bronze “Dancing Girl,” Mohenjo-daro, c. 2500 BC', maker: 'Gary Todd', license: 'CC0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bronze_%22Dancing_Girl,%22_Mohenjo-daro,_c._2500_BC.jpg' },
  { file: 'ajanta.webp', title: 'Bodhisattva Padmapani, Cave 1, Ajanta', maker: 'Unknown author', license: 'Public domain', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bodhisattva_Padmapani,_cave_1,_Ajanta,_India.jpg' },
  { file: 'nataraja.webp', title: 'Shiva as Lord of Dance (Nataraja), c. late 11th century', maker: 'The Metropolitan Museum of Art', license: 'Public domain · Open Access', sourceUrl: 'https://www.metmuseum.org/art/collection/search/39328' },
  { file: 'mughal.webp', title: 'Akbar Taming Mad Elephant Hawai, from the Akbarnama, c. 1590', maker: 'Composition by Basawan; colour by Chitra', license: 'Public domain', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Basawan._Akbar_Taming_Mad_Elephant_Hawai._Composition_by_Basawan,_coloring_by_Chitra._(right_part)_Akbarnama,_ca._1590,_Victoria_and_Albert_Museum,_London.._(2).jpg' },
  { file: 'mithila.webp', title: 'Madhubani painting', maker: 'Bhuvana Meenakshi', license: 'CC BY-SA 3.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Madhubani_painting_by_Bhuvana_Meenakshi.jpg' },
  { file: 'warli.webp', title: 'Warli painting', maker: 'Omrmankar', license: 'CC BY-SA 4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Warli_painting.jpg' },
  { file: 'ellora.webp', title: 'Ellora Caves, Kailasa Temple', maker: 'Vyacheslav Argenberg', license: 'CC BY 4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ellora_Caves,_India,_Kailasa_Temple.jpg' },
  { file: 'thanjavur.webp', title: 'Brihadeeswarar Temple, Thanjavur', maker: 'Vengolis', license: 'CC BY-SA 4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Brihadeeswarar_Temple_3406.jpg' },
  { file: 'khajuraho.webp', title: 'Devi Jagadambi Temple, Khajuraho', maker: 'Marcin Białek', license: 'CC BY-SA 4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Khajuraho_Devi_Jagadambi_Temple_2010.jpg' },
  { file: 'puri.webp', title: 'Pattachitra of Jagannath', maker: 'Patrick.zip', license: 'CC0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pattachitra_of_Jagannath.jpg' },
  { file: 'jaipur.webp', title: 'Month of Asvina, Jaipur, 19th century', maker: 'SpeakingArch', license: 'CC BY-SA 4.0', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Month_of_Asvina_(September-October),_Jaipur,_Rajasthan,_Government_Museum_and_Art_Gallery,_Chandigarh,_circa_19th_century_CE.jpg' },
]
