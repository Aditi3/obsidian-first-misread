import { ItemView, WorkspaceLeaf } from "obsidian";
import { render, h } from "preact";
import type FirstMisreadPlugin from "../main";
import { Analyzer } from "./Analyzer";

export const VIEW_TYPE = "first-misread-panel";

export class FirstMisreadView extends ItemView {
  plugin: FirstMisreadPlugin;

  constructor(leaf: WorkspaceLeaf, plugin: FirstMisreadPlugin) {
    super(leaf);
    this.plugin = plugin;
  }

  getViewType(): string {
    return VIEW_TYPE;
  }

  getDisplayText(): string {
    return "First Misread";
  }

  getIcon(): string {
    return "eye";
  }

  async onOpen() {
    const container = this.contentEl;
    container.empty();
    container.addClass("first-misread-panel");

    render(
      h(Analyzer, {
        app: this.app,
        settings: this.plugin.settings,
      }),
      container
    );
  }

  async onClose() {
    render(null, this.contentEl);
  }
}
