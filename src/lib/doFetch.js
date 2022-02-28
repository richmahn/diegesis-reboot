import Axios from "axios";
import {thaw} from "proskomma-freeze";

export default async function doFetch(pk) {
    console.log("Start doFetch");
    const axiosInstance = Axios.create({});
    axiosInstance.defaults.headers = {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
    };
    await axiosInstance.request(
        {
            method: "get",
            responseType: 'text',
            "url": `http://localhost:8088/archives/spa_archive.pkzip`,
            "validateStatus": false,
        }
    )
        .then(
            async response => {
                const data = response.data;
                if (response.status !== 200) {
                    console.log(`Request returned status code ${response.status}`);
                    console.log(data);
                    return;
                }
                await thaw(pk, data);
                console.log("End doFetch");
            }
        );
}
