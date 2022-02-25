import { useEffect, useState } from 'react'
import { BodyInterface, StarInterface } from '../types'

export function useFetchData() {
  const [{ planets, stars, loading, error }, setState] = useState<{
    planets: BodyInterface[]
    stars: StarInterface[]
    loading: boolean
    error: string
  }>({
    planets: [],
    stars: [],
    loading: false,
    error: '',
  })

  const fetchPlanets = async () => {
    const planetData = await fetch(`https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,eq,true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const planets = await planetData.json()

    return planets.bodies
  }

  const fetchStars = async () => {
    const starData = await fetch(`https://api.le-systeme-solaire.net/rest/bodies?filter[]=bodyType,eq,Star`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const stars = await starData.json()

    return stars.bodies
  }

  useEffect(() => {
    setState(prev => ({
      ...prev,
      loading: true,
    }))

    fetchPlanets()
      .then(planets => {
        setState(prev => ({
          ...prev,
          planets,
          loading: false,
        }))
      })
      .catch(error => {
        setState(prev => ({
          ...prev,
          loading: false,
        }))
      })

    fetchStars()
      .then(stars => {
        setState(prev => ({
          ...prev,
          stars,
          loading: false,
        }))
      })
      .catch(error => {
        setState(prev => ({
          ...prev,
          loading: false,
        }))
      })
  }, [])

  return {
    planets,
    stars,
    loading,
    error,
  }
}
