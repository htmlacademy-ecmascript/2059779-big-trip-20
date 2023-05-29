import TripInfoView from '../view/trip-info-view.js';
import TripFiltersView from '../view/trip-filters-view';
import { generateFilter } from '../mock/filters';
import { render } from '../framework/render';
import AddEventButtonView from '../view/add-new-event-button-view.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #filters = [];
  #events = [];

  #tripTitle = null;
  #tripDates = null;
  #tripPrice = null;

  constructor({ headerContainer, tripTitle, tripDates, tripPrice, events }) {
    this.#headerContainer = headerContainer;
    this.#events = events;
    this.#tripTitle = tripTitle;
    this.#tripDates = tripDates;
    this.#tripPrice = tripPrice;
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderAddEventButton();
  }

  #renderAddEventButton() {
    const addEventButtonComponent = new AddEventButtonView();

    render(addEventButtonComponent, this.#headerContainer);
  }

  #renderTripInfo() {
    render(new TripInfoView({
      events: this.#events,
      tripTitle: this.#tripTitle,
      tripDates: this.#tripDates,
      totalPrice: this.#tripPrice,
    }), this.#headerContainer);
  }

  #renderFilters() {
    this.#filters = generateFilter(this.#events);
    render(new TripFiltersView({ filters: this.#filters }), this.#headerContainer);
  }
}
