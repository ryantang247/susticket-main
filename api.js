import axios from 'axios';

export async function getVenues(venueId) {
    try {
        const response = await axios.get(`https://secourse2024-675d60a0d98b.herokuapp.com/api/getVenue/${venueId}`);
        return response.data.name;
    } catch (error) {
        console.error('Error fetching venue:', error);
        return null;
    }
}

export async function getEvents(eventId) {
    try {
        const response = await axios.get(`https://secourse2024-675d60a0d98b.herokuapp.com/api/getEvent/${eventId}`);
        const singleEvent = response.data;
        console.log('Event obtained: ', response.data)
        return {
            pricing: JSON.parse(singleEvent.price),
            eventData: {
                id: singleEvent.id,
                title: singleEvent.title,
                thumbnails: [singleEvent.thumbnail],
                description: singleEvent.description,
                dateTime: singleEvent.startDate,
                contactName: singleEvent.contactName,
                contact: singleEvent.contact,
                seatsioEventsKey: singleEvent.seatsioEventsKey,
                seatsioChartKey: singleEvent.seatsioChartKey,
                venue: await getVenues(singleEvent.venueId)
            },
        };
    } catch (error) {
        console.error('Error fetching event:', error);
        throw showError({statusCode: error.response.status, message: error.response.statusText})
    }
}