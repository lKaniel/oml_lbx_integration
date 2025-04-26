import OpenMediaLogicClient from "./sdk";
import { configDotenv } from "dotenv";
import * as process from "node:process";

const client = new OpenMediaLogicClient(process.env.BACKEND_URL);

configDotenv();

// Login to the API
async function main() {
    try {
        // Authentication
        await client.login({
            login: process.env.USER_LOGIN!,
            password: process.env.USER_PASSWORD!,
        });

        // Get current user
        const user = await client.getCurrentUser();
        console.log("Current user:", user);

        // Get channels with pagination and filtering
        const channels = await client.getChannels({
            page: 1,
            per_page: 10,
            filter: { is_visible: true },
            sort: "name",
            include: "saleshouse,channelCompany",
        });
        console.log("Channels:", channels.data);

        // // Get a specific block
        // const block = await client.getBlockById(123);
        // console.log('Block:', block);
        //
        // // Add a spot to a block
        // const updatedBlock = await client.addSpotToBlock(123, {
        //     commercial_id: 456,
        //     mediaplan_id: 789,
        //     position: '1F'
        // });
        // console.log('Updated block:', updatedBlock);

        // Logout
        await client.logout();
    } catch (error) {
        console.error("Error:", error);
    }
}

main();
