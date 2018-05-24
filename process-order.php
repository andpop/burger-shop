<?php
$outMessage = '';
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

$to = 'andpop@mail.ru'; 
$subject = 'Заказ бургера'; 

// var_dump($_POST);

$message = '
  <html>
      <head>
          <title>'.$subject.'</title>
      </head>
      <body>
          <p>Имя: '.$_POST['name'].'</p>
          <p>Телефон: '.$_POST['tel'].'</p>   
          <p>Улица: '.$_POST['street'].'</p>                        
          <p>Дом: '.$_POST['house'].'</p>                        
          <p>Корпус: '.$_POST['block'].'</p>                        
          <p>Квартира: '.$_POST['flat'].'</p>  
          <p>Этаж: '.$_POST['floor'].'</p>  
          <p>Комментарий: '.$_POST['comment'].'</p>  
          <p>Требуется сдача: '.$_POST['payment'].'</p>  
          <p>Оплата по карте: '.$_POST['payment'].'</p>  
          <p>Не перезванивать: '.$_POST['nocallback'].'</p>     						
      </body>
  </html>'; 
$headers  = "Content-type: text/html; charset=utf-8 \r\n"; 
$headers .= "From: Отправитель <andrvpopov@gmail.com>\r\n"; 
// mail($to, $subject, $message, $headers); 
// echo 'Заказ отправлен. Менеджер свяжется с Вами в ближайшее время';
echo $message;