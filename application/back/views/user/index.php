<table dir="rtl">

    <?php foreach ($users as $row):?>
    <tr>
        <td><?php echo $row['username']?></td>
        <td><?php echo Html::a('حذف', "user/delete/id/".$row['id']."")?></td>
        <td><?php echo Html::a('ویرایش', "user/edit/id/".$row['id']."")?></td>
    </tr>
    <?php endforeach;?>
</table>

<ul>
    <li><?php echo Html::a('تغییر رمز عبور',"user/edit",['class' => 'link'])?></li>
    <li><?php echo Html::a('حذف کاربر',"user/delete",['class' => 'link'])?></li>
    <li><?php echo Html::a('ویرایش پروفایل',"profile",['class' => 'link'])?></li>
    <li><?php echo Html::a('خروج','user/loguot',['class' => 'link'])?></li>
</ul>
