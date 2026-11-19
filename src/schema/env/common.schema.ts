import Zod from "zod";

// NODE_ENV는 실행 순간에 cross-env로 직접 설정되어 적용됩니다.
export default Zod.object({
    "APP_ENV": Zod.enum([
        "local",
        "development",
        "production"
    ]).nonoptional(),
    "PORT": Zod.coerce.number()
        .nonnegative()
        .optional()
});
