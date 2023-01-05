import { TimeChart as TimeChartBase } from "./core";
import {
    LineType,
    NoPlugin,
    ResolvedOptions,
    TimeChartOptions,
    TimeChartPlugins,
} from "./options";
import { TimeChartZoomPlugin } from "./plugins/chartZoom";
import { crosshair } from "./plugins/crosshair";
import { d3Axis } from "./plugins/d3Axis";
import { legend } from "./plugins/legend/legend";
import { lineChart } from "./plugins/lineChart";
import { nearestPoint } from "./plugins/nearestPoint";
import { TimeChartTooltipPlugin } from "./plugins/tooltip";

type TDefaultPlugins = {
    lineChart: typeof lineChart;
    d3Axis: typeof d3Axis;
    crosshair: typeof crosshair;
    nearestPoint: typeof nearestPoint;
    legend: typeof legend;
    zoom: TimeChartZoomPlugin;
    tooltip: TimeChartTooltipPlugin;
};

const makeDefaultPlugins = <TPlugins extends TimeChartPlugins = NoPlugin>(
    options?: TimeChartOptions<TPlugins>
) => {
    return {
        ...(options ?? {}),
        plugins: {
            lineChart,
            d3Axis,
            crosshair,
            nearestPoint,
            legend,
            zoom: new TimeChartZoomPlugin(options?.zoom),
            tooltip: new TimeChartTooltipPlugin(options?.tooltip),
            ...(options?.plugins ?? {}),
        },
    } as TimeChartOptions<TPlugins & TDefaultPlugins>;
};

export class TimeChart<
    TPlugins extends TimeChartPlugins = NoPlugin
> extends TimeChartBase<TPlugins & TDefaultPlugins> {
    static plugins = {
        lineChart,
        d3Axis,
        crosshair,
        nearestPoint,
        legend,
        TimeChartZoomPlugin,
        TimeChartTooltipPlugin,
    };
    static LineType = LineType;

    get options(): ResolvedOptions {
        return this._options as ResolvedOptions;
    }
    constructor(public el: HTMLElement, options?: TimeChartOptions<TPlugins>) {
        const shadowRoot = el.attachShadow({ mode: "open" });

        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "../dist/timechart.css");
        shadowRoot.appendChild(linkElem);

        super(el, makeDefaultPlugins<TPlugins>(options));
    }
}
