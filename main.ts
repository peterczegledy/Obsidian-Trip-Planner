import { Plugin } from "obsidian";

export default class TripPlugin extends Plugin {

    onload() {

        this.registerMarkdownCodeBlockProcessor(
            "trip",
            (source, el, ctx) => {

                const lines = source.split("\n");

                const main = el.createDiv({
                    cls: "trip"
                });

                const titleLine = lines.find(line =>
                    line.trim().startsWith("- title:")
                );

                const title = titleLine
                    ? titleLine.replace("- title:", "").trim()
                    : "";

                main.createDiv({
                    cls: "trip-title",
                    text: title
                });


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


                    const date = lines[i + 1]
                        ?.replace("- date:", "")
                        .trim() ?? "";

                    const location = lines[i + 2]
                        ?.replace("- location:", "")
                        .trim() ?? "";

                    const description = lines[i + 3]
                        ?.replace("- description:", "")
                        .trim() ?? "";


                    const event = main.createDiv({
                        cls: `trip-event ${type}`
                    });


                    const side = event.createDiv({
                        cls: "trip-event-side"
                    });


                    side.createDiv({
                        cls: "trip-timeline"
                    });


                    side.createDiv({
                        cls: "trip-dot"
                    });


                    const content = event.createDiv({
                        cls: "trip-event-content"
                    });


                    content.createEl("h2", {
                        text: location
                    });


                    content.createDiv({
                        cls: "trip-date",
                        text: date
                    });


                    content.createDiv({
                        cls: "trip-description",
                        text: description
                    });

                }

            }
        );

    }

    onunload() {

    }

}