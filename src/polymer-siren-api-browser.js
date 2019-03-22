import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-a11y-keys/iron-a11y-keys.js';
import '@polymer/app-route/app-location.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-input/paper-textarea.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-styles/color.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import './components/siren-entity.js';
class PolymerSirenApiBrowser extends PolymerElement {
	static get is() { return 'polymer-siren-api-browser'; }
	static get template() {
		return html`
		<style include="paper-material-styles">
			:host {
				display: block;
			}
			:host([hide-entity]) siren-entity {
				display: none;
			}
			app-toolbar {
				height: 48px;
				padding: 16px;
				background: #fff;
			}
			app-header {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				--app-header-background-front-layer: {
					background-color: #fafafa;
				};
				--app-header-background-rear-layer: {
					background-color: #fff;
				};
			}
			paper-input {
				width: 100%;
			}
			paper-button, paper-checkbox {
				background: var(--default-secondary-color);
				@apply --paper-font-button;
			}
			.options {
				display: flex;
				justify-content: start;
				align-items: center;
			}
		</style>
		<iron-a11y-keys
			id="a11y"
			target="[[_computeHeader()]]"
			keys="enter"
			on-keys-pressed="_goForceRefresh"></iron-a11y-keys>
		<app-location route="{{route}}" use-hash-as-path></app-location>
		<app-header-layout>
			<app-header id="header" slot="header" fixed condenses effects="waterfall parallax-background">
				<app-toolbar>
					<paper-input always-float-label label="Auth token" value="{{token}}"></paper-input>
				</app-toolbar>
				<app-toolbar style="height: 0.3rem">
					<div class="options">
						<paper-checkbox>Disable Cache</paper-checkbox>
						<paper-button on-tap="_refresh">Refresh</paper-button>
						<paper-button on-tap="_clearStore">Clear Cache</paper-button>
					</div>
				</app-toolbar>
				<app-toolbar class="mini">
					<paper-input always-float-label label="Hypermedia URL" value="{{url}}"></paper-input>
					<paper-button raised on-tap="_goForceRefresh">Go</paper-button>
				</app-toolbar>
			</app-header>
			<div>
				<siren-entity
					id="rootEntity"
					disable-cache="{{disableCache}}"
					href="{{entityUrl}}"
					token="{{token}}"></siren-entity>
			</div>
		</app-header-layout>`;
	}
	static get properties() {
		return {
			route: Object,
			url: {
				type: String,
				value: ''
			},
			token: {
				type: String,
				value: ''
			},
			entityUrl: {
				type: String,
				observer: '_entityUrlChanged'
			},
			disableCache: {
				type: Boolean,
				value: false
			},
			hideEntity: {
				type: Boolean,
				reflectToAttribute: true,
				value: true,
				computed: '_computeHideEntity(entityUrl)'
			}
		};
	}

	static get observers() {
		return [
			'_routeChanged(route.hash, route.path)'
		];
	}

	ready() {
		super.ready();
		const { url, token } = this._appState(this._hash());
		this.url = url || '';
		this.token = token || '';
	}

	_go(forceRefresh) {
		const newUrl = this.url;
		const newToken = this.token;
		const { url, token } = this._appState(this._hash());
		if (forceRefresh || (newUrl !== '' && newUrl !== url && newToken !== token)) {
			this._updateLocationHash(newUrl, newToken);
			this.entityUrl = newUrl;
		}
	}

	_goForceRefresh() {
		return this._go(true);
	}

	_appState(search) {
		try {
			if (search.replace(/\s+/, '') !== '') {
				const raw = atob(search);
				const { url, token } = JSON.parse(raw);
				return { url, token };
			} else {
				return {};
			}
		} catch (err) {
			window.location.hash = '';
			console.error(err.stack);
			return {};
		}
	}

	_refresh() {
		this.$.rootEntity.forceRefresh();
	}

	_clearStore() {
		window.D2L.EntityStore._store = new Map();
	}

	_entityUrlChanged(entityUrl) {
		this._updateLocationHash(entityUrl, this.token);
		this.url = entityUrl;
	}

	_updateLocationHash(newUrl, newToken) {
		const path = btoa(JSON.stringify({
			url: newUrl,
			token: newToken
		}));
		const hash = '#' + path;
		const hasStateAlready = window.history.state &&
			window.history.state.hash === hash;
		if (!hasStateAlready) {
			window.history.pushState({ hash }, '', hash);
		}
	}

	_hash() {
		if (!this.route) {
			return '';
		}
		return this.route.hash || this.route.path;
	}

	_routeChanged(hash, path) {
		try {
			const { url, token } = this._appState(hash || path);
			this.url = url;
			this.token = token;
			this.entityUrl = this.url;
		} catch (err) {
			console.error(err.stack);
		}
	}

	_computerHeader() {
		if (!this.$) {
			return undefined;
		}
		return this.$.header;
	}

	_computeHideEntity(entityUrl) {
		return !entityUrl;
	}
}

window.customElements.define(PolymerSirenApiBrowser.is, PolymerSirenApiBrowser);
