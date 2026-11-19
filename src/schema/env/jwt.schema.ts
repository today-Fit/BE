import Zod from "zod";

export default Zod.object({
    "JWT_SECRET": Zod.string()
        .nonoptional()
});
