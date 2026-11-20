import Zod from "zod";

export default Zod.object({
    "LOCATION_API_KEY": Zod.string()
        .nonoptional()
});
