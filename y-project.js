import {LitElement, html, css} from 'lit';

export class YProject extends LitElement {
  static get styles() {
    return css`
      #container {
        padding: 32px 64px;
        display: flex;
        flex-flow: row;
        align-items: center;
      }

      #content {
        display: flex;
        flex-flow: column;
        padding: 0 32px;
      }

      #title {
        font-size: 48px;
        line-height: 48px;
        font-weight: 700;
      }

      #chips {
        display: flex;
        flex-flow: row;
        margin: 16px 0;
      }

      .chip {
        background-color: rgba(35, 37, 42, 0.2);
        border-radius: 16px;
        padding: 4px 8px;
        margin-right: 8px;
      }

      #promo {
        width: 270px;
        height: 180px;
        background-color: grey;
        border-radius: 16px;
        flex-shrink: 0;
      }

      #description {
        line-break: auto;
        box-sizing: border-box;
        padding-bottom: 16px;
      }

      a {
        color: #23252a;
        margin-right: 16px;
      }

      .arrow {
        width: 16px;
        height: 16px;
        margin: 0px -3px -3px 0;
      }
    `;
  }

  static get properties() {
    return {
      name: {type: String},
      tags: {type: String},
      description: {type: String},
      links: {type: String},
    };
  }

  constructor() {
    super();
    this.name = '';
    this.tags = '';
    this.description = '';
    this.links = '';
  }

  render() {
    return html`
      <div id="container">
        <!--suppress HtmlRequiredAltAttribute -->
        <img id="promo">
        <div id="content">
          <div id="title">${this.name}</div>
          <div id="chips">
            ${this.tags
              .split(',')
              .map((tag) => html`<div class="chip">${tag}</div>`)}
          </div>
          <div id="description">${this.description}</div>
          <div id="links">
            ${this.links
              .split(';;')
              .filter((s) => s !== '')
              .map((s) => {
                let link = s.split(';');
                return html`<a href="${link[1]}"><!--suppress HtmlRequiredAltAttribute -->
                  <img class="arrow" src="north_east_FILL0_wght400_GRAD0_opsz48.svg"> ${link[0]}</a>`
              })}
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('y-project', YProject);
