import axios from 'axios'

const apiClient = axios.create(
    {
        baseURL: 'http://localhost:3000',
        withCredentials: false,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }
)

export default {
    // 2 Methoden mit demselben Namen führen zum Compile-Fehler
    // getEvents() {
    //     console.log('*** 1 ***');
    //     return apiClient.get('/events');
    // },

    getEvents(perPage, page) {
        console.log('*** 2 ***');
        return apiClient.get('/events?_limit=' + perPage + '&_page=' + page);
    },

    getEvent(id) {
        return apiClient.get('/events/'+id);
    },

    postEvent(event) {
        return apiClient.post('/events', event);
    }
}