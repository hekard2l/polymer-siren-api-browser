import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import './entities/siren-object-subentities.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-subentities">
	<template strip-whitespace="">
		<siren-object-subentities href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-subentities>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenSubEntities extends window.SirenEntityMixin(PolymerElement) {
    static get is() { return 'siren-subentities'; }
}
window.customElements.define(SirenSubEntities.is, SirenSubEntities);
