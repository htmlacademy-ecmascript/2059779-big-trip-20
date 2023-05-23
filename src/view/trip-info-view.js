import AbstractView from '../framework/view/abstract-view.js';
import { formatDate } from '../utils/date.js';

//Здесь нужна будет новая функция форматирования или их комбинация, чтобы не дублировать месяц, если месяц старта и месяц окончания совпадают
function createTripInfoTemplate(events, totalPrice) {
  const startEvent = events[0];
  const endEvent = events[events.length - 1];
  const middleEvent = (events.length > 3) ? '...' : events[1].destination;
  return (/*html*/
    `<section class="trip-main__trip-info  trip-info">
        <div class="trip-info__main">
          <h1 class="trip-info__title">${startEvent.destination} &mdash; ${middleEvent} &mdash; ${endEvent.destination}</h1>
          <p class="trip-info__dates">${formatDate(startEvent.dateFrom, 'MMM DD')}&nbsp;&mdash;&nbsp;${formatDate(endEvent.dateTo, 'MMM DD')}</p>
        </div>
        <p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
        </p>
      </section>`);
}

export default class TripInfoView extends AbstractView {
  #events = null;
  #totalPrice = null;

  constructor({ events, totalPrice }) {
    super();
    this.#events = events;
    this.#totalPrice = totalPrice;
  }

  get template() {
    return createTripInfoTemplate(this.#events, this.#totalPrice);
  }
}
