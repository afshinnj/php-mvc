<?php  foreach ($post as $row): ?>
  <div class="panel panel-default">
    <div class="panel-body">
      <h3 class="panel-title"><?= $row['title'];?></h3>
    </div>
    <div class="panel-body">
      <?= $row['text'];?>
    </div>

  </div>

<?php endforeach?>
