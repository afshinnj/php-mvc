<?php

class Html {

    /**
     *
     * @param type $text
     * @param string $url
     * @param type $attributes
     * @return string
     *
     */
    public static function a($text = null, $url = null, $attributes = array()) {
        $url = Base::baseUrl() . preg_replace(Configs::get('invalidUrlChars'), '', $url);
        $a = '<a';
        $a .= ' href="' . $url . '"';
        $a .= self::_attributes_to_string($attributes);
        $a .='>' . $text . '</a>';
        return $a;
    }

    /**
     *
     * @param type $action
     * @param type $attributes
     * @param type $hidden
     * @return string
     *
     */
    public static function form_open($action = '', $attributes = array(), $hidden = array()) {
        $attributes = _attributes_to_string($attributes);

        if (stripos($attributes, 'method=') === FALSE) {
            $attributes .= ' method="post"';
        }

        if (stripos($attributes, 'accept-charset=') === FALSE) {
            $attributes .= ' accept-charset="' . strtolower('utf8') . '"';
        }
        $form = '<form action="' .  htmlspecialchars(Base::siteUrl($action)) . '"' . $attributes . ">\n";
        // Add CSRF field if enabled, but leave it out for GET requests and requests to external websites
        if (Configs::get('csrf_protection') === TRUE) {
            $hidden[Configs::get('csrf_token_name')] = Encryption::token();
        }

        if (is_array($hidden)) {
            foreach ($hidden as $name => $value) {
                $form .= '<input type="hidden" name="' . $name . '" value="' . htmlentities($value, ENT_QUOTES, "UTF-8") . '" style="display:none;" />' . "\n";
            }
        }

        return $form;
    }

    /**
     *
     * @param type $extra
     * @return type
     *
     */
    public static function form_close($extra = '') {
        return '</form>' . $extra;
    }

    /**
     *
     * @param type $data
     * @param type $value
     * @param type $extra
     * @return type
     *
     *
     */
    public static function inputText($data = '', $value = '', $extra = '') {
        if (isset($_COOKIE[$data])) {
            $value = htmlspecialchars($_COOKIE[$data]);
        }
        $defaults = array(
            'type' => 'text',
            'name' => is_array($data) ? '' : $data,
            'value' => $value
        );

        return '<input ' . self::_parse_form_attributes($data, $defaults) . self::_attributes_to_string($extra) . " />\n";
    }
    /**
     *
     * @param type $data
     * @param type $value
     * @param type $extra
     * @return type
     *
     *
     */
    /*public static function inputTextarea($data = '', $value = '', $extra = '') {
        if (isset($_COOKIE[$data])) {
            $value = htmlspecialchars($_COOKIE[$data]);
        }
        $defaults = array(
            'type' => 'textarea',
            'name' => is_array($data) ? '' : $data,

        );
        return '<textarea '. self::_parse_form_attributes($data, $defaults) . self::_attributes_to_string($extra) . '>'.$value.'</textarea>';
    }*/
    /**
     * Textarea field
     *
     * @param	mixed	$data
     * @param	string	$value
     * @param	mixed	$extra
     * @return	string
     */
    public static function inputTextarea($data = '', $value = '', $extra = '')
    {
      $val = '';
      $defaults = array(
        'name' => is_array($data) ? '' : $data,
        'cols' => '40',
        'rows' => '10'
      );

      if ( ! is_array($data) OR ! isset($data['value']))
      {
        if (isset($_COOKIE[$data])) {
            $val = htmlspecialchars($_COOKIE[$data]);
        }
      }
      else
      {
        $val = $data['value'];
        unset($data['value']); // textareas don't use the value attribute
      }

      return '<textarea '._parse_form_attributes($data, $defaults)._attributes_to_string($extra).'>'
        .htmlentities($val, ENT_QUOTES, "UTF-8")
        ."</textarea>\n";
    }
    /**
     * Password Field
     *
     * Identical to the input function but adds the "password" type
     *
     * @param	mixed
     * @param	string
     * @param	mixed
     * @return	string
     */
    public static function inputPassword($data = '', $value = '', $extra = '') {
        if (isset($_COOKIE[$data])) {
           // $value = $_COOKIE[$data];
        }
        $defaults = array(
            'type' => 'password',
            'name' => is_array($data) ? '' : $data,
            'value' => $value
        );

        return '<input ' . self::_parse_form_attributes($data, $defaults) . self::_attributes_to_string($extra) . " />\n";
    }

    /**
     * Submit Button
     *
     * @param	mixed
     * @param	string
     * @param	mixed
     * @return	string
     */
    public static function submitButton($data = '', $value = '', $extra = '') {
        $defaults = array(
            'type' => 'submit',
            'name' => is_array($data) ? '' : $data,
            'value' => $value
        );

        return '<input ' . self::_parse_form_attributes($data, $defaults) . self::_attributes_to_string($extra) . " />\n";
    }

    /**
     *
     * @param type $attributes
     * @return boolean|string
     *
     */
    private static function _attributes_to_string($attributes) {

        if (empty($attributes)) {
            return '';
        }

        if (is_object($attributes)) {
            $attributes = (array) $attributes;
        }

        if (is_array($attributes)) {
            $atts = '';

            foreach ($attributes as $key => $val) {
                $atts .= ' ' . $key . '="' . $val . '"';
            }

            return $atts;
        }

        if (is_string($attributes)) {
            return ' ' . $attributes;
        }

        return FALSE;
    }

    /**
     * Parse the form attributes
     *
     * Helper function used by some of the form helpers
     *
     * @param	array	$attributes	List of attributes
     * @param	array	$default	Default values
     * @return	string
     */
    public static function _parse_form_attributes($attributes, $default) {
        if (is_array($attributes)) {
            foreach ($default as $key => $val) {
                if (isset($attributes[$key])) {
                    $default[$key] = $attributes[$key];
                    unset($attributes[$key]);
                }
            }

            if (count($attributes) > 0) {
                $default = array_merge($default, $attributes);
            }
        }

        $att = '';

        foreach ($default as $key => $val) {
            if ($key === 'value') {
                $val = htmlentities($val, ENT_QUOTES, "UTF-8");
            } elseif ($key === 'name' && !strlen($default['name'])) {
                continue;
            }

            $att .= $key . '="' . $val . '" ';
        }

        return $att;
    }
    /**
     *
     * @param type $labels
     */
    public static function selLable($labels = []){
        $_COOKIE['labels'] = $labels;
    }
    /**
     *
     * @param type $label_text
     * @param type $id
     * @param type $attributes
     * @return type
     */
    public static function getLable($label_text = '', $id = '', $attributes = array()){

      		$label = '<label';

      		if ($id !== '')
      		{
      			$label .= ' for="'.$id.'"';
      		}

      		if (is_array($attributes) && count($attributes) > 0)
      		{
      			foreach ($attributes as $key => $val)
      			{
      				$label .= ' '.$key.'="'.$val.'"';
      			}
      		}

          if (isset($_COOKIE['labels'][$label_text])) {
              return $label.'>'.$_COOKIE['labels'][$label_text].'</label>';
          }else{
            	return $label.'>'.$label_text.'</label>';
          }

    }

      /**
      *
      *
      */
    public static function encode($input) {

        return htmlentities($input, ENT_QUOTES, "UTF-8");
    }

    /**
    *
    *
    */

    public static function PostSubmit($name = '', $value = '', $extra = '', $action = '', $hidden = array()){

      $defaults = array(
          'type' => 'submit',
          'name' => $name ? '' : $name,
          'value' => $value
      );
      $form = '<form accept-charset="utf8" method="post" action="'.htmlspecialchars(Base::siteUrl($action)).'">';
      // Add CSRF field if enabled, but leave it out for GET requests and requests to external websites
      if (Configs::get('csrf_protection') === TRUE) {
          $hidden[Configs::get('csrf_token_name')] = Encryption::token();
      }

      if (is_array($hidden)) {
          foreach ($hidden as $name => $value) {
              $form .= '<input type="hidden" name="' . $name . '" value="' . htmlentities($value, ENT_QUOTES, "UTF-8") . '" style="display:none;" />' . "\n";
          }
      }

      $form .='<input ' . self::_parse_form_attributes($name, $defaults) . self::_attributes_to_string($extra) . " />\n";
      $form .='</form>';
      return $form;
    }

    /**
    */
    public static function jDate($format = "Y-m-d"){

        echo jDateTime::date($format, false, false);//$date->date($format);

    }


    /**
  	 * Drop-down Menu
  	 *
  	 * @param	mixed	$data
  	 * @param	mixed	$options
  	 * @param	mixed	$selected
  	 * @param	mixed	$extra
  	 * @return	string
  	 */
  	public static function dropdown($data = '', $options = array(), $selected = array(), $extra = '')
  	{
  		$defaults = array();

  		if (is_array($data))
  		{
  			if (isset($data['selected']))
  			{
  				$selected = $data['selected'];
  				unset($data['selected']); // select tags don't have a selected attribute
  			}

  			if (isset($data['options']))
  			{
  				$options = $data['options'];
  				unset($data['options']); // select tags don't use an options attribute
  			}
  		}
  		else
  		{
  			$defaults = array('name' => $data);
  		}

  		is_array($selected) OR $selected = array($selected);
  		is_array($options) OR $options = array($options);

  		// If no selected state was submitted we will attempt to set it automatically
  		if (empty($selected))
  		{
  			if (is_array($data))
  			{
  				if (isset($data['name'], $_POST[$data['name']]))
  				{
  					$selected = array($_POST[$data['name']]);
  				}
  			}
  			elseif (isset($_POST[$data]))
  			{
  				$selected = array($_POST[$data]);
  			}
  		}

  		$extra = _attributes_to_string($extra);

  		$multiple = (count($selected) > 1 && stripos($extra, 'multiple') === FALSE) ? ' multiple="multiple"' : '';

  		$form = '<select '.rtrim(_parse_form_attributes($data, $defaults)).$extra.$multiple.">\n";

  		foreach ($options as $key => $val)
  		{
  			$key = (string) $key;

  			if (is_array($val))
  			{
  				if (empty($val))
  				{
  					continue;
  				}

  				$form .= '<optgroup label="'.$key."\">\n";

  				foreach ($val as $optgroup_key => $optgroup_val)
  				{
  					$sel = in_array($optgroup_key, $selected) ? ' selected="selected"' : '';
  					$form .= '<option value="'.htmlentities($optgroup_key, ENT_QUOTES, "UTF-8").'"'.$sel.'>'
  						.(string) $optgroup_val."</option>\n";
  				}

  				$form .= "</optgroup>\n";
  			}
  			else
  			{
  				$form .= '<option value="'.htmlentities($key, ENT_QUOTES, "UTF-8").'"'
  					.(in_array($key, $selected) ? ' selected="selected"' : '').'>'
  					.(string) $val."</option>\n";
  			}
  		}

  		return $form."</select>\n";
  	}



    /**
     * Hidden Input Field
     *
     * Generates hidden fields. You can pass a simple key/value string or
     * an associative array with multiple values.
     *
     * @param	mixed	$name		Field name
     * @param	string	$value		Field value
     * @param	bool	$recursing
     * @return	string
     */
    function form_hidden($name, $value = '', $recursing = FALSE)
    {
      static $form;

      if ($recursing === FALSE)
      {
        $form = "\n";
      }

      if (is_array($name))
      {
        foreach ($name as $key => $val)
        {
          form_hidden($key, $val, TRUE);
        }

        return $form;
      }

      if ( ! is_array($value))
      {
        $form .= '<input type="hidden" name="'.$name.'" value="'.htmlentities($value, ENT_QUOTES, "UTF-8")."\" />\n";
      }
      else
      {
        foreach ($value as $k => $v)
        {
          $k = is_int($k) ? '' : $k;
          form_hidden($name.'['.$k.']', $v, TRUE);
        }
      }

      return $form;
    }

    /**
  	 * Upload Field
  	 *
  	 * Identical to the input function but adds the "file" type
  	 *
  	 * @param	mixed
  	 * @param	string
  	 * @param	mixed
  	 * @return	string
  	 */
  	function form_upload($data = '', $value = '', $extra = '')
  	{
  		$defaults = array('type' => 'file', 'name' => '');
  		is_array($data) OR $data = array('name' => $data);
  		$data['type'] = 'file';

  		return '<input '._parse_form_attributes($data, $defaults)._attributes_to_string($extra)." />\n";
  	}

    /**
     * Multi-select menu
     *
     * @param	string
     * @param	array
     * @param	mixed
     * @param	mixed
     * @return	string
     */
    function form_multiselect($name = '', $options = array(), $selected = array(), $extra = '')
    {
      $extra = _attributes_to_string($extra);
      if (stripos($extra, 'multiple') === FALSE)
      {
        $extra .= ' multiple="multiple"';
      }

      return form_dropdown($name, $options, $selected, $extra);
    }

    /**
     * Checkbox Field
     *
     * @param	mixed
     * @param	string
     * @param	bool
     * @param	mixed
     * @return	string
     */
    function form_checkbox($data = '', $value = '', $checked = FALSE, $extra = '')
    {
      $defaults = array('type' => 'checkbox', 'name' => ( ! is_array($data) ? $data : ''), 'value' => $value);

      if (is_array($data) && array_key_exists('checked', $data))
      {
        $checked = $data['checked'];

        if ($checked == FALSE)
        {
          unset($data['checked']);
        }
        else
        {
          $data['checked'] = 'checked';
        }
      }

      if ($checked == TRUE)
      {
        $defaults['checked'] = 'checked';
      }
      else
      {
        unset($defaults['checked']);
      }

      return '<input '._parse_form_attributes($data, $defaults)._attributes_to_string($extra)." />\n";
    }

    /**
     * Radio Button
     *
     * @param	mixed
     * @param	string
     * @param	bool
     * @param	mixed
     * @return	string
     */
    function form_radio($data = '', $value = '', $checked = FALSE, $extra = '')
    {
      is_array($data) OR $data = array('name' => $data);
      $data['type'] = 'radio';

      return form_checkbox($data, $value, $checked, $extra);
    }

    /**
     * Reset Button
     *
     * @param	mixed
     * @param	string
     * @param	mixed
     * @return	string
     */
    function form_reset($data = '', $value = '', $extra = '')
    {
      $defaults = array(
        'type' => 'reset',
        'name' => is_array($data) ? '' : $data,
        'value' => $value
      );

      return '<input '._parse_form_attributes($data, $defaults)._attributes_to_string($extra)." />\n";
    }

    /**
     * Form Button
     *
     * @param	mixed
     * @param	string
     * @param	mixed
     * @return	string
     */
    function form_button($data = '', $content = '', $extra = '')
    {
      $defaults = array(
        'name' => is_array($data) ? '' : $data,
        'type' => 'button'
      );

      if (is_array($data) && isset($data['content']))
      {
        $content = $data['content'];
        unset($data['content']); // content is not an attribute
      }

      return '<button '._parse_form_attributes($data, $defaults)._attributes_to_string($extra).'>'
        .$content
        ."</button>\n";
    }


    /**
     * Fieldset Tag
     *
     * Used to produce <fieldset><legend>text</legend>.  To close fieldset
     * use form_fieldset_close()
     *
     * @param	string	The legend text
     * @param	array	Additional attributes
     * @return	string
     */
    function form_fieldset($legend_text = '', $attributes = array())
    {
      $fieldset = '<fieldset'._attributes_to_string($attributes).">\n";
      if ($legend_text !== '')
      {
        return $fieldset.'<legend>'.$legend_text."</legend>\n";
      }

      return $fieldset;
    }

    /**
     * Fieldset Close Tag
     *
     * @param	string
     * @return	string
     */
    function form_fieldset_close($extra = '')
    {
      return '</fieldset>'.$extra;
    }

    /**
     * Form Prep
     *
     * Formats text so that it can be safely placed in a form field in the event it has HTML tags.
     *
     * @deprecated	3.0.0	An alias for html_escape()
     * @param	string|string[]	$str		Value to escape
     * @return	string|string[]	Escaped values
     */
    function form_prep($str)
    {
      return html_escape($str, TRUE);
    }

}
