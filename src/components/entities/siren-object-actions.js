import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../utility/siren-entity-mixin.js';
import '../../styles/shared-styles.js';
import '../pre-json.js';
import './siren-action.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = /*html*/`<dom-module id="siren-object-actions">
	<template strip-whitespace>
		<style include="shared-styles">
			paper-tabs {
				--paper-tabs-selection-bar-color: white;
				background-color: #f5f5f5;
			}
			.selected {
				border-top: none;
				border-bottom-left-radius: 4px;
				border-bottom-right-radius: 4px;
			}
		</style>
		<template is="dom-if" if="{{hasActions}}">
			<h2>Actions</h2>
			<paper-toggle-button checked="{{showRaw}}">Show Raw Action</paper-toggle-button>
			<paper-tabs selected="{{selected}}" scrollable="" --paper-tabs-selection-bar-color="white">
				<template is="dom-repeat" items="[[actions]]">
					<paper-tab>[[item.name]]</paper-tab>
				</template>
			</paper-tabs>
			<iron-pages selected="{{selected}}" class="selected">
				<template is="dom-repeat" items="{{actions}}">
					<div>
						<siren-action action="{{item}}" href="{{href}}" token="{{token}}"></siren-action>
						<template is="dom-if" if="{{showRaw}}">
							<div class="pre">
								<pre-json json="[[_rawAction(item)]]"></pre-json>
							</div>
						</template>
					</div>
				</template>
			</iron-pages>
		</template>
	</template>


</dom-module>`;

document.head.appendChild($_documentContainer.content);
class SirenObjectActions extends (PolymerElement) {
	static get is() {
		return 'siren-object-actions';
	}
	static get properties() {
		return {
			entity: {
				type: Object,
			},
			token: {
				type: String,
			},
			href: {
				type: String,
				notify: true,
			},
			actions: {
				type: Array,
				value: [],
			},
			selected: {
				type: Number,
				value: 0,
			},
			showRaw: {
				type: Boolean,
				value: false,
			},
			ignoredKeys: {
				type: Array,
				value: () => [
					'_fieldsByClass',
					'_fieldsByName',
					'_fieldsByType',
				]
			},
			hasActions: {
				type: Boolean,
				value: false,
				computed: '_hasActions(entity)',
			},
		};
	}
	static get observers() {
		return [
			'_changed(entity)',
		];
	}
	_changed(entity) {
		this.selected = 0;
		this.showRaw = false;
		this.actions = entity.actions || [];
	}
	_rawAction(item) {
		const replacer = (key, val) => this.ignoredKeys.includes(key) ? undefined : val;
		return JSON.stringify(item, replacer, 2);
	}
	_toggleShowRaw() {
		return this.showRaw = !this.showRaw;
	}
	_hasActions(entity) {
		return entity && entity.actions !== undefined;
	}
}

window.customElements.define(SirenObjectActions.is, SirenObjectActions);
