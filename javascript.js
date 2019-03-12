
    var config = {
        apiKey: "AIzaSyA4v4pX6D2-e6VQ-Oo0zHyPEq3yJ9fcdpI",
        authDomain: "train-schedule-d8303.firebaseapp.com",
        databaseURL: "https://train-schedule-d8303.firebaseio.com",
        projectId: "train-schedule-d8303",
        storageBucket: "",
        messagingSenderId: "905391269523"
      };
      firebase.initializeApp(config);


  var database = firebase.database();

  // Initial Values
  var name = "";
  var destination = "";
  var time = "";
  var frequency = 0;

  // Capture Button Click
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    time = $("#train-time-input").val().trim();
    frequency = $("#freq-input").val().trim();

    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      time: time,
      frequency: frequency,
    });
$('input').val('');
  });

  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();


    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);

    var freq = parseInt(sv.frequency)

    var dConverted = moment(snapshot.val().time, 'HH:mm').subtract(1, 'years');
    var trainTime = moment(dConverted).format('HH:mm');
    var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
    var tDifference = moment().diff(moment(tConverted), 'minutes');
    var tRemainder = tDifference % freq;
    var minsAway = freq - tRemainder;
    var nextTrain = moment().add(minsAway, 'minutes');

    // Change the HTML to reflect

    var newRow = $("<tr>").append(    
       $("<td>").text(sv.name),
       $("<td>").text(sv.destination),
       $("<td>").text(sv.frequency),
       $("<td>").text(moment(nextTrain, 'HH:mm').format("hh:mm a")),
       $("<td>").text(minsAway + ' Minutes away'),


   )

$("#train-table > tbody").append(newRow)




    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
