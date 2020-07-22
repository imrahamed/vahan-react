const API_MESSAGE_URL = 'https://jsonplaceholder.typicode.com/todos';

const Api = {
  sendNewMessage(message) {
    return fetch(`${API_MESSAGE_URL}/${Math.ceil(message.length/2)}`)
      .then(response => response.json());
  }
};

export default Api;
