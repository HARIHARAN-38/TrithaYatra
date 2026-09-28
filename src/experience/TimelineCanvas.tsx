import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { chapters } from '../data/timeline'
import { CameraBeats, QualityGovernor, SmoothProgress, smoothstep, visibilityGate } from './scroll-rig'

/**
 * Artworks become a depth gallery: scroll progress moves a camera between framed
 * image planes while the surrounding colour shifts with each chapter. The
 * gallery uses the mood and image-plane approach in Codrops' MIT-licensed
 * Atmospheric Depth Gallery; it keeps native page scrolling and text controls.
 */
export function TimelineCanvas({ runway }: { runway: HTMLElement | null }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host || !runway) return
    const compactAtStart = window.innerWidth <= 760
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    host.appendChild(canvas)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: !compactAtStart, powerPreference: 'low-power' })
    } catch {
      document.documentElement.classList.add('webgl-unavailable')
      return () => canvas.remove()
    }

    const scene = new THREE.Scene()
    const startColor = new THREE.Color('#13120f')
    scene.background = startColor.clone()
    scene.fog = new THREE.FogExp2(startColor, 0.012)
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 150)
    camera.position.set(0, 0, 8)

    const lights = new THREE.Group()
    const ambient = new THREE.HemisphereLight(0xe8d7c2, 0x17110e, 1.15)
    const key = new THREE.PointLight(0xc4a16b, 16, 30, 2)
    key.position.set(3.4, 2.4, 4)
    lights.add(ambient, key)
    scene.add(lights)

    const stage = new THREE.Group()
    scene.add(stage)
    const frameMaterials: THREE.MeshStandardMaterial[] = []
    const imageMaterials: THREE.MeshBasicMaterial[] = []
    const haloMaterials: THREE.MeshBasicMaterial[] = []
    const imagePlanes: THREE.Group[] = []
    const imageLoader = new THREE.TextureLoader()
    let disposed = false

    chapters.forEach((chapter, index) => {
      const z = -index * 6
      const group = new THREE.Group()
      group.position.set(3.05, 0.02, z)
      stage.add(group)
      imagePlanes.push(group)
      const frameMaterial = new THREE.MeshStandardMaterial({ color: '#aa8750', roughness: 0.72, metalness: 0.1, transparent: true, depthWrite: false })
      frameMaterials.push(frameMaterial)

      let fitted = false
      const texture = imageLoader.load(chapter.image, (loaded) => {
        if (disposed) return
        if (loaded.image instanceof HTMLImageElement) fitImage(loaded.image)
      })
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = 4
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: index === 0 ? 1 : 0.12, toneMapped: false })
      imageMaterials.push(material)

      const addFrameBar = (width: number, height: number, x: number, y: number) => {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(width, height, 0.09), frameMaterial)
        bar.position.set(x, y, -0.035)
        group.add(bar)
      }
      const fitImage = (image: HTMLImageElement) => {
        if (fitted) return
        fitted = true
        const imageAspect = image.width / image.height || 0.72
        const height = Math.min(5.25, 4.45 / imageAspect)
        const width = height * imageAspect
        const print = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material)
        print.position.z = 0.025
        group.add(print)
        addFrameBar(width + 0.15, 0.075, 0, height / 2 + 0.055)
        addFrameBar(width + 0.15, 0.075, 0, -height / 2 - 0.055)
        addFrameBar(0.075, height + 0.15, -width / 2 - 0.055, 0)
        addFrameBar(0.075, height + 0.15, width / 2 + 0.055, 0)
        const haloMaterial = new THREE.MeshBasicMaterial({ color: chapter.accent, transparent: true, opacity: 0.035, depthWrite: false })
        haloMaterials.push(haloMaterial)
        const halo = new THREE.Mesh(
          new THREE.PlaneGeometry(width + 1.5, height + 1.5),
          haloMaterial,
        )
        halo.position.z = -0.11
        group.add(halo)
      }
      if (texture.image instanceof HTMLImageElement && texture.image.complete) fitImage(texture.image)
    })

    // A restrained dust field gives the gallery depth without obscuring artwork.
    const particleCount = compactAtStart ? 30 : 78
    const particlePositions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.5) * 13
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 8
      particlePositions[index * 3 + 2] = 3 - Math.random() * 38
    }
    const particleGeometry = new THREE.BufferGeometry()
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
    const particleMaterial = new THREE.PointsMaterial({ color: '#d6c1a2', size: 0.018, transparent: true, opacity: 0.5, depthWrite: false })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    const governor = new QualityGovernor({ px: Math.min(window.devicePixelRatio || 1, compactAtStart ? 1.2 : 1.6), floor: compactAtStart ? 0.7 : 0.85, step: 0.15, budgetMs: 28, cooldownMs: 1800 })
    renderer.setPixelRatio(governor.px)
    renderer.setSize(host.clientWidth || window.innerWidth, host.clientHeight || window.innerHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    const progress = new SmoothProgress(runway, 4.2)
    const beatsDesktop = new CameraBeats(chapters.map((_, index) => ({
      at: index / (chapters.length - 1),
      pos: [0, 0, 8 - index * 6] as [number, number, number],
      look: [1.08, 0, -index * 6] as [number, number, number],
    })))
    const beatsCompact = new CameraBeats(chapters.map((_, index) => ({
      at: index / (chapters.length - 1),
      pos: [3.05, -2, 10 - index * 6] as [number, number, number],
      look: [3.05, -2, -index * 6] as [number, number, number],
    })))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frameId = 0
    let previous = performance.now()
    let pointerX = 0
    let pointerCurrentX = 0
    let running = true

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth) * 2 - 1
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const resize = () => {
      const width = host.clientWidth || window.innerWidth
      const height = host.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.fov = width <= 760 ? 55 : 38
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
      const px = Math.min(window.devicePixelRatio || 1, governor.px)
      renderer.setPixelRatio(px)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    window.addEventListener('resize', resize, { passive: true })
    resize()

    document.documentElement.classList.remove('webgl-unavailable')
    const stopWhenHidden = visibilityGate(host, (visible) => { running = visible })

    const palette = chapters.map((chapter) => new THREE.Color(chapter.accent).lerp(new THREE.Color('#13120f'), 0.83))
    const clock = new THREE.Clock()
    const render = (now: number) => {
      frameId = requestAnimationFrame(render)
      if (!running) return
      const elapsed = Math.min(clock.getDelta(), 0.05)
      const frameMs = Math.min(now - previous, 100)
      previous = now
      if (!reduceMotion) {
        const newPixelRatio = governor.sample(now, frameMs)
        if (newPixelRatio !== null) renderer.setPixelRatio(newPixelRatio)
      }
      progress.update(reduceMotion ? 0 : elapsed)
      const value = reduceMotion ? (progress.value = progress.raw) : progress.value
      const normalized = Math.max(0, Math.min(1, value))
      const chapterPosition = normalized * (chapters.length - 1)
      const currentIndex = Math.floor(chapterPosition)
      const nextIndex = Math.min(chapters.length - 1, currentIndex + 1)
      const mix = chapterPosition - currentIndex
      const backdrop = palette[currentIndex].clone().lerp(palette[nextIndex], mix)
      scene.background = backdrop
      if (scene.fog instanceof THREE.FogExp2) scene.fog.color.copy(backdrop)
      key.color.copy(palette[currentIndex])
      const compact = window.innerWidth <= 760
      const cameraBeats = compact ? beatsCompact : beatsDesktop
      cameraBeats.apply(camera, normalized)
      pointerCurrentX += (pointerX - pointerCurrentX) * (reduceMotion ? 1 : Math.min(1, elapsed * 2.2))
      camera.position.x += pointerCurrentX * (reduceMotion || compact ? 0 : 0.075)
      const outgoingOpacity = nextIndex === currentIndex ? 1 : 1 - smoothstep(0.2, 0.7, mix)
      const incomingOpacity = smoothstep(0.3, 0.8, mix)
      imageMaterials.forEach((material, index) => {
        const imageOpacity = index === currentIndex ? outgoingOpacity : index === nextIndex ? incomingOpacity : 0
        const frameOpacity = index === currentIndex ? 1 - smoothstep(0.2, 0.92, mix) : index === nextIndex ? incomingOpacity : 0
        material.opacity = imageOpacity
        frameMaterials[index].opacity = frameOpacity
        imagePlanes[index].visible = Math.max(imageOpacity, frameOpacity) > 0.005
      })
      if (!reduceMotion) {
        imagePlanes.forEach((group, index) => {
          const distance = Math.abs(chapterPosition - index)
          group.rotation.y = Math.sin(pointerCurrentX * 0.4) * 0.018 * Math.max(0, 1 - distance)
        })
        particles.rotation.z = Math.sin(now * 0.00005) * 0.025
      }
      renderer.render(scene, camera)
    }
    frameId = requestAnimationFrame(render)

    return () => {
      disposed = true
      cancelAnimationFrame(frameId)
      stopWhenHidden()
      progress.dispose()
      resizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.classList.remove('webgl-unavailable')
      imageMaterials.forEach((material) => {
        material.map?.dispose()
        material.dispose()
      })
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) object.geometry.dispose()
      })
      frameMaterials.forEach((material) => material.dispose())
      haloMaterials.forEach((material) => material.dispose())
      particleMaterial.dispose()
      renderer.dispose()
      canvas.remove()
    }
  }, [runway])

  return <div className="timeline-canvas" ref={hostRef} aria-hidden="true" />
}
