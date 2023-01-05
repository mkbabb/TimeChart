import { TimeChart } from '../core';
import { TimeChartPlugins } from '../options';
export interface TimeChartPlugin<TState = any> {
    apply(chart: TimeChart<TimeChartPlugins>): TState;
}
