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

  //Не уверен, что это оптимальный проход по вложенному массиву.
  getTotalPrice() {
    return this.#events.reduce((totalPrice, event) => {
      totalPrice += event.basePrice;

      event.offers.forEach((offer) => {
        totalPrice += offer.price;
      });

      return totalPrice;
    }, 0);
  }
}
