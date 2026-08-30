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
        var _a, _b, _c, _d, _e, _f;
        const lines = source.split("\n");
        const main = el.createDiv({
          cls: "trip"
        });
        const titleLine = lines.find(
          (line) => line.trim().startsWith("- title:")
        );
        const title = titleLine ? titleLine.replace("- title:", "").trim() : "";
        main.createDiv({
          cls: "trip-title",
          text: title
        });
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
          const date = (_b = (_a = lines[i + 1]) == null ? void 0 : _a.replace("- date:", "").trim()) != null ? _b : "";
          const location = (_d = (_c = lines[i + 2]) == null ? void 0 : _c.replace("- location:", "").trim()) != null ? _d : "";
          const description = (_f = (_e = lines[i + 3]) == null ? void 0 : _e.replace("- description:", "").trim()) != null ? _f : "";
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
};
