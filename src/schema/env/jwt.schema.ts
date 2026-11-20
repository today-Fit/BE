import Zod from "zod";

export default Zod.object({
    "ACCESS_JWT_SECRET": Zod.string()
        .nonoptional(),
    "REFRESH_JWT_SECRET": Zod.string()
        .nonoptional()
});
