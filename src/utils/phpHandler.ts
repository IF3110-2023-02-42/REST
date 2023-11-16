import axios from "axios";

export const phpHandlerPOST = async (url: string, data: any) => {
    try {
        const response = await axios.post(url, data);

        return response.data;
    } catch (error: any) {
        console.log('error', error)
        throw new Error(`PHP request failed: ${error.message}`);
    }

}
