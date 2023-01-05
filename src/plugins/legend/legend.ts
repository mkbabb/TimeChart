import { RenderModel } from "../../core/renderModel";
import { ResolvedCoreOptions, TimeChartSeriesOptions } from "../../options";
import { TimeChartPlugin } from "..";

import styles from "./style.module.scss";

export class Legend {
    legend: HTMLElement;
    items = new Map<TimeChartSeriesOptions, HTMLElement>();

    constructor(
        private el: HTMLElement,
        private model: RenderModel,
        private options: ResolvedCoreOptions
    ) {
        const shadowRoot = el.shadowRoot!;
        console.log(styles);

        this.legend = document.createElement("div");
        this.legend.classList.add(styles.legend);

        this.legend.style.right = `${options.paddingRight}px`;
        this.legend.style.top = `${options.paddingTop}px`;

        shadowRoot.appendChild(this.legend);

        model.updated.on(() => this.update());

        model.disposing.on(() => {
            shadowRoot.removeChild(this.legend);
        });

        this.update();
    }

    update() {
        if (!this.options.legend) {
            this.legend.style.display = "none";
            return;
        }
        for (const series of this.options.series) {
            if (!this.items.has(series)) {
                const item = document.createElement("div");
                item.classList.add(styles["legend__item"]);

                const name = document.createElement("label");
                name.textContent = series.name;
                item.appendChild(name);

                const preview = document.createElement("div");
                preview.classList.add(styles["preview"]);
                item.appendChild(preview);

                item.addEventListener("click", () => {
                    series.visible = !series.visible;
                    this.model.update();
                });

                this.legend.appendChild(item);

                this.items.set(series, item);
            }

            const item = this.items.get(series)!;
            const preview: HTMLElement = item.querySelector(
                "." + styles["preview"]
            )!;
            item.classList.toggle(styles["visible"], series.visible);
            preview.style.height = `${
                series.lineWidth ?? this.options.lineWidth
            }px`;
            preview.style.backgroundColor = (
                series.color ?? this.options.color
            ).toString();
        }
    }
}

export const legend: TimeChartPlugin<Legend> = {
    apply(chart) {
        return new Legend(chart.el, chart.model, chart.options);
    },
};
