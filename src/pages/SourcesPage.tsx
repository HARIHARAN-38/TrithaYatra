import { Arrow, SiteFooter, SiteHeader } from '../components/SiteChrome'
import { locations } from '../data/locations'
import { mediaCredits } from '../data/media'
import { chapters } from '../data/timeline'

const researchSources = [
  ...chapters.map((chapter) => ({ label: chapter.sourceLabel, url: chapter.sourceUrl })),
  ...locations.flatMap((location) => [
    { label: location.sourceLabel, url: location.sourceUrl },
    ...(location.additionalSource ? [location.additionalSource] : []),
  ]),
].filter((source, index, list) => list.findIndex((item) => item.url === source.url) === index)

const artworkCredits = mediaCredits.filter((credit) => credit.kind !== 'film')
const filmCredits = mediaCredits.filter((credit) => credit.kind === 'film')

const projectCredits = [
  { title: 'INTFRAME · scroll-rig', detail: 'Scroll progress and camera movement reference', license: 'MIT', url: 'https://github.com/intframe/scroll-rig' },
  { title: 'Atmospheric Depth Gallery', detail: 'Image gallery and atmosphere reference', license: 'MIT', url: 'https://github.com/houmahani/codrops-depth-gallery' },
  { title: 'awwwards-3d', detail: 'Scene composition reference', license: 'MIT', url: 'https://github.com/tsogjavklann/awwwards-3d' },
  { title: 'Bruno Simon · folio-2025', detail: 'Visual quality reference', license: 'REFERENCE', url: 'https://github.com/brunosimon/folio-2025' },
  { title: 'Newspaper Article', detail: 'Template adapted for the chapter newspapers', license: 'MIT', url: 'https://github.com/CodingWithJiro/freecodecamp-css-newspaper-article' },
  { title: 'Leaflet', detail: 'Interactive map library', license: 'BSD-2-CLAUSE', url: 'https://github.com/Leaflet/Leaflet' },
  { title: 'OpenStreetMap contributors', detail: 'Map data and tiles', license: 'ODbL', url: 'https://www.openstreetmap.org/copyright' },
  { title: 'Newsreader', detail: 'Newspaper reading typeface', license: 'SIL OFL 1.1', url: 'https://github.com/productiontype/Newsreader' },
  { title: 'Bodoni Moda', detail: 'Newspaper display typeface', license: 'SIL OFL 1.1', url: 'https://github.com/google/fonts/tree/main/ofl/bodonimoda' },
]

export function SourcesPage() {
  return (
    <main className="sources-page">
      <SiteHeader />
      <section className="sources-hero">
        <div className="sources-hero-inner">
          <div className="sources-hero-top"><span>THE TRITHAYATRA ARCHIVE</span><span>RESEARCH & CREDITS</span></div>
          <div className="sources-hero-main">
            <h1>Behind the <em>art.</em></h1>
            <div className="sources-hero-copy">
              <p>Explore the references, original images, films, and open tools that shaped this exhibition.</p>
              <div><span><strong>{researchSources.length}</strong> RESEARCH LINKS</span><span><strong>{artworkCredits.length}</strong> ARTWORK IMAGES</span><span><strong>{filmCredits.length}</strong> FILM CREDITS</span></div>
            </div>
          </div>
        </div>
      </section>

      <div className="sources-archive">
        <nav className="sources-jump" aria-label="Credits sections">
          <a href="#research">01 <span>Research</span></a>
          <a href="#artworks">02 <span>Artwork images</span></a>
          <a href="#films">03 <span>Film & motion</span></a>
          <a href="#projects">04 <span>Tools & references</span></a>
        </nav>

        <section className="archive-section" id="research">
          <div className="archive-section-head"><span className="archive-number">01 / 04</span><h2>Research</h2><p>Institutional and public sources for the works, places, dates, and historical context in the journey.</p></div>
          <div className="archive-list">
            {researchSources.map((source, index) => <a className="archive-link-row" href={source.url} key={source.url} target="_blank" rel="noreferrer">
              <span className="archive-row-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="archive-row-main"><strong>{source.label}</strong><small>{new URL(source.url).hostname.replace(/^www\./, '')}</small></span>
              <Arrow diagonal />
            </a>)}
          </div>
        </section>

        <section className="archive-section" id="artworks">
          <div className="archive-section-head"><span className="archive-number">02 / 04</span><h2>Artwork images</h2><p>Every image in the journey is shown with its maker, stated reuse terms, and a link to the original record.</p></div>
          <div className="archive-artworks">
            {artworkCredits.map((credit, index) => <article className="archive-art-card" key={`${credit.sourceUrl}-${credit.title}`}>
              <div className="archive-art-image"><img src={`/images/${credit.file}`} alt={credit.title} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div className="archive-art-copy"><h3>{credit.title}</h3><p>{credit.maker}</p><span className="archive-license">{credit.license}</span><a href={credit.sourceUrl} target="_blank" rel="noreferrer">ORIGINAL IMAGE <Arrow diagonal /></a></div>
            </article>)}
          </div>
        </section>

        <section className="archive-section" id="films">
          <div className="archive-section-head"><span className="archive-number">03 / 04</span><h2>Film & motion</h2><p>Footage and motion studies used in the exhibition, including edited and transcoded excerpts.</p></div>
          <div className="archive-list">
            {filmCredits.map((credit, index) => <a className="archive-link-row archive-film-row" href={credit.sourceUrl} key={`${credit.sourceUrl}-${credit.title}`} target="_blank" rel="noreferrer">
              <span className="archive-row-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="archive-row-main"><strong>{credit.title}</strong><small>{credit.maker}</small></span>
              <span className="archive-row-license">{credit.license}</span><Arrow diagonal />
            </a>)}
          </div>
        </section>

        <section className="archive-section archive-section-last" id="projects">
          <div className="archive-section-head"><span className="archive-number">04 / 04</span><h2>Tools & references</h2><p>Open tools, fonts, and visual references used to build the exhibition. Full licence notices are kept with the project.</p></div>
          <div className="archive-list">
            {projectCredits.map((credit, index) => <a className="archive-link-row archive-project-row" href={credit.url} key={credit.url} target="_blank" rel="noreferrer">
              <span className="archive-row-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="archive-row-main"><strong>{credit.title}</strong><small>{credit.detail}</small></span>
              <span className="archive-row-license">{credit.license}</span><Arrow diagonal />
            </a>)}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  )
}

export default SourcesPage
