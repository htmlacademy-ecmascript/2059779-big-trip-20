import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/common.js';

function createFilterItemTemplate(filter, isChecked) {
  const { type, hasEvents } = filter;
  return (/*html*/
    `<div class="trip-filters__filter">
      <input
        id="filter-${type}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${type}"
        ${isChecked ? 'checked' : ''}
        ${(hasEvents) ? '' : 'disabled'} >
      <label class="trip-filters__filter-label" for="filter-${type}">${capitalizeFirstLetter(type)}</label>
    </div>
  `);
}

function createTripFiltersTemplate(filters) {
  const filterItemsTemplate = filters.map((filter, index) => createFilterItemTemplate(filter, index === 0)).join('');

  return (/*html*/
    `<div class="trip-main__trip-controls  trip-controls">
        <div class="trip-controls__filters">
          <h2 class="visually-hidden">Filter events</h2>
          <!-- Фильтры -->
          <form class="trip-filters" action="#" method="get">
          ${filterItemsTemplate}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>
        </div>
      </div>`);
}

export default class TripFiltersView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters);
  }
}
