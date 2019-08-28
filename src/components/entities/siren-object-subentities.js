import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import './siren-subentity.js';
import '../../styles/shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-object-subentities">
	<template strip-whitespace>
		<style include="shared-styles"></style>
		<h2>Entities</h2>
		<ul>
			<template is="dom-repeat" items="{{entities}}">
				<li>
					<siren-subentity href="{{href}}" entity="{{item}}"></siren-subentity>
				</li>
			</template>
		</ul>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
class SirenObjectSubEntities extends PolymerElement {

	static get is() { return 'siren-object-subentities'; }
	static get properties() {
		return {
			entities: {
				type: Array,
				value: []
			},
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
		};
	}
	static get observers() {
		return [
			'_changed(entity)'
		];
	}
	_changed(entity) {
		this.entities = entity.entities || [];
	}
}

window.customElements.define(SirenObjectSubEntities.is, SirenObjectSubEntities);
