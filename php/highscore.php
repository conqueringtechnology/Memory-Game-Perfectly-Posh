<?php
$fileOutput = "../csv/gamedetails.csv";
$firstName = $_POST['firstname'];
$lastName = $_POST['lastname'];
$email = $_POST['email'];
$yourFinalScore = $_POST['yourfinalscore'];
$yourFinalTime = $_POST['yourfinaltime'];
$timeStamp = date("h:i:sa");
$dateStamp = date("m/d/y");
$commentsScoreForm = htmlentities($_POST['commentsscoreform']);
$submitScoreForm = $_POST['submitscoreform'];
//All data in one variable
$finalDetails = array($firstName,$lastName,$email,$yourFinalScore,$yourFinalTime,$timeStamp,$dateStamp,$commentsScoreForm);
//Open read file
$openFile = fopen($fileOutput, 'r');
fgetcsv($openFile);
fclose($openFile);
//Open & create file & write file
$openFile = fopen($fileOutput, 'a');
fputcsv($openFile, $finalDetails);
fclose($openFile);
//Email game details
//$to = 'kimberlymillikin@gmail.com';
$to = 'perfectlyposhgames@rochaenterprises.com';
$subject = 'Pefectly Posh Memory Game Submition';
$body =
'<html>
  <body>
    <h1>
      Perfectly Posh Memory Game
    </h1>
    <p>
      I played Perfectly Posh Memory Game. This is my game details and my information.
    </p>
    <p>
      My Name: '.$firstName.' '.$lastName.' <br />
      My Email: '.$email.' <br />
      My Score: '.$yourFinalScore.' <br />
      My Time: '.$yourFinalTime.' <br />
      My Comments: '.$commentsScoreForm.' <br />
      Time Stamp: '.$timeStamp.' <br />
      Date Stamp: '.$dateStamp.' <br />
    </p>
  </body>
</html>';
$headers = "From: " .$firstName." ".$lastName." "."<".$email.">" . "\r\n";
$headers .= "MIME-Version: 1.0 \r\n";
$headers .= "Content-Type: text/html; charset-uft-8";
if (isset($yourFinalScore )) {
    $send = mail($to, $subject, $body, $headers);
} else {
  exit(header('location: http://www.perfectlyposhmemorygame.rochaenterprises.com'));
}

//Redirect to success Page
header('location: gamedetailssent.php');
 ?>
