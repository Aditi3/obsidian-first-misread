import { Plugin } from "obsidian";

export default class FirstMisreadPlugin extends Plugin {
  async onload() {
    console.log("First Misread plugin loaded");
  }

  async onunload() {
    console.log("First Misread plugin unloaded");
  }
}
