import { Document } from 'mongoose';
export interface IUser extends Document {
    email: string;
    password: string;
    tokens: [string];
}
declare const _default: any;
export default _default;
//# sourceMappingURL=userModel.d.ts.map