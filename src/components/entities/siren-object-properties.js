import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../../styles/shared-styles.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="siren-object-properties">
	<template strip-whitespace="">
		<style include="shared-styles"></style>
		<template is="dom-if" if="{{hasProperties}}">
			<h2>Properties</h2>
			<div class="pre">
				<pre>{{properties}}</pre>
			</div>
		</template>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
class SirenObjectProperties extends PolymerElement {

    static get is() { return 'siren-object-properties'; }

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
            properties: {
                type: String,
                value: ''
            },
            hasProperties: {
                type: Boolean,
                computed: '_hasProperties(entity)',
                value: false
            }
				};
    }
    static get observers() {
				return [
            '_changed(entity)'
				];
    }
    _changed() {
				this.properties = this._getProperties();
    }
    _hasProperties(entity) {
				return entity && entity.properties !== undefined;
    }

    _getProperties() {
				return this._hasProperties(this.entity) && JSON.stringify(this.entity.properties, null, 2) || '';
    }
}

window.customElements.define(SirenObjectProperties.is, SirenObjectProperties);
