import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-demos-1fcd1-default-rtdb.firebaseio.com'
})

export default journalApi