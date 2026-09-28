import { Link, NavLink } from 'react-router-dom'

export function SiteHeader({ light = false }: { light?: boolean }) {
  return (
    <header className={`site-header ${light ? 'site-header--light' : ''}`}>
      <Link to="/" className="wordmark" aria-label="Hari edition of Trithayatra home">
        <img src="/images/logo.jpg" alt="Trithayatra Logo" className="wordmark-logo" />
        <span>TRITHAYATRA · HARI EDITION</span>
      </Link>
      <nav className="header-nav" aria-label="Main navigation">
        <NavLink to="/timeline">TIME</NavLink>
        <NavLink to="/map">PLACE</NavLink>
        <Link className="nav-sources" to="/sources">SOURCES</Link>
      </nav>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-intro">
          <span className="footer-kicker">HARI EDITION · AN ATLAS OF INDIAN ART</span>
          <Link to="/" className="footer-brand">Trithayatra<span aria-hidden="true">.</span></Link>
          <p>Explore the works, traditions, and places that shape the story of Indian art.</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <span className="footer-kicker">EXPLORE</span>
          <Link to="/timeline"><span>01</span>Journey through time <Arrow diagonal /></Link>
          <Link to="/map"><span>02</span>Journey across India <Arrow diagonal /></Link>
          <Link to="/sources"><span>03</span>Sources & credits <Arrow diagonal /></Link>
        </nav>
      </div>
      <div className="footer-bottom"><span>A DIGITAL EXHIBITION · 2026</span><span>ART · TIME · PLACE</span></div>
    </footer>
  )
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" className="arrow-icon" viewBox="0 0 24 24" fill="none">
      {diagonal ? <path d="M6 18 18 6M8 6h10v10" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}
    </svg>
  )
}
