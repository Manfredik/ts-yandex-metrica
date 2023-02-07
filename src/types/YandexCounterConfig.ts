export interface YandexCounterConfig {
    id: number;
    defer: boolean;
    clickmap?: boolean;
    trackLinks?: boolean;
    accurateTrackBounce?: boolean;
    webvisor?: boolean;
    trackHash?: boolean;
    ut?: string;
    triggerEvent: boolean;
}
