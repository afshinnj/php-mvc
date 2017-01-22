<div class="panel panel-info">
  <div class="panel-heading">
    <h3 class="panel-title"><?= Html::a(Language::get('Add'),'sectionAdd');?></h3>
  </div>
  <div class="panel-body">
    <?= Message::get('Success') ;?>
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th style="width: 20px"></th>
          <th style="width: 20px"></th>
        </tr>
      </thead>
      <?php foreach ($find as $row) :?>
        <tr>
          <td><?= $row['title'] ?></td>
          <td><?= Html::PostSubmit('edit',' ویرایش',['class'=>'btn btn-primary'],'sectionEdit',['id'=>$row['id']]);?></td>
          <td><?= Html::PostSubmit('delete','حذف',['class'=>'btn btn-danger'],'sectionDelete',['id'=>$row['id']]);?></td>
        </tr>
      <?php endforeach?>
    </table>
  </div>
</div>
