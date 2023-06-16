import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class TripModel extends Observable {
  #service = null;
  #events = [];
  #offers = [];
  #destinations = [];

  constructor({ service }) {
    super();
    this.#service = service;
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const events = await this.#service.getEvents();
      this.#events = events.map(this.#adaptToClient);
      this.#destinations = await this.#service.getDestinations();
      this.#offers = await this.#service.getOffers();
      this._notify(UpdateType.INIT);
    } catch(err) {
      this.#events = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateType.ERROR);
    }
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((events) => events.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting events');
    }

    try {
      const response = await this.#service.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        update,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#service.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((events) => events.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting events');
    }

    try {
      await this.#service.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }

  getTotalPrice() {
    //Убрал учёт дополнительных опций. Пока не знаю, как его сделать, и нужно ли по ТЗ вообще.
    return this.#events.reduce((totalPrice, event) => {
      totalPrice += event.basePrice;

      return totalPrice;
    }, 0);
  }

  getTripDates() {
    let startDate = '';
    let finishDate = '';
    switch (this.#events.length) {
      case 0:
        break;
      case 1:
        startDate = this.#events[0].dateFrom;
        break;
      default:
        startDate = this.#events[0].dateFrom;
        finishDate = this.#events[this.#events.length - 1].dateTo;
        break;
    }
    return {
      startDate,
      finishDate
    };
  }

  getTripTitle() {
    let firstDestinationTitle = 'Set the first waypoint.';
    let middleDestinationTitle = 'Set the second waypoint.';
    let endDestinationTitle = '';
    let tripTitle = 'Route not set.';
    switch (this.#events.length) {
      case 0:
        break;
      case 1:
        firstDestinationTitle = this.#destinations.find((point) => point.id === this.#events[0].destination).name;

        tripTitle = `${firstDestinationTitle} — Add an endpoint`;
        break;
      case 2:
        firstDestinationTitle = this.#destinations.find((point) => point.id === this.#events[0].destination).name;
        middleDestinationTitle = this.#destinations.find((point) => point.id === this.#events[1].destination).name;

        tripTitle = `${firstDestinationTitle} — ${middleDestinationTitle}`;
        break;
      case 3:
        firstDestinationTitle = this.#destinations.find((point) => point.id === this.#events[0].destination).name;
        middleDestinationTitle = this.#destinations.find((point) => point.id === this.#events[1].destination).name;
        endDestinationTitle = this.#destinations.find((point) => point.id === this.#events[2].destination).name;

        tripTitle = `${firstDestinationTitle} — ${middleDestinationTitle} — ${endDestinationTitle}`;
        break;
      default:
        firstDestinationTitle = this.#destinations.find((point) => point.id === this.#events[0].destination).name;
        endDestinationTitle = this.#destinations.find((point) => point.id === this.#events[this.#events.length - 1].destination).name;

        tripTitle = `${firstDestinationTitle} — … — ${endDestinationTitle}`;
    }

    return tripTitle;
  }

  #adaptToClient(event) {
    const adaptedEvent = {
      ...event,
      dateFrom: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      dateTo: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      basePrice: event['base_price'],
      isFavorite: event['is_favorite'],
    };

    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['base_price'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}
