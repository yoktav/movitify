export const responseMovies = {
  searchByQuery: () => {
    const result = {
      query: 'Batman',
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
            'Tragedy strikes the Batmans life again when Robin Jason Todd tracks down his birth mother only to run afoul of the Joker. An adaptation of the 1988 comic book storyline of the same name.',
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
  searchById: () => {
    const result = {
      adult: false,
      backdrop_path: '/jlxDtvmdniVlnGDaDWIrlCiDNpj.jpg',
      belongs_to_collection: null,
      budget: 0,
      genres: [
        { id: 16, name: 'Animation' },
        { id: 28, name: 'Action' },
        { id: 12, name: 'Adventure' },
        { id: 80, name: 'Crime' },
        { id: 14, name: 'Fantasy' },
      ],
      homepage: 'https://www.warnerbros.com/movies/batman-soul-dragon',
      id: 732450,
      imdb_id: 'tt12885852',
      original_language: 'en',
      original_title: 'Batman: Soul of the Dragon',
      overview:
        'Bruce Wayne faces a deadly menace from his past, with the help of three former classmates: world-renowned martial artists Richard Dragon, Ben Turner and Lady Shiva.',
      popularity: 354.975,
      poster_path: '/uDhnTtSxU5a8DtZdbbin3aZmkmU.jpg',
      production_companies: [
        {
          id: 2785,
          logo_path: '/l5zW8jjmQOCx2dFmvnmbYmqoBmL.png',
          name: 'Warner Bros. Animation',
          origin_country: 'US',
        },
        {
          id: 9993,
          logo_path: '/2Tc1P3Ac8M479naPp1kYT3izLS5.png',
          name: 'DC Entertainment',
          origin_country: 'US',
        },
        {
          id: 429,
          logo_path: '/2Tc1P3Ac8M479naPp1kYT3izLS5.png',
          name: 'DC Comics',
          origin_country: 'US',
        },
        {
          id: 14772,
          logo_path: null,
          name: 'Warner Bros. Home Entertainment Group',
          origin_country: '',
        },
      ],
      production_countries: [{ iso_3166_1: 'US', name: 'United States of America' }],
      release_date: '2021-01-12',
      revenue: 0,
      runtime: 83,
      spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
      status: 'Released',
      tagline: 'Get ready for the ultimate showdown.',
      title: 'Batman: Soul of the Dragon',
      video: false,
      vote_average: 7.1,
      vote_count: 111,
    };

    return result;
  },
};
