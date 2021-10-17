import { MethodResponse, RegisterParams, LoginParams, UpdateTokenParams, TokenVerifyParams } from '../types/common';
export declare class AuthController {
    static register(userInfo: RegisterParams): Promise<MethodResponse>;
    static login(userInfo: LoginParams): Promise<MethodResponse>;
    static addUserRefreshToken(tokenInfo: UpdateTokenParams): Promise<void>;
    static validTokenForUser(tokenInfo: TokenVerifyParams): Promise<boolean>;
    static removeTokenFromUser(tokenInfo: TokenVerifyParams): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map