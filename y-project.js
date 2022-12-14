import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';


export class YProject extends LitElement {
  static get styles() {
    return css`
      #container {
        padding: 32px 64px;
        display: flex;
        flex-flow: row;
        align-items: center;
        font-size: var(--font_body);
      }

      #content {
        display: flex;
        flex-flow: column;
        padding: 0 32px;
      }


      #title {
        font-size: var(--font_projects);
        line-height: var(--font_projects);
        font-weight: 700;
      }

      #chips {
        display: flex;
        flex-flow: row;
        flex-wrap: wrap;
        margin: 8px 0 16px 0;
      }

      .chip {
        background-color: rgba(35, 37, 42, 0.2);
        border-radius: 16px;
        padding: 4px 8px;
        margin: 8px 8px 0 0;
      }

      #promo {
        width: 270px;
        height: 180px;
        object-fit: cover;
        opacity: 0.6;
        transition: opacity ease-in 0.2s;
        flex-shrink: 0;
        border-radius: 8px;
      }
      
      #container:hover #promo {
        opacity: 1;
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
        margin-bottom: -3px;
      }

      @media screen and (max-width: 920px) {
        #promo {
          width: 210px;
          height: 140px;
        }
      }

      @media screen and (max-width: 640px) {
        #container {
          padding: 32px;
          flex-flow: column;
        }
        
        #promo {
          width: 270px;
          height: 180px;
          margin-bottom: 16px;
        }
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
        <img id="promo" src="assets/${this.name.toLowerCase().replaceAll(" ", "-")}.png">
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
                return html`<a href="${link[1]}"><img class="arrow" src="assets/north_east_FILL0_wght400_GRAD0_opsz48.svg">&nbsp;${link[0]}</a>`
              })}
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define('y-project', YProject);
