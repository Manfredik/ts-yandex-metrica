import { CommonOptions } from "types/CommonOptions";

export interface HitOptions extends CommonOptions {
    referer?: string;
    callback?: () => void;
    title?: string;
}
