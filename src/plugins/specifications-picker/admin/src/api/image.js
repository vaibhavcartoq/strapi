import { request } from "@strapi/helper-plugin";

const brandRequests = {
    searchModel: async (model) => {
        try {
            const response = await fetch(`https://svb1.cartoq.com/api/model-search-strapi?model=${model}`, {
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
    getVariants: async (model) => {
        try {
            const response = await fetch(`https://svb1.cartoq.com/api/model-details?modelName=${model}`, {
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
    getSpecifications: async (variants) => {
        try {
            const response = await await fetch(`https://svb1.cartoq.com/api/compare-cars`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Origin': 'https://www.cartoq.com',
                },
                body: JSON.stringify({ variants }), // Convert array to JSON string
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
            const response = await fetch(`https://svb1.cartoq.com/api/model-details?modelName=${modelName}`, {
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
