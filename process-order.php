<?php
$outMessage = '';

// Имя и телефон должны быть указаны обязательно
$isError = false;
if (empty($_POST['name'])) {
  $isError = true;
  $outMessage .= 'Не указано имя.<br>';
};
if (empty($_POST['tel'])) {
  $isError = true;
  $outMessage .= 'Не указан телефон.<br>';
};
if ($isError) {
  echo 'Ошибка при обработке заказа: '.$outMessage;
  die();
}

// var_dump($_POST);
// die();

$to = 'andrey@localhost'; 
$subject = 'Заказ бургера'; 

$name = '<b>'.$_POST['name'].'</b>';
$tel = '<b>'.$_POST['tel'].'</b>';
$street = '<b>'.(empty($_POST['street']) ? 'Не указана' : $_POST['street']).'</b>';
$house = '<b>'.(empty($_POST['house']) ? 'Не указан' : $_POST['house']).'</b>';
$block = '<b>'.(empty($_POST['block']) ? 'Не указан' : $_POST['block']).'</b>';
$flat = '<b>'.(empty($_POST['flat']) ? 'Не указан' : $_POST['flat']).'</b>';
$floor = '<b>'.(empty($_POST['floor']) ? 'Не указан' : $_POST['floor']).'</b>';
$comment = '<i>'.(empty($_POST['comment']) ? 'Не указан' : $_POST['comment']).'</i>';
$callback_need = isset($_POST['nocallback']) ? 'Нет' : 'Да';
$callback_need = '<b>'.$callback_need.'</b>';
if ($_POST['payment'] == 'cashback') {
  $payment = '<b>Потребуется сдача</b>';
} elseif ($_POST['payment'] == 'card') {
  $payment = '<b>Оплата картой</b>';
} else {
  $payment = '<b>Параметры не указаны</b>';
};

$message = '
  <html>
      <head>
          <title>'.$subject.'</title>
      </head>
      <body>
          <p>Имя: '.$name.'</p>
          <p>Телефон: '.$tel.'</p>   
          <hr>
          <p>Улица: '.$street.'</p>                        
          <p>Дом: '.$house.'</p>                        
          <p>Корпус: '.$block.'</p>                        
          <p>Квартира: '.$flat.'</p>  
          <p>Этаж: '.$floor.'</p>  
          <hr>
          <p>Комментарий: '.$comment.'</p>  
          <hr>
          <p>Оплата: '.$payment.'</p>  
          <hr>
          <p>Перезвонить: '.$callback_need.'</p>     						
      </body>
  </html>'; 
$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: Отправитель <andrvpopov@gmail.com>\r\n"; 
// mail($to, $subject, $message, $headers); 
echo 'Заказ отправлен. Менеджер свяжется с Вами в ближайшее время';
echo $message;