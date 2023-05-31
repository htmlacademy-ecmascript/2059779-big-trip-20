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
}
