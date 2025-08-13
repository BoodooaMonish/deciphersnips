/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */


/**
 * The tidyQuestionFullInput function takes a block of text which contains the question label and the question title, optionally along with 
 * the rows/cols/choice(dropdown only) and seperates them to create a list of rows&cols + question label + question title
 * 
 * @param {String} inp  - block of text:
 * Qlabel(space/tab)Qtitle
 * /n/n
 * rows(optional)
 * /n/n
 * cols (optional)
 * @param {String} type - radio|checkbox|text|number|slider|rating|select|ranksort|sliderrating|html
 * 
 * @returns array with list of rows&cols + Qlabel + Qtitle
 * 
 * Additional function used inside:
 *   cleanupElements((row/col), StringToConvertIntoThatElement)
 */


function tidyQuestionFullInput(inp, type) {
	let label, title, contentSeperation;
	let input = inp.trim();

	//Replace patterns of word.number with word_number
	input = input.replace(/^(\w?\d+)\.(\d+)/, "$1_$2");
	input = input.replace(/(\n)\s+(\n)/, "$1$2");
	input = input.replaceAll('\r\n', '\n');

	contentSeperation = input.split("\n\n");
	contentSeperation = contentSeperation.map((x) => x.trim());
	contentSeperation = contentSeperation.filter((x) => x.trim().length);

	//console.log(contentSeperation);

	label = contentSeperation[0].split(/^([a-zA-Z0-9_]+)+(\.|\:|\\|\/|\)|\-|\s)/, 2)[1].trim();
	title = contentSeperation[0].split(/^([a-zA-Z0-9_]+)+(\.|\:|\\|\/|\)|\-|\s)/)[3].trim();

	//console.log([label,title]);

	let inputFinal = "";

	if (type == "radio" || type == "checkbox" || type == "text" || type == "number") {

		if (contentSeperation.length !== 1) {
			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '' + cleanupElements('row', contentSeperation[1]);
			}
			else {
				//remove the line break after rows for single select question
				inputFinal = (inputFinal + '' + cleanupElements('row', contentSeperation[1])).split("\n\n", 1)[0];
			}

			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '  ' + cleanupElements('col', contentSeperation[2]).trimStart();
			}
		}
	}

	else if (type == "radioGrid" || type == "checkboxGrid") {

		if (contentSeperation.length !== 1) {
			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '' + cleanupElements('col', contentSeperation[1]);
			}
			else {
				//remove the line break after rows for single select question
				inputFinal = (inputFinal + '' + cleanupElements('col', contentSeperation[1])).split("\n\n", 1)[0];
			}

			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '  ' + cleanupElements('row', contentSeperation[2]).trimStart();
			}
		}
	}

	else if (type == "slider" || type == "rating" || type == "autosuggest") {
		if (contentSeperation.length != 1) {
			inputFinal = inputFinal + '' + cleanupElements('row', contentSeperation[1]);
		}

	}
	else if (type == "select") {

		//console.log(contentSeperation);

		if (contentSeperation.length !== 1) {
			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '' + cleanupElements('choice', contentSeperation[1]);
			}
			else {
				//remove the line break after rows for single select question
				inputFinal = (inputFinal + '' + cleanupElements('choice', contentSeperation[1])).split("\n\n", 1)[0];
			}

			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '  ' + cleanupElements('row', contentSeperation[2]).trimStart();
			}

			if (contentSeperation.length > 3) {
				inputFinal = inputFinal + '  ' + cleanupElements('col', contentSeperation[3]).trimStart();
			}
		}

	}
	else if (type == "ranksort" || type == "sliderrating") {

		if (contentSeperation.length !== 1) {
			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '' + cleanupElements('choice', contentSeperation[1]);
			}
			else {
				//remove the line break after rows for single select question
				inputFinal = (inputFinal + '' + cleanupElements('choice', contentSeperation[1])).split("\n\n", 1)[0];
			}

			if (contentSeperation.length > 2) {
				inputFinal = inputFinal + '  ' + cleanupElements('row', contentSeperation[2]).trimStart();
			}
		}
	}
	else if (type == "html") {
		//console.log(contentSeperation);

		contentSeperation.forEach(function (x,ind){
			let additionalBreaks = '';
			if (contentSeperation.length > 1 && ind !== contentSeperation.length - 1){
				additionalBreaks = '<br/><br/> ';
			}
			if (ind == 0){
				inputFinal = inputFinal + x.split(/^([a-zA-Z0-9_]+)+(\.|\:|\\|\/|\)|\-|\s)/)[3].trim().replace(/(?:\r\n|\r|\n)/g, '<br/> ') + additionalBreaks;
			} else {
				inputFinal = inputFinal + x.trim().replace(/(?:\r\n|\r|\n)/g, '<br/> ') + additionalBreaks;
			}
		})
		//console.log(inputFinal);
	}

	//console.log(inputFinal);

	return [inputFinal.trim(), label, title]
}

/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */



/**
 * The cleanupElements function take a block of content and prepares them to be convert into rows/cols/choices elements.
 * The preparations include spliting the block into an array, removing line breaks, removing tabs, fixing unicodes and trimming unnecessary spaces
 * 
 * @param {String} type - row|col|choice
 * @param {*} inp - block of elements to prepare
 * @param {Number} skipCheck - Used for the row/col/choice only commands
 * @returns function createElements(('row|col|choice'), prefixForLabeling, PreparedArrayOfElements)
 */


function cleanupElements(type, inp, skipCheck = 0) {

	let printPage = '';
	let input = inp;

	input = input.trim();
	//CLEAN UP THE TABS
	input = input.replace(/\t+/, " ");

	//CLEAN UP SPACES
	input = input.replace(/\n +\n/, "\n\n");

	//CLEAN UP THE EXTRA LINE BREAKS
	input = input.replace(/\n{2,}/, "\n");

	//unicode fix
	input = fixUniCode(input);

	input = input.trim().split("\n");

	input = input.map((x) => x.trim());

	if (type == 'row') {
		//console.log(input);
		if (skipCheck == 1) {
			return createElements('row', 'r', input, 1);
		} else if (skipCheck == 2) {
			return createElements('row', 'r', input, 2);
		} else {
			return createElements('row', 'r', input);
		}
	}

	if (type == 'col') {
		//console.log(input);
		if (skipCheck == 1) {
			return createElements('col', 'c', input, 1);
		} else if (skipCheck == 2) {
			return createElements('col', 'c', input, 2);
		} else {
			return createElements('col', 'c', input);

		}
	}

	if (type == 'choice') {
		//console.log(input);
		if (skipCheck == 1) {
			return createElements('choice', 'ch', input, 1);
		} else if (skipCheck == 2) {
			return createElements('choice', 'ch', input, 2);
		} else {
			return createElements('choice', 'ch', input)

		}
	}

}


/**
 * The createElements function takes the prepared block of string and converts them into xml tags
 * This function also check whether to use matched label from the block of strings or a default label
 * 
 * @param {String} elementType - row|col|choice - defines the element tag name
 * @param {String} labelId - Default prefix for the element's labeling if no label was found
 * @param {Array} inp - The prepared array of string to be converted into xml tags
 * @param {Number} skipCheck - When true, the label check is skip
 * @returns String of xml tags combined together
 * 
 */


function createElements(elementType, labelId, inp, skipCheck = 0) {
	//Assess the type of label to use --> default numbering or match label
	let input = inp;
	let elementText = elementType;
	let labelText = labelId;
	let printPage = '';
	let extra = '';
	let count = 0;

	let checkIfAllLabels = 0;
	let checkRepeatingLabels = 0
	let checkIfAllLabelsNum = false;
	let allLabels = [];
	let allTexts = [];
	let repeatingLabelsCheck = [];

	input.forEach((x) => {

		let expCode = /^([0-9]{1,4}|[A-Za-z]{1}|[A-Za-z0-9]{1,10}[0-9_]{1,})(\s|\.|\/|\)|\\)(.+)/;
		let expCodeExtra = /^([A-Za-z0-9]{1,})(\s|\.|\/|\)|\\)(.+)/;

		let expression = x.match(expCode);
		let expressionExtra = x.match(expCodeExtra);

		//console.log(x);

		if (expression) {
			checkIfAllLabels = checkIfAllLabels + 1
			allLabels.push(expression[1]);
			allTexts.push(expression[3]);
		} else if (expCodeExtra && skipCheck == 2) {
			allLabels.push(expressionExtra[1]);
			allTexts.push(expressionExtra[3]);
		}

		if (expression && expression[1].match(/^(\b[0-9_]+)$/) && !checkIfAllLabelsNum) {
			checkIfAllLabelsNum = true;
		}
		else if (expression && !expression[1].match(/^(\b[0-9_]+)$/) && checkIfAllLabelsNum) {
			checkIfAllLabelsNum = false
		}

	})

	//skipcheck
	//only used for the command convert the rows/cols/choices
	if (skipCheck == 1) {
		checkIfAllLabels = 0
	}

	if (checkIfAllLabels) {
		allLabels.forEach(i => {
			if (!repeatingLabelsCheck.includes(i)) {
				checkRepeatingLabels = checkRepeatingLabels + 1;
				repeatingLabelsCheck.push(i);
			}
		})
	}

	//console.log(checkIfAllLabels, checkIfAllLabelsNum, checkRepeatingLabels, allLabels, allTexts, repeatingLabelsCheck);

	if ((skipCheck == 0 && input.length == checkIfAllLabels && checkIfAllLabels == checkRepeatingLabels) || skipCheck == 2) {
		input.forEach((item, x) => {
			if (x == 0) {
				if (checkIfAllLabelsNum) {
					printPage += `<${elementText} label=\"${labelText}${allLabels[x]}\">${allTexts[x].trim()}</${elementText}>\n`;
				} else {
					printPage += `<${elementText} label=\"${allLabels[x]}\">${allTexts[x].trim()}</${elementText}>\n`;
				}
			} else {
				if (checkIfAllLabelsNum) {
					printPage += `  <${elementText} label=\"${labelText}${allLabels[x]}\">${allTexts[x].trim()}</${elementText}>\n`;
				} else {
					printPage += `  <${elementText} label=\"${allLabels[x]}\">${allTexts[x].trim()}</${elementText}>\n`;
				}
			}
		});
	} else {
		// TODO: Lines to remove after the character removal issue is checked
		// input = input.map((item) => {
		// 	item.replace(/^[^a-zA-Z0-9À-ÿ_]{1,}\s/, "");
		// })
		//console.log(input);

		input.forEach((x, ind) => {
			if (ind == 0) {
				printPage = printPage + `  <${elementText} label=\"${labelText}${(count + 1).toString()}\"${extra}>${input[count].trim()}</${elementText}>\n`;
			} else {
				printPage = printPage + `  <${elementText} label=\"${labelText}${(count + 1).toString()}\"${extra}>${input[count].trim()}</${elementText}>\n`;
			}
			count += 1

		});
	}

	//console.log([printPage]);

	return printPage;
}


/**
 * The fixUniCode function is used to convert certains characters inside the input parameter into their approriate format.
 * 
 * @param {*} input 
 * @returns correctedInput
 * 
 */

function fixUniCode(input) {
	input = input.replace(/\u2019/, "'").replace(/\u2018/, "'").replace(/\u201C/, "\"").replace(/\u201D/, "\"");
	input = input.replace('&\s', '&amp; ');
	return input
}


/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */

/**
 * Module Exports
 */

module.exports = {
	tidyQuestionFullInput,
	cleanupElements,
}