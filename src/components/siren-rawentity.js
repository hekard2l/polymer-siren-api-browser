import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../utility/siren-entity-mixin.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '../styles/shared-styles.js';
import './pre-json.js';

const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-rawentity">
	<template strip-whitespace>
		<style include="shared-styles">
			:host {
				width: 100%;
				display: block;
			}
		</style>
		<div class="pre accordian">
			<div class="accordian-header" on-click="_toggle">
				<h3>
					<span hidden$="{{!opened}}">-&nbsp;</span>
					<span hidden$="{{opened}}">+&nbsp;</span>
					<span>Raw</span>
				</h3>
			</div>
			<iron-collapse  opened="{{opened}}">
				<div>
					<pre-json json="{{rawEntity}}"></pre-json>
				</div>
			</iron-collapse>
		</div>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);
/* @mixes window.SirenEntityMixin */
class SirenRawEntity extends window.SirenEntityMixin(PolymerElement) {
	static get is() { return 'siren-rawentity'; }

	static get properties() {
		return {
			opened: {
				type: Boolean,
				value: false
			},
			ignoredKeys: {
				type: Array,
				value: () => [
					'_actionsByClass',
					'_actionsByMethod',
					'_actionsByName',
					'_actionsByType',
					'_entitiesByClass',
					'_entitiesByRel',
					'_entitiesByType',
					'_fieldsByClass',
					'_fieldsByName',
					'_fieldsByType',
					'_linksByClass',
					'_linksByRel',
					'_linksByType',
				]
			},
			rawEntity: {
				type: String,
				value: false,
				computed: '_computeRawEntity(entity)'
			}
		};
	}

	_toggle() {
		this.opened = !this.opened;
	}

	_computeRawEntity(entity) {
		try {
			if (entity) {
				const replacer = (key, val) => this.ignoredKeys.includes(key) ? undefined : val;
				return JSON.stringify(entity, replacer, 2);
			}
			return 'Loading...';
		} catch (err) {
			return err.message;
		}
	}
}
window.customElements.define(SirenRawEntity.is, SirenRawEntity);
