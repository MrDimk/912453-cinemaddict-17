import dayjs from 'dayjs';

const DESCRIPTION_MAX_LENGTH = 140;

class FilmDataAdapter {
  #title;
  #rating;
  #releaseYear;
  #duration;
  #genre;
  #poster;
  #shortDescription;
  #comments;
  #watchlist;
  #watched;
  #director;
  #writers;
  #actors;
  #releaseDate;
  #country;
  #genres;
  #description;
  #age;

  constructor(filmData) {
    this.#title = filmData['film_info'].title;
    this.#rating = filmData['film_info']['total_rating'];
    this.#releaseYear = dayjs(filmData['film_info'].release.date).format('YYYY');
    this.#duration = this.formatDuration(filmData['film_info'].runtime);
    this.#genre = filmData['film_info'].genre[0];
    this.#poster = filmData['film_info'].poster;
    this.#shortDescription = `${filmData['film_info'].description.slice(0, DESCRIPTION_MAX_LENGTH - 3)}...`;
    this.#comments = this.formatCommentsCount(filmData.comments.length);

    this.#watchlist = filmData['user_details'].watchlist;
    this.#watched = filmData['user_details']['already_watched'];
    this.favorite = filmData['user_details'].favorite;

    this.#director = filmData['film_info'].director;
    this.#writers = filmData['film_info'].writers.join(', ');
    this.#actors = filmData['film_info'].actors.join(', ');
    this.#releaseDate = dayjs(filmData['film_info'].release.date).format('D MMMM YYYY');
    this.#country = filmData['film_info'].release['release_country'];
    this.#genres = filmData['film_info'].genre;
    this.#description = filmData['film_info'].description;
    this.#age = filmData['film_info']['age_rating'];
  }

  get title () {
    return this.#title;
  }

  get rating () {
    return this.#rating;
  }

  get releaseYear () {
    return this.#releaseYear;
  }

  get duration () {
    return this.#duration;
  }

  get genre () {
    return this.#genre;
  }

  get poster () {
    return this.#poster;
  }

  get shortDescription () {
    return this.#shortDescription;
  }

  get comments () {
    return this.#comments;
  }

  get watchlist () {
    return this.#watchlist;
  }

  get watched () {
    return this.#watched;
  }

  get director () {
    return this.#director;
  }

  get writers () {
    return this.#writers;
  }

  get actors () {
    return this.#actors;
  }

  get releaseDate () {
    return this.#releaseDate;
  }

  get country () {
    return this.#country;
  }

  get genres () {
    return this.#genres;
  }

  get description () {
    return this.#description;
  }

  get age () {
    return this.#age;
  }

  formatDuration(minutes) {
    const h = (minutes / 60).toFixed(0);
    const m = (minutes % 60);
    return `${h}h ${m}m`;
  }

  formatCommentsCount(commentsCount) {
    return commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;
  }
}

export {FilmDataAdapter};
