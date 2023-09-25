'use client';

import { useState, useEffect } from 'react';

export default function Tier({ animeList }: { animeList: Object[] }) {
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('name');

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
    console.log('Scale: ' + scale);
  }, [scale]);

  return (
    <>
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
            setScale(Math.min(scale + 1, 36));
          }}
        >
          +
        </button>
        <div className="flex items-center">
          <div className={`${!animeList.length && 'hidden'}`}>
            <select
              id="genre"
              className="ml-2 p-2 border-l-gray-700 border-l-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 font-sans"
              onChange={(e) => setFilterType(e.target.value)}
              defaultValue={'all'}
            >
              <option value="all">All</option>
              <option value="tv">TV</option>
              <option value="movie">Movie</option>
              <option value="ova">OVA</option>
              <option value="ona">ONA</option>
            </select>
            <select
              id="genre"
              className="ml-2 p-2 border-l-gray-700 border-l-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 font-sans"
              onChange={(e) => setSortBy(e.target.value)}
              defaultValue={'name'}
            >
              <option value="name">Title</option>
              <option value="time">Release</option>
            </select>
            <button
              className="ml-2 p-2 border-l-gray-700 border-l-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 font-sans"
              onClick={(e) => setShowUnscored(!showUnscored)}
            >
              {showUnscored ? 'Hiding' : 'Showing'} Unscored
            </button>
          </div>
        </div>
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
                  {scores[score]
                    .toSorted((a, b) =>
                      sortBy === 'name'
                        ? a?.node?.title - b?.node?.title
                        : Date.parse(a?.node?.start_date) - Date.parse(b?.node?.start_date)
                    )
                    .map((anime, index) => {
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
