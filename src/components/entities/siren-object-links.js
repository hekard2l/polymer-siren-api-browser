import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-item/paper-item.js';
import '../../utility/siren-entity-mixin.js';
import '../../styles/shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-object-links">
	<template strip-whitespace="">
		<style include="shared-styles">
			li {
				list-style-type: circle;
			}
		</style>
		<template is="dom-if" if="{{hasLinks}}">
				<h2>Links</h2>
				<ul>
					<template is="dom-repeat" items="{{links}}">
						<li>
								<a on-click="_select">{{_getRels(item)}}</a>
						</li>
					</template>
				</ul>
		</template>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
class SirenObjectLinks extends PolymerElement {

	static get is() { return 'siren-object-links'; }
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
			links: {
				type: Array,
				value: []
			},
			hasLinks: {
				type: Boolean,
				computed: '_hasLinks(entity)',
				value: false
			}
		};
	}
	static get observers() {
		return [
			'_changed(entity)'
		];
	}
	_changed(entity) {
		this.links = entity && entity.links || [];
	}
	_select(event) {
		const item = event.model.item;
		this.href = item.href;
	}
	_hasLinks(entity) {
		return entity && entity.links && entity.links.length > 0;
	}
	_getRels(item) {
		return item.rel.join(',');
	}
}

window.customElements.define(SirenObjectLinks.is, SirenObjectLinks);
