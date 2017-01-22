<?php echo Html::form_open('change-password'); ?>

<div class="lable"><?php echo Html::getLable('username', 'lable', ['class' => "lable"]); ?></div>
<div><?php echo Html::inputText('username', $edit['username'], 'class="input"') ?></div>
<div><?php echo Valid::error('username'); ?></div>
<hr>




<div class="lable"><?php echo Html::getLable('oldpassword', 'lable', ['class' => "lable"]); ?></div>
<div><?php echo Html::inputPassword('oldpassword', '', 'class="input"') ?></div>
<div><?php echo Valid::error('oldpassword'); ?></div>
<hr>
<div class="lable"><?php echo Html::getLable('newpassword', 'lable', ['class' => "lable"]); ?></div>
<div><?php echo Html::inputPassword('newpassword', '', 'class="input"') ?></div>
<div><?php echo Valid::error('newpassword'); ?></div>
<hr>
<div class="lable"><?php echo Html::getLable('password_compare', 'lable', ['class' => "lable"]); ?></div>
<div><?php echo Html::inputPassword('password_compare', '', 'class="input"') ?></div>
<div><?php echo Valid::error('password_compare'); ?></div>

<?php echo Html::submitButton(['class' => 'input'], Langs::get('Save'), '') ?>

<?php echo Html::form_close(); ?>