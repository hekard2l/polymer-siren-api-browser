import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import './entities/siren-object-actions.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-actions">
	<template strip-whitespace="">
		<siren-object-actions href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-actions>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenActions extends window.SirenEntityMixin(PolymerElement) {
    static get is() { return 'siren-actions'; }
}

window.customElements.define(SirenActions.is, SirenActions);
