import { render } from '../render';
import TripSortView from '../view/trip-sort-view';
import TripListView from '../view/trip-list-view';
import EventView from '../view/event-view';
import EditPointView from '../view/edit-event-view';
import AddNewPointView from '../view/add-new-event-view';

export default class TripPresenter {
  sortComponent = new TripSortView();
  listComponent = new TripListView();

  constructor({ listContainer, destinationsModel, offersModel, eventsModel }) {
    this.listContainer = listContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.eventsModel = eventsModel;

    this.events = [...eventsModel.get()];
    this.destinations = [...destinationsModel.get()];
    this.offers = [...offersModel.get()];
  }

  init() {
    render(this.sortComponent, this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new AddNewPointView(
      this.events[0],
      this.destinations,
      this.offers,
    ), this.listComponent.getElement());
    render(new EditPointView({
      event: this.events[1],
      eventDestination: this.destinations[1],
    }), this.listComponent.getElement());

    this.events.forEach((event) => {
      render(new EventView({ event }), this.listComponent.getElement());
    });
  }
}
