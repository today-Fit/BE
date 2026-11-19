import { registerAs } from "@nestjs/config";

export default registerAs("common", () => {
    return {
        "env": {
            "node": process.env["NODE_ENV"]!,
            "app": process.env["APP_ENV"]!
        }
    };
});
