import 'whatwg-fetch';
import 'babel-polyfill';

const API_URL = 'http://localhost:3030/api';
const API_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: 'any-string-you-like'
}

let KanbanAPI = {
  fetchCards() {
    return fetch(`${API_URL}/movie`, {headers:API_HEADERS})
    .then((response) => response.json())
  },

  addCard(card) {
    return fetch(`${API_URL}/movie`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(card)
    })
    .then((response) => response.json())
  },

  updateCard(card, draftCard) {
    return fetch(`${API_URL}/movie/${card.id}`, {
    	method: 'put',
    	headers: API_HEADERS,
    	body: JSON.stringify(draftCard)
    })
  },

  persistCardDrag(cardId, status, index) {
    return fetch(`${API_URL}/movie/${cardId}`, {
    	method: 'put',
    	headers: API_HEADERS,
    	body: JSON.stringify({id: cardId, status, row_order_position: index})
    })
  },

  addTask(cardId, task) {
    return fetch(`${API_URL}/movie/${cardId}/tasks`, {
      method: 'post',
      headers: API_HEADERS,
      body: JSON.stringify(task)
    })
    .then((response) => response.json())
  },

  deleteTask(cardId, task) {
    return fetch(`${API_URL}/movie/${cardId}/tasks/${task.id}`, {
      method: 'delete',
      headers: API_HEADERS
    })
  },

  toggleTask(cardId, task) {
    return fetch(`${API_URL}/movie/${cardId}/tasks/${task.id}`, {
    	method: 'put',
    	headers: API_HEADERS,
    	body: JSON.stringify({done:!task.done})
    })
  }

};

export default KanbanAPI;
