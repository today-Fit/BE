import { registerAs } from "@nestjs/config";

export default registerAs("location", () => {
    return {
        "apiKey": process.env["LOCATION_API_KEY"]!
    };
});
