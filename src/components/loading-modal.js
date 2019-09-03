import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-spinner/paper-spinner.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="loading-modal">
	<template strip-whitespace>
		<div hidden$="{{!active}}" on-click="_hide">
			<div class="spinner">
				<paper-spinner
					active=[[active]]
					class="thick">
				</paper-spinner>
			</div>
		</div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
class LoadingModal extends PolymerElement {
	static get is() { return 'loading-modal'; }
	static get properties() {
		return {
			active: {
				type: Boolean,
				reflectToAttribute: true,
				value: false
			}
		};
	}
}

window.customElements.define(LoadingModal.is, LoadingModal);
