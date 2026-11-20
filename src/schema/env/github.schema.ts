import Zod from "zod";

export default Zod.object({
    "GITHUB_TOKEN": Zod.string()
        .nonoptional()
});
