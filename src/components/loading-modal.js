import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-spinner/paper-spinner.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="loading-modal">
	<template strip-whitespace="">
		<style>
			.modal {
					display: none;
					position: fixed;
					z-index: 1;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					overflow: auto;
					background-color: rgb(0,0,0);
					background-color: rgba(0,0,0,0.4);
			}
			.active {
				display: block;
			}
			.spinner {
				margin-left: auto;
				margin-right: auto;
			}
		</style>
		<div class\$="[[classes]]" on-click="_hide">
			<div class="spinner">
				<paper-spinner active="" class="thick"></paper-spinner>
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
                value: false,
                reflectToAttribute: true
            },
            classes: {
                type: String,
                value: ''
            }
				};
    }
    static get observers() {
				return [
            '_updateClasses(active)'
				];
    }
    _updateClasses(active) {
				this.classes = active ? 'modal active' : 'modal';
    }
    _hide() {
				this.classes = "modal";
    }
}

window.customElements.define(LoadingModal.is, LoadingModal);
