var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TripPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var TripPlugin = class extends import_obsidian.Plugin {
  onload() {
    this.registerMarkdownCodeBlockProcessor(
      "trip",
      (source, el, ctx) => {
        const lines = source.split("\n");
        const main = el.createDiv({
          cls: "trip"
        });
        const titleLine = lines.find(
          (line) => line.trim().startsWith("- title:")
        );
        const title = titleLine ? titleLine.replace("- title:", "").trim() : "";
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
        const sideLine = lines.find(
          (line) => line.trim().startsWith("- side:")
        );
        const sideValue = sideLine ? sideLine.replace("- side:", "").trim().toLowerCase() : "left";
        const side = sideValue === "right" ? "right" : "left";
        main.classList.add(`side-${side}`);
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          let type = "";
          if (line.startsWith("- start:")) {
            type = "start";
          } else if (line.startsWith("- stop:")) {
            type = "stop";
          } else if (line.startsWith("- destination:")) {
            type = "destination";
          }
          if (type === "") {
            continue;
          }
          const eventLines = [];
          for (let j = i + 1; j < lines.length; j++) {
            const nextLine = lines[j].trim();
            if (nextLine.startsWith("- start:") || nextLine.startsWith("- stop:") || nextLine.startsWith("- destination:")) {
              break;
            }
            eventLines.push(nextLine);
          }
          const dateLine = eventLines.find(
            (line2) => line2.startsWith("- date:")
          );
          const locationLine = eventLines.find(
            (line2) => line2.startsWith("- location:")
          );
          const descriptionLine = eventLines.find(
            (line2) => line2.startsWith("- description:")
          );
          const date = dateLine ? dateLine.replace("- date:", "").trim() : "";
          const location = locationLine ? locationLine.replace("- location:", "").trim() : "";
          const description = descriptionLine ? descriptionLine.replace("- description:", "").trim() : "";
          const errors = [];
          if (date === "") {
            errors.push("Missing required field: date");
          }
          if (location === "") {
            errors.push("Missing required field: location");
          }
          if (description === "") {
            errors.push("Missing required field: description");
          }
          const event = main.createDiv({
            cls: `trip-event ${type}`
          });
          const sideContainer = event.createDiv({
            cls: "trip-event-side"
          });
          sideContainer.createDiv({
            cls: "trip-timeline"
          });
          sideContainer.createDiv({
            cls: "trip-dot"
          });
          const content = event.createDiv({
            cls: "trip-event-content"
          });
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
  // =========================
  // ERROR
  // =========================
  createError(parent, message) {
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
};
