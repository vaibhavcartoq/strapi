import { request } from "@strapi/helper-plugin";

const brandRequests = {
    getIsDefault: async (model) => {
        try {
            const authToken = "1e9d5564534b0cb0f1c62db49d6f15be916d364ecd5c0b904f6f4049b54657b5b791f1748eb598e2326bbb083ceb6130252627357b56c06db91f11d38cff32f9e95ee215dca7661c5e99fab02bc550e2d113ac7bd6163ec5a02efe5234eda53c39c376060c72c1e22cc1c27dd861248886f9d89cfda916b6a5c5362f1d7070c7";
            const response = await fetch(
                `http://localhost:1337/api/articles?populate=*&filters[Model][$eq]=${model}&filters[IsDefault][$eq]=true`,
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
