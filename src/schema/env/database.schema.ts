import Zod from "zod";

export default Zod.object({
    "DATABASE_URL": Zod.string()
        .nonoptional()
});
