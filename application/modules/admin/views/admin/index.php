<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title"> لیست کارها</h3>
  </div>
  <div class="panel-body">
        <ul>
          <li>اضافه کردن قسمت بخش ها</li>
          <li>کار بر روی اعتبار سنجی</li>
        </ul>
          <?= Html::form_open('upload',['enctype'=>'multipart/form-data'])?>
          <?= Html::upload('upload')?>
          <?= Html::submitButton('send','Send')?>
          <?= Html::form_close();?>
  </div>
</div>
