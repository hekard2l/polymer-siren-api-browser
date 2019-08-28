import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../utility/siren-entity-mixin.js';
import '../../styles/shared-styles.js';
import '../pre-json.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-object-classes">
	<template strip-whitespace>
		<style include="shared-styles"></style>
		<template is="dom-if" if="{{hasClasses}}">
			<h2>Classes</h2>
			<div class="pre">
				<pre-json json="{{classes}}"></pre-json>
			</div>
		</template>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
class SirenObjectClasses extends PolymerElement {

	static get is() { return 'siren-object-classes'; }

	static get properties() {
		return {
			entity: {
				type: Object
			},
			token: {
				type: String
			},
			href: {
				type: String,
				notify: true
			},
			classes: {
				type: String,
				value: ''
			},
			hasClasses: {
				type: Boolean,
				computed: '_hasClasses(entity)',
				value: false
			},
		};
	}
	static get observers() {
		return [
			'_changed(entity)'
		];
	}
	_changed() {
		this.classes = this._getClasses();
	}
	_hasClasses(entity) {
		return entity && entity.class;
	}
	_getClasses() {
		return this._hasClasses(this.entity) && JSON.stringify(this.entity.class, null, 2) || '';
	}
}

window.customElements.define(SirenObjectClasses.is, SirenObjectClasses);
