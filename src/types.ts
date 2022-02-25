export interface BodyInterface {
  id: string
  name: string
  englishName: string
  isPlanet: boolean
  moons: any[]
  semimajorAxis: number
  perihelion: number
  aphelion: number

  eccentricity: number
  inclination: number
  mass: {
    value: number
    exponent: number
  }
  volume: {
    value: number
    exponent: number
  }
  density: number
  gravity: number
  escape: number
  meanRadius: number
  equatorialRadius: number
  polarRadius: number
  flattening: number
  dimension: string
  sideralOrbit: number
  sideralRotation: number
  axalTilt: number
  bodyType: 'Moon' | 'Planet' | 'Star'
}

export interface SolarSystemProps {
  star: BodyInterface
}

export interface StarInterface {
  details?: BodyInterface
  planets?: JSX.Element[]
}

export interface OrbitInterface {
  semimajorAxis: number
  perihelion: number
  aphelion: number
  eccentricity: number
  inclination: number
}
export interface PlanetInterface {
  details?: BodyInterface
}
