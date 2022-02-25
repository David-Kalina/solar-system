import { Physics } from '@react-three/cannon'
import { FlyControls, OrbitControls, Stars } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useCallback, useEffect, useRef } from 'react'

import * as THREE from 'three'
import { useFetchData } from './hooks/fetchData'
import { BodyInterface, OrbitInterface, PlanetInterface, StarInterface } from './types'

const clock = new THREE.Clock()

clock.start()

const scale = 1 / 1000000

const calculateEllipsesRadi = (semiMajorAxis: number, eccentricity: number) => {
  const a = semiMajorAxis * scale
  const b = a * Math.sqrt(1 - Math.pow(eccentricity, 2))

  console.log(a, b)
  return {
    a,
    b,
  }
}

function Orbit({ semimajorAxis, perihelion, aphelion, eccentricity, inclination }: OrbitInterface) {
  const ref = useRef()

  const onUpdate = useCallback(
    self => {
      const { a, b } = calculateEllipsesRadi(semimajorAxis, eccentricity)

      const curve = new THREE.EllipseCurve(
        0,
        0,
        a,
        b,
        0,
        Math.PI * 2,
        false,

        0
      )
      const points = curve.getPoints(50)

      self.setFromPoints(points)
    },
    [eccentricity, semimajorAxis]
  )

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <bufferGeometry attach="geometry" onUpdate={onUpdate} />
      <lineBasicMaterial side={THREE.DoubleSide} linewidth={10} attach="material" color="red" />
    </mesh>
  )
}

function Planet({ details }: PlanetInterface) {
  const ref = useRef<any>()

  useFrame(() => {
    const x = Math.cos(clock.getElapsedTime()) * (details?.semimajorAxis as number) * scale
    const y = Math.sin(clock.getElapsedTime()) * (details?.semimajorAxis as number) * scale
    const z = 0

    if (ref.current) ref.current.position.set(x, y, z)
  })

  const offset = (details?.semimajorAxis as number) * scale - (details?.perihelion as number) * scale

  return (
    <group position={[offset, 0, 0]}>
      <mesh ref={ref}>
        <sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
        <meshStandardMaterial attach="material" color="grey" />
      </mesh>
      <Orbit
        perihelion={details?.perihelion as number}
        aphelion={details?.aphelion as number}
        eccentricity={details?.eccentricity as number}
        inclination={details?.inclination as number}
        semimajorAxis={details?.semimajorAxis as number}
      />
    </group>
  )
}

function Star({ details, planets }: { details: BodyInterface; planets: JSX.Element[] }) {
  const ref = useRef<any>()

  return (
    <group ref={ref}>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[details.meanRadius * scale, 32, 32]} />
        <meshStandardMaterial attach="material" color="yellow" />
      </mesh>
      {planets}
    </group>
  )
}

const SolarSystem = ({ stars }: { stars: JSX.Element[] }) => {
  return (
    <group>
      {/* <Stars /> */}
      <OrbitControls />
      <FlyControls />
      <ambientLight intensity={0.5} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      {/* <Physics>{stars}</Physics> */}
      {stars}
    </group>
  )
}

function Space() {
  const { planets, stars, loading, error } = useFetchData()

  console.log(planets)

  const renderPlanets = planets
    // ?.filter(planet => planet.englishName === 'Mercury')
    .map((planet, index) => {
      return <Planet key={index} details={planet as BodyInterface} />
    })

  const renderStars = stars?.map((star, index) => {
    return <Star key={index} details={star as BodyInterface} planets={renderPlanets} />
  })

  return (
    <Canvas>
      {/* <pointLight position={[10, 10, 10]} /> */}
      <SolarSystem stars={renderStars} />
    </Canvas>
  )
}

export default Space
