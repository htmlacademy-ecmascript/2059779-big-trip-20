export default class EventsModel {
  #service = null;
  #events = null;

  constructor(service) {
    this.#service = service;
    this.#events = this.#service.getEvents();
  }

  get events() {
    return this.#events;
  }
}
