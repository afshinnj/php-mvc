<div class="panel panel-info">
  <?= Html::form_open('sectionAdd',[],[]); ?>
  <div class="panel-heading">
    <h3 class="panel-title">
      <?= Html::submitButton(['class' => 'btn btn-info'], Language::get('Save'), '') ?>
    </h3>

  </div>
  <div class="panel-body">

    <div class="form-group">
      <?= Html::getLable('title', 'lable', ['class' => "lable"]);?>
      <?php echo Html::inputText('title', '', ['class'=>'form-control']) ?>
      <p class="help-block valid"><?php echo Valid::error('title'); ?></p>
    </div>

  </div>
  <?= Html::form_close(); ?>
</div>
