import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import './entities/siren-object-classes.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-classes">
	<template strip-whitespace="">
		<siren-object-classes href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-classes>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenClasses extends window.SirenEntityMixin(PolymerElement) {

	static get is() { return 'siren-classes'; }
}
window.customElements.define(SirenClasses.is, SirenClasses);
