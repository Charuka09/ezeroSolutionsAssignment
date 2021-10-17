export declare const generateRefreshToken: (email: string) => any;
export declare const generateAccessToken: (email: string) => any;
export declare const isAuthenticated: (req: any, res: any, next: any) => Promise<void>;
export declare const handleRefresh: (req: any, res: any) => Promise<void>;
export declare const handleLogout: (req: any, res: any) => Promise<void>;
export declare const validateRefreshToken: (refreshToken: string, secret: string) => Promise<boolean>;
//# sourceMappingURL=manageWebTokens.d.ts.map