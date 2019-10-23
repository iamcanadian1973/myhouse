<?php

function languages_list_header(){
    $languages = icl_get_languages('skip_missing=0&orderby=code');
    $links = '';
    if(!empty($languages)){
        foreach($languages as $l){
            if( $l['active'] )
                continue;
            $language_code = str_replace ( 'zh-hans', '中文', $l['language_code'] );
            $links .= sprintf( '<a href="%s" class="ch">%s</a>', $l['url'], strtoupper( $language_code ) );
        }
    }
    return $links;
}