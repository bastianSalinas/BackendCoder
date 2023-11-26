import ticketsModel from './models/tickets.model.js'

export default class Tickets {
    constructor() {

    }

    get = async () => {
        let tickets = await ticketsModel.find()
        return tickets
    }
}