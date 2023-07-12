'use client';

import { useState, useEffect } from 'react';

export default function Tier({ animeList }: { animeList: Object[] }) {
  let scores: { [key: string]: any[] } = {};
  animeList.forEach((anime: any) => {
    scores[anime.list_status.score as keyof typeof scores]
      ? scores[anime.list_status.score as keyof typeof scores].push(anime)
      : (scores[anime.list_status.score as keyof typeof scores] = [anime]);
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
                        key={anime?.node?.id}
                        className={`group w-auto h-auto${
                          score == '0' && !showUnscored ? 'hidden' : ''
                        }`}
                      >
                        <a
                          className="h-full w-auto relative  text-xs flex text-center justify-center bg-black "
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
                            {score === '0' &&
                              ' - ' + anime?.list_status.status.replaceAll('_', ' ')}
                          </p>
                          <img
                            className="group-hover:opacity-20 z-5"
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
