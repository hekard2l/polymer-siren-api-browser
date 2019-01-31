import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import './siren-classes.js';
import './siren-properties.js';
import './siren-links.js';
import './siren-actions.js';
import './siren-subentities.js';
import '../styles/shared-styles.js';
import './loading-modal.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-entity">
	<template strip-whitespace="">
		<style include="shared-styles">
			.left {
				max-width: 40%;
			}
		</style>
		<loading-modal active="{{!loaded}}"></loading-modal>
		<div class="flex-parent">
			<div class="flex-1 left">
				<h1>{{entity.title}}</h1>
				<siren-classes href="{{href}}" token="{{token}}"></siren-classes>
				<siren-properties href="{{href}}" token="{{token}}"></siren-properties>
					<siren-links href="{{href}}" token="{{token}}"></siren-links>
				<siren-actions href="{{href}}" token="{{token}}"></siren-actions>
			</div>
			<div class="flex-2">
					<siren-subentities href="{{href}}" token="{{token}}"></siren-subentities>
			</div>
		</div>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenEntity extends window.SirenEntityMixin(PolymerElement) {
    static get is() { return 'siren-entity'; }
}

window.customElements.define(SirenEntity.is, SirenEntity);
