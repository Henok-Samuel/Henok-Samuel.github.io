$(document).ready(() => {
  // console.log(moment().format(lt));
  // const now = moment();
  jQuery("time.timeago").timeago();
  const $body = $('body');
  $body.html('');



  //Sections -----------------------------------------------------------------
  const divButton = $('<div id=b class=update-button><button id=update>Refresh Feed</button></div><br><br>').css('text-align:', 'center').on('click', function () {
    displayFeed(streams.home);
  });

  const $allContentDiv = $('<div id=allContent></div>')
  $body.append($allContentDiv);
  // $allContentDiv.append($('<h1>Header</h1>'))
  const $centerDiv = $('<div id=center-div></div>')
  $allContentDiv.append($centerDiv);
  // $centerDiv.append($('<div>CENTER</div>'))
  const $leftSideBarDiv = $('<div id=left-sidebar></div>')
  $allContentDiv.append($leftSideBarDiv);
  // $leftSideBarDiv.append($('<div>LEFT</div>'))
  const $rightSideBarDiv = $('<div id=right-sidebar></div>')
  $allContentDiv.append($rightSideBarDiv);
  // $rightSideBarDiv.append($('<div>RIGHT</div>'))

  $rightSideBarDiv.append(divButton)


  const $timeLineDiv = $('<div id=timeline></div>')
  $centerDiv.append($timeLineDiv);

  //------------------------------------------------------------------------------


  $divForText = $('<div id=div-text-area></div>');
  $textArea = $('<textarea id=textarea></textarea>');
  $labelText = $('<div id=labelText>Say what\'s on your mind!</div>');
  $divForText.append($labelText);
  $divForText.append($textArea);




  //Button to add tweet
  $buttonForTweet = $('<button class=add-tweet-button>Add Tweet</button>').on('click', function () {
    if ($textArea.val() === '') {
      alert('What is the point of tweeting nothing? Can\'t let that slide...')
      return
    }

    console.log('add tweet button works')
    window['visitor'] = name

    writeTweet($textArea.val());
    console.log(streams.users, 9999)
    $textArea.val('')
    // document.getElementById("#textarea").value='';
    displayFeed(streams.users[name][0]);
  });
  //-----------------------------------------------------------------------

  // //Functions-------------------------------------------------------------------------------------
  function timeAgoDate(date) {
    if (date !== undefined) {
      return jQuery.timeago(date)
    }
  }
  function displayFeed(array) {
    console.log(array.length, 'length');
    console.log('2222222222')


    //Loop through the array starting from the last index all the way to the first element in the array
    if (array.length === 0) {
      console.log("NOOOOO LENGTH");
      console.log('kkkk');


      $centerDiv.append($(`<div id=no-tweets><h1>Empty feed</h1><h3>You've been lowkey</h3></div>`))
      return

    } else {

      $('#no-tweets').hide();
      $timeLineDiv.empty();


      var $feedDiv = $('<div id=feeddiv></div>');


      $timeLineDiv.append('<div id=timeline><h1>Time Line</h1><div>')


      for (let i = array.length - 1; i > -1; i--) {
        //Current elemenet assigned to a variable called tweetObj
        let tweetObj = array[i];




        console.log(moment(tweetObj.created_at).format("MMM DD HH:mm Z"));
        console.log(moment(tweetObj.created_at).format());
        //Create a div container to contain divs of message, user, and time
        let $div = $('<div class=tweet-div ></div>');
        //Create divs for each message, each user, and each time and append them to $div
        $div.append(`<div id=${tweetObj.message} class=tweets>${tweetObj.message}</div>`);
        // $div.append(`<div id=${tweetObj.user} class=tweets tweetsuser>${tweetObj.user}</div>`);
        $div.append($(`<div id=${tweetObj.user} class=tweet-users  >@${tweetObj.user}</div>`).click(function () {
          console.log(tweetObj.user, 111);
          displayFeed(streams.users[tweetObj.user][0]);
        }));
        $div.append(`<div id=${tweetObj.created_at} class=tweets class=tweet->${timeAgoDate(tweetObj.created_at)}</div>`);
        //Append $div container to the feed section 

        $feedDiv.append($div);

      }

      // $timeLineDiv.append(divButton)
      $timeLineDiv.append($feedDiv);

    }
  }
  displayFeed(streams.home);








  var name = '';

  //SIGN UP FORM --------------------------------------------------------------------------------------------
  const $signUpForm = $('<form id= sign-up-form><h1>Sign Up</h1><label for="username">Create User Name:</label><br><input type="text" id="s-name" name="fname" value=""><br><label for="password">Create Password:</label><br><input  type="text" id="s-password" name="lname" value=""><br><br></form>')
  $signUpForm.append($('<input class=up-button type=button value="Sign up">').click(function () {

    if ($('#s-password').val() === '' && $('#s-name').val() === '' || $('#s-password').val() === ' ' && $('#s-name').val() === ' ' || $('#s-name').val() !== '' && $('#s-password').val() === '' || $('#s-name').val() === '' && $('#s-pass').val() !== '' || $('#s-pass').val() !== '' && $('s-pass').val() === '') {
      alert('You must enter a valid Username and Passowrd to Sign Up');
      $('#s-name').val('')
      $('#s-password').val('')

      return
    }


    name = $('#s-name').val();
    console.log($('#s-password').val())
    console.log($('#s-name').val());
    //Add user
    signUp($('#s-name').val(), $('#s-password').val())

    console.log(streams.users)


    //Clear text boxes
    $('#s-name').val('')
    $('#s-password').val('')

    //Alert Sign up is successful
    alert('Sign Up Successful')



    $rightSideBarDiv.hide()
    $allContentDiv.append($('<div id=signed-right-side class=right-side></div>'));

    $leftSideBarDiv.hide()
    $allContentDiv.append($('<div id=signed-left-side class=left-side></div>'));

    //ADD A TEXTBOX TO TWEET
    const $textBoxAndButtonContainer = $('<div id=textarea-button></div>');


    $textBoxAndButtonContainer.append($divForText);

    //ADD BUTTON TO SEND TWEET
    $textBoxAndButtonContainer.append($buttonForTweet)

    $('#signed-left-side').append($textBoxAndButtonContainer);

    $timeLineDiv.empty();




    //Add a header to the feed (welcome back user)
    $centerDiv.prepend($(`<div id=sign-welcome><h1 class=center>Welcome back ${name}</h1></div>`));


    displayFeed(streams['users'][name][0]);



    //Add sign out button to signed right side div
    $('#signed-right-side').append($('<input id=sign-out-button class=up-button type="button" value="Sign Out"></input>').click(function () {
      console.log('signout');

      $('#sign-welcome').empty();

      $leftSideBarDiv.show()
      $rightSideBarDiv.show()
      $('#signed-left-side').hide()
      $('#signed-right-side').hide()
      displayFeed(streams['home']);

    }))
  }))
  $signUpForm.appendTo($leftSideBarDiv);


  //LOGIN============================================
  const $logInForm = $('<form id= log-in-form><h1>Log in</h1><label for="username">User name:</label><br><input type="text" id="log-user" name="fname" value=""><br><label for="password">Password:</label><br><input class=front-but type="text" id="log-pass" name="lname" value=""><br><br></form>')
  $logInForm.append($('<input class=up-button type="button" value="Log in"></input>').click(function () {

    console.log(streams.users[$('#log-user').val()]);
    if ($('#log-user').val() === '' && $('#log-pass').val() === '' || $('#log-user').val() === ' ' && $('#log-pass').val() === ' ' || $('#log-user').val() === '' && $('#log-pass').val() !== '' | $('#log-user').val() !== '' && $('#log-pass').val() === '') {
      alert('You must enter a valid Username and Passowrd');
      $('#s-name').val('')
      $('#s-password').val('')

      return
    }
    if (streams.users.hasOwnProperty($('#log-user').val()) && $('#log-pass').val() === streams.users[$('#log-user').val()][1]) {

      name = $('#log-user').val();

      console.log($('#log-user').val(), 'loguser');
      console.log($('#log-pass').val(), 'logpass');
      console.log(name);
      //Make new user
      // signUp($('#log-user').val(), $('#log-pass').val())

      console.log(streams.users)


      //Clear user and pass box
      $('#log-user').val('');
      $('#log-pass').val('');

      //Alert Successful log in
      alert('Log In Successful')

      //Show textbox 
      // $centerDiv.append($divForText)
      // $centerDiv.empty();

      $rightSideBarDiv.hide()
      $allContentDiv.append($('<div id=log-right-side class=right-side></div>'));

      $leftSideBarDiv.hide()
      $allContentDiv.append($('<div id=log-left-side class=left-side></div>'));




      const $textBoxAndButtonC = $('<div id=textarea-button></div>');


      $textBoxAndButtonC.append($divForText);

      //ADD BUTTON TO SEND TWEET
      $textBoxAndButtonC.append($buttonForTweet)

      $('#log-left-side').append($textBoxAndButtonC);
      //Add a header to the feed (welcome back user)
      $centerDiv.prepend($(`<div id=log-welcome><h1>Welcome back ${name}</h1></div>`));
      //Display Home feed
      displayFeed(streams.users[name][0]);



      $('#log-right-side').append($('<input id=sign-out-buttonn class=up-button type="button" value="Sign Out"></input>').click(function () {

        $('#log-welcome').empty();
        $('#log-right-side').hide()
        $('#log-left-side').hide()
        $leftSideBarDiv.show();
        $rightSideBarDiv.show();
        $rightSideBarDiv.append(divButton)
        // $('#center-div').empty();
        displayFeed(streams.home);




      }))
    } else {
      alert('You must enter a valid Username and Passowrd to Log In')
    }
  }))
  $logInForm.prependTo($rightSideBarDiv);

  setInterval(function(){
    generateRandomTweet();
  }, 11000)

  //^^^=================================================================================================================================================



});

