import { PolymerElement, html } from '@polymer/polymer';
import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import '@polymer/prism-element/prism-highlighter.js';
import '@polymer/prism-element/prism-theme-default.js';
import '../styles/shared-styles.js';

class JsonPrismElement extends PolymerElement {
	static get template() {
		return html`
			<style include="shared-styles prism-theme-default">
				pre {
					background-color: white;
				}
			</style>
			<div id="parent">
				<prism-highlighter></prism-highlighter>
				<pre id="output"></pre>
			</div>
		`;
	}

	static get properties() {
		return {
			json: {
				type: String,
				value: ''
			}
		};
	}

	static get observers() {
		return [
			'_changed(json)',
		];
	}

	_changed(json) {
		timeOut.run(() => {
			const ev = new CustomEvent('syntax-highlight', {
				detail: {
					code: json,
					lang: 'json'
				}
			});

			this.$.parent.dispatchEvent(ev);

			this.$.output.innerHTML = ev.detail.code;
		});
	}
}
customElements.define('pre-json', JsonPrismElement);
