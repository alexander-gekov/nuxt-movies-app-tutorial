import { createServer } from "./server";
import { config } from "dotenv";

config();

const server = await createServer();

const { PORT } = {
    PORT: '4000',
    ...process.env,
};

server.listen(parseInt(PORT), () => {
    // Is it really modern app if you aren't using emojis in console?
    console.log('🚀 Movie server listening on port ' + PORT);
});
