import { registerAs } from "@nestjs/config";

export default registerAs("location", () => {
    return {
        "apiKey": process.env["VWORLD_API_KEY"]!
    };
});
