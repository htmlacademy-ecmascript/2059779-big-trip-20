import { OFFER_TYPES } from '../const.js';
import { createElement } from '../render.js';
import { formatDate, capitalizeFirstLetter } from '../utils.js';

function createTypesSelectList(offerTypes, eventType) {
  const offerType = (offerTypes.length === 0) ? '' :
    offerTypes.map((type) =>
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === eventType) ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
      </div>`).join('');
  return (/*html*/
    `<div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${eventType}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          ${offerType}
        </fieldset>
      </div>
    </div>`);
}

function createDestinationPhotos(pictures) {
  const picturesList = pictures.length === 0 ? '' :
    pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  return `<div class="event__photos-tape">${picturesList}</div>`;
}

function createEventOffersList(offers, selectedOffers) {
  const offersList = offers.length === 0 ? '' :
    offers.map((offer) =>
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${selectedOffers.includes(offer) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
    </div>`).join('');
  return `<div class="event__available-offers">${offersList}</div>`;
}

function createAddNewEventTemplate(event, destinations, options) {
  const eventTitle = event.destination;
  const type = event.type;
  const description = (destinations.length > 0) ? destinations.find((destination) => destination.name === eventTitle).description : 'Неописуемая красота.';
  const eventPhotos = (destinations.length > 0) ? destinations.find((destination) => destination.name === eventTitle).pictures : [];
  const allOffers = options.find((option) => option.type === type).offers;
  const selectedOffers = event.offers;
  const timeFrom = formatDate(event.dateFrom, 'DD/MM/YY hh:mm');
  const timeTo = formatDate(event.dateTo, 'DD/MM/YY hh:mm');
  const pictures = createDestinationPhotos(eventPhotos);
  const offersList = createEventOffersList(allOffers, selectedOffers);
  const offerTypes = OFFER_TYPES;

  return (/*html*/
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
            ${createTypesSelectList(offerTypes, type)}
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalizeFirstLetter(type)}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${eventTitle}" list="destination-list-1">
            <datalist id="destination-list-1">
              <option value="${eventTitle}"></option>
              <option value="${eventTitle}"></option>
              <option value="${eventTitle}"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${timeFrom}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${timeTo}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersList}
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
}

export default class AddNewPointView {
  constructor(event, destinations, options) {
    this.event = event;
    this.destinations = destinations;
    this.options = options;
  }

  getTemplate() {
    return createAddNewEventTemplate(this.event, this.destinations, this.options);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
