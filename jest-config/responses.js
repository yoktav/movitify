export const responseMovies = {
  searchByQuery: () => {
    const result = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/jvRewPpawHAfBW38EzHoFdTVEez.jpg',
          genre_ids: [16, 28, 12, 80, 14],
          id: 732450,
          original_language: 'en',
          original_title: 'Batman: Soul of the Dragon',
          overview:
            'Bruce Wayne faces a deadly menace from his past, with the help of three former classmates: world-renowned martial artists Richard Dragon, Ben Turner and Lady Shiva.',
          popularity: 243.19,
          poster_path: '/uDhnTtSxU5a8DtZdbbin3aZmkmU.jpg',
          release_date: '2021-01-12',
          title: 'Batman: Soul of the Dragon',
          video: false,
          vote_average: 7.1,
          vote_count: 104,
        },
        {
          adult: false,
          backdrop_path: '/kU7ZiyeUwcpTkYj3UcxSqGdZmxY.jpg',
          genre_ids: [16, 28],
          id: 618353,
          original_language: 'en',
          original_title: 'Batman: Death in the Family',
          overview:
            "Tragedy strikes the Batman's life again when Robin Jason Todd tracks down his birth mother only to run afoul of the Joker. An adaptation of the 1988 comic book storyline of the same name.",
          popularity: 193.493,
          poster_path: '/k8Q9ulyRE8fkvZMkAM9LPYMKctb.jpg',
          release_date: '2020-10-13',
          title: 'Batman: Death in the Family',
          video: false,
          vote_average: 7.3,
          vote_count: 185,
        },
      ],
      total_pages: 7,
      total_results: 125,
    };

    return result;
  },
};
