import { lazy, Suspense, useLayoutEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SidePillars } from './components/SidePillars'

const MapPage = lazy(() => import('./pages/MapPage').then((module) => ({ default: module.MapPage })))
const SourcesPage = lazy(() => import('./pages/SourcesPage').then((module) => ({ default: module.SourcesPage })))
const TimelinePage = lazy(() => import('./pages/TimelinePage').then((module) => ({ default: module.TimelinePage })))
const TimelineChapterPage = lazy(() => import('./pages/TimelineChapterPage').then((module) => ({ default: module.TimelineChapterPage })))

function RouteReset() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function NotFound() {
  return <main className="not-found"><p className="eyebrow">404 · LOST IN THE ARCHIVE</p><h1>This page<br /><em>has wandered.</em></h1><a className="button-link" href="/">RETURN HOME <span aria-hidden="true">→</span></a></main>
}

export function App() {
  return <BrowserRouter><RouteReset /><SidePillars /><Suspense fallback={<main className="route-loader"><span className="eyebrow">OPENING THE ARCHIVE</span><i /></main>}><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/timeline" element={<TimelinePage />} />
      <Route path="/timeline/:chapterId" element={<TimelineChapterPage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/sources" element={<SourcesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes></Suspense></BrowserRouter>
}
