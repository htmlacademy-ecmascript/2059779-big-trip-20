import TripInfoView from '../view/trip-info-view.js';
import TripFiltersView from '../view/trip-filters-view';
import { generateFilter } from '../mock/filters';
import { render } from '../framework/render';
import AddEventButtonView from '../view/add-new-event-button-view.js';

export default class HeaderPresenter {
  #headerContainer = null;
  #filters = [];

  #events = null;
  #totalPrice = null;

  constructor({ headerContainer, eventsModel }) {
    this.#headerContainer = headerContainer;
    this.#events = [...eventsModel.events];
    this.#filters = generateFilter(this.#events);
    this.#totalPrice = eventsModel.getTotalPrice();
  }

  init() {
    this.#renderTripInfo();
    this.#renderFilters();
    this.#renderAddEventButton();
  }

  #renderAddEventButton() {
    const addEventButtonComponent = new AddEventButtonView({
      onClick: () => {
        //renderNewEventComponent.apply(this);
        //document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    render(addEventButtonComponent, this.#headerContainer);
  }

  #renderTripInfo() {
    render(new TripInfoView({
      events: this.#events,
      totalPrice: this.#totalPrice,
      tripTitle: this.#getTripTitle(),
    }), this.#headerContainer);
  }

  #renderFilters() {
    render(new TripFiltersView({ filters: this.#filters }), this.#headerContainer);
  }

  //Здесь не уверен, стоит ли создавать сразу строки, или передать в какую-то структуру, которую уже будет разбирать View.
  //И, насколько я могу судить, это временное решение, которое нельзя передать в модель, потому что потом в объекте события будет приходить не имя пункта назначения, как у меня в моках сейчас, а id. И нужны данных из двух моделей, чтобы одно соединить с другим.
  #getTripTitle() {
    let tripTitle = 'Маршрут не составлен';
    switch (this.#events.length) {
      case 0:
        break;
      case 1:
        tripTitle = `${this.#events[0].destination} — Добавьте конечную точку`;
        break;
      case 2:
        tripTitle = `${this.#events[0].destination} — ${this.#events[1].destination}`;
        break;
      case 3:
        tripTitle = `${this.#events[0].destination} — ${this.#events[2].destination} — ${this.#events[3].destination}`;
        break;
      default:
        tripTitle = `${this.#events[0].destination} — … — ${this.#events[this.#events.length - 1].destination}`;
    }
    return tripTitle;
  }

  #getTripDates() {

  }
}
