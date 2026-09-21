import { Plugin } from "obsidian";

export default class TripPlugin extends Plugin {

    onload() {

        this.registerMarkdownCodeBlockProcessor(
            "trip",
            (source, el, ctx) => {

                const lines = source.split("\n");

                // =========================
                // MAIN
                // =========================

                const main = el.createDiv({
                    cls: "trip"
                });


                // =========================
                // TITLE
                // =========================

                const titleLine = lines.find(line =>
                    line.trim().startsWith("- title:")
                );

                const title = titleLine
                    ? titleLine.replace("- title:", "").trim()
                    : "";

                if (title === "") {

                    this.createError(
                        main,
                        "Missing required field: title"
                    );

                } else {

                    main.createDiv({
                        cls: "trip-title",
                        text: title
                    });

                }


                // =========================
                // SIDE
                // =========================

                const sideLine = lines.find(line =>
                    line.trim().startsWith("- side:")
                );

                const sideValue = sideLine
                    ? sideLine.replace("- side:", "").trim().toLowerCase()
                    : "left";

                const side = sideValue === "right"
                    ? "right"
                    : "left";

                main.classList.add(`side-${side}`);


                // =========================
                // EVENTS
                // =========================

                for (let i = 0; i < lines.length; i++) {

                    const line = lines[i].trim();

                    let type = "";

                    if (line.startsWith("- start:")) {
                        type = "start";
                    }

                    else if (line.startsWith("- stop:")) {
                        type = "stop";
                    }

                    else if (line.startsWith("- destination:")) {
                        type = "destination";
                    }

                    if (type === "") {
                        continue;
                    }


                    // =========================
                    // EVENT BLOKK
                    // =========================

                    const eventLines: string[] = [];

                    for (
                        let j = i + 1;
                        j < lines.length;
                        j++
                    ) {

                        const nextLine = lines[j].trim();

                        // Következő event kezdete
                        if (
                            nextLine.startsWith("- start:") ||
                            nextLine.startsWith("- stop:") ||
                            nextLine.startsWith("- destination:")
                        ) {
                            break;
                        }

                        eventLines.push(nextLine);
                    }


                    // =========================
                    // EVENT ADATOK
                    // =========================

                    const dateLine = eventLines.find(line =>
                        line.startsWith("- date:")
                    );

                    const locationLine = eventLines.find(line =>
                        line.startsWith("- location:")
                    );

                    const descriptionLine = eventLines.find(line =>
                        line.startsWith("- description:")
                    );


                    const date = dateLine
                        ? dateLine.replace("- date:", "").trim()
                        : "";

                    const location = locationLine
                        ? locationLine.replace("- location:", "").trim()
                        : "";

                    const description = descriptionLine
                        ? descriptionLine.replace("- description:", "").trim()
                        : "";


                    // =========================
                    // HIBÁK
                    // =========================

                    const errors: string[] = [];

                    if (date === "") {
                        errors.push("Missing required field: date");
                    }

                    if (location === "") {
                        errors.push("Missing required field: location");
                    }

                    if (description === "") {
                        errors.push("Missing required field: description");
                    }


                    // =========================
                    // EVENT
                    // =========================

                    const event = main.createDiv({
                        cls: `trip-event ${type}`
                    });


                    // =========================
                    // TIMELINE
                    // =========================

                    const sideContainer = event.createDiv({
                        cls: "trip-event-side"
                    });

                    sideContainer.createDiv({
                        cls: "trip-timeline"
                    });

                    sideContainer.createDiv({
                        cls: "trip-dot"
                    });


                    // =========================
                    // CONTENT
                    // =========================

                    const content = event.createDiv({
                        cls: "trip-event-content"
                    });


                    // =========================
                    // HIBA
                    // =========================

                    if (errors.length > 0) {

                        const error = content.createDiv({
                            cls: "trip-error"
                        });

                        error.createEl("strong", {
                            text: `Invalid ${type} event`
                        });

                        for (const message of errors) {

                            error.createDiv({
                                cls: "trip-error-message",
                                text: message
                            });

                        }

                        continue;
                    }


                    // =========================
                    // HELYSZÍN
                    // =========================

                    content.createEl("h2", {
                        text: location
                    });


                    // =========================
                    // IDŐ
                    // =========================

                    content.createDiv({
                        cls: "trip-date",
                        text: date
                    });


                    // =========================
                    // LEÍRÁS
                    // =========================

                    content.createDiv({
                        cls: "trip-description",
                        text: description
                    });

                }

            }
        );

    }


    // =========================
    // ERROR
    // =========================

    private createError(
        parent: HTMLElement,
        message: string
    ) {

        const error = parent.createDiv({
            cls: "trip-error"
        });

        error.createEl("strong", {
            text: "Trip configuration error"
        });

        error.createDiv({
            cls: "trip-error-message",
            text: message
        });

    }


    onunload() {

    }

}