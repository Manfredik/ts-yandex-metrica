import { ExtLinkOptions } from "types/ExtLinkOptions";
import { CallbackOptions } from "types/CallbackOptions";

export interface Metrika2 {
    reachGoal: (target: string, params?: any, callback?: () => void, ctx?: any) => void
    addFileExtension: (extensions: string | string[]) => void;
    extLink: (url: string, options?: ExtLinkOptions) => void;
    getClientID: () => string;
    setUserID: (userId: string) => void;
    notBounce: (options: CallbackOptions) => string;
    userParams: (parameters: any) => void;
    replacePhones: () => void;
    hit: (url: string, options?: ExtLinkOptions) => void;
}
