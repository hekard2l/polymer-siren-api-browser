import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/paper-styles.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '@polymer/paper-button/paper-button.js';
import '../../utility/siren-entity-mixin.js';
import './siren-object-properties.js';
import './siren-object-links.js';
import './siren-object-classes.js';
import './siren-object-actions.js';
import './siren-object-subentities.js';
import '../../styles/shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-subentity">
	<template strip-whitespace>
		<style include="shared-styles paper-material-styles">
			.entity {
				background-color: #fff;
				padding: 1em;
			}
			.accordian {
				margin-bottom: .2em;
				text-align: left;
			}
			h3 {
				padding: .2em;
				padding-left: 1em;
			}
			h3:hover {
				text-decoration: underline;
			}
		</style>
		<div class="pre accordian">
			<h3 on-click="_toggle">
				<template is="dom-if" if="{{entity.title}}">
					<span>title: {{entity.title}},</span>
				</template>
				<span>classes: {{_getClasses(entity)}}, rels: {{_getRels(entity)}}</span>
			</h3>
			<iron-collapse opened="{{opened}}">
				<div class="entity">
					<siren-object-classes href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-classes>
					<siren-object-properties href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-properties>
					<siren-object-links href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-links>

					<template is="dom-if" if="{{hasActions}}">
						<paper-toggle-button checked="{{showActions}}">Show Actions</paper-toggle-button>
						<iron-collapse opened="{{showActions}}">
							<siren-object-actions href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-actions>
						</iron-collapse>
					</template>

					<template is="dom-if" if="{{hasSubEntities}}">
						<paper-toggle-button checked="{{showSubEntities}}">Show SubEntities</paper-toggle-button>
						<iron-collapse opened="{{showSubEntities}}">
							<siren-object-subentities href="{{href}}" token="{{token}}" entity="{{entity}}"></siren-object-subentities>
						</iron-collapse>
					</template>

					<template is="dom-if" if="{{subEntitySelfLink}}">
						<paper-button raised="" class="indigo" on-click="_go">Go<paper-button>
					</paper-button></paper-button></template>
				</div>
			</iron-collapse>
		</div>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
class SirenSubEntity extends PolymerElement {

	static get is() { return 'siren-subentity'; }
	static get properties() {
		return {
			href: {
				reflectToAttribute: true,
				notify: true
			},
			entity: {
				type: Object,
				value: {}
			},
			opened: {
				type: Boolean,
				value: false
			},
			hasActions: {
				type: Boolean,
				value: false,
				computed: '_hasActions(entity)'
			},
			showActions: {
				type: Boolean,
				value: false,
			},
			hasSubEntities: {
				type: Boolean,
				value: false,
				computed: '_hasSubEntities(entity)'
			},
			showSubEntities: {
				type: Boolean,
				value: false,
			},
			isEmbedded: {
				type: Boolean,
				value: false,
				computed: '_isEmbedded(entity)'
			},
			isEmbeddedLink: {
				type: Boolean,
				value: false,
				computed: '_isEmbeddedLink(entity)'
			},
			subEntitySelfLink: {
				type: String,
				computed: '_getLinkByRel(entity, "self")'
			}
		};
	}
	static get observers() {
		return [
			'_changed(entity)'
		];
	}
	_changed(entity) {
		this.opened = false;
		this.entity = entity || {};
	}
	_toggle() {
		this.opened = !this.opened;
	}
	_toggleShowActions() {
		this.showActions = !this.showActions;
	}
	_isEmbedded(entity) {
		return !this._isEmbeddedLink(entity);
	}
	_isEmbeddedLink(entity) {
		return entity && entity.href;
	}
	_getRels(item) {
		return item.rel && JSON.stringify(item.rel) || '';
	}
	_getClasses(item) {
		return item.class && JSON.stringify(item.class) || '';
	}
	_hasActions(entity) {
		return entity && entity.actions && entity.actions.length > 0;
	}
	_hasSubEntities(entity) {
		return entity && entity.entities && entity.entities.length > 0;
	}
	_getLinkByRel(entity, rel) {
		if (entity.href) {
			return entity.href;
		}
		var link = entity && entity.getLinkByRel(rel);
		return link && link.href || '';
	}
	_select(link) {
		this.href = link.model.item.href || this.href;
	}
	_go() {
		this.href = this.subEntitySelfLink;
	}
}

window.customElements.define(SirenSubEntity.is, SirenSubEntity);
