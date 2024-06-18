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
    },
    getIsDefault: async (model) => {
        try {
            const authToken = "9ef751150ccbd5330d1483b1c245fc3200aad71418c9efdaa57dbc3421ae4108611330c702f445029248204d7056b469b86d54e3383f6883fef2a9c4a5c3aaad8ec97c5ecce22c7d9eaf9322697be6bf185df5a32fd833ea41b5c4e2181a31d92e2b4dbf89636d09d3dc3afed55f5bb55ffbb3575fc5968099b9a9d7b5f0ff5b";
            const response = await fetch(
                "http://localhost:1337/api/article-news?populate=*&filters[Head_Block][isDefault][$eq]=true",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return error;
        }
    },
}

export default brandRequests;
