import { useEffect, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, Tooltip, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import { Arrow, SiteHeader } from '../components/SiteChrome'
import { locations, type ArtLocation } from '../data/locations'
import { mediaCredits } from '../data/media'
import 'leaflet/dist/leaflet.css'

const locationBounds = L.latLngBounds(locations.map((location) => L.latLng(...location.coordinates)))

function MapFocus({ location, focusKey }: { location: ArtLocation | null; focusKey: number }) {
  const map = useMap()
  const hasMounted = useRef(false)
  const previousFocus = useRef({ id: null as string | null, key: -1, resizes: 0 })
  const [resizes, setResizes] = useState(0)
  useMapEvents({ resize: () => setResizes((value) => value + 1) })

  useEffect(() => {
    if (!location) {
      if (!hasMounted.current) map.fitBounds(locationBounds, { padding: L.point(70, 100) })
    } else {
      const narrow = window.matchMedia('(max-width: 760px)').matches
      const zoom = narrow ? 8 : 9
      const size = map.getSize()
      const offset = narrow ? L.point(0, size.y * .23) : L.point(Math.min(245, size.x * .22), 0)
      const center = map.unproject(map.project(location.coordinates, zoom).add(offset), zoom)
      const resizeOnly = previousFocus.current.id === location.id && previousFocus.current.key === focusKey && previousFocus.current.resizes !== resizes
      if (resizeOnly) map.setView(center, zoom, { animate: false })
      else map.flyTo(center, zoom, { duration: 1.15 })
    }
    hasMounted.current = true
    previousFocus.current = { id: location?.id ?? null, key: focusKey, resizes }
  }, [location, focusKey, map, resizes])

  return null
}

const nearbyWest = new Set(['ajanta', 'ellora'])
const westBounds = L.latLngBounds(locations.filter((location) => nearbyWest.has(location.id)).map((location) => L.latLng(...location.coordinates)))

function LocationMarkers({ selectedId, onSelect }: { selectedId: string | null; onSelect: (id: string) => void }) {
  const map = useMap()
  const [zoom, setZoom] = useState(map.getZoom())
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) })
  const clustered = zoom < 7
  const visible = clustered ? locations.filter((location) => !nearbyWest.has(location.id)) : locations

  return <>
    {clustered && <Marker
      position={[20.29, 75.44]}
      icon={L.divIcon({ className: 'art-marker-shell', html: '<span class="art-marker art-marker-cluster" data-location-cluster="west"><span>2+</span></span>', iconSize: [44, 52], iconAnchor: [22, 45] })}
      title="Explore Ajanta and Ellora"
      alt="Zoom in to explore Ajanta and Ellora"
      keyboard
      eventHandlers={{ click: () => {
        map.once('zoomend', () => requestAnimationFrame(() => requestAnimationFrame(() => {
          document.querySelector<HTMLElement>('.art-marker[data-location-id="ajanta"]')
            ?.closest<HTMLElement>('.leaflet-marker-icon')?.focus()
        })))
        map.flyToBounds(westBounds, { padding: L.point(75, 75), maxZoom: 8, duration: 1 })
      } }}
    ><Tooltip direction="top" offset={[0, -39]}>Ajanta · Ellora</Tooltip></Marker>}
    {visible.map((location) => {
      const active = selectedId === location.id
      const icon = L.divIcon({
        className: 'art-marker-shell',
        html: `<span class="art-marker ${active ? 'is-active' : ''}" data-location-id="${location.id}"><span>${location.number}</span></span>`,
        iconSize: [44, 52],
        iconAnchor: [22, 45],
      })
      return <Marker
        key={location.id}
        position={location.coordinates}
        icon={icon}
        title={`${location.name}, ${location.region}`}
        alt={`Explore ${location.name}: ${location.tradition}`}
        keyboard
        eventHandlers={{ click: () => onSelect(location.id) }}
      ><Tooltip direction="top" offset={[0, -39]}>{location.name}</Tooltip></Marker>
    })}
  </>
}

export function MapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [focusKey, setFocusKey] = useState(0)
  const selected = locations.find((location) => location.id === selectedId) ?? null
  const imageCredit = selected
    ? mediaCredits.filter((item) => item.file === selected.image.split('/').pop()).at(-1)
    : undefined

  const closeDetails = () => {
    const previousId = selectedId
    setSelectedId(null)
    if (previousId) requestAnimationFrame(() => {
      const marker = document.querySelector<HTMLElement>(`.art-marker[data-location-id="${previousId}"]`)
        ?? (nearbyWest.has(previousId) ? document.querySelector<HTMLElement>('.art-marker[data-location-cluster="west"]') : null)
      marker?.closest<HTMLElement>('.leaflet-marker-icon')?.focus()
    })
  }

  useEffect(() => {
    if (!selectedId) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeDetails()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedId])

  return (
    <main className="map-page">
      <SiteHeader />
      <section className={`map-stage ${selected ? 'has-selection' : ''}`} aria-label="Interactive map of Indian art locations">
        <MapContainer className="art-map" center={[22.7, 80.2]} zoom={5} minZoom={3} maxZoom={15} zoomControl={false} scrollWheelZoom attributionControl>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
          />
          <ZoomControl position="bottomleft" />
          <MapFocus location={selected} focusKey={focusKey} />
          <LocationMarkers selectedId={selectedId} onSelect={(id) => { setSelectedId(id); setFocusKey((value) => value + 1) }} />
        </MapContainer>

        {selected && <aside className="location-panel" aria-label={`${selected.name} details`} key={selected.id}>
          <button className="location-close" onClick={closeDetails} aria-label="Close location details">×</button>
          <figure className="location-image">
            <img src={selected.image} alt={imageCredit?.title ?? selected.tradition} style={{ objectPosition: selected.imagePosition }} />
            <figcaption>{imageCredit?.title ?? selected.tradition}</figcaption>
          </figure>
          <div className="location-panel-copy">
            <p className="location-overline">PLACE {selected.number} / 08 · {selected.region}</p>
            <h1>{selected.name}</h1>
            <div className="location-facts">
              <p><span>ART & CULTURE</span><strong>{selected.tradition}</strong></p>
              <p><span>PERIOD</span><strong>{selected.date}</strong></p>
            </div>
            <section><h2>At this place</h2><p>{selected.summary}</p></section>
            <section><h2>Why it matters</h2><p>{selected.significance}</p></section>
            <div className="location-sources">
              <a href={selected.sourceUrl} target="_blank" rel="noreferrer">READ THE SOURCE <Arrow diagonal /></a>
              {imageCredit && <a href={imageCredit.sourceUrl} target="_blank" rel="noreferrer">VIEW THE IMAGE <Arrow diagonal /></a>}
              {selected.additionalSource && <a href={selected.additionalSource.url} target="_blank" rel="noreferrer">MORE ON THIS PLACE <Arrow diagonal /></a>}
            </div>
            {imageCredit && <p className="location-photo-credit">IMAGE: {imageCredit.maker} · {imageCredit.license}</p>}
          </div>
        </aside>}
      </section>
    </main>
  )
}

export default MapPage
