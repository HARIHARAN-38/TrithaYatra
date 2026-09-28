import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Arrow, SiteFooter, SiteHeader } from '../components/SiteChrome'
import { chapters } from '../data/timeline'
import { TimelineCanvas } from '../experience/TimelineCanvas'

function TimelineIntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = false
    const syncPlayback = () => {
      if (visible && !motionPreference.matches) void video.play().catch(() => {})
      else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.05 })
    observer.observe(video)
    motionPreference.addEventListener('change', syncPlayback)
    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [])

  return <video ref={videoRef} className="timeline-intro-video" poster="/images/warli-video-poster.webp" autoPlay muted loop playsInline preload="auto" aria-hidden="true"><source src="/videos/warli-intro.mp4" type="video/mp4" /></video>
}

export function TimelinePage() {
  const runwayRef = useRef<HTMLDivElement>(null)
  const navChaptersRef = useRef<HTMLDivElement>(null)
  const [runway, setRunway] = useState<HTMLElement | null>(null)
  const [active, setActive] = useState(0)
  const navigate = useNavigate()

  useEffect(() => setRunway(runwayRef.current), [])
  useEffect(() => {
    if (!runway) return
    let frame = 0
    const measure = () => {
      const span = Math.max(1, runway.offsetHeight - window.innerHeight)
      const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY
      const progress = Math.max(0, Math.min(1, (scrollTop - runway.offsetTop) / span))
      setActive(Math.min(chapters.length - 1, Math.round(progress * (chapters.length - 1))))
      frame = requestAnimationFrame(measure)
    }
    frame = requestAnimationFrame(measure)
    return () => {
      cancelAnimationFrame(frame)
    }
  }, [runway])

  useEffect(() => {
    const strip = navChaptersRef.current
    const current = strip?.children[active] as HTMLElement | undefined
    if (!strip || !current || strip.scrollWidth <= strip.clientWidth) return
    const stripBounds = strip.getBoundingClientRect()
    const currentBounds = current.getBoundingClientRect()
    strip.scrollTo({
      left: strip.scrollLeft + currentBounds.left - stripBounds.left - (stripBounds.width - currentBounds.width) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
  }, [active])

  const jumpTo = (index: number) => {
    if (!runway) return
    setActive(index)
    const span = runway.offsetHeight - window.innerHeight
    window.scrollTo({ top: runway.offsetTop + span * index / (chapters.length - 1), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  return (
    <main className="timeline-page">
      <SiteHeader />
      <section className="timeline-intro">
        <TimelineIntroVideo />
        <p className="eyebrow"><span className="eyebrow-dot" /> EXPERIENCE 01 / TIME</p>
        <h1><span>Journey</span><span>through <em>time.</em></span></h1>
        <div className="timeline-intro-bottom"><p>Six works across thousands of years.</p></div>
        <div className="timeline-intro-number" aria-hidden="true">01—06</div>
      </section>

      <div className="timeline-runway" ref={runwayRef}>
        <div className="timeline-stage">
          <TimelineCanvas runway={runway} />
          <div className="timeline-stage-vignette" />
          <div className="timeline-stage-top"><span>JOURNEY THROUGH TIME</span><span>{chapters[active].date}</span></div>
          {chapters.map((chapter, index) => <section className={`chapter-section ${index === active ? 'is-current' : ''}`} id={`chapter-${chapter.id}`} key={chapter.id} aria-hidden={index !== active}>
            <div className="chapter-copy">
              <p className="chapter-index"><span>{chapter.number} / 06</span><i />{chapter.tradition}</p>
              <h2>{chapter.title}</h2>
              <p className="chapter-subtitle">{chapter.subtitle}</p>
              <p className="chapter-description">{chapter.description}</p>
              <button className="chapter-open" onClick={() => navigate(`/timeline/${chapter.id}`)} tabIndex={index === active ? 0 : -1}>EXPLORE THIS WORK <Arrow /></button>
            </div>
            <div className="chapter-art-caption"><span>{chapter.place}</span><span>{chapter.material}</span></div>
          </section>)}
          <nav className="timeline-nav" aria-label="Timeline chapters">
            <div className="timeline-nav-range"><span>2500 BCE</span><span>CHAPTER {chapters[active].number} / 06</span><span>PRESENT</span></div>
            <div className="timeline-nav-progress" aria-hidden="true"><span style={{ width: `${((active) / (chapters.length - 1)) * 100}%` }} /></div>
            <div className="timeline-nav-chapters" ref={navChaptersRef}>{chapters.map((chapter, index) => <button key={chapter.id} className={active === index ? 'active' : ''} onClick={() => jumpTo(index)} aria-current={active === index ? 'step' : undefined} aria-label={`Go to ${chapter.tradition}`}><span className="timeline-nav-number">{chapter.number}</span><span className="timeline-nav-name">{chapter.tradition === 'MITHILA / MADHUBANI' ? 'MITHILA' : chapter.tradition}</span></button>)}</div>
          </nav>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}

export default TimelinePage
