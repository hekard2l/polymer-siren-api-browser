import '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/default-theme.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
	<template strip-whitespace="">
		<style is="custom-style">
		.indigo {
			background-color: #f5f5f5;
		}
		.card {
			margin: 24px;
			padding: 16px;
			color: #757575;
			border-radius: 5px;
			background-color: #fff;
			box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
		}

		.circle {
			display: inline-block;
			width: 64px;
			height: 64px;
			text-align: center;
			color: #555;
			border-radius: 50%;
			background: #ddd;
			font-size: 30px;
			line-height: 64px;
		}

		a {
			color: cornflowerblue;
		}
		a:hover {
			text-underline-position: below;
			text-decoration: underline;

			cursor: pointer;
		}

		h1 {
			margin: 16px 0;
			color: #333;
			font-size: 22px;
		}
		pre {
			word-wrap: break-word;
			white-space: pre-wrap;
			padding: .5rem;
		}

		li {
			list-style-type: none;
		}
		.card-header {
			background:#006FBF;
			color:white;
		}

		.medium-card-size {
			width: 100%;
			max-height: 650px;
			overflow-y: scroll;
		}

		.card-header-text {
			margin:0;
			padding:10px;
			font-weight:normal;
		}
		.pre {
			width: 100%;
			border-radius: 4px;
			border: 1px solid #ccc;
			color: #333;
			background: #f5f5f5;
		}
		.flex-parent {
			display: flex;
			flex-wrap: wrap;
		}
		.flex-1 {
			flex: 1;
			padding-right: 1em;
		}
		.flex-2 {
			flex: 2;
		}
		.flex-right {
			display: inline-block;
		}
		.basic-left-padding {
			padding-left: 10px
		}
		.basic-right-padding {
			padding-left: 10px
		}
		.basic-top-bottom-padding {
			padding-top: 10px;
			padding-bottom: 10px;
		}
</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/* shared styles for all views */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
