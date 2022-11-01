import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAddSuperHeroData, useSuperHeroesData } from '../hooks/useSuperHeroesData';

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')
  
  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo }
    addHero(hero)
  }

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching');
    console.log(data);
  };

  const onError = (error) => {
    console.log('Perform side effect after encountering error');
    console.log(error);
  };

  const { isLoading, data, isError, error, refetch, isFetching } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate: addHero } = useAddSuperHeroData()

  if (isLoading) return <h2>Loading...</h2>;
  if (isFetching) return <h2>Fetching...</h2>;
  if (isError) return <h2>{error.message}</h2>;

  return (
    <>
      <h2>RQSuperHeroesPage</h2>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick} >Add hero</button>
      </div>


      <button onClick={refetch}>Fetch heroes</button>
      {data?.data.map((hero) => (
        <div key={hero.id}><Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link></div>
      ))}
      {/* {data.map((heroName) => {
        return <div key={heroName}>{heroName}</div>;
      })} */}
    </>
  );
};
