const vscode = require('vscode');
const formatSnippets = require('./snippets/formatting').formattingSnippets;
const resSnippets = require('./snippets/res').resSnippets;
const firSnippets = require('./snippets/fir').firSnippets;
const styleSnippets = require('./snippets/styles').styles;
const themevarSnippets = require('./snippets/themevar').themevar;
const commandRadioFunction = require('./snippets/modules/command').commandRadio;
const commandRadioBtnFunction = require('./snippets/modules/command').commandRadioBtn;
const commandRadioBtnGridFunction = require('./snippets/modules/command').commandRadioBtnGrid;
const commandCardRatingFunction = require('./snippets/modules/command').commandCardRating;
const commandRatingScaleFunction = require('./snippets/modules/command').commandRatingScale;
const commandCheckboxFunction = require('./snippets/modules/command').commandCheckbox;
const commandCheckboxBtnFunction = require('./snippets/modules/command').commandCheckboxBtn;
const commandCheckboxBtnGridFunction = require('./snippets/modules/command').commandCheckboxBtnGrid;
const commandSingleCardSortFunction = require('./snippets/modules/command').commandSingleCardSort;
const commandMultiCardSortFunction = require('./snippets/modules/command').commandMultiCardSort;
const commandBoldFunction = require('./snippets/modules/command').commandBold;
const commandItalicFunction = require('./snippets/modules/command').commandItalic;
const commandUnderlineFunction = require('./snippets/modules/command').commandUnderline;
const commandSelectFunction = require('./snippets/modules/command').commandSelect;
const commandRanksortFunction = require('./snippets/modules/command').commandRanksort;
const commandStarratingFunction = require('./snippets/modules/command').commandStarrating;
const commandSliderratingFunction = require('./snippets/modules/command').commandSliderRating;
const commandTextareaFunction = require('./snippets/modules/command').commandTextarea;
const commandTextFunction = require('./snippets/modules/command').commandText;
const commandDatepickerFunction = require('./snippets/modules/command').commandDatepicker;
const commandNumberFunction = require('./snippets/modules/command').commandNumber;
const commandSliderFunction = require('./snippets/modules/command').commandSlider;
const commandSliderDecimalFunction = require('./snippets/modules/command').commandSliderDecimal;
const commandAutoSumFunction = require('./snippets/modules/command').commandAutoSum;
const commandRatingFunction = require('./snippets/modules/command').commandRating;
const commandTexthighlighterFunction = require('./snippets/modules/command').commandTexthighlighter;
const commandAutosuggestFunction = require('./snippets/modules/command').commandAutosuggest;
const commandHtmlFunction = require('./snippets/modules/command').commandHtml;
const commandImagemapFunction = require('./snippets/modules/command').commandImagemap;
const commandMediaEvaluatorFunction = require('./snippets/modules/command').commandMediaEvaluator;
const commandMediaTestimonialFunction = require('./snippets/modules/command').commandMediaTestimonial;
const commandRowFunction = require('./snippets/modules/command').commandRow;
const commandRowMatchFunction = require('./snippets/modules/command').commandRowMatch;
const commandColFunction = require('./snippets/modules/command').commandCol;
const commandColMatchFunction = require('./snippets/modules/command').commandColMatch;
const commandChoiceFunction = require('./snippets/modules/command').commandChoice;
const commandChoiceMatchFunction = require('./snippets/modules/command').commandChoiceMatch;
const commandBariFunction = require('./snippets/modules/command').commandBari;
const commandLoopFunction = require('./snippets/modules/command').commandLoop;
const commandGroupFunction = require('./snippets/modules/command').commandGroup;

function activate(context) {

	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */

	/**
	 * Functions for all decipher commands except res and custom ones
	 */
	const commandRadio = vscode.commands.registerCommand('deciphersnips.radio', commandRadioFunction);
	const commandRadioBtn = vscode.commands.registerCommand('deciphersnips.radiobtn', commandRadioBtnFunction);
	const commandRadioBtnGrid = vscode.commands.registerCommand('deciphersnips.radiobtngrid', commandRadioBtnGridFunction);
	const commandRatingScale = vscode.commands.registerCommand('deciphersnips.ratingscale', commandRatingScaleFunction);
	const commandCardRating = vscode.commands.registerCommand('deciphersnips.cardrating', commandCardRatingFunction);
	const commandCheckbox = vscode.commands.registerCommand('deciphersnips.checkbox', commandCheckboxFunction);
	const commandCheckboxBtn = vscode.commands.registerCommand('deciphersnips.checkboxbtn', commandCheckboxBtnFunction);
	const commandCheckboxBtnGrid = vscode.commands.registerCommand('deciphersnips.checkboxbtngrid', commandCheckboxBtnGridFunction);
	const commandSingleCardSort = vscode.commands.registerCommand('deciphersnips.singlecardsort', commandSingleCardSortFunction);
	const commandMultiCardSort = vscode.commands.registerCommand('deciphersnips.multicardsort', commandMultiCardSortFunction);
	const commandSelect = vscode.commands.registerCommand('deciphersnips.select', commandSelectFunction);
	const commandRanksort = vscode.commands.registerCommand('deciphersnips.ranksort', commandRanksortFunction);
	const commandStarrating = vscode.commands.registerCommand('deciphersnips.starrating', commandStarratingFunction);
	const commandSliderrating = vscode.commands.registerCommand('deciphersnips.sliderrating', commandSliderratingFunction);
	const commandTextarea = vscode.commands.registerCommand('deciphersnips.textarea', commandTextareaFunction);
	const commandText = vscode.commands.registerCommand('deciphersnips.text', commandTextFunction);
	const commandDatepicker = vscode.commands.registerCommand('deciphersnips.datepicker', commandDatepickerFunction);
	const commandNumber = vscode.commands.registerCommand('deciphersnips.number', commandNumberFunction);
	const commandSlider = vscode.commands.registerCommand('deciphersnips.slider', commandSliderFunction);
	const commandSliderDecimal = vscode.commands.registerCommand('deciphersnips.sliderdecimal', commandSliderDecimalFunction);
	const commandAutoSum = vscode.commands.registerCommand('deciphersnips.autosum', commandAutoSumFunction);
	const commandRating = vscode.commands.registerCommand('deciphersnips.rating', commandRatingFunction);
	const commandTexthighlighter = vscode.commands.registerCommand('deciphersnips.texthighlighter', commandTexthighlighterFunction);
	const commandAutosuggest = vscode.commands.registerCommand('deciphersnips.autosuggest', commandAutosuggestFunction);
	const commandHtml = vscode.commands.registerCommand('deciphersnips.html', commandHtmlFunction);
	const commandImagemap = vscode.commands.registerCommand('deciphersnips.imagemap', commandImagemapFunction);
	const commandMediaEvaluator = vscode.commands.registerCommand('deciphersnips.mediaeval', commandMediaEvaluatorFunction);
	const commandMediaTestimonial = vscode.commands.registerCommand('deciphersnips.mediatesti', commandMediaTestimonialFunction);
	const commandRow = vscode.commands.registerCommand('deciphersnips.row', commandRowFunction);
	const commandRowMatch = vscode.commands.registerCommand('deciphersnips.rowmatch', commandRowMatchFunction);
	const commandCol = vscode.commands.registerCommand('deciphersnips.col', commandColFunction);
	const commandColMatch = vscode.commands.registerCommand('deciphersnips.colmatch', commandColMatchFunction);
	const commandChoice = vscode.commands.registerCommand('deciphersnips.choice', commandChoiceFunction);
	const commandChoiceMatch = vscode.commands.registerCommand('deciphersnips.choicematch', commandChoiceMatchFunction);
	const commandBarifr = vscode.commands.registerCommand('deciphersnips.barifr', () => { commandBariFunction('fr') });
	const commandBarien = vscode.commands.registerCommand('deciphersnips.barien', () => { commandBariFunction('en') });
	const commandBaride = vscode.commands.registerCommand('deciphersnips.baride', () => { commandBariFunction('de') });
	const commandBaries = vscode.commands.registerCommand('deciphersnips.baries', () => { commandBariFunction('es') });
	const commandBarifi = vscode.commands.registerCommand('deciphersnips.barifi', () => { commandBariFunction('fi') });
	const commandBarida = vscode.commands.registerCommand('deciphersnips.barida', () => { commandBariFunction('da') });
	const commandBarinl = vscode.commands.registerCommand('deciphersnips.barinl', () => { commandBariFunction('nl') });
	const commandBariit = vscode.commands.registerCommand('deciphersnips.bariit', () => { commandBariFunction('it') });
	const commandBarisv = vscode.commands.registerCommand('deciphersnips.barisv', () => { commandBariFunction('sv') });
	const commandBaripl = vscode.commands.registerCommand('deciphersnips.baripl', () => { commandBariFunction('pl') });
	const commandBarino = vscode.commands.registerCommand('deciphersnips.barino', () => { commandBariFunction('no') });
	const commandLoop = vscode.commands.registerCommand('deciphersnips.loop', () => { commandLoopFunction(true) });
	const commandLoopN = vscode.commands.registerCommand('deciphersnips.loopn', () => { commandLoopFunction(false) });
	const commandGroup = vscode.commands.registerCommand('deciphersnips.group', commandGroupFunction);


	//Registration of all snippets found in formatting.js
	const autocompletionsDefault = vscode.languages.registerCompletionItemProvider('xml', {

		provideCompletionItems(document, position, token, context) {

			let arr = [];

			formatSnippets.forEach(snip => {
				let snippetCompletion = new vscode.CompletionItem(snip[0]);
				snippetCompletion.insertText = new vscode.SnippetString(snip[1]);
				snippetCompletion.documentation = new vscode.MarkdownString(snip[2]);

				arr.push(snippetCompletion);
			})
			return arr;

		}
	});


	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */

	/**
	 * Functions for the res. commands
	 */
	const autocompletionsRes = vscode.languages.registerCompletionItemProvider(
		'xml',
		{
			provideCompletionItems(document, position) {

				//const linePrefix = document.lineAt(position).text.slice(0, position.character);
				let arr = [];

				//if (!linePrefix.endsWith('res.')) {
				//	return undefined;
				//}


				resSnippets.forEach(snip => {
					let snippetCompletion = new vscode.CompletionItem(snip[0]);
					snippetCompletion.insertText = new vscode.SnippetString(snip[1]);
					snippetCompletion.documentation = new vscode.MarkdownString(snip[2]);

					//const rangeToRemove = new vscode.Range(position.line, position.character - 4, position.line, position.character);
					//snippetCompletion.additionalTextEdits = [vscode.TextEdit.delete(rangeToRemove)];

					arr.push(snippetCompletion);
				})
				return arr;
			}
		});





	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */

	/**
	 * Functions for the fir: commands
	 */

	//Registration of all fir: type snippets found in fir.js
	const autocompletionsFir = vscode.languages.registerCompletionItemProvider(
		'xml',
		{
			provideCompletionItems(document, position) {

				//const linePrefix = document.lineAt(position).text.slice(0, position.character);
				let arr = [];

				//if (!linePrefix.endsWith('fir:')) {
				//	return undefined;
				//}


				firSnippets.forEach(snip => {
					let snippetCompletion = new vscode.CompletionItem(snip[0]);
					snippetCompletion.insertText = new vscode.SnippetString(snip[1]);
					snippetCompletion.documentation = new vscode.MarkdownString(snip[2]);

					arr.push(snippetCompletion);
				})
				return arr;
			}
		});

	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */

	/**
	 * Functions for the style. commands
	 */
	const autocompletionsStyles = vscode.languages.registerCompletionItemProvider(
		'xml',
		{
			provideCompletionItems(document, position) {

				//const linePrefix = document.lineAt(position).text.slice(0, position.character);
				let arr = [];

				//if (!linePrefix.endsWith('style.')) {
				//	return undefined;
				//}


				styleSnippets.forEach(snip => {
					let snippetCompletion = new vscode.CompletionItem(snip[0]);
					snippetCompletion.insertText = new vscode.SnippetString(snip[1]);
					snippetCompletion.documentation = new vscode.MarkdownString(snip[2]);

					//const rangeToRemove = new vscode.Range(position.line, position.character - 6, position.line, position.character);
					//snippetCompletion.additionalTextEdits = [vscode.TextEdit.delete(rangeToRemove)];

					arr.push(snippetCompletion);
				})
				return arr;
			}
		});


	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */

	/**
	 * Functions for the themevar. commands
	 */
	const autocompletionsThemevar = vscode.languages.registerCompletionItemProvider(
		'xml',
		{
			provideCompletionItems(document, position) {

				//const linePrefix = document.lineAt(position).text.slice(0, position.character);
				let arr = [];

				//if (!linePrefix.endsWith('themevar.')) {
				//	return undefined;
				//}


				themevarSnippets.forEach(snip => {
					let snippetCompletion = new vscode.CompletionItem(snip[0]);
					snippetCompletion.insertText = new vscode.SnippetString(snip[1]);
					snippetCompletion.documentation = new vscode.MarkdownString(snip[2]);

					//const rangeToRemove = new vscode.Range(position.line, position.character - 9, position.line, position.character);
					//snippetCompletion.additionalTextEdits = [vscode.TextEdit.delete(rangeToRemove)];

					arr.push(snippetCompletion);
				})
				return arr;
			}
		});





	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */

	/**
	 * 
	 * Registering all commands in the vscode registry
	 * 
	 */

	//Combining the functions and their respective functions
	const commandBold = vscode.commands.registerCommand('deciphersnips.addBold', commandBoldFunction);
	const commandItalic = vscode.commands.registerCommand('deciphersnips.addItalic', commandItalicFunction);
	const commandUnderline = vscode.commands.registerCommand('deciphersnips.addUnderline', commandUnderlineFunction);


	//Adding decipher commands to vscode
	context.subscriptions.push(commandRadio);
	context.subscriptions.push(commandRadioBtn);
	context.subscriptions.push(commandRadioBtnGrid);
	context.subscriptions.push(commandRatingScale);
	context.subscriptions.push(commandCardRating);
	context.subscriptions.push(commandCheckbox);
	context.subscriptions.push(commandCheckboxBtn);
	context.subscriptions.push(commandCheckboxBtnGrid);
	context.subscriptions.push(commandSingleCardSort);
	context.subscriptions.push(commandMultiCardSort);
	context.subscriptions.push(commandSelect);
	context.subscriptions.push(commandRanksort);
	context.subscriptions.push(commandStarrating);
	context.subscriptions.push(commandSliderrating);
	context.subscriptions.push(commandTextarea);
	context.subscriptions.push(commandText);
	context.subscriptions.push(commandDatepicker);
	context.subscriptions.push(commandNumber);
	context.subscriptions.push(commandSlider);
	context.subscriptions.push(commandSliderDecimal);
	context.subscriptions.push(commandAutoSum);
	context.subscriptions.push(commandRating);
	context.subscriptions.push(commandTexthighlighter);
	context.subscriptions.push(commandAutosuggest);
	context.subscriptions.push(commandHtml);
	context.subscriptions.push(commandImagemap);
	context.subscriptions.push(commandMediaEvaluator);
	context.subscriptions.push(commandMediaTestimonial);
	context.subscriptions.push(commandRow);
	context.subscriptions.push(commandRowMatch);
	context.subscriptions.push(commandCol);
	context.subscriptions.push(commandColMatch);
	context.subscriptions.push(commandChoice);
	context.subscriptions.push(commandChoiceMatch);

	context.subscriptions.push(commandBold);
	context.subscriptions.push(commandItalic);
	context.subscriptions.push(commandUnderline);

	context.subscriptions.push(commandBarifr);
	context.subscriptions.push(commandBarien);
	context.subscriptions.push(commandBaride);
	context.subscriptions.push(commandBaries);
	context.subscriptions.push(commandBarifi);
	context.subscriptions.push(commandBarida);
	context.subscriptions.push(commandBarinl);
	context.subscriptions.push(commandBariit);
	context.subscriptions.push(commandBarisv);
	context.subscriptions.push(commandBaripl);
	context.subscriptions.push(commandBarino);

	context.subscriptions.push(commandLoop);
	context.subscriptions.push(commandLoopN);
	context.subscriptions.push(commandGroup);

	//Adding autocompletions commands to vscode
	context.subscriptions.push(autocompletionsDefault);
	context.subscriptions.push(autocompletionsRes);
	context.subscriptions.push(autocompletionsFir);
	context.subscriptions.push(autocompletionsStyles);
	context.subscriptions.push(autocompletionsThemevar);

	/* ***************************************************************************************************************************************************************************************** */
	/* ***************************************************************************************************************************************************************************************** */


}

// This method is called when your extension is deactivated
function deactivate() {
	vscode.window.showInformationMessage('The extension has been deactivated. Thanks for the using this extension :)');
}

module.exports = {
	activate,
	deactivate
}