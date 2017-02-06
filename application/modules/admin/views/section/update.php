<div class="panel panel-info">
  <?= Html::form_open('sectionEdit',[],['id'=>$find['id']]); ?>
  <div class="panel-heading">
    <h3 class="panel-title">
      <?= Html::submitButton(['class' => 'btn btn-info'], Language::get('Save'), '') ?>
    </h3>
      <?php print_r(Valid::$errors['error']);?>
  </div>
  <div class="panel-body">

    <div class="form-group">
      <?= Html::getLable('title', 'lable', ['class' => "lable"]);?>
      <?= Html::inputText('title', $find['title'], ['class'=>'form-control']) ?>
      <p class="help-block valid"><?= Valid::error('title'); ?></p>
    </div>

  </div>
  <?= Html::form_close(); ?>
</div>
