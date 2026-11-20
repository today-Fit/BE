import Zod from "zod";

export default Zod.object({
    "tip_message": Zod.string()
        .describe("날씨와 현재 지역 등 여러 요소를 고려한 유용한 정보 (최대 2줄)")
        .nonoptional(),
    "recommendations": Zod.array(Zod.object({
        "name": Zod.string()
            .describe("해당 착장에 대한 이름 (특징적인 정보를 바탕으로 간단하게 작성)")
            .nonoptional(),
        "feature": Zod.string()
            .describe("해당 착장의 기능 (간단히 한 가지)")
            .nonoptional(),
        "image_url": Zod.string()
            .describe("해당 착장에 대한 예시용 이미지 (인터넷에서 찾아 제공)")
            .nonoptional()
    })).describe("해당 착장에 대한 추천 리스트 (목록 5개 고정)")
        .length(5)
        .nonoptional()
});
