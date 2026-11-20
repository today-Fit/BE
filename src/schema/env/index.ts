import Zod from "zod";
import commonSchema from "./common.schema";
import jwtSchema from "./jwt.schema";
import databaseSchema from "./database.schema";
import locationSchema from "./location.schema";
import githubSchema from "./github.schema";

export default Zod.object({
    ...commonSchema.shape,
    ...databaseSchema.shape,
    ...jwtSchema.shape,
    ...locationSchema.shape,
    ...githubSchema.shape
});
