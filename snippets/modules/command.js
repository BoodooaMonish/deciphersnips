const vscode = require('vscode');
const jsdom = require("jsdom");
const tidyQuestionFullInput = require('./helper').tidyQuestionFullInput;
const cleanupElements = require('./helper').cleanupElements;
const cardRatingExtra = `  <style name=\"question.after\" wrap=\"ready\"><\![CDATA[
  var qn = \$\{jsexport\(\)\};    
  var \$qn = \$ (\"\#question_\" \+ qn.label)\;    
  var \$completion = \$qn.find(\".sq\-cardrating\-completion\")\; 
  \$ ('\#btn_continue, \#btn_finish').hide()\; 
  window.setInterval(function() { 
    if (\$completion.css(\"z-index\") \!= \"auto\") {
      $ ('\#btn_continue, \#btn_finish').click()\;
    } 
    else {
      \$qn.find(\".survey-q-question-text, .survey-q-instructions-text\").show(\"slow\");
    }}, 1000);
  ]]></style>
  <style name=\"question.after\"><![CDATA[
  <style type=\"text/css\">
  [data-device=\"smartphone\"] .sq-cardrating-cards{
    //height:175px\;
  }
  [data-device=\"smartphone\"] [data-fullwidth] .sq-cardrating-content{
    padding:0 0.1rem\;
  }
  [data-viewsize=small] [data-viewmode=horizontal] .sq-cardrating-button{
    height:50px \!important;
  }
  </style>
  ]]></style>`;
const cardSortRes = `  <res label=\"sys_noAnswerSelected\">Please select a bucket for this card.</res>
  <res label=\"sys_check-error\">Please select \$(which) \$(count) bucket for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atLeast-plur-column\">Please select at least \$(count) buckets for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atLeast-plur-row\">Please select at least \$(count) buckets for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atLeast-sing-column\">Please select at least \$(count) bucket for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atLeast-sing-row\">Please select at least \$(count) bucket for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atMost-plur-column\">Please select at most \$(count) buckets for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atMost-plur-row\">Please select at most \$(count) buckets for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atMost-sing-column\">Please select at most \$(count) bucket for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-atMost-sing-row\">Please select at most \$(count) bucket for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-exactly-plur-column\">Please select exactly \$(count) buckets for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-exactly-plur-row\">Please select exactly \$(count) buckets for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-exactly-sing-column\">Please select exactly \$(count) bucket for this card (you selected \$(actual)).</res>
  <res label=\"sys_check-error-exactly-sing-row\">Please select exactly \$(count) bucket for this card (you selected \$(actual)).</res>`;

/**
 * Decipher Question Functions
 * 
 * Functions:
 *  - Radio
 *  - Button Radio
 *  - Radio Button Grid
 *  - Rating Scale
 *  - Card Rating
 *  - Checkbox
 *  - Button Checkbox
 *  - Checkbox Button Grid
 *  - Select
 *  - Ranksort
 *  - Slider Rating
 *  - Textarea
 *  - Text
 *  - Number
 *  - Slider
 *  - Rating
 *  - Autosuggest
 *  - Html
 *  - Row
 *  - RowMatch
 *  - Col
 *  - ColMatch
 *  - Choice
 *  - ChoiceMatch
 *  - Loop (with cond and with no cond)
 * 
 */



function commandRadio() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radio");
                let printPage = `<radio\n  label=\"${newSelection[1].trim()}\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</radio>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandRadioBtn() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radio");
                let printPage = `<radio\n  label=\"${newSelection[1].trim()}\"\n  atm1d:large_buttonAlign=\"center\"\n  atm1d:large_contentAlign=\"center\"\n  atm1d:large_minWidth=\"200px\"\n  atm1d:showInput=\"0\"\n  atm1d:small_buttonAlign=\"center\"\n  atm1d:small_contentAlign=\"center\"\n  atm1d:viewMode=\"tiled\"\n  fir=\"off\"\n  ss:listDisplay=\"1\"\n  uses=\"atm1d.11\">\n  <title>${newSelection[2].trim()}</title>\n  <res label\=\"sys_check-error-atLeast-plur-column\">Please select at least \$\(count\) answers \(you selected \$\(actual\)\).<\/res>\n  <res label\=\"sys_check-error-atLeast-sing-column\">Please select at least \$\(count\) answer \(you selected \$\(actual\)\).<\/res>\n  <res label\=\"sys_check-error-atMost-plur-column\">Please select at most \$\(count\) answers \(you selected \$\(actual\)\).<\/res>\n  <res label\=\"sys_check-error-exactly-plur-column\">Please select exactly \$\(count\) answers \(you selected \$\(actual\)\).<\/res>\n  ${newSelection[0]}\n</radio>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandRadioBtnGrid() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radioGrid");
                let printPage = `<radio\n  label=\"${newSelection[1].trim()}\"\n  uses=\"atmtable.6\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</radio>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandRatingScale() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radio");
                let printPage = `<radio\n  label=\"${newSelection[1].trim()}\"\n  grouping=\"rows\"\n  uses=\"ratingscale.5\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</radio>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandCardRating() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radio");
                let printPage = `<radio\n  label=\"${newSelection[1].trim()}\"\n  cardrating\:completion\=\"...\"\n  cardrating\:dragdrop\=\"0\"\n  cardrating\:navigation\=\"0\"\n  fir\=\"off\"\n  grouping\=\"rows\"\n  uses\=\"cardrating.1\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n${cardRatingExtra}\n</radio>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandSingleCardSort() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radio");
                let printPage = `<radio\n  label=\"${newSelection[1].trim()}\"\n  cardsort\:animationDuration\=\"250\"\n  cardsort\:buttonNextHTML\=\"Next \&lt\;i class\=\&quot\;fa-icon-chevron-right\&quot\;\&gt\;\&lt\;\/i\&gt\;\"\n  cardsort:buttonPreviousHTML\=\"\&lt\;i class\=\&quot\;fa-icon-chevron-left\&quot\;\&gt\;\&lt\;\/i\&gt\; Previous\"\n  cardsort\:completionHTML\=\"\&lt\;b\&gt\;All done\&lt\;\/b\&gt\; \&lt\;br\/\&gt\;\&lt\;i\&gt\;Click the \&quot\;Continue\&quot\; button to proceed.\&lt\;\/i\&gt\;\"\n  cardsort\:displayCounter\=\"0\"\n  cardsort\:autoSubmit\=\"1\"\n  cardsort\:displayNavigation\=\"0\"\n  cardsort\:dragAndDrop\=\"0\"\n  uses\=\"cardsort\.8\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n${cardSortRes}\n</radio>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandMultiCardSort() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "radio");
                let printPage = `<checkbox\n  label=\"${newSelection[1].trim()}\"\n  atleast\=\"1\"\n  cardsort\:animationDuration\=\"250\"\n  cardsort\:buttonNextHTML\=\"Next \&lt\;i class\=\&quot\;fa-icon-chevron-right\&quot\;\&gt\;\&lt\;\/i\&gt\;\"\n  cardsort:buttonPreviousHTML\=\"\&lt\;i class\=\&quot\;fa-icon-chevron-left\&quot\;\&gt\;\&lt\;\/i\&gt\; Previous\"\n  cardsort\:completionHTML\=\"\&lt\;b\&gt\;All done\&lt\;\/b\&gt\; \&lt\;br\/\&gt\;\&lt\;i\&gt\;Click the \&quot\;Continue\&quot\; button to proceed.\&lt\;\/i\&gt\;\"\n  cardsort\:displayCounter\=\"0\"\n  cardsort\:autoSubmit\=\"1\"\n  cardsort\:displayNavigation\=\"0\"\n  cardsort\:dragAndDrop\=\"0\"\n  uses\=\"cardsort\.8\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n${cardSortRes}\n</checkbox>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}





function commandCheckbox() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "checkbox");
                let printPage = `<checkbox\n  label=\"${newSelection[1].trim()}\"\n  atleast=\"1\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</checkbox>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandCheckboxBtn() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "checkbox");
                let printPage = `<checkbox\n  label=\"${newSelection[1].trim()}\"\n  atleast=\"1\"\n  atm1d:large_buttonAlign=\"center\"\n  atm1d:large_contentAlign=\"center\"\n  atm1d:large_minWidth=\"200px\"\n  atm1d:showInput=\"0\"\n  atm1d:small_buttonAlign=\"center\"\n  atm1d:small_contentAlign=\"center\"\n  atm1d:viewMode=\"tiled\"\n  fir=\"off\"\n  ss:listDisplay=\"1\"\n  uses=\"atm1d.11\">\n  <title>${newSelection[2].trim()}</title>\n  <res label\=\"sys_check-error-atLeast-plur-column\">Please select at least \$\(count\) answers \(you selected \$\(actual\)\).<\/res>\n  <res label\=\"sys_check-error-atLeast-sing-column\">Please select at least \$\(count\) answer \(you selected \$\(actual\)\).<\/res>\n  <res label\=\"sys_check-error-atMost-plur-column\">Please select at most \$\(count\) answers \(you selected \$\(actual\)\).<\/res>\n  <res label\=\"sys_check-error-exactly-plur-column\">Please select exactly \$\(count\) answers \(you selected \$\(actual\)\).<\/res>\n  ${newSelection[0]}\n</checkbox>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandCheckboxBtnGrid() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "checkboxGrid");
                let printPage = `<checkbox\n  label=\"${newSelection[1].trim()}\"\n  atleast=\"1\"\n  uses=\"atmtable.6\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</checkbox>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandSelect() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "select");
                let printPage = `<select\n  label=\"${newSelection[1].trim()}\"\n  optional=\"0\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</select>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandRanksort() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "ranksort");
                let printPage = `<select\n  label=\"${newSelection[1].trim()}\"\n  optional=\"1\"\n  minRanks=\"1\"\n  unique=\"none,cols\"\n  ranksort:alwaysSubmitOE=\"1\"\n  ranksort:btnOpenEdit=\"Edit\"\n  ranksort:showBucketNumber=\"0\"\n  ranksort:showBucketText=\"1\"\n  uses=\"ranksort.7\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</select>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandStarrating() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "ranksort");
                let printPage = `<select\n  label=\"${newSelection[1].trim()}\"\n  fir=\"off\"\n  uses=\"starrating.5\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</select>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}



function commandSliderRating() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "sliderrating");
                let printPage = `<select\n  label=\"${newSelection[1].trim()}\"\n  ss:questionClassNames=\"sq-sliderpoints\"\n  sliderpoints:sliderPosition=\"Off Scale\"\n  sliderpoints:legendPosition=\"Below Slider\"\n  sliderpoints:showRange=\"1\"\n  sliderpoints:sliderWidth=\"75%\"\n  sliderpoints:offScaleAdjustment=\"-40px\"\n  uses=\"sliderpoints.3\">\n  <title>${newSelection[2].trim()}</title>\n  <res label\=\"sys_noAnswerSelected\">Please slide the handle to rate your response.</res>\n  ${newSelection[0]}\n</select>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandTextarea() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "text");
                let printPage = `<textarea\n  label=\"${newSelection[1].trim()}\"\n  height=\"15\"\n  width=\"80\"\n  randomize=\"0\"\n  optional=\"0\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</textarea>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandText() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "text");
                let printPage = `<text\n  label=\"${newSelection[1].trim()}\"\n  size=\"25\"\n  optional=\"0\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</text>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandDatepicker() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "text");
                let printPage = `<text\n  label=\"${newSelection[1].trim()}\"\n  size=\"25\"\n  optional=\"0\"\n  verify\=\"dateRange(mm\/dd\/yyyy\,any\,today)\"\n  uses\=\"fvdatepicker.1\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</text>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandNumber() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "number");
                let printPage = `<number\n  label=\"${newSelection[1].trim()}\"\n  size=\"10\"\n  optional=\"0\"\n  randomize=\"0\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</number>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandSlider() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "slider");
                let printPage = `<number\n  label=\"${newSelection[1].trim()}\"\n  ignoreValues=\"999\"\n  optional=\"0\"\n  size=\"3\"\n  slidernumber:OO_Text=\"None of these\"\n  slidernumber:editable=\"0\"\n  slidernumber:leftLegend=\"Left\"\n  slidernumber:rightLegend=\"Right"\n  slidernumber:showRange=\"1\"\n  slidernumber:showValue=\"Above Slider\"\n  slidernumber:sliderPosition=\"Off Scale\"\n  slidernumber:legendPosition=\"Below Slider\"\n  slidernumber:sliderWidth=\"75%\"\n  slidernumber:step=\"10\"\n  uses=\"slidernumber.6\"\n  verify=\"range(0,100)\">\n  <title>${newSelection[2].trim()}</title>\n  <res label\=\"sys_noAnswerSelected\">Please slide the handle to rate your response.<\/res>\n  <res label\=\"sys_notWhole\">Please slide the bar to rate your response.</res>\n  ${newSelection[0]}\n</number>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandSliderDecimal() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "slider");
                let printPage = `<float\n  label=\"${newSelection[1].trim()}\"\n  ignoreValues=\"999\"\n  optional=\"0\"\n  sliderdecimal:OO_Text=\"No Answer\"\n  sliderdecimal:editable=\"0\"\n  sliderdecimal:decimalPlaces=\"2\"\n  sliderdecimal:leftLegend=\"Least likely\"\n  sliderdecimal:rightLegend=\"Most likely"\n  sliderdecimal:legendPosition=\"Below Slider\"\n  sliderdecimal:step=\".10\"\n  uses=\"sliderdecimal.3\"\n  range=\"-100,100\">\n  <title>${newSelection[2].trim()}</title>\n  <res label\=\"sys_noAnswerSelected\">Please slide the handle to rate your response.<\/res>\n  <res label\=\"sys_notWhole\">Please slide the bar to rate your response.</res>\n  ${newSelection[0]}\n</float>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandAutoSum() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "number");
                let printPage = `<number\n  label=\"${newSelection[1].trim()}\"\n  size=\"10\"\n  optional=\"0\"\n  amount=\"100\"\n  grouping=\"cols\"\n  randomize=\"0\"\n  verify=\"range(0\,100)\"\n  uses=\"autosum.5\">\n  <title>${newSelection[2].trim()}</title>\n  ${newSelection[0]}\n</number>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}




function commandRating() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "rating");
                let printPage = `<number\n  label=\"${newSelection[1].trim()}\"\n  atmrating:OO_Text=\"None of these\"\n  atmrating:leftLegend=\"Left\"\n  atmrating:rightLegend=\"Right\"\n  ignoreValues=\"99\"\n  optional=\"0\"\n  size=\"10\"\n  uses=\"atmrating.5\"\n  verify=\"range(0,10)\">\n  <title>${newSelection[2].trim()}</title>\n  <res label\=\"sys_notWhole\">Please select an answer.</res>\n  ${newSelection[0]}\n</number>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandTexthighlighter() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "rating");
                let printPage = `<select\n  label="${newSelection[1].trim()}"\n  adim\=\"choices\"\n  optional\=\"1\"\n  uses\=\"hottext.3\">\n  <title>${newSelection[2].trim()}</title>\n  <comment>Use the highlighter to select text in the content below. Change highlighters by selecting a different marker color.</comment>\n  <choice label\=\"ch1\">Positive Label</choice>\n  <choice label\=\"ch2\">Neutral Label</choice>\n  <choice label\=\"ch3\">Negative Label</choice>\n  ${newSelection[0]}\n</select>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}
/*

*/


function commandAutosuggest() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "autosuggest");
                let printPage = `<text\n  label=\"${newSelection[1].trim()}\"\n  autosuggest:answerKey=\"text\"\n  autosuggest:uniqueKey=\"codeid\"\n  autosuggest:filename=\"data1.dat\"\n  autosuggest:characterLimit=\"3\"\n  autosuggest:characterLimitText=\"Enter at least 2 characters\"\n  autosuggest:noMatchText=\"No Match Found\"\n  optional=\"0\"\n  size=\"25\"\n  uses=\"autosuggest.2\">\n  <title>${newSelection[2].trim()}</title>\n  <validate>\n\#if this.c1.val == \'No Match\'\:\n\#  error\(\"Please provide an answer by selecting from the list.\"\)\n  </validate>\n  ${newSelection[0]}\n  <col label=\"c1\">ID</col>\n  <col label=\"c2\">Text</col>\n</text>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandHtml() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "html");
                let printPage = `<html\n  label=\"${newSelection[1].trim()}\"\n  where=\"survey\">${newSelection[0]}</html>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandImagemap() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "html");
                let printPage = `<textarea \n  label\=\"${newSelection[1].trim()}\"\n  grouping\=\"rows\"\n  height\=\"10\"\n  optional\=\"0\"\n  ss\:questionClassNames\=\"sq\-imgmap\"\n  sst\=\"0\"\n  imgmap\:image\=\"concept1\.png\"\n  uses\=\"imgmap\.5\"\n  width\=\"50\">\n  <title>${newSelection[0]}</title>\n  <col label\=\"c1\">Positive Label</col>\n  <col label\=\"c2\">Neutral Label</col>\n  <col label\=\"c3\">Negative Label</col>\n</textarea>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}


function commandMediaEvaluator() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "html");
                let printPage = `<textarea\n  label\=\"${newSelection[1].trim()}\"\n  bcme\:video_id\=\"000000000000000\"\n  bcme\:autosubmit\=\"1\"\n  height\=\"10\"\n  optional\=\"0\"\n  sst\=\"0\"\n  uses\=\"bcme\.7\"\n  where\=\"survey\"\n  width\=\"50\">\n  <title>${newSelection[0]}</title>\n</textarea>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}

function commandMediaTestimonial() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = tidyQuestionFullInput(selection, "html");
                let printPage = `<text\n  label=\"${newSelection[1].trim()}\"\n  mediatestimonial\:mintimelimit\=\"10\"\n  mediatestimonial\:timelimit\=\"90\"\n  size\=\"25\"\n  sst\=\"0\"\n  uses\=\"mediatestimonial.1\">\n  <title>${newSelection[0]}</title>\n  <col label\=\"c1\">ID</col>\n  <col label\=\"c2\">Length</col>\n  <noanswer label\=\"na_${newSelection[1].trim()}\">NA</noanswer>\n</text>\n<suspend/>`;

                editBuilder.replace(txt, printPage);
                //editBuilder.replace(txt, selection);
            })
        });
    }
}



function commandRow() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = cleanupElements('row', selection, 1);

                editBuilder.replace(txt, newSelection);
            })
        });
    }
}

function commandRowMatch() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = cleanupElements('row', selection, 2);

                editBuilder.replace(txt, newSelection);
            })
        });
    }
}

function commandCol() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = cleanupElements('col', selection, 1);

                editBuilder.replace(txt, newSelection);
            })
        });
    }
}

function commandColMatch() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = cleanupElements('col', selection, 2);

                editBuilder.replace(txt, newSelection);
            })
        });
    }
}


function commandChoice() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = cleanupElements('choice', selection, 1);

                editBuilder.replace(txt, newSelection);
            })
        });
    }
}

function commandChoiceMatch() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let selection = document.getText(txt);
                let newSelection = cleanupElements('choice', selection, 2);

                editBuilder.replace(txt, newSelection);
            })
        });
    }
}







/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */

/**
 * Formatting Functions:
 * 
 * functions:
 *  - Bold
 *  - Italic
 *  - Underline
 * 
 */

function commandBold() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let word = document.getText(txt);
                let newWord = '<strong>' + word + '</strong>';

                editBuilder.replace(txt, newWord);
            })
        });
    }
}

function commandItalic() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let word = document.getText(txt);
                let newWord = '<em>' + word + '</em>';

                editBuilder.replace(txt, newWord);
            })
        });
    }
}

function commandUnderline() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let word = document.getText(txt);
                let newWord = '<u>' + word + '</u>';

                editBuilder.replace(txt, newWord);
            })
        });
    }
}

/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */



function getBari(lang, label) {
    return `<suspend/>
<block label=\"block_${label}\" builder:title=\"${label} OE Block\">

<suspend/>

     <exec>
p.NameQuestion=${label} # replace with the label of your question
    </exec>

    <suspend/>

    <block label=\"bcheck_${label}\" cond=\"p.NameQuestion.val\">
      <exec>
p.api_headers = {
\"Authorization\": \"Bearer 59938eb94ff619c66e8ec1f732022c665a1bf650\",
\"Content-Type\": \"application/json\",
\"X-Forwarded-Proto\":\"X-Forwarded-Proto\",
\"https\":\"https\"
}
response = p.NameQuestion.unsafe_val 
response = response.replace('\"', '\\\\"')
response = response.replace(\"\\r\", \" \")
response = response.replace(\"\\n\", \" \")

p.api_data = '{\"language\":\"${lang}\", \"text\": \"' + response + '\", \"min_words\": 1}'

# language list  available: \"da\", \"de\", \"en\", \"es\", \"fi\", \"fr\", \"nl\", \"it\", \"sv\", \"pl\", \"no\"
      </exec>

      <logic label=\"check_${label}\" api:data=\"p.api_data\" api:headers=\"p.api_headers\" api:method=\"POST\" api:url=\"https://oqc-ws.bilendi.com/check\" uses=\"api.1\">
        <title>API Integration</title></logic>
      <suspend/>

      <exec>
print check_${label}.status

quality_name = str(p.NameQuestion.label)+\"_check\" 
quality_check = \"check_\"+str(p.NameQuestion.label)
print check_${label}

if (eval(quality_check).status) == 200:
 if (eval(quality_check).r[\"alert1\"]):
  eval(quality_name).r1.val=1
 if (eval(quality_check).r[\"content_problem\"]):
  eval(quality_name).r2.val=1  
 if (eval(quality_check).r[\"language_problem\"]):
  eval(quality_name).r3.val=1
 if (eval(quality_check).r[\"toxicity\"]):
  eval(quality_name).r4.val=1
else:
 eval(quality_name).r5.val=1
 eval(quality_name).r5.open=eval(quality_check+str(\".status\"))
      </exec>

      <checkbox 
     label=\"${label}_check\"
     randomize=\"0\"
     where=\"execute,survey,report\">
        <title>Quality control open-ended question </title>
        <comment>To be hidden</comment>
        <row label=\"r1\">At least one problem</row>
        <row label=\"r2\">Content problem</row>
        <row label=\"r3\">Language problem</row>
        <row label=\"r4\">Toxicity</row>
        <row label=\"r5\" open=\"1\" openSize=\"25\">API Code</row>
      </checkbox>
    </block>

    <suspend/>

</block>
<suspend/>`;
}



function commandBari(langType) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let word = document.getText(txt);
                let regexString = /<text(area)?\s*(\n|\r\n|\r)[\s\S]+label="(.+)"\s/;
                let getLabelName = '';
                let matchString;
                if (word) {
                    word = word.trim();
                    matchString = word.match(regexString);
                    if (matchString) {
                        getLabelName = matchString[3];
                    }
                }
                editBuilder.replace(txt, getBari(langType, getLabelName));
            })
        });
    }
}


/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */



function commandLoop(loopType) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let word = document.getText(txt).trim();
                let finalWord = '';
                word = word.replaceAll(/<\s*style/g, "<styled");
                word = word.replaceAll(/<\s*script/g, "<scripted");
                word = word.replaceAll(/style\s*>/g, "styled>");
                word = word.replaceAll(/script\s*>/g, "scripted>");

                word = word.replaceAll(/<\s*select/g, "<radio");
                word = word.replaceAll(/select\s*>/g, "radio>");

                word = word.replaceAll(/<\s*textarea/g, "<radio");
                word = word.replaceAll(/textarea\s*>/g, "radio>");

                word = word.replaceAll(/<\s*col/g, "<column");
                word = word.replaceAll(/col\s*>/g, "column>");

                const dom = new jsdom.JSDOM(word, { runScripts: 'outside-only' });

                //dom.window.document.querySelectorAll('row').forEach(i => { console.log(i.tagName, i.getAttribute('label'));});
                //dom.window.document.querySelectorAll('radio').forEach(i => { console.log(i.tagName, i.getAttribute('label'));});

                let element = dom.window.document.querySelector('radio,checkbox,text,number,float,textarea,select');

                let rows = Array.from(element.querySelectorAll('row'));
                let cols = Array.from(element.querySelectorAll('column'));
                let choices = Array.from(element.querySelectorAll('choice'));

                let grouping = 'rows';
                if (element && element.getAttribute('grouping')) {
                    grouping = element.getAttribute('grouping');
                }

                let loopvars = '';

                console.log(grouping);
                console.log(rows.length);
                console.log(cols.length);
                console.log(choices.length);

                if (loopType) {
                    if (grouping == 'rows' && rows.length !== 0 && cols.length === 0 && choices.length == 0) {
                        console.log('only rows - rows are the main');
                        rows.forEach((x, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${element.getAttribute('label') + '.' + x.getAttribute('label')}">\n\t\t<loopvar name="var1">${x.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'cols' && rows.length === 0 && cols.length !== 0 && choices.length === 0) {
                        console.log('only cols - cols are the main');
                        cols.forEach((x, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${element.getAttribute('label') + '.' + x.getAttribute('label')}">\n\t\t<loopvar name="var1">${x.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'rows' && rows.length !== 0 && cols.length !== 0 && choices.length !== 0) {
                        console.log('only rows/cols/choices - rows are the main');
                        rows.forEach((row, ind) => {
                            let cond = [];
                            let condString = [];
                            cols.forEach(col => {
                                let cond2 = [];
                                choices.forEach(choice => {
                                    cond2.push([col.getAttribute('label'), choice.getAttribute('label')]);
                                })
                                cond.push([row.getAttribute('label'), cond2]);
                            })
                            //console.log(cond);

                            cond.forEach(x => {
                                let tempString = [];
                                x[1].forEach(y => {
                                    tempString.push(element.getAttribute('label') + '.' + x[0] + '.' + y[0] + '.' + y[1]);
                                });
                                condString.push('(' + tempString.join(' or ') + ')');
                            })

                            //console.log(condString);

                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${'(' + condString.join(' or ') + ')'}">\n\t\t<loopvar name="var1">${row.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'cols' && rows.length !== 0 && cols.length !== 0 && choices.length !== 0) {
                        console.log('only cols/rows/choices - cols are the main');
                        cols.forEach((col, ind) => {
                            let cond = [];
                            let condString = [];
                            rows.forEach(row => {
                                let cond2 = [];
                                choices.forEach(choice => {
                                    cond2.push([row.getAttribute('label'), choice.getAttribute('label')]);
                                })
                                cond.push([col.getAttribute('label'), cond2]);
                            })
                            //console.log(cond);

                            cond.forEach(x => {
                                let tempString = [];
                                x[1].forEach(y => {
                                    tempString.push(element.getAttribute('label') + '.' + x[0] + '.' + y[0] + '.' + y[1]);
                                });
                                condString.push('(' + tempString.join(' or ') + ')');
                            })
                            //console.log(condString);

                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${'(' + condString.join(' or ') + ')'}">\n\t\t<loopvar name="var1">${col.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'rows' && rows.length !== 0 && cols.length !== 0 && choices.length === 0) {
                        console.log('only rows/cols - rows are the main');
                        rows.forEach((row, ind) => {
                            let cond = [];
                            let condString = [];
                            cols.forEach(col => {
                                cond.push([row.getAttribute('label'), col.getAttribute('label')]);
                            })
                            //console.log(cond);

                            cond.forEach(x => {
                                let tempString = [];
                                tempString.push(element.getAttribute('label') + '.' + x[0] + '.' + x[1]);
                                condString.push(tempString.join(' or '));
                            })

                            //console.log(condString);

                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${'(' + condString.join(' or ') + ')'}">\n\t\t<loopvar name="var1">${row.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'cols' && rows.length !== 0 && cols.length !== 0 && choices.length === 0) {
                        console.log('only cols/rows - cols are the main');
                        cols.forEach((col, ind) => {
                            let cond = [];
                            let condString = [];
                            rows.forEach(row => {
                                cond.push([col.getAttribute('label'), row.getAttribute('label')]);
                            })
                            //console.log(cond);

                            cond.forEach(x => {
                                let tempString = [];
                                tempString.push(element.getAttribute('label') + '.' + x[0] + '.' + x[1]);
                                condString.push(tempString.join(' or '));
                            })

                            //console.log(condString);

                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${'(' + condString.join(' or ') + ')'}">\n\t\t<loopvar name="var1">${col.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'rows' && rows.length !== 0 && cols.length === 0 && choices.length !== 0) {
                        console.log('only rows/choices - rows are the main');
                        rows.forEach((row, ind) => {
                            let cond = [];
                            let condString = [];
                            choices.forEach(choice => {
                                cond.push([row.getAttribute('label'), choice.getAttribute('label')]);
                            })
                            //console.log(cond);

                            cond.forEach(x => {
                                let tempString = [];
                                tempString.push(element.getAttribute('label') + '.' + x[0] + '.' + x[1]);
                                condString.push(tempString.join(' or '));
                            })

                            //console.log(condString);

                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${'(' + condString.join(' or ') + ')'}">\n\t\t<loopvar name="var1">${row.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if ((grouping == 'rows' && rows.length === 0 && cols.length !== 0 && choices.length !== 0) || (grouping == 'cols' && rows.length === 0 && cols.length !== 0 && choices.length !== 0)) {
                        console.log('only cols/choices - cols are the main');
                        cols.forEach((col, ind) => {
                            let cond = [];
                            let condString = [];
                            choices.forEach(choice => {
                                cond.push([col.getAttribute('label'), choice.getAttribute('label')]);
                            })
                            //console.log(cond);
                            cond.forEach(x => {
                                let tempString = [];
                                tempString.push(element.getAttribute('label') + '.' + x[0] + '.' + x[1]);
                                condString.push(tempString.join(' or '));
                            })

                            //console.log(condString);

                            loopvars = loopvars + `\t<looprow label="${ind + 1}" cond="${'(' + condString.join(' or ') + ')'}">\n\t\t<loopvar name="var1">${col.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    }
                } else if (!loopType) {
                    if (grouping == 'rows' && rows.length !== 0 && cols.length === 0 && choices.length == 0) {
                        console.log('only rows - rows are the main');
                        rows.forEach((x, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${x.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'cols' && rows.length === 0 && cols.length !== 0 && choices.length === 0) {
                        console.log('only cols - cols are the main');
                        cols.forEach((x, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${x.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'rows' && rows.length !== 0 && cols.length !== 0 && choices.length !== 0) {
                        console.log('only rows/cols/choices - rows are the main');
                        rows.forEach((row, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${row.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'cols' && rows.length !== 0 && cols.length !== 0 && choices.length !== 0) {
                        console.log('only cols/rows/choices - cols are the main');
                        cols.forEach((col, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${col.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'rows' && rows.length !== 0 && cols.length !== 0 && choices.length === 0) {
                        console.log('only rows/cols - rows are the main');
                        rows.forEach((row, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${row.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'cols' && rows.length !== 0 && cols.length !== 0 && choices.length === 0) {
                        console.log('only cols/rows - cols are the main');
                        cols.forEach((col, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${col.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if (grouping == 'rows' && rows.length !== 0 && cols.length === 0 && choices.length !== 0) {
                        console.log('only rows/choices - rows are the main');
                        rows.forEach((row, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${row.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });

                    } else if ((grouping == 'rows' && rows.length === 0 && cols.length !== 0 && choices.length !== 0) || (grouping == 'cols' && rows.length === 0 && cols.length !== 0 && choices.length !== 0)) {
                        console.log('only cols/choices - cols are the main');
                        cols.forEach((col, ind) => {
                            loopvars = loopvars + `\t<looprow label="${ind + 1}">\n\t\t<loopvar name="var1">${col.innerHTML}</loopvar>\n\t</looprow>\n`;
                        });
                    }
                }
                // console.log(element.tagName, element.getAttribute('label'), element.getAttribute('cond'), element.getAttribute('grouping'));

                // rows.forEach(x => {
                //      console.log(x.getAttribute('label'), x.textContent);
                // })

                //console.log(element.innerHTML);

                finalWord = `
<loop label="L${element.getAttribute('label')}" vars="var1">
    <title>${element.getAttribute('label')} Loop</title>
    <block label="blockLoop${element.getAttribute('label')}" builder:title="${element.getAttribute('label')} loop block">
        <suspend/>


        <suspend/>
    </block>
${loopvars}
</loop>
<suspend/>
`;

                editBuilder.replace(txt, finalWord);
            })
        });
    }
}

/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */


function commandGroup() {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        let document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(function (txt) {
                let word = '<deciphergroup>' + document.getText(txt).trim() + '</deciphergroup>';

                word = word.replaceAll(/<\s*col/g, "<deciphercolumn");
                word = word.replaceAll(/col\s*>/g, "deciphercolumn>");

                const dom = new jsdom.JSDOM(word, { runScripts: 'outside-only' });

                let groupContainer = dom.window.document.querySelector('deciphergroup');
                let items = groupContainer.querySelectorAll('deciphergroup > *');
                let tag = '';
                let assignedGroup = '';
                let generatedIndex = Math.random().toString(36).substring(2).slice(-3);

                items.forEach((x, ind) => {
                    // console.log(x.tagName, x.getAttribute('label'), x.innerHTML);
                    if (ind == 0) {
                        tag = x.tagName.toLowerCase();
                    }
                    x.setAttribute('groups', `g${generatedIndex}`);
                });

                if (tag==="deciphercolumn"){
                    tag = 'col'
                }

                assignedGroup = `\n  <group label="g${generatedIndex}" builder:axis="${tag}" where="report">Group g${generatedIndex}</group>\n`;

                editBuilder.replace(txt, "  " + groupContainer.innerHTML.replaceAll(/<\s*deciphercolumn/g, "<col").replaceAll(/deciphercolumn\s*>/g, "col>") + assignedGroup);
            })
        });
    }
}



/* ***************************************************************************************************************************************************************************************** */
/* ***************************************************************************************************************************************************************************************** */

/**
 * Module Exports
 */

module.exports = {
    commandRadio,
    commandRadioBtn,
    commandRadioBtnGrid,
    commandRatingScale,
    commandCardRating,
    commandCheckbox,
    commandCheckboxBtn,
    commandCheckboxBtnGrid,
    commandSingleCardSort,
    commandMultiCardSort,
    commandSelect,
    commandRanksort,
    commandStarrating,
    commandSliderRating,
    commandTextarea,
    commandText,
    commandDatepicker,
    commandNumber,
    commandSlider,
    commandSliderDecimal,
    commandAutoSum,
    commandRating,
    commandTexthighlighter,
    commandAutosuggest,
    commandHtml,
    commandImagemap,
    commandMediaEvaluator,
    commandMediaTestimonial,
    commandRow,
    commandRowMatch,
    commandCol,
    commandColMatch,
    commandChoice,
    commandChoiceMatch,
    commandBold,
    commandItalic,
    commandUnderline,
    commandBari,
    commandLoop,
    commandGroup
}