<div class="panel panel-info">
  <?= Html::form_open('addPost',[],[]); ?>
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

    <div class="form-group">
      <?= Html::getLable('section', 'lable', ['class' => "lable"]);?>
      <?= Html::dropdown('section', $section,[], ['class'=>'form-control']) ?>
      <p class="help-block valid"><?php echo Valid::error('section'); ?></p>
    </div>

    <div class="form-group">
      <?= Html::getLable('text', 'lable', ['class' => "lable"]);?>
      <?php echo Html::inputTextarea('text', '', ['class'=>'form-control', 'id'=>'editor']) ?>
      <p class="help-block valid"><?php echo Valid::error('text'); ?></p>
    </div>

    <div class="form-group">
      <?= Html::getLable('tag', 'lable', ['class' => "lable"]);?>
      <?php echo Html::inputText('tag', '', ['class'=>'form-control']) ?>
      <p class="help-block valid"><?php echo Valid::error('tag'); ?></p>
    </div>

  </div>
  <?= Html::form_close(); ?>
</div>
