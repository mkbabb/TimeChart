import { TimeChartSeriesOptions, TooltipOptions } from "../options";
import { TimeChartPlugin } from ".";
import { TimeChart } from "../core";
type ItemElements = {
    item: HTMLElement;
    example: HTMLElement;
    name: HTMLElement;
    value: HTMLElement;
};
export declare class Tooltip {
    readonly options: TooltipOptions;
    tooltip: HTMLElement;
    xItem: ItemElements;
    items: Map<TimeChartSeriesOptions, ItemElements>;
    itemContainer: HTMLElement;
    chartOptions: import("../options").ResolvedCoreOptions;
    constructor(chart: TimeChart, options: TooltipOptions);
    private createItemElements;
    update(): void;
}
export declare class TimeChartTooltipPlugin implements TimeChartPlugin<Tooltip> {
    options: TooltipOptions;
    constructor(options?: Partial<TooltipOptions>);
    apply(chart: TimeChart): Tooltip;
}
export {};
