let firSnippets = [
["fir:off", "fir:off=\"${1:1}\"${0}", "Specify whether the question should use the form image replacement style or not."],
["fir:icon_radio", "fir:icon_radio=\"${1:fa-rocket}\"${0}", "Classname of the icon to replace the default radio button when it's not selected. By default, Font Awesome is used and requires the prefix fa- to be used for all icons. Requirements: Must be used with fir:icon_radio_checked"],
["fir:icon_radio_checked", "fir:icon_radio_checked=\"${1:fa-rocket}\"${0}", "Classname of the icon to replace the default radio button when it's selected. By default, Font Awesome is used and requires the prefix fa- to be used for all icons. Requirements: Must be used with fir:icon_radio"],
["fir:icon_checkbox", "fir:icon_checkbox=\"${1:fa-heart-o}\"${0}", "Classname of the icon to replace the default checkbox button when it's not selected. By default, Font Awesome is used and requires the prefix fa- to be used for all icons. Requirements: Must be used with fir:icon_checkbox_checked"],
["fir:icon_checkbox_checked", "fir:icon_checkbox_checked=\"${1:fa-heart}\"${0}", "Classname of the icon to replace the default checkbox button when it's selected. By default, Font Awesome is used and requires the prefix fa- to be used for all icons. Requirements: Must be used with fir:icon_checkbox"],
["fir:icon_css", "fir:icon_css=\"${1:font-size\:75px\;}\"${0}", "CSS that applies to the form image element. Use this to customize the size and color of the image."],
["fir:icon_checked_css", "fir:icon_checked_css=\"${1:font-size\:75px\;}\"${0}", "CSS that applies to the form image element in the selected state. Use this to customize the size and color of the image."],
["fir:wrap_css", "fir:wrap_css=\"${1:font-size\:75px\;}\"${0}", "CSS that applies to the container holding the default input image."],
["fir:wrap_checked_css", "fir:wrap_checked_css=\"${1:font-size\:75px\;}\"${0}", "CSS that applies to the container holding the default selected input image."],
["fir:wrap_disabled_css", "fir:wrap_disabled_css=\"${1:font-size\:75px\;}\"${0}", "CSS that applies to the container holding the disabled input image."],
["fir:image_css", "fir:image_css=\"${1:width\:40px\;height\:40px\;}\"${0}", "Use this to specify the width and height of the graphic."],
["fir:image_radio_css", "fir:image_radio_css=\"${1:background-image\: url(\'\[rel rad-1.png\]\')}\"${0}", "Specify the system file location of a custom radio form image using the “background” CSS property"],
["fir:image_checkbox_css", "fir:image_checkbox_css=\"${1:background-image:url(\'\[rel cb-1.png\]\')}\"${0}", "Specify the system file location of a custom checkbox form image using the \"background\" CSS property"],
];


module.exports = {
	firSnippets
}