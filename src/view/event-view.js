import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { formatDate, getDateDiff } from '../utils/date.js';

function createEventViewOffersList(offers) {
  const offersList = offers.length === 0 ? '' :
    offers.map((offer) =>
      `<li class="event__offer">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
      </li>`).join('');
  return `<ul class="event__selected-offers">${offersList}</ul>`;
}

function createEventViewTemplate(event) {
  const { basePrice, destination, dateFrom, dateTo, type, isFavorite, offers } = event;
  const dayDateTimeAttribute = formatDate(dateFrom, 'YYYY-MM-DD');
  const dateFromDateTimeAttribute = formatDate(dateFrom, 'YYYY-MM-DD');
  const dateToDateTimeAttribute = formatDate(dateTo, 'YYYY-MM-DD');
  const startTime = formatDate(dateFrom, 'hh:mm');
  const finishTime = formatDate(dateTo, 'hh:mm');
  const startDate = formatDate(dateTo, 'MMM DD');
  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';
  const eventDuration = getDateDiff(dateTo, dateFrom);

  return (/*html*/
    `<li class="trip-events__item">
        <div class="event">
          <time class="event__date" datetime="${dayDateTimeAttribute}">${startDate}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${capitalizeFirstLetter(type)} ${destination}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${dateFromDateTimeAttribute}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${dateToDateTimeAttribute}">${finishTime}</time>
            </p>
            <p class="event__duration">${eventDuration}</p>
          </div>
          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
            ${createEventViewOffersList(offers)}
          <button class="${favoriteClassName}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`);
}

export default class EventView extends AbstractView {
  #event = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ event, onEditClick, onFavoriteClick }) {
    super();
    this.#event = event;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.favoriteButton = this.element.querySelector('.event__favorite-btn');
    this.favoriteButton.addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventViewTemplate(this.#event);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  //Не совсем понимаю, должна ли быть эта логика во View, а если нет, то как её передать. То есть я понимаю, что можно параметрами, но выглядит как-то избыточно. А ещё в макете фокус на кнопках неудачно оформлен.
  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
    this.favoriteButton.classList.toggle('event__favorite-btn--active');
  };
}
