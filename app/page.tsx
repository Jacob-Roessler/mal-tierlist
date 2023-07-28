'use client';
import { useState, useEffect } from 'react';
import Tier from './components/Tier';
import { GridLoader } from 'react-spinners';

export default function Page({ name }: { name: string }) {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(name ? name : '');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (username) {
      setList();
    }
  }, []);

  const setList = async () => {
    setAnimeList([]);
    setLoading(true);
    const res = await fetch(`/api/list/${username}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res.status);
    if (res.status === 404) {
      setUsername('Invalid Username');
      setLoading(false);
      return;
    }
    const data = await res.json();
    setError(data.length === 0);
    console.log(data);
    setAnimeList(data);
    setLoading(false);
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.length) {
      return;
    }
    setList();
  };

  const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    let entered = (e.target as HTMLInputElement).value;
    setError(false);
    setUsername(entered);
  };

  return (
    <main className="">
      <div className="">
        <h1 className="text-2xl p-5 bg-gray-800">MAL Tierlist</h1>
        <form onSubmit={submitHandler} className="lg:px-10 my-4 ">
          <input
            placeholder="Enter MAL username"
            className="text-base w-full  md:w-[300px] bg-gray-50 inline border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
            onChange={inputHandler}
            value={username}
          ></input>
          <button
            formAction={'submit'}
            className="w-full md:w-[120px] block md:inline text-white bg-blue-700 border border-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-base px-1 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
          >
            Get Tierlist
          </button>
          {username === 'Invalid Username' && <div>Error Invalid Username</div>}
        </form>
        {loading ? (
          <div className="flex items-center justify-center w-full h-full">
            <GridLoader
              color={'#1f2937'}
              loading={loading}
              size={40}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <div className="md:px-10 md:py-10">
            {!error ? (
              <Tier animeList={animeList} />
            ) : (
              <div className="bg-gray-800 rounded-md w-1/4 p-6">Nothing Found For: {username}</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
