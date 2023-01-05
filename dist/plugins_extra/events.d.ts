import { TimeChart } from '../core';
import { TimeChartPlugin } from '../plugins';
export interface Event {
    name: string;
    x: number;
}
export declare class EventsPlugin implements TimeChartPlugin<EventsPlugin> {
    readonly data: Event[];
    constructor(data?: Event[]);
    apply(chart: TimeChart): this;
}
