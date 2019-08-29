import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '../utility/siren-entity-mixin.js';
import './siren-classes.js';
import './siren-properties.js';
import './siren-links.js';
import './siren-actions.js';
import './siren-subentities.js';
import './siren-rawentity.js';
import '../styles/shared-styles.js';
import './loading-modal.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-entity">
	<template strip-whitespace>
		<style is="custom-style" include="shared-styles">
			.left, .right {
				display: block;
				max-width: 100vw;
			}

			.loading {
				@apply --layout-vertical;
				@apply --layout-center;
			}

			.loading loading-modal[active] {
				margin-top: 5rem;
			}

			@media only screen and (min-width: 768px) {
				.container {
					@apply --layout-horizontal;
					@apply --layout-justified;
					@apply --layout-wrap;
				}

				.left {
					max-width: 40%;
					@apply --layout-flex;
				}
				.right {
					positive: relative;
					max-width: 58%;
					@apply --layout-flex;
				}
			}
		</style>
		<div class="loading">
			<loading-modal active="{{!loaded}}"></loading-modal>
		</div>
		<div hidden$="{{!loaded}}">
			<siren-rawentity
				href="{{href}}"
				token="{{token}}">
			</siren-rawentity>
		</div>
		<div hidden$="{{!loaded}}" class="container">
			<div class="left">
				<h1>{{entity.title}}</h1>
				<siren-classes href="{{href}}" token="{{token}}"></siren-classes>
				<siren-properties href="{{href}}" token="{{token}}"></siren-properties>
					<siren-links href="{{href}}" token="{{token}}"></siren-links>
				<siren-actions href="{{href}}" token="{{token}}"></siren-actions>
			</div>
			<div class="right">
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
