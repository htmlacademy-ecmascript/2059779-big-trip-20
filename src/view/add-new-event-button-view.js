import AbstractView from '../framework/view/abstract-view.js';

function createNewEventButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class AddEventButtonView extends AbstractView {
  constructor() {
    super();

    this.element.addEventListener('click', this.#clickHandler, { once: true}); //Временное решение, чтобы не создавать бесконечно много пунктов, как его сделать более реалистичным не могу придумать пока что.
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.element.setAttribute('disabled', 'true');
  };
}
