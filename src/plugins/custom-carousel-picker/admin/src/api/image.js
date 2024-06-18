import { request } from "@strapi/helper-plugin";

const brandRequests = {
    searchModel: async () => {
        try {
            const response = await fetch(`https://svb1.cartoq.com/api/model-search-strapi`, {
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
    },
    getModelImages: async (modelName) => {
        try {
            const response = await fetch(`https://svb1.cartoq.com/api/images-videos?modelName=${modelName}`, {
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
