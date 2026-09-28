import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Arrow, SiteFooter, SiteHeader } from '../components/SiteChrome'
import { chapters, type TimelineChapter } from '../data/timeline'
import { mediaCredits } from '../data/media'

function characterDelay(character: string) {
  if ('.!?'.includes(character)) return 140
  if (',;:'.includes(character)) return 65
  if (character === ' ') return 9
  return 17
}

function printDuration(text: string) {
  return [...text].reduce((duration, character) => duration + characterDelay(character), 0)
}

function printedCount(text: string, elapsed: number) {
  let spent = 0
  let count = 0
  for (const character of text) {
    spent += characterDelay(character)
    if (spent > elapsed) break
    count += character.length
  }
  return count
}

type PrintTag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'strong'

function PressText({ as: Tag = 'span', text, start, elapsed, className = '' }: {
  as?: PrintTag
  text: string
  start: number
  elapsed: number
  className?: string
}) {
  const count = printedCount(text, elapsed - start)
  return <Tag className={`paper-write ${className}`} style={{ visibility: count > 0 ? 'visible' : 'hidden' }}>
    <span className="paper-measure" aria-hidden="true">{text}</span>
    <span className="paper-ink" aria-hidden="true">{text.slice(0, count)}{count < text.length && <span className="paper-caret" />}</span>
    <span className="paper-screen-reader">{text}</span>
  </Tag>
}

function makeSchedule(chapter: TimelineChapter, imageCredit: string) {
  const story = chapter.newspaper
  const at: Record<string, number> = {}
  let next = 500
  const write = (key: string, value: string) => {
    at[key] = next
    next += Math.max(160, printDuration(value)) + 135
  }
  const reveal = (key: string, duration = 150) => {
    at[key] = next
    next += duration
  }

  write('frontTopLeft', 'THE ARTS & CULTURE EDITION')
  write('frontTopRight', `VOL. 01 · NO. ${chapter.number}`)
  write('masthead', 'The Art Chronicle')
  write('dateLeft', 'AN ATLAS OF INDIAN ART')
  write('dateCenter', `${chapter.tradition} · ${chapter.place}`)
  write('dateRight', 'PAGE 01')
  write('featureLabel', `THE FEATURED WORK · ${chapter.date}`)
  write('title', story.headline)
  write('subtitle', chapter.subtitle)
  reveal('heroImage', 2900)
  write('heroCaptionLeft', 'FIG. 01 / THE WORK')
  write('heroCaptionRight', chapter.material)
  write('glanceHeading', story.glanceHeading)
  write('description', story.glance)
  write('historyHeading', story.historyHeading)
  write('context', story.history)
  write('frontFootLeft', 'TRITHAYATRA · THE ART CHRONICLE')
  write('frontFootRight', '01')
  write('insideTopLeft', 'THE ART CHRONICLE')
  write('insideTopRight', 'THE WORK, CONTINUED')
  write('insideLabel', 'A CLOSER READING')
  write('insideTitle', story.insideHeadline)
  write('insideMeta', `${chapter.place} · ${chapter.date}`)
  write('significanceHeading', story.meaningHeading)
  write('significance', story.meaning)
  write('detailHeading', story.closeHeading)
  write('detail', story.close)
  reveal('detailImage', 2500)
  write('detailCaption', 'FIG. 02 / A DETAIL FROM THE WORK')
  if (chapter.motifs) {
    write('motifsHeading', 'Read the symbols')
    chapter.motifs.forEach((motif, index) => {
      write(`motifLabel${index}`, motif.label)
      write(`motifMeaning${index}`, motif.meaning)
    })
  }
  write('creditsHeading', 'SOURCES & CREDITS')
  write('imageHeading', 'ARTWORK IMAGE')
  write('imageCredit', imageCredit)
  write('researchHeading', 'RESEARCH')
  write('researchCredit', chapter.sourceLabel)
  reveal('sources')
  write('insideFootLeft', 'AN ATLAS OF INDIAN ART')
  write('insideFootRight', '02')
  return { at, duration: next + 300 }
}

function ChapterEdition({ chapterId }: { chapterId?: string }) {
  const chapter = chapters.find((item) => item.id === chapterId)
  const [elapsed, setElapsed] = useState(0)
  const [edition, setEdition] = useState(0)
  const [finished, setFinished] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [artReady, setArtReady] = useState(false)

  const artworkCredit = chapter ? mediaCredits.filter((item) => item.file === chapter.image.split('/').pop()).at(-1) : undefined
  const imageCredit = `${artworkCredit?.maker ?? 'SEE SOURCE'} · ${artworkCredit?.license ?? 'CREDITED IMAGE'}`
  const schedule = chapter ? makeSchedule(chapter, imageCredit) : null
  const duration = schedule?.duration ?? 0

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!chapter) return
    let cancelled = false
    const image = new Image()
    image.src = chapter.image
    const ready = () => { if (!cancelled) setArtReady(true) }
    const artLoaded = image.decode
      ? image.decode().catch(() => undefined)
      : new Promise<void>((resolve) => { image.onload = () => resolve(); image.onerror = () => resolve() })
    const fontsLoaded = document.fonts
      ? Promise.all([document.fonts.load('400 16px Newsreader'), document.fonts.load('700 40px Bodoni Moda')]).catch(() => undefined)
      : Promise.resolve()
    void Promise.all([artLoaded, fontsLoaded]).then(ready)
    return () => { cancelled = true; image.onload = null; image.onerror = null }
  }, [chapter?.id])

  useEffect(() => {
    if (!chapter || !artReady || reducedMotion || finished) return
    let frame = 0
    const started = performance.now()
    setElapsed(0)
    const tick = (now: number) => {
      const next = Math.min(now - started, duration)
      setElapsed(next)
      if (next < duration) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [chapter?.id, artReady, edition, reducedMotion, finished, duration])

  if (!chapter || !schedule) {
    return <main className="not-found"><p className="eyebrow">404 · WORK NOT FOUND</p><h1>This page<br /><em>has wandered.</em></h1><Link className="button-link" to="/timeline">RETURN TO THE JOURNEY <Arrow /></Link></main>
  }

  const progress = reducedMotion || finished ? duration : elapsed
  const story = chapter.newspaper
  const at = schedule.at
  const show = (key: string): CSSProperties => ({ visibility: progress >= at[key] ? 'visible' : 'hidden' })
  const typed = (key: string, text: string, as: PrintTag = 'span', className = '') =>
    <PressText as={as} text={text} start={at[key]} elapsed={progress} className={className} />

  return (
    <main className="paper-page">
      <SiteHeader />
      <div className="paper-reading-room">
        <div className="paper-toolbar">
          <Link to="/timeline" className="paper-back"><span aria-hidden="true">←</span> BACK TO THE JOURNEY</Link>
          <div className="paper-toolbar-actions">
            <span>EDITION {chapter.number} / 06</span>
            <button onClick={() => { setFinished(false); setElapsed(0); setEdition((value) => value + 1) }}>REPRINT ↺</button>
            {progress < duration && <button onClick={() => setFinished(true)}>FINISH PRINTING ↓</button>}
          </div>
        </div>

        <div className={`newspaper-spread ${reducedMotion || finished ? 'is-complete' : ''}`} key={`${chapter.id}-${edition}`} aria-label={`Two-page newspaper about ${chapter.subtitle}`}>
          <article className="newspaper-sheet newspaper-sheet-front">
            <div className="newspaper-topline" style={show('frontTopLeft')}>{typed('frontTopLeft', 'THE ARTS & CULTURE EDITION')}{typed('frontTopRight', `VOL. 01 · NO. ${chapter.number}`)}</div>
            <div className="newspaper-masthead" style={show('masthead')}><span className="newspaper-masthead-ornament">✦</span>{typed('masthead', 'The Art Chronicle', 'strong')}<span className="newspaper-masthead-ornament">✦</span></div>
            <div className="newspaper-dateline" style={show('dateLeft')}>{typed('dateLeft', 'AN ATLAS OF INDIAN ART')}{typed('dateCenter', `${chapter.tradition} · ${chapter.place}`)}{typed('dateRight', 'PAGE 01')}</div>
            <div className="newspaper-lead">
              {typed('featureLabel', `THE FEATURED WORK · ${chapter.date}`, 'p', 'newspaper-section-label')}
              {typed('title', story.headline, 'h1')}
              {typed('subtitle', chapter.subtitle, 'p', 'newspaper-deck')}
            </div>
            <figure className={`newspaper-image newspaper-image-primary ${progress >= at.heroImage ? 'is-printing' : ''}`} style={show('heroImage')}>
              <img src={chapter.image} alt={chapter.subtitle} style={{ objectPosition: chapter.imagePosition }} />
              <figcaption>{typed('heroCaptionLeft', 'FIG. 01 / THE WORK')}{typed('heroCaptionRight', chapter.material)}</figcaption>
            </figure>
            <div className="newspaper-columns newspaper-columns-front">
              <section style={show('glanceHeading')}>
                {typed('glanceHeading', story.glanceHeading, 'h2')}
                {typed('description', story.glance, 'p', 'paper-typed paper-dropcap')}
              </section>
              <section style={show('historyHeading')}>
                {typed('historyHeading', story.historyHeading, 'h2')}
                {typed('context', story.history, 'p', 'paper-typed')}
              </section>
            </div>
            <div className="newspaper-page-foot" style={show('frontFootLeft')}>{typed('frontFootLeft', 'TRITHAYATRA · THE ART CHRONICLE')}{typed('frontFootRight', '01')}</div>
          </article>

          <article className="newspaper-sheet newspaper-sheet-inside">
            <div className="newspaper-topline" style={show('insideTopLeft')}>{typed('insideTopLeft', 'THE ART CHRONICLE')}{typed('insideTopRight', 'THE WORK, CONTINUED')}</div>
            <div className="newspaper-inside-heading" style={show('insideLabel')}>
              {typed('insideLabel', 'A CLOSER READING', 'span', 'newspaper-section-label')}
              {typed('insideTitle', story.insideHeadline, 'h2')}
              {typed('insideMeta', `${chapter.place} · ${chapter.date}`, 'p')}
            </div>
            <div className="newspaper-inside-grid" style={show('significanceHeading')}>
              <section className="newspaper-story">
                {typed('significanceHeading', story.meaningHeading, 'h3')}
                {typed('significance', story.meaning, 'p', 'paper-typed paper-dropcap')}
              </section>
              <section className="newspaper-story">
                {typed('detailHeading', story.closeHeading, 'h3')}
                {typed('detail', story.close, 'p', 'paper-typed')}
              </section>
            </div>
            <figure className={`newspaper-image newspaper-image-detail ${progress >= at.detailImage ? 'is-printing' : ''}`} style={show('detailImage')}>
              <img src={chapter.image} alt={`Detail of ${chapter.subtitle}`} style={{ objectPosition: story.detailPosition }} />
              <figcaption>{typed('detailCaption', 'FIG. 02 / A DETAIL FROM THE WORK')}</figcaption>
            </figure>
            {chapter.motifs && <section className="newspaper-motifs" style={show('motifsHeading')}>
              {typed('motifsHeading', 'Read the symbols', 'h3')}
              <div>{chapter.motifs.map((motif, index) => <p key={motif.label}>{typed(`motifLabel${index}`, motif.label, 'strong')}{typed(`motifMeaning${index}`, motif.meaning)}</p>)}</div>
            </section>}
            <aside className="newspaper-credits" style={show('creditsHeading')}>
              {typed('creditsHeading', 'SOURCES & CREDITS', 'h3')}
              <div className="newspaper-credits-grid">
                <div>{typed('imageHeading', 'ARTWORK IMAGE', 'span', 'newspaper-credit-label')}{typed('imageCredit', imageCredit, 'p')}</div>
                <div>{typed('researchHeading', 'RESEARCH', 'span', 'newspaper-credit-label')}{typed('researchCredit', chapter.sourceLabel, 'p')}</div>
              </div>
              <div className="newspaper-credits-links" style={show('sources')}><a href={artworkCredit?.sourceUrl ?? chapter.sourceUrl} target="_blank" rel="noreferrer">IMAGE SOURCE <Arrow diagonal /></a><a href={chapter.sourceUrl} target="_blank" rel="noreferrer">RESEARCH SOURCE <Arrow diagonal /></a></div>
            </aside>
            <div className="newspaper-page-foot" style={show('insideFootLeft')}>{typed('insideFootLeft', 'AN ATLAS OF INDIAN ART')}{typed('insideFootRight', '02')}</div>
          </article>
        </div>
      </div>
      <SiteFooter />
    </main>
  )
}

export function TimelineChapterPage() {
  const { chapterId } = useParams()
  return <ChapterEdition key={chapterId} chapterId={chapterId} />
}

export default TimelineChapterPage
