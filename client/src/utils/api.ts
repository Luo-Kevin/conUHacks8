import axios from "axios";
const BASE_URL: string = "http://localhost:8000";

export const postFile = async (csvData: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, {
      data: csvData,
    });

    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
