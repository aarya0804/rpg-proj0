import { html, fixture, expect } from '@open-wc/testing';
import "../rpg-proj0.js";

describe("RpgProj0 test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <rpg-proj0
        title="title"
      ></rpg-proj0>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
