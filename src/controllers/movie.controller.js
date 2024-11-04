import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrending = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    console.log(">>> movie: ", randomMovie);

    return res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log(">>> error in get trending movie: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMovieTrailer = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    return res.status(200).json({
      success: true,
      trailers: data,
    });
  } catch (error) {
    console.log(">>> error in get movie trailers: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMovieDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    return res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    console.log(">>> error in get movie trailers: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export async function getSimilarMovies(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function getMoviesByCategory(req, res) {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log(">>> error in getting movie by category: ", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
}
