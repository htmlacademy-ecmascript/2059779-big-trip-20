import AbstractView from '../framework/view/abstract-view.js';

function createTripInfoTemplate() {
  return (/*html*/
    `<div class="trip-main">
      <section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>
          </section>
          <div class="trip-main__trip-controls  trip-controls">
            <div class="trip-controls__filters">
              <h2 class="visually-hidden">Filter events</h2>
              <!-- Фильтры -->
            </div>
          </div>
      </div>`);
}

export default class TripInfoView extends AbstractView {
  get template() {
    return createTripInfoTemplate();
  }
}
