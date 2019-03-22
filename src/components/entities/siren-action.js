import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-button/paper-button.js';
import '../../utility/siren-action-mixin.js';
import '../../styles/shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-action">
	<template strip-whitespace>
		<style include="shared-styles">
			:host {
				display: block;
			}

			.form {
				width: 500px;
				max-width: 1000px;
				padding: 1em;
			}

			.form .input {
				padding: .25em;
			}

			paper-card {
				width: 100%;
				padding: 1em;
			}
			paper-input: {
				margin-top: .25em;
			}
			.right {
				float: right;
			}
		</style>
		<paper-card>
			<form class="form">
					<template is="dom-repeat" items="{{fields}}">
						<paper-input class="input" value="{{item.value}}" type="[[item.type]]" label="[[item.name]]"></paper-input>
					</template>
				<paper-button raised="" class="indigo" on-click="_go">Execute</paper-button>
			</form>
		</paper-card>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenActionMixin */
class SirenAction extends window.SirenActionMixin(PolymerElement) {
	static get is() {
		return 'siren-action';
	}
	static get properties() {
		return {
			href: {
				reflectToAttribute: true,
				notify: true,
			},
			action: {
				type: Object,
				reflectToAttribute: true,
			},
			fields: {
				type: Array,
				value: [],
			},
		};
	}
	static get observers() {
		return [
			'_changed(action)',
		];
	}

	_go() {
		const fieldObjects = this.getSirenFields(this.action);
		for (const field of this.fields) {
			if (field.value === undefined) {
				continue;
			}
			fieldObjects.set(field.name, field.value);
		}
		this.performSirenAction(this.action, fieldObjects);
		this.href = this.getEntityUrl(this.action, fieldObjects).href;
	}
	_changed(action) {
		this.fields = action.fields || [];
	}
}

window.customElements.define(SirenAction.is, SirenAction);
