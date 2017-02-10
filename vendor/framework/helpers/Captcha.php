<?php
/**
 *
 */
class Captcha
{

  function __construct()
  {
    # code...
  }

  public static function Create(){

    $im = imagecreatetruecolor(120, 50);

    // Create some colors
    $white = imagecolorallocate($im, 255, 255, 255);
    $grey = imagecolorallocate($im, 128, 128, 128);
    $black = imagecolorallocate($im, 0, 0, 0);
    imagefilledrectangle($im, 0, 0, 399, 50, $white);


    $alphabet = array_merge(range('A', 'Z'), range(0, 9));
    $text ='';
    for($i = 0; $i < 6; $i++) {
        $text .= $alphabet[rand(0, count($alphabet) - 1)];
    }
    $_SESSION['captcha'] = $text;
    $backColor = ImageColorAllocate($im, 0, 0, 0);
    $font = 'assets/framework/captcha/times_new_yorker.ttf';
    ImageFill($im, 25, 100, $backColor);
    $position = 20;
    $space = 15;
    for($i = 0; $i < 6; $i++) {
        $rotate = rand(-10, 10);
        $box = ImageTTFBBox(15, $rotate, $font, $text);
        $foreColor = ImageColorAllocate($im,0,0,0);
        ImageTTFText($im, 15, $rotate, $position, (50 - $box[5]) / 2, $foreColor, $font, $text[$i]);
        $position += $space;
    }
    $length	= strlen($text);
    $angle	= ($length >= 6) ? mt_rand(-($length-6), ($length-6)) : 0;
    $x_axis	= mt_rand(6, (360/$length)-16);
    $y_axis = ($angle >= 0) ? mt_rand(50, 120) : mt_rand(6, 50);

    $theta		= 1;
    $thetac		= 7;
    $radius		= 16;
    $circles	= 20;
    $points		= 32;

    for ($i = 0, $cp = ($circles * $points) - 1; $i < $cp; $i++)
    {
      $theta += $thetac;
      $rad = $radius * ($i / $points);
      $x = ($rad * cos($theta)) + $x_axis;
      $y = ($rad * sin($theta)) + $y_axis;
      $theta += $thetac;
      $rad1 = $radius * (($i + 1) / $points);
      $x1 = ($rad1 * cos($theta)) + $x_axis;
      $y1 = ($rad1 * sin($theta)) + $y_axis;
      imageline($im, $x, $y, $x1, $y1, $grey);
      $theta -= $thetac;
    }
    // Create the border
    imagerectangle($im, 0, 0, 120 - 1, 50 - 1, $grey);
    ob_start();
    imagepng($im);
    $imageData = base64_encode(ob_get_clean());
    // Free up memory
    imagedestroy($im);
    echo  '<image src="data:image/png;base64, '.$imageData.'"/>';
  }

  public static function Validate($captcha = null){
      if($captcha == $_SESSION['captcha']){
        return TRUE;
      }
      else {
        return FALSE;
      }

  }
}
