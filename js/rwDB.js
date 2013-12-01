function readData(user, song)
{
    
      var xmlhttp;
      if (window.XMLHttpRequest)
             {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
     else
         {// code for IE6, IE5
         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
  
        xmlhttp.open("GET","PHP/readData.php?User="+user+"&Song="+song,true);
        xmlhttp.send();
        
      xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
      {
          //xmlDoc = $.parseXML(xmlhttp.responseText ),
          //$xml = $( xmlDoc ),
          $xml = xmlhttp.responseXML;
          if($xml.getElementsByTagName("H0").length !== 0 ){
            hue0 = $xml.getElementsByTagName( "H0" )[0].textContent;
            hue1 = $xml.getElementsByTagName( "H1" )[0].textContent;
            hue2 = $xml.getElementsByTagName( "H2" )[0].textContent;
            setColor(hue0, hue1, hue2);
          }
      }
    }
}


function writeData(user, song, h0, h1, h2)
{
    
    var xmlhttp;
        if (window.XMLHttpRequest)
             {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }
     else
         {// code for IE6, IE5
         xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        

        xmlhttp.open("POST","PHP/writeData.php",true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send("User="+user+"&Song="+song+"&H0="+h0+"&H1="+h1+"&H2="+h2);
        
         xmlhttp.onreadystatechange=function()
      {
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          $xml = xmlhttp.responseXML;
          if($xml.getElementsByTagName("H0").length !== 0 ){
             // hue0 = $xml.getElementsByTagName( "H0" )[0].textContent;
        //    hue1 = $xml.getElementsByTagName( "H1" )[0].textContent;
        //    hue2 = $xml.getElementsByTagName( "H2" )[0].textContent;
        //    alert("<p>Server color:"+hue0+" "+hue1+" "+hue2+"</p>"+"<p>local color:"+r+" "+g+" "+b+"</p>");
          }
        }
      }
}


   
   
