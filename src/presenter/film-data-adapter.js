import dayjs from 'dayjs';

const DESCRIPTION_MAX_LENGTH = 140;

export default class FilmDataAdapter {
  static forCard(filmData) {
    const info = filmData['film_info'];
    return {
      'user_details': filmData['user_details'],
      title: info.title,
      poster: info.poster,
      rating: info['total_rating'],
      releaseYear: dayjs(info.release.date).format('YYYY'),
      duration: this.#formatDuration(info.runtime),
      genre: info.genre[0],
      shortDescription: `${info.description.slice(0, DESCRIPTION_MAX_LENGTH - 3)}...`,
      comments: this.#formatCommentsCount(filmData.comments.length)
    };
  }

  static forDetails(filmData) {
    const info = filmData['film_info'];
    return {
      'user_details': filmData['user_details'],
      title: info.title,
      rating: info['total_rating'],
      duration: this.#formatDuration(info.runtime),
      genres: info.genre,
      poster: info.poster,
      age: info['age_rating'],
      director: info.director,
      writers: info.writers.join(', '),
      actors: info.actors.join(', '),
      releaseDate: dayjs(info.release.date).format('D MMMM YYYY'),
      country: info.release['release_country'],
      description: info.description,
      comments: filmData.comments
    };
  }

  static #formatDuration(minutes) {
    const h = (minutes / 60).toFixed(0);
    const m = (minutes % 60);
    return `${h}h ${m}m`;
  }

  static #formatCommentsCount(commentsCount) {
    return commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;
  }
}
