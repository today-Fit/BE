import { registerAs } from "@nestjs/config";

export default registerAs("github", () => {
    return {
        "token": process.env["GITHUB_TOKEN"]!
    };
});
