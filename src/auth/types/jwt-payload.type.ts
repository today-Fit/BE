// 표준 클레임
// sub만 구현합니다.
interface JwtPayloadCommon {
    readonly sub:number;
}

// 사용자 정의 클레임
export interface JwtPayloadAccess extends JwtPayloadCommon {
    readonly tokenType:"access";
}

export interface JwtPayloadRefresh extends JwtPayloadCommon {
    readonly tokenType:"refresh";
}

export type JwtPayload = JwtPayloadAccess | JwtPayloadRefresh;
