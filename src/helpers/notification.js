import axios from 'axios';

export const sendFCMNotification = async (title, body) => {
    const data = {
        to: '/topics/all',
        notification: {
            title: title,
            body: body
        },
        data: {
            type: 'msj'
        },
    };

    try {
        const response = await axios.post('https://fcm.googleapis.com/fcm/send', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAMYZh6jU:APA91bEH8Jv_QKb0PPHIQSlM6RLcgF5oQoEIvW9H0OSh3CVgE5k9Dwfyg2HXPbPdW-aD3JzfkDfAKERTFyK9qk4eByWotAiHUgQx39zNmxIebLxLZBBmlRgFUVIDeAFP6Wr1skB1raVg',
            },
        });
        
        console.log('FCM response:', response.data);
    } catch (error) {
        console.error('Error sending FCM notification:', error);
    }
};