import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/paper-styles/color.js';
import './styles/shared-styles.js';
import './components/siren-entity.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="polymer-siren-api-browser">
	<template strip-whitespace="">
		<style include="shared-styles">
			:host {
				display: block;
			}
		.blue {
			background-color: #dedede;
		}
		.input {
			width: 40%;
		}
		.go {
			margin-left: auto;
			margin-right: auto;
		}
		app-header {
			color: #fff;
			background-color: var(--app-primary-color);
		}

		app-header paper-icon-button {
			--paper-icon-button-ink-color: white;
		}

		app-toolbar {
			background-color: #f5f5f5;
		}
		</style>
	<app-header-layout>
		<app-header condenses="" reveals="" effect="waterfall">
			<app-toolbar>
				<paper-input placeholder="Siren API url" value="{{url}}" class="input"></paper-input>
				<paper-input placeholder="Auth token" value="{{token}}" class="input"></paper-input>
				<paper-toggle-button checked="{{loggedIn}}" disabled="{{disableLogin}}" class="go">Go</paper-toggle-button>
				<paper-button on-click="_clearStore">Clear Store</paper-button>
			</app-toolbar>
		</app-header>
		<div class="main">
			<template is="dom-if" if="{{loggedIn}}">
				<siren-entity href="{{url}}" token="{{token}}"></siren-entity>
			</template>
		</div>
	</app-header-layout>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/**
		* @customElement
		* @polymer
		*/
class PolymerSirenApiBrowser extends PolymerElement {
		static get is() { return 'polymer-siren-api-browser'; }
		static get properties() {
        return {
            url: {
                type: String,
                value: '',
                observer: '_urlChanged'
            },
            token: {
                type: String,
                value: ''
            },
            disableLogin: {
                type: Boolean,
                value: true
            },
            loggedIn: {
                type: Boolean,
                value: false
            }
        };
		}
		_urlChanged(url) {
        if (url === '') {
            this.disableLogin = true;
            return;
        }
        this.disableLogin = false;
        if (window.history.state && window.history.state.url === url) {
            return;
        }
        window.history.pushState({ url }, url);
		}

		_onPopstate(event) {
        const { url } = event.state;
        if (url) {
            this.url = url;
        }
		}

		_clearStore() {
        window.D2L.EntityStore._store = new Map();
		}

		constructor() {
        super();
        this._boundOnPopstate = this._onPopstate.bind(this);
		}

		connectedCallback() {
        if (super.connectedCallback) {
            super.connectedCallback();
        }
        window.addEventListener('popstate', this._boundOnPopstate);
		}

		disconnectedCallback() {
        if (super.disconnectedCallback) {
            super.disconnectedCallback();
        }
        window.removeEventListener('popstate', this._boundOnPopstate);
		}
}

window.customElements.define(PolymerSirenApiBrowser.is, PolymerSirenApiBrowser);
