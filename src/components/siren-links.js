import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import './entities/siren-object-links.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-links">
	<template strip-whitespace>
		<siren-object-links href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-links>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenLinks extends window.SirenEntityMixin(PolymerElement) {
	static get is() { return 'siren-links'; }
}

window.customElements.define(SirenLinks.is, SirenLinks);
