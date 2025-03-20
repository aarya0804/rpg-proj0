/**
 * Copyright 2025 aarya0804
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";

/**
 * `github-rpg-contributors`
 *
 * @demo index.html
 * @element github-rpg-contributors
 */
export class GithubRPGContributors extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "github-rpg-contributors";
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
          font-size: var(
            --github-rpg-contributors-label-font-size,
            var(--ddd-font-size-s)
          );
        }

        .rpg {
          display: inline-flex;
        }

        .character-info p {
          display: block;
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
    if (changedProperties.has("org") || changedProperties.has("repo")) {
      this.getData();
    }
  }

  // Lit render the HTML
  render() {
    return html` <div class="wrapper">
      <div class="rpg">
        ${this.items
          .filter((item, index) => index < this.limit)
          .map(
            (item) => html`
              <div class="character">
                <p>${item.login}</p>
                <rpg-character seed="${item.login}"></rpg-character>
                <div class="character-info">
                  <p>${item.contributions}</p>
                  <p>${item.type}</p>
                  <p>${item.site_admin}</p>
                  <p>${item.id}</p>
                </div>
              </div>
            `
          )}
      </div>
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

globalThis.customElements.define(
  GithubRPGContributors.tag,
  GithubRPGContributors
);
