<?php

function form_dropdown($name = '', $options = array(), $selected = '', $attributes = '', $title = '') {
	
	if( empty( $options ) ) {
		return false;	
	}
	
	if (is_array( $attributes ) ) {
		$atts = '';
		foreach ($attributes as $key => $val) {
			$atts .= ' ' . $key . '="' . $val . '"';
		}
		$attributes = $atts;
	}
		
	$form = '<select name="'.$name.'" '.$attributes.">\n";
	if ($title != ''){
	//$form .= "<option value=\"0\">Choose a $title</option>\n";
	$form .= '<option value="0">'.$title."</option>\n";
	}
	foreach ($options as $key => $val)
	{
		$sel = ($selected != $key) ? '' : ' selected="selected"';
		
		$form .= '<option value="'.$key.'"'.$sel.'>'.$val."</option>\n";
	}

	$form .= '</select> ';
	
	return $form;
}
