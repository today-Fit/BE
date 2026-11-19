import Zod from "zod";
import commonSchema from "./common.schema";
import jwtSchema from "./jwt.schema";
import databaseSchema from "./database.schema";

export default Zod.object({
    ...commonSchema.shape,
    ...databaseSchema.shape,
    ...jwtSchema.shape
});
