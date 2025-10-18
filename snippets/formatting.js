let conjoint = `<suspend/>
<note>DCM Question Template --Start--</note>
<exec when="init">
def setupDCMFile(fname, fileDelimiter="\\t"):
    f = open("%s/%s" % (gv.survey.path, fname))
    dcmObj = [ line.strip("\\r\\n").split(fileDelimiter) for line in f.readlines() ]

    d = {}
    dcm_concepts = []

    for i,row in enumerate(dcmObj):
        if i:
            d["v%s_t%s_c%s" % (row[0],row[1],row[2])] = row[3:]
            if row[2] not in dcm_concepts:
                dcm_concepts.append(row[2])

    concepts = [ int(x) for x in dcm_concepts ]
    concepts.sort()
    d["concepts"] = dcm_concepts

    return d

#set persistent items, format: p.concept#_att#
def setupDCMItems(d, vt, prefix="1"):
    print "***** STAFF ONLY *****"
    print "***** DCM Matrix *****"
    print "Version_Task: %s" % vt

    for concept in d.get("concepts"):
        attributes = d[ "%s_c%s" % (vt,concept) ]
        print "Concept %s: %s" % (concept,attributes)

        for i,attr in enumerate(attributes):
            p[ "concept%s_att%s" % (concept,i+1) ] = res[ "%s_att%s_level%s" % (prefix,i+1,attr) ]
            p[ "dcmLegend_att%s" % (i+1) ] = res[ "%s_legend%s" % (prefix,i+1) ]
</exec>

<exec when="init">
\${1:Q24}_dcm = setupDCMFile("\${2:design.dat}")
</exec>

<quota label="\${1:Q24}_quota" overquota="noqual" sheet="\${1:Q24}_DCM"/>

<number label="\${1:Q24}_Version" size="3" optional="1" verify="range(1,\${3:50})" where="execute">
  <title>\${1:Q24} - DCM Version</title>
  <exec>
print p.markers
for x in p.markers:
  if "/\${1:Q24}_DCM/ver_" in x:
    \${1:Q24}_Version.val = int(x.split("_")[-1])
    break
  </exec>
</number>
<suspend/>

<res label="\${1:Q24}_legend1" >Genre</res>
<res label="\${1:Q24}_legend2" >Additional Story Content</res>
<res label="\${1:Q24}_legend3" >Additional Game Levels</res>
<res label="\${1:Q24}_legend4" >Additional Characters</res>
<res label="\${1:Q24}_legend5" >Additional In-Game Items</res>
<res label="\${1:Q24}_legend6" >Additional Cosmetic Items</res>
<res label="\${1:Q24}_legend7" >Additional Boosters</res>
<res label="\${1:Q24}_legend8" >In-game Currency</res>
<res label="\${1:Q24}_legend9" >Exclusive Items</res>
<res label="\${1:Q24}_legend10">Ads</res>
<res label="\${1:Q24}_legend11">Subscription</res>
<res label="\${1:Q24}_legend12">Upfront Game Client Cost</res>

<res label="\${1:Q24}_att1_level1">First-person shooter (FPS)</res>
<res label="\${1:Q24}_att1_level2">Third-person shooter (TPS) / Action</res>
<res label="\${1:Q24}_att1_level3">Role-playing (RPG)</res>
<res label="\${1:Q24}_att1_level4">Strategy</res>
<res label="\${1:Q24}_att1_level5">Simulation</res>
<res label="\${1:Q24}_att1_level6">Casual / puzzle / card</res>
<res label="\${1:Q24}_att1_level7">Real-time strategy</res>
<res label="\${1:Q24}_att1_level8">Sports</res>
<res label="\${1:Q24}_att1_level9">Music</res>
<res label="\${1:Q24}_att1_level10">Fighting</res>
<res label="\${1:Q24}_att1_level11">Massive online battle arena (MOBA)</res>

<res label="\${1:Q24}_att2_level0"> </res>
<res label="\${1:Q24}_att2_level1"> </res>
<res label="\${1:Q24}_att2_level2">Additional story content is available for purchase in a cash shop</res>

<res label="\${1:Q24}_att3_level0"> </res>
<res label="\${1:Q24}_att3_level1"> </res>
<res label="\${1:Q24}_att3_level2">Additional levels of gameplay are available for purchase in a cash shop</res>

<res label="\${1:Q24}_att4_level0"> </res>
<res label="\${1:Q24}_att4_level1"> </res>
<res label="\${1:Q24}_att4_level2">Additional characters are available for purchase in a cash shop</res>

<res label="\${1:Q24}_att5_level0"> </res>
<res label="\${1:Q24}_att5_level1"> </res>
<res label="\${1:Q24}_att5_level2">In-game items like weapons, vehicles and equipment are available for purchase in a cash shop</res>

<res label="\${1:Q24}_att6_level0"> </res>
<res label="\${1:Q24}_att6_level1"> </res>
<res label="\${1:Q24}_att6_level2">Cosmetic items and customizations for you characters are available for purchase in a cash shop</res>

<res label="\${1:Q24}_att7_level0"> </res>
<res label="\${1:Q24}_att7_level1"> </res>
<res label="\${1:Q24}_att7_level2">Boosters and power-ups are available for purchase in a cash shop</res>

<res label="\${1:Q24}_att8_level0"> </res>
<res label="\${1:Q24}_att8_level1">The game features in-game currency that can only be earned</res>
<res label="\${1:Q24}_att8_level2">The game features in-game currency that can be earned or purchased with real money</res>
<res label="\${1:Q24}_att8_level3">The game features an in-game currency that can only be earned and a separate currency that can only be purchased with real money</res>

<res label="\${1:Q24}_att9_level0"> </res>
<res label="\${1:Q24}_att9_level1"> </res>
<res label="\${1:Q24}_att9_level2">The game features exclusive in-game items that can only be purchased with real money</res>
<res label="\${1:Q24}_att9_level3">The game features exclusive in-game items that can be either earned or purchased with real money</res>

<res label="\${1:Q24}_att10_level0"> </res>
<res label="\${1:Q24}_att10_level1">The game is free of all advertising</res>
<res label="\${1:Q24}_att10_level2">The game features advertising </res>

<res label="\${1:Q24}_att11_level0"> </res>
<res label="\${1:Q24}_att11_level1">There is no subscription required to play</res>
<res label="\${1:Q24}_att11_level2">The game requires you to pay a subscription each month in order to play</res>

<res label="\${1:Q24}_att12_level1">Game is free</res>
<res label="\${1:Q24}_att12_level2">Game is available for \$ 2.50</res>
<res label="\${1:Q24}_att12_level3">Game is available for \$ 5</res>
<res label="\${1:Q24}_att12_level4">Game is available for \$ 10</res>
<res label="\${1:Q24}_att12_level5">Game is available for \$ 15</res>
<res label="\${1:Q24}_att12_level6">Game is available for \$ 20</res>
<res label="\${1:Q24}_att12_level7">Game is available for \$ 25</res>
<res label="\${1:Q24}_att12_level8">Game is available for \$ 30</res>
<res label="\${1:Q24}_att12_level9">Game is available for \$ 40</res>
<res label="\${1:Q24}_att12_level10">Game is available for \$ 50</res>

<res label="NoneText">None of these</res>
<res label="TopText">Concepts</res>
<res label="rowText">Select one option</res>

<exec>p.startTime = timeSpent()</exec>

<loop label="\${1:Q24}_dcm_loop" vars="task" randomizeChildren="0">
  <title>\${1:Q24} - DCM Loop</title>
  <block label="\${1:Q24}_dcm_block" randomize="0">
    <radio label="\${1:Q24}_[loopvar: task]" optional="0" surveyDisplay="desktop" 
      ss:questionClassNames="\${1:Q24}_dcm">
      <title>DCM Title [DCMcount]</title>
      <alt>DCM Task: [loopvar: task]</alt>
      <comment>Select one</comment>
      <exec>
setupDCMItems( \${1:Q24}_dcm, "v%s_t%s" % (Q24_Version.val,"[loopvar: task]"),"\${1:Q24}" )
p.DCMcount = "%d" % (\${1:Q24}_dcm_loop_expanded.order.index([loopvar: task]-1) + 1)
      </exec>
      <col label="c1">Concept 1</col>
      <col label="c2">Concept 2</col>
      <col label="c3">Concept 3</col>
      <col label="c4">Concept 4</col>
      <col label="c5" alt="None of these"/>
      <style name="question.header" mode="before">
        <![CDATA[
          <style type="text/css">
/* add this only if you have scrollbars in IE7,8
div.\${1:Q24}_dcm {
    overflow: hidden;
}
*/
.\${1:Q24}_dcm tr.legend th.legend {
    font-weight: bold;
    width: auto;
}
.\${1:Q24}_dcm th, .\${1:Q24}_dcm td {
    padding: 15px;
}
.\${1:Q24}_dcm tr.dcm_even {
    background-color: #FFFFFF;
}
.\${1:Q24}_dcm tr.dcm_odd {
    background-color: #EFEFEF;
}
.\${1:Q24}_dcm td.dcm_legend {
    font-weight: bold;
    text-align: left;
    width: 120px;
}
.\${1:Q24}_dcm tr.dcm_even td.dcm_item, .\${1:Q24}_dcm tr.dcm_odd td.dcm_item {
    text-align: center;
    width: 120px;
}
          </style>
        ]]>
      </style>

<style arg:addNoneColumn="1" arg:attributes="12" arg:noneText="\${res.NoneText}" arg:top="\${res.TopText}" arg:yeslegend="1" name="question.top-legend">
<![CDATA[
\\@if this.styles.ss.colLegendHeight
<tr class="legend top-legend\${" GtTenColumns" if ec.colCount > 10 else ""} \$(colError)" style="height:\${this.styles.ss.colLegendHeight};">
\\@else
<tr class="legend top-legend\${" GtTenColumns" if ec.colCount > 10 else ""} \$(colError)">
\\@endif

\\@if yeslegend == '1'
    <th class="dcm_legend2">\$(top)</th>
\\@endif
    \$(left)
    \$(legends)
    \$(right)
</tr>

\\@for x in range(1,int(attributes)+1)
<tr class="\${'dcm_%s' % ['odd','even'][x % 2]}">
\\@if yeslegend == '1'
    <td class="dcm_legend">\${p.get('dcmLegend_att%d' % x)}</td>
\\@endif
    <td class="dcm_item">\${p.get('concept%d_att%d' % ([c.index+1 for c in p.get('shuffle-Col-%d' % this.uid) or this.cols][0],x) )}</td>
    <td class="dcm_item">\${p.get('concept%d_att%d' % ([c.index+1 for c in p.get('shuffle-Col-%d' % this.uid) or this.cols][1],x) )}</td>
    <td class="dcm_item">\${p.get('concept%d_att%d' % ([c.index+1 for c in p.get('shuffle-Col-%d' % this.uid) or this.cols][2],x) )}</td>
    <td class="dcm_item">\${p.get('concept%d_att%d' % ([c.index+1 for c in p.get('shuffle-Col-%d' % this.uid) or this.cols][3],x) )}</td>

\\@if addNoneColumn == '1'
\\@if x == 1
     <td rowspan="\${int(\$(attributes))}" style="border-top: none; text-align: center;"><b>\$(noneText)</b></td>
\\@endif
\\@endif

</tr>

\\@end
<tbody>
]]>
</style>

<style arg:row="\${res.rowText}" arg:yeslegend="1" name="question.row">
<![CDATA[
\\@if this.styles.ss.rowHeight
    <tr class="\$(style) colCount-\$(colCount)" style="height:\${this.styles.ss.rowHeight};">
\\@else
    <tr class="\$(style) colCount-\$(colCount)">
\\@endif

\\@if yeslegend == '1'
    <td class="dcm_legend">\$(row)</td>
\\@endif
\$(left)
\$(elements)
\$(right)
</tr>
]]>
</style>

<style arg:addNoneColumn="1" name="question.top-legend-item">
<![CDATA[
\\@if this.styles.ss.colWidth
    <th id="\$(this.label)_\$(col.label)" class="dcm_legend legend survey-q-grid-collegend \$(col.styles.ss.colClassNames) \${col.group.styles.ss.groupClassNames if col.group else ""}" style="width:\${this.styles.ss.colWidth}; min-width:\${this.styles.ss.colWidth}">
        \$(text)
    </th>
\\@else

\\@if addNoneColumn == '1' and col.index == (ec.colCount - 1)
    <th id="\$(this.label)_\$(col.label)" style="border-bottom: none; width: 125px;" >
        \$(text)
    </th>
\\@else
    <th id="\$(this.label)_\$(col.label)" class="legend survey-q-grid-collegend \$(col.styles.ss.colClassNames) \${col.group.styles.ss.groupClassNames if col.group else ""}">
        \$(text)
    </th>
\\@endif

\\@endif
]]>
</style>

    </radio>
    <suspend/>
  </block>

  <looprow label="1">
    <loopvar name="task">1</loopvar>
  </looprow>

  <looprow label="2">
    <loopvar name="task">2</loopvar>
  </looprow>

  <looprow label="3">
    <loopvar name="task">3</loopvar>
  </looprow>

  <looprow label="4">
    <loopvar name="task">4</loopvar>
  </looprow>

  <looprow label="5">
    <loopvar name="task">5</loopvar>
  </looprow>

<looprow label="6">
    <loopvar name="task">6</loopvar>
  </looprow>

<looprow label="7">
    <loopvar name="task">7</loopvar>
  </looprow>

<looprow label="8">
    <loopvar name="task">8</loopvar>
  </looprow>

<looprow label="9">
    <loopvar name="task">9</loopvar>
  </looprow>

<looprow label="10">
    <loopvar name="task">10</loopvar>
  </looprow>

<looprow label="11">
    <loopvar name="task">11</loopvar>
  </looprow>

<looprow label="12">
    <loopvar name="task">12</loopvar>
  </looprow>

<looprow label="13">
    <loopvar name="task">13</loopvar>
  </looprow>

<looprow label="14">
    <loopvar name="task">14</loopvar>
  </looprow>

</loop>

<float label="\${1:Q24}_Timer" size="15" where="execute">
  <title>\${1:Q24} - DCM Timer (Minutes)</title>
  <exec>\${1:Q24}_Timer.val = (timeSpent() - p.startTime) / 60.0</exec>
</float>
<note>DCM Question Template --End--</note>
<suspend/>`;


let maxdiffIndices = `  <suspend/>
    <note>MaxDiff Indices Template --Start--</note>
    <exec when="init">
def setupMaxDiffFile(fname, fileDelimiter="\\t"):
    try:
        f = open("%s/%s" % (gv.survey.path, fname))
        mdObj = [ line.strip("\\r\\n").split(fileDelimiter) for line in f.readlines() ]
        d = dict( ("v%s_t%s" % (row[0], row[1]), row[2:]) for row in mdObj )
    except IOError:
        d = {}
    return d

def setupMaxDiffItemsI(d, vt, question):
    item_index = dict( (r.o.label.strip("item"), r.index) for r in question.rows )

    items = d[vt]

    for r in question.rows:
        if r.o.label.strip("item") not in items:
            r.disabled = True

    question.rows.order = [ item_index[i] for i in items ]

    print "*****STAFF ONLY*****"
    print "Version_Task: %s" % vt
    for i in range(len(items)):
        print "Item %s: %s" % (i+1,items[i])
    </exec>
    
    <exec when="init">\${1:Q24}_md = setupMaxDiffFile("\${2:design.dat}")</exec>
    
    <quota label="\${1:Q24}_quota" overquota="noqual" sheet="\${1:Q24}_Maxdiff"/> 
   
    <number label="\${1:Q24}_Version" size="3" optional="1" verify="range(1,\${3:10})" where="execute">
      <title>\${1:Q24} - MaxDiff Version</title>
      <exec>
print p.markers
for x in p.markers:
    if "/\${1:Q24}_Maxdiff/ver_" in x:
        \${1:Q24}_Version.val = int(x.split("_")[-1])
        break
      </exec>
    </number>
    <suspend/>
    
    <exec>p.startTime = timeSpent()</exec>
    
    <loop label="\${1:Q24}_md_loop" vars="task" randomizeChildren="0">
      <title>\${1:Q24} - MaxDiff Loop</title>
      <block label="\${1:Q24}_md_block" randomize="1">
        <radio label="\${1:Q24}_[loopvar: task]" adim="cols" grouping="cols" shuffle="rows" unique="1" ss:questionClassNames="\${1:Q24}_maxdiff">
          <title>Title update [MDcount]</title>
          <comment>Select one</comment>
          <exec>
setupMaxDiffItemsI( \${1:Q24}_md, "v%d_t%d" % (\${1:Q24}_Version.val, [loopvar: task]), \${1:Q24}_[loopvar: task])
p.MDcount = str(\${1:Q24}_md_loop_expanded.order.index([loopvar: task]-1)+1)
          </exec>
          <col label="best">Most Important</col>
          <col label="worst">Least Important</col>
    <row label="item1">Traditional</row>
    <row label="item2">Innovative</row>
    <row label="item3">Steady</row>
    <row label="item4">Fast-paced</row>
    <row label="item5">Technology-oriented</row>
    <row label="item6">Community-focused</row>
    <row label="item7">Industry leader</row>
    <row label="item8">Expert</row>
    <row label="item9">Consultative</row>
    <row label="item10">Customer-focused</row>
    <row label="item11">Revenue-focused</row>
    <row label="item12">Proactive</row>

<style name="question.header" mode="before">
            <![CDATA[
    <style type="text/css">
    .\${1:Q24}_maxdiff tr.maxdiff-header-legend {
        background-color: transparent;
        border-bottom: 2px solid #d9d9d9;
    }
    .\${1:Q24}_maxdiff tr.maxdiff-header-legend th.legend {
        background-color: transparent;
        border: none;
    }
    .\${1:Q24}_maxdiff tr.maxdiff-row td.element {
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid #d9d9d9;
        text-align: center;
    }
    .\${1:Q24}_maxdiff tr.maxdiff-row th.row-legend {
        background-color: transparent;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid #d9d9d9;
        text-align: center;
    }
    </style>
            ]]>
</style>
 
<style name="question.top-legend">
            <![CDATA[
\\@if ec.simpleList
    \$(legends)
\\@else
    <\$(tag) class="maxdiff-header-legend row row-col-legends row-col-legends-top \${"mobile-top-row-legend " if mobileOnly else ""}\${"GtTenColumns " if ec.colCount > 10 else ""}colCount-\$(colCount)">
        \${"%s%s" % (legends.split("</th>")[0],"</th>")}
       \$(left)
        \${"%s%s" % (legends.split("</th>")[1],"</th>")}
    </\$(tag)>
    \\@if not simple
  </tbody>
  <tbody>
    \\@endif
\\@endif
            ]]>
</style>
 
<style name="question.row">
            <![CDATA[
\\@if ec.simpleList
    \$(elements)
\\@else
    <\$(tag) class="maxdiff-row row row-elements \$(style) colCount-\$(colCount)">
        \${"%s%s" % (elements.split("</td>")[0],"</td>")}
        \$(left)
        \${"%s%s" % (elements.split("</td>")[1],"</td>")}
    </\$(tag)>
\\@endif
            ]]>
</style>
        </radio>
      </block>
      
      <looprow label="1">
        <loopvar name="task">1</loopvar>
      </looprow>
      
      <looprow label="2">
        <loopvar name="task">2</loopvar>
      </looprow>
      
      <looprow label="3">
        <loopvar name="task">3</loopvar>
      </looprow>
      
      <looprow label="4">
        <loopvar name="task">4</loopvar>
      </looprow> 
     
      <looprow label="5">
        <loopvar name="task">5</loopvar>
      </looprow>
      
      <looprow label="6">
        <loopvar name="task">6</loopvar>
      </looprow>
      
      <looprow label="7">
        <loopvar name="task">7</loopvar>
      </looprow>
      
      <looprow label="8">
        <loopvar name="task">8</loopvar>
      </looprow>
      
      <looprow label="9">
        <loopvar name="task">9</loopvar>
      </looprow>
      
      <looprow label="10">
        <loopvar name="task">10</loopvar>
      </looprow>
      
      <looprow label="11">
        <loopvar name="task">11</loopvar>
      </looprow>
      
      <looprow label="12">
        <loopvar name="task">12</loopvar>
      </looprow>
               
    </loop>
    
    <float label="\${1:Q24}_Timer" size="15" where="execute">
      <title>\${1:Q24} - MaxDiff Timer (Minutes)</title>
      <exec>\${1:Q24}_Timer.val = (timeSpent() - p.startTime) / 60.0</exec>
    </float>
    
    <note>MaxDiff Indices Template --End--</note>
    <suspend/>`;

let baseTemp = "<block label=\"baseBlock\" builder:title=\"BASE\">\n\t<suspend/>\n\t<logic label=\"lnClear1\" cleardata:allVariables=\"1\" cleardata:at=\"2025-10-31 00:00\" cleardata:fields=\"ID,url\" uses=\"cleardata.1\">\n\t\t<title>Schedule Clearing Data</title>\n\t</logic>\n\t<suspend/>\n\t\t<quota label=\"quoTotal\" overquota=\"noqual\" sheet=\"Total\"/>\n\t<suspend/>\n\t<html label=\"disclaimerIT\" where=\"survey\">Lo studio a cui Lei sta per partecipare&amp;nbsp;viene effettuato esclusivamente a fini statistici. Tuttavia, per esigenze tecniche, alcuni dei suoi&amp;nbsp;dati personali come il suo&amp;nbsp;identificativo univoco potrebbero essere soggetti a registrazione.<br/><br/>Continuando il questionario, Lei certifica&amp;nbsp;di accettare le condizioni.</html>\n\t<html label=\"disclaimerUK\" where=\"survey\">All information received in this survey is strictly confidential and will be dealt with in accordance with the Market Research Society Code of Conduct.<br/><br/>The study you are about to participate in is for statistical purposes only. Nevertheless, for technical purposes some of your personal data such as your project unique identifier may be registered<br/><br/>We may need to contact you again in connection to this survey only. The survey should take up to xxx minutes.<br/><br/>Please click Continue if you agree to the above terms.</html>\n\t<html label=\"disclaimerES\" where=\"survey\">El estudio en el que va a participar es exclusivamente para fines estadísticos. Sin embargo, para fines técnicos, algunos de sus datos personales, como su login ID, pueden registrarse.<br/><br/>Al continuar con el cuestionario, certifica que acepta las condiciones.</html>\n\t<html label=\"disclaimerFR\" where=\"survey\">L'étude à laquelle vous allez participer est réalisée exclusivement à des fins statistiques. Néanmoins, pour des besoins techniques certaines de vos données personnelles telles que votre identifiant unique peuvent faire l'objet d'un enregistrement.<br/><br/>En poursuivant le questionnaire, je certifie en accepter les conditions.</html>\n\t<html label=\"disclaimerDE\" where=\"survey\">Die Studie, an der Sie teilnehmen möchten, dient ausschließlich statistischen Zwecken. Aus technischen Gründen können jedoch einige Ihrer persönlichen Daten, wie z.B. Ihre IP-Adresse, gespeichert werden.<br/><br/>Indem Sie mit dem Fragebogen fortfahren, akzeptieren Sie diese Bedingungen.</html>\n\t<suspend/>\n</block>\n<suspend/>${0}";
let codepostaltemp = `<suspend/>
<block label="blockcodePostalFR" builder:title="blockcodePostalFR">
  <note>code for sst : 
CP: 01000-99999
CODGEO: 75106
CP2: 01000-99999
DEP: "01" "02" "03" "04" "05" "06" "07" "08" "09" "10" "11" "12" "13" "14" "15" "16" "17" "18" "19" "2A" "2B" "21" "22" "23" "24" "25" "26" "27" "28" "29" "30" "31" "32" "33" "34" "35" "36" "37" "38" "39" "40" "41" "42" "43" "44" "45" "46" "47" "48" "49" "50" "51" "52" "53" "54" "55" "56" "57" "58" "59" "60" "61" "62" "63" "64" "65" "66" "67" "68" "69" "70" "71" "72" "73" "74" "75" "76" "77" "78" "79" "80" "81" "82" "83" "84" "85" "86" "87" "88" "89" "90" "91" "92" "93" "94" "95"
TDUU: 0-8
TUU: 0-8
AGGLO: 0-4
REG: 1,2,3,4,6,11,24,27,28,32,44,52,53,75,76,84,93,94
RUDA9: 1-9
RUDA5: 1-5</note>
  <text 
   label="CP"
   keepWith="CODGEO,LIBGEO,CP2,DEP,REG2016,TDUU,TUU,AGGLO,REG,RUDA9,RUDA5"
   optional="0"
   randomize="0"
   size="50">
    <title>Merci d'indiquer le code postal de votre commune </title>
    <comment>Veuillez saisir votre code postal, puis sélectionner la commune dans la liste qui s'affiche</comment>
    <validate>
if (not (CODGEO.val)):
 error ("Veuillez fournir une réponse")
    </validate>

    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)" maxlength="5"  class="auto1" size="\$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}

  
<script type="text/javascript">
\$ (".self-tooltip").on({
  "click": function() {
    
    \$ (this).tooltip({ items: ".self-tooltip",placement:'auto' , content: \$ (this).next('.tooltip-content').html()});
    \$ (this).tooltip("open");
      
  }
});

\\\$input_idenseigne=\$ ('div.id_enseigne > input');
\\\$input_enseigne=   \$ ('div.enseigne > input');     
     
    
var getItems = function(term, callback) {
            loading = true;
            \$.ajax( {
                type: 'GET',
                url: "https://tools.bilendi.com/CategorySelection-Backend/index.php?source=zipcode_2024&searchcondition=begins&searchterm="+term,
                dataType: "json",
                data: {
                term: term
                },
                success: function( data ) {
                    loading = true;
                    if (data.length==0)
                    {
            \$ ("#empty-message").text("Code postal inexistant");
            \$ (this).focus();
            \$ (this).val('');
   
          \$ ('input.CODGEO').val('');
          \$ ('input.LIBGEO').val('');          
          \$ ('input.CP2').val('');
          \$ ('input.DPT').val('');
     	  \$ ('input.REG').val('');
      	  \$ ('input.TDUU').val('');
      	  \$ ('input.TUU').val('');
      	  \$ ('input.AGGLO').val('');
      	  \$ ('input.REG2010').val('');
      	  \$ ('input.UDA9').val('');
      	  \$ ('input.UDA5').val('');
                    
                    }
                    else{
                    
                    
                    
                      callback($.map(data, function ( item ) 
                      {
                        return {
                        label: item[1],
                        value: item[1],
                        LIBGEO: item[4],
                        CODEGEO: item[2],
                        CP: item[3],
                        DPT: item[5],
                        REG: item[6], 
                        TDUU: item[7],  
                        TUU: item[8], 
                        AGGLO: item[9], 
                        REG2010: item[10],  
                        UDA9: item[11], 
                        UDA5: item[12]
                        }
                        }));
                    
                   }
                    
                   
                }
                
                    
            });
        };
    
        var fillFields = function(item) {
    };
    
  


    \$ (".auto1").each(function(){
            
     \$ (this).on( "keypress", function() {
     var keyEvent = \$.Event("keydown");
     keyEvent.keyCode = \$.ui.keyCode.ENTER;
     \$ (this).trigger(keyEvent);
     
        
     if (\$ (this).val().length >= 5) {
       getItems(\$ (this).val(), function(items) {});
     }
    }).autocomplete({
 
    source: function(request, response) {
    
      getItems(request.term, response);
    },
    minLength: 4,
		maxRows: 38,
    search: function( event, ui ) {$ ('.spinner div').toggleClass('is-loading');    },
    select: function( event, ui)     {
      event.preventDefault();
          \$ ('input.ui-autocomplete-input').val(ui.item.label);   
          \$ ('input.CODGEO').val(ui.item.CODEGEO);
          \$ ('input.LIBGEO').val(ui.item.LIBGEO);
          \$ ('input.CP2').val(ui.item.CP);
          \$ ('input.DPT').val(ui.item.DPT);
      \$ ('input.REG').val(ui.item.REG);
      \$ ('input.TDUU').val(ui.item.TDUU);
      \$ ('input.TUU').val(ui.item.TUU);
      \$ ('input.AGGLO').val(ui.item.AGGLO);
      \$ ('input.REG2010').val(ui.item.REG2010);
      \$ ('input.UDA9').val(ui.item.UDA9);
      \$ ('input.UDA5').val(ui.item.UDA5);
          
          
          }
          
  });
  });


</script>
</style>
]]></style>
    <style name="question.after"><![CDATA[
<style type="text/css">
.tobehidden
{display:none}
.ui-menu-item {
    list-style-type: none;
}
   </style>
]]></style>
  </text>

  <text 
   label="CODGEO"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="CODGEO tobehidden">
    <title>Code INSEE</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="CODGEO" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="LIBGEO"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="LIBGEO tobehidden">
    <title>Libellé</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)" class="LIBGEO" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="CP2"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="CP2 tobehidden">
    <title>Code Postal</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="CP2" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="DEP"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="DPT tobehidden">
    <title>Departement</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="DPT" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="REG"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="REG tobehidden">
    <title>Region INSEE 2016</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="REG" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="TDUU"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="TDUU tobehidden">
    <title>Tranche détaillée d'unité urbaine 2017 </title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="TDUU" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="TUU"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="TUU tobehidden">
    <title>Tranche d'unité urbaine 2017</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="TUU" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="AGGLO"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="AGGLO tobehidden">
    <title>Catégorie d'agglomeration</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="AGGLO" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="REG2010"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="REG2010 tobehidden">
    <title>Code région</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="REG2010" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="RUDA9"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="UDA9 tobehidden">
    <title>UDA9</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="UDA9" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <text 
   label="RUDA5"
   keepWith="CP"
   optional="0"
   randomize="0"
   ss:questionClassNames="UDA5 tobehidden">
    <title>UDA5</title>
    <style name="el.text"><![CDATA[
<p id="empty-message" class="question-error"></p><br/><br/>
 \${row.styles.ss.preText or this.styles.ss.preText or ""}
  <input type="text" name="$(name)" id="$(name)" value="$(value)"  class="UDA5" size="$(size)" />
\${row.styles.ss.postText or this.styles.ss.postText or ""}
</style>
]]></style>
  </text>

  <suspend/>

  <radio 
   label="CC"
   where="execute,survey,report">
    <title>CC</title>
    <exec>
CC.val=int(AGGLO.val)
    </exec>

    <row label="r1">Commune rurale</row>
    <row label="r2">De 2.000 à moins de 20.000 hab.</row>
    <row label="r3">De 20.000 à moins de 100.000 hab.</row>
    <row label="r4">100.000 hab. et plus</row>
    <row label="r5">Agglomération parisienne</row>
  </radio>

  <radio 
   label="REG2016"
   randomize="0"
   values="order"
   where="execute,survey,report">
    <title>Recode région 2016</title>
    <exec>
REG2016.val=eval("REG2016.r"+str(int(REG.val))+".index")
    </exec>

    <row label="r1" value="1">Guadeloupe</row>
    <row label="r2" value="2">Martinique</row>
    <row label="r3" value="3">Guyane</row>
    <row label="r4" value="4">La Réunion</row>
    <row label="r6" value="6">Mayotte Mayotte</row>
    <row label="r11" value="11">Île-de-France</row>
    <row label="r24" value="24">Centre-Val de Loire</row>
    <row label="r27" value="27">Bourgogne-Franche-Comté</row>
    <row label="r28" value="28">Normandie</row>
    <row label="r32" value="32">Hauts-de-France</row>
    <row label="r44" value="44">Grand Est</row>
    <row label="r52" value="52">Pays de la Loire</row>
    <row label="r53" value="53">Bretagne</row>
    <row label="r75" value="75">Nouvelle-Aquitaine</row>
    <row label="r76" value="76">Occitanie</row>
    <row label="r84" value="84">Auvergne-Rhône-Alpes</row>
    <row label="r93" value="93">Provence-Alpes-Côte d'Azur</row>
    <row label="r94" value="94">Corse</row>
  </radio>

  <radio 
   label="DPT"
   randomize="0"
   where="execute,survey,report">
    <title>RECODE DEPARTEMENT</title>
    <exec>
DPT.val=eval("DPT.r"+DEP.val.lstrip('0')+".index")
    </exec>

    <row label="r1" value="1">Ain</row>
    <row label="r2" value="2">Aisne</row>
    <row label="r3" value="3">Allier</row>
    <row label="r4" value="4">Alpes-de-Haute-Provence</row>
    <row label="r5" value="5">Hautes-Alpes</row>
    <row label="r6" value="6">Alpes-Maritimes</row>
    <row label="r7" value="7">Ardèche</row>
    <row label="r8" value="8">Ardennes</row>
    <row label="r9" value="9">Ariège</row>
    <row label="r10" value="10">Aube</row>
    <row label="r11" value="11">Aude</row>
    <row label="r12" value="12">Aveyron</row>
    <row label="r13" value="13">Bouches-du-Rhône</row>
    <row label="r14" value="14">Calvados</row>
    <row label="r15" value="15">Cantal</row>
    <row label="r16" value="16">Charente</row>
    <row label="r17" value="17">Charente-Maritime</row>
    <row label="r18" value="18">Cher</row>
    <row label="r19" value="19">Corrèze</row>
    <row label="r2A" value="201">Corse-du-Sud</row>
    <row label="r2B" value="202">Haute-Corse</row>
    <row label="r21" value="21">Côte-d'Or</row>
    <row label="r22" value="22">Côtes d'Armor</row>
    <row label="r23" value="23">Creuse</row>
    <row label="r24" value="24">Dordogne</row>
    <row label="r25" value="25">Doubs</row>
    <row label="r26" value="26">Drôme</row>
    <row label="r27" value="27">Eure</row>
    <row label="r28" value="28">Eure-et-Loir</row>
    <row label="r29" value="29">Finistère</row>
    <row label="r30" value="30">Gard</row>
    <row label="r31" value="31">Haute-Garonne</row>
    <row label="r32" value="32">Gers</row>
    <row label="r33" value="33">Gironde</row>
    <row label="r34" value="34">Hérault</row>
    <row label="r35" value="35">Ille-et-Vilaine</row>
    <row label="r36" value="36">Indre</row>
    <row label="r37" value="37">Indre-et-Loire</row>
    <row label="r38" value="38">Isère</row>
    <row label="r39" value="39">Jura</row>
    <row label="r40" value="40">Landes</row>
    <row label="r41" value="41">Loir-et-Cher</row>
    <row label="r42" value="42">Loire</row>
    <row label="r43" value="43">Haute-Loire</row>
    <row label="r44" value="44">Loire-Atlantique</row>
    <row label="r45" value="45">Loiret</row>
    <row label="r46" value="46">Lot</row>
    <row label="r47" value="47">Lot-et-Garonne</row>
    <row label="r48" value="48">Lozère</row>
    <row label="r49" value="49">Maine-et-Loire</row>
    <row label="r50" value="50">Manche</row>
    <row label="r51" value="51">Marne</row>
    <row label="r52" value="52">Haute-Marne</row>
    <row label="r53" value="53">Mayenne</row>
    <row label="r54" value="54">Meurthe-et-Moselle</row>
    <row label="r55" value="55">Meuse</row>
    <row label="r56" value="56">Morbihan</row>
    <row label="r57" value="57">Moselle</row>
    <row label="r58" value="58">Nièvre</row>
    <row label="r59" value="59">Nord</row>
    <row label="r60" value="60">Oise</row>
    <row label="r61" value="61">Orne</row>
    <row label="r62" value="62">Pas-de-Calais</row>
    <row label="r63" value="63">Puy-de-Dôme</row>
    <row label="r64" value="64">Pyrénées-Atlantiques</row>
    <row label="r65" value="65">Hautes-Pyrénées</row>
    <row label="r66" value="66">Pyrénées-Orientales</row>
    <row label="r67" value="67">Bas-Rhin</row>
    <row label="r68" value="68">Haut-Rhin</row>
    <row label="r69" value="69">Rhône</row>
    <row label="r70" value="70">Haute-Saône</row>
    <row label="r71" value="71">Saône-et-Loire</row>
    <row label="r72" value="72">Sarthe</row>
    <row label="r73" value="73">Savoie</row>
    <row label="r74" value="74">Haute-Savoie</row>
    <row label="r75" value="75">Paris</row>
    <row label="r76" value="76">Seine-Maritime</row>
    <row label="r77" value="77">Seine-et-Marne</row>
    <row label="r78" value="78">Yvelines</row>
    <row label="r79" value="79">Deux-Sèvres</row>
    <row label="r80" value="80">Somme</row>
    <row label="r81" value="81">Tarn</row>
    <row label="r82" value="82">Tarn-et-Garonne</row>
    <row label="r83" value="83">Var</row>
    <row label="r84" value="84">Vaucluse</row>
    <row label="r85" value="85">Vendée</row>
    <row label="r86" value="86">Vienne</row>
    <row label="r87" value="87">Haute-Vienne</row>
    <row label="r88" value="88">Vosges</row>
    <row label="r89" value="89">Yonne</row>
    <row label="r90" value="90">Territoire de Belfort</row>
    <row label="r91" value="91">Essonne</row>
    <row label="r92" value="92">Hauts-de-Seine</row>
    <row label="r93" value="93">Seine-St-Denis</row>
    <row label="r94" value="94">Val-de-Marne</row>
    <row label="r95" value="95">Val-D'Oise</row>
    <row label="r971" value="971">Guadeloupe</row>
    <row label="r972" value="972">Martinique</row>
    <row label="r973" value="973">Guyane</row>
    <row label="r974" value="974">La Réunion</row>
    <row label="r976" value="976">Mayotte</row>
  </radio>

  <radio 
   label="UDA9"
   where="execute,survey,report">
    <title>uda9</title>
    <exec>
UDA9.val=eval("UDA9.r"+str(RUDA9.val)+".index")
    </exec>

    <row label="r1">Région Parisienne</row>
    <row label="r2">Bassin Parisien Ouest</row>
    <row label="r3">Ouest</row>
    <row label="r4">Nord</row>
    <row label="r5">Est</row>
    <row label="r6">Bassin Parisien Est</row>
    <row label="r7">Sud Ouest</row>
    <row label="r8">Sud Est</row>
    <row label="r9">Mediterranée</row>
    <row label="r10">DOM</row>
  </radio>

  <radio 
   label="UDA5"
   where="execute,survey,report">
    <title>UDA5</title>
    <exec>
UDA5.val=eval("UDA5.r"+str(RUDA5.val)+".index")
    </exec>

    <row label="r1">Région Parisienne</row>
    <row label="r2">Ouest</row>
    <row label="r3">Nord Est</row>
    <row label="r4">Sud Ouest</row>
    <row label="r5">Sud Est</row>
    <row label="r6">DOM</row>
  </radio>

  <suspend/>

  <term label="teDOM" cond="(REG2016.r1 or REG2016.r2 or REG2016.r3 or REG2016.r4 or REG2016.r6)">TERM DOM</term>

  <suspend/>
</block>

<suspend/>`;

let codepostalbva = `

  <exec>
if (REG2016.r11):
 NEW_UDA5.val=0

if (REG2016.r24 or REG2016.r28 or REG2016.r52 or REG2016.r53):
 NEW_UDA5.val=1

if (REG2016.r27 or REG2016.r32 or REG2016.r44):
 NEW_UDA5.val=2

if (REG2016.r75 or REG2016.r76):
 NEW_UDA5.val=3

if (REG2016.r84 or REG2016.r93 or REG2016.r94):
 NEW_UDA5.val=4
  </exec>

  <radio 
   label="NEW_UDA5"
   optional="1"
   where="execute,survey,report">
    <title>NEW_UDA5</title>
    <row label="r1">Région Parisienne</row>
    <row label="r2">Ouest</row>
    <row label="r3">Nord Est</row>
    <row label="r4">Sud Ouest</row>
    <row label="r5">Sud Est</row>
  </radio>

  <suspend/>`;



let tempEmoji = `<exec when="init">
def removeEmojis(txt):
  isEmoji = ['\\\\xF0\\\\x9F\\\\xA4\\\\xA3','\\\\xF0\\\\x9F\\\\x98\\\\x81','\\\\xF0\\\\x9F\\\\x98\\\\x82','\\\\xF0\\\\x9F\\\\x98\\\\x83','\\\\xF0\\\\x9F\\\\x98\\\\x84','\\\\xF0\\\\x9F\\\\x98\\\\x85','\\\\xF0\\\\x9F\\\\x98\\\\x86','\\\\xF0\\\\x9F\\\\x98\\\\x89','\\\\xF0\\\\x9F\\\\x98\\\\x8A','\\\\xF0\\\\x9F\\\\x98\\\\x8B','\\\\xF0\\\\x9F\\\\x98\\\\x8C','\\\\xF0\\\\x9F\\\\x98\\\\x8D','\\\\xF0\\\\x9F\\\\x98\\\\x8F','\\\\xF0\\\\x9F\\\\x98\\\\x92','\\\\xF0\\\\x9F\\\\x98\\\\x93','\\\\xF0\\\\x9F\\\\x98\\\\x94','\\\\xF0\\\\x9F\\\\x98\\\\x96','\\\\xF0\\\\x9F\\\\x98\\\\x98','\\\\xF0\\\\x9F\\\\x98\\\\x9A','\\\\xF0\\\\x9F\\\\x98\\\\x9C','\\\\xF0\\\\x9F\\\\x98\\\\x9D','\\\\xF0\\\\x9F\\\\x98\\\\x9E','\\\\xF0\\\\x9F\\\\x98\\\\xA0','\\\\xF0\\\\x9F\\\\x98\\\\xA1','\\\\xF0\\\\x9F\\\\x98\\\\xA2','\\\\xF0\\\\x9F\\\\x98\\\\xA3','\\\\xF0\\\\x9F\\\\x98\\\\xA4','\\\\xF0\\\\x9F\\\\x98\\\\xA5','\\\\xF0\\\\x9F\\\\x98\\\\xA8','\\\\xF0\\\\x9F\\\\x98\\\\xA9','\\\\xF0\\\\x9F\\\\x98\\\\xAA','\\\\xF0\\\\x9F\\\\x98\\\\xAB','\\\\xF0\\\\x9F\\\\x98\\\\xAD','\\\\xF0\\\\x9F\\\\x98\\\\xB0','\\\\xF0\\\\x9F\\\\x98\\\\xB1','\\\\xF0\\\\x9F\\\\x98\\\\xB2','\\\\xF0\\\\x9F\\\\x98\\\\xB3','\\\\xF0\\\\x9F\\\\x98\\\\xB5','\\\\xF0\\\\x9F\\\\x98\\\\xB7','\\\\xF0\\\\x9F\\\\x98\\\\xB8','\\\\xF0\\\\x9F\\\\x98\\\\xB9','\\\\xF0\\\\x9F\\\\x98\\\\xBA','\\\\xF0\\\\x9F\\\\x98\\\\xBB','\\\\xF0\\\\x9F\\\\x98\\\\xBC','\\\\xF0\\\\x9F\\\\x98\\\\xBD','\\\\xF0\\\\x9F\\\\x98\\\\xBE','\\\\xF0\\\\x9F\\\\x98\\\\xBF','\\\\xF0\\\\x9F\\\\x99\\\\x80','\\\\xF0\\\\x9F\\\\x99\\\\x85','\\\\xF0\\\\x9F\\\\x99\\\\x86','\\\\xF0\\\\x9F\\\\x99\\\\x87','\\\\xF0\\\\x9F\\\\x99\\\\x88','\\\\xF0\\\\x9F\\\\x99\\\\x89','\\\\xF0\\\\x9F\\\\x99\\\\x8A','\\\\xF0\\\\x9F\\\\x99\\\\x8B','\\\\xF0\\\\x9F\\\\x99\\\\x8C','\\\\xF0\\\\x9F\\\\x99\\\\x8D','\\\\xF0\\\\x9F\\\\x99\\\\x8E','\\\\xF0\\\\x9F\\\\x99\\\\x8F','\\\\xE2\\\\x9C\\\\x82','\\\\xE2\\\\x9C\\\\x85','\\\\xE2\\\\x9C\\\\x88','\\\\xE2\\\\x9C\\\\x89','\\\\xE2\\\\x9C\\\\x8A','\\\\xE2\\\\x9C\\\\x8B','\\\\xE2\\\\x9C\\\\x8C','\\\\xE2\\\\x9C\\\\x8F','\\\\xE2\\\\x9C\\\\x92','\\\\xE2\\\\x9C\\\\x94','\\\\xE2\\\\x9C\\\\x96','\\\\xE2\\\\x9C\\\\xA8','\\\\xE2\\\\x9C\\\\xB3','\\\\xE2\\\\x9C\\\\xB4','\\\\xE2\\\\x9D\\\\x84','\\\\xE2\\\\x9D\\\\x87','\\\\xE2\\\\x9D\\\\x8C','\\\\xE2\\\\x9D\\\\x8E','\\\\xE2\\\\x9D\\\\x93','\\\\xE2\\\\x9D\\\\x94','\\\\xE2\\\\x9D\\\\x95','\\\\xE2\\\\x9D\\\\x97','\\\\xE2\\\\x9D\\\\xA4','\\\\xE2\\\\x9E\\\\x95','\\\\xE2\\\\x9E\\\\x96','\\\\xE2\\\\x9E\\\\x97','\\\\xE2\\\\x9E\\\\xA1','\\\\xE2\\\\x9E\\\\xB0','\\\\xF0\\\\x9F\\\\x9A\\\\x80','\\\\xF0\\\\x9F\\\\x9A\\\\x83','\\\\xF0\\\\x9F\\\\x9A\\\\x84','\\\\xF0\\\\x9F\\\\x9A\\\\x85','\\\\xF0\\\\x9F\\\\x9A\\\\x87','\\\\xF0\\\\x9F\\\\x9A\\\\x89','\\\\xF0\\\\x9F\\\\x9A\\\\x8C','\\\\xF0\\\\x9F\\\\x9A\\\\x8F','\\\\xF0\\\\x9F\\\\x9A\\\\x91','\\\\xF0\\\\x9F\\\\x9A\\\\x92','\\\\xF0\\\\x9F\\\\x9A\\\\x93','\\\\xF0\\\\x9F\\\\x9A\\\\x95','\\\\xF0\\\\x9F\\\\x9A\\\\x97','\\\\xF0\\\\x9F\\\\x9A\\\\x99','\\\\xF0\\\\x9F\\\\x9A\\\\x9A','\\\\xF0\\\\x9F\\\\x9A\\\\xA2','\\\\xF0\\\\x9F\\\\x9A\\\\xA4','\\\\xF0\\\\x9F\\\\x9A\\\\xA5','\\\\xF0\\\\x9F\\\\x9A\\\\xA7','\\\\xF0\\\\x9F\\\\x9A\\\\xA8','\\\\xF0\\\\x9F\\\\x9A\\\\xA9','\\\\xF0\\\\x9F\\\\x9A\\\\xAA','\\\\xF0\\\\x9F\\\\x9A\\\\xAB','\\\\xF0\\\\x9F\\\\x9A\\\\xAC','\\\\xF0\\\\x9F\\\\x9A\\\\xAD','\\\\xF0\\\\x9F\\\\x9A\\\\xB2','\\\\xF0\\\\x9F\\\\x9A\\\\xB6','\\\\xF0\\\\x9F\\\\x9A\\\\xB9','\\\\xF0\\\\x9F\\\\x9A\\\\xBA','\\\\xF0\\\\x9F\\\\x9A\\\\xBB','\\\\xF0\\\\x9F\\\\x9A\\\\xBC','\\\\xF0\\\\x9F\\\\x9A\\\\xBD','\\\\xF0\\\\x9F\\\\x9A\\\\xBE','\\\\xF0\\\\x9F\\\\x9B\\\\x80','\\\\xE2\\\\x93\\\\x82','\\\\xF0\\\\x9F\\\\x85\\\\xB0','\\\\xF0\\\\x9F\\\\x85\\\\xB1','\\\\xF0\\\\x9F\\\\x85\\\\xBE','\\\\xF0\\\\x9F\\\\x85\\\\xBF','\\\\xF0\\\\x9F\\\\x86\\\\x8E','\\\\xF0\\\\x9F\\\\x86\\\\x91','\\\\xF0\\\\x9F\\\\x86\\\\x92','\\\\xF0\\\\x9F\\\\x86\\\\x93','\\\\xF0\\\\x9F\\\\x86\\\\x94','\\\\xF0\\\\x9F\\\\x86\\\\x95','\\\\xF0\\\\x9F\\\\x86\\\\x96','\\\\xF0\\\\x9F\\\\x86\\\\x97','\\\\xF0\\\\x9F\\\\x86\\\\x98','\\\\xF0\\\\x9F\\\\x86\\\\x99','\\\\xF0\\\\x9F\\\\x86\\\\x9A','\\\\xF0\\\\x9F\\\\x87\\\\xA9\\\\xF0\\\\x9F\\\\x87\\\\xAA','\\\\xF0\\\\x9F\\\\x87\\\\xAC\\\\xF0\\\\x9F\\\\x87\\\\xA7','\\\\xF0\\\\x9F\\\\x87\\\\xA8\\\\xF0\\\\x9F\\\\x87\\\\xB3','\\\\xF0\\\\x9F\\\\x87\\\\xAF\\\\xF0\\\\x9F\\\\x87\\\\xB5','\\\\xF0\\\\x9F\\\\x87\\\\xAB\\\\xF0\\\\x9F\\\\x87\\\\xB7','\\\\xF0\\\\x9F\\\\x87\\\\xB0\\\\xF0\\\\x9F\\\\x87\\\\xB7','\\\\xF0\\\\x9F\\\\x87\\\\xAA\\\\xF0\\\\x9F\\\\x87\\\\xB8','\\\\xF0\\\\x9F\\\\x87\\\\xAE\\\\xF0\\\\x9F\\\\x87\\\\xB9','\\\\xF0\\\\x9F\\\\x87\\\\xB7\\\\xF0\\\\x9F\\\\x87\\\\xBA','\\\\xF0\\\\x9F\\\\x87\\\\xBA\\\\xF0\\\\x9F\\\\x87\\\\xB8','\\\\xF0\\\\x9F\\\\x88\\\\x81','\\\\xF0\\\\x9F\\\\x88\\\\x82','\\\\xF0\\\\x9F\\\\x88\\\\x9A','\\\\xF0\\\\x9F\\\\x88\\\\xAF','\\\\xF0\\\\x9F\\\\x88\\\\xB2','\\\\xF0\\\\x9F\\\\x88\\\\xB3','\\\\xF0\\\\x9F\\\\x88\\\\xB4','\\\\xF0\\\\x9F\\\\x88\\\\xB5','\\\\xF0\\\\x9F\\\\x88\\\\xB6','\\\\xF0\\\\x9F\\\\x88\\\\xB7','\\\\xF0\\\\x9F\\\\x88\\\\xB8','\\\\xF0\\\\x9F\\\\x88\\\\xB9','\\\\xF0\\\\x9F\\\\x88\\\\xBA','\\\\xF0\\\\x9F\\\\x89\\\\x90','\\\\xF0\\\\x9F\\\\x89\\\\x91','\\\\xC2\\\\xA9','\\\\xC2\\\\xAE','\\\\xE2\\\\x80\\\\xBC','\\\\xE2\\\\x81\\\\x89','\\\\x23\\\\xE2\\\\x83\\\\xA3','\\\\x38\\\\xE2\\\\x83\\\\xA3','\\\\x39\\\\xE2\\\\x83\\\\xA3','\\\\x37\\\\xE2\\\\x83\\\\xA3','\\\\x30\\\\xE2\\\\x83\\\\xA3','\\\\x36\\\\xE2\\\\x83\\\\xA3','\\\\x35\\\\xE2\\\\x83\\\\xA3','\\\\x34\\\\xE2\\\\x83\\\\xA3','\\\\x33\\\\xE2\\\\x83\\\\xA3','\\\\x32\\\\xE2\\\\x83\\\\xA3','\\\\x31\\\\xE2\\\\x83\\\\xA3','\\\\xE2\\\\x84\\\\xA2','\\\\xE2\\\\x84\\\\xB9','\\\\xE2\\\\x86\\\\x94','\\\\xE2\\\\x86\\\\x95','\\\\xE2\\\\x86\\\\x96','\\\\xE2\\\\x86\\\\x97','\\\\xE2\\\\x86\\\\x98','\\\\xE2\\\\x86\\\\x99','\\\\xE2\\\\x86\\\\xA9','\\\\xE2\\\\x86\\\\xAA','\\\\xE2\\\\x8C\\\\x9A','\\\\xE2\\\\x8C\\\\x9B','\\\\xE2\\\\x8F\\\\xA9','\\\\xE2\\\\x8F\\\\xAA','\\\\xE2\\\\x8F\\\\xAB','\\\\xE2\\\\x8F\\\\xAC','\\\\xE2\\\\x8F\\\\xB0','\\\\xE2\\\\x8F\\\\xB3','\\\\xE2\\\\x96\\\\xAA','\\\\xE2\\\\x96\\\\xAB','\\\\xE2\\\\x96\\\\xB6','\\\\xE2\\\\x97\\\\x80','\\\\xE2\\\\x97\\\\xBB','\\\\xE2\\\\x97\\\\xBC','\\\\xE2\\\\x97\\\\xBD','\\\\xE2\\\\x97\\\\xBE','\\\\xE2\\\\x98\\\\x80','\\\\xE2\\\\x98\\\\x81','\\\\xE2\\\\x98\\\\x8E','\\\\xE2\\\\x98\\\\x91','\\\\xE2\\\\x98\\\\x94','\\\\xE2\\\\x98\\\\x95','\\\\xE2\\\\x98\\\\x9D','\\\\xE2\\\\x98\\\\xBA','\\\\xE2\\\\x99\\\\x88','\\\\xE2\\\\x99\\\\x89','\\\\xE2\\\\x99\\\\x8A','\\\\xE2\\\\x99\\\\x8B','\\\\xE2\\\\x99\\\\x8C','\\\\xE2\\\\x99\\\\x8D','\\\\xE2\\\\x99\\\\x8E','\\\\xE2\\\\x99\\\\x8F','\\\\xE2\\\\x99\\\\x90','\\\\xE2\\\\x99\\\\x91','\\\\xE2\\\\x99\\\\x92','\\\\xE2\\\\x99\\\\x93','\\\\xE2\\\\x99\\\\xA0','\\\\xE2\\\\x99\\\\xA3','\\\\xE2\\\\x99\\\\xA5','\\\\xE2\\\\x99\\\\xA6','\\\\xE2\\\\x99\\\\xA8','\\\\xE2\\\\x99\\\\xBB','\\\\xE2\\\\x99\\\\xBF','\\\\xE2\\\\x9A\\\\x93','\\\\xE2\\\\x9A\\\\xA0','\\\\xE2\\\\x9A\\\\xA1','\\\\xE2\\\\x9A\\\\xAA','\\\\xE2\\\\x9A\\\\xAB','\\\\xE2\\\\x9A\\\\xBD','\\\\xE2\\\\x9A\\\\xBE','\\\\xE2\\\\x9B\\\\x84','\\\\xE2\\\\x9B\\\\x85','\\\\xE2\\\\x9B\\\\x8E','\\\\xE2\\\\x9B\\\\x94','\\\\xE2\\\\x9B\\\\xAA','\\\\xE2\\\\x9B\\\\xB2','\\\\xE2\\\\x9B\\\\xB3','\\\\xE2\\\\x9B\\\\xB5','\\\\xE2\\\\x9B\\\\xBA','\\\\xE2\\\\x9B\\\\xBD','\\\\xE2\\\\xA4\\\\xB4','\\\\xE2\\\\xA4\\\\xB5','\\\\xE2\\\\xAC\\\\x85','\\\\xE2\\\\xAC\\\\x86','\\\\xE2\\\\xAC\\\\x87','\\\\xE2\\\\xAC\\\\x9B','\\\\xE2\\\\xAC\\\\x9C','\\\\xE2\\\\xAD\\\\x90','\\\\xE2\\\\xAD\\\\x95','\\\\xE3\\\\x80\\\\xB0','\\\\xE3\\\\x80\\\\xBD','\\\\xE3\\\\x8A\\\\x97','\\\\xE3\\\\x8A\\\\x99','\\\\xF0\\\\x9F\\\\x80\\\\x84','\\\\xF0\\\\x9F\\\\x83\\\\x8F','\\\\xF0\\\\x9F\\\\x8C\\\\x80','\\\\xF0\\\\x9F\\\\x8C\\\\x81','\\\\xF0\\\\x9F\\\\x8C\\\\x82','\\\\xF0\\\\x9F\\\\x8C\\\\x83','\\\\xF0\\\\x9F\\\\x8C\\\\x84','\\\\xF0\\\\x9F\\\\x8C\\\\x85','\\\\xF0\\\\x9F\\\\x8C\\\\x86','\\\\xF0\\\\x9F\\\\x8C\\\\x87','\\\\xF0\\\\x9F\\\\x8C\\\\x88','\\\\xF0\\\\x9F\\\\x8C\\\\x89','\\\\xF0\\\\x9F\\\\x8C\\\\x8A','\\\\xF0\\\\x9F\\\\x8C\\\\x8B','\\\\xF0\\\\x9F\\\\x8C\\\\x8C','\\\\xF0\\\\x9F\\\\x8C\\\\x8F','\\\\xF0\\\\x9F\\\\x8C\\\\x91','\\\\xF0\\\\x9F\\\\x8C\\\\x93','\\\\xF0\\\\x9F\\\\x8C\\\\x94','\\\\xF0\\\\x9F\\\\x8C\\\\x95','\\\\xF0\\\\x9F\\\\x8C\\\\x99','\\\\xF0\\\\x9F\\\\x8C\\\\x9B','\\\\xF0\\\\x9F\\\\x8C\\\\x9F','\\\\xF0\\\\x9F\\\\x8C\\\\xA0','\\\\xF0\\\\x9F\\\\x8C\\\\xB0','\\\\xF0\\\\x9F\\\\x8C\\\\xB1','\\\\xF0\\\\x9F\\\\x8C\\\\xB4','\\\\xF0\\\\x9F\\\\x8C\\\\xB5','\\\\xF0\\\\x9F\\\\x8C\\\\xB7','\\\\xF0\\\\x9F\\\\x8C\\\\xB8','\\\\xF0\\\\x9F\\\\x8C\\\\xB9','\\\\xF0\\\\x9F\\\\x8C\\\\xBA','\\\\xF0\\\\x9F\\\\x8C\\\\xBB','\\\\xF0\\\\x9F\\\\x8C\\\\xBC','\\\\xF0\\\\x9F\\\\x8C\\\\xBD','\\\\xF0\\\\x9F\\\\x8C\\\\xBE','\\\\xF0\\\\x9F\\\\x8C\\\\xBF','\\\\xF0\\\\x9F\\\\x8D\\\\x80','\\\\xF0\\\\x9F\\\\x8D\\\\x81','\\\\xF0\\\\x9F\\\\x8D\\\\x82','\\\\xF0\\\\x9F\\\\x8D\\\\x83','\\\\xF0\\\\x9F\\\\x8D\\\\x84','\\\\xF0\\\\x9F\\\\x8D\\\\x85','\\\\xF0\\\\x9F\\\\x8D\\\\x86','\\\\xF0\\\\x9F\\\\x8D\\\\x87','\\\\xF0\\\\x9F\\\\x8D\\\\x88','\\\\xF0\\\\x9F\\\\x8D\\\\x89','\\\\xF0\\\\x9F\\\\x8D\\\\x8A','\\\\xF0\\\\x9F\\\\x8D\\\\x8C','\\\\xF0\\\\x9F\\\\x8D\\\\x8D','\\\\xF0\\\\x9F\\\\x8D\\\\x8E','\\\\xF0\\\\x9F\\\\x8D\\\\x8F','\\\\xF0\\\\x9F\\\\x8D\\\\x91','\\\\xF0\\\\x9F\\\\x8D\\\\x92','\\\\xF0\\\\x9F\\\\x8D\\\\x93','\\\\xF0\\\\x9F\\\\x8D\\\\x94','\\\\xF0\\\\x9F\\\\x8D\\\\x95','\\\\xF0\\\\x9F\\\\x8D\\\\x96','\\\\xF0\\\\x9F\\\\x8D\\\\x97','\\\\xF0\\\\x9F\\\\x8D\\\\x98','\\\\xF0\\\\x9F\\\\x8D\\\\x99','\\\\xF0\\\\x9F\\\\x8D\\\\x9A','\\\\xF0\\\\x9F\\\\x8D\\\\x9B','\\\\xF0\\\\x9F\\\\x8D\\\\x9C','\\\\xF0\\\\x9F\\\\x8D\\\\x9D','\\\\xF0\\\\x9F\\\\x8D\\\\x9E','\\\\xF0\\\\x9F\\\\x8D\\\\x9F','\\\\xF0\\\\x9F\\\\x8D\\\\xA0','\\\\xF0\\\\x9F\\\\x8D\\\\xA1','\\\\xF0\\\\x9F\\\\x8D\\\\xA2','\\\\xF0\\\\x9F\\\\x8D\\\\xA3','\\\\xF0\\\\x9F\\\\x8D\\\\xA4','\\\\xF0\\\\x9F\\\\x8D\\\\xA5','\\\\xF0\\\\x9F\\\\x8D\\\\xA6','\\\\xF0\\\\x9F\\\\x8D\\\\xA7','\\\\xF0\\\\x9F\\\\x8D\\\\xA8','\\\\xF0\\\\x9F\\\\x8D\\\\xA9','\\\\xF0\\\\x9F\\\\x8D\\\\xAA','\\\\xF0\\\\x9F\\\\x8D\\\\xAB','\\\\xF0\\\\x9F\\\\x8D\\\\xAC','\\\\xF0\\\\x9F\\\\x8D\\\\xAD','\\\\xF0\\\\x9F\\\\x8D\\\\xAE','\\\\xF0\\\\x9F\\\\x8D\\\\xAF','\\\\xF0\\\\x9F\\\\x8D\\\\xB0','\\\\xF0\\\\x9F\\\\x8D\\\\xB1','\\\\xF0\\\\x9F\\\\x8D\\\\xB2','\\\\xF0\\\\x9F\\\\x8D\\\\xB3','\\\\xF0\\\\x9F\\\\x8D\\\\xB4','\\\\xF0\\\\x9F\\\\x8D\\\\xB5','\\\\xF0\\\\x9F\\\\x8D\\\\xB6','\\\\xF0\\\\x9F\\\\x8D\\\\xB7','\\\\xF0\\\\x9F\\\\x8D\\\\xB8','\\\\xF0\\\\x9F\\\\x8D\\\\xB9','\\\\xF0\\\\x9F\\\\x8D\\\\xBA','\\\\xF0\\\\x9F\\\\x8D\\\\xBB','\\\\xF0\\\\x9F\\\\x8E\\\\x80','\\\\xF0\\\\x9F\\\\x8E\\\\x81','\\\\xF0\\\\x9F\\\\x8E\\\\x82','\\\\xF0\\\\x9F\\\\x8E\\\\x83','\\\\xF0\\\\x9F\\\\x8E\\\\x84','\\\\xF0\\\\x9F\\\\x8E\\\\x85','\\\\xF0\\\\x9F\\\\x8E\\\\x86','\\\\xF0\\\\x9F\\\\x8E\\\\x87','\\\\xF0\\\\x9F\\\\x8E\\\\x88','\\\\xF0\\\\x9F\\\\x8E\\\\x89','\\\\xF0\\\\x9F\\\\x8E\\\\x8A','\\\\xF0\\\\x9F\\\\x8E\\\\x8B','\\\\xF0\\\\x9F\\\\x8E\\\\x8C','\\\\xF0\\\\x9F\\\\x8E\\\\x8D','\\\\xF0\\\\x9F\\\\x8E\\\\x8E','\\\\xF0\\\\x9F\\\\x8E\\\\x8F','\\\\xF0\\\\x9F\\\\x8E\\\\x90','\\\\xF0\\\\x9F\\\\x8E\\\\x91','\\\\xF0\\\\x9F\\\\x8E\\\\x92','\\\\xF0\\\\x9F\\\\x8E\\\\x93','\\\\xF0\\\\x9F\\\\x8E\\\\xA0','\\\\xF0\\\\x9F\\\\x8E\\\\xA1','\\\\xF0\\\\x9F\\\\x8E\\\\xA2','\\\\xF0\\\\x9F\\\\x8E\\\\xA3','\\\\xF0\\\\x9F\\\\x8E\\\\xA4','\\\\xF0\\\\x9F\\\\x8E\\\\xA5','\\\\xF0\\\\x9F\\\\x8E\\\\xA6','\\\\xF0\\\\x9F\\\\x8E\\\\xA7','\\\\xF0\\\\x9F\\\\x8E\\\\xA8','\\\\xF0\\\\x9F\\\\x8E\\\\xA9','\\\\xF0\\\\x9F\\\\x8E\\\\xAA','\\\\xF0\\\\x9F\\\\x8E\\\\xAB','\\\\xF0\\\\x9F\\\\x8E\\\\xAC','\\\\xF0\\\\x9F\\\\x8E\\\\xAD','\\\\xF0\\\\x9F\\\\x8E\\\\xAE','\\\\xF0\\\\x9F\\\\x8E\\\\xAF','\\\\xF0\\\\x9F\\\\x8E\\\\xB0','\\\\xF0\\\\x9F\\\\x8E\\\\xB1','\\\\xF0\\\\x9F\\\\x8E\\\\xB2','\\\\xF0\\\\x9F\\\\x8E\\\\xB3','\\\\xF0\\\\x9F\\\\x8E\\\\xB4','\\\\xF0\\\\x9F\\\\x8E\\\\xB5','\\\\xF0\\\\x9F\\\\x8E\\\\xB6','\\\\xF0\\\\x9F\\\\x8E\\\\xB7','\\\\xF0\\\\x9F\\\\x8E\\\\xB8','\\\\xF0\\\\x9F\\\\x8E\\\\xB9','\\\\xF0\\\\x9F\\\\x8E\\\\xBA','\\\\xF0\\\\x9F\\\\x8E\\\\xBB','\\\\xF0\\\\x9F\\\\x8E\\\\xBC','\\\\xF0\\\\x9F\\\\x8E\\\\xBD','\\\\xF0\\\\x9F\\\\x8E\\\\xBE','\\\\xF0\\\\x9F\\\\x8E\\\\xBF','\\\\xF0\\\\x9F\\\\x8F\\\\x80','\\\\xF0\\\\x9F\\\\x8F\\\\x81','\\\\xF0\\\\x9F\\\\x8F\\\\x82','\\\\xF0\\\\x9F\\\\x8F\\\\x83','\\\\xF0\\\\x9F\\\\x8F\\\\x84','\\\\xF0\\\\x9F\\\\x8F\\\\x86','\\\\xF0\\\\x9F\\\\x8F\\\\x88','\\\\xF0\\\\x9F\\\\x8F\\\\x8A','\\\\xF0\\\\x9F\\\\x8F\\\\xA0','\\\\xF0\\\\x9F\\\\x8F\\\\xA1','\\\\xF0\\\\x9F\\\\x8F\\\\xA2','\\\\xF0\\\\x9F\\\\x8F\\\\xA3','\\\\xF0\\\\x9F\\\\x8F\\\\xA5','\\\\xF0\\\\x9F\\\\x8F\\\\xA6','\\\\xF0\\\\x9F\\\\x8F\\\\xA7','\\\\xF0\\\\x9F\\\\x8F\\\\xA8','\\\\xF0\\\\x9F\\\\x8F\\\\xA9','\\\\xF0\\\\x9F\\\\x8F\\\\xAA','\\\\xF0\\\\x9F\\\\x8F\\\\xAB','\\\\xF0\\\\x9F\\\\x8F\\\\xAC','\\\\xF0\\\\x9F\\\\x8F\\\\xAD','\\\\xF0\\\\x9F\\\\x8F\\\\xAE','\\\\xF0\\\\x9F\\\\x8F\\\\xAF','\\\\xF0\\\\x9F\\\\x8F\\\\xB0','\\\\xF0\\\\x9F\\\\x90\\\\x8C','\\\\xF0\\\\x9F\\\\x90\\\\x8D','\\\\xF0\\\\x9F\\\\x90\\\\x8E','\\\\xF0\\\\x9F\\\\x90\\\\x91','\\\\xF0\\\\x9F\\\\x90\\\\x92','\\\\xF0\\\\x9F\\\\x90\\\\x94','\\\\xF0\\\\x9F\\\\x90\\\\x97','\\\\xF0\\\\x9F\\\\x90\\\\x98','\\\\xF0\\\\x9F\\\\x90\\\\x99','\\\\xF0\\\\x9F\\\\x90\\\\x9A','\\\\xF0\\\\x9F\\\\x90\\\\x9B','\\\\xF0\\\\x9F\\\\x90\\\\x9C','\\\\xF0\\\\x9F\\\\x90\\\\x9D','\\\\xF0\\\\x9F\\\\x90\\\\x9E','\\\\xF0\\\\x9F\\\\x90\\\\x9F','\\\\xF0\\\\x9F\\\\x90\\\\xA0','\\\\xF0\\\\x9F\\\\x90\\\\xA1','\\\\xF0\\\\x9F\\\\x90\\\\xA2','\\\\xF0\\\\x9F\\\\x90\\\\xA3','\\\\xF0\\\\x9F\\\\x90\\\\xA4','\\\\xF0\\\\x9F\\\\x90\\\\xA5','\\\\xF0\\\\x9F\\\\x90\\\\xA6','\\\\xF0\\\\x9F\\\\x90\\\\xA7','\\\\xF0\\\\x9F\\\\x90\\\\xA8','\\\\xF0\\\\x9F\\\\x90\\\\xA9','\\\\xF0\\\\x9F\\\\x90\\\\xAB','\\\\xF0\\\\x9F\\\\x90\\\\xAC','\\\\xF0\\\\x9F\\\\x90\\\\xAD','\\\\xF0\\\\x9F\\\\x90\\\\xAE','\\\\xF0\\\\x9F\\\\x90\\\\xAF','\\\\xF0\\\\x9F\\\\x90\\\\xB0','\\\\xF0\\\\x9F\\\\x90\\\\xB1','\\\\xF0\\\\x9F\\\\x90\\\\xB2','\\\\xF0\\\\x9F\\\\x90\\\\xB3','\\\\xF0\\\\x9F\\\\x90\\\\xB4','\\\\xF0\\\\x9F\\\\x90\\\\xB5','\\\\xF0\\\\x9F\\\\x90\\\\xB6','\\\\xF0\\\\x9F\\\\x90\\\\xB7','\\\\xF0\\\\x9F\\\\x90\\\\xB8','\\\\xF0\\\\x9F\\\\x90\\\\xB9','\\\\xF0\\\\x9F\\\\x90\\\\xBA','\\\\xF0\\\\x9F\\\\x90\\\\xBB','\\\\xF0\\\\x9F\\\\x90\\\\xBC','\\\\xF0\\\\x9F\\\\x90\\\\xBD','\\\\xF0\\\\x9F\\\\x90\\\\xBE','\\\\xF0\\\\x9F\\\\x91\\\\x80','\\\\xF0\\\\x9F\\\\x91\\\\x82','\\\\xF0\\\\x9F\\\\x91\\\\x83','\\\\xF0\\\\x9F\\\\x91\\\\x84','\\\\xF0\\\\x9F\\\\x91\\\\x85','\\\\xF0\\\\x9F\\\\x91\\\\x86','\\\\xF0\\\\x9F\\\\x91\\\\x87','\\\\xF0\\\\x9F\\\\x91\\\\x88','\\\\xF0\\\\x9F\\\\x91\\\\x89','\\\\xF0\\\\x9F\\\\x91\\\\x8A','\\\\xF0\\\\x9F\\\\x91\\\\x8B','\\\\xF0\\\\x9F\\\\x91\\\\x8C','\\\\xF0\\\\x9F\\\\x91\\\\x8D','\\\\xF0\\\\x9F\\\\x91\\\\x8E','\\\\xF0\\\\x9F\\\\x91\\\\x8F','\\\\xF0\\\\x9F\\\\x91\\\\x90','\\\\xF0\\\\x9F\\\\x91\\\\x91','\\\\xF0\\\\x9F\\\\x91\\\\x92','\\\\xF0\\\\x9F\\\\x91\\\\x93','\\\\xF0\\\\x9F\\\\x91\\\\x94','\\\\xF0\\\\x9F\\\\x91\\\\x95','\\\\xF0\\\\x9F\\\\x91\\\\x96','\\\\xF0\\\\x9F\\\\x91\\\\x97','\\\\xF0\\\\x9F\\\\x91\\\\x98','\\\\xF0\\\\x9F\\\\x91\\\\x99','\\\\xF0\\\\x9F\\\\x91\\\\x9A','\\\\xF0\\\\x9F\\\\x91\\\\x9B','\\\\xF0\\\\x9F\\\\x91\\\\x9C','\\\\xF0\\\\x9F\\\\x91\\\\x9D','\\\\xF0\\\\x9F\\\\x91\\\\x9E','\\\\xF0\\\\x9F\\\\x91\\\\x9F','\\\\xF0\\\\x9F\\\\x91\\\\xA0','\\\\xF0\\\\x9F\\\\x91\\\\xA1','\\\\xF0\\\\x9F\\\\x91\\\\xA2','\\\\xF0\\\\x9F\\\\x91\\\\xA3','\\\\xF0\\\\x9F\\\\x91\\\\xA4','\\\\xF0\\\\x9F\\\\x91\\\\xA6','\\\\xF0\\\\x9F\\\\x91\\\\xA7','\\\\xF0\\\\x9F\\\\x91\\\\xA8','\\\\xF0\\\\x9F\\\\x91\\\\xA9','\\\\xF0\\\\x9F\\\\x91\\\\xAA','\\\\xF0\\\\x9F\\\\x91\\\\xAB','\\\\xF0\\\\x9F\\\\x91\\\\xAE','\\\\xF0\\\\x9F\\\\x91\\\\xAF','\\\\xF0\\\\x9F\\\\x91\\\\xB0','\\\\xF0\\\\x9F\\\\x91\\\\xB1','\\\\xF0\\\\x9F\\\\x91\\\\xB2','\\\\xF0\\\\x9F\\\\x91\\\\xB3','\\\\xF0\\\\x9F\\\\x91\\\\xB4','\\\\xF0\\\\x9F\\\\x91\\\\xB5','\\\\xF0\\\\x9F\\\\x91\\\\xB6','\\\\xF0\\\\x9F\\\\x91\\\\xB7','\\\\xF0\\\\x9F\\\\x91\\\\xB8','\\\\xF0\\\\x9F\\\\x91\\\\xB9','\\\\xF0\\\\x9F\\\\x91\\\\xBA','\\\\xF0\\\\x9F\\\\x91\\\\xBB','\\\\xF0\\\\x9F\\\\x91\\\\xBC','\\\\xF0\\\\x9F\\\\x91\\\\xBD','\\\\xF0\\\\x9F\\\\x91\\\\xBE','\\\\xF0\\\\x9F\\\\x91\\\\xBF','\\\\xF0\\\\x9F\\\\x92\\\\x80','\\\\xF0\\\\x9F\\\\x92\\\\x81','\\\\xF0\\\\x9F\\\\x92\\\\x82','\\\\xF0\\\\x9F\\\\x92\\\\x83','\\\\xF0\\\\x9F\\\\x92\\\\x84','\\\\xF0\\\\x9F\\\\x92\\\\x85','\\\\xF0\\\\x9F\\\\x92\\\\x86','\\\\xF0\\\\x9F\\\\x92\\\\x87','\\\\xF0\\\\x9F\\\\x92\\\\x88','\\\\xF0\\\\x9F\\\\x92\\\\x89','\\\\xF0\\\\x9F\\\\x92\\\\x8A','\\\\xF0\\\\x9F\\\\x92\\\\x8B','\\\\xF0\\\\x9F\\\\x92\\\\x8C','\\\\xF0\\\\x9F\\\\x92\\\\x8D','\\\\xF0\\\\x9F\\\\x92\\\\x8E','\\\\xF0\\\\x9F\\\\x92\\\\x8F','\\\\xF0\\\\x9F\\\\x92\\\\x90','\\\\xF0\\\\x9F\\\\x92\\\\x91','\\\\xF0\\\\x9F\\\\x92\\\\x92','\\\\xF0\\\\x9F\\\\x92\\\\x93','\\\\xF0\\\\x9F\\\\x92\\\\x94','\\\\xF0\\\\x9F\\\\x92\\\\x95','\\\\xF0\\\\x9F\\\\x92\\\\x96','\\\\xF0\\\\x9F\\\\x92\\\\x97','\\\\xF0\\\\x9F\\\\x92\\\\x98','\\\\xF0\\\\x9F\\\\x92\\\\x99','\\\\xF0\\\\x9F\\\\x92\\\\x9A','\\\\xF0\\\\x9F\\\\x92\\\\x9B','\\\\xF0\\\\x9F\\\\x92\\\\x9C','\\\\xF0\\\\x9F\\\\x92\\\\x9D','\\\\xF0\\\\x9F\\\\x92\\\\x9E','\\\\xF0\\\\x9F\\\\x92\\\\x9F','\\\\xF0\\\\x9F\\\\x92\\\\xA0','\\\\xF0\\\\x9F\\\\x92\\\\xA1','\\\\xF0\\\\x9F\\\\x92\\\\xA2','\\\\xF0\\\\x9F\\\\x92\\\\xA3','\\\\xF0\\\\x9F\\\\x92\\\\xA4','\\\\xF0\\\\x9F\\\\x92\\\\xA5','\\\\xF0\\\\x9F\\\\x92\\\\xA6','\\\\xF0\\\\x9F\\\\x92\\\\xA7','\\\\xF0\\\\x9F\\\\x92\\\\xA8','\\\\xF0\\\\x9F\\\\x92\\\\xA9','\\\\xF0\\\\x9F\\\\x92\\\\xAA','\\\\xF0\\\\x9F\\\\x92\\\\xAB','\\\\xF0\\\\x9F\\\\x92\\\\xAC','\\\\xF0\\\\x9F\\\\x92\\\\xAE','\\\\xF0\\\\x9F\\\\x92\\\\xAF','\\\\xF0\\\\x9F\\\\x92\\\\xB0','\\\\xF0\\\\x9F\\\\x92\\\\xB1','\\\\xF0\\\\x9F\\\\x92\\\\xB2','\\\\xF0\\\\x9F\\\\x92\\\\xB3','\\\\xF0\\\\x9F\\\\x92\\\\xB4','\\\\xF0\\\\x9F\\\\x92\\\\xB5','\\\\xF0\\\\x9F\\\\x92\\\\xB8','\\\\xF0\\\\x9F\\\\x92\\\\xB9','\\\\xF0\\\\x9F\\\\x92\\\\xBA','\\\\xF0\\\\x9F\\\\x92\\\\xBB','\\\\xF0\\\\x9F\\\\x92\\\\xBC','\\\\xF0\\\\x9F\\\\x92\\\\xBD','\\\\xF0\\\\x9F\\\\x92\\\\xBE','\\\\xF0\\\\x9F\\\\x92\\\\xBF','\\\\xF0\\\\x9F\\\\x93\\\\x80','\\\\xF0\\\\x9F\\\\x93\\\\x81','\\\\xF0\\\\x9F\\\\x93\\\\x82','\\\\xF0\\\\x9F\\\\x93\\\\x83','\\\\xF0\\\\x9F\\\\x93\\\\x84','\\\\xF0\\\\x9F\\\\x93\\\\x85','\\\\xF0\\\\x9F\\\\x93\\\\x86','\\\\xF0\\\\x9F\\\\x93\\\\x87','\\\\xF0\\\\x9F\\\\x93\\\\x88','\\\\xF0\\\\x9F\\\\x93\\\\x89','\\\\xF0\\\\x9F\\\\x93\\\\x8A','\\\\xF0\\\\x9F\\\\x93\\\\x8B','\\\\xF0\\\\x9F\\\\x93\\\\x8C','\\\\xF0\\\\x9F\\\\x93\\\\x8D','\\\\xF0\\\\x9F\\\\x93\\\\x8E','\\\\xF0\\\\x9F\\\\x93\\\\x8F','\\\\xF0\\\\x9F\\\\x93\\\\x90','\\\\xF0\\\\x9F\\\\x93\\\\x91','\\\\xF0\\\\x9F\\\\x93\\\\x92','\\\\xF0\\\\x9F\\\\x93\\\\x93','\\\\xF0\\\\x9F\\\\x93\\\\x94','\\\\xF0\\\\x9F\\\\x93\\\\x95','\\\\xF0\\\\x9F\\\\x93\\\\x96','\\\\xF0\\\\x9F\\\\x93\\\\x97','\\\\xF0\\\\x9F\\\\x93\\\\x98','\\\\xF0\\\\x9F\\\\x93\\\\x99','\\\\xF0\\\\x9F\\\\x93\\\\x9A','\\\\xF0\\\\x9F\\\\x93\\\\x9B','\\\\xF0\\\\x9F\\\\x93\\\\x9C','\\\\xF0\\\\x9F\\\\x93\\\\x9D','\\\\xF0\\\\x9F\\\\x93\\\\x9E','\\\\xF0\\\\x9F\\\\x93\\\\x9F','\\\\xF0\\\\x9F\\\\x93\\\\xA0','\\\\xF0\\\\x9F\\\\x93\\\\xA1','\\\\xF0\\\\x9F\\\\x93\\\\xA2','\\\\xF0\\\\x9F\\\\x93\\\\xA3','\\\\xF0\\\\x9F\\\\x93\\\\xA4','\\\\xF0\\\\x9F\\\\x93\\\\xA5','\\\\xF0\\\\x9F\\\\x93\\\\xA6','\\\\xF0\\\\x9F\\\\x93\\\\xA7','\\\\xF0\\\\x9F\\\\x93\\\\xA8','\\\\xF0\\\\x9F\\\\x93\\\\xA9','\\\\xF0\\\\x9F\\\\x93\\\\xAA','\\\\xF0\\\\x9F\\\\x93\\\\xAB','\\\\xF0\\\\x9F\\\\x93\\\\xAE','\\\\xF0\\\\x9F\\\\x93\\\\xB0','\\\\xF0\\\\x9F\\\\x93\\\\xB1','\\\\xF0\\\\x9F\\\\x93\\\\xB2','\\\\xF0\\\\x9F\\\\x93\\\\xB3','\\\\xF0\\\\x9F\\\\x93\\\\xB4','\\\\xF0\\\\x9F\\\\x93\\\\xB6','\\\\xF0\\\\x9F\\\\x93\\\\xB7','\\\\xF0\\\\x9F\\\\x93\\\\xB9','\\\\xF0\\\\x9F\\\\x93\\\\xBA','\\\\xF0\\\\x9F\\\\x93\\\\xBB','\\\\xF0\\\\x9F\\\\x93\\\\xBC','\\\\xF0\\\\x9F\\\\x94\\\\x83','\\\\xF0\\\\x9F\\\\x94\\\\x8A','\\\\xF0\\\\x9F\\\\x94\\\\x8B','\\\\xF0\\\\x9F\\\\x94\\\\x8C','\\\\xF0\\\\x9F\\\\x94\\\\x8D','\\\\xF0\\\\x9F\\\\x94\\\\x8E','\\\\xF0\\\\x9F\\\\x94\\\\x8F','\\\\xF0\\\\x9F\\\\x94\\\\x90','\\\\xF0\\\\x9F\\\\x94\\\\x91','\\\\xF0\\\\x9F\\\\x94\\\\x92','\\\\xF0\\\\x9F\\\\x94\\\\x93','\\\\xF0\\\\x9F\\\\x94\\\\x94','\\\\xF0\\\\x9F\\\\x94\\\\x96','\\\\xF0\\\\x9F\\\\x94\\\\x97','\\\\xF0\\\\x9F\\\\x94\\\\x98','\\\\xF0\\\\x9F\\\\x94\\\\x99','\\\\xF0\\\\x9F\\\\x94\\\\x9A','\\\\xF0\\\\x9F\\\\x94\\\\x9B','\\\\xF0\\\\x9F\\\\x94\\\\x9C','\\\\xF0\\\\x9F\\\\x94\\\\x9D','\\\\xF0\\\\x9F\\\\x94\\\\x9E','\\\\xF0\\\\x9F\\\\x94\\\\x9F','\\\\xF0\\\\x9F\\\\x94\\\\xA0','\\\\xF0\\\\x9F\\\\x94\\\\xA1','\\\\xF0\\\\x9F\\\\x94\\\\xA2','\\\\xF0\\\\x9F\\\\x94\\\\xA3','\\\\xF0\\\\x9F\\\\x94\\\\xA4','\\\\xF0\\\\x9F\\\\x94\\\\xA5','\\\\xF0\\\\x9F\\\\x94\\\\xA6','\\\\xF0\\\\x9F\\\\x94\\\\xA7','\\\\xF0\\\\x9F\\\\x94\\\\xA8','\\\\xF0\\\\x9F\\\\x94\\\\xA9','\\\\xF0\\\\x9F\\\\x94\\\\xAA','\\\\xF0\\\\x9F\\\\x94\\\\xAB','\\\\xF0\\\\x9F\\\\x94\\\\xAE','\\\\xF0\\\\x9F\\\\x94\\\\xAF','\\\\xF0\\\\x9F\\\\x94\\\\xB0','\\\\xF0\\\\x9F\\\\x94\\\\xB1','\\\\xF0\\\\x9F\\\\x94\\\\xB2','\\\\xF0\\\\x9F\\\\x94\\\\xB3','\\\\xF0\\\\x9F\\\\x94\\\\xB4','\\\\xF0\\\\x9F\\\\x94\\\\xB5','\\\\xF0\\\\x9F\\\\x94\\\\xB6','\\\\xF0\\\\x9F\\\\x94\\\\xB7','\\\\xF0\\\\x9F\\\\x94\\\\xB8','\\\\xF0\\\\x9F\\\\x94\\\\xB9','\\\\xF0\\\\x9F\\\\x94\\\\xBA','\\\\xF0\\\\x9F\\\\x94\\\\xBB','\\\\xF0\\\\x9F\\\\x94\\\\xBC','\\\\xF0\\\\x9F\\\\x94\\\\xBD','\\\\xF0\\\\x9F\\\\x95\\\\x90','\\\\xF0\\\\x9F\\\\x95\\\\x91','\\\\xF0\\\\x9F\\\\x95\\\\x92','\\\\xF0\\\\x9F\\\\x95\\\\x93','\\\\xF0\\\\x9F\\\\x95\\\\x94','\\\\xF0\\\\x9F\\\\x95\\\\x95','\\\\xF0\\\\x9F\\\\x95\\\\x96','\\\\xF0\\\\x9F\\\\x95\\\\x97','\\\\xF0\\\\x9F\\\\x95\\\\x98','\\\\xF0\\\\x9F\\\\x95\\\\x99','\\\\xF0\\\\x9F\\\\x95\\\\x9A','\\\\xF0\\\\x9F\\\\x95\\\\x9B','\\\\xF0\\\\x9F\\\\x97\\\\xBB','\\\\xF0\\\\x9F\\\\x97\\\\xBC','\\\\xF0\\\\x9F\\\\x97\\\\xBD','\\\\xF0\\\\x9F\\\\x97\\\\xBE','\\\\xF0\\\\x9F\\\\x97\\\\xBF','\\\\xF0\\\\x9F\\\\x98\\\\x80','\\\\xF0\\\\x9F\\\\x98\\\\x87','\\\\xF0\\\\x9F\\\\x98\\\\x88','\\\\xF0\\\\x9F\\\\x98\\\\x8E','\\\\xF0\\\\x9F\\\\x98\\\\x90','\\\\xF0\\\\x9F\\\\x98\\\\x91','\\\\xF0\\\\x9F\\\\x98\\\\x95','\\\\xF0\\\\x9F\\\\x98\\\\x97','\\\\xF0\\\\x9F\\\\x98\\\\x99','\\\\xF0\\\\x9F\\\\x98\\\\x9B','\\\\xF0\\\\x9F\\\\x98\\\\x9F','\\\\xF0\\\\x9F\\\\x98\\\\xA6','\\\\xF0\\\\x9F\\\\x98\\\\xA7','\\\\xF0\\\\x9F\\\\x98\\\\xAC','\\\\xF0\\\\x9F\\\\x98\\\\xAE','\\\\xF0\\\\x9F\\\\x98\\\\xAF','\\\\xF0\\\\x9F\\\\x98\\\\xB4','\\\\xF0\\\\x9F\\\\x98\\\\xB6','\\\\xF0\\\\x9F\\\\x9A\\\\x81','\\\\xF0\\\\x9F\\\\x9A\\\\x82','\\\\xF0\\\\x9F\\\\x9A\\\\x86','\\\\xF0\\\\x9F\\\\x9A\\\\x88','\\\\xF0\\\\x9F\\\\x9A\\\\x8A','\\\\xF0\\\\x9F\\\\x9A\\\\x8D','\\\\xF0\\\\x9F\\\\x9A\\\\x8E','\\\\xF0\\\\x9F\\\\x9A\\\\x90','\\\\xF0\\\\x9F\\\\x9A\\\\x94','\\\\xF0\\\\x9F\\\\x9A\\\\x96','\\\\xF0\\\\x9F\\\\x9A\\\\x98','\\\\xF0\\\\x9F\\\\x9A\\\\x9B','\\\\xF0\\\\x9F\\\\x9A\\\\x9C','\\\\xF0\\\\x9F\\\\x9A\\\\x9D','\\\\xF0\\\\x9F\\\\x9A\\\\x9E','\\\\xF0\\\\x9F\\\\x9A\\\\x9F','\\\\xF0\\\\x9F\\\\x9A\\\\xA0','\\\\xF0\\\\x9F\\\\x9A\\\\xA1','\\\\xF0\\\\x9F\\\\x9A\\\\xA3','\\\\xF0\\\\x9F\\\\x9A\\\\xA6','\\\\xF0\\\\x9F\\\\x9A\\\\xAE','\\\\xF0\\\\x9F\\\\x9A\\\\xAF','\\\\xF0\\\\x9F\\\\x9A\\\\xB0','\\\\xF0\\\\x9F\\\\x9A\\\\xB1','\\\\xF0\\\\x9F\\\\x9A\\\\xB3','\\\\xF0\\\\x9F\\\\x9A\\\\xB4','\\\\xF0\\\\x9F\\\\x9A\\\\xB5','\\\\xF0\\\\x9F\\\\x9A\\\\xB7','\\\\xF0\\\\x9F\\\\x9A\\\\xB8','\\\\xF0\\\\x9F\\\\x9A\\\\xBF','\\\\xF0\\\\x9F\\\\x9B\\\\x81','\\\\xF0\\\\x9F\\\\x9B\\\\x82','\\\\xF0\\\\x9F\\\\x9B\\\\x83','\\\\xF0\\\\x9F\\\\x9B\\\\x84','\\\\xF0\\\\x9F\\\\x9B\\\\x85','\\\\xF0\\\\x9F\\\\x8C\\\\x8D','\\\\xF0\\\\x9F\\\\x8C\\\\x8E','\\\\xF0\\\\x9F\\\\x8C\\\\x90','\\\\xF0\\\\x9F\\\\x8C\\\\x92','\\\\xF0\\\\x9F\\\\x8C\\\\x96','\\\\xF0\\\\x9F\\\\x8C\\\\x97','\\\\xF0\\\\x9F\\\\x8C\\\\x98','\\\\xF0\\\\x9F\\\\x8C\\\\x9A','\\\\xF0\\\\x9F\\\\x8C\\\\x9C','\\\\xF0\\\\x9F\\\\x8C\\\\x9D','\\\\xF0\\\\x9F\\\\x8C\\\\x9E','\\\\xF0\\\\x9F\\\\x8C\\\\xB2','\\\\xF0\\\\x9F\\\\x8C\\\\xB3','\\\\xF0\\\\x9F\\\\x8D\\\\x8B','\\\\xF0\\\\x9F\\\\x8D\\\\x90','\\\\xF0\\\\x9F\\\\x8D\\\\xBC','\\\\xF0\\\\x9F\\\\x8F\\\\x87','\\\\xF0\\\\x9F\\\\x8F\\\\x89','\\\\xF0\\\\x9F\\\\x8F\\\\xA4','\\\\xF0\\\\x9F\\\\x90\\\\x80','\\\\xF0\\\\x9F\\\\x90\\\\x81','\\\\xF0\\\\x9F\\\\x90\\\\x82','\\\\xF0\\\\x9F\\\\x90\\\\x83','\\\\xF0\\\\x9F\\\\x90\\\\x84','\\\\xF0\\\\x9F\\\\x90\\\\x85','\\\\xF0\\\\x9F\\\\x90\\\\x86','\\\\xF0\\\\x9F\\\\x90\\\\x87','\\\\xF0\\\\x9F\\\\x90\\\\x88','\\\\xF0\\\\x9F\\\\x90\\\\x89','\\\\xF0\\\\x9F\\\\x90\\\\x8A','\\\\xF0\\\\x9F\\\\x90\\\\x8B','\\\\xF0\\\\x9F\\\\x90\\\\x8F','\\\\xF0\\\\x9F\\\\x90\\\\x90','\\\\xF0\\\\x9F\\\\x90\\\\x93','\\\\xF0\\\\x9F\\\\x90\\\\x95','\\\\xF0\\\\x9F\\\\x90\\\\x96','\\\\xF0\\\\x9F\\\\x90\\\\xAA','\\\\xF0\\\\x9F\\\\x91\\\\xA5','\\\\xF0\\\\x9F\\\\x91\\\\xAC','\\\\xF0\\\\x9F\\\\x91\\\\xAD','\\\\xF0\\\\x9F\\\\x92\\\\xAD','\\\\xF0\\\\x9F\\\\x92\\\\xB6','\\\\xF0\\\\x9F\\\\x92\\\\xB7','\\\\xF0\\\\x9F\\\\x93\\\\xAC','\\\\xF0\\\\x9F\\\\x93\\\\xAD','\\\\xF0\\\\x9F\\\\x93\\\\xAF','\\\\xF0\\\\x9F\\\\x93\\\\xB5','\\\\xF0\\\\x9F\\\\x94\\\\x80','\\\\xF0\\\\x9F\\\\x94\\\\x81','\\\\xF0\\\\x9F\\\\x94\\\\x82','\\\\xF0\\\\x9F\\\\x94\\\\x84','\\\\xF0\\\\x9F\\\\x94\\\\x85','\\\\xF0\\\\x9F\\\\x94\\\\x86','\\\\xF0\\\\x9F\\\\x94\\\\x87','\\\\xF0\\\\x9F\\\\x94\\\\x89','\\\\xF0\\\\x9F\\\\x94\\\\x95','\\\\xF0\\\\x9F\\\\x94\\\\xAC','\\\\xF0\\\\x9F\\\\x94\\\\xAD','\\\\xF0\\\\x9F\\\\x95\\\\x9C','\\\\xF0\\\\x9F\\\\x95\\\\x9D','\\\\xF0\\\\x9F\\\\x95\\\\x9E','\\\\xF0\\\\x9F\\\\x95\\\\x9F','\\\\xF0\\\\x9F\\\\x95\\\\xA0','\\\\xF0\\\\x9F\\\\x95\\\\xA1','\\\\xF0\\\\x9F\\\\x95\\\\xA2','\\\\xF0\\\\x9F\\\\x95\\\\xA3','\\\\xF0\\\\x9F\\\\x95\\\\xA4','\\\\xF0\\\\x9F\\\\x95\\\\xA5','\\\\xF0\\\\x9F\\\\x95\\\\xA6','\\\\xF0\\\\x9F\\\\x95\\\\xA7','\\\\xf0\\\\x9f\\\\x99\\\\x82','\\\\xf0\\\\x9f\\\\x99\\\\x83','\\\\xf0\\\\x9f\\\\xa5\\\\xb0','\\\\xf0\\\\x9f\\\\xa4\\\\xa9','\\\\xf0\\\\x9f\\\\xa5\\\\xb2','\\\\xf0\\\\x9f\\\\xa4\\\\xaa','\\\\xf0\\\\x9f\\\\xa4\\\\x91','\\\\xf0\\\\x9f\\\\xa4\\\\x97','\\\\xf0\\\\x9f\\\\xa4\\\\xad','\\\\xf0\\\\x9f\\\\xa4\\\\xab','\\\\xf0\\\\x9f\\\\xa4\\\\x94','\\\\xf0\\\\x9f\\\\xa4\\\\x90','\\\\xf0\\\\x9f\\\\xa4\\\\xa8','\\\\xf0\\\\x9f\\\\x99\\\\x84','\\\\xf0\\\\x9f\\\\xa4\\\\xa5','\\\\xf0\\\\x9f\\\\xa4\\\\xa4','\\\\xf0\\\\x9f\\\\xa4\\\\x92','\\\\xf0\\\\x9f\\\\xa4\\\\x95','\\\\xf0\\\\x9f\\\\xa4\\\\xa2','\\\\xf0\\\\x9f\\\\xa4\\\\xae','\\\\xf0\\\\x9f\\\\xa4\\\\xa7','\\\\xf0\\\\x9f\\\\xa5\\\\xb5','\\\\xf0\\\\x9f\\\\xa5\\\\xb6','\\\\xf0\\\\x9f\\\\xa5\\\\xb4','\\\\xf0\\\\x9f\\\\xa4\\\\xaf','\\\\xf0\\\\x9f\\\\xa4\\\\xa0','\\\\xf0\\\\x9f\\\\xa5\\\\xb3','\\\\xf0\\\\x9f\\\\xa5\\\\xb8','\\\\xf0\\\\x9f\\\\xa4\\\\x93','\\\\xf0\\\\x9f\\\\xa7\\\\x90','\\\\xf0\\\\x9f\\\\x99\\\\x81','\\\\xe2\\\\x98\\\\xb9\\\\xef\\\\xb8\\\\x8f','\\\\xf0\\\\x9f\\\\xa5\\\\xba','\\\\xf0\\\\x9f\\\\xa5\\\\xb1','\\\\xf0\\\\x9f\\\\xa4\\\\xac','\\\\xe2\\\\x98\\\\xa0\\\\xef\\\\xb8\\\\x8f','\\\\xf0\\\\x9f\\\\xa4\\\\xa1','\\\\xf0\\\\x9f\\\\xa4\\\\x96','\\\\xf0\\\\x9f\\\\xa4\\\\x9a','\\\\xf0\\\\x9f\\\\x96\\\\x90','\\\\xf0\\\\x9f\\\\x96\\\\x96','\\\\xf0\\\\x9f\\\\xa4\\\\x8c','\\\\xf0\\\\x9f\\\\xa4\\\\x8f','\\\\xf0\\\\x9f\\\\xa4\\\\x9e','\\\\xf0\\\\x9f\\\\xa4\\\\x9f','\\\\xf0\\\\x9f\\\\xa4\\\\x98','\\\\xf0\\\\x9f\\\\xa4\\\\x99','\\\\xf0\\\\x9f\\\\x96\\\\x95','\\\\xf0\\\\x9f\\\\xa4\\\\x9b','\\\\xf0\\\\x9f\\\\xa4\\\\x9c','\\\\xf0\\\\x9f\\\\xa4\\\\xb2','\\\\xf0\\\\x9f\\\\xa4\\\\x9d','\\\\xe2\\\\x9c\\\\x8d\\\\xef\\\\xb8\\\\x8f','\\\\xf0\\\\x9f\\\\xa4\\\\xb3','\\\\xf0\\\\x9f\\\\xa6\\\\xbe','\\\\xf0\\\\x9f\\\\xa6\\\\xbf','\\\\xf0\\\\x9f\\\\xa6\\\\xb5','\\\\xf0\\\\x9f\\\\xa6\\\\xb6','\\\\xf0\\\\x9f\\\\xa6\\\\xbb','\\\\xf0\\\\x9f\\\\xa7\\\\xa0','\\\\xf0\\\\x9f\\\\xab\\\\x80','\\\\xf0\\\\x9f\\\\xab\\\\x81','\\\\xf0\\\\x9f\\\\xa6\\\\xb7','\\\\xf0\\\\x9f\\\\xa6\\\\xb4','\\\\xf0\\\\x9f\\\\x91\\\\x81','\\\\xf0\\\\x9f\\\\xa7\\\\x92','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x94','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x93','\\\\xf0\\\\x9f\\\\xa7\\\\x8f','\\\\xf0\\\\x9f\\\\xa7\\\\x8f','\\\\xf0\\\\x9f\\\\xa7\\\\x8f','\\\\xf0\\\\x9f\\\\xa4\\\\xa6','\\\\xf0\\\\x9f\\\\xa4\\\\xa6','\\\\xf0\\\\x9f\\\\xa4\\\\xa6','\\\\xf0\\\\x9f\\\\xa4\\\\xb7','\\\\xf0\\\\x9f\\\\xa4\\\\xb7','\\\\xf0\\\\x9f\\\\xa4\\\\xb7','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\x95\\\\xb5','\\\\xf0\\\\x9f\\\\x95\\\\xb5','\\\\xf0\\\\x9f\\\\x95\\\\xb5','\\\\xf0\\\\x9f\\\\xa5\\\\xb7','\\\\xf0\\\\x9f\\\\xa4\\\\xb4','\\\\xf0\\\\x9f\\\\xa7\\\\x95','\\\\xf0\\\\x9f\\\\xa4\\\\xb5','\\\\xf0\\\\x9f\\\\xa4\\\\xb5','\\\\xf0\\\\x9f\\\\xa4\\\\xb5','\\\\xf0\\\\x9f\\\\xa4\\\\xb0','\\\\xf0\\\\x9f\\\\xa4\\\\xb1','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa4\\\\xb6','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa6\\\\xb8','\\\\xf0\\\\x9f\\\\xa6\\\\xb8','\\\\xf0\\\\x9f\\\\xa6\\\\xb8','\\\\xf0\\\\x9f\\\\xa6\\\\xb9','\\\\xf0\\\\x9f\\\\xa6\\\\xb9','\\\\xf0\\\\x9f\\\\xa6\\\\xb9','\\\\xf0\\\\x9f\\\\xa7\\\\x99','\\\\xf0\\\\x9f\\\\xa7\\\\x99','\\\\xf0\\\\x9f\\\\xa7\\\\x99','\\\\xf0\\\\x9f\\\\xa7\\\\x9a','\\\\xf0\\\\x9f\\\\xa7\\\\x9a','\\\\xf0\\\\x9f\\\\xa7\\\\x9a','\\\\xf0\\\\x9f\\\\xa7\\\\x9b','\\\\xf0\\\\x9f\\\\xa7\\\\x9b','\\\\xf0\\\\x9f\\\\xa7\\\\x9b','\\\\xf0\\\\x9f\\\\xa7\\\\x9c','\\\\xf0\\\\x9f\\\\xa7\\\\x9c','\\\\xf0\\\\x9f\\\\xa7\\\\x9c','\\\\xf0\\\\x9f\\\\xa7\\\\x9d','\\\\xf0\\\\x9f\\\\xa7\\\\x9d','\\\\xf0\\\\x9f\\\\xa7\\\\x9d','\\\\xf0\\\\x9f\\\\xa7\\\\x9e','\\\\xf0\\\\x9f\\\\xa7\\\\x9e','\\\\xf0\\\\x9f\\\\xa7\\\\x9e','\\\\xf0\\\\x9f\\\\xa7\\\\x9f','\\\\xf0\\\\x9f\\\\xa7\\\\x9f','\\\\xf0\\\\x9f\\\\xa7\\\\x9f','\\\\xf0\\\\x9f\\\\xa7\\\\x8d','\\\\xf0\\\\x9f\\\\xa7\\\\x8d','\\\\xf0\\\\x9f\\\\xa7\\\\x8d','\\\\xf0\\\\x9f\\\\xa7\\\\x8e','\\\\xf0\\\\x9f\\\\xa7\\\\x8e','\\\\xf0\\\\x9f\\\\xa7\\\\x8e','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\x95\\\\xba','\\\\xf0\\\\x9f\\\\x95\\\\xb4','\\\\xf0\\\\x9f\\\\xa7\\\\x96','\\\\xf0\\\\x9f\\\\xa7\\\\x96','\\\\xf0\\\\x9f\\\\xa7\\\\x96','\\\\xf0\\\\x9f\\\\xa7\\\\x98','\\\\xf0\\\\x9f\\\\xa7\\\\x91','\\\\xf0\\\\x9f\\\\x97\\\\xa3','\\\\xf0\\\\x9f\\\\xab\\\\x82','\\\\xf0\\\\x9f\\\\xa7\\\\xb3','\\\\xe2\\\\x98\\\\x82\\\\xef\\\\xb8\\\\x8f','\\\\xf0\\\\x9f\\\\xa7\\\\xb5','\\\\xf0\\\\x9f\\\\xa7\\\\xb6','\\\\xf0\\\\x9f\\\\x95\\\\xb6','\\\\xf0\\\\x9f\\\\xa5\\\\xbd','\\\\xf0\\\\x9f\\\\xa5\\\\xbc','\\\\xf0\\\\x9f\\\\xa6\\\\xba','\\\\xf0\\\\x9f\\\\xa7\\\\xa3','\\\\xf0\\\\x9f\\\\xa7\\\\xa4','\\\\xf0\\\\x9f\\\\xa7\\\\xa5','\\\\xf0\\\\x9f\\\\xa7\\\\xa6','\\\\xf0\\\\x9f\\\\xa5\\\\xbb','\\\\xf0\\\\x9f\\\\xa9\\\\xb1','\\\\xf0\\\\x9f\\\\xa9\\\\xb2','\\\\xf0\\\\x9f\\\\xa9\\\\xb3','\\\\xf0\\\\x9f\\\\xa9\\\\xb4','\\\\xf0\\\\x9f\\\\xa5\\\\xbe','\\\\xf0\\\\x9f\\\\xa5\\\\xbf','\\\\xf0\\\\x9f\\\\xa9\\\\xb0','\\\\xf0\\\\x9f\\\\xa7\\\\xa2','\\\\xf0\\\\x9f\\\\xaa\\\\x96','\\\\xe2\\\\x9b\\\\x91\\\\xef\\\\xb8\\\\x8f','\\\\xf0\\\\x9f\\\\xa9\\\\xb8']
  print("Total emoji handled: %d Emojis" % len(isEmoji))
  if txt != None:
    new_txt = 'failed'
    arrLen = int( len(isEmoji) )
		mystr = txt
		print("String reviewed: ", mystr)
		for x in range(arrLen):
			if isEmoji[x] in mystr:
				mystr = mystr.replace(isEmoji[x], '')
		new_txt = mystr
		return new_txt
</exec>
<suspend/>`;

let frvalidate = `
    <validate>
#if your project contains the emoji module, uncomment the line below
#this.val = removeEmojis(this.unsafe_val)

text = this.unsafe_val
new_text = re.sub(r\"[\^a\-zA\-Z]\", \"\", text)

# Res tag to add:
# - \<res label\=\"err1\"\>Your answer should contain letters.\<\/res\>
# - \<res label\=\"err2\"\>Your answer should have at least 3 characters.\<\/res\>

if (new_text == \"\"):
  error(res.err1)

if len(str(this.val)) lt 3:
  error(res.err2)
    <\/validate>
`;

let frSupportTag = `
<style cond="1" name="survey.respview.footer.support"><![CDATA[
<div style="text-align: center;"><a href="https://www.maximiles.fr/help/new" target="_blank" rel="noopener">Support</a></div>
]]></style>
`;



let groupRow = `
<exec when="init">
def group_rows( question, grouped_rows ):
    first_item_index = None
    shuffle_order = [row.index for row in question.rows.order]

    for index, row in enumerate( shuffle_order ):
        if question.rows[row].label in grouped_rows:
            if first_item_index == None:
                first_item_index = index
            else:
                first_item_index += 1
                shuffle_order.insert( first_item_index, shuffle_order.pop(index) )

    question.rows.order = shuffle_order
</exec>
<suspend/>
`;



let zoom = `
<style cond="not(gv.request.device.isSmartphone() or gv.request.device.isTablet())" mode="after" name="respview.client.js" wrap="ready"><![CDATA[
class ModalStyle{
  constructor(){
    this.styles = document.createElement("style");
    this.content = "";
    this.init();
  }
  
  init(){
    this.content = this.createStyle();
    this.styles.innerHTML = this.content;
    document.head.append(this.styles);
  }
  
  createStyle(){
  
  return ".modal{display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100vw;height:100vh;background-color:#FFFF;z-index:100;visibility:hidden;pointer-events:none;opacity:0;transition:opacity 250ms 0ms ease,visibility 0ms 250ms ease;overflow:hidden;}.modal--show{transition-delay:0ms;visibility:visible;pointer-events:unset;opacity:1;}.modal__image{padding:0.75rem;max-width:96rem;max-height:100%;transition:transform 200ms 50ms cubic-bezier(.55,-0.07,0,1.37);transform-origin:center;transform:scale(0);}.modal--show>.modal__image{transform:scale(1);}img{cursor:pointer;}";
  
  }

}

class Modal{

constructor(img, clickClose){
  this.img = img;
  this.clickClose = clickClose;
  this.modal = {};
  this.modalImage = {};
  this.clone = this.img.cloneNode(true);
  
  // initialization function
  this.init();
}

init(){
  this.createModal();
  this.addEvents();
}

createModal(){
 this.modal = document.createElement('div');
 this.modalImage = document.createElement('div');

 this.modal.classList.add('modal');
 this.modalImage.classList.add('modal__image');
 this.clone.classList.add("survey-image-original");
 this.clone.classList.remove("survey-image-medium");
 this.clone.classList.remove("survey-image-small");
 this.clone.classList.remove("survey-image-large");
 this.clone.classList.remove("survey-image-xlarge");
 this.modalImage.append(this.clone);

 this.modal.append(this.modalImage);

 document.body.append(this.modal);
}

addEvents(){
// hide modal event
if (this.clickClose){
this.modal.addEventListener('click', (e) => {
this.modal.classList.remove('modal--show');
});
}

// show modal event
this.img.addEventListener('click', (e) => {
this.modal.classList.add('modal--show');
});
}
}

new ModalStyle();

let arr = Array.from(document.querySelectorAll('.banner'));

arr.forEach(item => {

new Modal(item,true);

});
]]></style>
`;


let continueAfter = `<style label="countdownSubmitTimer" arg\:btnID="btn_continue" arg\:timeout="\${1:15}" name="respview.client.js" mode=\"after\" with\=\"\${2:Q1}\" wrap="ready"><![CDATA[
var submitBtn = $ ('#'+'\$(btnID)');
var submitBtnText = submitBtn.attr('value');

var count = \$(timeout);
var counter = setInterval(timer, 1000);
 
submitBtn.prop("disabled", true);
 
function timer() {
   if (count <= 0) {
       clearInterval(counter);
       submitBtn.prop("disabled", false);
       submitBtn.attr('value', submitBtnText);
       //If the question requires auto advance, uncheck the line below.
       //submitBtn.trigger('click');
   } else {
       submitBtn.attr('value' ,submitBtnText + ' (' + count + ')');
       count = count - 1;
   }
}
]]></style>
`;

let zoomMobileMeta = `
<style cond="(gv.request.device.isSmartphone() or gv.request.device.isTablet())" mode="after" name="respview.client.meta"><![CDATA[
<meta name="viewport" content="width=device-width, maximum-scale=10, user-scalable=yes"/>
]]></style>
`;

let blockTranslation = `
<style mode="after" name="respview.client.js"><![CDATA[
<script>
 \$ (document).ready(function() {
 document.getElementsByTagName('html')\[0\].setAttribute('translate', 'no'); 
 });
 </script>
]]></style>
`;

let confidentialityblock = `
<style mode="after" name="respview.client.css"><![CDATA[
<style type="text/css" media="print">
    body {display:none;visibility:hidden;}
</style>
]]></style>
<style mode="after" name="respview.client.js" wrap="ready"><![CDATA[
\/\/ To disable right click
    
    document.addEventListener('contextmenu', event => event.preventDefault());

\/\/ Disable F12 options for desktops
    
    document.onkeydown = function(event) {
        event = (event \|\| window.event);
        if (event.keyCode === 123) {  \/\/ F12 key
            return false;
        } else if (event.ctrlKey \&\& event.shiftKey \&\& event.keyCode === 73) {  \/\/ Ctrl\+Shift\+I
            return false;
        } else if (event.ctrlKey \&\& event.shiftKey \&\& event.keyCode === 74) {  \/\/ Ctrl\+Shift\+J
            return false;
        } else if (event.ctrlKey \&\& event.keyCode === 85) {  \/\/ Ctrl\+U
            return false;
        } else if (event.ctrlKey \&\& event.keyCode === 83) {  \/\/ Ctrl\+S (Save)
            return false;
        }
    };
    
     
\/\/ To Disable ctrl\+c, ctrl\+u
    jQuery(document).ready(function(\$){
        //clp_clear();
        \$ (document).keydown(function(event) {
        var pressedKey = String.fromCharCode(event.keyCode).toLowerCase();
        if (event.ctrlKey \&\& (pressedKey == \"c\" || pressedKey == \"u\" \|\| pressedKey == \"p\")) {
            alert('Sorry, This Functionality Has Been Disabled\!');
            \/\/disable key press porcessing
        return false\;
        }
        
    });
    });
]]></style>
<style mode=\"after\" name=\"respview.client.js\" wrap=\"ready\"><![CDATA[
window.onload = function() {
    \/\/ Detect iOS
    function isIOS() {
        return \/iPad\|iPhone\|iPod\/.test(navigator.userAgent) \&\& \!window.MSStream;
    }

    \/\/ Disable right click (also blocks long-press menu on iOS)
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    \/\/ Prevent copy, cut, paste
    document.addEventListener('copy', function(event) {
        event.preventDefault();
        alert(\"Copy function is disabled on this page.\");
    });

    document.addEventListener('cut', function(event) {
        event.preventDefault();
        alert(\"Cut function is disabled on this page.\");
    });

    document.addEventListener('paste', function(event) {
        event.preventDefault();
        alert(\"Paste function is disabled on this page.\");
    });

    \/\/ Additional restrictions for iOS users
    if (isIOS()) {
        \/\/ Disable text selection and long press menu in iOS
        document.body.style.webkitTouchCallout = 'none';  \/\/ Prevent long press to open context menu
        document.body.style.userSelect = 'none';  \/\/ Disable text selection
        
        \/\/ Optionally disable double-tap zoom (common in Safari)
        document.addEventListener(\"touchstart\", function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, { passive: false });

        \/\/ Prevent text selection by touch for all elements
        document.querySelectorAll(\"\*\").forEach(function(el) {
            el.style.webkitUserSelect = \"none\";
            el.style.userSelect = \"none\";
        });
    }
};
]]></style>
`;

let timeallPages = `<float 
  label=\"pagetime\"
  onLoad=\"preciseTimePerPage()\">
  <title>\.</title>
  <virtual>
preciseTimePerPageDelphi(data,this)
  </virtual>
</float>`;


let timeblock = `  <exec>
p.timeStartBlock = timeSpent()
  </exec>


  <note>Remove the note tag and add your questions here</note>


  <exec>
print p.timeStartBlock
print timeSpent()
SECTION_\${1:1}_TIME.val = float(timeSpent()) - float(p.timeStartBlock)
  </exec>

  <suspend/>

  <text 
   label="SECTION_\${1:1}_TIME"
   optional="1"
   size="25"
   where="execute,survey,report">
    <title>SECTION \${1:1} TIME</title>
  </text>

  <suspend/>\${0}`;





let limitNumberModule = `
<style name=\"question.after\" wrap=\"ready\"><\!\[CDATA\[
let input = document.querySelector('.answers .input\[type=\"number\"\]');

input.addEventListener('input', (e) =\> {

if (e.target.value.length \> 2){
  e.preventDefault();
  e.stopPropagation();
  e.target.value = e.target.value.toString().slice\(0,2\);
}

})
\]\]><\/style>
`;


let resbuttonFR = `  <res label="sys_check-error-atLeast-plur-column">Veuillez sélectionner au moins \$\(count\) réponses \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Veuillez sélectionner au moins \$\(count\) réponse \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Veuillez sélectionner au maximum \$\(count\) réponses \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Veuillez sélectionner exactement \$\(count\) réponses \(vous avez sélectionné \$\(actual\)\).</res>`;

let rescardsortFR = `  <res label="sys_noAnswerSelected">Veuillez sélectionner une réponse pour cette carte.</res>
  <res label="sys_check-error">Veuillez sélectionner \$\(which\) \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Veuillez sélectionner au moins \$\(count\) réponses pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Veuillez sélectionner au moins \$\(count\) réponses pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Veuillez sélectionner au moins \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Veuillez sélectionner au moins \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Veuillez sélectionner au maximum \$\(count\) réponses pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Veuillez sélectionner au maximum \$\(count\) réponses pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Veuillez sélectionner au maximum \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Veuillez sélectionner au maximum \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Veuillez sélectionner exactement \$\(count\) réponses pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Veuillez sélectionner exactement \$\(count\) réponses pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Veuillez sélectionner exactement \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Veuillez sélectionner exactement \$\(count\) réponse pour cette carte \(vous avez sélectionné \$\(actual\)\).</res>`;

let ressliderFR = `  <res label="sys_noAnswerSelected">Veuillez faire glisser le curseur pour évaluer votre réponse.</res>
  <res label="sys_notWhole">Veuillez faire glisser la barre pour évaluer votre réponse.</res>`;

let resbuttonratingFR = `  <res label="sys_notWhole">Veuillez sélectionner une réponse.</res>`;

let resbuttonDE = `  <res label="sys_check-error-atLeast-plur-column">Bitte wählen Sie mindestens \$\(count\) Antworten aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atLeast-sing-column">Bitte wählen Sie mindestens \$\(count\) Antworten aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atMost-plur-column">Bitte wählen Sie maximal \$\(count\) Antworten aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-exactly-plur-column">Bitte wählen Sie genau \$\(count\) Antworten aus \(Sie haben \$\(actual\) ausgewählt\).</res>`;

let rescardsortDE = `  <res label="sys_noAnswerSelected">Bitte wählen Sie eine Antwort für diese Karte aus.</res>
  <res label="sys_check-error">Bitte wählen Sie \$\(which\) \$\(count\) Antwort für diese Karte \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atLeast-plur-column">Bitte wählen Sie mindestens \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atLeast-plur-row">Bitte wählen Sie mindestens \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atLeast-sing-column">Bitte wählen Sie mindestens \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atLeast-sing-row">Bitte wählen Sie mindestens \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atMost-plur-column">Bitte wählen Sie maximal \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atMost-plur-row">Bitte wählen Sie maximal \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atMost-sing-column">Bitte wählen Sie maximal \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-atMost-sing-row">Bitte wählen Sie maximal \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-exactly-plur-column">Bitte wählen Sie genau \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-exactly-plur-row">Bitte wählen Sie genau \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-exactly-sing-column">Bitte wählen Sie genau \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>
  <res label="sys_check-error-exactly-sing-row">Bitte wählen Sie genau \$\(count\) Antworten für diese Karte aus \(Sie haben \$\(actual\) ausgewählt\).</res>`;

let ressliderDE = `  <res label="sys_noAnswerSelected">Bitte schieben Sie den Regler, um Ihre Antwort zu bewerten.</res>
  <res label="sys_notWhole">Bitte schieben Sie den Schieberegler, um Ihre Antwort zu bewerten.</res>`;

let resbuttonratingDE = `  <res label="sys_notWhole">Bitte wählen Sie eine Antwort aus.</res>`;

let resbuttonES = `  <res label="sys_check-error-atLeast-plur-column">Seleccione al menos \$\(count\) respuestas \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Seleccione al menos \$\(count\) respuestas \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Seleccione como máximo \$\(count\) respuestas \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Seleccione exactamente \$\(count\) respuestas \(ha seleccionado \$\(actual\)\).</res>`;

let rescardsortES = `  <res label="sys_noAnswerSelected">Seleccione una respuesta para esta tarjeta.</res>
  <res label="sys_check-error">Seleccione \$\(which\) \$\(count\) respuesta para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Seleccione al menos \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Seleccione al menos \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Seleccione al menos \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Seleccione al menos \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Seleccione como máximo \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Seleccione como máximo \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Seleccione como máximo \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Seleccione como máximo \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Seleccione exactamente \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Seleccione exactamente \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Seleccione exactamente \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Seleccione exactamente \$\(count\) respuestas para esta tarjeta \(ha seleccionado \$\(actual\)\).</res>`;

let ressliderES = `  <res label="sys_noAnswerSelected">Deslice el control deslizante para calificar su respuesta.</res>
  <res label="sys_notWhole">Deslice la barra para calificar su respuesta.</res>`;

let resbuttonratingES = `  <res label="sys_notWhole">Seleccione una respuesta.</res>`;

let resbuttonIT = `  <res label="sys_check-error-atLeast-plur-column">Seleziona almeno \$\(count\) risposte \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Seleziona almeno \$\(count\) risposta \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Seleziona al massimo \$\(count\) risposte \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Seleziona esattamente \$\(count\) risposte \(ne hai selezionate \$\(actual\)\).</res>`;

let rescardsortIT = `  <res label="sys_noAnswerSelected">Seleziona una risposta per questa scheda.</res>
  <res label="sys_check-error">Seleziona \$\(which\) \$\(count\) risposta per questa scheda \(hai selezionato \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Seleziona almeno \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Seleziona almeno \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Seleziona almeno \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Seleziona almeno \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Seleziona al massimo \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Seleziona al massimo \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Seleziona al massimo \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Seleziona al massimo \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Seleziona esattamente \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Seleziona esattamente \$\(count\) risposte per questa scheda \(ne hai selezionate \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Seleziona esattamente \$\(count\) risposta per questa scheda \(hai selezionato \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Seleziona esattamente \$\(count\) risposta per questa scheda \(hai selezionato \$\(actual\)\).</res>`;

let ressliderIT = `  <res label="sys_noAnswerSelected">Fai scorrere la manopola per valutare la tua risposta.</res>
  <res label="sys_notWhole">Fai scorrere la barra per valutare la tua risposta.</res>`;

let resbuttonratingIT = `  <res label="sys_notWhole">Seleziona una risposta.</res>`;

let resbuttonDK = `  <res label="sys_check-error-atLeast-plur-column">Vælg mindst \$\(count\) svar \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Vælg mindst \$\(count\) svar \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Vælg højst \$\(count\) svar \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Vælg nøjagtigt \$\(count\) svar \(du har valgt \$\(actual\)\).</res>`;

let rescardsortDK = `  <res label="sys_noAnswerSelected">Vælg et svar til dette kort.</res>
  <res label="sys_check-error">Vælg \$\(which\) \$\(count\) svar til dette kort \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Vælg mindst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Vælg mindst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Vælg mindst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Vælg mindst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Vælg højst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Vælg højst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Vælg højst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Vælg højst \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Vælg nøjagtigt \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Vælg nøjagtigt \$\(count\) svar til dette kort \(du har valgt \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Vælg nøjagtigt \$\(count\) svar til dette kort \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Vælg nøjagtigt \$\(count\) svar til dette kort \(du valgte \$\(actual\)\).</res>`;

let ressliderDK = `  <res label="sys_noAnswerSelected">Skub håndtaget for at vurdere dit svar.</res>
  <res label="sys_notWhole">Skub bjælken for at vurdere dit svar.</res>`;

let resbuttonratingDK = `  <res label="sys_notWhole">Vælg et svar.</res>`;

let resbuttonNL = `  <res label="sys_check-error-atLeast-plur-column">Selecteer ten minste \$\(count\) antwoorden \(u hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atLeast-sing-column">Selecteer ten minste \$\(count\) antwoord \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atMost-plur-column">Selecteer maximaal \$\(count\) antwoorden \(u hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-exactly-plur-column">Selecteer precies \$\(count\) antwoorden \(je hebt \$\(actual\) geselecteerd\).</res>`;

let rescardsortNL = `  <res label="sys_noAnswerSelected">Selecteer een antwoord voor deze kaart.</res>
  <res label="sys_check-error">Selecteer \$\(which\) \$\(count\) antwoord voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atLeast-plur-column">Selecteer ten minste \$\(count\) antwoorden voor deze kaart \(u hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atLeast-plur-row">Selecteer ten minste \$\(count\) antwoorden voor deze kaart \(u hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atLeast-sing-column">Selecteer ten minste \$\(count\) antwoord voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atLeast-sing-row">Selecteer ten minste \$\(count\) antwoord voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atMost-plur-column">Selecteer maximaal \$\(count\) antwoorden voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atMost-plur-row">Selecteer maximaal \$\(count\) antwoorden voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atMost-sing-column">Selecteer maximaal \$\(count\) antwoorden voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-atMost-sing-row">Selecteer maximaal \$\(count\) antwoorden voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-exactly-plur-column">Selecteer precies \$\(count\) antwoorden voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-exactly-plur-row">Selecteer precies \$\(count\) antwoorden voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-exactly-sing-column">Selecteer precies \$\(count\) antwoord voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>
  <res label="sys_check-error-exactly-sing-row">Selecteer precies \$\(count\) antwoord voor deze kaart \(je hebt \$\(actual\) geselecteerd\).</res>`;

let ressliderNL = `  <res label="sys_noAnswerSelected">Schuif de hendel om uw antwoord te beoordelen.</res>
  <res label="sys_notWhole">Schuif de balk om uw antwoord te beoordelen.</res>`;

let resbuttonratingNL = `  <res label="sys_notWhole">Selecteer een antwoord.</res>`;

let resbuttonFI = `  <res label="sys_check-error-atLeast-plur-column">Valitse vähintään \$\(count\) vastausta \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Valitse vähintään \$\(count\) vastausta \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Valitse enintään \$\(count\) vastausta \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Valitse tarkalleen \$\(count\) vastausta \(valitsit \$\(actual\)\).</res>`;

let rescardsortFI = `  <res label="sys_noAnswerSelected">Valitse vastaus tähän korttiin.</res>
  <res label="sys_check-error">Valitse \$\(which\) \$\(count\) vastaus tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Valitse vähintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Valitse vähintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Valitse vähintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Valitse vähintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Valitse enintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Valitse enintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Valitse enintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Valitse enintään \$\(count\) vastausta tälle kortille \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Valitse täsmälleen \$\(count\) vastausta tähän korttiin \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Valitse täsmälleen \$\(count\) vastausta tähän korttiin \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Valitse täsmälleen \$\(count\) vastaus tähän korttiin \(valitsit \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Valitse täsmälleen \$\(count\) vastaus tähän korttiin \(valitsit \$\(actual\)\).</res>`;

let ressliderFI = `  <res label="sys_noAnswerSelected">Arvostele vastauksesi liu'uttamalla kahvaa.</res>
  <res label="sys_notWhole">Arvostele vastauksesi liu'uttamalla palkkia.</res>`;

let resbuttonratingFI = `  <res label="sys_notWhole">Valitse vastaus.</res>`;

let resbuttonNO = `  <res label="sys_check-error-atLeast-plur-column">Velg minst \$\(count\) svar \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Velg minst \$\(count\) svar \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Velg maksimalt \$\(count\) svar \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Velg nøyaktig \$\(count\) svar \(du valgte \$\(actual\)\).</res>`;

let rescardsortNO = `  <res label="sys_noAnswerSelected">Velg et svar for dette kortet.</res>
  <res label="sys_check-error">Velg \$\(which\) \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Velg minst \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Velg minst \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Velg minst \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Velg minst \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Velg maksimalt \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Velg maksimalt \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Velg maksimalt \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Velg maksimalt \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Velg nøyaktig \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Velg nøyaktig \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Velg nøyaktig \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Velg nøyaktig \$\(count\) svar for dette kortet \(du valgte \$\(actual\)\).</res>`;

let ressliderNO = `  <res label="sys_noAnswerSelected">Vennligst skyv håndtaket for å vurdere svaret ditt.</res>
  <res label="sys_notWhole">Vennligst skyv glidebryteren for å vurdere svaret ditt.</res>`;

let resbuttonratingNO = `  <res label="sys_notWhole">Velg et svar.</res>`;

let resbuttonPL = `  <res label="sys_check-error-atLeast-plur-column">Proszę wybrać co najmniej \$\(count\) odpowiedzi \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Proszę wybrać co najmniej \$\(count\) odpowiedzi \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Proszę wybrać maksymalnie \$\(count\) odpowiedzi \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Proszę wybrać dokładnie \$\(count\) odpowiedzi \(wybrałeś \$\(actual\)\).</res>`;

let rescardsortPL = `  <res label="sys_noAnswerSelected">Proszę wybrać odpowiedź dla tej karty.</res>
  <res label="sys_check-error">Proszę wybrać odpowiedź \$\(which\) \$\(count\) dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Proszę wybrać co najmniej \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Proszę wybrać co najmniej \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Proszę wybrać co najmniej \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Proszę wybrać co najmniej \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Proszę wybrać maksymalnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Proszę wybrać maksymalnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Proszę wybrać maksymalnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Proszę wybrać maksymalnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Proszę wybrać dokładnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Proszę wybrać dokładnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Proszę wybrać dokładnie \$\(count\) odpowiedź dla tej karty \(wybrałeś \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Proszę wybrać dokładnie \$\(count\) odpowiedzi dla tej karty \(wybrałeś \$\(actual\)\).</res>`;

let ressliderPL = `  <res label="sys_noAnswerSelected">Proszę przesunąć suwak, aby ocenić swoją odpowiedź.</res>
  <res label="sys_notWhole">Proszę przesunąć suwak, aby ocenić swoją odpowiedź.</res>`;

let resbuttonratingPL = `  <res label="sys_notWhole">Proszę wybrać odpowiedź.</res>`;

let resbuttonSW = `  <res label="sys_check-error-atLeast-plur-column">Välj minst \$\(count\) svar \(du har valt \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Välj minst \$\(count\) svar \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Välj högst \$\(count\) svar \(du har valt \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Välj exakt \$\(count\) svar \(du valde \$\(actual\)\).</res>`;

let rescardsortSW = `  <res label="sys_noAnswerSelected">Välj ett svar för detta kort.</res>
  <res label="sys_check-error">Välj \$\(which\) \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-column">Välj minst \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-plur-row">Välj minst \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-column">Välj minst \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-atLeast-sing-row">Välj minst \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-column">Välj högst \$\(count\) svar för detta kort \(du har valt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-plur-row">Välj högst \$\(count\) svar för detta kort \(du har valt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-column">Välj högst \$\(count\) svar för detta kort \(du har valt \$\(actual\)\).</res>
  <res label="sys_check-error-atMost-sing-row">Välj högst \$\(count\) svar för detta kort \(du har valt \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-column">Välj exakt \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-plur-row">Välj exakt \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-column">Välj exakt \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>
  <res label="sys_check-error-exactly-sing-row">Välj exakt \$\(count\) svar för detta kort \(du valde \$\(actual\)\).</res>`;

let ressliderSW = `  <res label="sys_noAnswerSelected">Skjut reglaget för att betygsätta ditt svar.</res>
  <res label="sys_notWhole">Dra i skjutreglaget för att betygsätta ditt svar.</res>`;

let resbuttonratingSW = `  <res label="sys_notWhole">Välj ett svar.</res>`;



let formattingSnippets = [
["maxDiffTemplate", maxdiffIndices, "MaxDiff - Indices Method Template"],
["conjointTemplate", conjoint, "Conjoint Template"],
["res.buttonSW", resbuttonSW, "SWEDISH - button resource tags template"],
["res.cardsortSW", rescardsortSW, "SWEDISH - card sort resource tags template"],
["res.sliderSW", ressliderSW, "SWEDISH - slider resource tags template"],
["res.buttonratingSW", resbuttonratingSW, "SWEDISH - button rating resource tags template"],
["res.buttonPL", resbuttonPL, "POLISH - button resource tags template"],
["res.cardsortPL", rescardsortPL, "POLISH - card sort resource tags template"],
["res.sliderPL", ressliderPL, "POLISH - slider resource tags template"],
["res.buttonratingPL", resbuttonratingPL, "POLISH - button rating resource tags template"],
["res.buttonNO", resbuttonNO, "NORWEGIAN - button resource tags template"],
["res.cardsortNO", rescardsortNO, "NORWEGIAN - card sort resource tags template"],
["res.sliderNO", ressliderNO, "NORWEGIAN - slider resource tags template"],
["res.buttonratingNO", resbuttonratingNO, "NORWEGIAN - button rating resource tags template"],
["res.buttonFI", resbuttonFI, "FINISH - button resource tags template"],
["res.cardsortFI", rescardsortFI, "FINISH - card sort resource tags template"],
["res.sliderFI", ressliderFI, "FINISH - slider resource tags template"],
["res.buttonratingFI", resbuttonratingFI, "FINISH - button rating resource tags template"],
["res.buttonNL", resbuttonNL, "DUTCH - button resource tags template"],
["res.cardsortNL", rescardsortNL, "DUTCH - card sort resource tags template"],
["res.sliderNL", ressliderNL, "DUTCH - slider resource tags template"],
["res.buttonratingNL", resbuttonratingNL, "DUTCH - button rating resource tags template"],
["res.buttonDK", resbuttonDK, "DANISH - button resource tags template"],
["res.cardsortDK", rescardsortDK, "DANISH - card sort resource tags template"],
["res.sliderDK", ressliderDK, "DANISH - slider resource tags template"],
["res.buttonratingDK", resbuttonratingDK, "DANISH - button rating resource tags template"],
["res.buttonIT", resbuttonIT, "ITALIAN - button resource tags template"],
["res.cardsortIT", rescardsortIT, "ITALIAN - card sort resource tags template"],
["res.sliderIT", ressliderIT, "ITALIAN - slider resource tags template"],
["res.buttonratingIT", resbuttonratingIT, "ITALIAN - button rating resource tags template"],
["res.buttonES", resbuttonES, "SPAINISH - button resource tags template"],
["res.cardsortES", rescardsortES, "SPAINISH - card sort resource tags template"],
["res.sliderES", ressliderES, "SPAINISH - slider resource tags template"],
["res.buttonratingES", resbuttonratingES, "SPAINISH - button rating resource tags template"],
["res.buttonDE", resbuttonDE, "GERMAN - button resource tags template"],
["res.cardsortDE", rescardsortDE, "GERMAN - card sort resource tags template"],
["res.sliderDE", ressliderDE, "GERMAN - slider resource tags template"],
["res.buttonratingDE", resbuttonratingDE, "GERMAN - button rating resource tags template"],
["res.buttonFR", resbuttonFR, "FRENCH - button resource tags template"],
["res.cardsortFR", rescardsortFR, "FRENCH - card sort resource tags template"],
["res.sliderFR", ressliderFR, "FRENCH - slider resource tags template"],
["res.buttonratingFR", resbuttonratingFR, "FRENCH - button rating resource tags template"],
["groupElementPython", groupRow, "Group Rows Function, uses python to group rows together."],
["limitNumber", limitNumberModule, "Limit Number Module, block number after the specified value.  \nDefault: Blocks 2 Numbers  \nNote: Ensure Question is a number question of the page as some survey disguise number question as text question on the survey page."],
["pagetime", timeallPages, "Adds a virtual float question which add a timespent value for all pages on the survey."],
["pagetimeblock", timeblock, "Adds a template block for calculating the timespent between a list of questions."],
["supportTagFR", frSupportTag, "Adds the support tag for the FR cluster."],
["removeAutoWidth", "ss\:questionClassNames=\"skipAutosize\"${0}", "Removes the auto width on grid type questions.  \nCan be optionally combined with surveyDisplay=\"desktop\" and ss:listDisplay=\"0\"."],
["zoomMobileMeta", zoomMobileMeta, "The script tag that will enable native zoom on mobile."],
["blockTranslation", blockTranslation, "The script tag that will block the auto translation of a page."],
["confidentialityblock", confidentialityblock, "The Level 1 confidentiality module.  \nNormally used on FR projects."],
["continueafter", continueAfter, "Continue After Exec, uses python to disable the continue button for a certain amount of time and then re-enables it.  \nSupport for multi languages are already included."],
["zoomImg", zoom, "My Zoom Module  \nAdd a zoom feature on click to all image with the class name of 'banner'."],
["emojifr", tempEmoji, "Adds the emoji exec element. Normally used on french projects."],
["frValidate", frvalidate, "Add the basic validation template used on my FR projects."],
["codepostalfr", codepostaltemp, "Code Postal for France Cluster (includes DOM term)"],
["codepostalfrbva", codepostaltemp + codepostalbva, "Code Postal BVA for France Cluster (includes DOM term)"],
["cdata", "<![CDATA[\n${0}\n]]>", "CDATA Tag"],
["br", "<br/><br/>${0}", "Two <br/> Tag"],
["br1", "<br/>${0}", "<br/> Tag"],
["exclu", "exclusive=\"1\" randomize=\"0\"${0}", "Exclusive and No Randomize attributes"],
["oe", "open=\"1\" openSize=\"25\" randomize=\"0\"${0}", "Open end textbox attributes"],
["exec", "<exec>\n${0}\n</exec>", "exec Tag"],
["when", "when=\"${1|survey,started,init,virtualInit,finished,returning,verified,virtual,flow,sqlTransfer,sqlTransferInit,submit,autosaveRestored|}\"${0}", "Used inside the \\\<exec\\\> attribute, defines how, where and when the exec is called"],
["pipe", "\[pipe: ${1:Q1}\]${0}", "xml pipe"],
["rel", "\[rel ${1:image.jpg}\]${0}", "rel pipe"],
["suspend", "<suspend/>\n${0}", "suspend/page break tag"],
["su", "<suspend/>\n${0}", "suspend/page break tag"],
["disabled", "disabled=\"${1:0}\"${0}", "Disable and hide the element in the survey"],
["randomize", "randomize=\"${1:0}\"${0}", "Shuffle the element within a \\\<block\\\> tag"],
["style", "style=\"${1}\"${0}", "Alternative search path for styles"],
["where", "where=\"${1|execute\\,survey\\,report,survey,report,summary,data,execute,none,notdp|}\"${0}", "The where attribute is used to control where the element should appear"],
["alt", "alt=\"${1}\"${0}", "The alt attribute allows you to specify an alternative short text for the element."],
["label", "label=\"${1}\"${0}", "The label attribute is the symbolic name for the element."],
["altlabel", "altlabel=\"${1}\"${0}", "The altlabel attribute is an alternative label that will be displayed in all other areas except from within the survey."],
["translateable", "translateable=\"${1:0}\"${0}", "The translateable attribute enables you to exclude elements from the translation file."],
["id", "id=\"${1}\"${0}", "The id attribute is used by xml surveys to uniquely identify each element."],
["res", "<res label=\"${1:sys_textNoAnswerSelected}\">${2}</res>${0}", "language resource tag"],
["builderCompatible", "builderCompatible=\"${1:0}\"${0}", "The builderCompatible attribute enables the use of the Survey Editor to edit the survey."],
["compat", "compat=\"${1:153}\"${0}", "The compat attribute controls what level of compatibility the survey is set to."],
["encryptData", "encryptData=\"${1:0}\"${0}", "The encryptData attribute controls whether open-end fields and partial data is encrypted."],
["extraVariables", "extraVariables=\"${1:source,record,decLang,list,userAgent}\"${0}", "The extraVariables attribute is a comma-separated list of strings that should be made acceptable variables in the survey."],
["fullService", "fullService=\"${1:0}\"${0}", "The fullService attribute controls edit access to the survey. If fullService=\"1\" is specified, then the survey is no longer editable."],
["lang", "lang=\"${1:french}\"${0}", "The lang attribute sets the survey's default language."],
["name", "name=\"${1:CountryCode_ProjectName}\"${0}", "The name attribute controls the name of your project that is visible in both the report and participant view."],
["otherLanguages", "otherLanguages=\"${1:german,english}\"${0}", "The otherLanguages attribute is a comma-separated list of other languages to present your survey in."],
["unusedLanguages", "unusedLanguages=\"${1:french,german}\"${0}", "The unusedLangauges attribute is used to set an available language as unused so that the simulated data requirement for completes in all languages can be ignored."],
["progressOnTop", "progressOnTop=\"${1:1}\"${0}", "Controls where the progress bar is displayed in the survey.\n If progressOnTop=\"0\" is specified, the progress bar will appear at the bottom (footer) of the page."],
["customCSS", "ss:customCSS=\"${1:customStyle}\"${0}", "Allows you to load one CSS file located in your project's static directory."],
["customJS", "ss:customJS=\"${1:customStyle}\"${0}", "Allows you to load one JS file located in your project's static directory."],
["hideProgressBar", "ss:hideProgressBar=\"${1:1}\"${0}", "Hides the progress bar."],
["includeCSS", "ss:includeCSS=\"${1:/survey/selfserve/9d3/proj1234/style1.css\,proj1235/style2.css}\"${0}", "Allows you to add a comma-separated list of CSS files to your project."],
["includeJS", "ss:includeJS=\"${1:/survey/selfserve/9d3/proj1234/script1.js\,proj1235/script2.js}\"${0}", "Allows you to add a comma-separated list of JavaScript files to your project."],
["includeLESS", "ss:includeLESS=\"${1:/survey/selfserve/9d3/p1234/style1.less\,/survey/selfserve/9d3/p1234/style2.less}\"${0}", "The ss\:includeLESS attribute enables you to load additional Less files into your survey. These files will take precedence over the project\'s theme and must be located in the same directory as the survey or in its parent directory within a static\/ directory."],
["logoFile ", "ss:logoFile=\"${1:selfserve/9d3/proj1234/logo.png}\"${0}", "Allows you to specify a path to a logo that will be shown in the survey."],
["logoPosition", "ss:logoPosition=\"${1|left,middle,right|}\"${0}", "Controls the logo's position in the survey."],
["logoAlt", "ss:logoAlt=\"${1:Logo}\"${0}", "Provides alternate text for participants with screen readers. Additionally\, the alternate text is displayed if the image cannot be shown (i.e., there is a missing resource)."],
["fir", "fir=\"${1|off,on|}\"${0}", "Overrides the standard form inputs (e.g. radios and checkboxes) with custom SVGs (Scalable Vector Graphics)."],
["firStyle", "firStyle=\"${1|square,rounded,scale,fontawesome|}\"${0}", "Choose a FIR style."],
["firSize", "firSize=\"${1|standard,small,large,20px|}\"${0}", "Specify the FIR image size."],
["firColors", "firColors=\"${1:\#c7c7c7,\#ffffff,\#c5d600,\#2bbdb9}\"${0}", "Select the FIR color palette\n4 valid HEX colors (comma\-separated)\nExample:\n\"#c7c7c7,#ffffff,#c5d600,#2bbdb9\"\n(border, base, hover, selected)"],
["listDisplay", "ss:listDisplay=\"${1:1}\"${0}", "Controls how one-column questions should appear.\nIf ss:listDisplay=\"1\" is specified\, then questions containing a single column will appear as lists instead of tables.\nIf ss:listDisplay=\"0\" is specified\, then questions containing a single column will appear as tables instead of lists unless the page has been mobile-optimized."],
["displayOnError", "displayOnError=\"${1|all,bad|}\"${0}", "The displayOnError attribute controls can be set to \"bad\" or \"all\" and controls which questions are displayed on a page if a validation error occurs. "],
["showNumber", "html:showNumber=\"${1:True}\"${0}", "The html:showNumber attribute is a boolean value that controls whether or not to show a number alongside each question see by the participant. Regardless of the labels provided, each question will be numbered starting with 1. (e.g., 1. What is..., 2. Please specify..., 3. Choose one of...)."],
["newVirtual", "newVirtual=\"${1:1}\"${0}", "If newVirtual=\"1\" is specified (default), then you can use the same syntax for <virtual> elements as you do for all other survey elements (e.g., Python code)."],
["pipeAltLabels", "pipeAltLabels=\"${1:1}\"${0}", "The pipeAltLabels attribute allows you to pipe question responses using the question's altlabel attribute instead of the label attribute."],
["uses", "uses=\"${1:fir.2}\"${0}", "The uses attribute allows you to specify global styles to apply across the entire survey."],
["allowDupe", "allowDupe=\"${1:1}\"${0}", "The allowDupe attribute allows you to control whether a participant can resubmit their results using the same UUID."],
["allowedCountries", "allowedCountries=\"${1:us,fr,de}\"${0}", "The allowedCountries attribute controls exactly which countries should be allowed to take the survey. Specify the allowed countries using their lower-case ISO 3166-1 alpha-2 country code"],
["alwaysSaveData", "alwaysSaveData=\"${1:1}\"${0}", "The alwaysSaveData attribute allows you to refine the functionality of the loadData attribute so that participant data is loaded upon page submission, rather than survey completion."],
["autosave", "autosave=\"${1:1}\"${0}", "The autosave attribute controls the ability to save a participant's state into a database file after every page."],
["autosaveKey", "autosaveKey=\"${1:ID}\"${0}", "The autosaveKey attribute allows you to create a variable to save a participant's progress by."],
["browserDupes", "browserDupes=\"${1|cookie,safe,strict|}\"${0}", "The browserDupes attribute can be set to \"cookie\", \"safe\", \"strict\", or \"\" (blank) and allows you to control how duplicates are checked."],
["closed", "closed=\"${1:1}\"${0}", "The closed attribute controls the status of the survey."],
["builder:cname", "builder:cname=\"${1:surveyd.bilendi.com}\"${0}", "The builder:cname attribute allows you to add a pre-configured CNAME to your survey."],
["fingerprint", "fingerprint=\"${1|none,all,etag,browser,flash,html5|}\"${0}", "The fingerprint attribute can be set to \"none\", \"all\", \"etag\", \"browser\", \"flash\", or \"html5\" and controls which variables are captured for fingerprinting participants."],
["forbiddenCountries", "forbiddenCountries=\"${1:us,fr,de}\"${0}", "The forbiddenCountries attribute controls which countries should be forbidden from taking the survey. Specify the forbidden countries using their lower-case ISO 3166-1 alpha-2 country code"],
["loadData", "loadData=\"${1:source}\"${0}", "The loadData attribute allows you to load a participant's data based on a variable so that they can modify their existing answers."],
["loggedInCanSubmit", "loggedInCanSubmit=\"${1:1}\"${0}", "The loggedInCanSubmit attribute enables staff members and logged-in users to submit data."],
["secure", "secure=\"${1:1}\"${0}", "The secure attribute is a boolean value that allows you to force participants to use HTTPS at all times when taking the survey."],
["setup", "setup=\"${1:term,quota,time,decLang}\"${0}", "The setup attribute is a comma-separated list of options to configure your project. This attribute accepts any of the following: quota, time, decLang and term."],
["disableBackButton", "ss:disableBackButton=\"${1:1}\"${0}", "The ss:disableBackButton attribute is a boolean value that controls whether the browser's \"Back\" button should be enabled for participants."],
["state", "state=\"${1|dev,testing,live,closed|}\"${0}", "The state attribute sets the survey status."],
["unique", "unique=\"${1|1,none,rows,rows\\,cols|}\"${0}", "The unique attribute is used to limit access to the survey."],
["uniqueOnly", "uniqueOnly=\"${1:1}\"${0}", "The uniqueOnly attribute is a boolean value that enables you to use the unique attribute mentioned above without the use of the invited.txt file."],
["enableNavigation ", "ss:enableNavigation=\"${1:1}\"${0}", "The ss:enableNavigation attribute is a boolean value that enables you to add a \"Back\" button to the survey."],
["desktopNotAllowedMessage", "desktopNotAllowedMessage=\"${1:The device you are using is not allowed to take this survey.}\"${0}", "The desktopNotAllowedMessage attribute controls the message shown to participants who enter the survey on a desktop machine when desktops are not allowed."],
["deviceNotAllowedMessage", "deviceNotAllowedMessage=\"${1:The device you are using is not allowed to take this survey.}\"${0}", "The deviceNotAllowedMessage attribute controls the message shown to participants who enter the survey on a device that is not allowed to take the survey."],
["featurephoneNotAllowedMessage", "featurephoneNotAllowedMessage=\"${1:The device you are using is not allowed to take this survey.}\"${0}", "The featurephoneNotAllowedMessage attribute controls the message shown to participants who enter the survey on a featurephone when featurephones are not allowed."],
["mobile", "mobile=\"${1|none,compat,mobileOnly,noMobile|}\"${0}", "The mobile attribute allows you to configure the mobile compatibility for your project."],
["mobileDevices", "mobileDevices=\"${1|smartphone,tablet,featurephone,mobile,desktop|}\"${0}", "The mobileDevices attribute allows you to specify which mobile devices are allowed into the survey."],
["mobileOnlyMessage", "mobileOnlyMessage=\"${1:Please come back using your mobile device.}\"${0}", "The mobileOnlyMessage attribute controls the message shown to participants who enter the survey on a desktop machine for a mobile=\"mobileOnly\" survey."],
["noMobileMessage", "noMobileMessage=\"${1:Please come back using a computer.}\"${0}", "The noMobileMessage attribute controls the message shown to participants who enter the survey on a mobile device for a mobile=\"noMobile\" survey."],
["smartphoneNotAllowedMessage", "smartphoneNotAllowedMessage=\"${1:The device you are using is not allowed to take this survey.}\"${0}", "The smartphoneNotAllowedMessage attribute controls the message shown to participants who enter the survey on a smartphone device when smartphones are not allowed."],
["disableOfflineDetection", "ss:disableOfflineDetection=\"${1:1}\"${0}", "The ss:disableOfflineDetection attribute allows you to disable the connectivity warning shown to smartphone devices when the connection has been interrupted."],
["tabletNotAllowedMessage", "tabletNotAllowedMessage=\"${1:The device you are using is not allowed to take this survey.}\"${0}", "The tabletNotAllowedMessage attribute controls the message shown to participants who enter the survey on a tablet device when tablets are not allowed."],
["surveyDisplay", "surveyDisplay=\"${1|auto,desktop,mobile,none|}\"${0}", "The surveyDisplay attribute controls how responsive the survey layout is based on the display size of the device being used."],
["agents", "agents=\"${1|normal,full,none|}\"${0}", "The agents attribute controls the operating system (vos) and browser version (vbrowser) virtual questions generated automatically in the report. It can be set to \"normal\", \"full\" or \"none\"."],
["autoRecover", "autoRecover=\"${1:1}\"${0}", "The autoRecover attribute is a boolean value that controls automatic data collection for partial participants."],
["adim", "adim=\"${1|rows,cols,choices,auto|}\"${0}", "The adim attribute controls the primary dimension displayed in the report."],
["aggregate", "<aggregate>\n${0}\n</aggregate>", "The aggregate attribute is for virtual questions. It allows you to perform calculations on the data derived from other questions."],
["averages  ", "averages=\"${1|none,rows,cols,choices,nosummary,summary|}\"${0}", "The averages attribute controls which averages are calculated for the question. The acceptable value is a comma-separated set containing rows, cols, choices or nosummary."],
["below", "below=\"${1:Q1}\"${0}", "The below attribute allows you to group questions together vertically. The number of columns must be the same to use the below attribute."],
["blankIfZero", "blankIfZero=\"${1:1}\"${0}", "The blankIfZero attribute is only applicable to \\\<checkbox\\\> elements and will change 0 data to blanks."],
["blankValue", "blankValue=\"${1:No Data}\"${0}", "The blankValue attribute allows you to set the value for blank data."],
["choiceCond", "choiceCond=\"${1:Q1.rows\[choice.index\]}\"${0}", "The choiceCond attribute allows you to specify condition logic that will show or hide each \\\<choice\\\> element."],
["choiceGroups", "choiceGroups=\"${1|report,survey,restrict|}\"${0}", "The choiceGroups attribute allows you to specify where the \\\<group\\\> element associated with each choice will appear."],
["choiceShuffle", "choiceShuffle=\"${1|flip,rflip,rotate,rrotate|}\"${0}", "The choiceShuffle attribute allows you to specify the randomization order of \\\<choice\\\> elements."],
["colCond", "colCond=\"${1:Q1.cols\[col.index\]}\"${0}", "The colCond attribute allows you to specify condition logic that will show or hide each \\\<col\\\> element."],
["colGroups", "colGroups=\"${1|report,survey,restrict|}\"${0}", "The colGroups attribute allows you to specify where the \\\<group\\\> element associated with each column appears."],
["colLegendAtribute", "colLegend=\"${1|none,both,top,bottom,group,beforeGroup|}\"${0}", "The colLegend attribute allows you to specify the placement of the column legend."],
["colLegendRows", "colLegendRows=\"${1:4,7,9}\"${0}", "The colLegendRows attribute allows you to specify additional locations of the column legend."],
["colShuffle", "colShuffle=\"${1|flip,rflip,rotate,rrotate|}\"${0}", "The colShuffle attribute allows you to specify the randomization order of \\\<col\\\> elements."],
["cond", "cond=\"${1:Q1.r1}\"${0}", "The cond attribute allows you to specify a Python expression that must evaluate to \"True\" in order for the question to be displayed."],
["mobileTabletOnly", "cond=\"\(gv.request.device.isSmartphone\(\) or gv.request.device.isTablet\(\)\)\"${0}", "This condition attribute display the corresponding for only mobile and tablets devices."],
["comment", "<comment>${1|Only one answer possible,Multiple answers possible|}</comment>${0}", "The comment attribute allows you to specify additional text to display beneath the question's title attribute. This is the English version"],
["commentfr", "<comment>${1|Une seule réponse possible,Plusieurs réponses possibles|}</comment>${0}", "The comment attribute allows you to specify additional text to display beneath the question's title attribute. This is the French version"],
["commentde", "<comment>${1|Nur eine Antwort möglich,Mehrere Antworten möglich|}</comment>${0}", "The comment attribute allows you to specify additional text to display beneath the question's title attribute. This is the German version"],
["commentit", "<comment>${1|Una sola risposta possibile,Sono possibili più risposte|}</comment>${0}", "The comment attribute allows you to specify additional text to display beneath the question's title attribute. This is the Italian version"],
["commentes", "<comment>${1|Una sola respuesta posible,Múltiples respuestas posibles|}</comment>${0}", "The comment attribute allows you to specify additional text to display beneath the question's title attribute. This is the Spanish version"],
["commentnl", "<comment>${1|Eén antwoord mogelijk,Meerdere antwoorden mogelijk|}</comment>${0}", "The comment attribute allows you to specify additional text to display beneath the question's title attribute. This is the Dutch version"],
["datasourceBase", "<datasource label=\"${1:db1}\" title=\"${2:db name}\" filename=\"${3:filename.txt}\" ourKey=\"${4:source}\" datasourceKey=\"${5:codeid}\" normalizeKey=\"${6|none,lower|}\">\n${0}\n</datasource>", "The \\\<datasource\\\> element is a survey builder-friendly way of merging external data from a tab-delimited file into your survey."],
["filename", "filename=\"${1:include.dat}\"${0}", "The filename attribute should be set to the name of the tab-delimited file to pull data from."],
["titleAttribute", "title=\"${1:database description}\"${0}", "Title attribute"],
["ourKey", "ourKey=\"${1:id}\"${0}", "The ourKey attribute should be set to the survey variable that uniquely identifies the participants entering the survey (e.g. uuid,source, id, respID, etc...)."],
["datasourceKey", "datasourceKey=\"${1:codeid}\"${0}", "The datasourceKey attribute should be set to a column name found in the tab-delimited file that uniquely identifies each row of the data."],
["normalizeKey", "normalizeKey=\"${1|none,lower|}\"${0}", "If normalizeKey=\"lower\" is specified, then the values for both attributes, ourKey and datasourceKey, will be transformed into lowercase before being compared."],
["surveyattribute", "survey=\"${1:selfserve/9d3/proj1234}\"${0}", "The survey attribute enables you to pull data from an existing survey's dataset. This attribute is used mostly by the survey builder and the targeted survey's dataset will automatically get pulled into the project."],
["dataSource", "dataSource=\"${1:dbsourceName}\"${0}", "The dataSource attribute is applied to question elements to reference the correct \\\<datasource\\\> element."],
["dataRef", "dataRef=\"${1:datafromDB}\"${0}", "The dataRef attribute should be set to the column name of the data that should be pulled in for a specific variable."],
["dataValue", "dataValue=\"${1:dataValueFromDB}\"${0}", "The dataValue attribute, when used in conjunction with dataSource and dataRef, can force a radio question to populate even when the data in the tab file is not coded based on index (or even numerically)."],
["groupDepth", "groupDepth=\"${1:1}\"${0}", "The groupDepth attribute controls how the question's \\\<row\\\> elements are displayed to the participant."],
["grouping", "grouping=\"${1|rows,cols,auto|}\"${0}", "The grouping attribute controls how the question's \\\<row\\\> and \\\<column\\\> elements are grouped."],
["horizontalPercentages", "horizontalPercentages=\"${1:1}\"${0}", "The horizontalPercentages attribute allows you to toggle the direction from where the question's base is calculated."],
["keepWith", "keepWith=\"${1:Q1}\"${0}", "The attribute keepWith allows you to display questions on the same page together even after an error has occurred."],
["noTranslate", "noTranslate=\"${1}\"${0}", "The noTranslate attribute allows you to disable translations for specific values. This can be helpful when you only need to translate certain parts of a virtual or hidden question (e.g., when piping only row content to the survey from a virtual question)."],
["open", "open=\"${1|1,default,left,right|}\"${0}", "The open attribute allows you to control the placement of the open-ended input field for rows that have open=\"1\" specified."],
["optional", "optional=\"${1:1}\"${0}", "The optional attribute allows you to specify whether or not a participant must provide a response to the question."],
["pii", "pii=\"${1:0}\"${0}", "The pii attribute allows you to set the personally identifiable information (PII) protection level (0-9999, inclusive) to restrict data access."],
["ratingDirection", "ratingDirection=\"${1:reverse}\"${0}", "The ratingDirection attribute allows you to specify the direction of the scale for any type=\"rating\" question."],
["rightOf", "rightOf=\"${1:Q1}\"${0}", "The attribute rightOf allows you to group questions together horizontally. The number of rows must be the same to use the rightOf attribute."],
["rowCond", "rowCond=\"${1:Q1.rows[row.index]}\"${0}", "The rowCond attribute allows you to specify condition logic that will show or hide each \\\<row\\\> element."],
["rowGroups", "rowGroups=\"${1|report,survey,restrict|}\"${0}", "The rowGroups attribute allows you to specify where the \\\<group\\\> element associated with each row appear."],
["rowLegend", "rowLegend=\"${1|default,both,right,left|}\"${0}", "The rowLegend attribute allows you to specify how the row legends are displayed."],
["rightLegend", "rightLegend=\"${1:rightColName}\"${0}", "The rightLegend attribute on a per-row basis specifies alternative text for the right row legend."],
["rowShuffle", "rowShuffle=\"${1|flip,rflip,rotate,rrotate|}\"${0}", "The rowShuffle attribute allows you to specify the randomization order of \\\<row\\\> elements."],
["showSource", "showSource=\"${1:1}\"${0}", "The showSource attribute allows you to view the source code of the question."],
["shuffle", "shuffle=\"${1|none,rows,cols,rows\\,cols,choices,groups,rows\\,groups,cols\\,groups,choices\\,groups,rows\\,only_groups,cols\\,only_groups,choices\\,only_groups|}\"${0}", "The shuffle attribute allows you to specify which of the question's elements to randomize."],
["shuffleBy", "shuffleBy=\"${1:Q1}\"${0}", "The shuffleBy attribute allows you to specify another question's label to randomize the current question's elements by."],
["sort", "sort=\"${1|none,rows,cols,choices,desc,asc,percentages|}\"${0}", "The sort attribute allows you to specify the sort order of the results in the report. If sort=\"rows,percentages,desc\" is specified, the order of the results will be sorted based on the row's percentage values instead of the count values and in descending order. If sort=\"choices,asc\" is specified, the question's choices will be sorted based on the count values in ascending order."],
["sortChoices", "sortChoices=\"${1|none,asc,desc,survey,report|}\"${0}", "The sortChoices attribute allows you to specify the order in which to display the <choice> elements. If sortChoices=\"asc,report,survey\" is specified, the choices will appear sorted alphabetically in ascending order for both the report and survey view of the question."],
["sortCols", "sortCols=\"${1|none,asc,desc,survey,report|}\"${0}", "The sortCols attribute allows you to specify the order in which to display the \\\<col\\\> elements. If sortCols=\"desc,report,survey\" is specified, the columns will appear sorted alphabetically in descending order for both the report and survey view of the question."],
["sortRows", "sortRows=\"${1|none,asc,desc,survey,report|}\"${0}", "The sortRows attribute allows you to specify the order in which to display the \\\<row\\\> elements. If sortRows=\"asc,survey\" is specified, the rows will appear sorted alphabetically in ascending order in the survey view of the question."],
["sst", "sst=\"${1:0}\"${0}", "The sst attribute enables you to prevent the survey stress tester from testing the element. When sst=\"0\" is set, the simulated data system will ignore the element."],
["title", "<title>${1:Title Text}</title>${0}", "The title attribute is required for all question elements and can be seen in both the report and survey view."],
["type", "type=\"${1|none,rating|}\"${0}", "The type attribute is used to affect the report output for rating questions."],
["value", "value=\"${1:1}\"${0}", "Adds a data value to the question's \\\<row\\\>, \\\<col\\\>, or \\\<choice\\\> elements."],
["values", "values=\"${1|none,order,1\,2\,3|}\"${0}", "The values attribute allows you to override the default data values of the question's <row>, <col>, or <choice> elements. If values=\"order\" is specified, the data values for each element will correspond to the order in which it sits."],
["virtual", "<virtual>\n${1}\n</virtual>${0}", "The virtual attribute allows you to evaluate Python expressions each time the report is run."],
["tv", "tv=\"${1|auto,off,force,record|}\"${0}", "The tv attribute applies to surveys with trackVars=\"checkbox\" specified and enables you to control how trackVars (tv) works at the question level."],
["openSize", "openSize=\"${1:25}\"${0}", "The openSize attribute controls the precise visible size of the open-ended input field."],
["group", "<group label=\"${1:g1}\" builder:axis=\"${2|row,col,choice|}\">${3:GroupName}</group>${0}", "The groups attribute attaches the element to one or more groups."],
["groups", "groups=\"${1:g1}\"${0}", "The \"groups\" attribute is used to link rows,cols or choices to the group tag."],
["groupdefault", "<group label=\"g0\" builder:axis=\"${1|row,col,choice|}\" builder:default=\"1\" where=\"none\">no group</group>${0}", "This is the default attribute group used to provide support for the group attribute on the suvery builder."],
["exclusive", "exclusive=\"${1:1}\"${0}", "The exclusive attribute controls whether an element can be selected with other elements."],
["percentages", "percentages=\"${1:1}\"${0}", "The percentages attribute controls the display of percentages for the element."],
["range", "range=\"${1:1,2,5-8}\"${0}", "The range attribute sets a range of acceptable values for an element within a \\\<number\\\> question."],
["okUnique", "okUnique=\"${1:1}\"${0}", "The okUnique attribute allows you to break the unique=\"1\" rule specified for the question."],
["openOptional", "openOptional=\"${1:1}\"${0}", "The openOptional attribute controls the necessity to provide an open-ended response for a selected item."],
["colLegend", "colLegend=\"${1:1}\"${0}", "The colLegend attribute controls the placement of additional column legends. If colLegend=\"1\" is specified on an element, then a column legend will be repeated just before the element."],
["extraError", "extraError=\"${1:0}\"${0}", "The extraError attribute controls the error message shown if open-ended data is provided for an element without having selected the element. If extraError=\"0\" is specified, then a participant may provide open-ended data for an element without selecting the element."],
["amount", "amount=\"${1:100}\"${0}", "The amount attribute forces a participant to provide a numeric value totalling to the amount provided for the entire \\\<row\\\> or \\\<col\\\>."],
["size", "size=\"${1:50}\"${0}", "The size attribute controls the input size of a \\\<text\\\> or \\\<number\\\> element. Use the size attribute to individually modify the size for element input fields shown to the participant."],
["builder:axis", "builder:axis=\"${1|row,col,choice|}\"${0}", "The builder:axis attribute can be set to \"row\", \"col\" or \"choice\" and is automatically added by the Survey Editor to indicate to which dimension the \\\<group\\\> element belongs."],
["checkbox", "<checkbox label=\"${1:Q1}\" atleast=\"1\">\n${0}\n</checkbox>\n<suspend/>", "The \\\<checkbox\\\> element represents the only multiple-selection question type available."],
["atleast", "atleast=\"${1:1}\"${0}", "The atleast attribute is an integer value that controls the minimum number of selections that must be selected in order to continue."],
["atmost", "atmost=\"${1:1}\"${0}", "The atmost attribute is an integer value that controls the maximum number of selections that must be selected in order to continue."],
["exactly", "exactly=\"${1:1}\"${0}", "The exactly attribute is an integer value that controls the total number of selections that must be selected in order to continue."],
["pipeMultiple", "pipeMultiple=\"${1:r1}\"${0}", "The pipeMultiple attribute applies to single-dimension \\\<checkbox\\\> questions containing only \\\<row\\\> elements."],
["groupRestrict", "groupRestrict=\"${1|none,cols|}\"${0}", "The groupRestrict attribute can be set to \"none\" or \"cols\". By default, groupRestrict=\"none\" is specified.\nIf groupRestrict=\"cols\" is specified, then each column element must belong to a \\\<group\\\> element and the question's checkbox inputs are transformed into radio inputs, allowing only one selection per group."],
["trackHiddenCheckbox", "trackHiddenCheckbox=\"${1|off,on|}\"${0}", "The trackHiddenCheckbox attribute can be set to \"on\" or \"off\" for each hidden checkbox element.\nBy default, trackHiddenCheckbox=\"on\" is specified for all surveys with delphi=\"1\"."],
["float", "<float label=\"${1:Q1}\" optional=\"0\">\n${0}\n</float>", "The \\\<float\\\> element is an open-ended question type that accepts negative and positive floating point values."],
["number", "<number label=\"${1:Q1}\" size=\"${2:10}\" optional=\"0\">\n${0}\n</number>", "The \\\<number\\\> element is a question type that accepts only positive numerical input."],
["points", "points=\"${1:100}\"${0}", "If the size attribute is set to a number greater than 0, then the points attribute will not do anything. However, if size=\"0\" is specified or the attribute isn't included at all, then the points attribute will create a drop down list of numbers (starting at 0) up to the value provided."],
["ignoreValues", "ignoreValues=\"${1:999}\"${0}", "The ignoreValues attribute is an integer value that controls which numerical responses should not be counted towards the question's standard deviation and average calculations in the report."],
["verify", "verify=\"${1|range\(0\\,99\),email,zipcode,zipcodeExt,digits,number,phoneUS,len\(5\\,10\),daterange(yyyy\/mm\/dd\\, today\\, any),daterange(mm\/dd\/yyyy\\, 01\/01\/2019\\, today),daterange(dd\/mm\/yyyy\\, 10\/02\/2019\\, 10\/16\/2019)|}\"${0}", "The verify attribute controls which Data Verifier to use."],
["note", "<note>${1:COMMENT}</note>${0}", "The \\\<note\\\> element can be used to leave notes in a survey that are only displayed in the survey builder and the code itself."],
["radio", "<radio label=\"${1:Q1}\" optional=\"0\">\n${0}\n</radio>", "The \\\<radio\\\> element is a single select question type that allows selections to be made from a list of items."],
["select", "<select label=\"${1:Q1}\" optional=\"0\">\n${0}\n</select>", "The \\\<select\\\> element is a single select question type that allows selections to be made from a dropdown list of items."],
["minRanks", "minRanks=\"${1:1}\"${0}", "The minRanks attribute is an integer value that sets the minimum number of rankings (selections) to be made."],
["text", "<text label=\"${1:Q1}\" optional=\"0\" size=\"25\">\n${0}\n</text>", "The \\\<text\\\> element is an open-ended question type that gathers text input from participants such as descriptions, name, email, zip code, etc..."],
["textarea", "<textarea label=\"${1:Q1}\" height=\"10\" optional=\"0\" width=\"50\">\n${0}\n</textarea>", "The \\\<textarea\\\> element is an open-ended question type that gathers text input from participants. In contrast to the \\\<text\\\> element, the <textarea> element produces a multi-line input box."],
["width", "width=\"${1:10}\"${0}", "The width attribute is an integer value that controls the overall width of the \\\<textarea\\\> element."],
["height", "height=\"${1:50}\"${0}", "The height attribute is an integer value that controls the overall width of the \\\<textarea\\\> element."],
["choice", "<choice label=\"${1:ch1}\">${2:choiceText}</choice>${0}", "The \\\<choice\\\> element belongs only to the \\\<select\\\> question type."],
["col", "<col label=\"${1:c1}\">${2:colText}</col>${0}", "The \\\<col\\\> element can be added to any question type to create column headers and expand the number of selections available in a question."],
["row", "<row label=\"${1:r1}\">${2:rowText}</row>${0}", "The \\\<row\\\> element can be added to any question type to expand the number selections available in a question."],
["noanswer", "<noanswer label=\"${1:r99}\">${2:Prefer not to say}</noanswer>${0}", "The <noanswer> element can be added to any question to create a \"not applicable\" response option."],
["radioAttribute", "radio=\"${1:1}\"${0}", "The radio attribute is a boolean value that forces the entire column to use radio inputs instead of checkboxes."],
["favorite", "favorite =\"${1:1}\"${0}", "The favorite attribute is a boolean value that adds special functionality to an entire column."],
["legend", "legend=\"${1|default,right,both,none|}\"${0}", "The legend attribute can be set to \"default\", \"right\", \"both\" or \"none\" to control which side the row's legend text is presented."],
["block", "<block label=\"${1:b1}\" builder:title=\"${2:block name}\">\n<suspend/>\n${0}\n<suspend/>\n</block>", "The <block> tag is a great way to create sections in your survey. If you have a large number of questions that should be seen by the same type of participants, instead of writing a condition on each question, you can wrap the questions in a <block> with the condition."],
["randomizeChildren", "randomizeChildren=\"${1:1}\"${0}", "The randomizeChildren attribute is a boolean value used to randomize the contents of the block."],
["count", "count=\"${1:1}\"${0}", "The count attribute is an integer value corresponding to the number of children elements to show in a block."],
["condition", "<condition label=\"${1:conditionLabel}\" cond=\"${2:Q1.r1}\">${3:Condition Text}</condition>${0}", "The \\\<condition\\\> element enables you to declare a named condition. Instead of rewriting condition logic across your entire survey, you can use the \\\<condition\\\> element to write it once and then refer to the condition using the element's label."],
["define", "<define label=\"${1:d1}\" builder:title=\"${2:Brand list 1}\" builderHint=\"{&quot;unlinked&quot;:[]}\">\n${0}\n</define>", "The Reusable Answer List element allows you to save the response options you create within one survey element for use in other elements."],
["insert", "<insert source=\"${1:d1}\"/>${0}", "The \\\<insert\\\> tag is used to display the rows of an answerlist"],
["as", "as=\"${1|ienum,rows,cols,choices|}\"${0}", "the cell type to non-group cells as. Used to convert the rows of the answerlist. \nUsed inside the insert tag."],
["exclude", "exclude=\"${1:r1}\"${0}", "The list of cell labels to exclude. \nUsed inside the insert tag."],
["strip", "strip=\"${1|off,on|}\"${0}", "The list of attributes to strip from the expanded cells. \nUsed inside the insert tag."],
["exitmsg", "<exit cond=\"${1|qualifed,terminated,overquota|}\">${2:Thank you for taking our survey.}</exit>${0}", "The \\\<exit\\\> element determines what happens when a participant finishes the survey.\nDisplay a Message"],
["exit", "<exit cond=\"${1|qualifed,terminated,overquota|}\" url=\"${2:someRedirectLink}\"/>${0}", "The \\\<exit\\\> element determines what happens when a participant finishes the survey.\nRedirect to a URL"],
["exitredirect", "<exit cond=\"${1|qualifed,terminated,overquota|}\" url=\"${2:someRedirectLink}\">${3:Exit Message after the redirect}</exit>${0}", "The \\\<exit\\\> element determines what happens when a participant finishes the survey.\nDisplay a Message Before Redirecting to a URL"],
["timeout", "timeout=\"${1:5}\"${0}", "The timeout attribute is used on the exit element to wait for some time before going to a redirect link"],
["url", "url=\"${1:SomeLink}\"${0}", "The url attribute is used to store a https link"],
["finish", "<finish ${1:now=\"1\"}/>${0}", "The \\\<finish\\\> element can be used to prematurely stop a survey."],
["now", "now=\"${1:1}\"${0}", "The now attribute is a boolean value that controls when to end the survey."],
["goto", "<goto target=\"${1:term}\" cond=\"${2:Q1.r1}\"/>${0}", "The \\\<goto\\\> element forces the execution of the survey to continue elsewhere."],
["target", "target=\"${1:Q1.r1}\"${0}", "The label of the element to which to jump."],
["html", "<html label=\"${1:intro1}\" where=\"survey\">${0}</html>", "The \\\<html\\\> element is sometimes referred to as a survey comment and is used to display text or HTML in your survey."],
["htmlexternal", "<html label=\"${1:intro1Exter}\" source=\"${2:page.html}\" where=\"survey\"/>", "The \\\<html\\\> element is sometimes referred to as a survey comment and is used to display text or HTML in your survey. \nExternal HTML page variant."],
["htmllock", "<html label=\"${1:htmlfinal1}\" final=\"1\" cond=\"${2:Q1.r2}\">${3:HTML Text}</html>${0}", "The \\\<html\\\> element is sometimes referred to as a survey comment and is used to display text or HTML in your survey. \nForce HTML complete page variant."],
["final", "final=\"${1:1}\"${0}", "The final attribute can be used to end the survey immediately without saving the participant\'s data."],
["loop", "<loop label=\"${1:loopName}\" vars=\"${2:var1}\">\n\t<block label=\"${3:blocLoopName}\">\n\t\t\<suspend\/\>\n${0}\n\t\t\<suspend\/\>\n\t</block>\n</loop>", "The \\\<loop\\\> element is used to cycle through a series of survey elements."],
["looprow", "<looprow label=\"${1:1}\">${2}</looprow>${0}", "The \\\<looprow\\\> element is used to create an iteration in the loop."],
["loopvar", "<loopvar name=\"${1:var1}\">${2}</loopvar>${0}", "The \\\<loopvar\\\> element is used to create add a variable in the looprow."],
["looppipe", "[loopvar: ${1|label,var1,var2,var3|}]${0}", "The loopvar pipe syntax is used inside the loop question to differentiate between looprows."],
["pipetag", "<pipe label=\"${1:pipeLabel}\" ${2:capture=\"labelInReport\"} title=${3:\"titleText\"}>${0}</pipe>", "The <pipe> element is used to display information conditionally. \nTag Version"],
["pipedetail", "[pipe: ${1:Q1}${2| lower, upper, title, capitalize|}]${0}", "The [pipe : QuestionName] element is used to display information conditionally. \nInline Version"],
["case", "<case label=\"${1:case1}\" cond=\"${2:Q1.r1}\">${2: Some Text}</case>${0}", "The <case> element refer to a row inside a <pipe> element that you can pipe conditions to."],
["capture", "capture=\"${1|textInReport|}\"${0}", "The capture attribute overrides the default label for the auto-generated Single Select question that the <pipe> element produces."],
["quota", "<quota label=\"${1:quota1}\" overquota=\"noqual\" sheet=\"${2:quotasheetname}\"/>${0}", "The quota elements are often used by researchers to obtain a sample of participants that is statistically significant to the population that they are analyzing. They are also used to track and monitor the number of qualified completes in a survey."],
["overquota", "overquota=\"${1:Q1}\"${0}", "The overquota attribute enables you to go to another page after being overquota"],
["doit", "doit=\"${1:1}\"${0}", "The doit=1 attribute enables you In order to force the quota system to allow \"cross-table markers\"."],
["quotacellscheck", "<exec>\n${0}cells = gv.survey.root.quota.getQuotaCells()\ncurrent, limit, overquota = cells[\"/general/Male\"]\n</exec>", "quota Code to check if a quota cell is full or not."],
["term", "<term label=\"${1:te1}\" cond=\"${2:Q1.r1}\">${3:Term Text}</term>\n\n<suspend/>${0}", "The <term> element is used to terminate participants. Use the cond attribute to create condition logic that will terminate participants if evaluated to True."],
["termSpeeder", "<term label=\"speedcheck\" cond=\"timeSpent\(\) \&lt\; 60 and not(gv.isSST())\" markers=\"speeder\">Speeder \(60 secondes\)<\/term>\n\n<suspend\/>${0}", "The <term> element with the marker 'speeder' is used to terminate participants who has completed the link before the specified time for the speeder."],
["markers", "markers=\"${1:qual}\"${0}", "The makers attribute enables you to set additional markers when terminating the participant. \nUsed inside <term> element."],
["marker", "<marker name=\"${1:my_marker}\" cond=\"${2:Q1.r1}\"/>${0}", "The <marker> element is used to set markers in a survey. Setting a marker using the <marker> element is equivalent to using the setMarker function in an <exec> element."],
["samplesources", "<samplesources>\n${0}\n</samplesources>", "The \\\<samplesources\\\> tag is the parent element within which all of the survey's participant sources are nested using separate \\\<samplesource\\\> tags."],
["samplesource", "<samplesource list=\"${1:1}\">${0}</samplesource>", "A survey's participant sources determine how participants get into the survey and to where they are directed to upon survey completion. \nOnce added, participant sources can be customized to meet the specific needs of a project."],
["disableBrowserDupes", "disableBrowserDupes=\"${1:1}\"${0}", "When disableBrowserDupes=\"1\" is enable on a specific participant's source, it will override the \"browserDupes\" setting specified in the \\\<survey\\\> tag and allow participants to take the survey multiple times."],
["required", "required=\"${1:1}\"${0}", "A required variable must be present in the survey link in order for a participant to enter and take the survey."],
["var", "<var name=\"${1:ID}\" ${2|unique=\"1\",required=\"1\"|}/>${0}", "To add a URL variable to a participant source, add a nested \\\<var/\\\> tag with that variable within the desired source's \\\<samplesource\\\> tag, as shown below. The \\\<var/\\\> tag is self-closing and requires a name attribute which will be appended to the Survey URL."],
["invalid", "<invalid>${1:You are missing information in the URL. Please verify the URL with the original invite.}</invalid>${0}", "Invalid link error message for samplesource"],
["inuse", "<inuse>${1:Our records show that you are already taking this survey. If that is not correct, please wait 15 minutes and refresh this page. Thank you.}</inuse>${0}", "Inuse link error message for samplesource"],
["completed", "<completed>${1:It seems you have already entered this survey.}</completed>${0}", "Already completed link error message for samplesource"],
["css", "<style name=\"question.after\"><![CDATA[\n<style type=\"text/css\">\n${0}\n</style>\n]]></style>", "css \"question.after\" style tag. \nUsed inside of the question."],
["cssg", "<style name=\"respview.client.css\" mode=\"after\"><![CDATA[\n<style type=\"text/css\">\n${0}\n</style>\n]]></style>", "css \"respview.client.css\" style tag. \nUsed outside of questions."],
["cssw", "<style name=\"respview.client.css\" mode=\"after\" with=\"${1:Q1}\"><![CDATA[\n<style type=\"text/css\">\n${0}\n</style>\n]]></style>", "css \"respview.client.css\" style tag with the \"with\" attribute. \nUsed outside of questions."],
["js", "<style name=\"question.after\" wrap=\"ready\"> <![CDATA[\n${0}\n]]></style>", "js \"question.after\" style tag. \nUsed inside of the question."],
["jsg", "<style name=\"respview.client.js\" mode=\"after\" wrap=\"ready\"> <![CDATA[\n${0}\n]]></style>", "js \"respview.client.js\" style tag. \nUsed outside of questions."],
["jsw", "<style name=\"respview.client.js\" mode=\"after\" wrap=\"ready\" with=\"${1:Q1}\"> <![CDATA[\n${0}\n]]></style>", "js \"respview.client.js\" style tag with the \"with\" attribute. \nUsed outside of questions."],
["samplesourceTemplate", "<samplesource list=\"${1:1}\">\n\t<title>${2:FR}</title>\n\t<invalid>You are missing information in the URL. Please verify the URL with the original invite.</invalid>\n\t<completed>It seems you have already entered this survey.</completed>\n\t<var name=\"ID\" unique=\"1\"/>${3}\n\t<exit cond=\"terminated and hasMarker('qual')\" url=\"https\:\/\/survey.maximiles.com\/quality\?p\=52634\&amp\;m\=\\\$\{ID\}\"/>\n\t<exit cond=\"terminated and hasMarker('speeder')\" url=\"https\:\/\/survey.maximiles.com\/speeder\?p\=52634\&amp\;m\=\\\$\{ID\}\"/>\n\t<exit cond=\"terminated\" url=\"https\:\/\/survey.maximiles.com\/screenout\?p\=52634_3140d5c1&amp\;m\=\\\$\{ID\}\"/>\n\t<exit cond=\"overquota\" url=\"https\:\/\/survey.maximiles.com\/quotasfull\?p\=52634_40b486c1\&amp\;m\=\\\$\{ID\}\"/>\n\t<exit cond=\"qualified\" url=\"https\:\/\/survey.maximiles.com\/complete\?p\=52634_8deebb31\&amp\;m\=\\\$\{ID\}\"/>\n</samplesource>${0}", "Samplesource Template"],
["base", baseTemp, "Project Base Template - Used on every start of a project. \nContains all disclaimers, a data clearing logic and a total quota"],
["survey", "<\?xml version=\"1.0\" encoding=\"UTF-8\"\?>\n<survey \n\talt=\"${1:Project Name}\"\n\tautosaveKey=\"ID\"\n\tbrowserDupes=\"safe\"\n\tbuilder:cname=\"surveyd.bilendi.com\"\n\tbuilder:wizardCompleted=\"1\"\n\tbuilderCompatible=\"1\"\n\tcompat=\"153\"\n\tdelphi=\"1\"\n\tdisplayOnError=\"all\"\n\textraVariables=\"source,record,decLang,list,userAgent\"\n\tfir=\"on\"\n\thtml:showNumber=\"0\"\n\tlang=\"${2:french}\"\n\tmobile=\"compat\"\n\tmobileDevices=\"smartphone,tablet,desktop\"\n\tname=\"Survey\"\n\totherLanguages=\"english\"\n\tsecure=\"1\"\n\tsetup=\"term,decLang,quota,time\"\n\tss:accordionDisplay=\"0\"\n\tss:disableBackButton=\"1\"\n\tss:enableNavigation=\"0\"\n\tss:hideProgressBar=\"0\"\n\tss:listDisplay=\"1\"\n\tss:logoAlt=\"\"\n\tss:logoFile=\"\"\n\tss:logoPosition=\"\"\n\tstate=\"testing\"\n\ttheme=\"${3|company/frozen-theme-frozen-them-1,company/mpz-red-and-green,company/interactive-it-version|}\">\n\n<samplesources>\n${0}\n</samplesources>\n<suspend/>\n\n<style cond=\"1\" name=\"survey.respview.footer.support\"><![CDATA[\n<div style=\"text-align: center;\"><a href=\"https://www.maximiles.fr/help/new\" target=\"_blank\" rel=\"noopener\">Support</a></div>\n]]></style></survey>", "Base Survey Template"],
["bariBase", "<style label=\"avoid_autocomplete\" mode=\"after\" name=\"survey.respview.footer\" wrap=\"ready\"><![CDATA[\n$ ('form').attr('autocomplete','off');\n$ ('.question').find('input').attr('autoComplete','off');\n$ ('.question').find('input').attr('onDrop','return false;');\n$ ('.question').find('input').attr('onpaste','return false;');\n$ ('.question').find('textarea').attr('autoComplete','off');\n$ ('.question').find('textarea').attr('onDrop','return false;');\n$ ('.question').find('textarea').attr('onpaste','return false;');\n]]></style>\n<suspend/>\n<logic label=\"lnDup\" oe_check:gibberishThreshold=\"82\" uses=\"oe_check.2\">\n\t<title>OE Flag</title></logic>\n<suspend/>${0}", "Bari Base Template: \nContains all bari js codes and duplicates check"],
["themes", "<themes>${0}</themes>", "The \\\<themes\\\> tag is used as a container which stores theme tags. \nThis tag is normally used when you want to add multiple themes in your project"],
["theme", "<theme cond=\"${1:list == \'1\'}\" name=\"${2:survey}\"/>${0}", "The \\\<theme\\\> tag is used to reference the theme you want to use. \n This tag is used inside of the \\\<themes\\\> tag."],
["stylevar", "<stylevar name=\"${1:cs:custom_stylevar}\" type=\"${2|int,string,res,bool|}\"/>${0}", "The \\\<stylevar\\\> tag is self-closing and requires two main attributes to be specified - the name for the style variable and its type."],
["showNumber", "html:showNumber=\"${1:1}\"${0}", "Show question numbers in the survey dom elements"],
["choiceClassNames", "ss:choiceClassNames=\"${1:choicename}\"${0}", "white space delimited set of CSS classnames to apply to the specified choice (select option)"],
["colClassNames", "ss:colClassNames=\"${1:colname}\"${0}", "white space delimited set of CSS classnames to apply to the specified col td elements"],
["colLegendHeight", "ss:colLegendHeight=\"${1:25px}\"${0}", "Set column legend heights"],
["colorScheme", "ss:colorScheme=\"${1}\"${0}", "	Survey color scheme"],
["colWidth", "ss:colWidth=\"${1:50px}\"${0}", "Set width of columns"],
["commentClassNames", "ss:commentClassNames=\"${1:commentname}\"${0}", "white space delimited set of CSS classnames to apply to the comment element"],
["groupClassNames", "ss:groupClassNames=\"${1:groupname}\"${0}", "white space delimited set of CSS classnames to apply to the specified group td elements"],
["legendColWidth", "ss:legendColWidth=\"${1:50px}\"${0}", "Set left/right legend"],
["postText", "ss:postText=\"${1:text}\"${0}", "Text following the text/number input"],
["preText", "ss:preText=\"${1:text}\"${0}", "	Text preceding the text/number input"],
["questionClassNames", "ss:questionClassNames=\"${1:questionname}\"${0}", "white space delimited set of CSS classnames to apply to the surveyQuestion element"],
["rowClassNames", "ss:rowClassNames=\"${1:rowname}\"${0}", "white space delimited set of CSS classnames to apply to the specified row td elements"],
["imagepipe", "\[image ${1:YOUR-IMAGE\.jpg}\]${0}", "To add image to the survey, the piping style method can be used to easily add them"],
["image", "<img class=\"survey_image survey-image-${1|original,small,medium,large|} fit\" src=\"${2:https\:\/\/bilendi.decipherinc.com\/survey\/selfserve\/53b\/g001\/XXXX\/XX\.jpg}\" alt=\"${3:XXX}\" />${0}", "The image template if you do not want to use the piping one"],
["protected", "protected=${1:1}${0}", "The protected attribute adds image protection to the image."],
["color", "color=${1:\#ff0000}${0}", "The code above produces a protected image with a value as the watermark text."],
["fontSize", "fontSize=${1:12}${0}", "The fontSize attribute applies only to protected images and controls the watermark's text font size."],
["placement", "placement=\"${1|bottom,top,center,repeat|}\"${0}", "The placement attribute can be set to bottom (default), top, center or repeat and applies only to protected images and controls the watermark\'s position."],
["xpad", "xpad=${1:30}${0}", "The xpad attribute applies only to protected images and controls the horizontal spacing between repeated watermarks."],
["ypad", "ypad=${1:30}${0}", "The ypad attribute applies only to protected images and controls the vertical spacing between repeated watermarks."],
["classimg", "class=\"${1:myClassName}\"${0}", "The class attribute adds a class name to the image. It cannot be applied to protected images."],
["align", "align=${1|bottom,middle,top,left,right|}${0}", "The align attribute can be set to bottom, middle, top, left or right and adds an align attribute to the image."],
["alpha", "alpha=${1:50}${0}", "The watermark's transparency."],
["themevars", "<themevars>${0}</themevars>", "The \\\<themevars\\\> attribute is used to override any of the Less variables in the tables below with a new value. This attribute is referenced last in the Less system, which means that it has the highest precedence and will override all Less stylesheets."],
["themevar", "<themevar name=\"${1:variablename}\">${2:valuetext}</themevar>${0}", "The \\\<themevar\\\> attribute is used to override a less variable based on the name attribute."],
["validate", "<validate>\n${0:\# SYNTAX\: error(MESSAGE, ROW, COLUMN)\n\# EXAMPLES\:\nif Q1.r1.val \=\= Q1.r2.val\:\n\terror(\"Please select a unique answer for each row.\", row\=Q1.r1)\n\n\#TEMPLATES\nerror(\"General error with no highlighted elements.\")\nerror(\"Error on this row\"\, Q1.r1)\nerror(\"Error on this row\"\, row\=Q1.r1)\nerror(\"Error on this row\, '\%s'\" \% Q1.r1.text\, Q1.r1)\nerror(\"Error on this col\", col\=Q1.c1)\nerror(\"Error at this cell\", Q1.r1\, Q1.c1)}\n</validate>", "The \\\<validate\\\> tag enables you to perform custom data checks and display error messages when response data does not meet the requirements of the question. Runs once for the entire question."],
["validateCell", "<validateCell>\n${0: \# SYNTAX\: error(MESSAGE\, ROW\, COLUMN)\n\# EXAMPLES\:\nif data lt 20\:\n\terror(\"Value must be larger than 20.\")\n\n\#TEMPLATES\nerror(\"General error with no highlighted elements.\")\nerror(\"Error on this row\"\, Q1.r1)\nerror(\"Error on this row\"\, row\=Q1.r1)\nerror(\"Error on this row, \'\%s\'\" \% Q1.r1.text\, Q1.r1)\nerror(\"Error on this col\", col\=Q1.c1)\nerror(\"Error at this cell\", Q1.r1\, Q1.c1)\n}\n</validateCell>", "The \\\<validateCell\\\> will run once for every input available to the participant. Validation checks will not occur at disabled inputs when using \\\<validateCell\\\>."],
["validateRow", "<validateRow>\n${0:\# SYNTAX: error(MESSAGE\, ROW\, COLUMN)\n\# EXAMPLES\:\n\#EX\-SIMPLE\nif row.data\[0\] gt 100\:\n\terror(\"100\% is all the time we have\. Please adjust the time spent in \'\{\\\}\' \"\.format\(row\.text\)\)\n\#EX\-GRID\nif len(\[x for x in row\.data if x\]) \!\= 2\:\n\terror(\"Please select 2 for \'\%s\'\" \% row.text)\n\n\#TEMPLATES\nerror(\"General error with no highlighted elements.\")\nerror(\"Error on this row\"\, Q1.r1)\nerror(\"Error on this row\"\, row\=Q1.r1)\nerror(\"Error on this row\, \'\%s\'\" \% Q1.r1.text\, Q1.r1)\nerror(\"Error on this col\"\, col\=Q1.c1)\nerror(\"Error at this cell\"\, Q1.r1\, Q1.c1)}\n</validateRow>", "The \\\<validateRow\\\> element will run once for each row in the question. You can use the row keyword to access each row."],
["validateCol", "<validateCol>\n${0:\# SYNTAX\: error(MESSAGE\, ROW\, COLUMN)\n\# EXAMPLES\:\n\#EX\-ONLYROWS\nif sum(col.data) \!\= 100\:\n\terror(\"Please enter 100\% exactly.\")\n\n\#TEMPLATES\nerror(\"General error with no highlighted elements.\")\nerror(\"Error on this row\"\, Q1\.r1)\nerror(\"Error on this row\"\, row\=Q1\.r1)\nerror(\"Error on this row\, \'\%s\'\" \% Q1\.r1\.text\, Q1\.r1)\nerror(\"Error on this col\"\, col\=Q1\.c1)\nerror(\"Error at this cell\"\, Q1\.r1\, Q1\.c1)\n}\n</validateCol>", "The \\\<validateCol\\\> element will run once for each column in the question. Use the \\\<col\.data\\\> keyword to access each column."],
["copystyle", "copy=\"${1:Q1}\"${0}", "The name of a style label or question label. All styles from a question with the same style label are copied into the current context."],
["rows", "rows=\"${1:r1\,r2}\"${0}", "If specified, the style is applied only when rendering specific rows. If not specified, the style is applied to all rows."],
["cols", "cols=\"${1:c1\,c2}\"${0}", "If specified, the style is applied only when rendering specific columns. If not specified, the style is applied to all columns."],
["mode", "mode=\"${1|instead,before,after|}\"${0}", "instead\: Used to replace the default with the new style code.\n\nbefore\: Used to add the new style code before the default.\n\nafter\: Used to add the new style code after the default.\n\n"],
["after", "after=\"${1:Q1}\"${0}", "Applies this style only on pages following the page which includes the question label."],
["before", "before=\"${1:Q2}\"${0}", "Applies this style only on pages preceding the page which includes the question label."],
["with", "with=\"${1:Q1}\"${0}", "Applies this style only on pages which display any of the listed questions."],
["wrap", "wrap=\"${1:ready}\"${0}", "If ready\, the contents of the style override are wrapped in \\\<script\\\> and the jQuery ready event."],
["autosuggest:filename", "autosuggest:filename=\"${1:data1.dat}\"${0}", "Specifies which file to use as an answer source. (Use .dat with tab delimited)"],
["autosuggest:uniqueKey", "autosuggest:uniqueKey=\"${1:codeid}\"${0}", "Specifies which of the answer file's columns contains your unique answer keys."],
["autosuggest:answerKey", "autosuggest:answerKey=\"${1:text}\"${0}", "Specifies which column to use for suggesting answers as the participant types."],
["autosuggest:languageKey", "autosuggest:languageKey=\"${1:codelang}\"${0}", "For multi-language surveys, specifies which column contains the survey languages for filtering answers (should be added as decLang values). Only those answers with language values matching a participant’s decLang value will be suggested to that participant."],
["autosuggest:questionFilter", "autosuggest:questionFilter=\"${1:Q1}\"${0}", "Specifies a survey variable to use as a filter."],
["autosuggest:filter1Key", "autosuggest:filter1Key=\"${1:text}\"${0}", "Specifies the column containing the filter values."],
["autosuggest:filter1Values", "autosuggest:filter1Values=\"${1:somevalue,somevalue2}\"${0}", "Specifies which values to filter by, using the column specified in autosuggest:filter1Key."],
["autosuggest:filter2Key", "autosuggest:filter2Key=\"${1:text}\"${0}", "Applies a second filter."],
["autosuggest:filter2Values", "autosuggest:filter2Values=\"${1:somevalue,somevalue2}\"${0}", "Specifies which values to filter by, using the column specified in autosuggest:filter2Key."],
["autosuggest:filter3Key", "autosuggest:filter3Key=\"${1:text}\"${0}", "Applies a third filter."],
["autosuggest:filter3Values", "autosuggest:filter3Values=\"${1:somevalue,somevalue2}\"${0}", "Specifies which values to filter by, using the column specified in autosuggest:filter3Key."],
["autosuggest:filter4Key", "autosuggest:filter4Key=\"${1:text}\"${0}", "Applies a fourth filter."],
["autosuggest:filter4Values", "autosuggest:filter4Values=\"${1:somevalue,somevalue2}\"${0}", "Specifies which values to filter by, using the column specified in autosuggest:filter4Key."],
["autosuggest:oneRowAtATime", "autosuggest:oneRowAtATime=\"${1:1}\"${0}", "Applies the \"One Row at a Time\" question style."],
["autosuggest:characterLimit", "autosuggest:characterLimit=\"${1:3}\"${0}", "Specifies how many characters survey participants must enter in order to see autosuggestions in the dropdown list."],
["autosuggest:characterLimitText", "autosuggest:characterLimitText=\"${1:Enter at least 3 characters}\"${0}", "Tells participants how many characters they must enter to see the autosuggestion dropdown list."],
["autosuggest:appendFileData", "autosuggest:appendFileData=\"${1:1}\"${0}", "Adds to the report a virtual question for every additional column in the source file beyond the unique key and the answer key. <br/>Note: autosuggest:appendFileData requires version uses=\"autosuggest.3\"or higher. "],
["autosuggest:excludeRowSelections", "autosuggest:excludeRowSelections=\"${1:1}\"${0}", "Enabled by default. Prevents duplicate answers within a single Autosuggest question. <br/>Note:  autosuggest:excludeRowSelections requires version uses=\"autosuggest.3\"or higher."],
["autosuggest:includeFrom", "autosuggest:includeFrom=\"${1:Q1}\"${0}", "Takes comma-separated list of question labels and uses the answers submitted in those previous Autosuggest questions as the autosuggestion answers in the question to which it is applied. <br/>Note:  autosuggest:includeFrom requires version uses=\"autosuggest.3\"or higher."],
["autosuggest:noMatchVirtual", "autosuggest:noMatchVirtual=\"${1:1}\"${0}", "Includes in the report a virtual question that records non-matching answers for that Autosuggest question. <br/>Note:  autosuggest:noMatchVirtual requires version uses=\"autosuggest.3\"or higher. <br/>Note:  When using autosuggest.4 or higher, \"No Match\" is populated for all unanswered optional answers, whether or not this attribute is included."],
["autosuggest:multifilter", "autosuggest:multifilter=\"${1:ColumnName1\:comma\,separated\,values\^ColumnName2\:comma\,separated\,values\^ColumnName3\:comma\,separated\,values}\"${0}", "Allows you to add additional filters beyond the standard four available in the Source file setting of the elements. <br/>Note: Be sure not to include spaces unless they exist within the name of the column, or the value being used for filtering."],
["atmtable:btn_css", "atmtable:btn_css=\"${1:font\-size\:36px\;}\"${0}", "Customize the look of the clickable button. <br/>Note: If you customize atmtable:btn_css, consider also customizing atmtable:btn_selected_css."],
["atmtable:btn_selected_css", "atmtable:btn_selected_css=\"${1:background\:\#662d91\;}\"${0}", "Customize the look of a selected button / hovered button. <br/>This inherits the styling of the atmtable:btn_css and should be customized if atmtable:btn_css is customized."],
["atmtable:btn_disabled_css", "atmtable:btn_disabled_css=\"${1:background\:\#ddd\;}\"${0}", "Customize the look of a disabled button. Answers can become disabled when used with a noanswer option."],
["atmtable:col_legend_css", "atmtable:col_legend_css=\"${1:font\-size\:18px\;}\"${0}", "Customize the container for the column legends."],
["atmtable:col_legend_text", "atmtable:col_legend_text=\"${1:Most Preferred}\"${0}", "Adds a text label that will appear at the top of the columns. Unlike the other configurable elements, this tag is applied on the \\\<col\\\> tags, rather than the question tag."],
["atmtable:row_legend_css", "atmtable:row_legend_css=\"${1:color\:blue\;}\"${0}", "Customize the container for the row legends"],
["atmtable:inputs", "atmtable:inputs=\"${1:1}\"${0}", "Toggles showing the raw inputs (radio or checkbox forms)"],
["atmtable:row_dividers", "atmtable:row_dividers=\"${1:1}\"${0}", "Toggles row dividers."],
["atmtable:row_dividers_css", "atmtable:row_dividers_css=\"${1:border\:5px solid red;}\"${0}", "Customize the look of the row dividers."],
["atmtable:table_css", "atmtable:table_css=\"${1:width\:70\%;}\"${0}", "Customize the overall table for the question grid. <br/>Useful for setting a width for the question. Be sure to use great care when setting widths, especially for surveys that allow mobile devices."],
["atmrating:order", "atmrating:order=\"${1|lth,htl|}\"${0}", "Adjusts the layout of the buttons to ascending or descending order"],
["atmrating:legendPosition", "atmrating:legendPosition=\"${1|Below,Above|}\"${0}", "Adjusts the placement of the legend text  to Above or Below"],
["atmrating:leftLegend", "atmrating:leftLegend=\"${1:Least}\"${0}", "The text to show for the left-most legend"],
["atmrating:midLegend", " atmrating:midLegend=\"${1:neutral}\"${0}", "The text to show for the middle legend"],
["atmrating:rightLegend", "atmrating:rightLegend=\"${1:Most}\"${0}", "The text to show for the right-most legend"],
["atmrating:containerWidth", "atmrating:containerWidth=\"${1:100\%}\"${0}", "The total width that the buttons should occupy"],
["atmrating:OO_Text", "atmrating:OO_Text=\"${1:Don\'t know}\"${0}", "The text to display for the Opt Out option (e.g., Don't know, N/A, etc.)"],
["atmrating:containerPercentages", "atmrating:containerPercentages=\"${1:82\,88\,92}\"${0}", "Adjust the width values for the button element containers on a phone, tablet, desktop respectively"],
["atmrating:btn_css", "atmrating:btn_css=\"${1:background\:black\;color\:yellow\;}\"${0}", "Configures the styling of the standard button element"],
["atmrating:btn_selected_css", "atmrating:btn_selected_css=\"${1:color\:green\;}\"${0}", "Configures the styling of the standard button element"],
["atm1d:numCols", "atm1d:numCols=\"${1:3}\"${0}", "The number of buttons displayed in one row. The number of columns is supported for the Multi column layout. <br/>Important: This style only works with atm1d:viewMode=\"Tiled\"."],
["atm1d:showInput", "atm1d:showInput=\"${1:1}\"${0}", "Participants click a button to select an answer. This attribute determines whether or not the answer form (e.g., radio button or checkbox) shows within the button."],
["atm1d:viewMode", "atm1d:viewMode=\"${1|Vertical,Tiled,Horizontal|}\"${0}", "Choose the layout of the buttons. <br/>Select 'Vertical' to align the buttons vertically. <br/>Select 'Tiled' to tile the buttons in grid format. <br/>Select 'Horizontal' to align the buttons horizontally."],
["atm1d:large_minHeight", "atm1d:large_minHeight=\"${1:25px}\"${0}", "If Layout is Horizontal\: Define the minimum height allowed for larger screens in pixels, em or a percentage."],
["atm1d:large_maxHeight", "atm1d:large_maxHeight=\"${1:50px}\"${0}", "For all layouts\: Define the max height allowed for larger screens in pixels, em or a percentage."],
["atm1d:large_minWidth", "atm1d:large_minWidth=\"${1:100px}\"${0}", "If Layout is Vertical\: Define the minimum width allowed for larger screens in pixels, em or a percentage."],
["atm1d:large_maxWidth", "atm1d:large_maxWidth=\"${1:200px}\"${0}", "For all layouts\: Define the max width allowed for larger screens in pixels, em or a percentage."],
["atm1d:large_buttonAlign", "atm1d:large_buttonAlign=\"${1|Left,Center,Right|}\"${0}", "Choose the alignment of buttons in relation to the page for larger screens. <br/>Select 'Left' to left-align buttons. <br/>Select 'Center' to center-align buttons. <br/>Select 'Right' to right-align buttons."],
["atm1d:large_contentAlign", "atm1d:large_contentAlign=\"${1|Left,Center,Right|}\"${0}", "Choose the alignment of the content within buttons for larger screens. <br/>Select 'Left' to left-align content. <br/>Select 'Center' to center-align content. <br/>Select 'Right' to right-align content."],
["atm1d:small_minHeight", "atm1d:small_minHeight=\"${1:25px}\"${0}", "If Layout is Horizontal\: Define the minimum height allowed for smaller screens in pixels, em or a percentage."],
["atm1d:small_maxHeight", "atm1d:small_maxHeight=\"${1:50px}\"${0}", "For all layouts\: Define the max height allowed for smaller screens in pixels, em or a percentage."],
["atm1d:small_minWidth", "atm1d:small_minWidth=\"${1:100px}\"${0}", "If Layout is Vertical\: Define the minimum width allowed for smaller screens in pixels, em or a percentage."],
["atm1d:small_maxWidth", "atm1d:small_maxWidth=\"${1:200px}\"${0}", "For all layouts\: Define the max width allowed for smaller screens in pixels, em or a percentage."],
["atm1d:small_buttonAlign", "atm1d:small_buttonAlign=\"${1|Left,Center,Right|}\"${0}", "Choose the alignment of buttons in relation to the page for smaller screens. <br/>Select 'Left' to left-align buttons. <br/>Select 'Center' to center-align buttons. <br/>Select 'Right' to right-align buttons."],
["atm1d:small_contentAlign", "atm1d:small_contentAlign=\"${1|Left,Center,Right|}\"${0}", "Choose the alignment of the content within buttons for smaller screens. <br/>Select 'Left' to left-align content. <br/>Select 'Center' to center-align content. <br/>Select 'Right' to right-align content."],
["dq-button-bg-color", "<themevar name\=\"dq-button-bg-color\">${1:\#ff0000}<\/themevar>${0}", "The base color for the button select"],
["dq-button-bg-color-hover", "<themevar name\=\"dq-button-bg-color-hover\">${1:\#ff0000}<\/themevar>${0}", "The hover color for the button select"],
["dq-button-bg-color-selected", "<themevar name\=\"dq-button-bg-color-selected\">${1:\#ff0000}<\/themevar>${0}", "The selected color for the button select"],
["cardrating:themename", "cardrating:themename=\"${1|hpush,vstack|}\"${0}", "After selection, cards animate as being moved to behind the next card. <br/>hpush - After selection, cards animate as sliding left or right. <br/>vstack - After selection, cards animate as dropping below the buttons and then fade out of view."],
["cardrating:themepath", "cardrating:themepath=\"${1:themepathCSSFile}\"${0}", "Path to the custom theme CSS file to apply."],
["cardrating:animation", "cardrating:animation=\"${1|slow,medium,fast|}\"${0}", "Speed used to animate certain elements."],
["cardrating:previcon", "cardrating:previcon=\"${1:fa-icon-caret-right}\"${0}", "Font-Awesome class name of the icon used for the \"Previous\" arrow button."],
["cardrating:prevtext", "cardrating:prevtext=\"${1:Back}\"${0}", "\"Previous\" arrow button text."],
["cardrating:nexticon", "cardrating:nexticon=\"${1:fa-icon-carat-right}\"${0}", "Font-Awesome class name of the icon used for the \"Next\" arrow button."],
["cardrating:nexttext", "cardrating:nexttext=\"${1:Next}\"${0}", "Text displayed on the \"Next\" arrow button."],
["cardrating:dragdrop", "cardrating:dragdrop=\"${1:0}\"${0}", "Allows participants to drag & drop of cards into buckets on desktop devices."],
["cardrating:navigation", "cardrating:navigation=\"${1:0}\"${0}", "Allows participants to navigate back and forth between cards to change their previous answers.Allows participants to navigate back and forth between cards to change their previous answers."],
["cardrating:progress", "cardrating:progress=\"${1:0}\"${0}", "Shows a progress bar below the cards."],
["cardrating:completion", "cardrating:completion=\"${1:All done}\"${0}", "Message displayed to participants after all cards are rated."],
["cardrating:btnlayout", "cardrating:btnlayout=\"${1|vertical,tiled,horizontal|}\"${0}", "Defines the layout of the bucket alignment."],
["cardrating:lrg_minheight", "cardrating:lrg_minheight=\"${1:25px}\"${0}", "For horizontal layouts\: Defines the minimum height allowed for larger screens in pixels, em\'s or a percentage."],
["cardrating:lrg_maxheight", "cardrating:lrg_maxheight=\"${1:50px}\"${0}", "For all layouts\: Defines the maximum height allowed for larger screens in pixels, em\'s or a percentage."],
["cardrating:lrg_minwidth", "cardrating:lrg_minwidth=\"${1:100px}\"${0}", "For vertical layouts\: Defines the minimum width allowed for larger screens in pixels, em\'s or a percentage."],
["cardrating:lrg_maxwidth", "cardrating:lrg_maxwidth=\"${1:200px}\"${0}", "For all layouts\: Defines the maximum width allowed for larger screens in pixels, em\'s or a percentage."],
["cardrating:lrg_btnalign", "cardrating:lrg_btnalign=\"${1|Left,Center,Right|}\"${0}", "Specifies the alignment of the buckets in relation to the page for larger screens."],
["cardrating:lrg_cntalign", "cardrating:lrg_cntalign=\"${1|Left,Center,Right|}\"${0}", "Specifies the alignment of the content within buckets for larger screens."],
["cardrating:sml_minheight", "cardrating:sml_minheight=\"${1:25px}\"${0}", "For horizontal layouts\: Sets the minimum height allowed for smaller screens in pixels, em\'s or a percentage."],
["cardrating:sml_maxheight", "cardrating:sml_maxheight=\"${1:50px}\"${0}", "Defines the maximum height allowed for smaller screens in pixels, em\'s or a percentage."],
["cardrating:sml_minwidth", "cardrating:sml_minwidth=\"${1:100px}\"${0}", "For vertical layouts\: Defines the minimum width allowed for smaller screens in pixels, em\'s or a percentage"],
["cardrating:sml_maxwidth", "cardrating:sml_maxwidth=\"${1:200px}\"${0}", "Defines the maximum width allowed for smaller screens in pixels, em\'s or a percentage."],
["cardrating:sml_btnalign", "cardrating:sml_btnalign=\"${1|Left,Center,Right|}\"${0}", "Defines the alignment of buckets in relation to the page for smaller screens."],
["cardrating:sml_cntalign", "cardrating:sml_cntalign=\"${1|Left,Center,Right|}\"${0}", "Defines the alignment of content within buckets for smaller screens."],
["cardsort:displayNavigation", "cardsort:displayNavigation=\"${1:1}\"${0}", "Toggle showing the navigation buttons (previous, next). (0 = HIDE, 1 = SHOW)"],
["cardsort:displayCounter", "cardsort:displayCounter=\"${1:1}\"${0}", "Toggles the card counter on the bucket. (0 = HIDE, 1 = SHOW)"],
["cardsort:displayProgress", "cardsort:displayProgress=\"${1:1}\"${0}", "Toggles the progress indicator for the current card versus the total number of cards. (0 = HIDE, 1 = SHOW)"],
["cardsort:animationDuration", "cardsort:animationDuration=\"${1:250}\"${0}", "Sets the duration of the transition (the card sliding into place). (value in milliseconds)"],
["cardsort:wrapBuckets", "cardsort:wrapBuckets=\"${1:1}\"${0}", "When enabled, causes the buckets to wrap to the width of the parent container; when disabled, the buckets will always appear in a single row (on desktop), which may result in horizontal scrolling. Used in conjunction with cardsort:bucketsPerRow. (0 = OFF, 1 = ON)"],
["cardsort:bucketsPerRow", "cardsort:bucketsPerRow=\"${1:3}\"${0}", "When coupled with the cardsort:wrapBuckets variable, each row will have this many buckets (on desktop only). If the number is zero, the system will automatically calculate the number of buckets per row based on the normal word wrap behavior of the parent element, which may not produce consistent results. Used in conjunction with cardsort:wrapBuckets."],
["cardsort:themeFile", "cardsort:themeFile=\"${1:CSSFILELINK}\"${0}", "Use an optional CSS file to define the CSS attributes for the Card Sort question. This option can be set at the folder level for consistency in the appearance of all Card Sort questions without needing to configure the variables for each Card Sort individually."],
["cardsort:automaticAdvance", "cardsort:automaticAdvance=\"${1:1}\"${0}", "Applies to Single Select questions only. When set to true (default), participants will automatically advance to the next card after selecting a bucket. (1 = ON, 0 = OFF)"],
["cardsort:autoSubmit", "cardsort:autoSubmit=\"${1:1}\"${0}", "The page is automatically submitted when the question is answered. This happens upon sorting the last card, or by pressing next if automaticAdvance is turned off or if the question is Multi Select. (1 = ON, 0 = OFF)"],
["cardsort:iconButtonCSS", "cardsort:iconButtonCSS=\"${1:background\:\#266c13\;}\"${0}", "Sets the style of the navigation buttons."],
["cardsort:iconButtonDisableCSS", "cardsort:iconButtonDisableCSS=\"${1:background\:\#ddd\;}\"${0}", "Sets the style of the disabled state for the navigation buttons."],
["cardsort:iconButtonHoverCSS", "cardsort:iconButtonHoverCSS=\"${1:background\:\#000\;}\"${0}", "Sets the style of the hover-over state for the navigation buttons."],
["cardsort:buttonPreviousHTML", "cardsort:buttonPreviousHTML=\"${1:Back}\"${0}", "Sets the content of the \"Previous\" navigation button."],
["cardsort:buttonNextHTML", "cardsort:buttonNextHTML=\"${1:Forward}\"${0}", "Sets the content of the \"Next\" navigation button."],
["cardsort:cardCSS", "cardsort:cardCSS=\"${1:font-size\:24px\;}\"${0}", "Customizes the appearance of all cards. Unlike most of these variables, this one can be placed in the question tag OR in an individual \\\<row\\\> tag in the event you want to make one card look different from the others."],
["cardsort:cardDisableCSS", "cardsort:cardDisableCSS=\"${1:background\:\#ddd\;}\"${0}", "Customizes the appearance of disabled cards."],
["cardsort:cardHoverCSS", "cardsort:cardHoverCSS=\"${1:border\-color\:\#f80\;}\"${0}", "Customizes the appearance of cards during hover-over."],
["cardsort:cardSelectCSS", "cardsort:cardSelectCSS=\"${1:background\:\#f80\;}\"${0}", "Customizes the appearance of cards which have at least one selected bucket."],
["cardsort:dragAndDrop", "cardsort:dragAndDrop=\"${1:1}\"${0}", "Enables or disables drag and drop functionality for the cards. (1 = ON, 0 = OFF)"],
["cardsort:bucketCSS", "cardsort:bucketCSS=\"${1:font\-size\:24px\;}\"${0}", "Customizes the appearance of all buckets. Unlike most of these variables, this one can be placed in the question tag OR in an individual \\\<row\\\> tag in the event you want to make one bucket look different from the others."],
["cardsort:bucketDisableCSS", "cardsort:bucketDisableCSS=\"${1:background\:\#ddd\;}\"${0}", "Customizes the appearance of disabled buckets."],
["cardsort:bucketHoverCSS", "cardsort:bucketHoverCSS=\"${1:border\-color\:\#f80\;}\"${0}", "Customizes the appearance of cards during hover-over (both mouse cursor hover and drag-over hover)."],
["cardsort:bucketSelectCSS", "cardsort:bucketSelectCSS=\"${1:background\:\#f80\;}\"${0}", "Customizes the appearance of buckets which have been selected for at least one card."],
["cardsort:bucketCountCSS", "cardsort:bucketCountCSS=\"${1:background\:\#000\;}\"${0}", "Customizes the appearance of the card count button on each bucket. This button is only enabled when a bucket has cards in it."],
["cardsort:bucketCountDisableCSS", "cardsort:bucketCountDisableCSS=\"${1:background\:\#ddd\;}\"${0}", "Customizes the appearance of the disabled card count button on each bucket."],
["cardsort:progressCSS", "cardsort:progressCSS=\"${1:font\-size\:16px\;}\"${0}", "Sets the appearance of the progress indicator."],
["cardsort:contentsCardCSS", "cardsort:contentsCardCSS=\"${1:background\:\#fc6\;}\"${0}", "Sets the appearance of all cards inside the bucket contents view; these appear when you click the bucket count to view the cards inside a bucket."],
["cardsort:completionHTML", "cardsort:completionHTML=\"${1:All done, Click on the continue button to continue.}\"${0}", "Sets the message content shown when a participant has sorted all the cards."],
["cardsort:completionCSS", "cardsort:completionCSS=\"${1:border\:1px solid \#777\;}\"${0}", "Changes the look of the completion message."],
["fvdatepicker:firstDay", "fvdatepicker:firstDay=\"${1|Monday,Sunday|}\"${0}", "forces calendar weeks to start on Monday or Sunday."],
["fvdatepicker:suggestedDate", "fvdatepicker:suggestedDate=\"${1:04\/01\/2024}\"${0}", "By default, the Date Picker calendar will suggest the current day based on local system time (the participant’s device \/ browser). If desired, you can alter the question XML to display a different date first."],
["verifyDate", "verify=\"daterange(${1|mm\/dd\/yyyy,dd\/mm\/yyyy,yyyy\/mm\/dd,mm\-dd\-yyyy,dd\-mm\-yyyy,yyyy\-mm\-dd|}, ${2|any,today,03\/22\/2000|}, ${3|any,today,03\/22\/2025|})\"${0}", "The sst attribute enables you to prevent the survey stress tester from testing the element."],
["imgmap:image", "imgmap:image=\"${1:concept1\.jpg}\"${0}", "The image file name to present. Loads the image specified from the static directory of the project. The file name must be path to image file and not an evaluated expression."],
["imgmap:loading", "imgmap:loading=\"${1:\<i class\=\'fa fa\-icon\-spinner fa\-icon\-spin\'\>\<\/i\>}\"${0}", "The text that is displayed while the image is loading."],
["imgmap:paletteSchema", "imgmap:paletteSchema=\"${1:255\,50,50\,0\|0\|\|255\,50\,50\,100\|100}\"${0}", "The color palette used in the reporting tool to display the category frequencies. <br/>Type: String - comma and pipe delimited (e.g., r,g,b,a|%||r,g,b,a|%||, etc.)"],
["imgmap:color", "imgmap:color=\"${1|\#39B54A,\#39B54A\|\#ED1C24,\#39B54A\|\#00AEEF\|\#ED1C24,\#39B54A\|\#00AEEF\|\#ED1C24\|transparent|}\"${0}", "The color of the category and selection area to be created. If there are multiple columns, separate colors using pipes. <br/>You can also add this attribute to each column, but 1 color per column."],
["imgmap:default", "imgmap:default=\"${1:c1}\"${0}", "The marker that should be selected initially upon loading the question."],
["bcme:report_base_color", "bcme:report_base_color=\"${1:#000}\"${0}", "Color for the base frame in the report"],
["bcme:video_id", "bcme:video_id=\"${1:000000000000000}\"${0}", "The unique video id provided in the file manager."],
["bcme:width", "bcme:width=\"${1:640}\"${0}", "The video\'s width in pixels."],
["bcme:height", "bcme:height=\"${1:360}\"${0}", "The video\'s height in pixels"],
["bcme:pause_enable", "bcme:pause_enable=\"${1:1}\"${0}", "Allow the participant to pause the video playback"],
["bcme:autostart", "bcme:autostart=\"${1:0}\"${0}", "(Desktop browsers only) Start the video immediately after load"],
["bcme:autosubmit", "bcme:autosubmit=\"${1:1}\"${0}", "Automatically advance to the next page when the video has finished playing"],
["bcme:watermark", "bcme:watermark=\"${1:\\\$\{uuid\\\}}\"${0}", "The text to display as a watermark on the video"],
["bcme:watermark_position", "bcme:watermark_position=\"${1|Top Left,Top Right,Bottom Left,Bottom Right|}\"${0}", "The position of the watermark text relative to the video (Top Left, Top Right, Bottom Left, Bottom Right)"],
["bcme:slider_orientation", "bcme:slider_orientation=\"${1|Horizontal,Vertical|}\"${0}", "The orientation of the rating slider (Horizontal, Vertical)"],
["bcme:slider_min", "bcme:slider_min=\"${1:10}\"${0}", "The minimum rating value of the slider (must be less than slider_max)"],
["bcme:slider_max", "bcme:slider_max=\"${1:50}\"${0}", "The maximum rating value of the slider (must be greater than slider_min)"],
["bcme:slider_range", "bcme:slider_range=\"${1|none,min,max|}\"${0}", "Select whether a colored range should be shown on the track from the minimum or maximum value (none, min, max)"],
["bcme:slider_step", "bcme:slider_step=\"${1:10}\"${0}", "A whole number representing the interval of each slider point. <br/>Note: The value range of the slider (max - min) should be evenly divisible by the interval."],
["bcme:legend_left", "bcme:legend_left=\"${1:Completely Dissatisfied}\"${0}", "Text to display on the left-most slider point"],
["bcme:legend_middle", "bcme:legend_middle=\"${1:Neither Satisfied nor Dissatisfied}\"${0}", "Text to display on the middle slider point"],
["bcme:legend_right", "bcme:legend_right=\"${1:Completely Satisfied}\"${0}", "Text to display on the right-most slider point"],
["bcme:engagement_text", "bcme:engagement_text=\"${1:Please use the slider to indicate your preference for the video.}\"${0}", "Text to display after the engagement time to remind the participant to engage with the video by sliding the slider"],
["bcme:engagement_time", "bcme:engagement_time=\"${1:5}\"${0}", "The number of seconds that the slider handle is inactive for before displaying the engagement text"],
["bcme:engagement_skin", "bcme:engagement_skin=\"${1|black,blue,cloud,dark,facebook,lavender,light,lime,liquid,salmon,yellow|}\"${0}", "The skin (style) of the engagement text (black, blue, cloud, dark, facebook, lavender, light, lime, liquid, salmon, yellow)"],
["bcme:tuneout", "bcme:tuneout=\"${1:1}\"${0}", "Allow the participant to virtual tune out of the video"],
["bcme:tuneout_text", "bcme:tuneout_text=\"${1:Tune Out}\"${0}", "Text to display on the tune out button"],
["bcme:tuneout_value", "bcme:tuneout_value=\"${1|keep,min|}\"${0}", "The sst attribute enables you to prevent the survey stress tester from testing the element."],
["mediatestimonial:audioonly", "mediatestimonial:audioonly=\"${1:1}\"${0}", "Record only audio."],
["mediatestimonial:width", "mediatestimonial:width=\"${1:384}\"${0}", "Width of the Media Element"],
["mediatestimonial:height", "mediatestimonial:height=\"${1:288}\"${0}", "Height of the Media Element"],
["mediatestimonial:mintimelimit", "mediatestimonial:mintimelimit=\"${1:10}\"${0}", "Minimum time (in seconds) required for the recording."],
["mediatestimonial:timelimit", "mediatestimonial:timelimit=\"${1:120}\"${0}", "Time limit (in seconds) for the recording. Must be greater than zero and not greater than 120."],
["mediatestimonial:uploadsizelimit", "mediatestimonial:uploadsizelimit=\"${1:1074000000}\"${0}", "Limit the recording's size (in bytes)."],
["mediatestimonial:providenoanswer", "mediatestimonial:providenoanswer=\"${1:1}\"${0}", "Provide participants a \\\<noanswer\\\> option to skip the question."],
["mediatestimonial:noanswerText", "mediatestimonial:noanswerText=\"${1:I\'m having issues recording a video}\"${0}", "Label for the option to skip the question."],
["mediatestimonial:openMicrophoneText", "mediatestimonial:openMicrophoneText=\"${1:Microphone}\"${0}", "Label for activating the microphone."],
["mediatestimonial:openCameraText", "mediatestimonial:openCameraText=\"${1:Open Camera}\"${0}", "Label for activating the camera."],
["mediatestimonial:audioUploadText", "mediatestimonial:audioUploadText=\"${1:Upload File}\"${0}", "	Button title for uploading audio files."],
["mediatestimonial:videoUploadText", "mediatestimonial:videoUploadText=\"${1:Upload Video}\"${0}", "Button title for uploading video files."],
["mediatestimonial:cancelText", "mediatestimonial:cancelText=\"${1:Cancel}\"${0}", "Cancel recording text"],
["mediatestimonial:loadingText", "mediatestimonial:loadingText=\"${1:Loading...}\"${0}", "Message shown above the progress bar during upload of the recording."],
["mediatestimonial:mobileCameraButtonTitle", "mediatestimonial:mobileCameraButtonTitle=\"${1:Flip Camera}\"${0}", "Title of the button that switches between front and rear cameras on mobile devices."],
["mediatestimonial:desktopCameraButtonTitle", "mediatestimonial:desktopCameraButtonTitle=\"${1:Change Camera}\"${0}", "Button title for opening the cameras menu on desktop devices."],
["mediatestimonial:desktopCameraMenuTitle", "mediatestimonial:desktopCameraMenuTitle=\"${1:Cameras}\"${0}", "Title of the cameras menu on desktop devices."],
["mediatestimonial:desktopMicrophoneButtonTitle", "mediatestimonial:desktopMicrophoneButtonTitle=\"${1:Change Microphone}\"${0}", "Title of the button that opens the microphones menu on desktop devices."],
["mediatestimonial:desktopMicrophoneMenuTitle", "mediatestimonial:desktopMicrophoneMenuTitle=\"${1:Microphones}\"${0}", "Title of the microphones menu on desktop devices."],
["mediatestimonial:timeLimitText", "mediatestimonial:timeLimitText=\"${1:Recording time limit}\"${0}", "Recording time limit text"],
["mediatestimonial:secondsText", "mediatestimonial:secondsText=\"${1:seconds}\"${0}", "seconds text"],
["mediatestimonial:uploadSizeLimitText", "mediatestimonial:uploadSizeLimitText=\"${1:Max file size for uploads}\"${0}", "Max file size for uploads text"],
["mediatestimonial:existingResponseText", "mediatestimonial:existingResponseText=\"${1:Your response has been recorded. However, you may record a new response.}\"${0}", "Message shown when participants navigate backward to a Media Testimonial question they've already answered."],
["mediatestimonial:errorAudioInvalidType", "mediatestimonial:errorAudioInvalidType=\"${1:Unsupported file\. Valid audio formats\: \.mp3\, \.wav\, \.webm}\"${0}", "Unsupported files text for audio"],
["mediatestimonial:errorVideoInvalidType", "mediatestimonial:errorVideoInvalidType=\"${1:Unsupported file\. Valid video formats\: \.mp4\, \.webm\, \.mov}\"${0}", "Unsupported files text for video"],
["mediatestimonial:errorCannotPlayback", "mediatestimonial:errorCannotPlayback=\"${1:Upload successful.}\"${0}", "Error message shown when the recording has uploaded succesfully but the participant cannot play it back."],
["mediatestimonial:errorUnsupportedEncoding", "mediatestimonial:errorUnsupportedEncoding=\"${1:This device or browser does not support the selected format. Please try a different file.}\"${0}", "Unsupported encoding text"],
["mediatestimonial:errorTimeLimit", "mediatestimonial:errorTimeLimit=\"${1:Exceeds maximum time limit.}\"${0}", "Time limit exceeded text"],
["mediatestimonial:errorGeneric", "mediatestimonial:errorGeneric=\"${1:Something went wrong.}\"${0}", "Catch-all error message shown for other errors."],
["ranksort:showBucketText", "ranksort:showBucketText=\"${1:1}\"${0}", "Toggles showing rank label text (0 = HIDE, 1 = SHOW)"],
["ranksort:showBucketNumber", "ranksort:showBucketNumber=\"${1:1}\"${0}", "Toggles showing rank label number (0 = HIDE, 1 = SHOW)"],
["ranksort:alwaysSubmitOE", "ranksort:alwaysSubmitOE=\"${1:1}\"${0}", "Forces an answered open-end textbox to be ranked. (1 = forces answered open-end question to be ranked, 0 = allows answered open-end question to not be ranked)"],
["ranksort:btnOpenEdit", "ranksort:btnOpenEdit=\"${1:edit}\"${0}", "Change the text of the edit button that appears on options that have an \"other specify\" open end box."],
["ranksort:ranksortContainerCSS", "ranksort:ranksortContainerCSS=\"${1}\"${0}", "The container for all elements."],
["ranksort:answersContainerCSS", "ranksort:answersContainerCSS=\"${1}\"${0}", "The container for the answer items."],
["ranksort:cardsContainerCSS", "ranksort:cardsContainerCSS=\"${1}\"${0}", "The container for the rankable items."],
["ranksort:cardCSS", "ranksort:cardCSS=\"${1}\"${0}", "The rankable item."],
["ranksort:cardHoverCSS", "ranksort:cardHoverCSS=\"${1}\"${0}", "The rankable items when hovered."],
["ranksort:cardDroppedCSS", "ranksort:cardDroppedCSS=\"${1}\"${0}", "The rankable items shown inside the rank."],
["ranksort:cardStateDisabledCSS", "ranksort:cardStateDisabledCSS=\"${1}\"${0}", "The disabled rankable item."],
["ranksort:cardDroppedStateDisabledCSS", "ranksort:cardDroppedStateDisabledCSS=\"${1}\"${0}", "The ranked items after being ranked."],
["ranksort:bucketsCSS", "ranksort:bucketsCSS=\"${1}\"${0}", "The container for the ranking."],
["ranksort:bucketsContainerCSS", "ranksort:bucketsContainerCSS=\"${1}\"${0}", "The container for rank labels."],
["ranksort:numbersContainerCSS", "ranksort:numbersContainerCSS=\"${1}\"${0}", "The container for rank numbers."],
["ranksort:bucketCSS", "ranksort:bucketCSS=\"${1}\"${0}", "The rank label container where the rankable items can be dropped."],
["ranksort:bucketNumberCSS", "ranksort:bucketNumberCSS=\"${1}\"${0}", "The rank label number container."],
["ranksort:bucketNumberTextCSS", "ranksort:bucketNumberTextCSS=\"${1}\"${0}", "The rank label number."],
["ranksort:noanswersContainerCSS", "ranksort:noanswersContainerCSS=\"${1}\"${0}", "The container for noanswer option(s)."],
["ranksort:noanswerCSS", "ranksort:noanswerCSS=\"${1}\"${0}", "The exclusive noanswer option(s)."],
["ranksort:noanswerHoverCSS", "ranksort:noanswerHoverCSS=\"${1}\"${0}", "The exclusive noanswer option when hovered."],
["ranksort:noanswerSelectedCSS", "ranksort:noanswerSelectedCSS=\"${1}\"${0}", "The noanswer option when selected."],
["ranksort:uiDraggableHelperCSS", "ranksort:uiDraggableHelperCSS=\"${1}\"${0}", "The rankable item when dragged from the rankable item container."],
["ranksort:uiSortablePlaceholderCSS", "ranksort:uiSortablePlaceholderCSS=\"${1}\"${0}", "The placeholder when a rankable item is dragged into the rank label."],
["ranksort:uiSortableHelperCSS", "ranksort:uiSortableHelperCSS=\"${1}\"${0}", "The ranked item when dragged out of the rank label to be sorted or removed."],
["ranksort:uiDroppableActiveCSS", "ranksort:uiDroppableActiveCSS=\"${1}\"${0}", "The rankable items container when ranked items are sorted."],
["ranksort:uiDroppableHoverCSS", "ranksort:uiDroppableHoverCSS=\"${1}\"${0}", "The rankable items container when ranked items are dragged to rankable items container."],
["ranksort:iconAddCSS", "ranksort:iconAddCSS=\"${1}\"${0}", "The add icon shown when a rankable item is hovered."],
["ranksort:iconRemoveCSS", "ranksort:iconRemoveCSS=\"${1}\"${0}", "The remove icon shown when a ranked item is hovered."],
["ranksort:iconRankCSS", "ranksort:iconRankCSS=\"${1}\"${0}", "The next rank icon when a rankable item is hovered."],
["ranksort:base", "ranksort\:cardCSS\=\"height\:120px\;\"\n\tranksort\:bucketCSS\=\"height\:120px\;\"\n\tranksort\:noanswerCSS\=\"height\:120px\;\"\n\tranksort\:uiDraggableHelperCSS\=\"height\:120px\;\"\n\tranksort\:uiSortableHelperCSS\=\"height\:120px\;\"${0}", "The sst attribute enables you to prevent the survey stress tester from testing the element."],
["ranksort:mobile_ranksortContainerCSS", "ranksort:mobile_ranksortContainerCSS=\"${1}\"${0}", "The container for all elements."],
["ranksort:mobile_cardsContainerCSS", "ranksort:mobile_cardsContainerCSS=\"${1}\"${0}", "The container for rankable items."],
["ranksort:mobile_cardCSS", "ranksort:mobile_cardCSS=\"${1}\"${0}", "The rankable items."],
["ranksort:mobile_cardDroppedCSS", "ranksort:mobile_cardDroppedCSS=\"${1}\"${0}", "The rankable item dropped CSS."],
["ranksort:mobile_cardDupeCSS", "ranksort:mobile_cardDupeCSS=\"${1}\"${0}", "The duplicate ranked items."],
["ranksort:mobile_noanswersContainerCSS", "ranksort:mobile_noanswersContainerCSS=\"${1}\"${0}", "The container for noAnswer option(s)."],
["ranksort:mobile_noanswerCSS", "ranksort:mobile_noanswerCSS=\"${1}\"${0}", "The exclusive noAnswer option(s)."],
["ranksort:mobile_noanswerSelectedCSS", "ranksort:mobile_noanswerSelectedCSS=\"${1}\"${0}", "The exclusive noAnswer option when selected."],
["ranksort:mobile_iconRankCSS", "ranksort:mobile_iconRankCSS=\"${1}\"${0}", "The icon rank"],
["ratingscale:bubble_inner_starting_css", "ratingscale:bubble_inner_starting_css=\"${1:color\:pink\;font\-size\:32px\;}\"${0}", "Configure styling of the draggable icon before a selection has been made"],
["ratingscale:bubble_inner_answered_css", "ratingscale:bubble_inner_answered_css=\"${1:color\:rgba\(0\,0\,0\,0\.5\)\;}\"${0}", "Configure styling of the draggable icon after a selection has been made"],
["ratingscale:bubble_size", "ratingscale:bubble_size=\"${1:40}\"${0}", "Specify the pixel width and height of the draggable image (bubble)"],
["ratingscale:bubble_img", "ratingscale:bubble_img=\"${1:pushpin\.png}\"${0}", "Specify an image to use as the bubble"],
["ratingscale:bubble_css", "ratingscale:bubble_css=\"${1:background\:\#aaa\;border\:1px solid \#777\;}\"${0}", "Configure styling of bubble. Useful when you don't want to use images and would rather use a styled CSS div instead. Recommend NOT using in combination with images"],
["ratingscale:bubble_starting_css", "ratingscale:bubble_starting_css=\"${1:border\-color\:red\;}\"${0}", "Configure styling of bubble when bubble is sitting in the starting zone. Recommend NOT using in combination with images. Overrides the ratingscale:bubble_css variable"],
["ratingscale:bubble_answered_css", "ratingscale:bubble_answered_css=\"${1:border\-color\:green\;}\"${0}", "Configure CSS styling of bubble when bubble is on the answer grid. Overrides the ratingscale:bubble_css variable. Recommend NOT using in combination with images."],
["ratingscale:bubble_disabled_css", "ratingscale:bubble_disabled_css=\"${1:background\:\#ddd\;}\"${0}", "Configure styling of bubble when bubble is disabled. Overrides the ratingscale:bubble_css variable. Recommend NOT using in combination with images."],
["ratingscale:hide_radio", "ratingscale:hide_radio=\"${1:1}\"${0}", "Hides the radio buttons in the grid. Only used if ratingscale:radio_img=\"\". "],
["ratingscale:radio_inner_css", "ratingscale:radio_inner_css=\"${1:display\:none\;}\"${0}", "Configure styling for the radio image (dotted circle)"],
["ratingscale:radio_img_size", "ratingscale:radio_img_size=\"${1:20}\"${0}", "Specify the pixel width and height of the radio button image. Expects image to be square. If using an image sprite then the states should be squares, for example a 20x40 image sprite where each state is a 20x20, size would be 20"],
["ratingscale:radio_img", "ratingscale:radio_img=\"${1:pushpin\-out\.png}\"${0}", "Replaces the radio button in the grid with an image when the radio button is unselected"],
["ratingscale:radio_selected_img", "ratingscale:radio_selected_img=\"${1:pushpin\-in\.png}\"${0}", "Replaces the radio button with an image when the radio button is selected. Set this value to empty if you do not want an image behind the \"bubble\" image/CSS"],
["ratingscale:radio_css", "ratingscale:radio_css=\"${1:background\:black\;}\"${0}", "CSS styling of the grid cell. Note that this applies to the interior table cells and does not affect the actual table/grid; to do that, you need to configure the survey theme."],
["ratingscale:radio_selected_css", "ratingscale:radio_selected_css=\"${1:background\:\#f80\;}\"${0}", "CSS styling of the grid cell when that answer is selected. As with ratingscale:radio_css, this applies to the interior table cells and does not affect the actual table/grid; to do that, you need to configure the survey theme."],
["ratingscale:radio_img_transition", "ratingscale:radio_img_transition=\"${1:1}\"${0}", "Toggles a transition when using an image for the radio buttons, assuming that image has 2 states: selected and unselected. (1 = ON, 0 = OFF)"],
["ratingscale:radio_img_transition_effect", "ratingscale:radio_img_transition_effect=\"${1:linear}\"${0}", "CSS transition effect used when shifting between states in the replacement radio button images. Assumes ratingscale:radio_img_transition=\"1\"."],
["sliderpoints:sliderPosition", "sliderpoints:sliderPosition=\"${1|Off Scale,Left End,Middle,Right End|}\"${0}", "The initial position of the slider (Off Scale, Left End, Middle, Right End)."],
["sliderpoints:legendPosition", "sliderpoints:legendPosition=\"${1|Above Slider,Below Slider|}\"${0}", "The position of the scale legend (Above Slider, Below Slider)."],
["sliderpoints:showRange", "sliderpoints:showRange=\"${1:1}\"${0}", "Fills the track color to show the range of points selected. The range is shown from left to right, so this is ideal for choices with ordinal values."],
["sliderpoints:OO", "sliderpoints:OO=\"${1:1}\"${0}", "Allows participants to bypass the question."],
["sliderpoints:sliderWidth", "sliderpoints:sliderWidth=\"${1:75\%}\"${0}", "The width of the slider container."],
["sliderpoints:offScaleAdjustment", "sliderpoints:offScaleAdjustment=\"${1:\-40px|}\"${0}", "The number of pixels to adjust the slider handle off of the scale."],
["sliderpoints:offScaleText", "sliderpoints:offScaleText=\"${1:A}\"${0}", "The text to display in the slider handle before a selection has been made."],
["sliderpoints:offScaleAdjustment_smartphone", "sliderpoints:offScaleAdjustment_smartphone=\"${1:\-36px}\"${0}", "The number of pixels to adjust the slider handle off of the scale for smartphone devices."],
["sliderpoints:offScaleText_smartphone", "sliderpoints:offScaleText_smartphone=\"${1:A}\"${0}", "The text to display in the slider handle before a selection has been made for smartphone devices."],
["sliderpoints:handle_css", "sliderpoints:handle_css=\"${1:border\:3px solid black\;background\-color\:red\;}\"${0}", "CSS for the slider handle."],
["sliderpoints:track_css", "sliderpoints:track_css=\"${1:border\:1px dotted black\;background\-color\:white\;}\"${0}", "CSS for the slider track."],
["sliderpoints:track_range_css", "sliderpoints:track_range_css=\"${1:background-color\:black\;}\"${0}", "CSS for the slider track range."],
["sliderpoints:legend_selected_css", "sliderpoints:legend_selected_css=\"${1:color\:red\;}\"${0}", "CSS for the legend bullet and text when selected and / or hovered."],
["sliderpoints:handle_unanswered_css", "sliderpoints:handle_unanswered_css=\"${1:background\-color\:red\;}\"${0}", "CSS for the slider handle before a selection has been made."],
["sliderpoints:handle_unanswered_hover_css", "sliderpoints:handle_unanswered_hover_css=\"${1:opacity\:0\.5\;}\"${0}", "CSS for the slider handle before a selection has been made and is hovered over."],
["slidernumber:OO_Text", "slidernumber:OO_Text=\"${1:Prefer not to say}\"${0}", "Adds a no answer/skip option for each item"],
["slidernumber:offScaleAdjustment", "slidernumber:offScaleAdjustment=\"${1:\-30px}\"${0}", "Sets number of pixels the slider handle should be offset. A negative value will move to the left and positive to the right."],
["slidernumber:offScaleText", "slidernumber:offScaleText=\"${1:\<i class\=\'fa\-icon\-arrow\-right\'\>\<\/i\>}\"${0}", "Set the text to be shown on the slider handle when off the slider track."],
["slidernumber:leftLegend", "slidernumber:leftLegend=\"${1:Completely Dissatisfied}\"${0}", "Legend text for the left side of the scale"],
["slidernumber:legendPosition", "slidernumber:legendPosition=\"${1|Above Slider,Below Slider|}\"${0}", "Sets the position of the legends, above the scale or below the scale."],
["slidernumber:midLegend", "slidernumber:midLegend=\"${1:Neutral}\"${0}", "Legend text for the middle side of the scale"],
["slidernumber:postText", "slidernumber:postText=\"${1:\€}\"${0}", "Post text after the range input"],
["slidernumber:preText", "slidernumber:preText=\"${1:\$}\"${0}", "Pre text after the range input"],
["slidernumber:rightLegend", "slidernumber:rightLegend=\"${1:Completely Satisfied}\"${0}", "Legend text for the right side of the scale"],
["slidernumber:showValue", "slidernumber:showValue=\"${1|Above Slider,Below Slider,On Handle,Do Not Show Value|}\"${0}", "This option allows you to specify where the slider value is displayed."],
["slidernumber:sliderPosition", "slidernumber:sliderPosition=\"${1|Off Scale,Left End,Middle,Right End|}\"${0}", "This option allows you to specify where to start the slider handle."],
["slidernumber:step", "slidernumber:step=\"${1:10}\"${0}", "Sets up the step by which the value is incremented/decremented."],
["slidernumber:editable", "slidernumber:editable=\"${1:0}\"${0}", "Prevents the value above the scale from being edited."],
["slidernumber:slidernumber_desktop_margin_css", "slidernumber:slidernumber_desktop_margin_css=\"${1:color\:\#B3BD22\;}\"${0}", "The margins and legends for a slider on desktop."],
["slidernumber:slidernumber_mobile_margin_css", "slidernumber:slidernumber_mobile_margin_css=\"${1:color\:\#B3BD22\;}\"${0}", "The margins and legends for a slider on mobile."],
["slidernumber:input_css", "slidernumber:input_css=\"${1:color\:\#B3BD22\;}\"${0}", "The editable input."],
["slidernumber:handle_css", "slidernumber:handle_css=\"${1:background:\#8de no\-repeat\;}\"${0}", "The slider handle that has been moved along the track."],
["slidernumber:handle_offscale_css", "slidernumber:handle_offscale_css=\"${1:background:\#8de no\-repeat\;}\"${0}", "The slider handle before the slider has been moved onto the slider track."],
["slidernumber:handle_focus_css", "slidernumber:handle_focus_css=\"${1:background:\#8de no\-repeat\;}\"${0}", "The slider handle after being moved and before clicking on the page which loses focus."],
["slidernumber:handle_hover_css", "slidernumber:handle_hover_css=\"${1:border\-color\:\#71bbc9\;}\"${0}", "The slider handle when hovered over."],
["slidernumber:handle_active_css", "slidernumber:handle_active_css=\"${1:border\-color\:\#71bbc9\;}\"${0}", "The slider handle when being moved or slider handle is active."],
["slidernumber:track_css", "slidernumber:track_css=\"${1:border\-color\:\#71bbc9\;}\"${0}", "The slider track when hovered and slider handle is not the focus."],
["slidernumber:track_hover_css", "slidernumber:track_hover_css=\"${1:border\-color\:\#8de\;}\"${0}", "The slider track when hovered and slider handle is not the focus."],
["slidernumber:track_active_css", "slidernumber:track_active_css=\"${1:border\-color\:\#8de\;}\"${0}", "The slider track when moving the slider handle or slider handle is the focus."],
["slidernumber:track_range_css", "slidernumber:track_range_css=\"${1:background-color\:\#8de\;}\"${0}", "The slider track to the left of the slider handle."],
["age", "<suspend/>\n<exec>\nageQuestion = ${1:Q1}\nrecodeQuestion = ${2:RECODE_Q1}\nagerange = [${0:\'\&lt\;16\'\,\'16\-19\'\,\'20\-24\'\,\'25\-34\'\,\'35\-49\'\,\'50\-64\'\,\'\&gt\;64\'}]\nfor index, x in enumerate(agerange):\n  if ageQuestion.check(x):\n    recodeQuestion.val = index\n</exec>\n", "AGE Recode (ageQuestion = Age Question, recodeQuestion = the recode question for the age range, agerange = a list of age ranges) "],
["sliderdecimal:step", "sliderdecimal:step=\"${1:0.5}\"${0}", "As you move the slider, this is how much the value will increment."],
["sliderdecimal:decimalPlaces", "sliderdecimal:decimalPlaces=\"${1:2}\"${0}", "The number of decimal places to show in the value box."],
["sliderdecimal:sliderWidth", "sliderdecimal:sliderWidth=\"${1:75%}\"${0}", "Specify the width of the slider."],
["sliderdecimal:sliderPosition", "sliderdecimal:sliderPosition=\"${1|Left End,Middle,Right End|}\"${0}", "The initial position of the slider."],
["sliderdecimal:showValue", "sliderdecimal:showValue=\"${1|Above Slider,Below Slider,On Handle,Do Not Show Value|}\"${0}", "The position of the value box."],
["sliderdecimal:legendPosition", "sliderdecimal:legendPosition=\"${1|Above Slider,Below Slider|}\"${0}", "The position of the legend text."],
["sliderdecimal:leftLegend", "sliderdecimal:leftLegend=\"${1:Not likely at all}\"${0}", "Text to display in the left-most legend."],
["sliderdecimal:midLegend", "sliderdecimal:midLegend=\"${1:Neutral}\"${0}", "Text to display in the middle legend."],
["sliderdecimal:rightLegend", "sliderdecimal:rightLegend=\"${1:Extremely likely}\"${0}", "Text to display in the right-most legend."],
["sliderdecimal:preText", "sliderdecimal:preText=\"${1:\$}\"${0}", "Text to display on the left side of the value box."],
["sliderdecimal:postText", "sliderdecimal:postText=\"${1:\€}\"${0}", "Text to display on the right side of the value box."],
["sliderdecimal:editable", "sliderdecimal:editable=\"${1:1}\"${0}", "Allows a participant to edit the value box with their keyboard. (1 = Editable, 0 = Not Editable)"],
["sliderdecimal:showRange", "sliderdecimal:showRange=\"${1:1}\"${0}", "Shows a colored range on the scale similar to a progress bar. (1 = Show Range, 0 = Hide Range)"],
["sliderdecimal:OO_Text", "sliderdecimal:OO_Text=\"${1:Have not heard of this}\"${0}", "Specify the text for the Opt Out option. Requires the raw option ignoreValues\=\"99\" attribute in the \\\<float\\\> tag"],
["sliderdecimal:offScaleAdjustment", "sliderdecimal:offScaleAdjustment=\"${1:-30px}\"${0}", "Specify the off scale starting position to accommodate custom images or larger handles."],
["sliderdecimal:offScaleText", "sliderdecimal:offScaleText=\"${1:<i class\=\'fa-icon-arrow-right\'></i>}\"${0}", "Text to display in the slider when it's off scale (has not been slid)."],
["sliderdecimal:sliderdecimal_desktop_margin_css", "sliderdecimal:sliderdecimal_desktop_margin_css=\"${1:margin-bottom\:200px\;}\"${0}", "Adjust the desktop margins of the slider to accommodate other slider handles."],
["sliderdecimal:sliderdecimal_mobile_margin_css", "sliderdecimal:sliderdecimal_mobile_margin_css=\"${1:margin-top\:200px\;}\"${0}", "Adjust the mobile margins of the slider to accommodate other slider handles."],
["sliderdecimal:input_css", "sliderdecimal:input_css=\"${1:padding\:5px\;font-size\:32px\;}\"${0}", "Configure the CSS style of the input box or value placeholder."],
["sliderdecimal:input_active_css", "sliderdecimal:input_active_css=\"${1:color\:red\;}\"${0}", "Configure the CSS style of the input box, preText and postText when the slider is active."],
["sliderdecimal:handle_css", "sliderdecimal:handle_css=\"${1:padding\:5px\;background\:blue\;}\"${0}", "Configure the CSS style for the slider handle."],
["sliderdecimal:handle_offscale_css", "sliderdecimal:handle_offscale_css=\"${1:background\:green\;}\"${0}", "Configure the CSS style for the slider handle in its initial position."],
["sliderdecimal:handle_focus_css", "sliderdecimal:handle_focus_css=\"${1:background\:orange\;}\"${0}", "Configure the CSS style for the slider handle when it has focus."],
["sliderdecimal:handle_hover_css", "sliderdecimal:handle_hover_css=\"${1:border\:1px solid black\;}\"${0}", "Configure the CSS style for the slider handle when it's hovered over."],
["sliderdecimal:handle_active_css", "sliderdecimal:handle_active_css=\"${1:background\:yellow\;}\"${0}", "Configure the CSS style for the handle when the value is being updated."],
["sliderdecimal:track_css", "sliderdecimal:track_css=\"${1:background\:black\;border\:5px dotted green\;}\"${0}", "Configure the CSS style for the slider track."],
["sliderdecimal:track_hover_css", "sliderdecimal:track_hover_css=\"${1:background\:yellow\;}\"${0}", "Configure the CSS style for the slider track when it or the handle is hovered over."],
["sliderdecimal:track_active_css", "sliderdecimal:track_active_css=\"${1:opacity\:0\.5\;}\"${0}", "Configure the CSS style for the slider track when it has focus or the value is changing."],
["sliderdecimal:track_range_css", "sliderdecimal:track_range_css=\"${1:background\:indigo\;}\"${0}", "Configure the CSS style for the slider track range"],
["starrating:tooltips", "starrating:tooltips=\"${1:0}\"${0}", "Toggles tooltips on/off depending on whether you want to show these to the participants."],
["starrating:tooltips_skin", "starrating:tooltips_skin=\"${1|facebook,yellow,salmon,blue,lime,liquid,light,lavender,dark,cloud,black|}\"${0}", "Allows you to specify a “skin” (theme) for the tooltips."],
["starrating:tooltips_css", "starrating:tooltips_css=\"${1:font-size\:14px\;}\"${0}", "Allows you to add CSS to customize the look of the tooltips."],
["starrating:star_css", "starrating:star_css=\"${1:color\:\#aee4f3\;}\"${0}", "Allows you customize the default look of the stars using CSS."],
["starrating:star_selected_css", "starrating:star_selected_css=\"${1:color\:\#00bff3\;}\"${0}", "Use this to customize the look of the stars when selected."],
["starrating:star_char", "starrating:star_char=\"${1:\&\#61446\;}\"${0}", "The stars use 'Font Awesome', a graphical font, for display."],
["starrating:star_selected_char", "starrating:star_selected_char=\"${1:\&\#61445\;}\"${0}", "Just like the starrating:star_char, uses 'Font Awesome' font for display, but to customize the character shown for the selected ratings."],
["hottext:atleast", "hottext:atleast=\"${1:5}\"${0}", "The number of required highlighted answers that must be selected before the \"Continue\" button is enabled."],
["hottext:atmost", "hottext:atmost=\"${1:10}\"${0}", "The maximum number of highlighted answers that can be selected."],
["hottext:marker_color", "hottext:marker_color=\"${1:\#39B54A}\"${0}", "The color of the marker for the \\\<choice\\\> element."],
["hottext:nospace", "hottext:nospace=\"${1:0}\"${0}", "Determines whether a trailing space is added after the \\\<row\\\> item."],
["hottext:prefix_html", "hottext:prefix_html=\"${1:pretext}\"${0}", "HTML code to insert before this \\\<row\\\> element. Values provided here will not be selectable."],
["hottext:suffix_html", "hottext:suffix_html=\"${1:posttext}\"${0}", "HTML code to insert after this \\\<row\\\> element. Values provided here will not be selectable."],
["hottext:disable", "hottext:disable=\"${1:0}\"${0}", "Determines whether to disable the row item so that it cannot be selected."],
["hottext:containerCSS", "hottext:containerCSS=\"${1:border\:5px solid black\;}\"${0}", "CSS for the main text highlighter container."],
["hottext:headerCSS", "hottext:headerCSS=\"${1:background-color\:red\;}\"${0}", "CSS for the header container containing the highlighter marker buttons."],
["hottext:headerStickyCSS", "hottext:headerStickyCSS=\"${1:border\:1px solid black\;}\"${0}", "CSS for the header container containing the highlighter marker buttons when it is in \"sticky mode\". This happens when the participant has scrolled down far enough to make the header follow the view, sticking to the top of the screen for convenience."],
["hottext:buttonGroupCSS", "hottext:buttonGroupCSS=\"${1:margin\:0px\;}\"${0}", "CSS for the container containing the highlighter markers."],
["hottext:markerCSS", "hottext:markerCSS=\"${1:font-weight\:bold\;color\:black\;}\"${0}", "CSS for the highlighter marker buttons."],
["hottext:iconBrushCSS", "hottext:iconBrushCSS=\"${1:border\:1px solid black\;}\"${0}", "CSS for the brush icons present in the highlighter marker buttons."],
["hottext:markerSelectedCSS", "hottext:markerSelectedCSS=\"${1:font-weight\:bold\;}\"${0}", "CSS for the highlighter marker button currently in use."],
["hottext:contentCSS", "hottext:contentCSS=\"${1:font-weight\:bold\;padding\:2px\;}\"${0}", "CSS for the container containing the selectable elements that can be highlighted."],
["hottext:spotImageCSS", "hottext:spotImageCSS=\"${1:padding\:15px\;}\"${0}", "CSS for the containers containing any images present within the content area."],
["hottext:spotDisableCSS", "hottext:spotDisableCSS=\"${1:1}\"${0}", "CSS for any \\\<row\\\> elements that are hottext\:disabled=\"1\"."],
["hottext:footerCSS", "hottext:footerCSS=\"${1:background\:\#efefef\;border\:1px solid \#ccc\;border-top\:none\;}\"${0}", "CSS for the footer that can (optionally) contain the opt-out option."],
["hottext:overlayCSS", "hottext:overlayCSS=\"${1:width\:100\%\;height\:100\%\;opacity\:0.2\;}\"${0}", "CSS for the overlay that is (by default) not visible."],
["hottext:report_custom_chart", "hottext:report_custom_chart=\"${1|ransomword,colorcodeword,wordcloud|}\"${0}", "The default custom chart to display in the Crosstabs report (ransomword, colorcodeword, wordcloud)."],
["hottext:report_legend_palette", "hottext:report_legend_palette=\"${1:\#000000\|\|\#3d3d3d\|\|\#6d6d6d\|\|\#9d9d9d\|\|\#d1d1d1}\"${0}", "Custom colors to provide to replace the color palette used in the Crosstabs report (delimited by double pipes, || )."],
["autosum:preText", "autosum:preText=\"${1:\$}\"${0}", "The text or symbols appearing to the left side of the answer field. Can be applied on row or column tags (depending on grouping)."],
["autosum:postText", "autosum:postText=\"${1:\%}\"${0}", "The text or symbols appearing to the right side of the answer field. Can be applied on row or column tags (depending on grouping)."],
["autosum:sumPreText", "autosum:sumPreText=\"${1:Total\:}\"${0}", "The text that appears to the left side of the sum indicator. Can be applied on row or column tags (depending on grouping)."],
["autosum:color", "autosum:color=\"${1:red}\"${0}", "The color of the Autosum indicator when the sum does not meet the required amount. Enter either a hex color code or valid CSS color name. Can be applied on row or column tags (depending on grouping)."],
["autosum:prefill", "autosum:prefill=\"${1:0}\"${0}", "The number with which the answer fields are pre-filled. Can be applied on row or column tags (depending on grouping)."],
["autosum:showRemaining", "autosum:showRemaining=\"${1:1}\"${0}", "When using autosum:showRemaining=\"1\", the Autosum indicator will start with the required total and calculate the remaining amount. Can be applied on row or column tags (depending on grouping)."],
["autosum:legendPosition", "autosum:legendPosition=\"${1|top,bottom|}\"${0}", "The position of the autosum legend in the answer grid. Options include \"top\" or \"bottom\"."],
["autosum:disabled", "autosum:disabled=\"${1:1}\"${0}", "Disable summing for a particular column, row or question (depends on grouping)."],
["autosum:amount", "autosum:amount=\"${1:70}\"${0}", "The threshold the amount must be enough to return autosum:color back to the default color. During summing, the sum color is displayed in \"red\" (see autosum:color above). Can be applied on row or column tags (depending on grouping)."],];


module.exports = {
	formattingSnippets
}