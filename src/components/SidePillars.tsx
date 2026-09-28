import { useLocation } from 'react-router-dom'

export function SidePillars() {
  const { pathname } = useLocation()
  
  // Do not show on the home page
  if (pathname === '/') return null

  return (
    <>
      <svg className="side-pillar side-pillar--left" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        {/* Pillar silhouette / Fill */}
        <path d="
          M0,0 
          L90,0 L90,15 
          Q80,25 70,35 
          Q100,55 70,85 
          L85,85 L85,95 L65,95 
          Q50,130 45,160
          L45,400 L60,420 L60,580 L45,600
          L45,820
          L65,850 L75,870
          L95,870 L95,890 L85,890
          Q110,920 85,950
          L85,975 L100,975 L100,1000
          L0,1000 Z
        " fill="var(--gate-tint)" />

        {/* Main Outer Profile Line */}
        <path d="
          M0,0 
          L90,0 L90,15 
          Q80,25 70,35 
          Q100,55 70,85 
          L85,85 L85,95 L65,95 
          Q50,130 45,160
          L45,400 L60,420 L60,580 L45,600
          L45,820
          L65,850 L75,870
          L95,870 L95,890 L85,890
          Q110,920 85,950
          L85,975 L100,975 L100,1000
        " fill="none" stroke="var(--gate-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        {/* Horizontal Carving Bands (Capital) */}
        <path d="M0,15 L90,15 M0,35 L70,35 M0,85 L85,85 M0,95 L65,95 M0,160 L45,160" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        
        {/* Horizontal Carving Bands (Base) */}
        <path d="M0,820 L45,820 M0,850 L65,850 M0,870 L75,870 M0,890 L85,890 M0,950 L85,950 M0,975 L100,975" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        {/* Shaft Fluting (Vertical Lines) */}
        <path d="M15,160 L15,400 M30,160 L30,400" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M15,600 L15,820 M30,600 L30,820" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        {/* Central Block Motif (Y=400 to 600) */}
        <path d="M0,420 L60,420 M0,580 L60,580" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M0,440 L40,440 M0,560 L40,560" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {/* Lotus / Diamond in center block */}
        <path d="M0,500 L30,470 L55,500 L30,530 Z" fill="none" stroke="var(--gate-line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <path d="M0,500 L20,485 L40,500 L20,515 Z" fill="none" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      
      <svg className="side-pillar side-pillar--right" viewBox="0 0 100 1000" preserveAspectRatio="none" aria-hidden="true">
        {/* Pillar silhouette / Fill */}
        <path d="
          M0,0 
          L90,0 L90,15 
          Q80,25 70,35 
          Q100,55 70,85 
          L85,85 L85,95 L65,95 
          Q50,130 45,160
          L45,400 L60,420 L60,580 L45,600
          L45,820
          L65,850 L75,870
          L95,870 L95,890 L85,890
          Q110,920 85,950
          L85,975 L100,975 L100,1000
          L0,1000 Z
        " fill="var(--gate-tint)" />

        {/* Main Outer Profile Line */}
        <path d="
          M0,0 
          L90,0 L90,15 
          Q80,25 70,35 
          Q100,55 70,85 
          L85,85 L85,95 L65,95 
          Q50,130 45,160
          L45,400 L60,420 L60,580 L45,600
          L45,820
          L65,850 L75,870
          L95,870 L95,890 L85,890
          Q110,920 85,950
          L85,975 L100,975 L100,1000
        " fill="none" stroke="var(--gate-line)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

        {/* Horizontal Carving Bands (Capital) */}
        <path d="M0,15 L90,15 M0,35 L70,35 M0,85 L85,85 M0,95 L65,95 M0,160 L45,160" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        
        {/* Horizontal Carving Bands (Base) */}
        <path d="M0,820 L45,820 M0,850 L65,850 M0,870 L75,870 M0,890 L85,890 M0,950 L85,950 M0,975 L100,975" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        {/* Shaft Fluting (Vertical Lines) */}
        <path d="M15,160 L15,400 M30,160 L30,400" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M15,600 L15,820 M30,600 L30,820" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

        {/* Central Block Motif (Y=400 to 600) */}
        <path d="M0,420 L60,420 M0,580 L60,580" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M0,440 L40,440 M0,560 L40,560" stroke="var(--gate-line-faint)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {/* Lotus / Diamond in center block */}
        <path d="M0,500 L30,470 L55,500 L30,530 Z" fill="none" stroke="var(--gate-line)" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <path d="M0,500 L20,485 L40,500 L20,515 Z" fill="none" stroke="var(--gate-line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  )
}
