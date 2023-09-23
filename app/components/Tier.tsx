'use client';

import { useState, useEffect } from 'react';

export default function Tier({ animeList }: { animeList: Object[] }) {
  const [filterType, setFilterType] = useState('all');

  let scores: { [key: string]: any[] } = {};
  animeList.forEach((anime: any) => {
    if (filterType == 'all' || anime.node.media_type === filterType) {
      if (anime.list_status.score === 0) {
        scores[anime.list_status.status as keyof typeof scores]
          ? scores[anime.list_status.status as keyof typeof scores].push(anime)
          : (scores[anime.list_status.status as keyof typeof scores] = [anime]);
      } else {
        scores[anime.list_status.score as keyof typeof scores]
          ? scores[anime.list_status.score as keyof typeof scores].push(anime)
          : (scores[anime.list_status.score as keyof typeof scores] = [anime]);
      }
    }
  });

  const getCols = () => {
    return 'grid-cols-' + scale;
  };
  const [showUnscored, setShowUnscored] = useState(false);
  const [scale, setScale] = useState(
    typeof window !== 'undefined' && window.innerWidth < 800 ? 4 : 18
  );

  useEffect(() => {
    console.log(scale);
    console.log(animeList);
  }, [scale]);

  return (
    <>
      <div className="mb-2">
        <div className={`${!animeList.length && 'hidden'}`}>
          Format
          <select
            id="genre"
            className=" ml-2 p-2 border-l-gray-700 border-l-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 font-sans"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all" selected>
              All
            </option>
            <option value="tv">TV</option>
            <option value="movie">Movie</option>
            <option value="ova">OVA</option>
            <option value="ona">ONA</option>
          </select>
          <button
            className="flex mt-2 bg-blue-700 border border-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
            onClick={(e) => setShowUnscored(!showUnscored)}
          >
            {showUnscored ? 'Hide' : 'Show'} Unscored
          </button>
        </div>
      </div>

      <div
        className={` ${!animeList.length && 'hidden'} sticky top-0 flex flex-row z-50 bg-slate-800`}
      >
        <button
          className="w-[55px] h-[55px] mr-1  bg-gray-800"
          onClick={(e) => {
            setScale(4);
          }}
        >
          Lg
        </button>
        <button
          className="w-[55px] h-[55px]  mr-1  bg-gray-800"
          onClick={(e) => {
            setScale(12);
          }}
        >
          Md
        </button>
        <button
          className="w-[55px] h-[55px]  mr-1  bg-gray-800"
          onClick={(e) => {
            setScale(24);
          }}
        >
          Sm
        </button>
        <button
          className="w-[55px] h-[55px]  mr-1  bg-gray-800"
          onClick={(e) => {
            setScale(Math.max(scale - 1, 1));
          }}
        >
          -
        </button>
        <button
          className="w-[55px] h-[55px]   bg-gray-800"
          onClick={(e) => {
            setScale(Math.min(scale + 1, 32));
          }}
        >
          +
        </button>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {Object.keys(scores)
            .sort((a, b) => parseInt(b) - parseInt(a))
            .map((score, index) => {
              return (
                <tr
                  key={index}
                  className={`grid gap-0
                    ${getCols()}
                     text-white text-xs md:text-lg`}
                >
                  <div className=" p-5 md:text-3xl bg-gray-800  col-span-full ">
                    {parseInt(score)
                      ? `Scored ${score}`
                      : `Not Scored: ${score.replaceAll('_', ' ')}`}{' '}
                    ({scores[score].length})
                  </div>
                  {scores[score].map((anime, index) => {
                    return (
                      <td
                        key={anime?.node?.id}
                        className={`group   ${!parseInt(score) && !showUnscored ? 'hidden' : ''}`}
                      >
                        <a
                          className="h-full w-auto relative  text-xs flex text-center justify-center bg-black"
                          href={'https://myanimelist.net/anime/' + anime?.node?.id}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <p
                            className={`absolute flex h-full items-center text-transparent group-hover:text-blue-200 z-5  ${
                              scale > 20 && ''
                            }`}
                          >
                            {anime?.node?.title}
                          </p>
                          <img
                            className="group-hover:opacity-20 z-5 aspect-[2/3]"
                            src={anime?.node?.main_picture?.large}
                          ></img>
                        </a>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
