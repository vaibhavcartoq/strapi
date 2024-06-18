import { request } from "@strapi/helper-plugin";

const brandRequests = {
    getPersonas: async (cartype) => {
        try {
            const response = await fetch(`https://svb1.cartoq.com/api/persona?cartype=${cartype}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'https://www.cartoq.com',
                },
            });
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return error;
        }
    }
}

export default brandRequests;
