import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Arrow, SiteFooter, SiteHeader } from '../components/SiteChrome'

/* ── Arch path (1000×1000 viewBox, symmetric around x=500) ── */
const ARCH =
  'M90 1000 L90 470 Q70 410 130 360 Q140 290 210 250 Q230 190 320 160 Q340 110 420 100 Q450 70 500 30 ' +
  'Q550 70 580 100 Q660 110 680 160 Q770 190 790 250 Q860 290 870 360 Q930 410 910 470 L910 1000'

function ArchGateway() {
  return (
    <svg
      className="gate-svg"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={`${ARCH} L1000 1000 L1000 0 L0 0 L0 1000 Z`} fill="var(--gate-tint)" stroke="none" />
      <path d="M6 1000 L6 6 L994 6 L994 1000" fill="none" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      <path d={ARCH} fill="none" stroke="var(--gate-line)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
      <path d={ARCH} fill="none" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" transform="translate(500 1000) scale(0.96 0.97) translate(-500 -1000)" />
      <path d={ARCH} fill="none" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" transform="translate(500 1000) scale(0.92 0.94) translate(-500 -1000)" />
    </svg>
  )
}

export function HomePage() {
  const timeVideoRef = useRef<HTMLVideoElement>(null)
  const placeVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const pause = () => {
      if (document.hidden) {
        timeVideoRef.current?.pause()
        placeVideoRef.current?.pause()
      }
    }
    document.addEventListener('visibilitychange', pause)
    return () => document.removeEventListener('visibilitychange', pause)
  }, [])

  const playVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    ref.current?.play().catch(() => {})
  }

  const stopVideo = (ref: React.RefObject<HTMLVideoElement | null>) => {
    const element = ref.current
    if (!element) return
    element.pause()
    element.currentTime = 0
  }

  return (
    <main className="home-page">
      <SiteHeader />
      <h1 className="visually-hidden">Trithayatra — journeys through Indian art</h1>

      <div className="home-hero">
        <ArchGateway />

        <div className="home-hero-tagline" aria-hidden="true">
          <span className="home-hero-kicker">A DIGITAL EXHIBITION</span>
          <span className="home-hero-title">Trithayatra</span>
          <span className="home-hero-sub">Journeys through Indian art</span>
        </div>

        <div className="home-hero-layout">
          {/* Left Block */}
          <Link
            className="home-block home-block--left"
            to="/timeline"
            onPointerEnter={() => playVideo(timeVideoRef)}
            onPointerLeave={() => stopVideo(timeVideoRef)}
            onFocus={() => playVideo(timeVideoRef)}
            onBlur={() => stopVideo(timeVideoRef)}
          >
            <video ref={timeVideoRef} className="home-block-video" muted loop playsInline preload="metadata" poster="/images/warli-video-poster.webp" aria-hidden="true">
              <source src="/videos/warli-intro.mp4" type="video/mp4" />
            </video>
            <div className="home-block-overlay" />
            <div className="home-block-content">
              <span className="home-block-index">01 <span>/</span> TIME</span>
              <span className="home-block-title">Through<br/>time.</span>
              <span className="home-block-detail">Six works, spanning thousands of years.</span>
              <span className="home-block-action">
                EXPLORE THE TIMELINE
                <span className="home-block-arrow"><Arrow /></span>
              </span>
            </div>
          </Link>

          {/* Center Partition */}
          <div className="home-center-partition" />

          {/* Right Block */}
          <Link
            className="home-block home-block--right"
            to="/map"
            onPointerEnter={() => playVideo(placeVideoRef)}
            onPointerLeave={() => stopVideo(placeVideoRef)}
            onFocus={() => playVideo(placeVideoRef)}
            onBlur={() => stopVideo(placeVideoRef)}
          >
            <video ref={placeVideoRef} className="home-block-video" muted loop playsInline preload="metadata" poster="/images/nataraja.webp" aria-hidden="true">
              <source src="/videos/nataraja-artwork.mp4" type="video/mp4" />
            </video>
            <div className="home-block-overlay" />
            <div className="home-block-content">
              <span className="home-block-index">02 <span>/</span> PLACE</span>
              <span className="home-block-title">Across<br/>India.</span>
              <span className="home-block-detail">Eight places where art takes shape.</span>
              <span className="home-block-action">
                EXPLORE THE MAP
                <span className="home-block-arrow"><Arrow /></span>
              </span>
            </div>
          </Link>
        </div>
      </div>

      <section className="fusion-section">
        <div className="fusion-content">
          <div className="fusion-header">
            <span className="fusion-kicker">ACTIVITY 3</span>
            <h2>Warli × Kalamkari Fusion (CO2)</h2>
          </div>
          
          <div className="fusion-grid">
            <div className="fusion-image">
              <img src="/images/fusion.jpg" alt="Warli and Kalamkari Fusion Art" loading="lazy" />
            </div>
            
            <div className="fusion-points">
              <div className="fusion-point">
                <h3>Saraswati Sangam</h3>
                <p>Named for the Triveni Sangam, where the unseen river Saraswati is said to meet the Ganga and Yamuna. Here the hidden current is the shared spiritual roots of both arts.</p>
              </div>
              <div className="fusion-point">
                <h3>Jeevan Vriksha</h3>
                <p>"Tree of life", a central motif in Kalamkari and a symbol of Warli's cycle of life.</p>
              </div>
              <div className="fusion-point">
                <h3>Bindu & Bel</h3>
                <p>"Dot and vine".</p>
              </div>
              <div className="fusion-point">
                <h3>Trikon Pushp</h3>
                <p>"Triangle flower". Warli figures are built from triangles, which stand for balance, and here they bloom into Kalamkari flowers.</p>
              </div>
              <div className="fusion-point">
                <h3>Tarpa Meets Tree</h3>
                <p>The Warli spiral dance meets Kalamkari's tree.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
