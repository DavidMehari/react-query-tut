import axios from "axios"
import { useQueries } from "react-query"

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelQueriesPage = ({ heroIds }) => {
  
  const queryResults = useQueries(
    heroIds.map(heroId => {
      return {
        queryKey: ['superHero', heroId],
        queryFn: () => fetchSuperHero(heroId)
      }
    })
  )
  
    console.log({queryResults});

  return (
    <div>DynamicParallelQueries.page</div>
  )
}
