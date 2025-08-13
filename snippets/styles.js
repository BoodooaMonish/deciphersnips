let globalPageHead = `<style name="global.page.head"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');

let respviewClientMeta = `<style name="respview.client.meta"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');

let respviewClientCss = `<style name="respview.client.css"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');


let respviewClientJs = `<style name="respview.client.js"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');


let surveyHeader = `<style name='survey.header'> <![CDATA[
<div class="page-header"></div>
<!-- /.page-header -->
]]></style>XXXXX`.replace('XXXXX', '${0}');


let surveyLogo = `<style name='survey.logo'> <![CDATA[
\\\@if gv.inSurvey() and gv.survey.root.styles.ss.logoFile
    <div class="logo logo-$(gv.survey.root.styles.ss.logoPosition)">
        <img src="[static]/survey/$(gv.survey.root.styles.ss.logoFile)" class="logo-image" alt="Logo" />
    </div>
    <!-- /.logo -->
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');


let buttons = `<style name='buttons'> <![CDATA[
<div class="survey-buttons">
    $(left)
    $(right)
</div>
<!-- #surveyButtons -->
]]></style>XXXXX`.replace('XXXXX', '${0}');


let buttonContinue = `<style name='button.continue'> <![CDATA[
<input type="submit" name="continue" id="btn_continue" class="button continue" value="\@(continue) \&raquo;" onClick="var i = document.createElement('input');i.setAttribute('type', 'hidden');i.setAttribute('value', '1');i.setAttribute('name', '__has_javascript');document.forms.primary.appendChild(i);"/>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let buttonFinish = `<style name='button.finish'> <![CDATA[
<input type="submit" name="finish" id="btn_finish" class="button finish" value="\@(finish)"  onClick="var i = document.createElement('input');i.setAttribute('type', 'hidden');i.setAttribute('value', '1');i.setAttribute('name', '__has_javascript');document.forms.primary.appendChild(i);"/>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let buttonCancel = `<style name="button.cancel"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');


let surveyCompletion = `<style name='survey.completion'> <![CDATA[
\\\@if not gv.survey.root.styles.ss.hideProgressBar
    <div role="progressbar" aria-valuenow="\$(percent)" aria-valuemin="0" aria-valuemax="100" class="progress-bar progress-\$\{\"top\" if gv.survey.root.progressOnTop else "bottom\"\}\" title="\@(progress-bar) - \$(percent)\% \@(complete)">
      <div class="progress-box-outer" aria-hidden="true"><span class="progress-box-completed" style="width: \$(percent)\%;"></span></div>
      <div class="progress-text" aria-hidden="true">\$(percent)\%</div>
    </div>
    <!-- /.progress-bar -->
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');



let surveyRespviewFooter = `<style name='survey.respview.footer'> <![CDATA[
<div class="footer">\${v2_insertStyle(\'survey.respview.footer.support\')\}</div>
<!-- /.footer -->
]]></style>XXXXX`.replace('XXXXX', '${0}');



let surveyRespviewFooterSupport = `<style name="survey.respview.footer.support"> <![CDATA[
\@(support)
]]></style>XXXXX`.replace('XXXXX', '${0}');


let buttonGoback = `<style name='button.goback'> <![CDATA[
<input type="button" id="btn_goback" class="button back" onClick="Survey.postControl('back2')" value="\&laquo\; \@(back)" />
]]></style>XXXXX`.replace('XXXXX', '${0}');



let pageHead = `<style name="page.head"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');


let questionHeader = `<style name='question.header'> <![CDATA[
<div id="question_\$\{this.label\}" class="question \$\{'disabledElement ' if why and gv.debug.qa else ''\}\$\{this.getName().lower()\} label_\$\{this.label\} \$(this.styles.ss.questionClassNames) \$(hasError)"\$\{' role="radiogroup" aria-labelledby="' + (this.label + '_' + ec.enabledCols\[0\].label if ec.haveColLegend else 'question_text_' + this.label) + '\"' if ec.simpleList else ''}>
\$\{v2_insertStyle('survey.question')\}
$(error)
\$\{v2_insertStyle('survey.question.instructions')\}
\$\{v2_insertStyle('survey.question.answers.start')\}
]]></style>XXXXX`.replace('XXXXX', '${0}');


let surveyQuestion = `<style name='survey.question'> <![CDATA[
<h1 title="\@(question)" class="question-text" id="question_text_\$\{this.label\}">\$\{this.styles.html.showNumber and (str(number) + '. ') or ''\}\$(title)</h1>
<\!-- /.question-text -->
]]></style>XXXXX`.replace('XXXXX', '${0}');


let surveyQuestionInstructions = `<style name='survey.question.instructions'> <![CDATA[
<h2 title="\@(instructions)" class="instruction-text">\$(comment)</h2>
<\!-- /.instruction-text -->
]]></style>XXXXX`.replace('XXXXX', '${0}');


let surveyQuestionAnswersStart = `<style name='survey.question.answers.start'> <![CDATA[
<div class="answers \$(answerClassNames)">
\$(fir)
\\\@if not ec.simpleList
<\$(tag) class="grid \$(gridClassNames)" data-settings="\$(gridOptions)" data-height="\$\{this.styles.ss.rowHeight if this.styles.ss.rowHeight else \"\"\}" summary="This table contains form elements to answer the survey question">
\\\@if not simple
<tbody>
\\\@endif
\\\@if not forceDesktop
\$\{v2_insertStyle('question.borderfix')\}
\\\@endif
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionGroupColumn = `<style name='question.group-column'> <![CDATA[
<\$(tag) class="row row-col-legends row-col-legends-top colGroup">
    \$(left)
    \$(elements)
    \$(right)
<\/\$(tag)>
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionGroupColumnCell = `<style name='question.group-column-cell'> <![CDATA[
<\$(tag) scope="colgroup" colspan="\$(span)" id="\$(this.label)_\$(group.label)" class="cell nonempty legend col-legend col-legend-top col-legend-group \$(levels) \$\{\"desktop\" if this.grouping.cols else "mobile\"\} \$\{\"col-legend-space" if this.grouping.cols and ec.haveLeftLegend and ec.haveRightLegend else "border-collapse\"\} \$(group.styles.ss.groupClassNames)">
    \$(text)
</\$(tag)>
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionTopLegend = `<style name='question.top-legend'> <![CDATA[
\\\@if ec.simpleList
    \$(legends)
\\\@else
\\\@if this.styles.ss.colLegendHeight
    <\$(tag) class="row row-col-legends row-col-legends-top \$\{\"mobile-top-row-legend \" if mobileOnly else \"\"\}\$\{\"GtTenColumns \" if ec.colCount > 10 else \"\"\}colCount-\$(colCount)" style="height\:\$\{this.styles.ss.colLegendHeight\};">
\\\@else
    <\$(tag) class="row row-col-legends row-col-legends-top \$\{\"mobile-top-row-legend \" if mobileOnly else \"\"\}\$\{\"GtTenColumns \" if ec.colCount > 10 else \"\"\}colCount-\$(colCount)">
\\\@endif
    \$(left)
    \$(legends)
    \$(right)
</\$(tag)>
\\\@if not simple
</tbody>
<tbody>
\\\@endif
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let questionLeftBlankLegend = `<style name='question.left-blank-legend'> <![CDATA[
<\$(tag) class="cell empty empty-left empty-\$(pos) unused \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse"></\$(tag)>
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionTopLegendItem = `<style name='question.top-legend-item'> <![CDATA[
\\\@if ec.simpleList
    <div id="\$(this.label)_\$(col.label)" class="legend col-legend col-legend-top col-legend-basic \$(levels) \$\{\"col-legend-space\" if this.grouping.cols and (col.group or col.index!=0) and ec.haveLeftLegend and ec.haveRightLegend else \"border-collapse\"\} \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)">
        \$(text)
    </div>
\\\@else
\\\@if this.styles.ss.colWidth
    <\$(tag) scope="col" id="\$(this.label)_\$(col.label)" class="cell nonempty legend col-legend col-legend-top col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} \$\{\"col-legend-space\" if this.grouping.cols and (col.group or col.index!=0) and ec.haveLeftLegend and ec.haveRightLegend else \"border-collapse\"\} \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)" style=\"width\:\$\{this.styles.ss.colWidth}; min-width\:\$\{this.styles.ss.colWidth\}\">
        \$(text)
    </\$(tag)>
\\\@else
    <\$(tag) scope="col" id="\$(this.label)_\$(col.label)" class="cell nonempty legend col-legend col-legend-top col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} \$\{\"col-legend-space\" if this.grouping.cols and (col.group or col.index!=0) and ec.haveLeftLegend and ec.haveRightLegend else \"border-collapse\"\} \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)">
        \$(text)
    </\$(tag)>
\\\@endif
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionRightBlankLegend = `<style name='question.right-blank-legend'> <![CDATA[
<\$(tag) class="cell empty empty-right empty-\$(pos) unused \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse"></\$(tag)>
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionGroup3 = `<style name='question.group-3'> <![CDATA[
<\$(tagRow) class="row row-group row-group-3 rowGroup group3">
    <\$(tagCell) scope="rowgroup" colspan="\$(span)" id="\$(this.label)_\$(group.label)" class="cell nonempty legend row-legend row-legend-left row-legend-group \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(group.styles.ss.groupClassNames)">
        \$(text)
    </\$(tagCell)>
</\$(tagRow)>
]]></style>XXXXX`.replace('XXXXX', '${0}');



let questionGroup2 = `<style name='question.group-2'> <![CDATA[
<\$(tagRow) class="row row-group row-group-2 rowGroup group2">
    <\$(tagCell) scope="rowgroup" colspan="\$(span)" id="\$(this.label)_\$(group.label)" class="cell nonempty legend row-legend row-legend-left row-legend-group \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(group.styles.ss.groupClassNames)">
        \$(text)
    </\$(tagCell)>
</\$(tagRow)>
]]></style>XXXXX`.replace('XXXXX', '${0}');



let questionGroup = `<style name='question.group'> <![CDATA[
<\$(tagRow) class="row row-group row-group-1 rowGroup group1">
    <\$(tagCell) scope="rowgroup" colspan="\$(span)" id="\$(this.label)_\$(group.label)" class="cell nonempty legend row-legend row-legend-left row-legend-group \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} \$\{\"row-legend-group-space\" if row.index!=0 and ec.haveRightLegend and ec.haveLeftLegend else \"border-collapse\"\} \$(group.styles.ss.groupClassNames)">
        \$(text)
    </\$(tagCell)>
</\$(tagRow)>
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionRow = `<style name='question.row'> <![CDATA[
\\\@if ec.simpleList
\$(elements)
\\\@else
\\\@if this.styles.ss.rowHeight
    <\$(tag) class="row row-elements \$(style) colCount-\$(colCount)" style="height\:\$\{this.styles.ss.rowHeight\};">
\\\@else
    <\$(tag) class="row row-elements \$(style) colCount-\$(colCount)">
\\\@endif
\$(left)
\$(elements)
\$(right)
</\$(tag)>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionColLegendRow = `<style name='question.col-legend-row'> <![CDATA[
\\\@if ec.simpleList
    \$(legends)
\\\@else
\\\@if this.styles.ss.colLegendHeight
    <\$(tag) class="row row-col-legends row-col-legends-middle \$\{\"GtTenColumns \" if ec.colCount \> 10 else \"\"\}colCount-\$(colCount)" style=\"height\:\$\{this.styles.ss.colLegendHeight\}\;\">
\\\@else
    <\$(tag) class="row row-col-legends row-col-legends-middle \$\{\"GtTenColumns \" if ec.colCount \> 10 else \"\"\}colCount-\$(colCount)">
\@endif
    \$(left)
    \$(legends)
    \$(right)
</\$(tag)>
\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let questionColLegendRowItem = `<style name='question.col-legend-row-item'> <![CDATA[
\\\@if ec.simpleList
    <div class="legend col-legend col-legend-middle col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse q-col-legend-row-item \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)">
        \$(text)
    </div>
\\\@else
\\\@if this.styles.ss.colWidth
    <\$(tag) scope="col" class="cell nonempty legend col-legend col-legend-middle col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse q-col-legend-row-item \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)\" style=\"width\:\$\{this.styles.ss.colWidth\}\; min-width\:\$\{this.styles.ss.colWidth\}\">
        \$(text)
    </\$(tag)>
\\\@else
    <\$(tag) scope="col" class="cell nonempty legend col-legend col-legend-middle col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse q-col-legend-row-item \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)">
        \$(text)
    </\$(tag)>
\\\@endif
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');



let questionNaRow = `<style name='question.na.row'> <![CDATA[
\\\@if ec.simpleList
\$(naElement)
\\\@else
<\$(tagRow) class="row row-elements row-no-answer \$(rowStyle)">
\$(left)
<\$(tagCell) colspan="\$(colCount)" \$(headers) class="cell nonempty element cell-no-answer \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(extraClasses) \$(col.styles.ss.colClassNames) \$(row.styles.ss.rowClassNames) clickableCell" \$(extra)>
    \$(naElement)
</\$(tagCell)>
\$(right)
</\$(tagRow)>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let questionBottomLegend = `<style name='question.bottom-legend'> <![CDATA[
\\\@if ec.simpleList
    \$(legends)
\\\@else
\\\@if not simple
</tbody>
<tbody>
\\\@endif
\\\@if this.styles.ss.colLegendHeight
    <\$(tag) class="row row-col-legends row-col-legends-bottom \$\{\"GtTenColumns \" if ec.colCount \> 10 else \"\"\}colCount-\$(colCount)" style="height\:\$\{this.styles.ss.colLegendHeight\}\;\">
\\\@else
    <\$(tag) class="row row-col-legends row-col-legends-bottom \$\{\"GtTenColumns \" if ec.colCount \> 10 else \"\"\}colCount-\$(colCount)">
\\\@endif
    \$(left)
    \$(legends)
    \$(right)
</\$(tag)>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let questionBottomLegendItem = `<style name='question.bottom-legend-item'> <![CDATA[
\\\@if ec.simpleList
    <div id="\$(this.label)_\$(col.label)" class="legend col-legend col-legend-bottom col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)">
        \$(text)
    </div>
\\\@else
\\\@if this.styles.ss.colWidth
    <\$(tag) scope="col" id="\$(this.label)_\$(col.label)" class="cell nonempty legend col-legend col-legend-bottom col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)\" style=\"width\:\$\{this.styles.ss.colWidth\}\; min-width\:\$\{this.styles.ss.colWidth\}\">
        \$(text)
    </\$(tag)>
\\\@else
    <\$(tag) scope="col" id="\$(this.label)_\$(col.label)" class="cell nonempty legend col-legend col-legend-bottom col-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"} border-collapse \$(col.styles.ss.colClassNames) \$\{col.group.styles.ss.groupClassNames if col.group else \"\"\} \$(colError)">
        \$(text)
    </\$(tag)>
\\\@endif
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');


let questionFooter = `<style name='question.footer'> <![CDATA[
\$\{v2_insertStyle('survey.question.answers.end')\}
<\/div>
<\!-- \/.question --\>]]>
</style>XXXXX`.replace('XXXXX', '${0}');


let surveyQuestionAnswersEnd = `<style name='survey.question.answers.end'> <![CDATA[
\\\@if not ec.simpleList
\\\@if not simple
</tbody>
\\\@endif
</\$(tag)>
\\\@endif
<\!-- \/.grid --\>
</div>
<\!-- \/.answers --\>]]>
</style>XXXXX`.replace('XXXXX', '${0}');


let questionAfter = `<style name="question.after"> <![CDATA[
XXXXX
]]></style>`.replace('XXXXX', '${0}');


let questionElement = `<style name='question.element'> <![CDATA[
\\\@if ec.simpleList
<div class="element \$(rowStyle) \$(levels) \$(extraClasses) \$\{col.group.styles.ss.groupClassNames if col.group else (row.group.styles.ss.groupClassNames if row.group else \"\"\)\} \$(col.styles.ss.colClassNames) \$(row.styles.ss.rowClassNames) \$\{\"clickableCell\" if isClickable else \"\"\}\"\$(extra)>
    \$\{v2_insertStyle('el.label.start')\}
    \$(text)
    \$\{v2_insertStyle('el.label.end')\}
</div>
\\\@else
<\$(tag) \$(headers) class="cell nonempty element \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(extraClasses) \$\{col.group.styles.ss.groupClassNames if col.group else (row.group.styles.ss.groupClassNames if row.group else \"\")\} \$(col.styles.ss.colClassNames) \$(row.styles.ss.rowClassNames) \$\{\"clickableCell\" if isClickable else \"\"\}\"\$(extra)>
    \$\{v2_insertStyle('el.label.start')\}
    \$(text)
    \$\{v2_insertStyle('el.label.end')\}
</\$(tag)>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let questionLeft = `<style name='question.left'> <![CDATA[
\\\@if this.styles.ss.legendColWidth
    <\$(tag) scope="row" class="cell nonempty legend row-legend row-legend-left \$\{\"row-legend-both \" if ec.haveRightLegend and ec.haveLeftLegend else \"\"\}row-legend-basic \$\{\"mobile-left-row-legend \" if force else \"\"\}\$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} \$\{\"row-legend-both-space \" if ec.haveRightLegend and ec.haveLeftLegend and (not row.group or not row.index==0) else \"border-collapse \"\} \$(row.styles.ss.rowClassNames)\" style=\"width\:\$\{this.styles.ss.legendColWidth\}\; min-width\:\$\{this.styles.ss.legendColWidth\}">
        \$(text)
    </\$(tag)>
\\\@else
    <\$(tag) scope="row" class="cell nonempty legend row-legend row-legend-left \$\{\"row-legend-both \" if ec.haveRightLegend and ec.haveLeftLegend else \"\"\}row-legend-basic \$\{\"mobile-left-row-legend \" if force else \"\"\}\$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} \$\{\"row-legend-both-space \" if ec.haveRightLegend and ec.haveLeftLegend and (row.group or not row.index==0) else \"border-collapse \"\} \$(row.styles.ss.rowClassNames)\">
        \$(text)
    </\$(tag)>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let questionRight = `<style name='question.right'> <![CDATA[
\\\@if this.styles.ss.legendColWidth
    <\$(tag) scope="row" class="cell nonempty legend row-legend row-legend-right \$\{\"row-legend-both \" if ec.haveRightLegend and ec.haveLeftLegend else \"\"\}row-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(row.styles.ss.rowClassNames)\" style=\"width\:\$\{this.styles.ss.legendColWidth\}\; min-width\:\$\{this.styles.ss.legendColWidth\}">
        \$(text)
    </\$(tag)>
\\\@else
    <\$(tag) scope="row" class="cell nonempty legend row-legend row-legend-right \$\{\"row-legend-both \" if ec.haveRightLegend and ec.haveLeftLegend else \"\"\}row-legend-basic \$(levels) \$\{\"desktop\" if this.grouping.cols else \"mobile\"\} border-collapse \$(row.styles.ss.rowClassNames)\">
        \$(text)
    </\$(tag)>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');


let elRadio = `<style name='el.radio'> <![CDATA[
<input type="radio" name="\$(name)" value="\$(value)" id=\$(id) \$(checked) class="input radio" \$(extra)/>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elCheckbox = `<style name='el.checkbox'> <![CDATA[
<input type="checkbox" name="\$(name)" id="\$(id)" value="1" \$(checked) class="\$\{flags.CSS\} input checkbox" \$(extra)/>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elSelectHeader = `<style name='el.select.header'> <![CDATA[
<select name="\$(name)" id="\$(id)" class="input dropdown" \$(extra)>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elSelectDefault = `<style name='el.select.default'> <![CDATA[
<option value="\-1" \$(selected)>\@(select)</option>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elSelectElement = `<style name='el.select.element'> <![CDATA[
<option value="\$(value)" \$(selected) class="\$\{choice.styles.ss.choiceClassNames if ec.choice else \"\"\}\">\$(text)</option>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elSelectFooter = `<style name='el.select.footer'> <![CDATA[
</select>
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elTextarea = `<style name='el.textarea'> <![CDATA[
\\\@if row.styles.ss.preText or this.styles.ss.preText
    \$\{row.styles.ss.preText or this.styles.ss.preText or \"\"}\&nbsp\;
\\\@endif
<textarea name="\$(name)" id="\$(id)" rows="\$(height)" cols="\$(width)" wrap="virtual" class="input textarea" \$(extra)>\$(value)</textarea>
\\\@if row.styles.ss.postText or this.styles.ss.postText
    \&nbsp\;\$\{row.styles.ss.postText or this.styles.ss.postText or \"\"\}
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elNoanswer = `<style name='el.noanswer'> <![CDATA[
\\\@if ec.simpleList
<div class="element">
\\\@endif
<span class="cell-sub-wrapper cell-legend-right"><span class="cell-input cell-sub-column">
<input type="checkbox" id="\$(row.checkboxLabel)" name="\$(row.checkboxLabel)" value="1" class="input no-answer checkbox" \$(value\|checkbox)/>
</span><span class="cell-text cell-sub-column"><label for="\$(row.checkboxLabel)">\$(label)</label></span></span>
\\\@if ec.simpleList
</div>
\\\@endif
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elText = `<style name='el.text'> <![CDATA[
\\\@if row.styles.ss.preText or this.styles.ss.preText
<span class="pre-text">
    \$\{row.styles.ss.preText or this.styles.ss.preText or \"\"\}\&nbsp\;
</span>                                 
\\\@endif
\\\@if this.xmlTagName in ('number'\, 'float')
<input type="number" name="\$(name)" id="\$(id)" value="\$(value)" size="\$(size)" class="input text-input" \$(extra)/>
\\\@else                                  
<input type="text" name="\$(name)" id="\$(id)" value="\$(value)" size="\$(size)" class="input text-input" \$(extra)/>
\\\@endif
\\\@if row.styles.ss.postText or this.styles.ss.postText
<span class="post-text">
    \&nbsp\;\$\{row.styles.ss.postText or this.styles.ss.postText or \"\"\}
</span>
\\\@endif                                                             
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elOpen = `<style name='el.open'> <![CDATA[
<input type="text" name="\$(name)" id="\$(name)" value="\$(value)" data-cell="\$(cell.parent.label)_\$(cell.label)" size="\$(size)" class="input text-input oe oe-\$(align)" \$(extra)/>
\$(scripts)
]]></style>XXXXX`.replace('XXXXX', '${0}');

let elImage = `<style name='el.image'> <![CDATA[
\\\@if data
\\\@if this.displayInline
<img align='center' src='\/survey\/\$\{gv.survey.path\}\/\$\(localFilename\|q\)'>
\\\@endif
<input type="hidden" name="old-\$(name)" value="\$(data)">
<br/><br/>
\\\@endif
<input type="file" name="\$(name)" size="\$(size)">]]></style>XXXXX`.replace('XXXXX', '${0}');



let styles = [
["style.global.page.head", globalPageHead, "Adds more HTML codes in the \<HEAD\> section of a page globally."],
["style.respview.client.meta", respviewClientMeta, "Add additional \<meta\> tags."],
["style.respview.client.css", respviewClientCss, "Adds additional custom CSS after default external CSS links in the \<head\>."],
["style.respview.client.js", respviewClientJs, "Adds additional custom Javascript after default external Javascript links in the \<head\>."],
["style.survey.header", surveyHeader, "Displays a header before the survey content and logo."],
["style.survey.logo", surveyLogo, "Displays the survey logo included in the survey tag."],
["style.buttons", buttons, "Displays the buttons at the bottom of the page."],
["style.button.continue", buttonContinue, "Displays the \"Continue\" button."],
["style.button.finish", buttonFinish, "Displays the \"Finish\" button on the last page of the survey."],
["style.button.cancel", buttonCancel, "Blank by default. Can be used for an additional button (e.g., \"Back\" or \"Come back later\")."],
["style.survey.completion", surveyCompletion, "Overrides the survey progress bar."],
["style.survey.respview.footer", surveyRespviewFooter, "Displays a footer at the end of the survey page."],
["style.survey.respview.footer.support", surveyRespviewFooterSupport, "Displays the support links at the bottom of the page."],
["style.button.goback", buttonGoback, "Displays a \"Back\" button when backward navigation has been enabled (requires ss\:enableNavigaton=\"1\")."],
["style.page.head", pageHead, "Blank by default. Adds more codes in the \<head\> section (even when overriding within a question)."],
["style.question.header", questionHeader, "Displayed at the beginning of a question. Defines where the question text, errors, instruction text, and answer options start. This style pipes other style blocks. This style can be used with mode before or after, but cannot be overridden."],
["style.survey.question", surveyQuestion, "Displays the question text."],
["style.survey.question.instructions", surveyQuestionInstructions, "Displays the instruction text."],
["style.survey.question.answers.start", surveyQuestionAnswersStart, "Displays the start of the question-answer table."],
["style.question.group-column", questionGroupColumn, "Displays the table row contain the column group headings."],
["style.question.group-column-cell", questionGroupColumnCell, "Displays the column group heading containing the column group text."],
["style.question.top-legend", questionTopLegend, "Displays the table row containing the column legends."],
["style.question.left-blank-legend", questionLeftBlankLegend, "Displays the table cell that is normally blank shown to the left of the question.top\-legend. Check \$\(pos\) to see if the position is top or bottom."],
["style.question.top-legend-item", questionTopLegendItem, "Displays the row-column headings containing the column text."],
["style.question.right-blank-legend", questionRightBlankLegend, "Displays the table cell that is normally blank shown to the left of the question.top-legend."],
["style.question.group-3", questionGroup3, "Displays the row group heading containing the row group depth three text."],
["style.question.group-2", questionGroup2, "Displays the row group heading containing the row group depth 2 text."],
["style.question.group", questionGroup, "Displays the row group heading containing the row group text."],
["style.question.row", questionRow, "Displays the table row containing the row legend text and the input element."],
["style.question.col-legend-row", questionColLegendRow, "Displays the table row used for repeated legends."],
["style.question.col-legend-row-item", questionColLegendRowItem, "Displays the table row column legends used for repeated legends."],
["style.question.na.row", questionNaRow, "Displays the noanswer response row."],
["style.question.bottom-legend", questionBottomLegend, "Displays the table row containing column legends used when colLegend is set to bottom."],
["style.question.bottom-legend-item", questionBottomLegendItem, "Displays the table row column legends used when colLegend is set to bottom."],
["style.question.footer", questionFooter, "Displays a footer at the end of the question."],
["style.survey.question.answers.end", surveyQuestionAnswersEnd, "Displays the end of the question-answer table."],
["style.question.after", questionAfter, "Blank by default. Can be used with wrap=\"ready\" to add Javascript to after the question."],
["style.question.element", questionElement, "Displays the answer cell containing the question type input element."],
["style.question.left", questionLeft, "Displays the row legend text when rowLegend=\"default\"\."],
["style.question.right", questionRight, "Displays the row legend text when rowLegend=\"right\" or the row has rightLegend text."],
["style.el.radio", elRadio, "The Single Select (radio) type input element."],
["style.el.checkbox", elCheckbox, "The Multi-Select (checkbox) type input element."],
["style.el.select.header", elSelectHeader, "The start of the Select type element."],
["style.el.select.default", elSelectDefault, "The Select type default element."],
["style.el.select.element", elSelectElement, "The Select type choice element."],
["style.el.select.footer", elSelectFooter, "The end of the Select type element."],
["style.el.textarea", elTextarea, "The multi-line text input field used in <textarea> elements."],
["style.el.noanswer", elNoanswer, "The checkbox used for <noanswer> elements."],
["style.el.text", elText, "The open-ended input field used in text and number questions."],
["style.el.open", elOpen, "The open-ended input field used in open-ended rows."],
["style.el.image", elImage, "The upload input field. Allows participants to upload an image, video, or any kind of file."],
];


module.exports = {
	styles
}