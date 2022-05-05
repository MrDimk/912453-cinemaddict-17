const LOREM = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Id velit ut tortor pretium viverra.',
  'Netus et malesuada fames ac turpis egestas sed tempus urna.',
  'Commodo viverra maecenas accumsan lacus vel facilisis.',
  'Est velit egestas dui id ornare arcu.',
  'Placerat in egestas erat imperdiet sed.',
  'Aliquam sem fringilla ut morbi tincidunt augue interdum velit euismod.',
  'Tristique magna sit amet purus gravida quis blandit turpis.',
  'Sapien faucibus et molestie ac feugiat sed lectus.',
  'Et netus et malesuada fames ac turpis egestas maecenas pharetra.'
];
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];
const POSTERS = [
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/made-for-each-other.png',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg'
];
const NAMES = [
  'Reid Efrain', 'Rocco Fred', 'Emmerson Darius', 'Roger Denzel', 'Sergio Edison', 'Braeden Ziggy', 'Mikey Neal', 'Lenny Winston', 'Kevin lijah', 'Baylor Cecil',
  'Alice Starla', 'Zelida Millicent', 'Selina Gloria', 'Liv Aoife', 'Shea Ayisha', 'Ginnie Bronte', 'Emely Jaya', 'Xochitl Kirstin', 'Flick Johanna', 'Adeline Sariya'
];
const TITLES = [
  'The Man with the Golden Arm',
  'The Dance of Life',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'Santa Claus Conquers the Martians',
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
];
const COUNTRIES = ['Greece', 'Laos', 'Brunei', 'Somalia', 'Suriname Belize', 'Jamaica', 'Austria', 'Mozambique', 'Georgia', 'Guinea', 'Hungary'];
const GENRES = [
  'Newspaper',
  'Crime drama',
  'Romantic drama',
  'Humor',
  'Mythology',
  'Romance',
  'Biography',
  'Puppetry',
  'Romance Drama',
  'Psychological'
];

// Генераторы значений
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getMockText = (sentencesCount) => Array.from({length: sentencesCount}).reduce((text) => `${text} ${LOREM[randomInt(0, LOREM.length - 1)]}`, LOREM[randomInt(0, LOREM.length - 1)]);
const getMockFromArray = (array) => array[randomInt(0, array.length - 1)];
const getDateInPast = () => new Date(randomInt(1, 1600000000000)).toISOString();

class MockService {
  static #counterID = 0;

  constructor(filmsCount, commentsCount) {
    this.comments = [];
    Array.from({length: commentsCount}).forEach(() => this.comments.push(this.generateComment()));

    this.films = [];
    Array.from({length: filmsCount}).forEach(() => this.films.push(this.generateFilmData()));
  }

  generateComment() {
    return {
      id: MockService.#counterID++,
      author: getMockFromArray(NAMES),
      comment: getMockFromArray(LOREM),
      date: getDateInPast(),
      emotion: getMockFromArray(EMOTIONS)
    };
  }

  generateLocalComment() {
    return {
      comment: getMockText(1),
      emotion: getMockFromArray(EMOTIONS)
    };
  }

  generateFilmData() {
    const isWatched = Boolean(Math.round(Math.random()));

    return {
      id: MockService.#counterID++,
      comments: this.comments.filter(() => Math.round(Math.random())).map((comment) => comment.id),
      'film_info': {
        title: getMockFromArray(TITLES),
        'alternative_title': getMockFromArray(TITLES),
        'total_rating': ((randomInt(40, 100) / randomInt(10, 20)).toFixed(1)),
        poster: getMockFromArray(POSTERS),
        'age_rating': randomInt(0, 18),
        director: getMockFromArray(NAMES),
        writers: [
          getMockFromArray(NAMES)
        ],
        actors: [
          getMockFromArray(NAMES),
          getMockFromArray(NAMES),
        ],
        release: {
          date: getDateInPast(),
          'release_country': getMockFromArray(COUNTRIES)
        },
        runtime: randomInt(60, 180),
        genre: [
          getMockFromArray(GENRES),
          getMockFromArray(GENRES)
        ],
        description: getMockText(4),
      },
      'user_details': {
        watchlist: !isWatched,
        'already_watched': isWatched,
        'watching_date': isWatched ? getDateInPast() : '',
        favorite: isWatched ? Boolean(Math.round(Math.random())) : false
      }
    };
  }
}

export {MockService};
