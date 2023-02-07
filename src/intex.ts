import { Metrika2 } from "types/YaMetrica";
import { CommonOptions } from "types/CommonOptions";
import { HitOptions } from "types/HitOptions";
import { YandexCounterConfig } from "types/YandexCounterConfig";

type Metrika2VaribleName = string;
declare var Ya: any;

declare global {
    interface Window {
        [key: string]: Metrika2
    }
}

export class Metrika {
    private _metricaInsert?: Promise<Metrika2>;

    static getCounterNameById(id: number ): string {
        return 'yaCounter' + id;
    }

    static getCounterById(id: number): Metrika2 {
        return window[Metrika.getCounterNameById(id)];
    }

    static initCounter(config: YandexCounterConfig) {
        window[Metrika.getCounterNameById(config.id)] = new Ya.Metrika2(config);
    }

    constructor(public counterConfig: YandexCounterConfig) {
        //this.positionToId = counterConfigs.map(config => config.id);
    }


    public getCurrentCounter():Promise<Metrika2> {
        if (this._metricaInsert === undefined) {
            this._metricaInsert = new Promise<Metrika2>((resolve, reject) => {
                const node = document.getElementsByTagName('script')[0];
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = 'https://mc.yandex.ru/metrika/tag.js';
                script.onload = (e: Event) => {
                    document.addEventListener(`yacounter${this.counterConfig.id}inited`, () => {
                        resolve(Metrika.getCounterById(this.counterConfig.id))
                    });
                    Metrika.initCounter(this.counterConfig);
                };
                node.parentNode?.insertBefore(script, node);
            });
        }
        return this._metricaInsert;
    }


    public getClientID(): string | undefined {
        const counter = Metrika.getCounterById(this.counterConfig.id);
        if (counter) {
            return counter.getClientID();
        }
        console.warn('Counter is still loading');
    }

    public setUserID(userId: string) {
        this
            .getCurrentCounter()
            .then(counter => counter.setUserID(userId))
            .catch(() => console.warn('Counter is still loading'));
    }

    public userParams(params: any) {
        this
            .getCurrentCounter()
            .then(counter => counter.userParams(params))
            .catch(() => console.warn('Counter is still loading'));
    }

    public params(params: any) {
        this
            .getCurrentCounter()
            .then(counter => counter.userParams(params))
            .catch(() => console.warn('Counter is still loading'));

    }

    public replacePhones() {
        this
            .getCurrentCounter()
            .then(counter => counter.replacePhones())
            .catch(() => console.warn('Counter is still loading'));
    }


    public fireEvent(type: string, options: CommonOptions = {}): Promise<void> {
        return new Promise((resolve: () => void, reject) => {
            this.getCurrentCounter().then(counter => counter.reachGoal(type, options, resolve, this)).catch(reject);
        });
    }

    public hit(url: string, options: HitOptions = {}, ): Promise<void> {
        return new Promise((resolve: () => void, reject) => {
            options.callback = resolve;
            this
                .getCurrentCounter()
                .then(counter => {
                    counter.hit(url, options);
                })
                .catch(reject);
        });


    }
}
