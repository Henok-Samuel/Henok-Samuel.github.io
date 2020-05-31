$(document).ready(() => {
  // const now = moment();
  const $body = $('body');
  $body.html('');
  //Create a header
 const $header = $('<h1 id=header>Twiddler</h1>');
  //Append header to body
  $body.append($header);
  const divButton = $('<div id=b class=center><button id=update>Update</button></div>').css('text-align:', 'center').on('click', function () {displayFeed(homeArray);});
 

  //Sections -----------------------------------------------------------------
  const $signInSection = $('<section id=signin></section>');
  const $logInSection = $('<section id=login></section>');
  const $signOutSection = $('<section id=signout></section>');
  const $feedSection = $('<section id=feed></section>');
  const $newTweetSection = $('<section id=newtweet></section>');
  const $buttonSection = $('<section id=button></section>');
  const $homeButtonSection = $('<section id=homebutton></section>');
  const $textAreaSection = $('<section id=textarea></section>');
  
  //Appending of Sections to the body 
  const $divForSignAndLog = $('<div id=sign-and-log></div>');


  $divForSignAndLog.append($signInSection);
  $divForSignAndLog.append($logInSection);
  $body.append($divForSignAndLog);
  $body.append($signOutSection);
  $body.append($textAreaSection);
  $body.append($buttonSection);
  $body.append($homeButtonSection);
  $buttonSection.append(divButton);
  $body.append($feedSection);
  if (logInUser) {
    $body.append($newTweetSection);
  }

  
  $divForText = $('<div id=div-text-area></div>');
  $textArea = $('<textarea id=textarea></textarea>');
  $labelText = $('<div id=labelText>Write a Tweet</div>');
  $divForButton = $('<div id=div-for-button >Write a Tweet</div>')
  $divForButt = $('<div id=div-for-butt ></div>')
  $buttonForTweet = $('<button id=add-tweet-button >Add Tweet</button>').on('click', function () {
  console.log('add tweet button works')
  window['visitor'] = name
  writeTweet($textArea.val());
  // document.getElementById("#textarea").value='';
  displayFeed(streams.users[name][0]);
  });
   $textAreaSection.append($buttonForTweet);
   
    $divForText.append($labelText);
    $divForText.append($textArea);
    $textAreaSection.append($divForText);
    $textAreaSection.append($buttonForTweet);


  // divForButt.append($buttonForTweet.append);
  // writeTweet($textArea.val());
  
  
  // displayFeed(homeArray);});

  // $divForText.append($labelText);


  // $buttonSection.prepend($divForText);

  // $buttonSection.append($divForButt);


  const homeArray = streams.home;



//Functions-------------------------------------------------------------------------------------
  function displayFeed(array) {
    console.log(array.length, 'length');
      $feedSection.empty();
      // console.log($textArea.val());
      // console.log(streams.users.guest);
  //Loop through the array starting from the last index all the way to the first element in the array
  if(array.length === 0){
    console.log(1);
    $feedSection.empty();
    $feedSection.append($(`<h1>No Tweets Posted By You</h1>`))
    return 

  }
  var $feedDiv= $('<div id=feeddiv></div>')
      for(let i = array.length - 1; i > -1; i--){
        //Current elemenet assigned to a variable called tweetObj
        let tweetObj = array[i];
        //Create a div container to contain divs of message, user, and time
        let $div = $('<div class=tweet-div ></div>');
        //Create divs for each message, each user, and each time and append them to $div
        $div.append(`<div id=${tweetObj.message} class=tweets>${tweetObj.message}</div>`);
        // $div.append(`<div id=${tweetObj.user} class=tweets tweetsuser>${tweetObj.user}</div>`);
        $div.append($(`<div id=${tweetObj.user} class=tweet-users  >@${tweetObj.user}</div>`).click(function() {
          console.log(tweetObj.user, 111);
          displayFeed(streams.users[tweetObj.user][0])}));
        $div.append(`<div id=${tweetObj.created_at} class=tweets t>${tweetObj.created_at}</div>`);
        //Append $div container to the feed section 
        $feedDiv.append($div);

      }
      $feedSection.append($feedDiv);
    } 
    // $(`<div id=${tweetObj.user} class=tweets tweetsuser>${tweetObj.user}</div>`).click(function() {
    //   displayFeed(streams.user[tweetObj.user])
  

  
//Functions-------------------------------------------------------------------------------------  




  var logInUser = '';

  //Sections -----------------------------------------------------------------------------




  // --------------------------------------------------------------------------------------
  if(logInUser === ''){
    $textAreaSection.hide()


  }
  displayFeed(homeArray);
  var name = '';

  //SIGN UP FORM --------------------------------------------------------------------------------------------
  const $signUpForm = $('<form id= sign-up-form><h1>Sign Up</h1><label for="username">Create User Name:</label><br><input type="text" id="s-name" name="fname" value=""><br><label for="password">Create Password:</label><br><input type="text" id="s-password" name="lname" value=""><br><br></form>')
  $signUpForm.append($('<input class=sign-up-button type=button value="Sign up">').click(function(){
    console.log($('#s-name').val());
    name = $('#s-name').val();
    console.log($('#s-password').val())
    signUp($('#s-name').val(), $('#s-password').val())
    // name = $('#s-user').val();
    $('#s-name').val('')
    $('#s-password').val('')
    alert('Sign Up Successful')
   
    
    $signInSection.hide();
    $logInSection.hide()
    $divForSignAndLog.hide();
    $signOutSection.append($(`<h1 class=center>Welcome ${name}</h1>`))
    $signOutSection.append($(`<div></div>`))
    $textAreaSection.show();
    $buttonSection.hide()
    displayFeed(streams.users[name][0]);
    $homeButtonSection.append('<button>Home Feed</button>').click(function(){
      
    });

    $signOutSection.append($('<input id=sign-out-button type="button" value="Sign Out"></input>').click(function(){
      $signOutSection.empty();
      $signInSection.show();
      $logInSection.show()
      // $buttonSection.hide();
      // $homeButtonSection.append('<button>Home Feed</button>');
      
      displayFeed(homeArray);
      if(streams.users[name][0] === 0){
        
        $feedSection.append('<div>No Tweets</div>');
      }
      }))
  
    console.log(streams.users, 89898);
  }));
  // const $signUpForm = $('<form id= sign-up-form><h1>Sign Up</h1><label for="username">Create User Name:</label><br><input type="text" id="s-name" name="fname" value=""><br><label for="password">Create Password:</label><br><input type="text" id="s-password" name="lname" value=""><br><br><button id=sign-up-but>Sign Upx</button></form>')
  // const $logInForm = $('<form id= log-in-form><h1>Log in</h1><label for="username">User name:</label><br><input type="text" id="log-user" name="fname" value=""><br><label for="password">Password:</label><br><input type="text" id="log-pass" name="lname" value=""><br><br></form>')
  const $newTweetForm = $('<form action="/action_page.php"><label for="newtweet">Tweet:</label><br><input type="text" id="newtweet" name="newTweet" value=""></form>')
 console.log($textArea.val());



 //LOG IN FORM -----------------------------------------------------------------------------------------------------------------
 const $logInForm = $('<form id= log-in-form><h1>Log in</h1><label for="username">User name:</label><br><input type="text" id="log-user" name="fname" value=""><br><label for="password">Password:</label><br><input type="text" id="log-pass" name="lname" value=""><br><br></form>')
 $logInForm.append($('<input type="button" value="Log in"></input>').click(function(){
  if(streams.users.hasOwnProperty($('#log-user').val()) && $('#log-pass').val() === streams.users[$('#log-user').val()][1]){
    // $signInSection.hide();
    console.log('log in works')
    name = $('#log-user').val();
    $signInSection.hide();
    $logInSection.hide()
    $signOutSection.append($(`<h1>Welcome ${name}</h1>`))
    $signOutSection.append($(`<div><label>Sign Out</label><br></div>`))
    $textAreaSection.show();
    console.log(streams.users[name][0], 9999);
    // if(streams.users[name][0] === 0){
      
    //   $feedSection.append('<div>No Tweets</div>');
    // }
    $signOutSection.append($('<input type="button" value="Sign Out"></input>').click(function(){
    $signOutSection.empty();
    $signInSection.show();
    $logInSection.show()
    
    displayFeed(homeArray);
    if(streams.users[name][0] === 0){
      
      $feedSection.append('<div>No Tweets</div>');
    }
    }))

    displayFeed(streams.users[name][0])
    // $signInSection.empty();
  }else{alert('Password is incorrect')}

}));

 //------------------------------------------------------------------------------------------------------------------------
//  sign-up-button
// const $signUpButton = $('.sign-up-button'); 
// $signUpButton.click(function(){
//   console.log($('#s-name').val());
//   console.log($('#s-password').val());
//   signUp($('#s-name').val(), $('#s-password').val())
//   console.log(streams.users, 89898);
  
// })

// $logInForm.click(function(){
//   // console.log($('#s-name').val());
//   // console.log($('#s-password').val());
//   // signUp($('#s-name').val(), $('#s-password').val())
//   // console.log(streams.users, 89898);
//   // alert('Sign up complete! Now log in!');

//   if(streams.users.hasOwnProperty($('#log-user').val()) && $('#log-pass').val() === streams.users[$('#log-user').val()][1]){
//     // $signInSection.hide();
//     console.log('log in works')
//     // $signInSection.empty();
//   }else{alert('Password is incorrect')}

// })
  
//  signUp( $('s-name').val(), $('s-password').val())
//  $('s-name').val()
//  $('s-password').val()
  //SET INTERVAL--------------------------------------
  // setInterval(function(){
  //   console.log(1);
  //   generateRandomTweet()
  //   displayFeed(homeArray);
  // }, 60000);

//-----------------------------------------------------

//Adding buttons and forms for sections ---------------------------------------------------
  // $feedSection.prepend($updateButton);
  $signInSection.append($signUpForm);
  $logInSection.append($logInForm);
  // newTweetSection.prepend($newTweetForm)
//-----------------------------------------------------------------------------------------

});

// if(streams.users.hasOwnProperty(key) && password === streams.users[key][1])