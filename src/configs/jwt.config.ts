import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => {
    return {
        "access": {
            "secret": process.env["ACCESS_JWT_SECRET"]!,
            "expiresIn": "30m"
        },
        "refresh": {
            "secret": process.env["REFRESH_JWT_SECRET"]!,
            "expiresIn": "7d"
        }
    };
});
