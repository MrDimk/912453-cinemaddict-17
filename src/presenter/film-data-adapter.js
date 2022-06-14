import dayjs from 'dayjs';

const DESCRIPTION_MAX_LENGTH = 140;

export default class FilmDataAdapter {
  constructor(filmData) {
    const info = filmData['film_info'];
    const details = filmData['user_details'];

    this.title = info.title;
    this.rating = info['total_rating'];
    this.releaseYear = dayjs(info.release.date).format('YYYY');
    this.duration = this.#formatDuration(info.runtime);
    this.genre = info.genre[0];
    this.poster = info.poster;
    this.shortDescription = `${info.description.slice(0, DESCRIPTION_MAX_LENGTH - 3)}...`;
    this.comments = this.#formatCommentsCount(filmData.comments.length);

    this.watchlist = details.watchlist;
    this.watched = details['already_watched'];
    this.favorite = details.favorite;

    this.director = info.director;
    this.writers = info.writers.join(', ');
    this.actors = info.actors.join(', ');
    this.releaseDate = dayjs(info.release.date).format('D MMMM YYYY');
    this.country = info.release['release_country'];
    this.genres = info.genre;
    this.description = info.description;
    this.age = info['age_rating'];
  }

  #formatDuration(minutes) {
    const h = (minutes / 60).toFixed(0);
    const m = (minutes % 60);
    return `${h}h ${m}m`;
  }

  #formatCommentsCount(commentsCount) {
    return commentsCount === 1 ? `${commentsCount} comment` : `${commentsCount} comments`;
  }
}
