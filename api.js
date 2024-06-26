import axios from 'axios';
import { ElLoading, ElNotification } from 'element-plus';

export async function getVenues(venueId) {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
    });
    try {
        const response = await axios.get(`https://secourse2024-675d60a0d98b.herokuapp.com/api/getVenue/${venueId}`);
        return response.data.name;
    } catch (error) {
        console.error('Error fetching venue:', error);
        ElNotification.error({
            title: 'Error',
            message: `Error fetching venue. ${error.message}`,
            offset: 100,
        });    
        return null;
    }
    finally {
        loading.close();
    }
}

export async function getEvents(eventId) {
    const loading = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)',
    });
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
                videolink: singleEvent.videolink,
                venue: await getVenues(singleEvent.venueId)
            },
        };
    } catch (error) {
        console.error('Error fetching event:', error);
        ElNotification.error({
            title: 'Error',
            message: `Error fetching events. ${error.message}`,
            offset: 100,
        });    
        throw showError({statusCode: error.response.status, message: error.response.statusText})
    }
    finally {
        loading.close();
    }
}