import { render } from '../render';
import TripSortView from '../view/trip-sort-view';
import TripListView from '../view/trip-list-view';
import EventView from '../view/event-view';
import EditPointView from '../view/edit-point-view';
import AddNewPointView from '../view/add-new-point-view';

export default class TripPresenter {
  sortComponent = new TripSortView();
  listComponent = new TripListView();

  constructor({ listContainer, destinationsModel, offersModel, eventsModel }) {
    this.listContainer = listContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.eventsModel = eventsModel;

    this.events = [...eventsModel.get()];
    this.destinations = destinationsModel.getById();
  }

  init() {
    render(this.sortComponent, this.listContainer);
    render(this.listComponent, this.listContainer);
    render(new EditPointView(), this.listComponent.getElement());
    render(new AddNewPointView(), this.listComponent.getElement());

    for (let i = 0; i < this.events.length; i++) {
      render(new EventView({ event: this.events[i], }), this.listComponent.getElement());
    }
  }
}
