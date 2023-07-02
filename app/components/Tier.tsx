'use client';

import { useState, useEffect } from 'react';

export default function Tier({ animeList }: { animeList: Object[] }) {
  let scores: { [key: string]: any[] } = {};
  animeList.forEach((anime: any) => {
    scores[anime.score as keyof typeof scores]
      ? scores[anime.score as keyof typeof scores].push(anime)
      : (scores[anime.score as keyof typeof scores] = [anime]);
  });

  const getCols = () => {
    return 'grid-cols-' + scale;
  };
  const [showUnscored, setShowUnscored] = useState(false);
  const [scale, setScale] = useState(12);

  useEffect(() => {
    console.log(scale);
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
            setScale(Math.min(scale + 1, 30));
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
            .reverse()
            .map((score, index) => {
              return (
                <tr
                  key={index}
                  className={`grid gap-0
                    ${getCols()}
                     text-white text-xs md:text-lg`}
                >
                  <div className=" p-5 md:text-3xl bg-gray-800  col-span-full ">
                    {parseInt(score) ? `Scored ${score}` : 'Not Scored'} ({scores[score].length})
                    {score === '0' && (
                      <button
                        className="flex mt-2 bg-blue-700 border border-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                        onClick={(e) => setShowUnscored(!showUnscored)}
                      >
                        Show Unscored
                      </button>
                    )}
                  </div>
                  {scores[score].map((anime, index) => {
                    return (
                      <td
                        key={anime?.animeId}
                        className={`group w-auto h-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  ${
                          showUnscored && score === '0' ? 'hidden' : ''
                        }`}
                      >
                        <a
                          className="relative inline text-blue-200 text-xs flex text-center justify-center align-middle content-center  "
                          href={'https://myanimelist.net' + anime?.animeUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <p
                            className={`absolute flex h-full items-center invisible group-hover:visible z-5 ${
                              scale > 20 && 'break-all'
                            }`}
                          >
                            {anime?.animeTitle}
                            {score === '0' &&
                              ' - ' +
                                [
                                  'Watching',
                                  'Completed',
                                  'Hold',
                                  'Dropped',
                                  'Re-Watching',
                                  'Planning',
                                ][anime?.status - 1]}
                          </p>
                          <img
                            className="h-full group-hover:opacity-20 z-5"
                            src={anime?.animeImagePath}
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