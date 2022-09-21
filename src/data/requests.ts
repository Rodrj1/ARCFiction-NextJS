export const requests = {
  fetchWeekly: `
    https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.MOVIE_DB_API_KEY}`,
  fetchPopular: `
    https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.MOVIE_DB_API_KEY}&page=1`,
  fetchUpcoming: `
    https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`,
  fetchTopRated: `
    https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1`,
};
