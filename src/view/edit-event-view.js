import { OFFER_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { formatDate } from '../utils/date.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createTypesSelectList(offerTypes, eventType) {
  const offerType = (offerTypes.length === 0) ? '' :
    offerTypes.map((type) =>
      `<div class="event__type-item">
        <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${(type === eventType) ? 'checked' : ''}>
        <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
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

function createDestinationsList(destinations) {
  const destinationsList = destinations.map((destination) =>
    `<option value="${destination.name}"></option>`).join('');
  return `<datalist id="destination-list-1">${destinationsList}</datalist>`;
}

function createDestinationPhotos(pictures) {
  const picturesList = pictures.length === 0 ? '' :
    pictures.map((picture) =>
      `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  return `<div class="event__photos-tape">${picturesList}</div>`;
}

function createEventOffersList(options, selectedOptions) {
  //Тут прямо и неизящно генерируются id и for у input и label. По идее нужно собрать словарь из всех значений в разметке или придумать его, но мне что-то лень, и в данном случае я не вижу практической пользы.
  const offersList = options.length === 0 ? '' :
    options.map((option) => (/*html*/
      `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="${option.id}"
        type="checkbox"
        name="event-offer-luggage"
        value="${option.id}"
        ${selectedOptions.some((selectedOption) => selectedOption === option.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${option.id}">
          <span class="event__offer-title">${option.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${option.price}</span>
        </label>
    </div>`)).join('');
  return `<div class="event__available-offers">${offersList}</div>`;
}

function createEditEventTemplate({ state, destinations, options }) {
  const { destination, type, offers, dateFrom, dateTo, basePrice } = state;
  const description = (destinations.length > 0) ? destinations.find((point) => point.id === destination).description : 'Неописуемая красота.';
  const eventPhotos = (destinations.length > 0) ? destinations.find((point) => point.id === destination).pictures : [];
  const destinationName = (destinations.length > 0) ? destinations.find((point) => point.id === destination).name : 'Нет точек назначения.';
  const destinationList = createDestinationsList(destinations);
  const pictures = createDestinationPhotos(eventPhotos);
  const eventPrice = basePrice;
  const timeFrom = formatDate(dateFrom, 'DD/MM/YY hh:mm');
  const timeTo = formatDate(dateTo, 'DD/MM/YY hh:mm');
  const optionsByType = options.find((option) => option.type === type).offers;
  const offersList = createEventOffersList(optionsByType, offers);
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
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationName}" list="destination-list-1">
              ${destinationList}
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
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${eventPrice}">
            </div>

            <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
            <button class="event__reset-btn" type="reset">Delete</button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
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
      </li>`);
}

export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #destinations = null;
  #options = null;
  #handleFormSubmit = null;
  #handleToggleClick = null;
  #handleDeleteClick = null;

  #datePickerFrom = null;
  #datePickerTo = null;

  constructor({ event, onFormSubmit, onToggleClick, onDeleteClick, destinations, options }) {
    super();
    this.#event = event;
    this.#destinations = destinations;
    this.#options = options;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleToggleClick = onToggleClick;
    this.#handleDeleteClick = onDeleteClick;

    this._setState(EditEventView.parseEventToState({event}));

    this._restoreHandlers();
  }

  //Я правильно понимаю, что это просто shallow copy объекта? Или вернее мы в новый пустой объект записываем ключ event, в котором хранится shallow copy. Дальше мы сначала наполняем этот промежуточный объект, а потом передаём его в _setState, который делает глубокое копирование в _state? Пока не понимаю, почему нам нельзя передать event сразу в _setState. В учебном примере ещё дополнительные свойства были, может поэтому?
  static parseEventToState = ({ event }) => ({ event });

  static parseStateToEvent = (state) => state.event;

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  #toggleClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleToggleClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  #typeFieldsetChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      event: {
        ...this._state.event,
        type: evt.target.value,
        offers: [],
      }
    });
  };

  #optionClickHandler = (evt) => {
    evt.preventDefault();
    const selectedOptions = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      event: {
        ...this._state.event,
        offers: selectedOptions.map((option) => option.value)
      }
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      event: {
        ...this._state.event,
        basePrice: evt.target.value,
      }
    });
  };

  #destinationChangeHandler = () => {
    const selectedDestination = this.element.querySelector('.event__input--destination').value;
    const selectedDestinationId = this.#destinations.find((destination) => destination.name === selectedDestination).id;

    this._setState({
      event: {
        ...this._state.event,
        destination: selectedDestinationId,
      }
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      event: {
        ...this._state.event,
        dateTo: userDate
      }
    });

    this.#datePickerTo.set('maxDate', this._state.event.dateTo);
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      event: {
        ...this._state.event,
        dateFrom: userDate
      }
    });

    this.#datePickerFrom.set('minDate', this._state.event.dateFrom);
  };

  #setDatePickers = () => {
    this.#datePickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'), {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.event.dateFrom,
        enableTime: true,
        maxDate: this._state.event.dateTo,
        onClose: this.#dateFromChangeHandler,
        'time_24hr': true,
        locale: {
          firstDayOfWeek: 1,
        }
      }
    );

    this.#datePickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'), {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.event.dateTo,
        enableTime: true,
        minDate: this._state.event.dateFrom,
        onClose: this.#dateToChangeHandler,
        'time_24hr': true,
        locale: {
          firstDayOfWeek: 1,
        }
      }
    );
  };

  _restoreHandlers = () => {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#toggleClickHandler);

    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteClickHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeFieldsetChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    //Перерисовывается, но только после нажатия Save или Enter. Не могу придумать, как по-другому.
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    const optionsContainer = this.element.querySelector('.event__available-offers');

    if (optionsContainer) {
      optionsContainer.addEventListener('change', this.#optionClickHandler);
    }

    this.#setDatePickers();

  };

  get template() {
    return createEditEventTemplate({
      state: this._state.event,
      destinations: this.#destinations,
      options: this.#options
    });
  }

  reset(event) {
    //Здесь в демо проекте ParseToState. Но если его оставить, то при удалении ивента и раскрытии следующего выпадает ошибка. Поправил так, как было показано в ретро. Если честно, я уже запутался и не могу на данном этапе понять, что происходит и почему была ошибка.
    this.updateElement({ event });
  }

  removeElement = () => {
    super.removeElement();

    if (this.#datePickerFrom) {
      this.#datePickerFrom.destroy();
      this.#datePickerFrom = null;
    }

    if (this.#datePickerTo) {
      this.#datePickerTo.destroy();
      this.#datePickerTo = null;
    }
  };
}
