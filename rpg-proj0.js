/**
 * Copyright 2025 aarya0804
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";

/**
 * `rpg-proj0`
 *
 * @demo index.html
 * @element rpg-proj0
 */
export class RpgProj0 extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-proj0";
  }

  constructor() {
    super();
    this.title = "";
    this.items = [];
    this.org = "haxtheweb";
    this.repo = "webcomponents";
    this.limit = 20;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-proj0.ar.json", import.meta.url).href + "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      items: { type: Array },
      org: { type: String },
      repo: { type: String },
      limit: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
        }
        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }
        h3 span {
          font-size: var(--rpg-proj0-label-font-size, var(--ddd-font-size-s));
        }

        .rpg {
          display: flex;
        }
      `,
    ];
  }

  getData() {
    const url = `https://api.github.com/repos/${this.org}/${this.repo}/contributors`;
    try {
      fetch(url)
        .then((d) => (d.ok ? d.json() : {}))
        .then((data) => {
          if (data) {
            this.items = [];
            this.items = data;
          }
        });
    } catch (error) {
      console.error("ERRORRRR");
    }
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    if (changedProperties.has("items")) {
      this.getData();
    }
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <h3><span>${this.t.title}:</span> ${this.title}</h3>
      ${this.items
        .filter((item, index) => index < this.limit)
        .map(
          (item) => html`
            <div class="rpg">
              <rpg-character seed="${item.login}"></rpg-character>
              <p>${item.login}</p>
              <p>${item.contributions}</p>
              <p>${item.type}</p>
              <p>${item.site_admin}</p>
              <p>${item.id}</p>
            </div>
          `
        )}
      <slot></slot>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(RpgProj0.tag, RpgProj0);
