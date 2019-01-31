import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import './entities/siren-object-properties.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-properties">
	<template strip-whitespace="">
		<siren-object-properties href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-properties>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenProperties extends window.SirenEntityMixin(PolymerElement) {
    static get is() { return 'siren-properties'; }
}

window.customElements.define(SirenProperties.is, SirenProperties);
