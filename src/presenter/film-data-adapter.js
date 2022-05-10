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
    const info = filmData['film_info'];
    const details = filmData['user_details'];

    this.#title = info.title;
    this.#rating = info['total_rating'];
    this.#releaseYear = dayjs(info.release.date).format('YYYY');
    this.#duration = this.formatDuration(info.runtime);
    this.#genre = info.genre[0];
    this.#poster = info.poster;
    this.#shortDescription = `${info.description.slice(0, DESCRIPTION_MAX_LENGTH - 3)}...`;
    this.#comments = this.formatCommentsCount(filmData.comments.length);

    this.#watchlist = details.watchlist;
    this.#watched = details['already_watched'];
    this.favorite = details.favorite;

    this.#director = info.director;
    this.#writers = info.writers.join(', ');
    this.#actors = info.actors.join(', ');
    this.#releaseDate = dayjs(info.release.date).format('D MMMM YYYY');
    this.#country = info.release['release_country'];
    this.#genres = info.genre;
    this.#description = info.description;
    this.#age = info['age_rating'];
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
